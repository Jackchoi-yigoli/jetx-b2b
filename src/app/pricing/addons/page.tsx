import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import AddonsTable from './AddonsTable';
import type { AddonRow, ComboRow } from './AddonsTable';

const addonData: AddonRow[] = [
  { id: 'vacuum', name: 'interiorVacuum', descKey: 'interiorVacuumDesc', category: 'interior', basePrice: 5.00, memberPrice: 4.00, discount: '20%', sitesEnabled: '17 of 17', monthlySales: 8420, revenue: '$38,200', iconType: 'interior' },
  { id: 'dashboard', name: 'dashboardWipe', descKey: 'dashboardWipeDesc', category: 'interior', basePrice: 4.00, memberPrice: 3.20, discount: '20%', sitesEnabled: '15 of 17', monthlySales: 5280, revenue: '$19,800', iconType: 'interior' },
  { id: 'tire', name: 'tireShine', descKey: 'tireShineDesc', category: 'exterior', basePrice: 3.00, memberPrice: 2.40, discount: '20%', sitesEnabled: '17 of 17', monthlySales: 12100, revenue: '$34,500', iconType: 'exterior' },
  { id: 'rain', name: 'rainRepellent', descKey: 'rainRepellentDesc', category: 'protection', basePrice: 6.00, memberPrice: 4.80, discount: '20%', sitesEnabled: '14 of 17', monthlySales: 4890, revenue: '$27,200', iconType: 'protection' },
  { id: 'ceramic', name: 'ceramicCoating', descKey: 'ceramicCoatingDesc', category: 'protection', basePrice: 15.00, memberPrice: 12.00, discount: '20%', sitesEnabled: '10 of 17', monthlySales: 1240, revenue: '$17,400', iconType: 'protection' },
  { id: 'freshener', name: 'airFreshener', descKey: 'airFreshenerDesc', category: 'interior', basePrice: 2.00, memberPrice: 1.60, discount: '20%', sitesEnabled: '17 of 17', monthlySales: 9680, revenue: '$18,100', iconType: 'interior' },
  { id: 'wheel', name: 'wheelCleaner', descKey: 'wheelCleanerDesc', category: 'exterior', basePrice: 4.00, memberPrice: 3.20, discount: '20%', sitesEnabled: '17 of 17', monthlySales: 6890, revenue: '$25,800', iconType: 'exterior' },
  { id: 'undercarriage', name: 'undercarriageWash', descKey: 'undercarriageWashDesc', category: 'exterior', basePrice: 5.00, memberPrice: 4.00, discount: '20%', sitesEnabled: '12 of 17', monthlySales: 3420, revenue: '$15,800', iconType: 'exterior' },
];

const comboData: ComboRow[] = [
  { id: 'interior-detail', nameKey: 'interiorDetailPack', servicesKey: 'interiorDetailPackServices', regularTotal: '$11.00', packagePrice: '$9.00', savings: '18%', monthlySales: 2340, status: 'active' },
  { id: 'full-protection', nameKey: 'fullProtection', servicesKey: 'fullProtectionServices', regularTotal: '$21.00', packagePrice: '$18.00', savings: '14%', monthlySales: 890, status: 'active' },
  { id: 'wheel-tire', nameKey: 'wheelTireCombo', servicesKey: 'wheelTireComboServices', regularTotal: '$7.00', packagePrice: '$6.00', savings: '14%', monthlySales: 4120, status: 'active' },
  { id: 'ultimate', nameKey: 'ultimateAddonPack', servicesKey: 'ultimateAddonPackServices', regularTotal: '$44.00', packagePrice: '$35.00', savings: '20%', monthlySales: 320, status: 'active' },
];

export default async function PricingAddonsPage() {
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
          {t('tabs.addons')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('addons.pageTitle')}</h1>
            <p className="page-subtitle">{t('addons.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{tc('actions.export')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('addons.addService')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('addons.kpi.addonServices')}</div>
          <div className="kpi-value">8</div>
          <div className="kpi-change neutral">{t('addons.kpi.activeServices')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('addons.kpi.addonRevenue')}</div>
          <div className="kpi-value">$124.5K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+12%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('addons.kpi.attachRate')}</div>
          <div className="kpi-value">34%</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+3%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('addons.kpi.avgAddonValue')}</div>
          <div className="kpi-value">$6.80</div>
          <div className="kpi-change neutral">{t('addons.kpi.perTransaction')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <AddonsTable addons={addonData} combos={comboData} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('addons.topPerforming.cardTitle')}</h3>
          </div>
          <div className="addon-ranking">
            <div className="ranking-item">
              <span className="rank">1</span>
              <div className="ranking-info">
                <strong>{t('edit.tireShine')}</strong>
                <span>12,100 {t('addons.topPerforming.sales')}</span>
              </div>
              <div className="ranking-value">$34.5K</div>
            </div>
            <div className="ranking-item">
              <span className="rank">2</span>
              <div className="ranking-info">
                <strong>{t('edit.interiorVacuum')}</strong>
                <span>8,420 {t('addons.topPerforming.sales')}</span>
              </div>
              <div className="ranking-value">$38.2K</div>
            </div>
            <div className="ranking-item">
              <span className="rank">3</span>
              <div className="ranking-info">
                <strong>{t('edit.airFreshener')}</strong>
                <span>9,680 {t('addons.topPerforming.sales')}</span>
              </div>
              <div className="ranking-value">$18.1K</div>
            </div>
            <div className="ranking-item">
              <span className="rank">4</span>
              <div className="ranking-info">
                <strong>{t('edit.wheelCleaner')}</strong>
                <span>6,890 {t('addons.topPerforming.sales')}</span>
              </div>
              <div className="ranking-value">$25.8K</div>
            </div>
            <div className="ranking-item">
              <span className="rank">5</span>
              <div className="ranking-info">
                <strong>{t('edit.rainRepellent')}</strong>
                <span>4,890 {t('addons.topPerforming.sales')}</span>
              </div>
              <div className="ranking-value">$27.2K</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('addons.revenueByCategory.cardTitle')}</h3>
          </div>
          <div className="category-breakdown">
            <div className="category-item">
              <div className="category-header">
                <span className="badge-pill badge-success">{t('addons.categories.exterior')}</span>
                <span className="category-total">$76.1K</span>
              </div>
              <div className="category-bar">
                <div className="category-fill exterior" style={{ width: '61%' }}></div>
              </div>
              <div className="category-details">
                <span>{t('addons.revenueByCategory.exteriorServices')}</span>
                <span>{t('addons.revenueByCategory.exteriorPct')}</span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span className="badge-pill badge-info">{t('addons.categories.interior')}</span>
                <span className="category-total">$76.1K</span>
              </div>
              <div className="category-bar">
                <div className="category-fill interior" style={{ width: '61%' }}></div>
              </div>
              <div className="category-details">
                <span>{t('addons.revenueByCategory.interiorServices')}</span>
                <span>{t('addons.revenueByCategory.interiorPct')}</span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-header">
                <span className="badge-pill badge-warning">{t('addons.categories.protection')}</span>
                <span className="category-total">$44.6K</span>
              </div>
              <div className="category-bar">
                <div className="category-fill protection" style={{ width: '36%' }}></div>
              </div>
              <div className="category-details">
                <span>{t('addons.revenueByCategory.protectionServices')}</span>
                <span>{t('addons.revenueByCategory.protectionPct')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
