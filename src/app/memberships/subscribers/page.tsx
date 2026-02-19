import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import SubscribersTable from './SubscribersTable';

const subscriberData = [
  {
    id: '45672',
    name: 'Amy Zhang',
    email: 'amy.zhang@email.com',
    plan: 'Premium',
    site: 'Xinyi District',
    startDate: 'Dec 7, 2024',
    renewalDate: 'Jan 7, 2025',
    amount: '$65.00/mo',
    status: 'active',
  },
  {
    id: '45671',
    name: 'Kevin Liu',
    email: 'kevin.liu@email.com',
    plan: 'Premium',
    site: 'Taipei Main',
    startDate: 'Nov 15, 2024',
    renewalDate: 'Dec 15, 2024',
    amount: '$59.00/mo',
    status: 'expiring',
  },
  {
    id: '45670',
    name: 'Jessica Wang',
    email: 'jessica.w@email.com',
    plan: 'Unlimited',
    site: 'Taoyuan Airport',
    startDate: 'Oct 22, 2024',
    renewalDate: 'Jan 22, 2025',
    amount: '$119.00/mo',
    status: 'active',
  },
  {
    id: '45669',
    name: 'Tom Chen',
    email: 'tom.chen@email.com',
    plan: 'Basic',
    site: 'Banqiao Station',
    startDate: 'Aug 15, 2024',
    renewalDate: '-',
    amount: '$29.00/mo',
    status: 'cancelled',
  },
  {
    id: '45668',
    name: 'Lisa Lin',
    email: 'lisa.lin@email.com',
    plan: 'Unlimited',
    site: 'Zhonghe Industrial',
    startDate: 'Dec 6, 2024',
    renewalDate: 'Jan 6, 2025',
    amount: '$79.00/mo',
    status: 'active',
  },
  {
    id: '45667',
    name: 'David Wu',
    email: 'david.wu@email.com',
    plan: 'Premium',
    site: 'Taipei Main',
    startDate: 'Sep 1, 2024',
    renewalDate: 'Dec 1, 2024',
    amount: '$59.00/mo',
    status: 'paused',
  },
  {
    id: '45666',
    name: 'Sarah Huang',
    email: 'sarah.h@email.com',
    plan: 'Basic',
    site: 'Xinyi District',
    startDate: 'Jul 20, 2024',
    renewalDate: 'Jan 20, 2025',
    amount: '$29.00/mo',
    status: 'active',
  },
  {
    id: '45665',
    name: 'Michael Chang',
    email: 'm.chang@email.com',
    plan: 'Unlimited',
    site: 'Taoyuan Airport',
    startDate: 'May 10, 2024',
    renewalDate: 'Feb 10, 2025',
    amount: '$119.00/mo',
    status: 'active',
  },
  {
    id: '45664',
    name: 'Emily Tsai',
    email: 'emily.t@email.com',
    plan: 'Premium',
    site: 'Banqiao Station',
    startDate: 'Nov 1, 2024',
    renewalDate: 'Feb 1, 2025',
    amount: '$59.00/mo',
    status: 'active',
  },
  {
    id: '45663',
    name: 'Jason Lee',
    email: 'jason.lee@email.com',
    plan: 'Basic',
    site: 'Zhonghe Industrial',
    startDate: 'Oct 5, 2024',
    renewalDate: 'Jan 5, 2025',
    amount: '$25.00/mo',
    status: 'active',
  },
];

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

      <SubscribersTable data={subscriberData} />
    </DashboardLayout>
  );
}
