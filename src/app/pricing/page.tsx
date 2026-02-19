import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { pricingTemplates } from '@/data/pricing-templates';
import { getTranslations } from 'next-intl/server';
import PricingTable from './PricingTable';

const ALL_DYNAMIC_RULES = pricingTemplates[0].dynamicRules;

const TEMPLATE_AVG_REVENUE = ['$38,500/mo', '$62,100/mo', '$28,900/mo'];

const SITE_PRICING_ASSIGNMENTS = [
  {
    siteId: 'main-street',
    siteName: 'Main Street',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Standard',
    overrides: 2,
    dynamicRulesActive: 3,
    monthlyRevenue: '$42,800',
  },
  {
    siteId: 'xinyi',
    siteName: 'Xinyi Station',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Premium',
    overrides: 0,
    dynamicRulesActive: 4,
    monthlyRevenue: '$68,500',
  },
  {
    siteId: 'daan',
    siteName: 'Daan Station',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Premium',
    overrides: 0,
    dynamicRulesActive: 4,
    monthlyRevenue: '$62,100',
  },
  {
    siteId: 'neihu',
    siteName: 'Neihu Station',
    operatorName: 'XYZ Motors',
    template: 'Taiwan Standard',
    overrides: 1,
    dynamicRulesActive: 2,
    monthlyRevenue: '$38,200',
  },
  {
    siteId: 'banqiao',
    siteName: 'Banqiao Station',
    operatorName: 'XYZ Motors',
    template: 'Taiwan Budget',
    overrides: 0,
    dynamicRulesActive: 2,
    monthlyRevenue: '$28,900',
  },
];

export default async function PricingPage() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('common');

  const templateCount = pricingTemplates.length;
  const templateNames = pricingTemplates.map((tmpl) => tmpl.name.replace('Taiwan ', '')).join(', ');
  const activeRules = ALL_DYNAMIC_RULES.filter((r) => r.enabled);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('title')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('pageTitle')}</h1>
            <p className="page-subtitle">{t('pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('actions.importPrices')}</button>
            <button className="btn btn-primary">{t('actions.createTemplate')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.pricingTemplates')}</div>
          <div className="kpi-value">{templateCount}</div>
          <div className="kpi-change neutral">{templateNames}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.sitesWithOverrides')}</div>
          <div className="kpi-value">5</div>
          <div className="kpi-change neutral">{t('kpi.ofTotalSites', { count: 17 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.dynamicRulesActive')}</div>
          <div className="kpi-value">{activeRules.length}</div>
          <div className="kpi-change positive">
            {activeRules.filter((r) => r.type === 'surge').length} {t('kpi.surge')},{' '}
            {activeRules.filter((r) => r.type === 'discount').length} {t('kpi.discount')}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgRevenueSite')}</div>
          <div className="kpi-value">$42,800</div>
          <div className="kpi-change positive">{t('kpi.vsLastMonth', { pct: '+8%' })}</div>
        </div>
      </div>

      <div className="tabs">
        <Link className="tab active" href="/pricing">{t('tabs.templates')}</Link>
        <Link className="tab" href="/pricing/dynamic">{t('tabs.dynamicPricing')}</Link>
        <Link className="tab" href="/pricing/addons">{t('tabs.addons')}</Link>
        <Link className="tab" href="/pricing/sites">{t('tabs.siteAssignments')}</Link>
      </div>

      <PricingTable
        templates={pricingTemplates}
        dynamicRules={ALL_DYNAMIC_RULES}
        siteAssignments={SITE_PRICING_ASSIGNMENTS}
        templateAvgRevenue={TEMPLATE_AVG_REVENUE}
      />
    </DashboardLayout>
  );
}
