import { z } from 'zod';
import { FuelTypeEnum, PaymentMethodEnum } from './schemas';

// ═══════════════════════════════════════════════════════
// Consumer (Mobile App / Customer Portal) Schemas
// ═══════════════════════════════════════════════════════

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(200),
  phone: z.string().min(1),
  language: z.string().default('en'),
  homeSiteId: z.string().min(1),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  phone: z.string().min(1).optional(),
  language: z.string().optional(),
});

export const AddVehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  plate: z.string().min(1).max(20),
  color: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  fuelType: FuelTypeEnum,
  isPrimary: z.boolean().default(false),
});

export const CreateConsumerSubscriptionSchema = z.object({
  planId: z.string().min(1),
  siteId: z.string().min(1),
  paymentMethod: z.string().min(1),
});

export const UpdateConsumerSubscriptionSchema = z.object({
  action: z.enum(['pause', 'resume', 'cancel']),
  cancelReason: z.enum(['price_too_high', 'moving_away', 'not_using_enough', 'service_quality', 'other']).optional(),
});

export const TopUpWalletSchema = z.object({
  amount: z.number().min(1),
  paymentMethod: z.enum(['credit_card', 'line_pay', 'apple_pay']),
});

export const ValidatePromoSchema = z.object({
  code: z.string().min(1),
  siteId: z.string().optional(),
  amount: z.number().min(0).optional(),
});

// ═══════════════════════════════════════════════════════
// Type exports
// ═══════════════════════════════════════════════════════

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type AddVehicleInput = z.infer<typeof AddVehicleSchema>;
export type CreateConsumerSubscriptionInput = z.infer<typeof CreateConsumerSubscriptionSchema>;
export type UpdateConsumerSubscriptionInput = z.infer<typeof UpdateConsumerSubscriptionSchema>;
export type TopUpWalletInput = z.infer<typeof TopUpWalletSchema>;
export type ValidatePromoInput = z.infer<typeof ValidatePromoSchema>;
