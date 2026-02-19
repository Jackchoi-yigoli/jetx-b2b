'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

export interface PromoRow {
  id: string;
  code: string;
  description: string;
  discount: string;
  discountBadge: string;
  sites: string;
  sitesBadge?: string;
  usesLimit: string;
  validPeriod: string;
  revenue: string;
  status: string;
}

export default function PromotionsTable({ data }: { data: PromoRow[] }) {
  const t = useTranslations('marketing');
  const tc = useTranslations('common');

  const columns: ColumnDef<PromoRow>[] = [
    {
      key: 'code',
      header: t('promoCodes.table.code'),
      searchValue: (row) => row.code,
      render: (row) => (
        <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 600, background: '#f1f5f9', padding: '4px 10px', borderRadius: '4px', color: '#E85D5D', fontSize: '13px', letterSpacing: '0.5px' }}>
          {row.code}
        </span>
      ),
    },
    {
      key: 'description',
      header: tc('table.description'),
      searchValue: (row) => row.description,
      render: (row) => row.description,
    },
    {
      key: 'discount',
      header: t('promoCodes.table.discount'),
      render: (row) => <span className={`badge ${row.discountBadge}`}>{row.discount}</span>,
    },
    {
      key: 'sites',
      header: t('promoCodes.table.sites'),
      render: (row) => (
        <span className={`badge ${row.sitesBadge ?? 'badge-info'}`}>{row.sites}</span>
      ),
    },
    {
      key: 'usesLimit',
      header: t('promotions.table.usesLimit'),
      render: (row) => row.usesLimit,
    },
    {
      key: 'validPeriod',
      header: t('promotions.table.validPeriod'),
      render: (row) => row.validPeriod,
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortValue: (row) => {
        if (row.revenue === '-') return 0;
        return parseFloat(row.revenue.replace(/[$,]/g, ''));
      },
      render: (row) => row.revenue,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => {
        if (row.status === 'active') return <span className="badge badge-success">{tc('status.active')}</span>;
        if (row.status === 'scheduled') return <span className="badge badge-warning">{tc('status.scheduled')}</span>;
        if (row.status === 'expired') return <span className="badge badge-muted">{tc('status.expired')}</span>;
        return <span className="badge">{row.status}</span>;
      },
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: (row) => {
        if (row.status === 'expired') {
          return <button className="btn btn-sm">{t('actions.clone')}</button>;
        }
        return <Link href={`/marketing/${row.id}/edit`} className="btn btn-sm">{tc('actions.edit')}</Link>;
      },
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.scheduled'), value: 'scheduled' },
        { label: tc('status.expired'), value: 'expired' },
      ],
      match: (row: PromoRow, val: string) => row.status === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(row) => row.id}
      searchPlaceholder="Search promo codes..."
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => `Showing ${from}–${to} of ${total}`}
      noResultsText={tc('table.noResults')}
    />
  );
}
