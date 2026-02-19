import { z } from 'zod';

// ═══════════════════════════════════════════════════════
// Shared Enums (matching Prisma enum values)
// ═══════════════════════════════════════════════════════

export const OperatorStatusEnum = z.enum(['active', 'inactive', 'suspended']);
export const ContractTypeEnum = z.enum(['franchise', 'license', 'corporate', 'partnership']);
export const SiteTypeEnum = z.enum(['full_service', 'self_service', 'hybrid']);
export const SiteStatusEnum = z.enum(['online', 'offline', 'maintenance', 'alert']);
export const CustomerStatusEnum = z.enum(['active', 'inactive', 'at_risk', 'churned']);
export const CustomerSegmentEnum = z.enum(['vip', 'regular', 'new_customer', 'at_risk', 'occasional']);
export const FuelTypeEnum = z.enum(['electric', 'hybrid', 'gasoline', 'diesel']);
export const TransactionStatusEnum = z.enum(['in_progress', 'completed', 'failed', 'refunded']);
export const ServiceTypeEnum = z.enum(['basic', 'premium', 'deluxe', 'ultimate', 'self_service']);
export const PaymentMethodEnum = z.enum(['membership', 'credit_card', 'cash', 'line_pay', 'apple_pay', 'jetx_wallet']);
export const MachineTypeEnum = z.enum(['tunnel', 'rollover', 'self_service', 'vacuum', 'payment_kiosk']);
export const MachineCategoryEnum = z.enum(['a0_self_service', 'a5_automatic', 'a7_premium']);
export const MachineStatusEnum = z.enum(['online', 'offline', 'maintenance', 'error', 'alert']);
export const TicketStatusEnum = z.enum(['open', 'in_progress', 'resolved', 'closed']);
export const TicketPriorityEnum = z.enum(['urgent', 'high', 'medium', 'low']);
export const TicketCategoryEnum = z.enum(['equipment', 'billing', 'customer_service', 'membership', 'complaint', 'software', 'other']);
export const PlanTierEnum = z.enum(['basic', 'premium', 'unlimited']);
export const PlanStatusEnum = z.enum(['active', 'archived']);
export const BillingCycleEnum = z.enum(['monthly', 'quarterly', 'annual']);
export const PlanScopeEnum = z.enum(['single_site', 'multi_site']);
export const SubscriptionStatusEnum = z.enum(['active', 'paused', 'cancelled', 'expired', 'expiring_soon']);
export const DiscountTypeEnum = z.enum(['percentage', 'fixed_amount', 'free_service']);
export const PromoCodeStatusEnum = z.enum(['active', 'expired', 'disabled']);
export const CampaignTypeEnum = z.enum(['email', 'push', 'sms', 'in_app']);
export const CampaignCategoryEnum = z.enum(['seasonal', 'referral', 'recurring', 'flash_sale', 'loyalty']);
export const CampaignStatusEnum = z.enum(['draft', 'scheduled', 'active', 'completed', 'paused']);
export const TeamRoleEnum = z.enum(['admin', 'manager', 'operator', 'site_manager', 'support', 'viewer']);
export const TeamMemberStatusEnum = z.enum(['active', 'inactive', 'invited', 'disabled']);
export const ReportTypeEnum = z.enum(['financial', 'operations', 'customer', 'marketing']);
export const ReportFrequencyEnum = z.enum(['daily', 'weekly', 'monthly', 'quarterly']);
export const ReportFormatEnum = z.enum(['pdf', 'csv', 'excel']);

// ═══════════════════════════════════════════════════════
// Create/Update Schemas
// ═══════════════════════════════════════════════════════

// ─── Operators ───

export const CreateOperatorSchema = z.object({
  name: z.string().min(1).max(200),
  status: OperatorStatusEnum,
  contractType: ContractTypeEnum,
  contractStart: z.string().datetime(),
  contractEnd: z.string().datetime(),
  revenueSharePct: z.number().min(0).max(100),
  territory: z.string().min(1),
  siteLimit: z.number().int().min(1),
  contact: z.object({
    name: z.string().min(1),
    position: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    address: z.string().min(1),
  }),
  taxId: z.string().min(1),
  businessRegistrationNumber: z.string().min(1),
  country: z.string().min(1),
});

export const UpdateOperatorSchema = CreateOperatorSchema.partial();

// ─── Sites ───

export const CreateSiteSchema = z.object({
  operatorId: z.string().min(1),
  siteCode: z.string().min(1),
  name: z.string().min(1).max(200),
  location: z.string().min(1),
  address: z.string().min(1),
  type: SiteTypeEnum,
  status: SiteStatusEnum,
  operatingHours: z.record(z.string(), z.any()),
  equipmentType: z.string().min(1),
  contact: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
  }),
  pricingTemplateId: z.string().min(1),
  coordinates: z.object({ lat: z.number(), lng: z.number() }),
  bayCount: z.number().int().min(0),
});

export const UpdateSiteSchema = CreateSiteSchema.partial();

// ─── Customers ───

export const CreateCustomerSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(1),
  language: z.string().default('en'),
  homeSiteId: z.string().min(1),
  avatarInitials: z.string().max(3),
  status: CustomerStatusEnum,
  segment: CustomerSegmentEnum,
  walletBalance: z.number().min(0).default(0),
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

// ─── Vehicles ───

export const CreateVehicleSchema = z.object({
  customerId: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  plate: z.string().min(1),
  color: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  fuelType: FuelTypeEnum,
  isPrimary: z.boolean().default(false),
});

// ─── Transactions ───

export const CreateTransactionSchema = z.object({
  dateTime: z.string().datetime(),
  status: TransactionStatusEnum,
  duration: z.number().int().min(0),
  customerId: z.string().nullable().optional(),
  vehicleId: z.string().nullable().optional(),
  siteId: z.string().min(1),
  operatorId: z.string().min(1),
  machineId: z.string().min(1),
  serviceType: ServiceTypeEnum,
  subtotal: z.number().min(0),
  discount: z.number().min(0).default(0),
  total: z.number(),
  paymentMethod: PaymentMethodEnum,
  pointsEarned: z.number().int().min(0).default(0),
  addons: z.array(z.string()).default([]),
  promoCodeId: z.string().nullable().optional(),
  estimatedDuration: z.number().int().nullable().optional(),
});

export const UpdateTransactionSchema = z.object({
  status: TransactionStatusEnum.optional(),
  duration: z.number().int().min(0).optional(),
  total: z.number().optional(),
});

// ─── Tickets ───

export const CreateTicketSchema = z.object({
  subject: z.string().min(1).max(500),
  status: TicketStatusEnum.default('open'),
  priority: TicketPriorityEnum,
  category: TicketCategoryEnum,
  siteId: z.string().min(1),
  machineId: z.string().nullable().optional(),
  assigneeId: z.string().nullable().optional(),
  createdBy: z.string().min(1),
  slaDue: z.string().datetime(),
});

export const UpdateTicketSchema = z.object({
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
  assigneeId: z.string().nullable().optional(),
});

export const CreateTicketMessageSchema = z.object({
  ticketId: z.string().min(1),
  authorName: z.string().min(1),
  authorRole: z.string().min(1),
  authorAvatar: z.string().min(1),
  type: z.enum(['public', 'internal']),
  body: z.string().min(1),
  attachments: z.any().default([]),
});

// ─── Membership Plans ───

export const CreatePlanSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  tier: PlanTierEnum,
  tierColor: z.string().min(1),
  status: PlanStatusEnum.default('active'),
  basePrice: z.number().min(0),
  billingCycle: BillingCycleEnum,
  annualDiscountPct: z.number().min(0).max(100).default(0),
  scope: PlanScopeEnum,
  washesPerMonth: z.number().int().default(-1),
  addonDiscountPct: z.number().min(0).max(100).default(0),
  pointsMultiplier: z.number().min(0).default(1),
  benefits: z.array(z.string()).default([]),
});

export const UpdatePlanSchema = CreatePlanSchema.partial();

// ─── Subscriptions ───

export const CreateSubscriptionSchema = z.object({
  customerId: z.string().min(1),
  planId: z.string().min(1),
  siteId: z.string().min(1),
  status: SubscriptionStatusEnum.default('active'),
  startDate: z.string().datetime(),
  renewalDate: z.string().datetime(),
  autoRenewal: z.boolean().default(true),
  billingDay: z.number().int().min(1).max(31),
  paymentMethod: z.string().min(1),
  monthlyAmount: z.number().min(0),
});

export const UpdateSubscriptionSchema = z.object({
  status: SubscriptionStatusEnum.optional(),
  autoRenewal: z.boolean().optional(),
  paymentMethod: z.string().optional(),
  cancelReason: z.enum(['price_too_high', 'moving_away', 'not_using_enough', 'service_quality', 'other']).nullable().optional(),
});

// ─── Pricing Templates ───

export const CreatePricingTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1),
  status: z.enum(['active', 'archived']).default('active'),
  isDefault: z.boolean().default(false),
  currency: z.string().default('TWD'),
  memberDiscountPct: z.number().min(0).max(100).default(0),
});

export const UpdatePricingTemplateSchema = CreatePricingTemplateSchema.partial();

// ─── Promo Codes ───

export const CreatePromoCodeSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  discountType: DiscountTypeEnum,
  discountValue: z.number().min(0),
  usesLimit: z.number().int().nullable().optional(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  status: PromoCodeStatusEnum.default('active'),
  autoApply: z.boolean().default(false),
  autoApplyTrigger: z.any().nullable().optional(),
  minPurchaseAmount: z.number().nullable().optional(),
  campaignId: z.string().nullable().optional(),
});

export const UpdatePromoCodeSchema = z.object({
  description: z.string().optional(),
  status: PromoCodeStatusEnum.optional(),
  usesLimit: z.number().int().nullable().optional(),
  validUntil: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

// ─── Campaigns ───

export const CreateCampaignSchema = z.object({
  name: z.string().min(1).max(200),
  type: CampaignTypeEnum,
  category: CampaignCategoryEnum,
  status: CampaignStatusEnum.default('draft'),
  targetAudience: z.string().min(1),
  targetSegment: z.enum(['all', 'vip', 'regular', 'new_segment', 'at_risk', 'churned']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  budget: z.number().min(0).default(0),
  offerType: z.enum(['percentage_off', 'fixed_amount', 'free_item', 'free_upgrade', 'free_service']),
  offerValue: z.string(),
  appliesTo: z.enum(['all_wash_types', 'basic_only', 'premium_only', 'ultimate_only', 'addons_only']),
});

export const UpdateCampaignSchema = z.object({
  name: z.string().optional(),
  status: CampaignStatusEnum.optional(),
  budget: z.number().optional(),
  endDate: z.string().datetime().optional(),
});

// ─── Team Members ───

export const CreateTeamMemberSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(1),
  role: TeamRoleEnum,
  avatar: z.string().min(1).max(3),
  status: TeamMemberStatusEnum.default('active'),
  siteIds: z.array(z.string()).default([]),
});

export const UpdateTeamMemberSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  role: TeamRoleEnum.optional(),
  status: TeamMemberStatusEnum.optional(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorMethod: z.enum(['authenticator_app', 'email', 'sms']).nullable().optional(),
});

export const CreateInvitationSchema = z.object({
  email: z.string().email(),
  role: TeamRoleEnum,
  invitedBy: z.string().min(1),
  expiresAt: z.string().datetime(),
});

// ─── Reports ───

export const CreateReportSchema = z.object({
  name: z.string().min(1).max(200),
  reportType: ReportTypeEnum,
  frequency: ReportFrequencyEnum,
  recipients: z.array(z.string().email()).min(1),
  format: ReportFormatEnum,
  nextRun: z.string().datetime(),
  status: z.enum(['active', 'paused']).default('active'),
  filters: z.record(z.string(), z.any()),
});

export const UpdateReportSchema = z.object({
  name: z.string().optional(),
  frequency: ReportFrequencyEnum.optional(),
  recipients: z.array(z.string().email()).optional(),
  format: ReportFormatEnum.optional(),
  status: z.enum(['active', 'paused']).optional(),
  filters: z.record(z.string(), z.any()).optional(),
});

// ─── Knowledge Articles ───

export const CreateArticleSchema = z.object({
  title: z.string().min(1).max(500),
  category: z.enum(['equipment', 'platform', 'billing', 'memberships', 'operations', 'training']),
  content: z.string().min(1),
  contentType: z.enum(['article', 'video']),
  videoDuration: z.string().nullable().optional(),
  videoLevel: z.enum(['beginner', 'intermediate', 'advanced']).nullable().optional(),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

// ─── Settings ───

export const CreateApiKeySchema = z.object({
  name: z.string().min(1),
  environment: z.enum(['production', 'testing']),
  permissions: z.array(z.string()),
  rateLimit: z.number().int().min(0),
});

export const CreateWebhookSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  events: z.array(z.string()).min(1),
  secret: z.string().min(1),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const UpdateUserPreferencesSchema = z.object({
  language: z.string().optional(),
  timezone: z.string().optional(),
  dateFormat: z.string().optional(),
  currency: z.string().optional(),
  theme: z.string().optional(),
  notificationPreferences: z.any().optional(),
});

// ═══════════════════════════════════════════════════════
// Type exports
// ═══════════════════════════════════════════════════════

export type CreateOperatorInput = z.infer<typeof CreateOperatorSchema>;
export type UpdateOperatorInput = z.infer<typeof UpdateOperatorSchema>;
export type CreateSiteInput = z.infer<typeof CreateSiteSchema>;
export type UpdateSiteInput = z.infer<typeof UpdateSiteSchema>;
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;
export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;
export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
export type CreateTicketMessageInput = z.infer<typeof CreateTicketMessageSchema>;
export type CreatePlanInput = z.infer<typeof CreatePlanSchema>;
export type UpdatePlanInput = z.infer<typeof UpdatePlanSchema>;
export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof UpdateSubscriptionSchema>;
export type CreatePricingTemplateInput = z.infer<typeof CreatePricingTemplateSchema>;
export type UpdatePricingTemplateInput = z.infer<typeof UpdatePricingTemplateSchema>;
export type CreatePromoCodeInput = z.infer<typeof CreatePromoCodeSchema>;
export type UpdatePromoCodeInput = z.infer<typeof UpdatePromoCodeSchema>;
export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof UpdateCampaignSchema>;
export type CreateTeamMemberInput = z.infer<typeof CreateTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof UpdateTeamMemberSchema>;
export type CreateInvitationInput = z.infer<typeof CreateInvitationSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type UpdateReportInput = z.infer<typeof UpdateReportSchema>;
export type CreateArticleInput = z.infer<typeof CreateArticleSchema>;
export type UpdateArticleInput = z.infer<typeof UpdateArticleSchema>;
export type CreateApiKeyInput = z.infer<typeof CreateApiKeySchema>;
export type CreateWebhookInput = z.infer<typeof CreateWebhookSchema>;
export type UpdateUserPreferencesInput = z.infer<typeof UpdateUserPreferencesSchema>;
