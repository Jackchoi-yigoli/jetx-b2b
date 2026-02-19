import { prisma } from '@/lib/prisma';

// ─── Customer Identification ───

export async function identifyByPlate(plate: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { plate },
    include: {
      customer: {
        include: {
          vehicles: true,
          subscriptions: {
            where: { status: { in: ['active', 'paused', 'expiring_soon'] as any[] } },
            include: { plan: true },
          },
        },
      },
    },
  });

  return vehicle?.customer ?? null;
}

export async function identifyByPhone(phone: string) {
  return prisma.customer.findFirst({
    where: { phone },
    include: {
      vehicles: true,
      subscriptions: {
        where: { status: { in: ['active', 'paused', 'expiring_soon'] as any[] } },
        include: { plan: true },
      },
    },
  });
}

// ─── Wash Lifecycle ───

const WASH_STAGES: Record<string, string[]> = {
  basic: ['Pre-Rinse', 'Soap', 'Rinse', 'Dry'],
  premium: ['Pre-Rinse', 'Foam Cannon', 'Soap', 'Underbody', 'Rinse', 'Wax', 'Dry'],
  deluxe: ['Pre-Rinse', 'Foam Cannon', 'Soap', 'Underbody', 'Clay Bar', 'Rinse', 'Wax', 'Dry', 'Interior Vacuum'],
  ultimate: ['Pre-Rinse', 'Foam Cannon', 'Soap', 'Underbody', 'Clay Bar', 'Rinse', 'Wax', 'Dry', 'Interior Vacuum', 'Sealant', 'Dashboard Polish'],
  self_service: ['Active'],
};

export async function initiateWash(data: {
  siteId: string;
  machineId: string;
  serviceType: string;
  customerId?: string;
  vehicleId?: string;
  addons?: string[];
  estimatedDuration?: number;
}) {
  const machine = await prisma.machine.findUnique({
    where: { id: data.machineId },
    include: { site: true },
  });

  if (!machine) throw new Error('Machine not found');

  const site = await prisma.site.findUnique({
    where: { id: data.siteId },
    include: {
      pricingTemplate: {
        include: { washPrices: true },
      },
    },
  });

  if (!site) throw new Error('Site not found');

  const washPrice = site.pricingTemplate.washPrices.find(
    (wp) => wp.serviceType === (data.serviceType as any),
  );
  const subtotal = washPrice?.price ?? 0;

  const stageNames = WASH_STAGES[data.serviceType] ?? WASH_STAGES.basic;

  return prisma.transaction.create({
    data: {
      dateTime: new Date(),
      status: 'in_progress' as any,
      duration: 0,
      customerId: data.customerId ?? null,
      vehicleId: data.vehicleId ?? null,
      siteId: data.siteId,
      operatorId: machine.site.operatorId,
      machineId: data.machineId,
      serviceType: data.serviceType as any,
      subtotal,
      discount: 0,
      total: subtotal,
      paymentMethod: 'cash' as any,
      pointsEarned: 0,
      addons: data.addons ?? [],
      estimatedDuration: data.estimatedDuration ?? null,
      washStages: {
        create: stageNames.map((name, index) => ({
          name,
          status: (index === 0 ? 'active' : 'pending') as any,
          startTime: index === 0 ? new Date() : null,
        })),
      },
    },
    include: { washStages: true, site: true, machine: true },
  });
}

export async function updateWashStage(
  transactionId: string,
  stageName: string,
  status: 'active' | 'completed',
  duration?: number,
) {
  const stage = await prisma.washStage.findFirst({
    where: { transactionId, name: stageName },
  });

  if (!stage) throw new Error('Wash stage not found');

  await prisma.washStage.update({
    where: { id: stage.id },
    data: {
      status: status as any,
      ...(status === 'active' ? { startTime: new Date() } : {}),
      ...(status === 'completed' && duration !== undefined ? { duration } : {}),
    },
  });

  if (status === 'completed') {
    const nextStage = await prisma.washStage.findFirst({
      where: { transactionId, status: 'pending' as any },
      orderBy: { id: 'asc' },
    });

    if (nextStage) {
      await prisma.washStage.update({
        where: { id: nextStage.id },
        data: { status: 'active' as any, startTime: new Date() },
      });
    }
  }
}

export async function completeWash(transactionId: string, duration: number) {
  await prisma.washStage.updateMany({
    where: { transactionId, status: { not: 'completed' as any } },
    data: { status: 'completed' as any },
  });

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
    include: {
      customer: {
        include: {
          subscriptions: {
            where: { status: { in: ['active', 'paused', 'expiring_soon'] as any[] } },
            include: { plan: true },
          },
        },
      },
    },
  });

  if (!transaction) throw new Error('Transaction not found');

  let pointsMultiplier = 1;
  const activeSubscription = transaction.customer?.subscriptions?.[0] ?? null;

  if (activeSubscription) {
    pointsMultiplier = activeSubscription.plan.pointsMultiplier;
  }

  const pointsEarned = Math.floor(transaction.total * pointsMultiplier);

  if (activeSubscription && activeSubscription.plan.washesPerMonth !== -1) {
    await prisma.subscription.update({
      where: { id: activeSubscription.id },
      data: { washesUsedThisMonth: { increment: 1 } },
    });
  }

  await prisma.machine.update({
    where: { id: transaction.machineId },
    data: { totalWashCycles: { increment: 1 } },
  });

  return prisma.transaction.update({
    where: { id: transactionId },
    data: { status: 'completed' as any, duration, pointsEarned },
    include: { washStages: true, customer: true, vehicle: true, site: true },
  });
}

// ─── Promo Redemption ───

export async function redeemPromoCode(promoCodeId: string, transactionId: string) {
  await prisma.promoCode.update({
    where: { id: promoCodeId },
    data: { usesCount: { increment: 1 } },
  });

  return prisma.transaction.update({
    where: { id: transactionId },
    data: { promoCodeId },
  });
}

// ─── Subscription Validation ───

export async function validateSubscription(
  customerId: string,
  siteId: string,
): Promise<{
  valid: boolean;
  reason?: string;
  subscription?: any;
  washesRemaining?: number | 'unlimited';
  planName?: string;
  planTier?: string;
}> {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      customerId,
      status: { in: ['active', 'paused', 'expiring_soon'] as any[] },
      OR: [
        { siteId },
        { plan: { scope: 'multi_site' as any } },
      ],
    },
    include: { plan: true },
  });

  if (subscriptions.length === 0) {
    return { valid: false, reason: 'No active subscription for this site' };
  }

  const subscription = subscriptions[0];
  const washesRemaining =
    subscription.plan.washesPerMonth === -1
      ? 'unlimited'
      : subscription.plan.washesPerMonth - subscription.washesUsedThisMonth;

  if (typeof washesRemaining === 'number' && washesRemaining <= 0) {
    return { valid: false, reason: 'Monthly wash limit reached', subscription };
  }

  return {
    valid: true,
    subscription,
    washesRemaining,
    planName: subscription.plan.name,
    planTier: subscription.plan.tier as string,
  };
}
