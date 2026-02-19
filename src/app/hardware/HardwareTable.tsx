'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Machine } from '@/types';

interface MachineRow extends Machine {
  siteName: string;
}

const categoryLabel: Record<string, string> = {
  'a0-self-service': 'A0',
  'a5-automatic': 'A5',
  'a7-premium': 'A7',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function HardwareTable({ data }: { data: MachineRow[] }) {
  const t = useTranslations('hardware');
  const tc = useTranslations('common');

  const columns: ColumnDef<MachineRow>[] = [
    {
      key: 'machineId',
      header: t('table.machineId'),
      sortValue: (m) => m.serialNumber,
      searchValue: (m) => `${m.serialNumber} ${m.id}`,
      render: (m) => {
        const alertDesc = m.alerts[0]?.title ?? null;
        return (
          <>
            <div className="list-item-title">{m.serialNumber}</div>
            <div className="list-item-subtitle">
              {alertDesc ?? `${m.totalWashCycles.toLocaleString()} ${t('table.totalCycles')}`}
            </div>
          </>
        );
      },
    },
    {
      key: 'site',
      header: t('table.site'),
      sortValue: (m) => m.siteName,
      searchValue: (m) => m.siteName,
      render: (m) => m.siteName,
    },
    {
      key: 'type',
      header: tc('table.type'),
      sortValue: (m) => m.category,
      render: (m) => categoryLabel[m.category] ?? m.category,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (m) => {
        const map: Record<string, { cls: string; dot: string; label: string }> = {
          online: { cls: 'badge-success', dot: 'online', label: tc('status.online') },
          offline: { cls: 'badge-error', dot: 'offline', label: tc('status.offline') },
          error: { cls: 'badge-error', dot: 'offline', label: tc('status.offline') },
          alert: { cls: 'badge-warning', dot: 'alert', label: tc('status.alert') },
          maintenance: { cls: 'badge-warning', dot: 'alert', label: tc('status.maintenance') },
        };
        const s = map[m.status] ?? map.offline;
        return (
          <span className={`badge ${s.cls}`}>
            <span className={`status-dot ${s.dot}`}></span>{s.label}
          </span>
        );
      },
    },
    {
      key: 'uptime',
      header: t('table.uptime'),
      sortValue: (m) => m.healthScore,
      render: (m) => {
        const isDown = m.status === 'offline' || m.status === 'error';
        return isDown ? '--' : `${m.healthScore}.0%`;
      },
    },
    {
      key: 'lastService',
      header: t('table.lastService'),
      sortValue: (m) => new Date(m.lastServiceDate).getTime(),
      render: (m) => formatDate(m.lastServiceDate),
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
        { label: tc('status.online'), value: 'online' },
        { label: tc('status.alert'), value: 'alert' },
        { label: tc('status.offline'), value: 'offline' },
      ],
      match: (row: MachineRow, val: string) => {
        if (val === 'alert') return row.status === 'alert' || row.status === 'maintenance';
        if (val === 'offline') return row.status === 'offline' || row.status === 'error';
        return row.status === val;
      },
    },
    {
      key: 'type',
      allLabel: tc('filters.allTypes'),
      options: [
        { label: 'A0', value: 'a0-self-service' },
        { label: 'A5', value: 'a5-automatic' },
        { label: 'A7', value: 'a7-premium' },
      ],
      match: (row: MachineRow, val: string) => row.category === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(m) => m.id}
      searchPlaceholder={t('filters.searchEquipment')}
      filters={filters}
      pageSize={10}
      paginationText={({ total }) => t('pagination.showing', { count: total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
