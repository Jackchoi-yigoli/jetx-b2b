import { prisma } from '@/lib/prisma';

export async function getTickets(options?: { siteId?: string; machineId?: string; assigneeId?: string; status?: string; priority?: string }) {
  const where: any = {};
  if (options?.siteId) where.siteId = options.siteId;
  if (options?.machineId) where.machineId = options.machineId;
  if (options?.assigneeId) where.assigneeId = options.assigneeId;
  if (options?.status) where.status = options.status;
  if (options?.priority) where.priority = options.priority;

  return prisma.ticket.findMany({
    where,
    include: { site: true, machine: true, assignee: true, _count: { select: { messages: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      site: true,
      machine: true,
      assignee: true,
      messages: { orderBy: { createdAt: 'asc' } },
    },
  });
}

export async function createTicket(data: Parameters<typeof prisma.ticket.create>[0]['data']) {
  return prisma.ticket.create({ data, include: { site: true } });
}

export async function updateTicket(id: string, data: Parameters<typeof prisma.ticket.update>[0]['data']) {
  return prisma.ticket.update({ where: { id }, data });
}

export async function addTicketMessage(data: Parameters<typeof prisma.ticketMessage.create>[0]['data']) {
  return prisma.ticketMessage.create({ data });
}
