'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Ticket } from '@/types';

interface TicketRow extends Ticket {
  siteName: string;
}

const categoryLabel: Record<string, string> = {
  equipment: 'Equipment',
  billing: 'Billing',
  'customer-service': 'Customer Service',
  membership: 'Membership',
  complaint: 'Complaint',
  software: 'Software',
  other: 'Other',
};

const assigneeLabel: Record<string, string> = {
  'team-tech': 'Tech Team',
  'user-sarah': 'Sarah Wong',
  'user-john': 'John Chen',
};

function formatUpdatedAt(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TicketsTable({ data }: { data: TicketRow[] }) {
  const t = useTranslations('tickets');
  const tc = useTranslations('common');

  const columns: ColumnDef<TicketRow>[] = [
    {
      key: 'id',
      header: t('table.ticketId'),
      sortValue: (tk) => tk.id,
      searchValue: (tk) => tk.id,
      render: (tk) => <strong>{tk.id.toUpperCase()}</strong>,
    },
    {
      key: 'subject',
      header: t('table.subject'),
      searchValue: (tk) => `${tk.subject} ${tk.siteName}`,
      render: (tk) => (
        <>
          <div className="list-item-title">{tk.subject}</div>
          <div className="list-item-subtitle">{tk.siteName}</div>
        </>
      ),
    },
    {
      key: 'requester',
      header: t('table.requester'),
      searchValue: (tk) => tk.createdBy,
      render: (tk) => tk.createdBy,
    },
    {
      key: 'category',
      header: t('table.category'),
      sortValue: (tk) => tk.category,
      render: (tk) => categoryLabel[tk.category] ?? tk.category,
    },
    {
      key: 'priority',
      header: t('table.priority'),
      sortValue: (tk) => {
        const order: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
        return order[tk.priority] ?? 4;
      },
      render: (tk) => {
        const map: Record<string, { cls: string; label: string }> = {
          urgent: { cls: 'badge-danger', label: tc('priority.urgent') },
          high: { cls: 'badge-warning', label: tc('priority.high') },
          medium: { cls: 'badge-secondary', label: tc('priority.medium') },
          low: { cls: 'badge-secondary', label: tc('priority.low') },
        };
        const p = map[tk.priority] ?? { cls: 'badge-secondary', label: tk.priority };
        return <span className={`badge ${p.cls}`}>{p.label}</span>;
      },
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (tk) => {
        const map: Record<string, { cls: string; label: string }> = {
          open: { cls: 'badge-warning', label: tc('status.open') },
          'in-progress': { cls: 'badge-info', label: tc('status.inProgress') },
          resolved: { cls: 'badge-success', label: tc('status.resolved') },
          closed: { cls: 'badge-secondary', label: tc('status.closed') },
        };
        const s = map[tk.status] ?? { cls: 'badge-secondary', label: tk.status };
        return <span className={`badge ${s.cls}`}>{s.label}</span>;
      },
    },
    {
      key: 'assignee',
      header: t('table.assignee'),
      render: (tk) => assigneeLabel[tk.assigneeId ?? ''] ?? 'Unassigned',
    },
    {
      key: 'updated',
      header: t('table.updated'),
      sortValue: (tk) => new Date(tk.createdAt).getTime(),
      render: (tk) => formatUpdatedAt(tk.createdAt),
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
        { label: tc('status.open'), value: 'open' },
        { label: tc('status.inProgress'), value: 'in-progress' },
        { label: tc('status.resolved'), value: 'resolved' },
      ],
      match: (row: TicketRow, val: string) => row.status === val,
    },
    {
      key: 'priority',
      allLabel: tc('filters.allPriorities'),
      options: [
        { label: tc('priority.urgent'), value: 'urgent' },
        { label: tc('priority.high'), value: 'high' },
        { label: tc('priority.medium'), value: 'medium' },
        { label: tc('priority.low'), value: 'low' },
      ],
      match: (row: TicketRow, val: string) => row.priority === val,
    },
    {
      key: 'category',
      allLabel: tc('filters.allCategories'),
      options: [
        { label: t('categories.equipment'), value: 'equipment' },
        { label: t('categories.billing'), value: 'billing' },
        { label: t('categories.membership'), value: 'membership' },
        { label: t('categories.complaint'), value: 'complaint' },
      ],
      match: (row: TicketRow, val: string) => row.category === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(tk) => tk.id}
      searchPlaceholder={t('filters.searchPlaceholder')}
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => t('pagination.showing', { from, to, total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
