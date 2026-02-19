import { prisma } from '@/lib/prisma';

export async function getTransactions(options?: { siteId?: string; customerId?: string; operatorId?: string; machineId?: string; skip?: number; take?: number }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;
  if (options?.customerId) where.customerId = options.customerId;
  if (options?.operatorId) where.operatorId = options.operatorId;
  if (options?.machineId) where.machineId = options.machineId;

  return prisma.transaction.findMany({
    where,
    include: { customer: true, vehicle: true, site: true, operator: true, machine: true, promoCode: true, washStages: true },
    orderBy: { dateTime: 'desc' },
    skip: options?.skip,
    take: options?.take ?? 50,
  });
}

export async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: { id },
    include: { customer: true, vehicle: true, site: true, operator: true, machine: true, promoCode: true, washStages: true },
  });
}

export async function createTransaction(data: Parameters<typeof prisma.transaction.create>[0]['data']) {
  return prisma.transaction.create({ data, include: { washStages: true } });
}

export async function updateTransaction(id: string, data: Parameters<typeof prisma.transaction.update>[0]['data']) {
  return prisma.transaction.update({ where: { id }, data });
}
