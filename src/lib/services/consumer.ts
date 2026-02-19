import { prisma } from '@/lib/prisma';

// ─── Customer Lookups ───

export async function getCustomerByEmail(email: string) {
  return prisma.customer.findUnique({ where: { email } });
}

export async function getCustomerByPhone(phone: string) {
  return prisma.customer.findFirst({ where: { phone } });
}

export async function getCustomerBySupabaseUid(supabaseUid: string) {
  return prisma.customer.findUnique({ where: { supabaseUid } });
}

// ─── Enriched Profile ───

export async function getCustomerProfile(customerId: string) {
  return prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      vehicles: {
        orderBy: { isPrimary: 'desc' },
      },
      subscriptions: {
        where: { status: { in: ['active', 'paused', 'expiring_soon'] as any[] } },
        include: { plan: true, site: true },
      },
      transactions: {
        orderBy: { dateTime: 'desc' },
        take: 5,
        include: { site: true, washStages: true },
      },
    },
  });
}

// ─── Wallet Operations ───

export async function topUpWallet(customerId: string, amount: number) {
  return prisma.customer.update({
    where: { id: customerId },
    data: { walletBalance: { increment: amount } },
    select: { id: true, walletBalance: true },
  });
}

export async function deductWallet(customerId: string, amount: number) {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: { walletBalance: true },
  });

  if (!customer || customer.walletBalance < amount) {
    throw new Error('Insufficient wallet balance');
  }

  return prisma.customer.update({
    where: { id: customerId },
    data: { walletBalance: { decrement: amount } },
    select: { id: true, walletBalance: true },
  });
}

// ─── Site Pricing Menu ───

export async function getSitePricingMenu(siteId: string) {
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    include: {
      pricingTemplate: {
        include: {
          washPrices: true,
          addonPrices: true,
          comboPackages: true,
          dynamicPricingRules: { where: { enabled: true } },
        },
      },
    },
  });

  if (!site) return null;

  const t = site.pricingTemplate;
  return {
    siteId: site.id,
    siteName: site.name,
    currency: t.currency,
    memberDiscountPct: t.memberDiscountPct,
    washPrices: t.washPrices,
    addonPrices: t.addonPrices,
    comboPackages: t.comboPackages,
    activeDynamicRules: t.dynamicPricingRules,
  };
}

// ─── Promo Code Validation ───

export async function validatePromoCode(
  code: string,
  siteId?: string,
  amount?: number,
): Promise<{
  valid: boolean;
  reason?: string;
  promoCodeId?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
}> {
  const promo = await prisma.promoCode.findUnique({
    where: { code },
    include: { sites: true },
  });

  if (!promo) {
    return { valid: false, reason: 'Promo code not found' };
  }

  if (promo.status !== 'active' as any) {
    return { valid: false, reason: 'Promo code is not active' };
  }

  const now = new Date();
  if (now < promo.validFrom || now > promo.validUntil) {
    return { valid: false, reason: 'Promo code is outside its valid date range' };
  }

  if (promo.usesLimit !== null && promo.usesCount >= promo.usesLimit) {
    return { valid: false, reason: 'Promo code usage limit reached' };
  }

  if (siteId && promo.sites.length > 0) {
    const siteAllowed = promo.sites.some((s) => s.id === siteId);
    if (!siteAllowed) {
      return { valid: false, reason: 'Promo code is not valid at this site' };
    }
  }

  if (promo.minPurchaseAmount !== null && amount !== undefined && amount < promo.minPurchaseAmount) {
    return {
      valid: false,
      reason: `Minimum purchase amount of ${promo.minPurchaseAmount} required`,
    };
  }

  let discountAmount: number;
  if (promo.discountType === 'percentage' as any) {
    discountAmount = (amount ?? 0) * (promo.discountValue / 100);
  } else {
    discountAmount = promo.discountValue;
  }

  return {
    valid: true,
    promoCodeId: promo.id,
    discountType: promo.discountType as string,
    discountValue: promo.discountValue,
    discountAmount,
  };
}
