import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import SiteAssignmentsTable from './SiteAssignmentsTable';
import type { SiteAssignmentRow } from './SiteAssignmentsTable';

const siteAssignmentRows: SiteAssignmentRow[] = [
  {
    id: '1',
    name: 'Taipei Main Station',
    address: '12 Zhongxiao E. Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 1245,
    siteMrr: '$68,450',
    siteMrrSort: 68450,
  },
  {
    id: '2',
    name: 'Xinyi District',
    address: '88 Songren Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$65',
    premiumStatus: 'override',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 2340,
    siteMrr: '$142,800',
    siteMrrSort: 142800,
  },
  {
    id: '3',
    name: 'Banqiao Station',
    address: '50 Zhongshan Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: null,
    unlimitedStatus: 'unavailable',
    activeMembers: 890,
    siteMrr: '$42,100',
    siteMrrSort: 42100,
  },
  {
    id: '4',
    name: 'Taoyuan Airport',
    address: 'Terminal 2, Level B2',
    basicPrice: null,
    basicStatus: 'unavailable',
    premiumPrice: '$69',
    premiumStatus: 'override',
    unlimitedPrice: '$119',
    unlimitedStatus: 'override',
    activeMembers: 1560,
    siteMrr: '$118,200',
    siteMrrSort: 118200,
  },
  {
    id: '5',
    name: 'Zhonghe Industrial',
    address: '22 Zhonghe Rd',
    basicPrice: '$25',
    basicStatus: 'override',
    premiumPrice: '$49',
    premiumStatus: 'override',
    unlimitedPrice: '$79',
    unlimitedStatus: 'override',
    activeMembers: 780,
    siteMrr: '$38,200',
    siteMrrSort: 38200,
  },
  {
    id: '6',
    name: 'Neihu Tech Park',
    address: '168 Ruiguang Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 1120,
    siteMrr: '$62,400',
    siteMrrSort: 62400,
  },
  {
    id: '7',
    name: 'Shilin Night Market',
    address: '101 Jihe Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: null,
    unlimitedStatus: 'unavailable',
    activeMembers: 650,
    siteMrr: '$32,100',
    siteMrrSort: 32100,
  },
  {
    id: '8',
    name: 'Beitou Hot Springs',
    address: '45 Guangming Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$65',
    premiumStatus: 'override',
    unlimitedPrice: '$109',
    unlimitedStatus: 'override',
    activeMembers: 520,
    siteMrr: '$38,900',
    siteMrrSort: 38900,
  },
  {
    id: '9',
    name: 'Tamsui Waterfront',
    address: '88 Zhongzheng Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 890,
    siteMrr: '$48,600',
    siteMrrSort: 48600,
  },
  {
    id: '10',
    name: 'Xindian Riverside',
    address: '200 Beiyi Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 720,
    siteMrr: '$41,200',
    siteMrrSort: 41200,
  },
  {
    id: '11',
    name: 'Linkou Outlet',
    address: '1 Wenhua 3rd Rd',
    basicPrice: '$29',
    basicStatus: 'standard',
    premiumPrice: '$59',
    premiumStatus: 'standard',
    unlimitedPrice: '$99',
    unlimitedStatus: 'standard',
    activeMembers: 980,
    siteMrr: '$52,800',
    siteMrrSort: 52800,
  },
  {
    id: '12',
    name: 'Sanchong Industrial',
    address: '55 Chongxin Rd',
    basicPrice: '$25',
    basicStatus: 'override',
    premiumPrice: '$49',
    premiumStatus: 'override',
    unlimitedPrice: null,
    unlimitedStatus: 'unavailable',
    activeMembers: 755,
    siteMrr: '$34,250',
    siteMrrSort: 34250,
  },
];

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

      <SiteAssignmentsTable data={siteAssignmentRows} />

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
