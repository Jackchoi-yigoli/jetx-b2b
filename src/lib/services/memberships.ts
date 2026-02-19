import { prisma } from '@/lib/prisma';

// Plans
export async function getPlans() {
  return prisma.membershipPlan.findMany({
    include: { features: true, siteConfigs: true, _count: { select: { subscriptions: true } } },
    orderBy: { basePrice: 'asc' },
  });
}

export async function getPlanById(id: string) {
  return prisma.membershipPlan.findUnique({
    where: { id },
    include: { features: true, siteConfigs: { include: { site: true } }, subscriptions: true },
  });
}

export async function createPlan(data: Parameters<typeof prisma.membershipPlan.create>[0]['data']) {
  return prisma.membershipPlan.create({ data });
}

export async function updatePlan(id: string, data: Parameters<typeof prisma.membershipPlan.update>[0]['data']) {
  return prisma.membershipPlan.update({ where: { id }, data });
}

// Subscriptions
export async function getSubscriptions(options?: { customerId?: string; planId?: string; siteId?: string; status?: string }) {
  const where: any = {};
  if (options?.customerId) where.customerId = options.customerId;
  if (options?.planId) where.planId = options.planId;
  if (options?.siteId) where.siteId = options.siteId;
  if (options?.status) where.status = options.status;

  return prisma.subscription.findMany({
    where,
    include: { customer: true, plan: true, site: true, billingRecords: { orderBy: { date: 'desc' } } },
    orderBy: { startDate: 'desc' },
  });
}

export async function getSubscriptionById(id: string) {
  return prisma.subscription.findUnique({
    where: { id },
    include: { customer: true, plan: true, site: true, billingRecords: { orderBy: { date: 'desc' } } },
  });
}

export async function createSubscription(data: Parameters<typeof prisma.subscription.create>[0]['data']) {
  return prisma.subscription.create({ data });
}

export async function updateSubscription(id: string, data: Parameters<typeof prisma.subscription.update>[0]['data']) {
  return prisma.subscription.update({ where: { id }, data });
}
