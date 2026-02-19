import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { getTransactionById, redeemPromoCode, deductWallet } from '@/lib/services';
import { prisma } from '@/lib/prisma';
import { PosPaymentSchema } from '@/lib/validations';

export const POST = withApiKey(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params!;
      const body = await request.json();
      const parsed = PosPaymentSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const transaction = await getTransactionById(id);
      if (!transaction) {
        return apiError('Transaction not found', 404);
      }

      if (parsed.data.promoCodeId) {
        await redeemPromoCode(parsed.data.promoCodeId, id);
      }

      if (parsed.data.paymentMethod === 'jetx_wallet') {
        await deductWallet(transaction.customerId!, parsed.data.amount);
      }

      const updated = await prisma.transaction.update({
        where: { id },
        data: { paymentMethod: parsed.data.paymentMethod as any },
        include: { washStages: true, customer: true, vehicle: true, site: true },
      });

      return apiSuccess(updated);
    } catch (error) {
      return apiError('Failed to process payment', 500);
    }
  },
  ['transactions:write'],
);
