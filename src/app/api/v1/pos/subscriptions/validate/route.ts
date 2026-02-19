import { NextRequest } from 'next/server';
import { apiSuccess, apiError, withApiKey } from '@/lib/api';
import { validateSubscription } from '@/lib/services';

export const GET = withApiKey(
  async (request: NextRequest) => {
    try {
      const sp = request.nextUrl.searchParams;
      const customerId = sp.get('customerId');
      const siteId = sp.get('siteId');

      if (!customerId || !siteId) {
        return apiError('customerId and siteId are required', 400);
      }

      const result = await validateSubscription(customerId, siteId);
      return apiSuccess(result);
    } catch (error) {
      return apiError('Failed to validate subscription', 500);
    }
  },
  ['memberships:read'],
);
