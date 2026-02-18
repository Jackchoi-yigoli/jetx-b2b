import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

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

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('addons.catalog.cardTitle')}</h3>
          <div className="filter-group">
            <select className="form-select form-select-sm">
              <option>{tc('filters.allCategories')}</option>
              <option>{t('addons.categories.interior')}</option>
              <option>{t('addons.categories.exterior')}</option>
              <option>{t('addons.categories.protection')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('addons.catalog.table.service')}</th>
                <th>{t('addons.catalog.table.category')}</th>
                <th>{t('addons.catalog.table.basePrice')}</th>
                <th>{t('addons.catalog.table.memberPrice')}</th>
                <th>{t('addons.catalog.table.sitesEnabled')}</th>
                <th>{t('addons.catalog.table.monthlySales')}</th>
                <th>{t('addons.catalog.table.revenue')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-interior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.interiorVacuum')}</strong>
                      <span className="template-desc">{t('addons.catalog.interiorVacuumDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-info">{t('addons.categories.interior')}</span></td>
                <td>$5.00</td>
                <td>$4.00 <span className="text-success">(20% off)</span></td>
                <td>17 of 17</td>
                <td>8,420</td>
                <td>$38,200</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-interior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.dashboardWipe')}</strong>
                      <span className="template-desc">{t('addons.catalog.dashboardWipeDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-info">{t('addons.categories.interior')}</span></td>
                <td>$4.00</td>
                <td>$3.20 <span className="text-success">(20% off)</span></td>
                <td>15 of 17</td>
                <td>5,280</td>
                <td>$19,800</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-exterior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.tireShine')}</strong>
                      <span className="template-desc">{t('addons.catalog.tireShineDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-success">{t('addons.categories.exterior')}</span></td>
                <td>$3.00</td>
                <td>$2.40 <span className="text-success">(20% off)</span></td>
                <td>17 of 17</td>
                <td>12,100</td>
                <td>$34,500</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-protection">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.rainRepellent')}</strong>
                      <span className="template-desc">{t('addons.catalog.rainRepellentDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-warning">{t('addons.categories.protection')}</span></td>
                <td>$6.00</td>
                <td>$4.80 <span className="text-success">(20% off)</span></td>
                <td>14 of 17</td>
                <td>4,890</td>
                <td>$27,200</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-protection">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.ceramicCoating')}</strong>
                      <span className="template-desc">{t('addons.catalog.ceramicCoatingDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-warning">{t('addons.categories.protection')}</span></td>
                <td>$15.00</td>
                <td>$12.00 <span className="text-success">(20% off)</span></td>
                <td>10 of 17</td>
                <td>1,240</td>
                <td>$17,400</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-interior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.airFreshener')}</strong>
                      <span className="template-desc">{t('addons.catalog.airFreshenerDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-info">{t('addons.categories.interior')}</span></td>
                <td>$2.00</td>
                <td>$1.60 <span className="text-success">(20% off)</span></td>
                <td>17 of 17</td>
                <td>9,680</td>
                <td>$18,100</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-exterior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.wheelCleaner')}</strong>
                      <span className="template-desc">{t('addons.catalog.wheelCleanerDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-success">{t('addons.categories.exterior')}</span></td>
                <td>$4.00</td>
                <td>$3.20 <span className="text-success">(20% off)</span></td>
                <td>17 of 17</td>
                <td>6,890</td>
                <td>$25,800</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon addon-exterior">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.undercarriageWash')}</strong>
                      <span className="template-desc">{t('addons.catalog.undercarriageWashDesc')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-success">{t('addons.categories.exterior')}</span></td>
                <td>$5.00</td>
                <td>$4.00 <span className="text-success">(20% off)</span></td>
                <td>12 of 17</td>
                <td>3,420</td>
                <td>$15,800</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('addons.combos.cardTitle')}</h3>
          <p className="card-description">{t('addons.combos.cardDesc')}</p>
          <button className="btn btn-secondary btn-sm">{t('addons.combos.createCombo')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('addons.combos.table.packageName')}</th>
                <th>{t('addons.combos.table.includedServices')}</th>
                <th>{t('addons.combos.table.regularTotal')}</th>
                <th>{t('addons.combos.table.packagePrice')}</th>
                <th>{t('addons.combos.table.savings')}</th>
                <th>{t('addons.catalog.table.monthlySales')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('addons.combos.interiorDetailPack')}</strong></td>
                <td>{t('addons.combos.interiorDetailPackServices')}</td>
                <td>$11.00</td>
                <td>$9.00</td>
                <td className="text-success">18% off</td>
                <td>2,340</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('addons.combos.fullProtection')}</strong></td>
                <td>{t('addons.combos.fullProtectionServices')}</td>
                <td>$21.00</td>
                <td>$18.00</td>
                <td className="text-success">14% off</td>
                <td>890</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('addons.combos.wheelTireCombo')}</strong></td>
                <td>{t('addons.combos.wheelTireComboServices')}</td>
                <td>$7.00</td>
                <td>$6.00</td>
                <td className="text-success">14% off</td>
                <td>4,120</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('addons.combos.ultimateAddonPack')}</strong></td>
                <td>{t('addons.combos.ultimateAddonPackServices')}</td>
                <td>$44.00</td>
                <td>$35.00</td>
                <td className="text-success">20% off</td>
                <td>320</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
