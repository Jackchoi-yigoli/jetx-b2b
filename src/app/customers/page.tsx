import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  customers,
  getTransactionsByCustomer,
  getActiveSubscriptionsByCustomer,
  getPlanById,
} from '@/lib/data';

function getCustomerStatusBadge(status: string, labels: Record<string, string>) {
  switch (status) {
    case 'active':
      return <span className="badge-pill badge-success"><span className="status-dot online"></span>{labels.active}</span>;
    case 'at-risk':
      return <span className="badge-pill badge-warning"><span className="status-dot alert"></span>{labels.atRisk}</span>;
    case 'inactive':
      return <span className="badge-pill badge-gray"><span className="status-dot offline"></span>{labels.inactive}</span>;
    case 'churned':
      return <span className="badge-pill badge-error"><span className="status-dot offline"></span>{labels.churned}</span>;
    default:
      return <span className="badge-pill badge-gray">{status}</span>;
  }
}

function getMembershipBadge(tier: string | null, labels: Record<string, string>) {
  switch (tier) {
    case 'unlimited':
      return <span className="badge-pill badge-premium">{labels.unlimited}</span>;
    case 'premium':
      return <span className="badge-pill badge-info">{labels.premium}</span>;
    case 'basic':
      return <span className="badge-pill badge-gray">{labels.basic}</span>;
    default:
      return <span className="badge-pill badge-muted">{labels.none}</span>;
  }
}

function getNumericId(id: string) {
  return id.replace(/\D/g, '');
}

export default async function CustomersPage() {
  const t = await getTranslations('customers');
  const tc = await getTranslations('common');

  const statusLabels = {
    active: tc('status.active'),
    atRisk: t('status.atRisk'),
    inactive: tc('status.inactive'),
    churned: t('status.churned'),
  };

  const membershipLabels = {
    unlimited: t('membership.unlimited'),
    premium: t('membership.premium'),
    basic: t('membership.basic'),
    none: t('membership.none'),
  };

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

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 250 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('filters.searchPlaceholder')} />
          </div>
          <select className="filter-input">
            <option>{t('filters.allMemberships')}</option>
            <option>{t('membership.unlimited')}</option>
            <option>{t('membership.premium')}</option>
            <option>{t('membership.basic')}</option>
            <option>{t('membership.none')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{tc('status.active')}</option>
            <option>{tc('status.inactive')}</option>
            <option>{t('status.atRisk')}</option>
            <option>{t('status.churned')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allSites')}</option>
            <option>JetX Xinyi Station</option>
            <option>JetX Daan Station</option>
            <option>JetX Zhongshan</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('table.customer')}</th>
                <th>{t('table.contact')}</th>
                <th>{t('table.membership')}</th>
                <th>{t('table.totalVisits')}</th>
                <th>{t('table.totalSpend')}</th>
                <th>{t('table.lastVisit')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const txns = getTransactionsByCustomer(customer.id);
                const totalVisits = txns.length;
                const totalSpend = txns.reduce((sum, t) => sum + t.total, 0);
                const activeSubs = getActiveSubscriptionsByCustomer(customer.id);
                const activeSub = activeSubs[0] ?? null;
                const plan = activeSub ? getPlanById(activeSub.planId) : null;
                const numericId = getNumericId(customer.id);
                const lastTxn = txns[0] ?? null;
                const lastVisitDate = lastTxn
                  ? new Date(lastTxn.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : '—';
                return (
                  <tr key={customer.id} className="clickable">
                    <td>
                      <Link href={`/customers/${customer.id}`} style={{ display: 'contents' }}>
                        <div className="list-item-title">{customer.name}</div>
                        <div className="list-item-subtitle">ID: #{numericId}</div>
                      </Link>
                    </td>
                    <td>
                      <div className="list-item-title">{customer.email}</div>
                      <div className="list-item-subtitle">{customer.phone}</div>
                    </td>
                    <td>{getMembershipBadge(plan?.tier ?? null, membershipLabels)}</td>
                    <td>{totalVisits}</td>
                    <td><strong>${totalSpend.toFixed(2)}</strong></td>
                    <td>{lastVisitDate}</td>
                    <td>{getCustomerStatusBadge(customer.status, statusLabels)}</td>
                    <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('pagination.showingCustomers', { from: 1, to: customers.length, total: customers.length })}</span>
          <div className="pagination-pages">
            <button className="active">1</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
