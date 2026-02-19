import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { teamMembers, rolePermissions } from '@/data/team';
import { getTranslations } from 'next-intl/server';
import TeamTable from './TeamTable';
import type { TeamRow } from './TeamTable';

const roleBadgeClass: Record<string, string> = {
  admin: 'badge badge-premium',
  manager: 'badge badge-info',
  operator: 'badge badge-secondary',
  'site-manager': 'badge badge-secondary',
  support: 'badge badge-warning',
  viewer: 'badge badge-muted',
};

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  manager: 'Manager',
  operator: 'Operator',
  'site-manager': 'Site Manager',
  support: 'Support',
  viewer: 'Viewer',
};

const siteAccessLabels: Record<string, string> = {
  'team-john': 'All Sites',
  'team-sarah': 'All Sites',
  'team-michael': 'CleanWash Sites (12)',
  'team-tech': 'All Sites',
  'team-lisa': 'JetX Xinyi Station',
  'team-david': 'QuickShine Sites (15)',
  'team-amy': 'All Sites (Read Only)',
  'team-robert': 'Metro Auto Sites (4)',
};

const lastActiveLabels: Record<string, string> = {
  'team-john': 'Online now',
  'team-sarah': 'Online now',
  'team-michael': '2 hours ago',
  'team-tech': 'Online now',
  'team-lisa': 'Online now',
  'team-david': 'Yesterday',
  'team-amy': '3 days ago',
  'team-robert': '2 weeks ago',
};

const rolePermissionSummaries: Record<string, string[]> = {
  admin: ['Full system access', 'User management', 'Billing & finance', 'All settings'],
  manager: ['View all data', 'Manage operators', 'Reports access', 'Limited settings'],
  operator: ['Own sites only', 'View transactions', 'Create tickets', 'No settings'],
  'site-manager': ['Assigned site only', 'Daily operations', 'Create tickets', 'View CCTV'],
  support: ['All sites read', 'Customer support', 'Create tickets', 'No settings'],
  viewer: ['Read-only access', 'View reports', 'No edits', 'No settings'],
};

const roleUserCounts: Record<string, number> = {
  admin: 2,
  manager: 3,
  operator: 8,
  'site-manager': 10,
};

export default async function TeamPage() {
  const t = await getTranslations('team');
  const tc = await getTranslations('common');

  const teamRows: TeamRow[] = teamMembers.map((member) => ({
    ...member,
    siteAccess: siteAccessLabels[member.id] ?? 'All Sites',
    lastActive: lastActiveLabels[member.id] ?? 'Unknown',
    roleLabel: roleLabels[member.role] ?? member.role,
    roleBadgeClass: roleBadgeClass[member.role] ?? 'badge badge-secondary',
  }));

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
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.inviteUser')}
            </button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <Link className="tab active" href="/team">{t('tabs.members')}</Link>
        <Link className="tab" href="/team/roles">{t('tabs.rolesAndPermissions')}</Link>
        <Link className="tab" href="/team/invitations">{t('tabs.invitations')}</Link>
        <Link className="tab" href="/team/activity">{t('tabs.activityLog')}</Link>
      </div>

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

      <TeamTable data={teamRows} />

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('sections.roleDefinitions')}</h3>
          <button className="btn btn-sm btn-secondary">{t('actions.createRole')}</button>
        </div>
        <div className="role-grid">
          {rolePermissions.slice(0, 4).map((rp) => (
            <div className="role-card" key={rp.role}>
              <div className="role-header">
                <span className={roleBadgeClass[rp.role] ?? 'badge badge-secondary'}>
                  {roleLabels[rp.role] ?? rp.role}
                </span>
                <span className="role-count">{t('roles.userCount', { count: roleUserCounts[rp.role] ?? 0 })}</span>
              </div>
              <div className="role-permissions">
                {(rolePermissionSummaries[rp.role] ?? []).map((perm) => (
                  <div className="permission" key={perm}>{perm}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
