'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Customer } from '@/types';

interface CustomerRow extends Customer {
  totalVisits: number;
  totalSpend: number;
  lastVisitDate: string;
  membershipTier: string | null;
}

function getNumericId(id: string) {
  return id.replace(/\D/g, '');
}

export default function CustomersTable({ data }: { data: CustomerRow[] }) {
  const t = useTranslations('customers');
  const tc = useTranslations('common');

  const columns: ColumnDef<CustomerRow>[] = [
    {
      key: 'customer',
      header: t('table.customer'),
      sortValue: (c) => c.name,
      searchValue: (c) => `${c.name} ${c.email}`,
      render: (c) => (
        <Link href={`/customers/${c.id}`} style={{ display: 'contents' }}>
          <div className="list-item-title">{c.name}</div>
          <div className="list-item-subtitle">ID: #{getNumericId(c.id)}</div>
        </Link>
      ),
    },
    {
      key: 'contact',
      header: t('table.contact'),
      searchValue: (c) => `${c.email} ${c.phone}`,
      render: (c) => (
        <>
          <div className="list-item-title">{c.email}</div>
          <div className="list-item-subtitle">{c.phone}</div>
        </>
      ),
    },
    {
      key: 'membership',
      header: t('table.membership'),
      sortValue: (c) => c.membershipTier ?? '',
      render: (c) => {
        const tierMap: Record<string, { cls: string; label: string }> = {
          unlimited: { cls: 'badge-premium', label: t('membership.unlimited') },
          premium: { cls: 'badge-info', label: t('membership.premium') },
          basic: { cls: 'badge-gray', label: t('membership.basic') },
        };
        const tier = c.membershipTier ? tierMap[c.membershipTier] : null;
        if (!tier) return <span className="badge-pill badge-muted">{t('membership.none')}</span>;
        return <span className={`badge-pill ${tier.cls}`}>{tier.label}</span>;
      },
    },
    {
      key: 'totalVisits',
      header: t('table.totalVisits'),
      sortValue: (c) => c.totalVisits,
      render: (c) => c.totalVisits,
    },
    {
      key: 'totalSpend',
      header: t('table.totalSpend'),
      sortValue: (c) => c.totalSpend,
      render: (c) => <strong>${c.totalSpend.toFixed(2)}</strong>,
    },
    {
      key: 'lastVisit',
      header: t('table.lastVisit'),
      sortValue: (c) => c.lastVisitDate,
      render: (c) => c.lastVisitDate,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (c) => {
        const map: Record<string, { cls: string; dot: string; label: string }> = {
          active: { cls: 'badge-success', dot: 'online', label: tc('status.active') },
          'at-risk': { cls: 'badge-warning', dot: 'alert', label: t('status.atRisk') },
          inactive: { cls: 'badge-gray', dot: 'offline', label: tc('status.inactive') },
          churned: { cls: 'badge-error', dot: 'offline', label: t('status.churned') },
        };
        const s = map[c.status] ?? { cls: 'badge-gray', dot: '', label: c.status };
        return (
          <span className={`badge-pill ${s.cls}`}>
            <span className={`status-dot ${s.dot}`}></span>{s.label}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => <button className="btn btn-icon btn-ghost sm">...</button>,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'membership',
      allLabel: t('filters.allMemberships'),
      options: [
        { label: t('membership.unlimited'), value: 'unlimited' },
        { label: t('membership.premium'), value: 'premium' },
        { label: t('membership.basic'), value: 'basic' },
        { label: t('membership.none'), value: 'none' },
      ],
      match: (row: CustomerRow, val: string) =>
        val === 'none' ? !row.membershipTier : row.membershipTier === val,
    },
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.inactive'), value: 'inactive' },
        { label: t('status.atRisk'), value: 'at-risk' },
        { label: t('status.churned'), value: 'churned' },
      ],
      match: (row: CustomerRow, val: string) => row.status === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(c) => c.id}
      searchPlaceholder={t('filters.searchPlaceholder')}
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => t('pagination.showingCustomers', { from, to, total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
