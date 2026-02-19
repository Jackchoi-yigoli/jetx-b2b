import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { updateWashStage, getTransactionById } from '@/lib/services';
import { PosUpdateStageSchema } from '@/lib/validations';

export const PATCH = withApiKey(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params!;
      const body = await request.json();
      const parsed = PosUpdateStageSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      await updateWashStage(
        id,
        parsed.data.stageName,
        parsed.data.status,
        parsed.data.duration,
      );

      const transaction = await getTransactionById(id);
      if (!transaction) {
        return apiError('Transaction not found', 404);
      }

      return apiSuccess(transaction.washStages);
    } catch (error) {
      return apiError('Failed to update wash stage', 500);
    }
  },
  ['transactions:write'],
);
