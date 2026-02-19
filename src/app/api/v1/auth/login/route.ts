import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError } from '@/lib/api';
import { LoginSchema } from '@/lib/validations';
import { supabaseAdmin } from '@/lib/supabase';
import { getCustomerByEmail } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const { email, password } = parsed.data;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return apiError(error?.message ?? 'Invalid credentials', 401);
    }

    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return apiError('Customer account not found', 404);
    }

    return apiSuccess({ session: data.session, customer });
  } catch (error) {
    return apiError('Login failed', 500);
  }
}
