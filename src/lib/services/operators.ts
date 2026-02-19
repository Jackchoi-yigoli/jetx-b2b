import { prisma } from '@/lib/prisma';

export async function getOperators() {
  return prisma.operator.findMany({
    include: { sites: true },
    orderBy: { name: 'asc' },
  });
}

export async function getOperatorById(id: string) {
  return prisma.operator.findUnique({
    where: { id },
    include: { sites: true, transactions: true },
  });
}

export async function createOperator(data: Parameters<typeof prisma.operator.create>[0]['data']) {
  return prisma.operator.create({ data });
}

export async function updateOperator(id: string, data: Parameters<typeof prisma.operator.update>[0]['data']) {
  return prisma.operator.update({ where: { id }, data });
}

export async function deleteOperator(id: string) {
  return prisma.operator.delete({ where: { id } });
}
