import { prisma } from '@/lib/prisma';

// Campaigns

export async function getCampaigns() {
  return prisma.campaign.findMany({
    include: {
      eligibilityRules: true,
      siteOptOuts: true,
      promoCodes: true,
      _count: { select: { sites: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCampaignById(id: string) {
  return prisma.campaign.findUnique({
    where: { id },
    include: {
      eligibilityRules: true,
      siteOptOuts: { include: { site: true } },
      promoCodes: true,
      sites: true,
      _count: { select: { sites: true } },
    },
  });
}

export async function createCampaign(data: Parameters<typeof prisma.campaign.create>[0]['data']) {
  return prisma.campaign.create({ data });
}

export async function updateCampaign(id: string, data: Parameters<typeof prisma.campaign.update>[0]['data']) {
  return prisma.campaign.update({ where: { id }, data });
}

// Promo Codes

export async function getPromoCodes() {
  return prisma.promoCode.findMany({
    include: { campaign: true, sites: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPromoCodeById(id: string) {
  return prisma.promoCode.findUnique({
    where: { id },
    include: { campaign: true, sites: true },
  });
}

export async function createPromoCode(data: Parameters<typeof prisma.promoCode.create>[0]['data']) {
  return prisma.promoCode.create({ data });
}

export async function updatePromoCode(id: string, data: Parameters<typeof prisma.promoCode.update>[0]['data']) {
  return prisma.promoCode.update({ where: { id }, data });
}

// Notification Templates

export async function getNotificationTemplates() {
  return prisma.notificationTemplate.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateNotificationTemplate(id: string, data: Parameters<typeof prisma.notificationTemplate.update>[0]['data']) {
  return prisma.notificationTemplate.update({ where: { id }, data });
}
