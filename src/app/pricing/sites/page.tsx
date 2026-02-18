import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

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

      <div className="filter-bar">
        <div className="filter-group">
          <select className="form-select">
            <option>{t('siteAssignments.allTemplates')}</option>
            <option>Taiwan Standard</option>
            <option>Taiwan Premium</option>
            <option>Taiwan Budget</option>
          </select>
          <select className="form-select">
            <option>{tc('filters.allOperators')}</option>
            <option>ABC Car Wash Co.</option>
            <option>XYZ Motors</option>
            <option>Clean Fleet Inc.</option>
          </select>
          <select className="form-select">
            <option>{t('sites.overrideStatus')}</option>
            <option>{t('sites.hasOverrides')}</option>
            <option>{t('siteAssignments.noOverrides')}</option>
          </select>
        </div>
        <div className="filter-actions">
          <button className="btn btn-text">{t('sites.clearFilters')}</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('sites.allSites', { count: 17 })}</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('siteAssignments.table.site')}</th>
                <th>{t('sites.table.operator')}</th>
                <th>{t('siteAssignments.table.template')}</th>
                <th>{t('edit.basicWash')}</th>
                <th>{t('edit.premiumWash')}</th>
                <th>{t('edit.ultimateWash')}</th>
                <th>{t('siteAssignments.table.hasOverrides')}</th>
                <th>{t('siteAssignments.table.dynamicRules')}</th>
                <th>{t('siteAssignments.table.monthlyRevenue')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cell-primary">Taipei Main Station</div>
                  <div className="cell-secondary">No. 1 Zhongxiao E. Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$68,450</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Xinyi District</div>
                  <div className="cell-secondary">No. 88 Songren Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-premium">Premium</span></td>
                <td>$15.00</td>
                <td><span className="text-warning">$24.00 ⚙</span></td>
                <td>$30.00</td>
                <td><span className="badge-pill badge-warning">{t('siteAssignments.override', { count: 1 })}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$142,800</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Daan Station</div>
                  <div className="cell-secondary">No. 216 Fuxing S. Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-premium">Premium</span></td>
                <td>$15.00</td>
                <td>$22.00</td>
                <td>$30.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$62,100</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Taoyuan Airport</div>
                  <div className="cell-secondary">Terminal 2, Level B2</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-premium">Premium</span></td>
                <td><span className="text-warning">$18.00 ⚙</span></td>
                <td><span className="text-warning">$26.00 ⚙</span></td>
                <td><span className="text-warning">$35.00 ⚙</span></td>
                <td><span className="badge-pill badge-warning">{t('siteAssignments.overrides', { count: 3 })}</span></td>
                <td>3 {t('siteAssignments.active')}</td>
                <td>$118,200</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Banqiao Station</div>
                  <div className="cell-secondary">No. 3 Xianmin Blvd</div>
                </td>
                <td>XYZ Motors</td>
                <td><span className="badge-pill badge-muted">Budget</span></td>
                <td>$10.00</td>
                <td>$15.00</td>
                <td>$20.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>2 {t('siteAssignments.active')}</td>
                <td>$42,100</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Neihu Tech Park</div>
                  <div className="cell-secondary">No. 178 Ruiguang Rd</div>
                </td>
                <td>XYZ Motors</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td><span className="text-warning">$20.00 ⚙</span></td>
                <td>$25.00</td>
                <td><span className="badge-pill badge-warning">{t('siteAssignments.override', { count: 1 })}</span></td>
                <td>3 {t('siteAssignments.active')}</td>
                <td>$38,200</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Zhonghe Industrial</div>
                  <div className="cell-secondary">No. 235 Zhongshan Rd</div>
                </td>
                <td>XYZ Motors</td>
                <td><span className="badge-pill badge-muted">Budget</span></td>
                <td><span className="text-warning">$9.00 ⚙</span></td>
                <td><span className="text-warning">$14.00 ⚙</span></td>
                <td><span className="text-warning">$18.00 ⚙</span></td>
                <td><span className="badge-pill badge-warning">{t('siteAssignments.overrides', { count: 3 })}</span></td>
                <td>2 {t('siteAssignments.active')}</td>
                <td>$28,900</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Nangang Station</div>
                  <div className="cell-secondary">No. 2 Nangang Rd</div>
                </td>
                <td>Clean Fleet Inc.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$45,600</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Xindian Riverside</div>
                  <div className="cell-secondary">No. 88 Beiyi Rd</div>
                </td>
                <td>Clean Fleet Inc.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>3 {t('siteAssignments.active')}</td>
                <td>$36,800</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Tucheng Industrial</div>
                  <div className="cell-secondary">No. 156 Jincheng Rd</div>
                </td>
                <td>Clean Fleet Inc.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>3 {t('siteAssignments.active')}</td>
                <td>$32,400</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Sanchong Gateway</div>
                  <div className="cell-secondary">No. 45 Chongxin Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$41,200</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Yonghe District</div>
                  <div className="cell-secondary">No. 321 Zhongzheng Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td>$18.00</td>
                <td>$25.00</td>
                <td><span className="text-muted">{t('siteAssignments.table.none')}</span></td>
                <td>3 {t('siteAssignments.active')}</td>
                <td>$38,900</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Linkou Outlet</div>
                  <div className="cell-secondary">No. 1 Wenhua 3rd Rd</div>
                </td>
                <td>ABC Car Wash Co.</td>
                <td><span className="badge-pill badge-info">Standard</span></td>
                <td>$12.00</td>
                <td><span className="text-warning">$20.00 ⚙</span></td>
                <td><span className="text-warning">$28.00 ⚙</span></td>
                <td><span className="badge-pill badge-warning">{t('siteAssignments.overrides', { count: 2 })}</span></td>
                <td>4 {t('siteAssignments.active')}</td>
                <td>$52,100</td>
                <td><button className="btn btn-sm btn-secondary">{tc('actions.configure')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="table-info">{t('sites.showing', { shown: 13, total: 17 })}</div>
          <div className="pagination">
            <button className="pagination-btn" disabled>{tc('actions.previous')}</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">{tc('actions.next')}</button>
          </div>
        </div>
      </div>

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
