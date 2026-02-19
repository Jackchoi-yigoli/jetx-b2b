import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { identifyByPlate, identifyByPhone } from '@/lib/services';
import { PosIdentifySchema } from '@/lib/validations';

export const POST = withApiKey(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      const parsed = PosIdentifySchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const data = parsed.data as any;

      if (data.plate) {
        const customer = await identifyByPlate(data.plate);
        return apiSuccess(customer);
      }

      if (data.phone) {
        const customer = await identifyByPhone(data.phone);
        return apiSuccess(customer);
      }

      return apiSuccess(null);
    } catch (error) {
      return apiError('Failed to identify customer', 500);
    }
  },
  ['customers:read'],
);
