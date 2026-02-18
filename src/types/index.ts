// ─── Core Entities ───

export interface Operator {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  contractType: 'franchise' | 'license' | 'corporate' | 'partnership';
  contractStart: string;
  contractEnd: string;
  revenueSharePct: number;
  territory: string;
  siteLimit: number;
  contact: {
    name: string;
    position: string;
    email: string;
    phone: string;
    address: string;
  };
  taxId: string;
  businessRegistrationNumber: string;
  country: string;
  createdAt: string;
}

export interface OperatingHoursDay {
  open: string;
  close: string;
  closed?: boolean;
}

export interface OperatingHours {
  monday: OperatingHoursDay;
  tuesday: OperatingHoursDay;
  wednesday: OperatingHoursDay;
  thursday: OperatingHoursDay;
  friday: OperatingHoursDay;
  saturday: OperatingHoursDay;
  sunday: OperatingHoursDay;
}

export interface BayConfig {
  bayNumber: number;
  machineId: string;
  machineType: string;
  status: 'active' | 'maintenance' | 'offline';
}

export interface Site {
  id: string;
  operatorId: string;
  siteCode: string;
  name: string;
  location: string;
  address: string;
  type: 'full-service' | 'self-service' | 'hybrid';
  status: 'online' | 'offline' | 'maintenance' | 'alert';
  operatingHours: OperatingHours;
  equipmentType: string;
  contact: {
    name: string;
    phone: string;
  };
  pricingTemplateId: string;
  coordinates: { lat: number; lng: number };
  bayCount: number;
  bays: BayConfig[];
  createdAt: string;
}

// ─── Customer & Vehicle ───

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  homeSiteId: string;
  joinDate: string;
  avatarInitials: string;
  status: 'active' | 'inactive' | 'at-risk' | 'churned';
  segment: 'vip' | 'regular' | 'new' | 'at-risk' | 'occasional';
  walletBalance: number;
}

export interface Vehicle {
  id: string;
  customerId: string;
  make: string;
  model: string;
  plate: string;
  color: string;
  year: number;
  fuelType: 'electric' | 'hybrid' | 'gasoline' | 'diesel';
  isPrimary: boolean;
}

// ─── Transaction ───

export interface WashStage {
  name: string;
  status: 'completed' | 'active' | 'pending';
  startTime?: string;
  duration?: number;
}

export interface Transaction {
  id: string;
  dateTime: string;
  status: 'in-progress' | 'completed' | 'failed' | 'refunded';
  duration: number;
  customerId: string | null;
  vehicleId: string | null;
  siteId: string;
  operatorId: string;
  machineId: string;
  serviceType: 'basic' | 'premium' | 'deluxe' | 'ultimate' | 'self-service';
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'membership' | 'credit-card' | 'cash' | 'line-pay' | 'apple-pay' | 'jetx-wallet';
  pointsEarned: number;
  addons: string[];
  promoCodeId: string | null;
  estimatedDuration: number | null;
  washStages?: WashStage[];
}

// ─── Machine & Hardware ───

export interface MachineSensor {
  id: string;
  label: string;
  value: string;
  unit: string;
  numericValue: number;
  status: 'ok' | 'warning' | 'critical';
  thresholds?: {
    warningMin?: number;
    warningMax?: number;
    criticalMin?: number;
    criticalMax?: number;
  };
}

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  date: string;
  type: 'scheduled' | 'emergency' | 'firmware-update' | 'error';
  description: string;
  technician?: string;
  cost?: number;
  status: 'completed' | 'in-progress' | 'scheduled';
}

export interface MachineAlert {
  id: string;
  machineId: string;
  siteId: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  triggeredAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  status: 'active' | 'acknowledged' | 'resolved';
  estimatedRevenueLoss?: number;
  affectedCustomersCount?: number;
}

export interface Machine {
  id: string;
  siteId: string;
  type: 'tunnel' | 'rollover' | 'self-service' | 'vacuum' | 'payment-kiosk';
  category: 'a0-self-service' | 'a5-automatic' | 'a7-premium';
  model: string;
  serialNumber: string;
  bay: number;
  status: 'online' | 'offline' | 'maintenance' | 'error' | 'alert';
  installDate: string;
  warrantyUntil: string;
  firmwareVersion: string;
  totalWashCycles: number;
  lastServiceDate: string;
  nextMaintenanceDate: string;
  healthScore: number;
  sensors: MachineSensor[];
  alerts: MachineAlert[];
  maintenanceHistory: MaintenanceRecord[];
}

// ─── Ticket ───

export interface TicketMessage {
  id: string;
  ticketId: string;
  author: { name: string; role: string; avatar: string };
  type: 'public' | 'internal';
  body: string;
  attachments: { name: string; type: string }[];
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'equipment' | 'billing' | 'customer-service' | 'membership' | 'complaint' | 'software' | 'other';
  siteId: string;
  machineId: string | null;
  assigneeId: string | null;
  createdBy: string;
  createdAt: string;
  slaDue: string;
  messages: TicketMessage[];
  relatedTicketIds: string[];
}

// ─── Membership ───

export interface PlanFeature {
  key: string;
  label: string;
  enabled: boolean;
}

export interface PlanSiteConfig {
  siteId: string;
  siteName: string;
  enabled: boolean;
  priceOverride?: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  tier: 'basic' | 'premium' | 'unlimited';
  tierColor: string;
  status: 'active' | 'archived';
  basePrice: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  annualDiscountPct: number;
  scope: 'single-site' | 'multi-site';
  washesPerMonth: number | 'unlimited';
  addonDiscountPct: number;
  pointsMultiplier: number;
  benefits: string[];
  featureFlags: PlanFeature[];
  siteAvailability: PlanSiteConfig[];
}

export interface BillingRecord {
  id: string;
  subscriptionId: string;
  date: string;
  amount: number;
  status: 'paid' | 'failed' | 'refunded' | 'pending';
  paymentMethod: string;
  invoiceUrl?: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  siteId: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'expiring-soon';
  startDate: string;
  renewalDate: string;
  autoRenewal: boolean;
  billingDay: number;
  paymentMethod: string;
  monthlyAmount: number;
  washesUsedThisMonth: number;
  cancelReason: 'price-too-high' | 'moving-away' | 'not-using-enough' | 'service-quality' | 'other' | null;
  billingHistory: BillingRecord[];
}

// ─── Pricing ───

export interface WashPrice {
  serviceType: 'basic' | 'premium' | 'deluxe' | 'ultimate';
  name: string;
  description: string;
  price: number;
  includes: string[];
}

export interface AddonPrice {
  id: string;
  name: string;
  category: 'interior' | 'exterior' | 'protection';
  regularPrice: number;
  memberPrice: number;
}

export interface ComboPackage {
  id: string;
  name: string;
  addonIds: string[];
  regularPrice: number;
  memberPrice: number;
  savings: number;
}

export interface DynamicPricingRule {
  id: string;
  name: string;
  description: string;
  type: 'surge' | 'discount';
  triggerType: 'time-based' | 'day-based' | 'weather-based' | 'calendar-based';
  adjustmentPct: number;
  enabled: boolean;
  conditions: string;
  schedule?: string;
  siteCount?: number;
}

export interface PricingSiteAssignment {
  siteId: string;
  siteName: string;
  enabled: boolean;
  priceOverride?: number;
}

export interface PricingTemplate {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  isDefault: boolean;
  currency: string;
  washPrices: WashPrice[];
  addonPrices: AddonPrice[];
  comboPackages: ComboPackage[];
  memberDiscountPct: number;
  dynamicRules: DynamicPricingRule[];
  siteAssignments: PricingSiteAssignment[];
}

// ─── Promo Code ───

export interface AutoApplyTrigger {
  type: 'loyalty-milestone' | 'member-anniversary' | 'bulk-purchase' | 'off-peak' | 'custom';
  condition: string;
}

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed-amount' | 'free-service';
  discountValue: number;
  siteIds: string[];
  usesCount: number;
  usesLimit: number | null;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'expired' | 'disabled';
  autoApply: boolean;
  autoApplyTrigger?: AutoApplyTrigger;
  minPurchaseAmount: number | null;
  campaignId: string | null;
}

// ─── Notification Template ───

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'promotional' | 'transactional' | 'reminder';
  channel: 'push' | 'email' | 'sms' | 'in-app';
  subject: string;
  body: string;
  triggerType: 'manual' | 'automated';
  triggerEvent: string | null;
  enabled: boolean;
}

// ─── Campaign ───

export interface EligibilityRule {
  type: 'membership-tier' | 'visit-count' | 'last-visit' | 'signup-date' | 'location';
  operator: 'equals' | 'greater-than' | 'less-than' | 'between' | 'in';
  value: string | number | string[];
}

export interface CampaignSiteOptOut {
  campaignId: string;
  siteId: string;
  optedOut: boolean;
  reason?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms' | 'in-app';
  category: 'seasonal' | 'referral' | 'recurring' | 'flash-sale' | 'loyalty';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  targetAudience: string;
  targetSegment: 'all' | 'vip' | 'regular' | 'new' | 'at-risk' | 'churned';
  siteIds: string[];
  startDate: string;
  endDate: string;
  sent: number;
  opened: number;
  converted: number;
  budget: number;
  roi: number;
  offerType: 'percentage-off' | 'fixed-amount' | 'free-item' | 'free-upgrade' | 'free-service';
  offerValue: number | string;
  appliesTo: 'all-wash-types' | 'basic-only' | 'premium-only' | 'ultimate-only' | 'addons-only';
  eligibilityRules?: EligibilityRule[];
  siteOptOuts?: CampaignSiteOptOut[];
}

// ─── Reports ───

export interface ReportFilter {
  siteIds?: string[];
  operatorIds?: string[];
  dateRange?: 'last-7-days' | 'last-30-days' | 'last-quarter' | 'custom';
  customStart?: string;
  customEnd?: string;
}

export interface ReportDelivery {
  id: string;
  reportId: string;
  deliveredAt: string;
  status: 'success' | 'failed' | 'pending';
  recipients: string[];
  errorMessage?: string;
}

export interface ScheduledReport {
  id: string;
  name: string;
  reportType: 'financial' | 'operations' | 'customer' | 'marketing';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  format: 'pdf' | 'csv' | 'excel';
  nextRun: string;
  lastRun: string | null;
  status: 'active' | 'paused';
  filters: ReportFilter;
  deliveryHistory?: ReportDelivery[];
}

// ─── Team & Auth ───

export interface RolePermission {
  role: string;
  permissions: {
    dashboard: 'full' | 'read' | 'none';
    operators: 'full' | 'read' | 'none';
    sites: 'full' | 'read' | 'none';
    machines: 'full' | 'read' | 'none';
    customers: 'full' | 'read' | 'none';
    transactions: 'full' | 'read' | 'none';
    tickets: 'full' | 'read' | 'none';
    memberships: 'full' | 'read' | 'none';
    pricing: 'full' | 'read' | 'none';
    marketing: 'full' | 'read' | 'none';
    reports: 'full' | 'read' | 'none';
    settings: 'full' | 'read' | 'none';
    team: 'full' | 'read' | 'none';
  };
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'operator' | 'site-manager' | 'support' | 'viewer';
  avatar: string;
  status: 'active' | 'inactive' | 'invited' | 'disabled';
  siteIds: string[];
  lastActive: string;
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator-app' | 'email' | 'sms' | null;
}

export interface Invitation {
  id: string;
  email: string;
  role: TeamMember['role'];
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: 'login' | 'logout' | 'failed-login' | 'create' | 'update' | 'delete' | 'export' | 'invite' | 'role-change' | 'password-change' | 'settings-change';
  entityType: string;
  entityId: string | null;
  description: string;
  ipAddress: string;
  timestamp: string;
}

export interface LoginSession {
  id: string;
  userId: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
  loginStatus: 'success' | 'failed';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator-app' | 'email' | 'sms' | null;
  backupCodesRemaining: number;
  backupCodesTotal: number;
}

// ─── CCTV ───

export interface Camera {
  id: string;
  siteId: string;
  name: string;
  status: 'online' | 'offline';
  resolution: string;
  fps: number;
  label: string;
  detail: string;
  isActive: boolean;
  lastMotionAt: string | null;
}

export interface CCTVRecording {
  id: string;
  cameraId: string;
  siteId: string;
  startTime: string;
  endTime: string;
  duration: number;
  tags: ('flagged' | 'incident' | 'training' | 'support')[];
  severity?: 'warning' | 'info';
  incidentTitle?: string;
  thumbnailUrl?: string;
}

export interface CCTVStorage {
  siteId: string;
  usedBytes: number;
  totalBytes: number;
  retentionDays: number;
}

// ─── Knowledge Base ───

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'equipment' | 'platform' | 'billing' | 'memberships' | 'operations' | 'training';
  content: string;
  updatedAt: string;
  views: number;
  helpfulCount: number;
  contentType: 'article' | 'video';
  videoDuration: string | null;
  videoLevel: 'beginner' | 'intermediate' | 'advanced' | null;
}

// ─── Settings ───

export interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: 'production' | 'testing';
  permissions: string[];
  rateLimit: number;
  status: 'active' | 'revoked';
  createdAt: string;
  lastUsedAt: string | null;
}

export interface Integration {
  id: string;
  name: string;
  category: 'payment' | 'analytics' | 'crm' | 'notification' | 'accounting';
  status: 'connected' | 'disconnected' | 'error';
  configuredAt: string | null;
  icon: string;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'failing';
  secret: string;
  lastTriggeredAt: string | null;
  failureCount: number;
}

export interface NotificationPref {
  eventType: string;
  channels: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export interface UserPreferences {
  userId: string;
  language: string;
  timezone: string;
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notificationPreferences: NotificationPref[];
}
