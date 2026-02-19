import { createHash, randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

// API Keys

export async function getApiKeys() {
  return prisma.aPIKey.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createApiKey(data: Parameters<typeof prisma.aPIKey.create>[0]['data']) {
  return prisma.aPIKey.create({ data });
}

export async function createApiKeyWithHash(data: {
  name: string;
  environment: string;
  permissions: string[];
  rateLimit: number;
  expiresAt?: Date;
}) {
  const rawKey = 'jx_' + randomBytes(32).toString('hex');
  const keyPrefix = rawKey.slice(0, 10);
  const keyHash = createHash('sha256').update(rawKey).digest('hex');

  const apiKey = await prisma.aPIKey.create({
    data: {
      name: data.name,
      keyPrefix,
      keyHash,
      environment: data.environment as any,
      permissions: data.permissions,
      rateLimit: data.rateLimit,
      status: 'active' as any,
      expiresAt: data.expiresAt ?? null,
    },
  });

  return { apiKey, rawKey };
}

export async function updateApiKey(id: string, data: Parameters<typeof prisma.aPIKey.update>[0]['data']) {
  return prisma.aPIKey.update({ where: { id }, data });
}

// Integrations

export async function getIntegrations() {
  return prisma.integration.findMany({ orderBy: { name: 'asc' } });
}

export async function updateIntegration(id: string, data: Parameters<typeof prisma.integration.update>[0]['data']) {
  return prisma.integration.update({ where: { id }, data });
}

// Webhooks

export async function getWebhooks() {
  return prisma.webhook.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createWebhook(data: Parameters<typeof prisma.webhook.create>[0]['data']) {
  return prisma.webhook.create({ data });
}

export async function updateWebhook(id: string, data: Parameters<typeof prisma.webhook.update>[0]['data']) {
  return prisma.webhook.update({ where: { id }, data });
}

// User Preferences

export async function getUserPreferences(userId: string) {
  return prisma.userPreferences.findUnique({ where: { userId } });
}

export async function updateUserPreferences(userId: string, data: Parameters<typeof prisma.userPreferences.update>[0]['data']) {
  return prisma.userPreferences.update({ where: { userId }, data });
}

// Login Sessions

export async function getLoginSessions(userId: string) {
  return prisma.loginSession.findMany({
    where: { userId },
    orderBy: { loginAt: 'desc' },
  });
}

// Security Settings

export async function getSecuritySettings(userId: string) {
  return prisma.securitySettings.findUnique({ where: { userId } });
}

export async function updateSecuritySettings(userId: string, data: Parameters<typeof prisma.securitySettings.update>[0]['data']) {
  return prisma.securitySettings.update({ where: { userId }, data });
}
