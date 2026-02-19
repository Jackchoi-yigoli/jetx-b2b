import { z } from 'zod';
import { ServiceTypeEnum, PaymentMethodEnum } from './schemas';

// ═══════════════════════════════════════════════════════
// POS (Point-of-Sale / Machine Terminal) Schemas
// ═══════════════════════════════════════════════════════

export const PosIdentifySchema = z
  .object({
    plate: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.plate !== undefined || data.phone !== undefined, {
    message: 'At least one of plate or phone must be provided',
  });

export const PosStartWashSchema = z.object({
  siteId: z.string().min(1),
  machineId: z.string().min(1),
  serviceType: ServiceTypeEnum,
  customerId: z.string().nullable().optional(),
  vehicleId: z.string().nullable().optional(),
  addons: z.array(z.string()).default([]),
  estimatedDuration: z.number().int().min(0).optional(),
});

export const PosUpdateStageSchema = z.object({
  stageName: z.string().min(1),
  status: z.enum(['active', 'completed']),
  duration: z.number().int().min(0).optional(),
});

export const PosCompleteWashSchema = z.object({
  duration: z.number().int().min(0),
});

export const PosPaymentSchema = z.object({
  paymentMethod: PaymentMethodEnum,
  amount: z.number().min(0),
  promoCodeId: z.string().optional(),
  subscriptionId: z.string().optional(),
});

export const PosMachineHeartbeatSchema = z.object({
  status: z.enum(['online', 'offline', 'maintenance', 'error', 'alert']),
  healthScore: z.number().int().min(0).max(100).optional(),
  totalWashCycles: z.number().int().optional(),
});

export const PosRedeemPromoSchema = z.object({
  code: z.string().min(1),
  transactionId: z.string().min(1),
  siteId: z.string().min(1),
  amount: z.number().min(0),
});

export const PosValidateSubscriptionSchema = z.object({
  customerId: z.string().min(1),
  siteId: z.string().min(1),
});

// ═══════════════════════════════════════════════════════
// Type exports
// ═══════════════════════════════════════════════════════

export type PosIdentifyInput = z.infer<typeof PosIdentifySchema>;
export type PosStartWashInput = z.infer<typeof PosStartWashSchema>;
export type PosUpdateStageInput = z.infer<typeof PosUpdateStageSchema>;
export type PosCompleteWashInput = z.infer<typeof PosCompleteWashSchema>;
export type PosPaymentInput = z.infer<typeof PosPaymentSchema>;
export type PosMachineHeartbeatInput = z.infer<typeof PosMachineHeartbeatSchema>;
export type PosRedeemPromoInput = z.infer<typeof PosRedeemPromoSchema>;
export type PosValidateSubscriptionInput = z.infer<typeof PosValidateSubscriptionSchema>;
