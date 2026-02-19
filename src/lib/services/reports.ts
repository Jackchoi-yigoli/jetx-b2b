import { prisma } from '@/lib/prisma';

// Scheduled Reports

export async function getReports() {
  return prisma.scheduledReport.findMany({
    include: { deliveries: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getReportById(id: string) {
  return prisma.scheduledReport.findUnique({
    where: { id },
    include: { deliveries: { orderBy: { deliveredAt: 'desc' } } },
  });
}

export async function createReport(data: Parameters<typeof prisma.scheduledReport.create>[0]['data']) {
  return prisma.scheduledReport.create({ data });
}

export async function updateReport(id: string, data: Parameters<typeof prisma.scheduledReport.update>[0]['data']) {
  return prisma.scheduledReport.update({ where: { id }, data });
}

// Report Deliveries

export async function getReportDeliveries(reportId: string) {
  return prisma.reportDelivery.findMany({
    where: { reportId },
    orderBy: { deliveredAt: 'desc' },
  });
}
