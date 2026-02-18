import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

const memberGrowthBars = [
  { month: 'Jan', height: '55%' },
  { month: 'Feb', height: '60%' },
  { month: 'Mar', height: '58%' },
  { month: 'Apr', height: '65%' },
  { month: 'May', height: '70%' },
  { month: 'Jun', height: '72%' },
  { month: 'Jul', height: '78%' },
  { month: 'Aug', height: '82%' },
  { month: 'Sep', height: '85%' },
  { month: 'Oct', height: '90%' },
  { month: 'Nov', height: '95%' },
  { month: 'Dec', height: '100%', highlight: true },
];

const mrrTrendBars = [
  { month: 'Jan', height: '50%' },
  { month: 'Feb', height: '55%' },
  { month: 'Mar', height: '52%' },
  { month: 'Apr', height: '60%' },
  { month: 'May', height: '65%' },
  { month: 'Jun', height: '68%' },
  { month: 'Jul', height: '75%' },
  { month: 'Aug', height: '80%' },
  { month: 'Sep', height: '85%' },
  { month: 'Oct', height: '88%' },
  { month: 'Nov', height: '92%' },
  { month: 'Dec', height: '100%', highlight: true },
];

export default async function MembershipAnalyticsPage() {
  const t = await getTranslations('memberships');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.planTemplates'), href: '/memberships' },
    { label: t('tabs.subscribers'), href: '/memberships/subscribers' },
    { label: t('tabs.siteAssignments'), href: '/memberships/sites' },
    { label: t('tabs.analytics'), href: '/memberships/analytics' },
  ];

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
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('analytics.exportReport')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.createPlanTemplate')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('analytics.kpi.churnRate')}</div>
          <div className="kpi-value">3.2%</div>
          <div className="kpi-change negative">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            -0.5% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('analytics.kpi.avgMemberLtv')}</div>
          <div className="kpi-value">$1,450</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +12% vs last quarter
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('analytics.kpi.upgradeRate')}</div>
          <div className="kpi-value">8.5%</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +2.1% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('analytics.kpi.avgTenure')}</div>
          <div className="kpi-value">14.2 mo</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +1.8 mo vs last year
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.memberGrowth.title')}</h3>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {memberGrowthBars.map((bar) => (
                <div
                  key={bar.month}
                  className={`chart-bar${bar.highlight ? ' highlight' : ''}`}
                  style={{ height: bar.height }}
                >
                  <span>{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stat-breakdown" style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)' }}>
            <div className="breakdown-item">
              <span>{t('analytics.memberGrowth.netNewMembers')}</span>
              <strong className="text-success">+4,230</strong>
            </div>
            <div className="breakdown-item">
              <span>{t('analytics.memberGrowth.growthRate')}</span>
              <strong>+51% YoY</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.mrrTrend.title')}</h3>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {mrrTrendBars.map((bar) => (
                <div
                  key={bar.month}
                  className={`chart-bar${bar.highlight ? ' highlight' : ''}`}
                  style={{ height: bar.height }}
                >
                  <span>{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stat-breakdown" style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)' }}>
            <div className="breakdown-item">
              <span>{t('analytics.mrrTrend.currentMrr')}</span>
              <strong>$685,000</strong>
            </div>
            <div className="breakdown-item">
              <span>{t('analytics.mrrTrend.mrrGrowth')}</span>
              <strong>+68% YoY</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.churnAnalysis.title')}</h3>
          </div>
          <div className="stat-block" style={{ border: 'none' }}>
            <div className="stat-breakdown">
              <div className="breakdown-item">
                <span>{t('analytics.churnAnalysis.monthlyChurnRate')}</span>
                <strong>3.2%</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('analytics.churnAnalysis.churnedThisMonth')}</span>
                <strong className="text-error">398 members</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('analytics.churnAnalysis.revenueLost')}</span>
                <strong className="text-error">$22,450</strong>
              </div>
            </div>
          </div>
          <div className="card-header" style={{ borderTop: '1px solid var(--color-border)', marginTop: '16px' }}>
            <h4 style={{ fontSize: '13px' }}>{t('analytics.churnAnalysis.topChurnReasons')}</h4>
          </div>
          <div className="stat-breakdown" style={{ padding: '0 20px 16px' }}>
            <div className="breakdown-item">
              <span>1. Price too high</span>
              <strong>34%</strong>
            </div>
            <div className="breakdown-item">
              <span>2. Moving away</span>
              <strong>28%</strong>
            </div>
            <div className="breakdown-item">
              <span>3. Not using enough</span>
              <strong>22%</strong>
            </div>
            <div className="breakdown-item">
              <span>4. Service quality</span>
              <strong>10%</strong>
            </div>
            <div className="breakdown-item">
              <span>5. Other</span>
              <strong>6%</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.planMovement.title')}</h3>
          </div>
          <div className="stat-block" style={{ border: 'none' }}>
            <div className="stat-breakdown">
              <div className="breakdown-item">
                <span>{t('analytics.planMovement.upgradesThisMonth')}</span>
                <strong className="text-success">1,058</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('analytics.planMovement.downgradesThisMonth')}</span>
                <strong className="text-error">124</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('analytics.planMovement.netMovementRevenue')}</span>
                <strong className="text-success">+$28,340</strong>
              </div>
            </div>
          </div>
          <div className="card-header" style={{ borderTop: '1px solid var(--color-border)', marginTop: '16px' }}>
            <h4 style={{ fontSize: '13px' }}>{t('analytics.planMovement.commonUpgradePaths')}</h4>
          </div>
          <div className="stat-breakdown" style={{ padding: '0 20px 16px' }}>
            <div className="breakdown-item">
              <span>Basic &rarr; Premium</span>
              <strong>68%</strong>
            </div>
            <div className="breakdown-item">
              <span>Basic &rarr; Unlimited</span>
              <strong>12%</strong>
            </div>
            <div className="breakdown-item">
              <span>Premium &rarr; Unlimited</span>
              <strong>20%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.revenueByPlan.title')}</h3>
          </div>
          <div className="distribution-chart" style={{ padding: '16px 20px' }}>
            <div className="distribution-bar">
              <div className="bar-segment basic" style={{ width: '10%' }}>
                <span>10%</span>
              </div>
              <div className="bar-segment premium" style={{ width: '51%' }}>
                <span>51%</span>
              </div>
              <div className="bar-segment unlimited" style={{ width: '39%' }}>
                <span>39%</span>
              </div>
            </div>
          </div>
          <div className="stat-breakdown" style={{ padding: '0 20px 16px' }}>
            <div className="breakdown-item">
              <span>Basic ($29)</span>
              <strong>$67.9K (10%)</strong>
            </div>
            <div className="breakdown-item">
              <span>Premium ($59)</span>
              <strong>$347.5K (51%)</strong>
            </div>
            <div className="breakdown-item">
              <span>Unlimited ($99)</span>
              <strong>$269.6K (39%)</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('analytics.topSitesByMrr.title')}</h3>
          </div>
          <div className="stat-breakdown" style={{ padding: '16px 20px' }}>
            <div className="breakdown-item">
              <span>1. Xinyi District</span>
              <strong>$142,800</strong>
            </div>
            <div className="breakdown-item">
              <span>2. Taoyuan Airport</span>
              <strong>$118,200</strong>
            </div>
            <div className="breakdown-item">
              <span>3. Taipei Main Station</span>
              <strong>$68,450</strong>
            </div>
            <div className="breakdown-item">
              <span>4. Neihu Tech Park</span>
              <strong>$62,400</strong>
            </div>
            <div className="breakdown-item">
              <span>5. Linkou Outlet</span>
              <strong>$52,800</strong>
            </div>
          </div>
          <div className="table-footer">
            <Link href="/memberships/sites" className="link-primary">{t('analytics.topSitesByMrr.viewAllSites')}</Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('analytics.ltv.title')}</h3>
          <p className="card-description">{t('analytics.ltv.description')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('recentActivity.columns.plan')}</th>
                <th>{t('analytics.ltv.columns.avgTenure')}</th>
                <th>{t('analytics.ltv.columns.monthlyArpu')}</th>
                <th>{t('analytics.ltv.columns.ltv')}</th>
                <th>{t('analytics.ltv.columns.acquisitionCost')}</th>
                <th>{t('analytics.ltv.columns.ltvCacRatio')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="badge-pill badge-info">Basic</span></td>
                <td>8.2 months</td>
                <td>$29</td>
                <td>$238</td>
                <td>$25</td>
                <td><span className="badge-pill badge-success">9.5:1</span></td>
              </tr>
              <tr>
                <td><span className="badge-pill badge-warning">Premium</span></td>
                <td>16.4 months</td>
                <td>$59</td>
                <td>$968</td>
                <td>$45</td>
                <td><span className="badge-pill badge-success">21.5:1</span></td>
              </tr>
              <tr>
                <td><span className="badge-pill badge-secondary">Unlimited</span></td>
                <td>22.8 months</td>
                <td>$99</td>
                <td>$2,257</td>
                <td>$60</td>
                <td><span className="badge-pill badge-success">37.6:1</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
