import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { validatePromoCode, redeemPromoCode } from '@/lib/services';
import { PosRedeemPromoSchema } from '@/lib/validations';

export const POST = withApiKey(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      const parsed = PosRedeemPromoSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const { code, transactionId, siteId, amount } = parsed.data;

      const validation = await validatePromoCode(code, siteId, amount);
      if (!validation.valid) {
        return apiError(validation.reason ?? 'Promo code is not valid', 422);
      }

      await redeemPromoCode(validation.promoCodeId!, transactionId);

      return apiSuccess({
        promoCodeId: validation.promoCodeId,
        discountType: validation.discountType,
        discountValue: validation.discountValue,
        discountAmount: validation.discountAmount,
      });
    } catch (error) {
      return apiError('Failed to redeem promo code', 500);
    }
  },
  ['transactions:write'],
);
