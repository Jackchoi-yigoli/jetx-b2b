import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { apiError } from '../responses';

export interface ConsumerAuthContext {
  customer: {
    id: string;
    supabaseUid: string;
    email: string;
  };
}

type ConsumerHandler = (
  request: NextRequest,
  context: ConsumerAuthContext & { params?: Promise<Record<string, string>> }
) => Promise<Response>;

export function withConsumerAuth(handler: ConsumerHandler) {
  return async function (
    request: NextRequest,
    routeContext?: { params?: Promise<Record<string, string>> }
  ): Promise<Response> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return apiError('Missing or invalid Authorization header', 401);
    }

    const token = authHeader.slice(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return apiError('Invalid or expired token', 401);
    }

    const customer = await prisma.customer.findUnique({
      where: { supabaseUid: data.user.id },
      select: { id: true, supabaseUid: true, email: true, status: true },
    });

    if (!customer) {
      return apiError('Customer account not found', 404);
    }

    if (customer.status !== 'active') {
      return apiError('Customer account is not active', 403);
    }

    return handler(request, {
      customer: {
        id: customer.id,
        supabaseUid: customer.supabaseUid!,
        email: customer.email,
      },
      params: routeContext?.params,
    });
  };
}
