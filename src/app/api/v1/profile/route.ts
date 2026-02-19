import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withConsumerAuth } from '@/lib/api';
import { UpdateProfileSchema } from '@/lib/validations';
import { getCustomerProfile, updateCustomer } from '@/lib/services';

export const GET = withConsumerAuth(async (_request, { customer }) => {
  try {
    const profile = await getCustomerProfile(customer.id);
    if (!profile) {
      return apiError('Profile not found', 404);
    }
    return apiSuccess(profile);
  } catch (error) {
    return apiError('Failed to fetch profile', 500);
  }
});

export const PATCH = withConsumerAuth(async (request: NextRequest, { customer }) => {
  try {
    const body = await request.json();
    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const updated = await updateCustomer(customer.id, parsed.data as any);
    return apiSuccess(updated);
  } catch (error) {
    return apiError('Failed to update profile', 500);
  }
});
