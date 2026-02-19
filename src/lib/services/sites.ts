import { prisma } from '@/lib/prisma';

export async function getSites() {
  return prisma.site.findMany({
    include: { operator: true, pricingTemplate: true },
    orderBy: { name: 'asc' },
  });
}

export async function getSiteById(id: string) {
  return prisma.site.findUnique({
    where: { id },
    include: {
      operator: true,
      pricingTemplate: true,
      bays: true,
      machines: true,
      cameras: true,
    },
  });
}

export async function getSitesByOperator(operatorId: string) {
  return prisma.site.findMany({
    where: { operatorId },
    include: { operator: true },
    orderBy: { name: 'asc' },
  });
}

export async function createSite(data: Parameters<typeof prisma.site.create>[0]['data']) {
  return prisma.site.create({ data });
}

export async function updateSite(id: string, data: Parameters<typeof prisma.site.update>[0]['data']) {
  return prisma.site.update({ where: { id }, data });
}

export async function deleteSite(id: string) {
  return prisma.site.delete({ where: { id } });
}
