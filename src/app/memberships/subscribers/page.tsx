import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function MembershipSubscribersPage() {
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
        <div className="filters-row">
          <div className="filter-group">
            <label>{t('subscribers.filters.plan')}</label>
            <select>
              <option>{t('subscribers.filters.allPlans')}</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Unlimited</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{t('sites.columns.site')}</label>
            <select>
              <option>{tc('filters.allSites')}</option>
              <option>Taipei Main Station</option>
              <option>Xinyi District</option>
              <option>Banqiao Station</option>
              <option>Taoyuan Airport</option>
              <option>Zhonghe Industrial</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{tc('table.status')}</label>
            <select>
              <option>{tc('filters.allStatus')}</option>
              <option>{tc('status.active')}</option>
              <option>{t('subscribers.filters.expiringSoon')}</option>
              <option>{t('subscribers.filters.cancelled')}</option>
              <option>{tc('status.paused')}</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{tc('filters.dateRange')}</label>
            <select>
              <option>{t('subscribers.filters.allTime')}</option>
              <option>{tc('filters.thisMonth')}</option>
              <option>{tc('filters.last30Days')}</option>
              <option>{t('subscribers.filters.last90Days')}</option>
              <option>{t('subscribers.filters.thisYear')}</option>
            </select>
          </div>
          <button className="btn btn-secondary">{t('subscribers.filters.applyFilters')}</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('subscribers.cardTitle')}</h3>
          <span className="result-count">12,450 subscribers</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('subscribers.columns.customer')}</th>
                <th>{t('recentActivity.columns.plan')}</th>
                <th>{t('subscribers.columns.homeSite')}</th>
                <th>{t('subscribers.columns.startDate')}</th>
                <th>{t('subscribers.columns.renewalDate')}</th>
                <th>{tc('table.amount')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Amy Zhang</div>
                  <div className="cell-secondary">#45672 · amy.zhang@email.com</div>
                </td>
                <td><span className="badge badge-premium">Premium</span></td>
                <td>Xinyi District</td>
                <td>Dec 7, 2024</td>
                <td>Jan 7, 2025</td>
                <td>$65.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Kevin Liu</div>
                  <div className="cell-secondary">#45671 · kevin.liu@email.com</div>
                </td>
                <td><span className="badge badge-premium">Premium</span></td>
                <td>Taipei Main</td>
                <td>Nov 15, 2024</td>
                <td>Dec 15, 2024</td>
                <td>$59.00/mo</td>
                <td><span className="badge-pill badge-warning">{t('subscribers.filters.expiringSoon')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Jessica Wang</div>
                  <div className="cell-secondary">#45670 · jessica.w@email.com</div>
                </td>
                <td><span className="badge badge-secondary">Unlimited</span></td>
                <td>Taoyuan Airport</td>
                <td>Oct 22, 2024</td>
                <td>Jan 22, 2025</td>
                <td>$119.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Tom Chen</div>
                  <div className="cell-secondary">#45669 · tom.chen@email.com</div>
                </td>
                <td><span className="badge badge-muted">Basic</span></td>
                <td>Banqiao Station</td>
                <td>Aug 15, 2024</td>
                <td>-</td>
                <td>$29.00/mo</td>
                <td><span className="badge-pill badge-error">{t('subscribers.filters.cancelled')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Lisa Lin</div>
                  <div className="cell-secondary">#45668 · lisa.lin@email.com</div>
                </td>
                <td><span className="badge badge-secondary">Unlimited</span></td>
                <td>Zhonghe Industrial</td>
                <td>Dec 6, 2024</td>
                <td>Jan 6, 2025</td>
                <td>$79.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">David Wu</div>
                  <div className="cell-secondary">#45667 · david.wu@email.com</div>
                </td>
                <td><span className="badge badge-premium">Premium</span></td>
                <td>Taipei Main</td>
                <td>Sep 1, 2024</td>
                <td>Dec 1, 2024</td>
                <td>$59.00/mo</td>
                <td><span className="badge-pill badge-info">{tc('status.paused')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Sarah Huang</div>
                  <div className="cell-secondary">#45666 · sarah.h@email.com</div>
                </td>
                <td><span className="badge badge-info">Basic</span></td>
                <td>Xinyi District</td>
                <td>Jul 20, 2024</td>
                <td>Jan 20, 2025</td>
                <td>$29.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Michael Chang</div>
                  <div className="cell-secondary">#45665 · m.chang@email.com</div>
                </td>
                <td><span className="badge badge-secondary">Unlimited</span></td>
                <td>Taoyuan Airport</td>
                <td>May 10, 2024</td>
                <td>Feb 10, 2025</td>
                <td>$119.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Emily Tsai</div>
                  <div className="cell-secondary">#45664 · emily.t@email.com</div>
                </td>
                <td><span className="badge badge-premium">Premium</span></td>
                <td>Banqiao Station</td>
                <td>Nov 1, 2024</td>
                <td>Feb 1, 2025</td>
                <td>$59.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
              <tr className="clickable">
                <td>
                  <div className="cell-primary">Jason Lee</div>
                  <div className="cell-secondary">#45663 · jason.lee@email.com</div>
                </td>
                <td><span className="badge badge-info">Basic</span></td>
                <td>Zhonghe Industrial</td>
                <td>Oct 5, 2024</td>
                <td>Jan 5, 2025</td>
                <td>$25.00/mo</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><Link href="/customers/1" className="btn btn-sm">{tc('actions.view')}</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="btn btn-sm" disabled>&larr; {tc('actions.previous')}</button>
          <span className="pagination-info">{tc('pagination.page')} 1 of 1,245</span>
          <button className="btn btn-sm">{tc('actions.next')} &rarr;</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
