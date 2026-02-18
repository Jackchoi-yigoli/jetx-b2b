import { operators } from '@/data/operators';
import { sites } from '@/data/sites';
import { customers } from '@/data/customers';
import { vehicles } from '@/data/vehicles';
import { transactions } from '@/data/transactions';
import { machines } from '@/data/machines';
import { tickets } from '@/data/tickets';
import { membershipPlans } from '@/data/membership-plans';
import { subscriptions } from '@/data/subscriptions';
import { pricingTemplates } from '@/data/pricing-templates';
import { promoCodes } from '@/data/promo-codes';
import { campaigns, notificationTemplates } from '@/data/marketing';
import { scheduledReports } from '@/data/reports';
import { teamMembers, rolePermissions, invitations } from '@/data/team';
import { activityLogs } from '@/data/activity-log';
import { cameras, cctvRecordings, cctvStorage } from '@/data/cameras';
import { knowledgeArticles } from '@/data/knowledge';
import { apiKeys, integrations, webhooks, userPreferences, loginSessions, securitySettings } from '@/data/settings';

export {
  operators,
  sites,
  customers,
  vehicles,
  transactions,
  machines,
  tickets,
  membershipPlans,
  subscriptions,
  pricingTemplates,
  promoCodes,
  campaigns,
  notificationTemplates,
  scheduledReports,
  teamMembers,
  rolePermissions,
  invitations,
  activityLogs,
  cameras,
  cctvRecordings,
  cctvStorage,
  knowledgeArticles,
  apiKeys,
  integrations,
  webhooks,
  userPreferences,
  loginSessions,
  securitySettings,
};

// ─── Single Entity Lookups ───

export function getOperatorById(id: string) {
  return operators.find((o) => o.id === id) ?? null;
}

export function getSiteById(id: string) {
  return sites.find((s) => s.id === id) ?? null;
}

export function getCustomerById(id: string) {
  return customers.find((c) => c.id === id) ?? null;
}

export function getVehicleById(id: string) {
  return vehicles.find((v) => v.id === id) ?? null;
}

export function getMachineById(id: string) {
  return machines.find((m) => m.id === id) ?? null;
}

export function getTicketById(id: string) {
  return tickets.find((t) => t.id === id) ?? null;
}

export function getTransactionById(id: string) {
  return transactions.find((t) => t.id === id) ?? null;
}

export function getPlanById(id: string) {
  return membershipPlans.find((p) => p.id === id) ?? null;
}

export function getSubscriptionById(id: string) {
  return subscriptions.find((s) => s.id === id) ?? null;
}

export function getPricingTemplateById(id: string) {
  return pricingTemplates.find((pt) => pt.id === id) ?? null;
}

export function getPromoCodeById(id: string) {
  return promoCodes.find((p) => p.id === id) ?? null;
}

export function getPromoCodeByCode(code: string) {
  return promoCodes.find((p) => p.code === code) ?? null;
}

export function getCampaignById(id: string) {
  return campaigns.find((c) => c.id === id) ?? null;
}

export function getNotificationTemplateById(id: string) {
  return notificationTemplates.find((n) => n.id === id) ?? null;
}

export function getScheduledReportById(id: string) {
  return scheduledReports.find((r) => r.id === id) ?? null;
}

export function getTeamMemberById(id: string) {
  return teamMembers.find((m) => m.id === id) ?? null;
}

export function getTeamMemberByEmail(email: string) {
  return teamMembers.find((m) => m.email === email) ?? null;
}

export function getCameraById(id: string) {
  return cameras.find((c) => c.id === id) ?? null;
}

export function getKnowledgeArticleById(id: string) {
  return knowledgeArticles.find((a) => a.id === id) ?? null;
}

export function getApiKeyById(id: string) {
  return apiKeys.find((k) => k.id === id) ?? null;
}

export function getIntegrationById(id: string) {
  return integrations.find((i) => i.id === id) ?? null;
}

export function getWebhookById(id: string) {
  return webhooks.find((w) => w.id === id) ?? null;
}

export function getRolePermissions(role: string) {
  return rolePermissions.find((r) => r.role === role) ?? null;
}

// ─── Filtered Queries ───

export function getSitesByOperator(operatorId: string) {
  return sites.filter((s) => s.operatorId === operatorId);
}

export function getMachinesBySite(siteId: string) {
  return machines.filter((m) => m.siteId === siteId);
}

export function getTransactionsBySite(siteId: string) {
  return transactions.filter((t) => t.siteId === siteId);
}

export function getTransactionsByCustomer(customerId: string) {
  return transactions.filter((t) => t.customerId === customerId);
}

export function getTransactionsByOperator(operatorId: string) {
  return transactions.filter((t) => t.operatorId === operatorId);
}

export function getTransactionsByMachine(machineId: string) {
  return transactions.filter((t) => t.machineId === machineId);
}

export function getVehiclesByCustomer(customerId: string) {
  return vehicles.filter((v) => v.customerId === customerId);
}

export function getTicketsBySite(siteId: string) {
  return tickets.filter((t) => t.siteId === siteId);
}

export function getTicketsByMachine(machineId: string) {
  return tickets.filter((t) => t.machineId === machineId);
}

export function getTicketsByAssignee(assigneeId: string) {
  return tickets.filter((t) => t.assigneeId === assigneeId);
}

export function getOpenTickets() {
  return tickets.filter((t) => t.status === 'open' || t.status === 'in-progress');
}

export function getCamerasBySite(siteId: string) {
  return cameras.filter((c) => c.siteId === siteId);
}

export function getRecordingsByCamera(cameraId: string) {
  return cctvRecordings.filter((r) => r.cameraId === cameraId);
}

export function getRecordingsBySite(siteId: string) {
  return cctvRecordings.filter((r) => r.siteId === siteId);
}

export function getFlaggedRecordingsBySite(siteId: string) {
  return cctvRecordings.filter((r) => r.siteId === siteId && r.tags.length > 0);
}

export function getCCTVStorageBySite(siteId: string) {
  return cctvStorage.find((s) => s.siteId === siteId) ?? null;
}

export function getSubscriptionsByCustomer(customerId: string) {
  return subscriptions.filter((s) => s.customerId === customerId);
}

export function getActiveSubscriptionsByCustomer(customerId: string) {
  return subscriptions.filter(
    (s) => s.customerId === customerId && s.status === 'active'
  );
}

export function getSubscriptionsBySite(siteId: string) {
  return subscriptions.filter((s) => s.siteId === siteId);
}

export function getSubscriptionsByPlan(planId: string) {
  return subscriptions.filter((s) => s.planId === planId);
}

export function getPromoCodesByCampaign(campaignId: string) {
  return promoCodes.filter((p) => p.campaignId === campaignId);
}

export function getActivePromoCodes() {
  return promoCodes.filter((p) => p.status === 'active');
}

export function getKnowledgeArticlesByCategory(
  category: 'equipment' | 'platform' | 'billing' | 'memberships' | 'operations' | 'training'
) {
  return knowledgeArticles.filter((a) => a.category === category);
}

export function getVideoTutorials() {
  return knowledgeArticles.filter((a) => a.contentType === 'video');
}

export function getTeamMembersByRole(role: string) {
  return teamMembers.filter((m) => m.role === role);
}

export function getActiveTeamMembers() {
  return teamMembers.filter((m) => m.status === 'active');
}

export function getPendingInvitations() {
  return invitations.filter((i) => i.status === 'pending');
}

export function getActivityLogsByUser(userId: string) {
  return activityLogs.filter((l) => l.userId === userId);
}

export function getActivityLogsByAction(action: string) {
  return activityLogs.filter((l) => l.action === action);
}

export function getActiveApiKeys() {
  return apiKeys.filter((k) => k.status === 'active');
}

export function getConnectedIntegrations() {
  return integrations.filter((i) => i.status === 'connected');
}

export function getActiveWebhooks() {
  return webhooks.filter((w) => w.status === 'active');
}

export function getLoginSessionsByUser(userId: string) {
  return loginSessions.filter((s) => s.userId === userId);
}

export function getCurrentSession(userId: string) {
  return loginSessions.find((s) => s.userId === userId && s.isCurrent) ?? null;
}

// ─── Aggregate / Derived Lookups ───

export function getSiteWithMachines(siteId: string) {
  const site = getSiteById(siteId);
  if (!site) return null;
  return { ...site, machines: getMachinesBySite(siteId) };
}

export function getCustomerWithVehicles(customerId: string) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;
  return { ...customer, vehicles: getVehiclesByCustomer(customerId) };
}

export function getCustomerWithSubscriptions(customerId: string) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;
  return {
    ...customer,
    subscriptions: getSubscriptionsByCustomer(customerId),
  };
}

export function getDefaultPricingTemplate() {
  return pricingTemplates.find((pt) => pt.isDefault) ?? pricingTemplates[0] ?? null;
}

export function getSitePricingTemplate(siteId: string) {
  const site = getSiteById(siteId);
  if (!site) return null;
  return getPricingTemplateById(site.pricingTemplateId);
}
