import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { transactions } from '@/data/transactions';
import { customers } from '@/data/customers';
import { getTranslations } from 'next-intl/server';

const SITE_DISPLAY_NAMES: Record<string, string> = {
  'site-xinyi': 'JetX Xinyi',
  'site-daan': 'JetX Daan',
  'site-zhongshan': 'JetX Zhongshan',
  'site-taipei-main': 'JetX Taipei Main',
  'site-taoyuan-airport': 'JetX Taoyuan',
  'site-zhonghe': 'JetX Zhonghe',
  'site-nangang': 'JetX Nangang',
  'site-neihu': 'JetX Neihu',
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  basic: 'Basic Wash',
  premium: 'Premium Wash',
  ultimate: 'Ultimate Wash',
  deluxe: 'Deluxe Wash',
  'self-service': 'Self-Service',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  membership: 'Membership',
  'credit-card': 'Credit Card',
  cash: 'Cash',
  'jetx-wallet': 'JetX Wallet',
  'line-pay': 'Line Pay',
  'apple-pay': 'Apple Pay',
};

function getStatusBadge(status: string): string {
  switch (status) {
    case 'completed': return 'badge-success';
    case 'in-progress': return 'badge-warning';
    case 'refunded': return 'badge-error';
    case 'failed': return 'badge-error';
    default: return '';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'completed': return 'online';
    case 'in-progress': return 'alert';
    case 'refunded': return 'offline';
    case 'failed': return 'offline';
    default: return '';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'in-progress': return 'In Progress';
    case 'completed': return 'Completed';
    case 'refunded': return 'Refunded';
    case 'failed': return 'Failed';
    default: return status;
  }
}

function formatTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatAmount(total: number): string {
  if (total === 0) return '$0.00';
  if (total < 0) return `-$${Math.abs(total).toFixed(2)}`;
  return `$${total.toFixed(2)}`;
}

const PAGE_TRANSACTION_IDS = [
  'TXN-789456',
  'TXN-789455',
  'TXN-789454',
  'TXN-789453',
  'TXN-789452',
  'TXN-789449',
];

const customerMap = new Map(customers.map((c) => [c.id, c]));

const displayedTransactions = PAGE_TRANSACTION_IDS
  .map((id) => transactions.find((t) => t.id === id))
  .filter(Boolean) as typeof transactions;

export default async function TransactionsPage() {
  const t = await getTranslations('transactions');
  const tc = await getTranslations('common');

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
            <button className="btn btn-secondary">{t('actions.exportCsv')}</button>
            <button className="btn btn-secondary">{t('actions.exportPdf')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.todaysTransactions')}</div>
          <div className="kpi-value">1,234</div>
          <div className="kpi-change positive">+15% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.todaysRevenue')}</div>
          <div className="kpi-value">$24,680</div>
          <div className="kpi-change positive">+12% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgTransactionValue')}</div>
          <div className="kpi-value">$20.00</div>
          <div className="kpi-change neutral">-</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.refundRate')}</div>
          <div className="kpi-value">0.3%</div>
          <div className="kpi-change positive">-0.1% this week</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 250 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('filters.searchPlaceholder')} />
          </div>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{tc('status.completed')}</option>
            <option>{tc('status.inProgress')}</option>
            <option>{t('filters.refunded')}</option>
            <option>{tc('status.failed')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allSites')}</option>
            <option>JetX Xinyi Station</option>
            <option>JetX Daan Station</option>
            <option>JetX Zhongshan</option>
          </select>
          <select className="filter-input">
            <option>{t('filters.allPaymentMethods')}</option>
            <option>Credit Card</option>
            <option>Membership</option>
            <option>JetX Wallet</option>
            <option>Cash</option>
          </select>
          <select className="filter-input">
            <option>{tc('time.today')}</option>
            <option>{tc('time.yesterday')}</option>
            <option>{tc('filters.last7Days')}</option>
            <option>{tc('filters.last30Days')}</option>
            <option>{t('filters.customRange')}</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('table.transactionId')}</th>
                <th>{t('table.site')}</th>
                <th>{t('table.customer')}</th>
                <th>{t('table.service')}</th>
                <th>{t('table.payment')}</th>
                <th>{tc('table.amount')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((txn) => {
                const customer = txn.customerId ? customerMap.get(txn.customerId) : null;
                const customerId = txn.customerId ? txn.customerId.replace('cust-', '#') : null;
                const serviceLabel = SERVICE_TYPE_LABELS[txn.serviceType] ?? txn.serviceType;
                const serviceWithAddons = txn.addons.length > 0
                  ? `${serviceLabel} + ${txn.addons.join(' + ')}`
                  : serviceLabel;
                return (
                  <tr key={txn.id} className="clickable">
                    <td>
                      <div className="list-item-title">{txn.id}</div>
                      <div className="list-item-subtitle">{formatTime(txn.dateTime)}</div>
                    </td>
                    <td>{SITE_DISPLAY_NAMES[txn.siteId] ?? txn.siteId}</td>
                    <td>
                      <div className="list-item-title">{customer ? customer.name : t('table.guest')}</div>
                      <div className="list-item-subtitle">{customerId ?? '-'}</div>
                    </td>
                    <td>{serviceWithAddons}</td>
                    <td>{PAYMENT_METHOD_LABELS[txn.paymentMethod] ?? txn.paymentMethod}</td>
                    <td><strong>{formatAmount(txn.total)}</strong></td>
                    <td>
                      <span className={`badge-pill ${getStatusBadge(txn.status)}`}>
                        <span className={`status-dot ${getStatusDot(txn.status)}`}></span>
                        {getStatusLabel(txn.status)}
                      </span>
                    </td>
                    <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('pagination.showing', { from: 1, to: displayedTransactions.length, total: '1,234' })}</span>
          <div className="pagination-pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
