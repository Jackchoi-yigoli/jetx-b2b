import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  customers,
  getTransactionsByCustomer,
  getActiveSubscriptionsByCustomer,
  getPlanById,
} from '@/lib/data';
import CustomersTable from './CustomersTable';

export default async function CustomersPage() {
  const t = await getTranslations('customers');
  const tc = await getTranslations('common');

  // Prepare enriched customer rows for client component
  const customerRows = customers.map((customer) => {
    const txns = getTransactionsByCustomer(customer.id);
    const totalVisits = txns.length;
    const totalSpend = txns.reduce((sum, t) => sum + t.total, 0);
    const activeSubs = getActiveSubscriptionsByCustomer(customer.id);
    const activeSub = activeSubs[0] ?? null;
    const plan = activeSub ? getPlanById(activeSub.planId) : null;
    const lastTxn = txns[0] ?? null;
    const lastVisitDate = lastTxn
      ? new Date(lastTxn.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';
    return {
      ...customer,
      totalVisits,
      totalSpend,
      lastVisitDate,
      membershipTier: plan?.tier ?? null,
    };
  });

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
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {tc('actions.export')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalCustomers')}</div>
          <div className="kpi-value">45,678</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +1,234 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.activeMembers')}</div>
          <div className="kpi-value">12,450</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +342 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgLtv')}</div>
          <div className="kpi-value">$285</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +8% vs last quarter
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.churnRate')}</div>
          <div className="kpi-value">3.2%</div>
          <div className="kpi-change negative">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            -0.5% vs last month
          </div>
        </div>
      </div>

      <CustomersTable data={customerRows} />
    </DashboardLayout>
  );
}
