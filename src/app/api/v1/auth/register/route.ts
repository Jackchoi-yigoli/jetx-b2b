import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError } from '@/lib/api';
import { RegisterSchema } from '@/lib/validations';
import { supabaseAdmin } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const { email, password, name, phone, language, homeSiteId } = parsed.data;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      return apiError(authError?.message ?? 'Failed to create auth user', 400);
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        language,
        homeSiteId,
        supabaseUid: authData.user.id,
        joinDate: new Date(),
        avatarInitials: name.slice(0, 2).toUpperCase(),
        status: 'active' as any,
        segment: 'new' as any,
        walletBalance: 0,
      },
    });

    const { supabaseUid: _uid, ...customerData } = customer;

    return apiSuccess(customerData, 201);
  } catch (error) {
    return apiError('Registration failed', 500);
  }
}
