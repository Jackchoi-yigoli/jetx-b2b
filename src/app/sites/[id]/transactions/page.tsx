import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteTransactionsPage() {
  const t = await getTranslations('sites');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/sites/site-xinyi' },
    { label: t('tabs.equipment'), href: '/sites/site-xinyi/equipment' },
    { label: t('tabs.customers'), href: '/sites/site-xinyi/customers' },
    { label: t('tabs.transactions'), href: '/sites/site-xinyi/transactions' },
    { label: t('tabs.pricing'), href: '/sites/site-xinyi/pricing' },
    { label: t('tabs.cctv'), href: '/sites/site-xinyi/cctv' },
    { label: t('tabs.maintenance'), href: '/sites/site-xinyi/maintenance' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/sites">{t('breadcrumb.sites')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/sites/site-xinyi">Main Street</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb.transactions')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street - Transactions</h1>
            <p className="page-subtitle">Today: 87 transactions &middot; $2,340 revenue</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('transactions.exportCsv')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('transactions.manualEntry')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.todaysRevenue')}</div>
          <div className="kpi-value">$2,340</div>
          <div className="kpi-change positive">+15% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.transactions')}</div>
          <div className="kpi-value">87</div>
          <div className="kpi-change positive">+12% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.avgTicket')}</div>
          <div className="kpi-value">$26.90</div>
          <div className="kpi-change positive">+3%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.memberTransactions')}</div>
          <div className="kpi-value">62%</div>
          <div className="kpi-change positive">+5% vs last week</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-body">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">{t('transactions.filters.dateRange')}</label>
              <select className="form-select">
                <option>{t('transactions.filters.today')}</option>
                <option>{t('transactions.filters.yesterday')}</option>
                <option>{t('transactions.filters.last7Days')}</option>
                <option>{t('transactions.filters.last30Days')}</option>
                <option>{t('transactions.filters.thisMonth')}</option>
                <option>{t('transactions.filters.customRange')}</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">{t('transactions.filters.paymentMethod')}</label>
              <select className="form-select">
                <option>{t('transactions.filters.allMethods')}</option>
                <option>Credit Card</option>
                <option>LINE Pay</option>
                <option>Apple Pay</option>
                <option>Membership</option>
                <option>Cash</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">{t('transactions.filters.serviceType')}</label>
              <select className="form-select">
                <option>{t('transactions.filters.allServices')}</option>
                <option>Basic Wash</option>
                <option>Premium Wash</option>
                <option>Deluxe Wash</option>
                <option>Vacuum</option>
                <option>Add-ons</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">{t('transactions.filters.equipment')}</label>
              <select className="form-select">
                <option>{t('transactions.filters.allEquipment')}</option>
                <option>Bay 1 - Automatic</option>
                <option>Bay 2 - Automatic</option>
                <option>Bay 3 - Self Service</option>
                <option>Bay 4 - Self Service</option>
                <option>Vacuum Station 1</option>
                <option>Vacuum Station 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('transactions.table.title')}</div>
          <div className="table-info">Showing 87 transactions</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('transactions.table.time')}</th>
              <th>{t('transactions.table.transactionId')}</th>
              <th>{t('transactions.table.customer')}</th>
              <th>{t('transactions.table.service')}</th>
              <th>{t('transactions.table.equipment')}</th>
              <th>{t('transactions.table.payment')}</th>
              <th>{t('transactions.table.amount')}</th>
              <th>{t('transactions.table.status')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable-row">
              <td>2:45 PM</td>
              <td><code>TXN-20241208-0087</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-primary">Member</span>
                  Emily Chen
                </div>
              </td>
              <td>Premium Wash + Wax</td>
              <td>Bay 1</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  LINE Pay
                </span>
              </td>
              <td><strong>$35.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>2:38 PM</td>
              <td><code>TXN-20241208-0086</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-secondary">Guest</span>
                  --
                </div>
              </td>
              <td>Basic Wash</td>
              <td>Bay 2</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  Credit Card
                </span>
              </td>
              <td><strong>$18.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>2:31 PM</td>
              <td><code>TXN-20241208-0085</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-primary">Member</span>
                  David Wang
                </div>
              </td>
              <td>Deluxe Wash</td>
              <td>Bay 1</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.4-.59-2.96-.92-4.58-.92-1.62 0-3.18.33-4.58.92L5.5 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.24 9.5C3.73 10.81 2 13.29 2 16h20c0-2.71-1.73-5.19-4.24-6.5zM7 13.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
                  Membership
                </span>
              </td>
              <td><strong>$0.00</strong></td>
              <td><span className="badge badge-info">Membership</span></td>
            </tr>
            <tr className="clickable-row">
              <td>2:22 PM</td>
              <td><code>TXN-20241208-0084</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-secondary">Guest</span>
                  --
                </div>
              </td>
              <td>Vacuum (5 min)</td>
              <td>Vacuum 1</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  Cash
                </span>
              </td>
              <td><strong>$2.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>2:15 PM</td>
              <td><code>TXN-20241208-0083</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-primary">Member</span>
                  Sarah Lin
                </div>
              </td>
              <td>Premium Wash</td>
              <td>Bay 3</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  Apple Pay
                </span>
              </td>
              <td><strong>$28.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>2:08 PM</td>
              <td><code>TXN-20241208-0082</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-secondary">Guest</span>
                  --
                </div>
              </td>
              <td>Basic Wash + Vacuum</td>
              <td>Bay 4</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  Credit Card
                </span>
              </td>
              <td><strong>$22.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>1:55 PM</td>
              <td><code>TXN-20241208-0081</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-primary">Member</span>
                  Michael Huang
                </div>
              </td>
              <td>Deluxe Wash + Detail</td>
              <td>Bay 1</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  LINE Pay
                </span>
              </td>
              <td><strong>$55.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
            <tr className="clickable-row">
              <td>1:42 PM</td>
              <td><code>TXN-20241208-0080</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-secondary">Guest</span>
                  --
                </div>
              </td>
              <td>Premium Wash</td>
              <td>Bay 2</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  Credit Card
                </span>
              </td>
              <td><strong>$28.00</strong></td>
              <td><span className="badge badge-error">Refunded</span></td>
            </tr>
            <tr className="clickable-row">
              <td>1:30 PM</td>
              <td><code>TXN-20241208-0079</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-primary">Member</span>
                  Jennifer Wu
                </div>
              </td>
              <td>Basic Wash</td>
              <td>Bay 3</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.4-.59-2.96-.92-4.58-.92-1.62 0-3.18.33-4.58.92L5.5 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.24 9.5C3.73 10.81 2 13.29 2 16h20c0-2.71-1.73-5.19-4.24-6.5zM7 13.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
                  Membership
                </span>
              </td>
              <td><strong>$0.00</strong></td>
              <td><span className="badge badge-info">Membership</span></td>
            </tr>
            <tr className="clickable-row">
              <td>1:18 PM</td>
              <td><code>TXN-20241208-0078</code></td>
              <td>
                <div className="customer-cell">
                  <span className="badge badge-sm badge-secondary">Guest</span>
                  --
                </div>
              </td>
              <td>Vacuum (10 min)</td>
              <td>Vacuum 2</td>
              <td>
                <span className="payment-method">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                  Cash
                </span>
              </td>
              <td><strong>$4.00</strong></td>
              <td><span className="badge badge-success">{tc('status.completed')}</span></td>
            </tr>
          </tbody>
        </table>
        <div className="table-footer">
          <div className="table-info">{t('transactions.pagination.showing', { total: 87 })}</div>
          <div className="pagination">
            <button className="btn btn-sm btn-secondary" disabled>{tc('actions.previous')}</button>
            <span className="page-numbers">
              <span className="page-number active">1</span>
              <span className="page-number">2</span>
              <span className="page-number">3</span>
              <span className="page-number">...</span>
              <span className="page-number">9</span>
            </span>
            <button className="btn btn-sm btn-secondary">{tc('actions.next')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
