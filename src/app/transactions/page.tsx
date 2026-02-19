import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { transactions } from '@/data/transactions';
import { customers } from '@/data/customers';
import { getTranslations } from 'next-intl/server';
import TransactionsTable from './TransactionsTable';

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

// Enrich transactions with display names for client component
const transactionRows = displayedTransactions.map((txn) => ({
  ...txn,
  customerName: txn.customerId ? (customerMap.get(txn.customerId)?.name ?? null) : null,
  siteName: SITE_DISPLAY_NAMES[txn.siteId] ?? txn.siteId,
}));

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

      <TransactionsTable data={transactionRows} />
    </DashboardLayout>
  );
}
