import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { initiateWash } from '@/lib/services';
import { PosStartWashSchema } from '@/lib/validations';

export const POST = withApiKey(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      const parsed = PosStartWashSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const transaction = await initiateWash(parsed.data as any);
      return apiSuccess(transaction, 201);
    } catch (error) {
      return apiError('Failed to initiate wash', 500);
    }
  },
  ['transactions:write'],
);
