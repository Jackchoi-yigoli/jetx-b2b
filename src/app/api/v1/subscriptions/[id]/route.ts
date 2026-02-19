import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withConsumerAuth } from '@/lib/api';
import { UpdateConsumerSubscriptionSchema } from '@/lib/validations';
import { getSubscriptionById, updateSubscription } from '@/lib/services';

export const PATCH = withConsumerAuth(async (request: NextRequest, { customer, params }) => {
  try {
    const { id } = await params!;

    const subscription = await getSubscriptionById(id);
    if (!subscription) {
      return apiError('Subscription not found', 404);
    }

    if (subscription.customerId !== customer.id) {
      return apiError('Forbidden', 403);
    }

    const body = await request.json();
    const parsed = UpdateConsumerSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const { action, cancelReason } = parsed.data;

    const statusMap: Record<string, string> = {
      pause: 'paused',
      resume: 'active',
      cancel: 'cancelled',
    };

    const status = statusMap[action];

    const updated = await updateSubscription(
      id,
      {
        status,
        ...(action === 'cancel'
          ? { cancelReason: cancelReason as any, autoRenewal: false }
          : {}),
      } as any
    );

    return apiSuccess(updated);
  } catch (error) {
    return apiError('Failed to update subscription', 500);
  }
});
