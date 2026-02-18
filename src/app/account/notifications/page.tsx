import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';

function NotificationItem({ id, title, desc, defaultChecked }: { id: string; title: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="notification-item">
      <div className="notification-info">
        <div className="notification-title">{title}</div>
        <div className="notification-desc">{desc}</div>
      </div>
      <div className="toggle-switch">
        <input type="checkbox" id={id} defaultChecked={defaultChecked} />
        <label htmlFor={id}></label>
      </div>
    </div>
  );
}

export default async function AccountNotificationsPage() {
  const t = await getTranslations('account');
  const tc = await getTranslations('common');

  const accountTabs = [
    { label: t('tabs.profile'), href: '/account' },
    { label: t('tabs.security'), href: '/account/security' },
    { label: t('tabs.notifications'), href: '/account/notifications' },
    { label: t('tabs.integrations'), href: '/account/integrations' },
    { label: t('tabs.apiKeys'), href: '/account/api' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.settings')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/account">{t('breadcrumb')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('notifications.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      <TabNav tabs={accountTabs} />

      <div className="settings-layout">
        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.emailSectionTitle')}</h3>
            <div className="toggle-switch">
              <input type="checkbox" id="email-master" defaultChecked />
              <label htmlFor="email-master">{t('notifications.allEmails')}</label>
            </div>
          </div>
          <div className="form-section">
            <div className="notification-category">
              <h4>{t('notifications.categoryDailyOps')}</h4>
              <NotificationItem id="daily-email" title={t('notifications.dailySummary')} desc={t('notifications.dailySummaryDesc')} defaultChecked />
              <NotificationItem id="weekly-email" title={t('notifications.weeklyReports')} desc={t('notifications.weeklyReportsDesc')} defaultChecked />
              <NotificationItem id="monthly-email" title={t('notifications.monthlyAnalytics')} desc={t('notifications.monthlyAnalyticsDesc')} defaultChecked />
            </div>
            <div className="notification-category">
              <h4>{t('notifications.categoryAlerts')}</h4>
              <NotificationItem id="critical-email" title={t('notifications.criticalAlerts')} desc={t('notifications.criticalAlertsDesc')} defaultChecked />
              <NotificationItem id="warning-email" title={t('notifications.equipmentWarnings')} desc={t('notifications.equipmentWarningsDesc')} defaultChecked />
              <NotificationItem id="security-email" title={t('notifications.securityAlerts')} desc={t('notifications.securityAlertsDesc')} defaultChecked />
            </div>
            <div className="notification-category">
              <h4>{t('notifications.categorySupport')}</h4>
              <NotificationItem id="ticket-new-email" title={t('notifications.newTickets')} desc={t('notifications.newTicketsDesc')} defaultChecked />
              <NotificationItem id="ticket-update-email" title={t('notifications.ticketUpdates')} desc={t('notifications.ticketUpdatesDesc')} defaultChecked />
              <NotificationItem id="ticket-resolved-email" title={t('notifications.ticketResolved')} desc={t('notifications.ticketResolvedDesc')} />
            </div>
            <div className="notification-category">
              <h4>{t('notifications.categoryBusiness')}</h4>
              <NotificationItem id="customer-email" title={t('notifications.newCustomers')} desc={t('notifications.newCustomersDesc')} />
              <NotificationItem id="membership-email" title={t('notifications.membershipChanges')} desc={t('notifications.membershipChangesDesc')} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.pushSectionTitle')}</h3>
            <div className="toggle-switch">
              <input type="checkbox" id="push-master" defaultChecked />
              <label htmlFor="push-master">{t('notifications.allPush')}</label>
            </div>
          </div>
          <div className="form-section">
            <div className="notification-category">
              <NotificationItem id="urgent-push" title={t('notifications.urgentAlerts')} desc={t('notifications.urgentAlertsDesc')} defaultChecked />
              <NotificationItem id="assign-push" title={t('notifications.ticketAssignments')} desc={t('notifications.ticketAssignmentsDesc')} defaultChecked />
              <NotificationItem id="ticket-push" title={t('notifications.ticketUpdatesPush')} desc={t('notifications.ticketUpdatesPushDesc')} defaultChecked />
              <NotificationItem id="equipment-push" title={t('notifications.equipmentStatus')} desc={t('notifications.equipmentStatusDesc')} />
              <NotificationItem id="mention-push" title={t('notifications.teamMentions')} desc={t('notifications.teamMentionsDesc')} defaultChecked />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.smsSectionTitle')}</h3>
            <span className="badge badge-muted">{t('notifications.smsPremium')}</span>
          </div>
          <div className="form-section">
            <div className="sms-setup" style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{t('notifications.smsDesc')}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1, maxWidth: '250px', marginBottom: 0 }}>
                  <label>{t('notifications.phoneNumber')}</label>
                  <input type="tel" defaultValue="+886-912-345-678" />
                </div>
                <span className="badge badge-success">{tc('status.verified')}</span>
              </div>
            </div>
            <div className="notification-category">
              <NotificationItem id="critical-sms" title={t('notifications.criticalSystemAlerts')} desc={t('notifications.criticalSystemAlertsDesc')} defaultChecked />
              <NotificationItem id="equipment-sms" title={t('notifications.equipmentFailures')} desc={t('notifications.equipmentFailuresDesc')} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.quietHoursTitle')}</h3>
          </div>
          <div className="form-section">
            <p className="form-description" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{t('notifications.quietHoursDesc')}</p>
            <div style={{ marginBottom: '1rem' }}>
              <div className="toggle-switch">
                <input type="checkbox" id="quiet-hours" defaultChecked />
                <label htmlFor="quiet-hours">{t('notifications.enableQuietHours')}</label>
              </div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('notifications.startTime')}</label>
                  <input type="time" defaultValue="22:00" />
                </div>
                <div className="form-group">
                  <label>{t('notifications.endTime')}</label>
                  <input type="time" defaultValue="07:00" />
                </div>
              </div>
              <div className="form-group">
                <label>{t('notifications.days')}</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[
                    { day: 'Sun', checked: false },
                    { day: 'Mon', checked: true },
                    { day: 'Tue', checked: true },
                    { day: 'Wed', checked: true },
                    { day: 'Thu', checked: true },
                    { day: 'Fri', checked: true },
                    { day: 'Sat', checked: false },
                  ].map(({ day, checked }) => (
                    <label key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '36px', borderRadius: '4px', background: checked ? 'var(--primary)' : 'var(--bg-tertiary)', color: checked ? 'white' : undefined, fontSize: '0.75rem', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={checked} style={{ display: 'none' }} />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">{t('notifications.savePreferences')}</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
