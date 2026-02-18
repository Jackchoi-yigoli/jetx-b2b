import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function TeamRolesPage() {
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
          {t('tabs.rolesAndPermissions')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.createRole')}
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
          <h3>{t('roles.permissionsMatrix')}</h3>
          <div className="card-actions">
            <button className="btn btn-sm">{tc('actions.export')}</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' } as React.CSSProperties}>
            <thead>
              <tr>
                <th style={{ width: '200px' }}>{t('roles.permission')}</th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-premium">Admin</span></th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-info">Manager</span></th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-secondary">Operator</span></th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-secondary">Site Manager</span></th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-warning">Support</span></th>
                <th style={{ textAlign: 'center' }}><span className="badge badge-muted">Viewer</span></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.dashboardAnalytics')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewDashboard')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewAllSitesData')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.exportReports')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.sitesOperations')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.createSites')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.editSiteSettings')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewCctv')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.customersMemberships')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewCustomers')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.editCustomerData')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.manageMemberships')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>View</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.pricingPromotions')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewPricing')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.editPricing')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.managePromotions')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.supportTickets')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewTickets')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.createTickets')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.resolveTickets')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.teamAdministration')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewTeamMembers')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.manageUsers')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Operators</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.manageRoles')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                <td colSpan={7} style={{ padding: '0.75rem 1rem' }}><strong>{t('roles.sections.billingFinance')}</strong></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.viewTransactions')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Own</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--warning)', fontSize: '0.75rem', fontWeight: 500 }}>Assigned</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.processRefunds')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
              <tr>
                <td>{t('roles.permissions.billingSettings')}</td>
                <td style={{ textAlign: 'center' }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>&#10003;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
                <td style={{ textAlign: 'center' }}><span style={{ opacity: 0.5 }}>&#10005;</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('roles.roleDetails')}</h3>
        </div>
        <div className="role-grid">
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-premium">Admin</span>
                <span className="role-count">2 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.admin')}</p>
            <div className="role-users">
              <div className="role-user-avatar" title="John Chen">JC</div>
              <div className="role-user-avatar" title="Sarah Wong">SW</div>
            </div>
          </div>
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-info">Manager</span>
                <span className="role-count">3 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.manager')}</p>
            <div className="role-users">
              <div className="role-user-avatar" title="Kevin Wu">KW</div>
              <div className="role-user-avatar" title="Michelle Lin">ML</div>
              <div className="role-user-avatar" title="Danny Huang">DH</div>
            </div>
          </div>
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-secondary">Operator</span>
                <span className="role-count">8 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.operator')}</p>
            <div className="role-users">
              <div className="role-user-avatar">MC</div>
              <div className="role-user-avatar">DL</div>
              <div className="role-user-avatar">RW</div>
              <span className="role-users-more">+5 more</span>
            </div>
          </div>
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-secondary">Site Manager</span>
                <span className="role-count">10 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.siteManager')}</p>
            <div className="role-users">
              <div className="role-user-avatar">LW</div>
              <div className="role-user-avatar">TC</div>
              <div className="role-user-avatar">JL</div>
              <span className="role-users-more">+7 more</span>
            </div>
          </div>
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-warning">Support</span>
                <span className="role-count">3 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.support')}</p>
            <div className="role-users">
              <div className="role-user-avatar">TT</div>
              <div className="role-user-avatar">SS</div>
              <div className="role-user-avatar">EL</div>
            </div>
          </div>
          <div className="role-card role-card-expanded">
            <div className="role-header">
              <div>
                <span className="badge badge-muted">Viewer</span>
                <span className="role-count">2 users</span>
              </div>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <p className="role-description">{t('roles.descriptions.viewer')}</p>
            <div className="role-users">
              <div className="role-user-avatar">AZ</div>
              <div className="role-user-avatar">PH</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
