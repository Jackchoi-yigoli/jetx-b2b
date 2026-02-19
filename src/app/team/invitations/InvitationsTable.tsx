'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

export interface InvitationRow {
  id: string;
  email: string;
  role: string;
  siteAccess: string;
  invitedBy: string;
  sentDate: string;
  expires: string;
  status: string;
  result: string;
}

const roleBadgeClass: Record<string, string> = {
  Operator: 'badge badge-secondary',
  'Site Manager': 'badge badge-secondary',
  Support: 'badge badge-warning',
  Viewer: 'badge badge-muted',
};

const statusBadgeClass: Record<string, string> = {
  pending: 'badge badge-warning',
  accepted: 'badge badge-success',
  expired: 'badge badge-muted',
  revoked: 'badge badge-danger',
};

export default function InvitationsTable({ data }: { data: InvitationRow[] }) {
  const t = useTranslations('team');
  const tc = useTranslations('common');

  const columns: ColumnDef<InvitationRow>[] = [
    {
      key: 'email',
      header: tc('table.email'),
      searchValue: (row) => row.email,
      render: (row) => <div className="cell-primary">{row.email}</div>,
    },
    {
      key: 'role',
      header: t('table.role'),
      render: (row) => (
        <span className={roleBadgeClass[row.role] ?? 'badge badge-secondary'}>
          {row.role}
        </span>
      ),
    },
    {
      key: 'invitedBy',
      header: t('invitations.table.invitedBy'),
      sortValue: (row) => row.invitedBy,
      render: (row) => row.invitedBy,
    },
    {
      key: 'sentDate',
      header: t('invitations.table.sent'),
      sortValue: (row) => row.sentDate,
      render: (row) => row.sentDate,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => {
        const cls = statusBadgeClass[row.status] ?? 'badge badge-secondary';
        const label =
          row.status === 'pending' ? tc('status.pending')
          : row.status === 'accepted' ? t('invitations.status.accepted')
          : row.status === 'expired' ? tc('status.expired')
          : row.status === 'revoked' ? tc('status.revoked')
          : row.status;
        return <span className={cls}>{label}</span>;
      },
    },
    {
      key: 'result',
      header: t('invitations.table.result'),
      render: (row) => {
        if (row.status === 'pending') {
          return (
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="btn btn-sm">{t('invitations.actions.resend')}</button>
              <button
                className="btn btn-sm"
                style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
              >
                {t('invitations.actions.revoke')}
              </button>
            </div>
          );
        }
        if (row.status === 'accepted' && row.result) {
          return <span style={{ color: 'var(--success)' }}>{row.result}</span>;
        }
        if (row.status === 'expired') {
          return <span style={{ color: 'var(--text-muted)' }}>{t('invitations.status.neverAccepted')}</span>;
        }
        if (row.status === 'revoked') {
          return <span style={{ color: 'var(--text-muted)' }}>{t('invitations.status.revokedByAdmin')}</span>;
        }
        return null;
      },
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.pending'), value: 'pending' },
        { label: t('invitations.status.accepted'), value: 'accepted' },
        { label: tc('status.expired'), value: 'expired' },
        { label: tc('status.revoked'), value: 'revoked' },
      ],
      match: (row: InvitationRow, val: string) => row.status === val,
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3>{t('invitations.sections.pendingInvitations')}</h3>
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
