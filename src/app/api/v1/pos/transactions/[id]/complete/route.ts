import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { completeWash } from '@/lib/services';
import { PosCompleteWashSchema } from '@/lib/validations';

export const POST = withApiKey(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params!;
      const body = await request.json();
      const parsed = PosCompleteWashSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const transaction = await completeWash(id, parsed.data.duration);
      return apiSuccess(transaction);
    } catch (error) {
      return apiError('Failed to complete wash', 500);
    }
  },
  ['transactions:write'],
);
