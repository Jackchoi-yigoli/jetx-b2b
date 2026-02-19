import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withConsumerAuth } from '@/lib/api';
import { CreateConsumerSubscriptionSchema } from '@/lib/validations';
import { getSubscriptions, createSubscription } from '@/lib/services';

export const GET = withConsumerAuth(async (_request, { customer }) => {
  try {
    const subscriptions = await getSubscriptions({ customerId: customer.id });
    return apiSuccess(subscriptions);
  } catch (error) {
    return apiError('Failed to fetch subscriptions', 500);
  }
});

export const POST = withConsumerAuth(async (request: NextRequest, { customer }) => {
  try {
    const body = await request.json();
    const parsed = CreateConsumerSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const renewalDate = new Date();
    renewalDate.setDate(renewalDate.getDate() + 30);

    const subscription = await createSubscription({
      customerId: customer.id,
      ...parsed.data,
      status: 'active' as any,
      startDate: new Date(),
      renewalDate,
      autoRenewal: true,
      billingDay: new Date().getDate(),
      monthlyAmount: 0,
      washesUsedThisMonth: 0,
    } as any);

    return apiSuccess(subscription, 201);
  } catch (error) {
    return apiError('Failed to create subscription', 500);
  }
});
