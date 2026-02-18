import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function TeamInvitationsPage() {
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
          {t('tabs.invitations')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.inviteUser')}
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
        <div className="card-header">
          <h3>{t('invitations.sections.pendingInvitations')}</h3>
          <span className="badge badge-warning">3 {t('invitations.pending')}</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{tc('table.email')}</th>
                <th>{t('table.role')}</th>
                <th>{t('table.siteAccess')}</th>
                <th>{t('invitations.table.invitedBy')}</th>
                <th>{t('invitations.table.sent')}</th>
                <th>{t('invitations.table.expires')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cell-primary">jennifer.liu@cleanwash.com</div>
                </td>
                <td><span className="badge badge-secondary">Operator</span></td>
                <td>CleanWash Sites (12)</td>
                <td>John Chen</td>
                <td>Dec 6, 2025</td>
                <td><span style={{ color: 'var(--warning)' }}>Dec 13, 2025</span></td>
                <td>
                  <button className="btn btn-sm">{t('invitations.actions.resend')}</button>
                  <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', marginLeft: '0.25rem' }}>{t('invitations.actions.revoke')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">alex.chen@quickshine.com</div>
                </td>
                <td><span className="badge badge-secondary">Site Manager</span></td>
                <td>QuickShine Daan</td>
                <td>Sarah Wong</td>
                <td>Dec 5, 2025</td>
                <td><span style={{ color: 'var(--warning)' }}>Dec 12, 2025</span></td>
                <td>
                  <button className="btn btn-sm">{t('invitations.actions.resend')}</button>
                  <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', marginLeft: '0.25rem' }}>{t('invitations.actions.revoke')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">marketing@jetx.com</div>
                </td>
                <td><span className="badge badge-muted">Viewer</span></td>
                <td>All Sites (Read Only)</td>
                <td>John Chen</td>
                <td>Dec 4, 2025</td>
                <td><span style={{ color: 'var(--danger)' }}>Dec 11, 2025</span></td>
                <td>
                  <button className="btn btn-sm">{t('invitations.actions.resend')}</button>
                  <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', marginLeft: '0.25rem' }}>{t('invitations.actions.revoke')}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('invitations.sections.invitationHistory')}</h3>
          <div className="card-actions">
            <select className="form-select-sm">
              <option>{tc('filters.allStatus')}</option>
              <option>{tc('status.active')}</option>
              <option>{tc('status.expired')}</option>
              <option>{tc('status.revoked')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{tc('table.email')}</th>
                <th>{t('table.role')}</th>
                <th>{t('invitations.table.invitedBy')}</th>
                <th>{t('invitations.table.sent')}</th>
                <th>{tc('table.status')}</th>
                <th>{t('invitations.table.result')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className="cell-primary">lisa.wang@jetx.com</div></td>
                <td><span className="badge badge-secondary">Site Manager</span></td>
                <td>John Chen</td>
                <td>Nov 28, 2025</td>
                <td><span className="badge badge-success">{t('invitations.status.accepted')}</span></td>
                <td><span style={{ color: 'var(--success)' }}>Joined Nov 29, 2025</span></td>
              </tr>
              <tr>
                <td><div className="cell-primary">david.lee@quickshine.com</div></td>
                <td><span className="badge badge-secondary">Operator</span></td>
                <td>Sarah Wong</td>
                <td>Nov 25, 2025</td>
                <td><span className="badge badge-success">{t('invitations.status.accepted')}</span></td>
                <td><span style={{ color: 'var(--success)' }}>Joined Nov 26, 2025</span></td>
              </tr>
              <tr>
                <td><div className="cell-primary">tech.team@metroauto.com</div></td>
                <td><span className="badge badge-warning">Support</span></td>
                <td>John Chen</td>
                <td>Nov 20, 2025</td>
                <td><span className="badge badge-success">{t('invitations.status.accepted')}</span></td>
                <td><span style={{ color: 'var(--success)' }}>Joined Nov 21, 2025</span></td>
              </tr>
              <tr style={{ opacity: 0.6 }}>
                <td><div className="cell-primary">james.wu@oldpartner.com</div></td>
                <td><span className="badge badge-secondary">Operator</span></td>
                <td>Sarah Wong</td>
                <td>Nov 15, 2025</td>
                <td><span className="badge badge-muted">{tc('status.expired')}</span></td>
                <td><span style={{ color: 'var(--text-muted)' }}>{t('invitations.status.neverAccepted')}</span></td>
              </tr>
              <tr style={{ opacity: 0.6 }}>
                <td><div className="cell-primary">test@example.com</div></td>
                <td><span className="badge badge-muted">Viewer</span></td>
                <td>John Chen</td>
                <td>Nov 10, 2025</td>
                <td><span className="badge badge-danger">{tc('status.revoked')}</span></td>
                <td><span style={{ color: 'var(--text-muted)' }}>{t('invitations.status.revokedByAdmin')}</span></td>
              </tr>
              <tr>
                <td><div className="cell-primary">amy.zhang@jetx.com</div></td>
                <td><span className="badge badge-muted">Viewer</span></td>
                <td>John Chen</td>
                <td>Nov 5, 2025</td>
                <td><span className="badge badge-success">{t('invitations.status.accepted')}</span></td>
                <td><span style={{ color: 'var(--success)' }}>Joined Nov 5, 2025</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="btn btn-sm" disabled>{tc('actions.previous')}</button>
          <span className="pagination-info">{t('pagination.pageOf', { page: 1, total: 3 })}</span>
          <button className="btn btn-sm">{tc('actions.next')}</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('invitations.sections.quickInvite')}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--primary)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>{t('invitations.quickInvite.newOperator')}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>{t('invitations.quickInvite.newOperatorDesc')}</p>
            <button className="btn btn-sm btn-primary">{t('invitations.quickInvite.inviteOperator')}</button>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--primary)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>{t('invitations.quickInvite.siteManager')}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>{t('invitations.quickInvite.siteManagerDesc')}</p>
            <button className="btn btn-sm btn-primary">{t('invitations.quickInvite.inviteSiteManager')}</button>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--primary)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>{t('invitations.quickInvite.supportStaff')}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>{t('invitations.quickInvite.supportStaffDesc')}</p>
            <button className="btn btn-sm btn-primary">{t('invitations.quickInvite.inviteSupport')}</button>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--primary)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>{t('invitations.quickInvite.viewer')}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>{t('invitations.quickInvite.viewerDesc')}</p>
            <button className="btn btn-sm btn-primary">{t('invitations.quickInvite.inviteViewer')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
