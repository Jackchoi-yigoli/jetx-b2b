import { NextRequest } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { apiError } from '../responses';

export interface ApiKeyContext {
  apiKey: {
    id: string;
    name: string;
    permissions: string[];
    environment: string;
    rateLimit: number;
  };
}

type ApiKeyHandler = (
  request: NextRequest,
  context: ApiKeyContext & { params?: Promise<Record<string, string>> }
) => Promise<Response>;

function hasPermission(granted: string[], required: string): boolean {
  if (granted.includes('all:write')) return true;

  const [scope, action] = required.split(':');

  if (action === 'read' && granted.includes('all:read')) return true;

  if (granted.includes(`${scope}:write`)) return true;

  return granted.includes(required);
}

export function withApiKey(handler: ApiKeyHandler, requiredPermissions: string[] = []) {
  return async function (
    request: NextRequest,
    routeContext?: { params?: Promise<Record<string, string>> }
  ): Promise<Response> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return apiError('Missing or invalid Authorization header', 401);
    }

    const token = authHeader.slice(7);
    const keyHash = createHash('sha256').update(token).digest('hex');

    const apiKey = await prisma.aPIKey.findUnique({ where: { keyHash } });

    if (!apiKey) {
      return apiError('Invalid API key', 401);
    }

    if (apiKey.status !== 'active') {
      return apiError('API key is not active', 403);
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return apiError('API key has expired', 403);
    }

    for (const required of requiredPermissions) {
      if (!hasPermission(apiKey.permissions, required)) {
        return apiError(`Missing required permission: ${required}`, 403);
      }
    }

    prisma.aPIKey
      .update({ where: { id: apiKey.id }, data: { lastUsed: new Date() } })
      .catch(() => {});

    return handler(request, {
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        permissions: apiKey.permissions,
        environment: apiKey.environment,
        rateLimit: apiKey.rateLimit,
      },
      params: routeContext?.params,
    });
  };
}
