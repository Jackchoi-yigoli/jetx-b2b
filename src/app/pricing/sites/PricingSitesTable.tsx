'use client';

import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';

// ─── Types ───

export interface SitePricingRow {
  id: string;
  name: string;
  address: string;
  operator: string;
  template: 'Standard' | 'Premium' | 'Budget';
  basicPrice: string;
  basicOverride: boolean;
  premiumPrice: string;
  premiumOverride: boolean;
  ultimatePrice: string;
  ultimateOverride: boolean;
  overrides: number;
  dynamicRules: number;
  monthlyRevenue: string;
}

interface PricingSitesTableProps {
  data: SitePricingRow[];
}

// ─── Helpers ───

function templateBadgeClass(template: string): string {
  switch (template) {
    case 'Premium': return 'badge-pill badge-premium';
    case 'Budget': return 'badge-pill badge-muted';
    default: return 'badge-pill badge-info';
  }
}

function PriceCell({ price, override }: { price: string; override: boolean }) {
  if (override) {
    return <span className="text-warning">{price} &#9881;</span>;
  }
  return <>{price}</>;
}

// ─── Component ───

export default function PricingSitesTable({ data }: PricingSitesTableProps) {
  const t = useTranslations('pricing');
  const tc = useTranslations('common');

  const columns: ColumnDef<SitePricingRow>[] = [
    {
      key: 'site',
      header: t('siteAssignments.table.site'),
      render: (row) => (
        <div>
          <div className="cell-primary">{row.name}</div>
          <div className="cell-secondary">{row.address}</div>
        </div>
      ),
      searchValue: (row) => `${row.name} ${row.address}`,
    },
    {
      key: 'operator',
      header: t('sites.table.operator'),
      render: (row) => row.operator,
      sortValue: (row) => row.operator,
      searchValue: (row) => row.operator,
    },
    {
      key: 'template',
      header: t('siteAssignments.table.template'),
      render: (row) => (
        <span className={templateBadgeClass(row.template)}>{row.template}</span>
      ),
    },
    {
      key: 'basicWash',
      header: t('edit.basicWash'),
      render: (row) => (
        <PriceCell price={row.basicPrice} override={row.basicOverride} />
      ),
    },
    {
      key: 'premiumWash',
      header: t('edit.premiumWash'),
      render: (row) => (
        <PriceCell price={row.premiumPrice} override={row.premiumOverride} />
      ),
    },
    {
      key: 'ultimateWash',
      header: t('edit.ultimateWash'),
      render: (row) => (
        <PriceCell price={row.ultimatePrice} override={row.ultimateOverride} />
      ),
    },
    {
      key: 'hasOverrides',
      header: t('siteAssignments.table.hasOverrides'),
      render: (row) =>
        row.overrides > 0 ? (
          <span className="badge-pill badge-warning">
            {t('siteAssignments.overrides', { count: row.overrides })}
          </span>
        ) : (
          <span className="text-muted">{t('siteAssignments.table.none')}</span>
        ),
      sortValue: (row) => row.overrides,
    },
    {
      key: 'dynamicRules',
      header: t('siteAssignments.table.dynamicRules'),
      render: (row) => `${row.dynamicRules} ${t('siteAssignments.active')}`,
      sortValue: (row) => row.dynamicRules,
    },
    {
      key: 'monthlyRevenue',
      header: t('siteAssignments.table.monthlyRevenue'),
      render: (row) => row.monthlyRevenue,
      sortValue: (row) => Number(row.monthlyRevenue.replace(/[$,]/g, '')),
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button>
      ),
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'template',
      allLabel: t('siteAssignments.allTemplates'),
      options: [
        { label: 'Standard', value: 'Standard' },
        { label: 'Premium', value: 'Premium' },
        { label: 'Budget', value: 'Budget' },
      ],
      match: (row: SitePricingRow, val) => row.template === val,
    },
    {
      key: 'operator',
      allLabel: tc('filters.allOperators'),
      options: [
        { label: 'ABC Car Wash Co.', value: 'ABC Car Wash Co.' },
        { label: 'XYZ Motors', value: 'XYZ Motors' },
        { label: 'Clean Fleet Inc.', value: 'Clean Fleet Inc.' },
      ],
      match: (row: SitePricingRow, val) => row.operator === val,
    },
    {
      key: 'overrides',
      allLabel: t('sites.overrideStatus'),
      options: [
        { label: t('sites.hasOverrides'), value: 'has' },
        { label: t('siteAssignments.noOverrides'), value: 'none' },
      ],
      match: (row: SitePricingRow, val) =>
        val === 'has' ? row.overrides > 0 : row.overrides === 0,
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{t('sites.allSites', { count: 17 })}</h3>
      </div>
      <DataTable
        data={data}
        columns={columns}
        rowKey={(row) => row.id}
        searchPlaceholder="Search sites..."
        filters={filters}
        noResultsText={tc('table.noResults')}
      />
    </div>
  );
}
