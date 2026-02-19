'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Operator } from '@/types';

function formatJoinDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatRevenue(amount: number) {
  return '$' + amount.toLocaleString('en-US');
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function OperatorsTable({ data }: { data: Operator[] }) {
  const t = useTranslations('operators');
  const tc = useTranslations('common');

  const columns: ColumnDef<Operator>[] = [
    {
      key: 'name',
      header: t('table.operatorName'),
      sortValue: (op) => op.name,
      searchValue: (op) => op.name,
      render: (op) => (
        <Link href={`/operators/${op.id}`} style={{ display: 'contents' }}>
          <div className="list-item-title">{op.name}</div>
          <div className="list-item-subtitle">{t('table.since')} {formatJoinDate(op.createdAt)}</div>
        </Link>
      ),
    },
    {
      key: 'contact',
      header: t('table.contactPerson'),
      searchValue: (op) => `${op.contact.name} ${op.contact.email}`,
      render: (op) => (
        <>
          <div className="list-item-title">{op.contact.name}</div>
          <div className="list-item-subtitle">{op.contact.email}</div>
        </>
      ),
    },
    {
      key: 'region',
      header: t('table.region'),
      sortValue: (op) => op.territory,
      render: (op) => op.territory,
    },
    {
      key: 'sites',
      header: t('table.sites'),
      sortValue: (op) => op.siteLimit,
      render: (op) => op.siteLimit,
    },
    {
      key: 'revenue',
      header: t('table.mtdRevenue'),
      sortValue: (op) => op.revenueSharePct * 10000,
      render: (op) => <strong>{formatRevenue(op.revenueSharePct * 10000)}</strong>,
    },
    {
      key: 'contract',
      header: t('table.contract'),
      sortValue: (op) => op.contractType,
      render: (op) => capitalize(op.contractType),
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (op) => {
        const map: Record<string, { cls: string; dot: string; label: string }> = {
          active: { cls: 'badge-success', dot: 'online', label: tc('status.active') },
          suspended: { cls: 'badge-danger', dot: 'offline', label: tc('status.suspended') },
          pending: { cls: 'badge-warning', dot: 'alert', label: tc('status.pending') },
        };
        const s = map[op.status] ?? map.pending;
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
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.pending'), value: 'pending' },
        { label: tc('status.suspended'), value: 'suspended' },
      ],
      match: (row: Operator, val: string) => row.status === val,
    },
    {
      key: 'region',
      allLabel: tc('filters.allRegions'),
      options: [
        { label: t('filters.north'), value: 'North' },
        { label: t('filters.central'), value: 'Central' },
        { label: t('filters.south'), value: 'South' },
        { label: t('filters.east'), value: 'East' },
      ],
      match: (row: Operator, val: string) => row.territory.includes(val),
    },
    {
      key: 'contract',
      allLabel: t('filters.allContractTypes'),
      options: [
        { label: t('filters.franchise'), value: 'franchise' },
        { label: t('filters.license'), value: 'license' },
        { label: t('filters.partnership'), value: 'partnership' },
      ],
      match: (row: Operator, val: string) => row.contractType === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(op) => op.id}
      searchPlaceholder={t('searchPlaceholder')}
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => t('pagination.showing', { from, to, total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
