import { prisma } from '@/lib/prisma';

export async function getPricingTemplates() {
  return prisma.pricingTemplate.findMany({
    include: {
      washPrices: true,
      addonPrices: true,
      comboPackages: true,
      dynamicPricingRules: true,
      siteAssignments: true,
      _count: { select: { sites: true } },
    },
    orderBy: { name: 'asc' },
  });
}

export async function getPricingTemplateById(id: string) {
  return prisma.pricingTemplate.findUnique({
    where: { id },
    include: {
      washPrices: true,
      addonPrices: true,
      comboPackages: true,
      dynamicPricingRules: true,
      siteAssignments: { include: { site: true } },
    },
  });
}

export async function createPricingTemplate(data: Parameters<typeof prisma.pricingTemplate.create>[0]['data']) {
  return prisma.pricingTemplate.create({ data });
}

export async function updatePricingTemplate(id: string, data: Parameters<typeof prisma.pricingTemplate.update>[0]['data']) {
  return prisma.pricingTemplate.update({ where: { id }, data });
}
