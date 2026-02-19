'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

export interface NotificationRow {
  id: string;
  title: string;
  body: string;
  type: string;
  audience: string;
  delivered: string;
  opened: string;
  clicked: string;
  sent: string;
}

export default function NotificationsTable({ data }: { data: NotificationRow[] }) {
  const t = useTranslations('marketing');
  const tc = useTranslations('common');

  const columns: ColumnDef<NotificationRow>[] = [
    {
      key: 'notification',
      header: t('notifications.recent.table.notification'),
      searchValue: (row) => `${row.title} ${row.body}`,
      render: (row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '300px' }}>
          <strong style={{ fontSize: '14px' }}>{row.title}</strong>
          <span style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.body}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: tc('table.type'),
      render: (row) => {
        if (row.type === 'promotional') return <span className="badge badge-info">{t('notifications.types.promotional')}</span>;
        if (row.type === 'reminder') return <span className="badge badge-warning">{t('notifications.types.reminder')}</span>;
        if (row.type === 'transactional') return <span className="badge badge-success">{t('notifications.types.transactional')}</span>;
        return <span className="badge">{row.type}</span>;
      },
    },
    {
      key: 'audience',
      header: t('notifications.recent.table.audience'),
      render: (row) => row.audience,
    },
    {
      key: 'delivered',
      header: t('notifications.recent.table.delivered'),
      sortValue: (row) => parseInt(row.delivered.replace(/,/g, ''), 10),
      render: (row) => row.delivered,
    },
    {
      key: 'opened',
      header: t('notifications.recent.table.opened'),
      render: (row) => <span style={{ color: '#22c55e', fontWeight: 500 }}>{row.opened}</span>,
    },
    {
      key: 'clicked',
      header: t('notifications.recent.table.clicked'),
      render: (row) => {
        if (row.clicked === 'N/A') return <span style={{ color: '#94a3b8' }}>N/A</span>;
        return <span style={{ color: '#22c55e', fontWeight: 500 }}>{row.clicked}</span>;
      },
    },
    {
      key: 'sent',
      header: t('notifications.recent.table.sent'),
      render: (row) => row.sent,
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: (row) => {
        if (row.type === 'transactional') {
          return <button className="btn btn-sm">{t('notifications.recent.table.settings')}</button>;
        }
        if (row.type === 'reminder' && row.sent === 'ongoing') {
          return <button className="btn btn-sm">{t('notifications.recent.table.settings')}</button>;
        }
        return (
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button className="btn btn-sm">{tc('actions.view')}</button>
            <button className="btn btn-sm">{t('actions.clone')}</button>
          </div>
        );
      },
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'type',
      allLabel: tc('filters.allTypes'),
      options: [
        { label: t('notifications.types.promotional'), value: 'promotional' },
        { label: t('notifications.types.reminder'), value: 'reminder' },
        { label: t('notifications.types.transactional'), value: 'transactional' },
      ],
      match: (row: NotificationRow, val: string) => row.type === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(row) => row.id}
      searchPlaceholder="Search notifications..."
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => `Showing ${from}–${to} of ${total}`}
      noResultsText={tc('table.noResults')}
    />
  );
}
