import { NextRequest } from 'next/server';
import { apiSuccess, apiError, withConsumerAuth } from '@/lib/api';
import { validatePromoCode } from '@/lib/services';

export const GET = withConsumerAuth(async (request: NextRequest, _context) => {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const siteId = searchParams.get('siteId') ?? undefined;
    const amountParam = searchParams.get('amount');

    if (!code) {
      return apiError('code query parameter is required', 400);
    }

    const amount = amountParam ? parseFloat(amountParam) : undefined;

    const result = await validatePromoCode(code, siteId, amount);
    return apiSuccess(result);
  } catch (error) {
    return apiError('Failed to validate promo code', 500);
  }
});
