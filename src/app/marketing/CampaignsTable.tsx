'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DataTable from '@/components/ui/DataTable';
import type { ColumnDef, FilterDef } from '@/components/ui/DataTable';
import type { Campaign } from '@/types';

const TOTAL_SITES = 12;

const categoryLabels: Record<string, string> = {
  seasonal: 'Seasonal',
  referral: 'Referral',
  recurring: 'Recurring',
  'flash-sale': 'Flash Sale',
  loyalty: 'Loyalty',
};

const categoryColors: Record<string, string> = {
  seasonal: 'var(--color-success)',
  referral: 'var(--color-info)',
  recurring: '#e5e7eb',
  'flash-sale': 'var(--color-primary)',
  loyalty: '#9333ea',
};

const categoryTextColors: Record<string, string> = {
  recurring: '#111827',
};

function getOfferDisplay(campaign: Campaign): string {
  const v = campaign.offerValue;
  if (campaign.offerType === 'percentage-off') return `${v}% off`;
  if (campaign.offerType === 'free-service') return String(v);
  if (campaign.offerType === 'free-upgrade') return String(v);
  return String(v);
}

function getDurationDisplay(campaign: Campaign): string {
  if (campaign.endDate === '2099-12-31') return 'Ongoing';
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (campaign.category === 'recurring') return 'Every Sat-Sun';
  return `${startStr} - ${endStr}`;
}

function getSitesBadge(campaign: Campaign) {
  const active = campaign.siteIds.length - (campaign.siteOptOuts?.length ?? 0);
  const label = `${active}/${TOTAL_SITES} sites`;
  if (active === TOTAL_SITES) return <span className="badge-pill badge-info">{label}</span>;
  if (active >= 10) return <span className="badge-pill badge-info">{label}</span>;
  if (active >= 8) return <span className="badge-pill badge-warning">{label}</span>;
  return <span className="badge-pill">{label}</span>;
}

export default function CampaignsTable({ data }: { data: Campaign[] }) {
  const t = useTranslations('marketing');
  const tc = useTranslations('common');

  const columns: ColumnDef<Campaign>[] = [
    {
      key: 'campaign',
      header: t('campaigns.table.campaign'),
      sortValue: (c) => c.name,
      searchValue: (c) => `${c.name} ${c.targetAudience}`,
      render: (c) => {
        const initial = c.name.charAt(0);
        const bg = categoryColors[c.category] ?? 'var(--color-primary)';
        const color = categoryTextColors[c.category] ?? '#fff';
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: bg, color, fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>{initial}</span>
            <div>
              <div className="list-item-title">{c.name}</div>
              <div className="list-item-subtitle">{c.targetAudience}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'type',
      header: tc('table.type'),
      render: (c) => categoryLabels[c.category] ?? c.category,
    },
    {
      key: 'offer',
      header: t('campaigns.table.offer'),
      render: (c) => getOfferDisplay(c),
    },
    {
      key: 'duration',
      header: t('campaigns.table.duration'),
      render: (c) => getDurationDisplay(c),
    },
    {
      key: 'sitesActive',
      header: t('campaigns.table.sitesActive'),
      render: (c) => getSitesBadge(c),
    },
    {
      key: 'redemptions',
      header: t('campaigns.table.redemptions'),
      sortValue: (c) => c.converted,
      render: (c) => (c.converted > 0 ? c.converted.toLocaleString() : '-'),
    },
    {
      key: 'status',
      header: tc('table.status'),
      render: (c) => {
        if (c.status === 'active') return <span className="badge-pill badge-success">{tc('status.active')}</span>;
        if (c.status === 'scheduled') return <span className="badge-pill badge-warning">{tc('status.scheduled')}</span>;
        if (c.status === 'paused') return <span className="badge-pill badge-warning">{tc('status.paused')}</span>;
        return <span className="badge-pill">{c.status}</span>;
      },
    },
    {
      key: 'actions',
      header: tc('table.actions'),
      render: () => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/marketing/campaign-edit" className="btn btn-secondary">{tc('actions.edit')}</Link>
          <Link href="/marketing/sites" className="btn btn-secondary">{t('campaigns.table.viewSites')}</Link>
        </div>
      ),
    },
  ];

  const filters: FilterDef[] = [
    {
      key: 'status',
      allLabel: tc('filters.allStatus'),
      options: [
        { label: tc('status.active'), value: 'active' },
        { label: tc('status.scheduled'), value: 'scheduled' },
        { label: tc('status.paused'), value: 'paused' },
      ],
      match: (row: Campaign, val: string) => row.status === val,
    },
    {
      key: 'category',
      allLabel: tc('filters.allCategories'),
      options: [
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Referral', value: 'referral' },
        { label: 'Recurring', value: 'recurring' },
        { label: 'Flash Sale', value: 'flash-sale' },
        { label: 'Loyalty', value: 'loyalty' },
      ],
      match: (row: Campaign, val: string) => row.category === val,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(c) => c.id}
      searchPlaceholder="Search campaigns..."
      filters={filters}
      pageSize={10}
      paginationText={({ from, to, total }) => `Showing ${from}–${to} of ${total}`}
      noResultsText={tc('table.noResults')}
    />
  );
}
