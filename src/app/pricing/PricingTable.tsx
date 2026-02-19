'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { PricingTemplate } from '@/types';

// ─── Types ───

interface DynamicRule {
  id: string;
  name: string;
  description: string;
  type: string;
  triggerType: string;
  adjustmentPct: number;
  enabled: boolean;
  conditions: string;
  schedule?: string;
  siteCount?: number;
}

interface SiteAssignment {
  siteId: string;
  siteName: string;
  operatorName: string;
  template: string;
  overrides: number;
  dynamicRulesActive: number;
  monthlyRevenue: string;
}

interface PricingTableProps {
  templates: PricingTemplate[];
  dynamicRules: DynamicRule[];
  siteAssignments: SiteAssignment[];
  templateAvgRevenue: string[];
}

// ─── Helpers ───

function getRuleAdjustmentStyle(adjustmentPct: number) {
  return adjustmentPct > 0
    ? { color: 'var(--color-warning)', fontWeight: 600 }
    : { color: 'var(--color-success)', fontWeight: 600 };
}

function formatAdjustment(adjustmentPct: number): string {
  return adjustmentPct > 0 ? `+${adjustmentPct}%` : `${adjustmentPct}%`;
}

function getTriggerTypeLabel(triggerType: string): string {
  switch (triggerType) {
    case 'time-based': return 'Time-based';
    case 'day-based': return 'Day-based';
    case 'weather-based': return 'Weather-based';
    case 'calendar-based': return 'Calendar-based';
    default: return triggerType;
  }
}

function getRuleType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// ─── Component ───

export default function PricingTable({
  templates,
  dynamicRules,
  siteAssignments,
  templateAvgRevenue,
}: PricingTableProps) {
  const t = useTranslations('pricing');
  const tc = useTranslations('common');

  // ─── Templates table ───

  const templateColumns: ColumnDef<PricingTemplate & { avgRevenue: string }>[] = [
    {
      key: 'name',
      header: t('templates.table.name'),
      render: (row) => (
        <div>
          <div className="list-item-title">{row.name}</div>
          <div className="list-item-subtitle">{row.description}</div>
        </div>
      ),
      searchValue: (row) => `${row.name} ${row.description}`,
    },
    {
      key: 'basicWash',
      header: t('templates.table.basicWash'),
      render: (row) => {
        const price = row.washPrices.find((w) => w.serviceType === 'basic')?.price ?? 0;
        return `$${price.toFixed(2)}`;
      },
    },
    {
      key: 'premiumWash',
      header: t('templates.table.premiumWash'),
      render: (row) => {
        const price = row.washPrices.find((w) => w.serviceType === 'premium')?.price ?? 0;
        return `$${price.toFixed(2)}`;
      },
    },
    {
      key: 'ultimateWash',
      header: t('templates.table.ultimateWash'),
      render: (row) => {
        const price = row.washPrices.find((w) => w.serviceType === 'ultimate')?.price ?? 0;
        return `$${price.toFixed(2)}`;
      },
    },
    {
      key: 'sitesUsing',
      header: t('templates.table.sitesUsing'),
      render: (row) => (
        <span className="badge-pill badge-info">
          {row.siteAssignments.length} {t('templates.table.sites')}
        </span>
      ),
      sortValue: (row) => row.siteAssignments.length,
    },
    {
      key: 'avgRevenue',
      header: t('templates.table.avgRevenue'),
      render: (row) => row.avgRevenue,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => (
        <span className="badge-pill badge-success">
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/pricing/template-edit" className="btn btn-secondary">{tc('actions.edit')}</Link>
          <button className="btn btn-secondary">{t('actions.clone')}</button>
        </div>
      ),
    },
  ];

  const templatesWithRevenue = templates.map((tmpl, i) => ({
    ...tmpl,
    avgRevenue: templateAvgRevenue[i] ?? '',
  }));

  // ─── Dynamic rules table ───

  const rulesColumns: ColumnDef<DynamicRule>[] = [
    {
      key: 'name',
      header: t('dynamicRules.table.ruleName'),
      render: (row) => (
        <div>
          <div className="list-item-title">{row.name}</div>
          <div className="list-item-subtitle">{getTriggerTypeLabel(row.triggerType)}</div>
        </div>
      ),
      searchValue: (row) => `${row.name} ${row.triggerType}`,
    },
    {
      key: 'type',
      header: tc('table.type'),
      render: (row) => getRuleType(row.type),
    },
    {
      key: 'conditions',
      header: t('dynamicRules.table.condition'),
      render: (row) => row.conditions,
    },
    {
      key: 'adjustment',
      header: t('dynamicRules.table.adjustment'),
      render: (row) => (
        <span style={getRuleAdjustmentStyle(row.adjustmentPct)}>
          {formatAdjustment(row.adjustmentPct)}
        </span>
      ),
      sortValue: (row) => row.adjustmentPct,
    },
    {
      key: 'sitesEnabled',
      header: t('dynamicRules.table.sitesEnabled'),
      render: (row) => `${row.siteCount ?? 0} ${t('dynamicRules.table.ofSites', { total: 17 })}`,
      sortValue: (row) => row.siteCount ?? 0,
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (row) => (
        <span className={`badge-pill ${row.enabled ? 'badge-success' : ''}`}>
          {row.enabled ? tc('status.active') : tc('status.inactive')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <Link href="/pricing/dynamic" className="btn btn-secondary">{tc('actions.edit')}</Link>
      ),
    },
  ];

  const rulesFilters: FilterDef[] = [
    {
      key: 'type',
      allLabel: 'All Types',
      options: [
        { label: 'Surge', value: 'surge' },
        { label: 'Discount', value: 'discount' },
      ],
      match: (row: DynamicRule, val) => row.type === val,
    },
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.inactive'), value: 'inactive' },
      ],
      match: (row: DynamicRule, val) =>
        val === 'active' ? row.enabled : !row.enabled,
    },
  ];

  // ─── Site assignments table ───

  const siteColumns: ColumnDef<SiteAssignment>[] = [
    {
      key: 'site',
      header: t('siteAssignments.table.site'),
      render: (row) => (
        <div>
          <div className="list-item-title">{row.siteName}</div>
          <div className="list-item-subtitle">{row.operatorName}</div>
        </div>
      ),
      searchValue: (row) => `${row.siteName} ${row.operatorName}`,
    },
    {
      key: 'template',
      header: t('siteAssignments.table.template'),
      render: (row) => row.template,
      searchValue: (row) => row.template,
    },
    {
      key: 'hasOverrides',
      header: t('siteAssignments.table.hasOverrides'),
      render: (row) =>
        row.overrides > 0 ? (
          <span className="badge-pill badge-warning">
            {row.overrides} {t('siteAssignments.override', { count: row.overrides })}
          </span>
        ) : (
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            {t('siteAssignments.noOverrides')}
          </span>
        ),
      sortValue: (row) => row.overrides,
    },
    {
      key: 'dynamicRules',
      header: t('siteAssignments.table.dynamicRules'),
      render: (row) => `${row.dynamicRulesActive} ${t('siteAssignments.active')}`,
      sortValue: (row) => row.dynamicRulesActive,
    },
    {
      key: 'monthlyRevenue',
      header: t('siteAssignments.table.monthlyRevenue'),
      render: (row) => row.monthlyRevenue,
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: (row) => (
        <Link href={`/sites/${row.siteId}/pricing`} className="btn btn-secondary">
          {tc('actions.configure')}
        </Link>
      ),
    },
  ];

  const siteFilters: FilterDef[] = [
    {
      key: 'template',
      allLabel: t('siteAssignments.allTemplates'),
      options: [
        { label: 'Taiwan Standard', value: 'Taiwan Standard' },
        { label: 'Taiwan Premium', value: 'Taiwan Premium' },
        { label: 'Taiwan Budget', value: 'Taiwan Budget' },
      ],
      match: (row: SiteAssignment, val) => row.template === val,
    },
  ];

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('templates.cardTitle')}</h3>
          <button className="btn btn-secondary">{t('actions.newTemplate')}</button>
        </div>
        <DataTable
          data={templatesWithRevenue}
          columns={templateColumns}
          rowKey={(row) => row.id}
          searchPlaceholder="Search templates..."
          rowClassName="clickable"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('dynamicRules.cardTitle')}</h3>
          <button className="btn btn-secondary">{t('actions.newRule')}</button>
        </div>
        <DataTable
          data={dynamicRules}
          columns={rulesColumns}
          rowKey={(row) => row.id}
          searchPlaceholder="Search rules..."
          filters={rulesFilters}
          noResultsText={tc('table.noResults')}
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('siteAssignments.cardTitle')}</h3>
        </div>
        <DataTable
          data={siteAssignments}
          columns={siteColumns}
          rowKey={(row) => row.siteId}
          searchPlaceholder="Search sites..."
          filters={siteFilters}
          rowClassName="clickable"
          noResultsText={tc('table.noResults')}
        />
      </div>
    </>
  );
}
