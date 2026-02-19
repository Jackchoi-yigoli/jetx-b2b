import { prisma } from '@/lib/prisma';

export async function getCustomers() {
  return prisma.customer.findMany({
    include: { homeSite: true, vehicles: true, subscriptions: true },
    orderBy: { name: 'asc' },
  });
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      homeSite: true,
      vehicles: true,
      subscriptions: { include: { plan: true, billingRecords: true } },
      transactions: { orderBy: { dateTime: 'desc' }, take: 10 },
    },
  });
}

export async function createCustomer(data: Parameters<typeof prisma.customer.create>[0]['data']) {
  return prisma.customer.create({ data });
}

export async function updateCustomer(id: string, data: Parameters<typeof prisma.customer.update>[0]['data']) {
  return prisma.customer.update({ where: { id }, data });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({ where: { id } });
}

export async function getVehiclesByCustomer(customerId: string) {
  return prisma.vehicle.findMany({ where: { customerId } });
}

export async function createVehicle(data: Parameters<typeof prisma.vehicle.create>[0]['data']) {
  return prisma.vehicle.create({ data });
}
