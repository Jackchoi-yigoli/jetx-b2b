'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Site } from '@/types';

interface SitesTableProps {
  data: Site[];
  operatorNames: Record<string, string>;
}

export default function SitesTable({ data, operatorNames }: SitesTableProps) {
  const t = useTranslations('sites');
  const tc = useTranslations('common');

  const columns: ColumnDef<Site>[] = [
    {
      key: 'name',
      header: t('list.table.siteName'),
      sortValue: (s) => s.name,
      searchValue: (s) => `${s.name} ${s.location}`,
      render: (s) => (
        <>
          <div className="list-item-title">{s.name}</div>
          <div className="list-item-subtitle">{s.location}</div>
        </>
      ),
    },
    {
      key: 'operator',
      header: t('list.table.operator'),
      sortValue: (s) => operatorNames[s.operatorId] ?? s.operatorId,
      searchValue: (s) => operatorNames[s.operatorId] ?? '',
      render: (s) => operatorNames[s.operatorId] ?? s.operatorId,
    },
    {
      key: 'type',
      header: t('list.table.type'),
      sortValue: (s) => s.equipmentType,
      render: (s) => s.equipmentType,
    },
    {
      key: 'machines',
      header: t('list.table.machines'),
      sortValue: (s) => s.bayCount,
      render: (s) => s.bayCount,
    },
    {
      key: 'status',
      header: t('list.table.status'),
      render: (s) => {
        const map: Record<string, { cls: string; dot: string; label: string }> = {
          online: { cls: 'badge-success', dot: 'online', label: t('list.status.online') },
          alert: { cls: 'badge-warning', dot: 'alert', label: t('list.status.alert') },
          offline: { cls: 'badge-error', dot: 'offline', label: t('list.status.offline') },
          maintenance: { cls: 'badge-warning', dot: 'alert', label: t('list.status.maintenance') },
        };
        const st = map[s.status] ?? { cls: 'badge-gray', dot: '', label: s.status };
        return (
          <span className={`badge-pill ${st.cls}`}>
            <span className={`status-dot ${st.dot}`}></span>{st.label}
          </span>
        );
      },
    },
    {
      key: 'revenue',
      header: t('list.table.todaysRevenue'),
      render: (s) => <strong>{s.status === 'offline' ? '$0' : '$—'}</strong>,
    },
    {
      key: 'actions',
      header: t('list.table.actions'),
      render: () => <button className="btn btn-icon btn-ghost sm">...</button>,
    },
  ];

  const uniqueOperators = [...new Set(data.map(s => s.operatorId))].map(id => ({
    label: operatorNames[id] ?? id,
    value: id,
  }));

  const filters: FilterDef[] = [
    {
      key: 'operator',
      allLabel: tc('filters.allOperators'),
      options: uniqueOperators,
      match: (row: Site, val: string) => row.operatorId === val,
    },
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: t('list.status.online'), value: 'online' },
        { label: t('list.status.alert'), value: 'alert' },
        { label: t('list.status.offline'), value: 'offline' },
      ],
      match: (row: Site, val: string) => row.status === val,
    },
    {
      key: 'type',
      allLabel: tc('filters.allTypes'),
      options: [
        { label: 'A0', value: 'A0' },
        { label: 'A5', value: 'A5' },
        { label: 'A7', value: 'A7' },
      ],
      match: (row: Site, val: string) => row.equipmentType.includes(val),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(s) => s.id}
      searchPlaceholder={t('list.searchPlaceholder')}
      filters={filters}
      pageSize={10}
      paginationText={({ total }) => t('list.pagination.showing', { count: total, total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
