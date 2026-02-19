import { prisma } from '@/lib/prisma';

// Team Members

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    include: {
      sites: true,
      _count: { select: { tickets: true, activityLogs: true } },
    },
    orderBy: { name: 'asc' },
  });
}

export async function getTeamMemberById(id: string) {
  return prisma.teamMember.findUnique({
    where: { id },
    include: {
      sites: true,
      _count: { select: { tickets: true, activityLogs: true } },
    },
  });
}

export async function createTeamMember(data: Parameters<typeof prisma.teamMember.create>[0]['data']) {
  return prisma.teamMember.create({ data });
}

export async function updateTeamMember(id: string, data: Parameters<typeof prisma.teamMember.update>[0]['data']) {
  return prisma.teamMember.update({ where: { id }, data });
}

// Roles

export async function getRoles() {
  return prisma.role.findMany({
    include: { permissions: true },
    orderBy: { name: 'asc' },
  });
}

// Invitations

export async function getInvitations() {
  return prisma.invitation.findMany({
    include: { inviter: true },
    orderBy: { sentDate: 'desc' },
  });
}

export async function createInvitation(data: Parameters<typeof prisma.invitation.create>[0]['data']) {
  return prisma.invitation.create({ data });
}

export async function updateInvitation(id: string, data: Parameters<typeof prisma.invitation.update>[0]['data']) {
  return prisma.invitation.update({ where: { id }, data });
}

// Activity Logs

export async function getActivityLogs(options?: { userId?: string; skip?: number; take?: number }) {
  const where: any = {};
  if (options?.userId) where.userId = options.userId;

  return prisma.activityLog.findMany({
    where,
    include: { user: true },
    orderBy: { timestamp: 'desc' },
    skip: options?.skip,
    take: options?.take,
  });
}
