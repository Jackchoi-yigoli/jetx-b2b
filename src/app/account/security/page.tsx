import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';

export default async function AccountSecurityPage() {
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
          {t('security.breadcrumb')}
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
            <h3>{t('security.passwordSectionTitle')}</h3>
          </div>
          <div className="form-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('security.passwordStrong')}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t('security.passwordLastChanged')}</div>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('security.currentPassword')}</label>
                <input type="password" placeholder={t('security.currentPasswordPlaceholder')} />
              </div>
              <div className="form-group">
                <label>{t('security.newPassword')}</label>
                <input type="password" placeholder={t('security.newPasswordPlaceholder')} />
              </div>
              <div className="form-group">
                <label>{t('security.confirmPassword')}</label>
                <input type="password" placeholder={t('security.confirmPasswordPlaceholder')} />
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0' }}>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>{t('security.requireAtLeast8')}</span>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>{t('security.requireUppercase')}</span>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>{t('security.requireLowercase')}</span>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>{t('security.requireNumber')}</span>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>{t('security.requireSpecial')}</span>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">{t('security.updatePassword')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('security.twoFactorTitle')}</h3>
            <span className="badge badge-success">{tc('status.enabled')}</span>
          </div>
          <div className="form-section">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--success)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{t('security.authenticatorApp')}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('security.authenticatorAppDesc')}</div>
                </div>
                <span className="badge badge-success">{tc('status.active')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid transparent' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{t('security.emailVerification')}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('security.emailVerificationDesc')}</div>
                </div>
                <button className="btn btn-sm">{tc('actions.enable')}</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid transparent' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{t('security.smsVerification')}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('security.smsVerificationDesc')}</div>
                </div>
                <button className="btn btn-sm">{tc('actions.enable')}</button>
              </div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem' }}>{t('security.backupCodes')}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>You have <strong>8 of 10</strong> backup codes remaining. These can be used to access your account if you lose your 2FA device.</p>
              <button className="btn btn-secondary" style={{ marginRight: '0.5rem' }}>{t('security.viewBackupCodes')}</button>
              <button className="btn btn-secondary">{t('security.generateNewCodes')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('security.activeSessionsTitle')}</h3>
            <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{t('security.signOutAll')}</button>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', background: 'rgba(59, 130, 246, 0.1)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Chrome on macOS</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Taipei, Taiwan • 192.168.1.1</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{t('security.activeNow')} <span className="badge badge-info">{t('security.currentSession')}</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Safari on iPhone</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Taipei, Taiwan • Mobile Network</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Last active 2 hours ago</div>
              </div>
              <button className="btn btn-sm">{t('security.signOut')}</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Chrome on iPad</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Taipei, Taiwan • Home WiFi</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Last active yesterday</div>
              </div>
              <button className="btn btn-sm">{t('security.signOut')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('security.loginHistoryTitle')}</h3>
            <button className="btn btn-sm">{tc('actions.export')}</button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{t('security.tableDateTime')}</th>
                  <th>{t('security.tableDevice')}</th>
                  <th>{t('security.tableLocation')}</th>
                  <th>{t('security.tableIpAddress')}</th>
                  <th>{t('security.tableStatus')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dec 8, 2025 10:30 AM</td>
                  <td>Chrome on macOS</td>
                  <td>Taipei, Taiwan</td>
                  <td>192.168.1.1</td>
                  <td><span className="badge badge-success">{t('security.badgeSuccess')}</span></td>
                </tr>
                <tr>
                  <td>Dec 7, 2025 4:15 PM</td>
                  <td>Safari on iPhone</td>
                  <td>Taipei, Taiwan</td>
                  <td>Mobile Network</td>
                  <td><span className="badge badge-success">{t('security.badgeSuccess')}</span></td>
                </tr>
                <tr>
                  <td>Dec 6, 2025 3:45 AM</td>
                  <td>Unknown Browser</td>
                  <td>Moscow, Russia</td>
                  <td>185.220.101.45</td>
                  <td><span className="badge badge-danger">{t('security.badgeFailed')}</span></td>
                </tr>
                <tr>
                  <td>Dec 6, 2025 9:00 AM</td>
                  <td>Chrome on macOS</td>
                  <td>Taipei, Taiwan</td>
                  <td>192.168.1.1</td>
                  <td><span className="badge badge-success">{t('security.badgeSuccess')}</span></td>
                </tr>
                <tr>
                  <td>Dec 5, 2025 8:30 AM</td>
                  <td>Chrome on macOS</td>
                  <td>Taipei, Taiwan</td>
                  <td>192.168.1.1</td>
                  <td><span className="badge badge-success">{t('security.badgeSuccess')}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button className="btn btn-sm" disabled>{tc('actions.previous')}</button>
            <span className="pagination-info">{t('security.paginationInfo', { page: 1, total: 5 })}</span>
            <button className="btn btn-sm">{tc('actions.next')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
