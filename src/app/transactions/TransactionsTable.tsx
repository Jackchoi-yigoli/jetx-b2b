'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Transaction } from '@/types';

interface TransactionRow extends Transaction {
  customerName: string | null;
  siteName: string;
}

const SERVICE_TYPE_LABELS: Record<string, string> = {
  basic: 'Basic Wash',
  premium: 'Premium Wash',
  ultimate: 'Ultimate Wash',
  deluxe: 'Deluxe Wash',
  'self-service': 'Self-Service',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  membership: 'Membership',
  'credit-card': 'Credit Card',
  cash: 'Cash',
  'jetx-wallet': 'JetX Wallet',
  'line-pay': 'Line Pay',
  'apple-pay': 'Apple Pay',
};

function formatTime(dateTimeStr: string) {
  return new Date(dateTimeStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatAmount(total: number) {
  if (total === 0) return '$0.00';
  if (total < 0) return `-$${Math.abs(total).toFixed(2)}`;
  return `$${total.toFixed(2)}`;
}

export default function TransactionsTable({ data }: { data: TransactionRow[] }) {
  const t = useTranslations('transactions');
  const tc = useTranslations('common');

  const columns: ColumnDef<TransactionRow>[] = [
    {
      key: 'id',
      header: t('table.transactionId'),
      sortValue: (txn) => txn.id,
      searchValue: (txn) => txn.id,
      render: (txn) => (
        <>
          <div className="list-item-title">{txn.id}</div>
          <div className="list-item-subtitle">{formatTime(txn.dateTime)}</div>
        </>
      ),
    },
    {
      key: 'site',
      header: t('table.site'),
      sortValue: (txn) => txn.siteName,
      searchValue: (txn) => txn.siteName,
      render: (txn) => txn.siteName,
    },
    {
      key: 'customer',
      header: t('table.customer'),
      searchValue: (txn) => txn.customerName ?? '',
      render: (txn) => (
        <>
          <div className="list-item-title">{txn.customerName ?? t('table.guest')}</div>
          <div className="list-item-subtitle">{txn.customerId ? txn.customerId.replace('cust-', '#') : '-'}</div>
        </>
      ),
    },
    {
      key: 'service',
      header: t('table.service'),
      render: (txn) => {
        const label = SERVICE_TYPE_LABELS[txn.serviceType] ?? txn.serviceType;
        return txn.addons.length > 0 ? `${label} + ${txn.addons.join(' + ')}` : label;
      },
    },
    {
      key: 'payment',
      header: t('table.payment'),
      render: (txn) => PAYMENT_METHOD_LABELS[txn.paymentMethod] ?? txn.paymentMethod,
    },
    {
      key: 'amount',
      header: tc('table.amount'),
      sortValue: (txn) => txn.total,
      render: (txn) => <strong>{formatAmount(txn.total)}</strong>,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (txn) => {
        const map: Record<string, { cls: string; dot: string; label: string }> = {
          completed: { cls: 'badge-success', dot: 'online', label: tc('status.completed') },
          'in-progress': { cls: 'badge-warning', dot: 'alert', label: tc('status.inProgress') },
          refunded: { cls: 'badge-error', dot: 'offline', label: 'Refunded' },
          failed: { cls: 'badge-error', dot: 'offline', label: tc('status.failed') },
        };
        const s = map[txn.status] ?? { cls: '', dot: '', label: txn.status };
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
        { label: tc('status.completed'), value: 'completed' },
        { label: tc('status.inProgress'), value: 'in-progress' },
        { label: 'Refunded', value: 'refunded' },
        { label: tc('status.failed'), value: 'failed' },
      ],
      match: (row: TransactionRow, val: string) => row.status === val,
    },
    {
      key: 'payment',
      allLabel: t('filters.allPaymentMethods'),
      options: [
        { label: 'Credit Card', value: 'credit-card' },
        { label: 'Membership', value: 'membership' },
        { label: 'JetX Wallet', value: 'jetx-wallet' },
        { label: 'Cash', value: 'cash' },
      ],
      match: (row: TransactionRow, val: string) => row.paymentMethod === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(txn) => txn.id}
      searchPlaceholder={t('filters.searchPlaceholder')}
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => t('pagination.showing', { from, to, total })}
      noResultsText={tc('table.noResults')}
      rowClassName="clickable"
    />
  );
}
