'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

export interface SubscriberRow {
  id: string;
  name: string;
  email: string;
  plan: string;
  site: string;
  startDate: string;
  renewalDate: string;
  amount: string;
  status: string;
}

const planBadgeClass: Record<string, string> = {
  Basic: 'badge badge-info',
  Premium: 'badge badge-premium',
  Unlimited: 'badge badge-secondary',
};

const statusBadgeClass: Record<string, string> = {
  active: 'badge-pill badge-success',
  expiring: 'badge-pill badge-warning',
  cancelled: 'badge-pill badge-error',
  paused: 'badge-pill badge-info',
};

export default function SubscribersTable({ data }: { data: SubscriberRow[] }) {
  const t = useTranslations('memberships');
  const tc = useTranslations('common');

  const columns: ColumnDef<SubscriberRow>[] = [
    {
      key: 'customer',
      header: t('subscribers.columns.customer'),
      sortValue: (row) => row.name,
      searchValue: (row) => `${row.name} ${row.email}`,
      render: (row) => (
        <>
          <div className="cell-primary">{row.name}</div>
          <div className="cell-secondary">#{row.id} · {row.email}</div>
        </>
      ),
    },
    {
      key: 'plan',
      header: t('recentActivity.columns.plan'),
      render: (row) => (
        <span className={planBadgeClass[row.plan] ?? 'badge badge-secondary'}>
          {row.plan}
        </span>
      ),
    },
    {
      key: 'site',
      header: t('subscribers.columns.homeSite'),
      sortValue: (row) => row.site,
      render: (row) => row.site,
    },
    {
      key: 'startDate',
      header: t('subscribers.columns.startDate'),
      sortValue: (row) => row.startDate,
      render: (row) => row.startDate,
    },
    {
      key: 'renewalDate',
      header: t('subscribers.columns.renewalDate'),
      render: (row) => row.renewalDate,
    },
    {
      key: 'amount',
      header: tc('table.amount'),
      sortValue: (row) => row.amount,
      render: (row) => row.amount,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => {
        const cls = statusBadgeClass[row.status] ?? 'badge-pill badge-secondary';
        const label =
          row.status === 'active' ? tc('status.active')
          : row.status === 'expiring' ? t('subscribers.filters.expiringSoon')
          : row.status === 'cancelled' ? t('subscribers.filters.cancelled')
          : row.status === 'paused' ? tc('status.paused')
          : row.status;
        return <span className={cls}>{label}</span>;
      },
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link>
      ),
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'plan',
      allLabel: t('subscribers.filters.allPlans'),
      options: [
        { label: 'Basic', value: 'Basic' },
        { label: 'Premium', value: 'Premium' },
        { label: 'Unlimited', value: 'Unlimited' },
      ],
      match: (row: SubscriberRow, val: string) => row.plan === val,
    },
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: t('subscribers.filters.expiringSoon'), value: 'expiring' },
        { label: t('subscribers.filters.cancelled'), value: 'cancelled' },
        { label: tc('status.paused'), value: 'paused' },
      ],
      match: (row: SubscriberRow, val: string) => row.status === val,
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3>{t('subscribers.cardTitle')}</h3>
      </div>
      <DataTable
        data={data}
        columns={columns}
        rowKey={(row) => row.id}
        searchPlaceholder={tc('actions.search')}
        filters={filters}
        pageSize={10}
        noResultsText={tc('table.noResults')}
        rowClassName="clickable"
      />
    </div>
  );
}
