import { apiSuccess, apiError, withConsumerAuth } from '@/lib/api';
import { getTransactionById } from '@/lib/services';

export const GET = withConsumerAuth(async (_request, { customer, params }) => {
  try {
    const { id } = await params!;

    const transaction = await getTransactionById(id);
    if (!transaction) {
      return apiError('Wash session not found', 404);
    }

    if (transaction.customerId !== customer.id) {
      return apiError('Forbidden', 403);
    }

    return apiSuccess(transaction);
  } catch (error) {
    return apiError('Failed to fetch wash progress', 500);
  }
});
