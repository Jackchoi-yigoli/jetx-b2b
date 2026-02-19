import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withConsumerAuth } from '@/lib/api';
import { TopUpWalletSchema } from '@/lib/validations';
import { topUpWallet } from '@/lib/services';

export const POST = withConsumerAuth(async (request: NextRequest, { customer }) => {
  try {
    const body = await request.json();
    const parsed = TopUpWalletSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const result = await topUpWallet(customer.id, parsed.data.amount);
    return apiSuccess(result);
  } catch (error) {
    return apiError('Failed to top up wallet', 500);
  }
});
