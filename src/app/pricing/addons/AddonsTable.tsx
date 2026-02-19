/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

// ─── Types ───

export interface AddonRow {
  id: string;
  name: string;
  descKey: string;
  category: 'interior' | 'exterior' | 'protection';
  basePrice: number;
  memberPrice: number;
  discount: string;
  sitesEnabled: string;
  monthlySales: number;
  revenue: string;
  iconType: 'interior' | 'exterior' | 'protection';
}

export interface ComboRow {
  id: string;
  nameKey: string;
  servicesKey: string;
  regularTotal: string;
  packagePrice: string;
  savings: string;
  monthlySales: number;
  status: string;
}

interface AddonsTableProps {
  addons: AddonRow[];
  combos: ComboRow[];
}

// ─── Icon helpers ───

function InteriorIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function ExteriorIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ProtectionIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function AddonIcon({ type }: { type: 'interior' | 'exterior' | 'protection' }) {
  if (type === 'exterior') return <ExteriorIcon />;
  if (type === 'protection') return <ProtectionIcon />;
  return <InteriorIcon />;
}

function categoryBadgeClass(category: string): string {
  switch (category) {
    case 'exterior': return 'badge-pill badge-success';
    case 'protection': return 'badge-pill badge-warning';
    default: return 'badge-pill badge-info';
  }
}

// ─── Component ───

export default function AddonsTable({ addons, combos }: AddonsTableProps) {
  const t = useTranslations('pricing');
  const tc = useTranslations('common');

  // ─── Addon catalog columns ───

  const addonColumns: ColumnDef<AddonRow>[] = [
    {
      key: 'service',
      header: t('addons.catalog.table.service'),
      render: (row) => (
        <div className="template-name">
          <span className={`template-icon addon-${row.iconType}`}>
            <AddonIcon type={row.iconType} />
          </span>
          <div>
            <strong>{t(`edit.${row.name}` as any)}</strong>
            <span className="template-desc">{t(`addons.catalog.${row.descKey}` as any)}</span>
          </div>
        </div>
      ),
      searchValue: (row) => row.name,
    },
    {
      key: 'category',
      header: t('addons.catalog.table.category'),
      render: (row) => (
        <span className={categoryBadgeClass(row.category)}>
          {t(`addons.categories.${row.category}` as any)}
        </span>
      ),
    },
    {
      key: 'basePrice',
      header: t('addons.catalog.table.basePrice'),
      render: (row) => `$${row.basePrice.toFixed(2)}`,
      sortValue: (row) => row.basePrice,
    },
    {
      key: 'memberPrice',
      header: t('addons.catalog.table.memberPrice'),
      render: (row) => (
        <>
          ${row.memberPrice.toFixed(2)}{' '}
          <span className="text-success">({row.discount} off)</span>
        </>
      ),
      sortValue: (row) => row.memberPrice,
    },
    {
      key: 'sitesEnabled',
      header: t('addons.catalog.table.sitesEnabled'),
      render: (row) => row.sitesEnabled,
    },
    {
      key: 'monthlySales',
      header: t('addons.catalog.table.monthlySales'),
      render: (row) => row.monthlySales.toLocaleString(),
      sortValue: (row) => row.monthlySales,
    },
    {
      key: 'revenue',
      header: t('addons.catalog.table.revenue'),
      render: (row) => row.revenue,
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
      ),
    },
  ];

  const addonFilters: FilterDef[] = [
    {
      key: 'category',
      allLabel: tc('filters.allCategories'),
      options: [
        { label: t('addons.categories.interior'), value: 'interior' },
        { label: t('addons.categories.exterior'), value: 'exterior' },
        { label: t('addons.categories.protection'), value: 'protection' },
      ],
      match: (row: AddonRow, val) => row.category === val,
    },
  ];

  // ─── Combo packages columns ───

  const comboColumns: ColumnDef<ComboRow>[] = [
    {
      key: 'packageName',
      header: t('addons.combos.table.packageName'),
      render: (row) => <strong>{t(`addons.combos.${row.nameKey}` as any)}</strong>,
      searchValue: (row) => row.nameKey,
    },
    {
      key: 'includedServices',
      header: t('addons.combos.table.includedServices'),
      render: (row) => t(`addons.combos.${row.servicesKey}` as any),
    },
    {
      key: 'regularTotal',
      header: t('addons.combos.table.regularTotal'),
      render: (row) => row.regularTotal,
    },
    {
      key: 'packagePrice',
      header: t('addons.combos.table.packagePrice'),
      render: (row) => row.packagePrice,
    },
    {
      key: 'savings',
      header: t('addons.combos.table.savings'),
      render: (row) => <span className="text-success">{row.savings} off</span>,
    },
    {
      key: 'monthlySales',
      header: t('addons.catalog.table.monthlySales'),
      render: (row) => row.monthlySales.toLocaleString(),
      sortValue: (row) => row.monthlySales,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => (
        <span className={`badge-pill ${row.status === 'active' ? 'badge-success' : ''}`}>
          {row.status === 'active' ? tc('status.active') : row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
      ),
    },
  ];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('addons.catalog.cardTitle')}</h3>
        </div>
        <DataTable
          data={addons}
          columns={addonColumns}
          rowKey={(row) => row.id}
          searchPlaceholder="Search add-ons..."
          filters={addonFilters}
          noResultsText={tc('table.noResults')}
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('addons.combos.cardTitle')}</h3>
          <p className="card-description">{t('addons.combos.cardDesc')}</p>
          <button className="btn btn-secondary btn-sm">{t('addons.combos.createCombo')}</button>
        </div>
        <DataTable
          data={combos}
          columns={comboColumns}
          rowKey={(row) => row.id}
          searchPlaceholder="Search combos..."
          noResultsText={tc('table.noResults')}
        />
      </div>
    </>
  );
}
