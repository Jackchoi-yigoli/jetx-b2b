import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function MembershipSitesPage() {
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
            <button className="btn btn-secondary">{tc('actions.export')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.createPlanTemplate')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.planTemplates')}</div>
          <div className="kpi-value">3</div>
          <div className="kpi-change neutral">Basic, Premium, Unlimited</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalActiveMembers')}</div>
          <div className="kpi-value">12,450</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +342 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.multiSiteMembers')}</div>
          <div className="kpi-value">3,420</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            27% of total members
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalMrr')}</div>
          <div className="kpi-value">$685K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +8% vs last month
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <h3>{t('sitePlanAssignments.cardTitle')}</h3>
          <p className="card-description">{t('sites.cardDescription')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('sites.columns.site')}</th>
                <th>{t('sites.columns.basicWithPrice')}</th>
                <th>{t('sites.columns.premiumWithPrice')}</th>
                <th>{t('sites.columns.unlimitedWithPrice')}</th>
                <th>{t('planTemplates.columns.activeMembers')}</th>
                <th>{t('sitePlanAssignments.columns.siteMrr')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Taipei Main Station</Link>
                  </div>
                  <div className="cell-secondary">12 Zhongxiao E. Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>1,245</td>
                <td>$68,450</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Xinyi District</Link>
                  </div>
                  <div className="cell-secondary">88 Songren Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-warning">$65 ⚙</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>2,340</td>
                <td>$142,800</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Banqiao Station</Link>
                  </div>
                  <div className="cell-secondary">50 Zhongshan Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-muted">{t('sitePlanAssignments.notAvailable')}</span></td>
                <td>890</td>
                <td>$42,100</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Taoyuan Airport</Link>
                  </div>
                  <div className="cell-secondary">Terminal 2, Level B2</div>
                </td>
                <td><span className="badge-pill badge-muted">{t('sitePlanAssignments.notAvailable')}</span></td>
                <td><span className="badge-pill badge-warning">$69 ⚙</span></td>
                <td><span className="badge-pill badge-warning">$119 ⚙</span></td>
                <td>1,560</td>
                <td>$118,200</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Zhonghe Industrial</Link>
                  </div>
                  <div className="cell-secondary">22 Zhonghe Rd</div>
                </td>
                <td><span className="badge-pill badge-warning">$25 ⚙</span></td>
                <td><span className="badge-pill badge-warning">$49 ⚙</span></td>
                <td><span className="badge-pill badge-warning">$79 ⚙</span></td>
                <td>780</td>
                <td>$38,200</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Neihu Tech Park</Link>
                  </div>
                  <div className="cell-secondary">168 Ruiguang Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>1,120</td>
                <td>$62,400</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Shilin Night Market</Link>
                  </div>
                  <div className="cell-secondary">101 Jihe Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-muted">{t('sitePlanAssignments.notAvailable')}</span></td>
                <td>650</td>
                <td>$32,100</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Beitou Hot Springs</Link>
                  </div>
                  <div className="cell-secondary">45 Guangming Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-warning">$65 ⚙</span></td>
                <td><span className="badge-pill badge-warning">$109 ⚙</span></td>
                <td>520</td>
                <td>$38,900</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Tamsui Waterfront</Link>
                  </div>
                  <div className="cell-secondary">88 Zhongzheng Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>890</td>
                <td>$48,600</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Xindian Riverside</Link>
                  </div>
                  <div className="cell-secondary">200 Beiyi Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>720</td>
                <td>$41,200</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Linkou Outlet</Link>
                  </div>
                  <div className="cell-secondary">1 Wenhua 3rd Rd</div>
                </td>
                <td><span className="badge-pill badge-success">$29</span></td>
                <td><span className="badge-pill badge-success">$59</span></td>
                <td><span className="badge-pill badge-success">$99</span></td>
                <td>980</td>
                <td>$52,800</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">
                    <Link href="/sites/1" className="link-primary">Sanchong Industrial</Link>
                  </div>
                  <div className="cell-secondary">55 Chongxin Rd</div>
                </td>
                <td><span className="badge-pill badge-warning">$25 ⚙</span></td>
                <td><span className="badge-pill badge-warning">$49 ⚙</span></td>
                <td><span className="badge-pill badge-muted">{t('sitePlanAssignments.notAvailable')}</span></td>
                <td>755</td>
                <td>$34,250</td>
                <td><Link href="/sites/1" className="btn btn-sm">{tc('actions.configure')}</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="legend-inline">
            <span className="badge-pill badge-success">$XX</span> {t('sitePlanAssignments.legend.templatePrice')}
            <span className="badge-pill badge-warning">$XX ⚙</span> {t('sitePlanAssignments.legend.siteOverride')}
            <span className="badge-pill badge-muted">{t('sitePlanAssignments.notAvailable')}</span> {t('sitePlanAssignments.legend.planNotOffered')}
          </div>
          <span className="result-count">{t('sites.totalSites')}</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('sites.overrides.cardTitle')}</h3>
          </div>
          <div className="stat-block" style={{ border: 'none', padding: '16px 20px' }}>
            <div className="stat-value">5</div>
            <div className="stat-desc">{t('sites.overrides.description')}</div>
            <div className="stat-breakdown">
              <div className="breakdown-item">
                <span>Xinyi District</span>
                <strong>Premium +$6</strong>
              </div>
              <div className="breakdown-item">
                <span>Taoyuan Airport</span>
                <strong>Premium +$10, Unlimited +$20</strong>
              </div>
              <div className="breakdown-item">
                <span>Zhonghe Industrial</span>
                <strong>All plans discounted</strong>
              </div>
              <div className="breakdown-item">
                <span>Beitou Hot Springs</span>
                <strong>Premium +$6, Unlimited +$10</strong>
              </div>
              <div className="breakdown-item">
                <span>Sanchong Industrial</span>
                <strong>Basic -$4, Premium -$10</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('sites.planAvailability.cardTitle')}</h3>
          </div>
          <div className="stat-block" style={{ border: 'none', padding: '16px 20px' }}>
            <div className="stat-breakdown">
              <div className="breakdown-item">
                <span>{t('scopeBreakdown.basicPlan')}</span>
                <strong>10/12 sites (83%)</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('scopeBreakdown.premiumPlan')}</span>
                <strong>12/12 sites (100%)</strong>
              </div>
              <div className="breakdown-item">
                <span>{t('scopeBreakdown.unlimitedPlan')}</span>
                <strong>8/12 sites (67%)</strong>
              </div>
            </div>
            <div className="mt-16">
              <p className="text-muted" style={{ fontSize: '13px' }}>Sites without Unlimited: Banqiao, Shilin, Sanchong, Taoyuan (Basic not available)</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
