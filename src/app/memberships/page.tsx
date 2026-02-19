import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { membershipPlans } from '@/data/membership-plans';
import { getTranslations } from 'next-intl/server';
import DonutChart from '@/components/ui/DonutChart';
import BarChart from '@/components/ui/BarChart';

const SITE_PLAN_ASSIGNMENTS = [
  {
    siteId: 'taipei-main',
    siteName: 'Taipei Main Station',
    activeMembers: 1245,
    siteMrr: '$68,450',
    plans: {
      basic: { enabled: true, price: 29, isOverride: false },
      premium: { enabled: true, price: 59, isOverride: false },
      unlimited: { enabled: true, price: 99, isOverride: false },
    },
  },
  {
    siteId: 'xinyi',
    siteName: 'Xinyi District',
    activeMembers: 2340,
    siteMrr: '$142,800',
    plans: {
      basic: { enabled: true, price: 29, isOverride: false },
      premium: { enabled: true, price: 65, isOverride: true },
      unlimited: { enabled: true, price: 99, isOverride: false },
    },
  },
  {
    siteId: 'banqiao',
    siteName: 'Banqiao Station',
    activeMembers: 890,
    siteMrr: '$42,100',
    plans: {
      basic: { enabled: true, price: 29, isOverride: false },
      premium: { enabled: true, price: 59, isOverride: false },
      unlimited: { enabled: false },
    },
  },
  {
    siteId: 'taoyuan',
    siteName: 'Taoyuan Airport',
    activeMembers: 1560,
    siteMrr: '$118,200',
    plans: {
      basic: { enabled: false },
      premium: { enabled: true, price: 69, isOverride: true },
      unlimited: { enabled: true, price: 119, isOverride: true },
    },
  },
  {
    siteId: 'zhonghe',
    siteName: 'Zhonghe Industrial',
    activeMembers: 780,
    siteMrr: '$38,200',
    plans: {
      basic: { enabled: true, price: 25, isOverride: true },
      premium: { enabled: true, price: 49, isOverride: true },
      unlimited: { enabled: true, price: 79, isOverride: true },
    },
  },
];

const RECENT_ACTIVITY = [
  {
    date: 'Dec 7, 12:30 PM',
    customer: 'Amy Zhang (#45672)',
    action: 'New Subscription',
    plan: 'Premium',
    planBadge: 'badge-info',
    site: 'Xinyi District',
    amount: '$65.00',
    status: 'Active',
    statusBadge: 'badge-success',
  },
  {
    date: 'Dec 7, 11:45 AM',
    customer: 'Kevin Liu (#45671)',
    action: 'Upgrade',
    plan: 'Basic → Premium',
    planBadge: 'badge-info',
    site: 'Taipei Main',
    amount: '$30.00 (prorated)',
    status: 'Active',
    statusBadge: 'badge-success',
  },
  {
    date: 'Dec 7, 10:22 AM',
    customer: 'Jessica Wang (#45670)',
    action: 'Renewal',
    plan: 'Unlimited',
    planBadge: '',
    site: 'Taoyuan Airport',
    amount: '$119.00',
    status: 'Active',
    statusBadge: 'badge-success',
  },
  {
    date: 'Dec 7, 9:15 AM',
    customer: 'Tom Chen (#45669)',
    action: 'Cancellation',
    plan: 'Basic',
    planBadge: '',
    site: 'Banqiao Station',
    amount: '-',
    status: 'Cancelled',
    statusBadge: 'badge-warning',
  },
  {
    date: 'Dec 6, 4:30 PM',
    customer: 'Lisa Lin (#45668)',
    action: 'New Subscription',
    plan: 'Unlimited',
    planBadge: '',
    site: 'Zhonghe Industrial',
    amount: '$79.00',
    status: 'Active',
    statusBadge: 'badge-success',
  },
];

function getPlanSubtitle(plan: typeof membershipPlans[0]): string {
  const washCount = typeof plan.washesPerMonth === 'number'
    ? `${plan.washesPerMonth} washes/month`
    : 'Unlimited washes';
  return `${washCount}, ${plan.addonDiscountPct}% off add-ons${plan.benefits.includes('Free vacuum with every wash') ? ', free vacuum' : ''}`;
}

function getScopeLabel(plan: typeof membershipPlans[0], singleSiteLabel: string, multiSiteLabel: string): { label: string; badge: string } {
  return plan.scope === 'single-site'
    ? { label: singleSiteLabel, badge: 'badge-info' }
    : { label: multiSiteLabel, badge: 'badge-success' };
}

export default async function MembershipsPage() {
  const t = await getTranslations('memberships');
  const tc = await getTranslations('common');

  const planMrr = ['$67.9K', '$347.5K', '$417.8K'];
  const planActiveMembers = [2340, 5890, 4220];
  const planSitesUsing = [12, 12, 10];

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
          <div className="kpi-value">{membershipPlans.length}</div>
          <div className="kpi-change neutral">{membershipPlans.map(p => p.name).join(', ')}</div>
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

      <div className="tabs">
        <Link className="tab active" href="/memberships">{t('tabs.planTemplates')}</Link>
        <Link className="tab" href="/memberships/subscribers">{t('tabs.subscribers')}</Link>
        <Link className="tab" href="/memberships/sites">{t('tabs.siteAssignments')}</Link>
        <Link className="tab" href="/memberships/analytics">{t('tabs.analytics')}</Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('planTemplates.cardTitle')}</h3>
          <p className="card-body" style={{ margin: 0, fontSize: '0.875rem' }}>{t('planTemplates.cardDescription')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('planTemplates.columns.planName')}</th>
                <th>{t('planTemplates.columns.basePrice')}</th>
                <th>{t('planTemplates.columns.scope')}</th>
                <th>{t('planTemplates.columns.sitesUsing')}</th>
                <th>{t('planTemplates.columns.activeMembers')}</th>
                <th>{t('planTemplates.columns.mrr')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {membershipPlans.map((plan, i) => {
                const scope = getScopeLabel(plan, t('scope.singleSite'), t('scope.multiSite'));
                return (
                  <tr key={plan.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: plan.tierColor, color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>{plan.name[0]}</span>
                        <div>
                          <div className="list-item-title">{plan.name}</div>
                          <div className="list-item-subtitle">{getPlanSubtitle(plan)}</div>
                        </div>
                      </div>
                    </td>
                    <td>${plan.basePrice}/mo</td>
                    <td><span className={`badge-pill ${scope.badge}`}>{scope.label}</span></td>
                    <td>{planSitesUsing[i]} {t('planTemplates.sites')}</td>
                    <td>{planActiveMembers[i].toLocaleString()}</td>
                    <td>{planMrr[i]}</td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href="/memberships/plan-edit" className="btn btn-secondary">{tc('actions.edit')}</Link>
                      <Link href="/memberships/sites" className="btn btn-secondary">{t('actions.viewSites')}</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('sitePlanAssignments.cardTitle')}</h3>
          <p className="card-body" style={{ margin: 0, fontSize: '0.875rem' }}>{t('sitePlanAssignments.cardDescription')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('sites.columns.site')}</th>
                <th>{t('planTemplates.planNames.basic')}</th>
                <th>{t('planTemplates.planNames.premium')}</th>
                <th>{t('planTemplates.planNames.unlimited')}</th>
                <th>{t('planTemplates.columns.activeMembers')}</th>
                <th>{t('sitePlanAssignments.columns.siteMrr')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {SITE_PLAN_ASSIGNMENTS.map((site) => {
                const renderPlanCell = (plan: { enabled: boolean; price?: number; isOverride?: boolean }) => {
                  if (!plan.enabled) return <span className="badge-pill">{t('sitePlanAssignments.notAvailable')}</span>;
                  if (plan.isOverride) return <span className="badge-pill badge-warning">${plan.price} ⚙</span>;
                  return <span className="badge-pill badge-success">${plan.price}</span>;
                };
                return (
                  <tr key={site.siteId}>
                    <td><Link href={`/sites/${site.siteId}`} className="card-link">{site.siteName}</Link></td>
                    <td>{renderPlanCell(site.plans.basic)}</td>
                    <td>{renderPlanCell(site.plans.premium)}</td>
                    <td>{renderPlanCell(site.plans.unlimited)}</td>
                    <td>{site.activeMembers.toLocaleString()}</td>
                    <td>{site.siteMrr}</td>
                    <td><Link href={`/sites/${site.siteId}/pricing`} className="btn btn-secondary">{tc('actions.configure')}</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge-pill badge-success">$XX</span> {t('sitePlanAssignments.legend.templatePrice')}
            <span className="badge-pill badge-warning">$XX ⚙</span> {t('sitePlanAssignments.legend.siteOverride')}
            <span className="badge-pill">{t('sitePlanAssignments.notAvailable')}</span> {t('sitePlanAssignments.legend.planNotOffered')}
          </div>
          <Link href="/memberships/sites" className="card-link">{t('sitePlanAssignments.viewAllSites')}</Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('charts.subscriberDistribution')}</h3>
          </div>
          <div className="card-body">
            <DonutChart
              segments={[
                { value: 2340, color: '#6b7280', label: 'Basic' },
                { value: 5890, color: '#3b82f6', label: 'Premium' },
                { value: 4220, color: '#8b5cf6', label: 'Unlimited' },
              ]}
              size={160}
              centerValue="12,450"
              centerLabel="Total"
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('charts.mrrTrend6Months')}</h3>
          </div>
          <div className="card-body">
            <BarChart bars={[
              { label: 'Jul', value: 510 },
              { label: 'Aug', value: 545 },
              { label: 'Sep', value: 558 },
              { label: 'Oct', value: 600 },
              { label: 'Nov', value: 628 },
              { label: 'Dec', value: 685 },
            ]} height={160} showValues />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('scopeBreakdown.cardTitle')}</h3>
        </div>
        <div className="grid-2" style={{ padding: 0 }}>
          <div style={{ padding: '1.25rem', borderRight: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="badge-pill badge-info">{t('scope.singleSiteMembers')}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>9,030</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{t('scopeBreakdown.singleSiteDescription')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('scopeBreakdown.basicPlan')}</span>
                <strong>2,340</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('scopeBreakdown.legacyPlans')}</span>
                <strong>6,690</strong>
              </div>
            </div>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="badge-pill badge-success">{t('scope.multiSiteMembers')}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>3,420</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{t('scopeBreakdown.multiSiteDescription')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('scopeBreakdown.premiumPlan')}</span>
                <strong>2,100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('scopeBreakdown.unlimitedPlan')}</span>
                <strong>1,320</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('recentActivity.cardTitle')}</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{tc('table.date')}</th>
                <th>{t('recentActivity.columns.customer')}</th>
                <th>{t('recentActivity.columns.action')}</th>
                <th>{t('recentActivity.columns.plan')}</th>
                <th>{t('recentActivity.columns.site')}</th>
                <th>{tc('table.amount')}</th>
                <th>{tc('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ACTIVITY.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.customer}</td>
                  <td>{row.action}</td>
                  <td><span className={`badge-pill ${row.planBadge}`}>{row.plan}</span></td>
                  <td>{row.site}</td>
                  <td>{row.amount}</td>
                  <td><span className={`badge-pill ${row.statusBadge}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
