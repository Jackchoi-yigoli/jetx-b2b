import { NextRequest } from 'next/server';
import { apiSuccess, apiError, withConsumerAuth } from '@/lib/api';
import { getTransactions } from '@/lib/services';

export const GET = withConsumerAuth(async (request: NextRequest, { customer }) => {
  try {
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;

    const transactions = await getTransactions({ customerId: customer.id, skip, take });
    return apiSuccess(transactions);
  } catch (error) {
    return apiError('Failed to fetch transactions', 500);
  }
});
