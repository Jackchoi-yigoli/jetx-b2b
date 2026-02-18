import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { userPreferences } from '@/data/settings';
import { teamMembers } from '@/data/team';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const currentUser = teamMembers.find((m) => m.id === userPreferences.userId) ?? teamMembers[0];
const [firstName, ...lastNameParts] = currentUser.name.split(' ');
const lastName = lastNameParts.join(' ');

const timezoneOptions = [
  { value: 'Asia/Taipei', label: 'Asia/Taipei (GMT+8)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8)' },
];

const dateFormatOptions = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'TWD', label: 'TWD (NT$)' },
  { value: 'EUR', label: 'EUR (€)' },
];

const dashboardOptions = [
  { value: 'overview', label: 'Overview' },
  { value: 'operations', label: 'Operations Focus' },
  { value: 'financial', label: 'Financial Focus' },
];

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto (System)' },
];

const emailNotifMap: Record<string, { title: string; desc: string; inputId: string }> = {
  'daily-summary': { title: 'Daily Summary', desc: 'Receive daily activity summary', inputId: 'daily-email' },
  'critical-alerts': { title: 'Critical Alerts', desc: 'Equipment failures, system issues', inputId: 'critical-email' },
  'new-tickets': { title: 'New Tickets', desc: 'When new support tickets are created', inputId: 'ticket-email' },
  'weekly-reports': { title: 'Weekly Reports', desc: 'Performance and revenue reports', inputId: 'weekly-email' },
};

const pushNotifMap: Record<string, { title: string; desc: string; inputId: string }> = {
  'urgent-alerts': { title: 'Urgent Alerts', desc: 'Critical issues requiring immediate attention', inputId: 'urgent-push' },
  'ticket-updates': { title: 'Ticket Updates', desc: 'When tickets assigned to you are updated', inputId: 'ticket-push' },
  'equipment-status': { title: 'Equipment Status', desc: 'Machine status changes and alerts', inputId: 'equipment-push' },
};

const emailPrefs = userPreferences.notificationPreferences.filter((p) => emailNotifMap[p.eventType]);
const pushPrefs = userPreferences.notificationPreferences.filter((p) => pushNotifMap[p.eventType]);

export default async function AccountPage() {
  const t = await getTranslations('account');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.settings')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <Link className="tab active" href="/account">{t('tabs.profile')}</Link>
        <Link className="tab" href="/account/security">{t('tabs.security')}</Link>
        <Link className="tab" href="/account/notifications">{t('tabs.notifications')}</Link>
        <Link className="tab" href="/account/integrations">{t('tabs.integrations')}</Link>
        <Link className="tab" href="/account/api">{t('tabs.apiKeys')}</Link>
      </div>

      <div className="settings-layout">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('profile.sectionTitle')}</h3>
          </div>
          <div className="form-section">
            <div className="profile-header">
              <div className="avatar-upload">
                <span className="avatar-large">{currentUser.avatar}</span>
                <button className="btn btn-sm btn-secondary">{t('profile.changePhoto')}</button>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('profile.firstName')}</label>
                <input type="text" defaultValue={firstName} />
              </div>
              <div className="form-group">
                <label>{t('profile.lastName')}</label>
                <input type="text" defaultValue={lastName} />
              </div>
              <div className="form-group">
                <label>{t('profile.email')}</label>
                <input type="email" defaultValue={currentUser.email} />
              </div>
              <div className="form-group">
                <label>{t('profile.phone')}</label>
                <input type="tel" defaultValue={currentUser.phone} />
              </div>
              <div className="form-group">
                <label>{t('profile.role')}</label>
                <input type="text" defaultValue={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} disabled />
              </div>
              <div className="form-group">
                <label>{t('profile.department')}</label>
                <input type="text" defaultValue="Operations" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">{t('profile.saveChanges')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('securityOverview.sectionTitle')}</h3>
          </div>
          <div className="form-section">
            <div className="security-item">
              <div className="security-info">
                <div className="security-title">{t('securityOverview.password')}</div>
                <div className="security-desc">{t('securityOverview.passwordDesc')}</div>
              </div>
              <button className="btn btn-secondary">{t('securityOverview.changePassword')}</button>
            </div>
            <div className="security-item">
              <div className="security-info">
                <div className="security-title">{t('securityOverview.twoFactor')}</div>
                <div className="security-desc">{t('securityOverview.twoFactorDesc')}</div>
              </div>
              <div className="toggle-switch">
                <input type="checkbox" id="2fa" defaultChecked={currentUser.twoFactorEnabled} />
                <label htmlFor="2fa">{tc('status.enabled')}</label>
              </div>
            </div>
            <div className="security-item">
              <div className="security-info">
                <div className="security-title">{t('securityOverview.activeSessions')}</div>
                <div className="security-desc">{t('securityOverview.activeSessionsDesc')}</div>
              </div>
              <button className="btn btn-secondary">{t('securityOverview.manageSessions')}</button>
            </div>
            <div className="security-item">
              <div className="security-info">
                <div className="security-title">{t('securityOverview.loginHistory')}</div>
                <div className="security-desc">{t('securityOverview.loginHistoryDesc')}</div>
              </div>
              <button className="btn btn-secondary">{t('securityOverview.viewHistory')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('notificationOverview.sectionTitle')}</h3>
          </div>
          <div className="form-section">
            <div className="notification-category">
              <h4>{t('notificationOverview.emailNotifications')}</h4>
              {emailPrefs.map((pref) => {
                const meta = emailNotifMap[pref.eventType];
                if (!meta) return null;
                return (
                  <div className="notification-item" key={pref.eventType}>
                    <div className="notification-info">
                      <div className="notification-title">{meta.title}</div>
                      <div className="notification-desc">{meta.desc}</div>
                    </div>
                    <div className="toggle-switch">
                      <input type="checkbox" id={meta.inputId} defaultChecked={pref.channels.email} />
                      <label htmlFor={meta.inputId}></label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="notification-category">
              <h4>{t('notificationOverview.pushNotifications')}</h4>
              {pushPrefs.map((pref) => {
                const meta = pushNotifMap[pref.eventType];
                if (!meta) return null;
                return (
                  <div className="notification-item" key={pref.eventType}>
                    <div className="notification-info">
                      <div className="notification-title">{meta.title}</div>
                      <div className="notification-desc">{meta.desc}</div>
                    </div>
                    <div className="toggle-switch">
                      <input type="checkbox" id={meta.inputId} defaultChecked={pref.channels.push} />
                      <label htmlFor={meta.inputId}></label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">{t('notificationOverview.savePreferences')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('preferences.sectionTitle')}</h3>
          </div>
          <div className="form-section">
            <div className="form-grid">
              <div className="form-group">
                <label>{t('preferences.language')}</label>
                <LanguageSwitcher />
              </div>
              <div className="form-group">
                <label>{t('preferences.timezone')}</label>
                <select defaultValue={userPreferences.timezone}>
                  {timezoneOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t('preferences.dateFormat')}</label>
                <select defaultValue={userPreferences.dateFormat}>
                  {dateFormatOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t('preferences.currencyDisplay')}</label>
                <select defaultValue={userPreferences.currency}>
                  {currencyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t('preferences.defaultDashboard')}</label>
                <select defaultValue="overview">
                  {dashboardOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t('preferences.theme')}</label>
                <select defaultValue={userPreferences.theme}>
                  {themeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">{t('preferences.savePreferences')}</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
