import { prisma } from '@/lib/prisma';

export async function getMachines(options?: { siteId?: string }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;

  return prisma.machine.findMany({
    where,
    include: { site: true, sensors: true, alerts: { where: { status: 'active' } } },
    orderBy: { bay: 'asc' },
  });
}

export async function getMachineById(id: string) {
  return prisma.machine.findUnique({
    where: { id },
    include: {
      site: true,
      sensors: true,
      alerts: { orderBy: { triggeredAt: 'desc' } },
      maintenanceRecords: { orderBy: { date: 'desc' } },
    },
  });
}

export async function updateMachine(id: string, data: Parameters<typeof prisma.machine.update>[0]['data']) {
  return prisma.machine.update({ where: { id }, data });
}

// Alerts
export async function getAlerts(options?: { siteId?: string; machineId?: string; status?: string }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;
  if (options?.machineId) where.machineId = options.machineId;
  if (options?.status) where.status = options.status;

  return prisma.machineAlert.findMany({
    where,
    include: { machine: true, site: true },
    orderBy: { triggeredAt: 'desc' },
  });
}

export async function acknowledgeAlert(id: string, acknowledgedBy: string) {
  return prisma.machineAlert.update({
    where: { id },
    data: { acknowledged: true, acknowledgedBy, status: 'acknowledged' },
  });
}

// Maintenance
export async function createMaintenanceRecord(data: Parameters<typeof prisma.maintenanceRecord.create>[0]['data']) {
  return prisma.maintenanceRecord.create({ data });
}

export async function getMaintenanceHistory(machineId: string) {
  return prisma.maintenanceRecord.findMany({
    where: { machineId },
    orderBy: { date: 'desc' },
  });
}
