'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { TeamMember } from '@/types';

export interface TeamRow extends TeamMember {
  siteAccess: string;
  lastActive: string;
  roleLabel: string;
  roleBadgeClass: string;
}

export default function TeamTable({ data }: { data: TeamRow[] }) {
  const t = useTranslations('team');
  const tc = useTranslations('common');

  const columns: ColumnDef<TeamRow>[] = [
    {
      key: 'user',
      header: t('table.user'),
      sortValue: (row) => row.name,
      searchValue: (row) => `${row.name} ${row.email}`,
      render: (row) => (
        <div className="user-cell">
          <span className="user-avatar">{row.avatar}</span>
          <div className="user-info">
            <div className="cell-primary">{row.name}</div>
            <div className="cell-secondary">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: t('table.role'),
      sortValue: (row) => row.roleLabel,
      render: (row) => (
        <span className={row.roleBadgeClass}>{row.roleLabel}</span>
      ),
    },
    {
      key: 'siteAccess',
      header: t('table.siteAccess'),
      render: (row) => row.siteAccess,
    },
    {
      key: 'lastActive',
      header: t('table.lastActive'),
      render: (row) => {
        const isOnline = row.lastActive === 'Online now';
        return (
          <>
            {isOnline && <span className="status-dot online"></span>}
            {row.lastActive}
          </>
        );
      },
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => (
        row.status === 'active'
          ? <span className="badge badge-success">{tc('status.active')}</span>
          : <span className="badge badge-muted">{tc('status.inactive')}</span>
      ),
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
      ),
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'role',
      allLabel: tc('filters.allRoles'),
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Operator', value: 'operator' },
        { label: 'Site Manager', value: 'site-manager' },
        { label: 'Support', value: 'support' },
        { label: 'Viewer', value: 'viewer' },
      ],
      match: (row: TeamRow, val: string) => row.role === val,
    },
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.inactive'), value: 'inactive' },
      ],
      match: (row: TeamRow, val: string) => row.status === val,
    },
  ];

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="card-header">
        <h3 className="card-title">{t('sections.teamMembers')}</h3>
        <div className="card-actions">
          <button className="btn btn-sm btn-secondary">{tc('actions.export')}</button>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        rowKey={(row) => row.id}
        searchPlaceholder={tc('actions.search')}
        filters={filters}
        pageSize={10}
        noResultsText={tc('table.noResults')}
      />
    </div>
  );
}
