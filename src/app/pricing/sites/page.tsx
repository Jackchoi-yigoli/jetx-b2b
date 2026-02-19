import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import PricingSitesTable from './PricingSitesTable';
import type { SitePricingRow } from './PricingSitesTable';

const sitePricingData: SitePricingRow[] = [
  { id: 'taipei-main', name: 'Taipei Main Station', address: 'No. 1 Zhongxiao E. Rd', operator: 'ABC Car Wash Co.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 4, monthlyRevenue: '$68,450' },
  { id: 'xinyi', name: 'Xinyi District', address: 'No. 88 Songren Rd', operator: 'ABC Car Wash Co.', template: 'Premium', basicPrice: '$15.00', basicOverride: false, premiumPrice: '$24.00', premiumOverride: true, ultimatePrice: '$30.00', ultimateOverride: false, overrides: 1, dynamicRules: 4, monthlyRevenue: '$142,800' },
  { id: 'daan', name: 'Daan Station', address: 'No. 216 Fuxing S. Rd', operator: 'ABC Car Wash Co.', template: 'Premium', basicPrice: '$15.00', basicOverride: false, premiumPrice: '$22.00', premiumOverride: false, ultimatePrice: '$30.00', ultimateOverride: false, overrides: 0, dynamicRules: 4, monthlyRevenue: '$62,100' },
  { id: 'taoyuan-airport', name: 'Taoyuan Airport', address: 'Terminal 2, Level B2', operator: 'ABC Car Wash Co.', template: 'Premium', basicPrice: '$18.00', basicOverride: true, premiumPrice: '$26.00', premiumOverride: true, ultimatePrice: '$35.00', ultimateOverride: true, overrides: 3, dynamicRules: 3, monthlyRevenue: '$118,200' },
  { id: 'banqiao', name: 'Banqiao Station', address: 'No. 3 Xianmin Blvd', operator: 'XYZ Motors', template: 'Budget', basicPrice: '$10.00', basicOverride: false, premiumPrice: '$15.00', premiumOverride: false, ultimatePrice: '$20.00', ultimateOverride: false, overrides: 0, dynamicRules: 2, monthlyRevenue: '$42,100' },
  { id: 'neihu', name: 'Neihu Tech Park', address: 'No. 178 Ruiguang Rd', operator: 'XYZ Motors', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$20.00', premiumOverride: true, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 1, dynamicRules: 3, monthlyRevenue: '$38,200' },
  { id: 'zhonghe', name: 'Zhonghe Industrial', address: 'No. 235 Zhongshan Rd', operator: 'XYZ Motors', template: 'Budget', basicPrice: '$9.00', basicOverride: true, premiumPrice: '$14.00', premiumOverride: true, ultimatePrice: '$18.00', ultimateOverride: true, overrides: 3, dynamicRules: 2, monthlyRevenue: '$28,900' },
  { id: 'nangang', name: 'Nangang Station', address: 'No. 2 Nangang Rd', operator: 'Clean Fleet Inc.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 4, monthlyRevenue: '$45,600' },
  { id: 'xindian', name: 'Xindian Riverside', address: 'No. 88 Beiyi Rd', operator: 'Clean Fleet Inc.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 3, monthlyRevenue: '$36,800' },
  { id: 'tucheng', name: 'Tucheng Industrial', address: 'No. 156 Jincheng Rd', operator: 'Clean Fleet Inc.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 3, monthlyRevenue: '$32,400' },
  { id: 'sanchong', name: 'Sanchong Gateway', address: 'No. 45 Chongxin Rd', operator: 'ABC Car Wash Co.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 4, monthlyRevenue: '$41,200' },
  { id: 'yonghe', name: 'Yonghe District', address: 'No. 321 Zhongzheng Rd', operator: 'ABC Car Wash Co.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$18.00', premiumOverride: false, ultimatePrice: '$25.00', ultimateOverride: false, overrides: 0, dynamicRules: 3, monthlyRevenue: '$38,900' },
  { id: 'linkou', name: 'Linkou Outlet', address: 'No. 1 Wenhua 3rd Rd', operator: 'ABC Car Wash Co.', template: 'Standard', basicPrice: '$12.00', basicOverride: false, premiumPrice: '$20.00', premiumOverride: true, ultimatePrice: '$28.00', ultimateOverride: true, overrides: 2, dynamicRules: 4, monthlyRevenue: '$52,100' },
];

export default async function PricingSitesPage() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.templates'), href: '/pricing' },
    { label: t('tabs.addons'), href: '/pricing/addons' },
    { label: t('tabs.dynamicPricing'), href: '/pricing/dynamic' },
    { label: t('tabs.siteAssignments'), href: '/pricing/sites' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/pricing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('sites.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('sites.pageTitle')}</h1>
            <p className="page-subtitle">{t('sites.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('sites.bulkAssign')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              {t('sites.exportReport')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('sites.kpi.totalSites')}</div>
          <div className="kpi-value">17</div>
          <div className="kpi-change neutral">{t('sites.kpi.acrossAllOperators')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.sitesWithOverrides')}</div>
          <div className="kpi-value">5</div>
          <div className="kpi-change neutral">{t('sites.kpi.pctOfSites', { pct: '29%' })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sites.kpi.totalOverrides')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change neutral">{t('sites.kpi.individualPriceAdjustments')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sites.kpi.avgOverride')}</div>
          <div className="kpi-value">+8%</div>
          <div className="kpi-change positive">{t('sites.kpi.aboveTemplatePrice')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <PricingSitesTable data={sitePricingData} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('sites.templateDistribution.cardTitle')}</h3>
          </div>
          <div className="distribution-list">
            <div className="dist-item">
              <div className="dist-header">
                <span className="badge-pill badge-info">Taiwan Standard</span>
                <span className="dist-count">12 {t('templates.table.sites')}</span>
              </div>
              <div className="dist-bar">
                <div className="dist-fill standard" style={{ width: '70%' }}></div>
              </div>
              <div className="dist-meta">
                <span>$462,600 {t('kpi.monthlyRevenue')}</span>
                <span>{t('sites.templateDistribution.withOverrides', { count: 2 })}</span>
              </div>
            </div>
            <div className="dist-item">
              <div className="dist-header">
                <span className="badge-pill badge-premium">Taiwan Premium</span>
                <span className="dist-count">3 {t('templates.table.sites')}</span>
              </div>
              <div className="dist-bar">
                <div className="dist-fill premium" style={{ width: '18%' }}></div>
              </div>
              <div className="dist-meta">
                <span>$323,100 {t('kpi.monthlyRevenue')}</span>
                <span>{t('sites.templateDistribution.withOverrides', { count: 2 })}</span>
              </div>
            </div>
            <div className="dist-item">
              <div className="dist-header">
                <span className="badge-pill badge-muted">Taiwan Budget</span>
                <span className="dist-count">2 {t('templates.table.sites')}</span>
              </div>
              <div className="dist-bar">
                <div className="dist-fill budget" style={{ width: '12%' }}></div>
              </div>
              <div className="dist-meta">
                <span>$71,000 {t('kpi.monthlyRevenue')}</span>
                <span>{t('sites.templateDistribution.withOverrides', { count: 1 })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('sites.overrideSummary.cardTitle')}</h3>
          </div>
          <div className="override-summary">
            <div className="override-stat">
              <div className="stat-label">{t('kpi.sitesWithOverrides')}</div>
              <div className="stat-row">
                <span className="stat-number">5</span>
                <span className="stat-percent">29%</span>
              </div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '29%' }}></div>
              </div>
            </div>
            <div className="override-breakdown">
              <div className="breakdown-row">
                <span>{t('sites.overrideSummary.basicWashOverrides')}</span>
                <strong>3</strong>
              </div>
              <div className="breakdown-row">
                <span>{t('sites.overrideSummary.premiumWashOverrides')}</span>
                <strong>5</strong>
              </div>
              <div className="breakdown-row">
                <span>{t('sites.overrideSummary.ultimateWashOverrides')}</span>
                <strong>4</strong>
              </div>
            </div>
            <div className="override-impact">
              <div className="impact-label">{t('sites.overrideSummary.avgOverrideImpact')}</div>
              <div className="impact-value positive">+8.2%</div>
              <span className="impact-desc">{t('sites.overrideSummary.aboveTemplateBasePrices')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="legend-bar">
          <span className="legend-item"><span className="legend-dot standard"></span> {t('sites.legend.templatePrice')}</span>
          <span className="legend-item"><span className="legend-dot override"></span> {t('sites.legend.siteOverride')}</span>
          <span className="legend-item"><span className="legend-dot disabled"></span> {t('sites.legend.notOffered')}</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
