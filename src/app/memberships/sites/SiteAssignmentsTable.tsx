'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef } from '@/components/ui/DataTable';

export interface SiteAssignmentRow {
  id: string;
  name: string;
  address: string;
  basicPrice: string | null;
  basicStatus: 'standard' | 'override' | 'unavailable';
  premiumPrice: string | null;
  premiumStatus: 'standard' | 'override' | 'unavailable';
  unlimitedPrice: string | null;
  unlimitedStatus: 'standard' | 'override' | 'unavailable';
  activeMembers: number;
  siteMrr: string;
  siteMrrSort: number;
}

function priceBadge(price: string | null, status: 'standard' | 'override' | 'unavailable', notAvailableLabel: string) {
  if (status === 'unavailable' || price === null) {
    return <span className="badge-pill badge-muted">{notAvailableLabel}</span>;
  }
  if (status === 'override') {
    return <span className="badge-pill badge-warning">{price} ⚙</span>;
  }
  return <span className="badge-pill badge-success">{price}</span>;
}

export default function SiteAssignmentsTable({ data }: { data: SiteAssignmentRow[] }) {
  const t = useTranslations('memberships');
  const tc = useTranslations('common');
  const notAvailable = t('sitePlanAssignments.notAvailable');

  const columns: ColumnDef<SiteAssignmentRow>[] = [
    {
      key: 'site',
      header: t('sites.columns.site'),
      sortValue: (row) => row.name,
      searchValue: (row) => `${row.name} ${row.address}`,
      render: (row) => (
        <>
          <div className="cell-primary">
            <Link href={`/sites/${row.id}`} className="link-primary">{row.name}</Link>
          </div>
          <div className="cell-secondary">{row.address}</div>
        </>
      ),
    },
    {
      key: 'basicPrice',
      header: t('sites.columns.basicWithPrice'),
      render: (row) => priceBadge(row.basicPrice, row.basicStatus, notAvailable),
    },
    {
      key: 'premiumPrice',
      header: t('sites.columns.premiumWithPrice'),
      render: (row) => priceBadge(row.premiumPrice, row.premiumStatus, notAvailable),
    },
    {
      key: 'unlimitedPrice',
      header: t('sites.columns.unlimitedWithPrice'),
      render: (row) => priceBadge(row.unlimitedPrice, row.unlimitedStatus, notAvailable),
    },
    {
      key: 'activeMembers',
      header: t('planTemplates.columns.activeMembers'),
      sortValue: (row) => row.activeMembers,
      render: (row) => row.activeMembers.toLocaleString(),
    },
    {
      key: 'siteMrr',
      header: t('sitePlanAssignments.columns.siteMrr'),
      sortValue: (row) => row.siteMrrSort,
      render: (row) => row.siteMrr,
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: (row) => (
        <Link href={`/sites/${row.id}`} className="btn btn-sm">{tc('actions.configure')}</Link>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3>{t('sitePlanAssignments.cardTitle')}</h3>
        <p className="card-description">{t('sites.cardDescription')}</p>
      </div>
      <DataTable
        data={data}
        columns={columns}
        rowKey={(row) => row.id}
        searchPlaceholder={tc('search.placeholder')}
        pageSize={15}
        noResultsText={tc('table.noResults')}
      />
      <div className="table-footer">
        <div className="legend-inline">
          <span className="badge-pill badge-success">$XX</span> {t('sitePlanAssignments.legend.templatePrice')}
          <span className="badge-pill badge-warning">$XX ⚙</span> {t('sitePlanAssignments.legend.siteOverride')}
          <span className="badge-pill badge-muted">{notAvailable}</span> {t('sitePlanAssignments.legend.planNotOffered')}
        </div>
        <span className="result-count">{t('sites.totalSites')}</span>
      </div>
    </div>
  );
}
