import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function TeamActivityPage() {
  const t = await getTranslations('team');
  const tc = await getTranslations('common');

  const teamTabs = [
    { label: t('tabs.members'), href: '/team' },
    { label: t('tabs.rolesAndPermissions'), href: '/team/roles' },
    { label: t('tabs.invitations'), href: '/team/invitations' },
    { label: t('tabs.activityLog'), href: '/team/activity' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.settings')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/team">{t('breadcrumb')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.activityLog')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {t('activity.actions.exportLog')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={teamTabs} />

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalUsers')}</div>
          <div className="kpi-value">28</div>
          <div className="kpi-trend">{t('kpi.totalUsersTrend')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.activeNow')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend">{t('kpi.activeNowTrend')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.pendingInvites')}</div>
          <div className="kpi-value">3</div>
          <div className="kpi-trend">{t('kpi.pendingInvitesTrend')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.roles')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-trend">{t('kpi.rolesTrend')}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="filter-group">
              <label>{t('activity.filters.user')}</label>
              <select>
                <option value="">{t('activity.filters.allUsers')}</option>
                <option value="jc">John Chen</option>
                <option value="sw">Sarah Wong</option>
                <option value="mc">Michael Chen</option>
                <option value="lw">Lisa Wang</option>
              </select>
            </div>
            <div className="filter-group">
              <label>{t('activity.filters.actionType')}</label>
              <select>
                <option value="">{t('activity.filters.allActions')}</option>
                <option value="login">{t('activity.filters.loginLogout')}</option>
                <option value="user">{t('activity.filters.userManagement')}</option>
                <option value="settings">{t('activity.filters.settingsChanges')}</option>
                <option value="data">{t('activity.filters.dataAccess')}</option>
                <option value="security">{t('activity.filters.securityEvents')}</option>
              </select>
            </div>
            <div className="filter-group">
              <label>{tc('filters.dateRange')}</label>
              <select defaultValue="7d">
                <option value="today">{tc('time.today')}</option>
                <option value="7d">{tc('filters.last7Days')}</option>
                <option value="30d">{tc('filters.last30Days')}</option>
                <option value="90d">{t('activity.filters.last90Days')}</option>
              </select>
            </div>
            <button className="btn btn-secondary">{tc('actions.apply')} {t('filters.label')}</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('activity.sections.recentActivity')}</h3>
          <span style={{ color: 'var(--text-muted)' }}>{tc('filters.last7Days')}</span>
        </div>
        <div style={{ padding: '1rem' }}>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingLeft: '2.5rem' }}>{tc('time.today')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JC</span>
                    <strong style={{ fontSize: '0.875rem' }}>John Chen</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Logged in from <span style={{ color: 'var(--text-muted)' }}>192.168.1.1 (Taipei, TW)</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10 minutes ago</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>SW</span>
                    <strong style={{ fontSize: '0.875rem' }}>Sarah Wong</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Updated pricing for <span style={{ color: 'var(--primary)' }}>JetX Xinyi Station</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>45 minutes ago</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JC</span>
                    <strong style={{ fontSize: '0.875rem' }}>John Chen</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Sent invitation to <span style={{ color: 'var(--text-muted)' }}>jennifer.liu@cleanwash.com</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 hours ago</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(245, 200, 105, 0.15)', color: 'var(--secondary)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>LW</span>
                    <strong style={{ fontSize: '0.875rem' }}>Lisa Wang</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Exported monthly report for <span style={{ color: 'var(--primary)' }}>JetX Xinyi Station</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 hours ago</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingLeft: '2.5rem' }}>{tc('time.yesterday')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(232, 93, 93, 0.15)', color: 'var(--primary)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JC</span>
                    <strong style={{ fontSize: '0.875rem' }}>John Chen</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Changed password</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 7, 2025 at 4:30 PM</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>SW</span>
                    <strong style={{ fontSize: '0.875rem' }}>Sarah Wong</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Updated role for <strong>David Lee</strong> from Viewer to <span className="badge badge-secondary">Operator</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 7, 2025 at 2:15 PM</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(107, 114, 128, 0.15)', color: 'var(--text-muted)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>MC</span>
                    <strong style={{ fontSize: '0.875rem' }}>Michael Chen</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Logged out</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 7, 2025 at 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingLeft: '2.5rem' }}>Dec 6, 2025</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>TT</span>
                    <strong style={{ fontSize: '0.875rem' }}>Tech Team</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Logged in from <span style={{ color: 'var(--text-muted)' }}>10.0.0.50 (Office VPN)</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 6, 2025 at 9:00 AM</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JC</span>
                    <strong style={{ fontSize: '0.875rem' }}>John Chen</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Created new promotion <span style={{ color: 'var(--primary)' }}>Winter Warmup 20% Off</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 6, 2025 at 11:30 AM</div>
                </div>
              </div>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(232, 93, 93, 0.15)', color: 'var(--primary)' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>??</span>
                    <strong style={{ fontSize: '0.875rem' }}>Unknown</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--warning)', marginBottom: '0.25rem' }}>Failed login attempt for <span style={{ color: 'var(--text-muted)' }}>admin@jetx.com</span> from 185.220.101.45</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 6, 2025 at 3:45 AM</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', paddingLeft: '2.5rem' }}>Dec 5, 2025</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="activity-item" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>SW</span>
                    <strong style={{ fontSize: '0.875rem' }}>Sarah Wong</strong>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Sent invitation to <span style={{ color: 'var(--text-muted)' }}>alex.chen@quickshine.com</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dec 5, 2025 at 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pagination">
            <button className="btn btn-sm" disabled>{tc('actions.previous')}</button>
            <span className="pagination-info">{t('pagination.pageOf', { page: 1, total: 8 })}</span>
            <button className="btn btn-sm">{tc('actions.next')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
