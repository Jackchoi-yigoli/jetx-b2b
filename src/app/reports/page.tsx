import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { scheduledReports } from '@/data/reports';
import { getTranslations } from 'next-intl/server';

const frequencyLabels: Record<string, string> = {
  daily: 'Daily at 6:00 AM',
  weekly: 'Every Monday 8:00 AM',
  monthly: '1st of month 9:00 AM',
};

function getNextRunDisplay(report: (typeof scheduledReports)[number]): string {
  const d = new Date(report.nextRun);
  const now = new Date('2024-12-08');
  const diffDays = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `Tomorrow ${time}`;
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

const financialReports = [
  { name: 'Revenue Summary', desc: 'Daily, weekly, monthly revenue breakdown' },
  { name: 'Revenue by Site', desc: 'Compare performance across locations' },
  { name: 'Revenue by Service', desc: 'Breakdown by wash type' },
  { name: 'Payment Methods', desc: 'Analysis by payment type' },
  { name: 'Operator Settlement', desc: 'Revenue share calculations' },
];

const operationsReports = [
  { name: 'Transaction Log', desc: 'Detailed transaction history' },
  { name: 'Peak Hours Analysis', desc: 'Traffic patterns by time' },
  { name: 'Equipment Utilization', desc: 'Machine usage and efficiency' },
  { name: 'Maintenance History', desc: 'Service and repair records' },
  { name: 'Downtime Analysis', desc: 'Equipment availability tracking' },
];

const customerReports = [
  { name: 'Customer Acquisition', desc: 'New customer trends' },
  { name: 'Member Analytics', desc: 'Subscription metrics & churn' },
  { name: 'Customer Lifetime Value', desc: 'LTV analysis and segments' },
  { name: 'Visit Frequency', desc: 'Customer visit patterns' },
  { name: 'Cohort Analysis', desc: 'Retention by signup month' },
];

const marketingReports = [
  { name: 'Campaign Performance', desc: 'ROI by marketing campaign' },
  { name: 'Promotion Usage', desc: 'Coupon and discount redemption' },
  { name: 'Referral Program', desc: 'Referral metrics and conversion' },
  { name: 'Email Analytics', desc: 'Open rates and engagement' },
];

const recentlyGenerated = [
  { name: 'November Revenue Summary', type: 'Financial', dateRange: 'Nov 1 - Nov 30, 2024', generated: 'Dec 1, 2024', generatedBy: 'System (Scheduled)' },
  { name: 'Q4 Customer Acquisition', type: 'Customer', dateRange: 'Oct 1 - Dec 7, 2024', generated: 'Today', generatedBy: 'John Chen' },
  { name: 'Equipment Utilization - All Sites', type: 'Operations', dateRange: 'Last 30 days', generated: 'Dec 5, 2024', generatedBy: 'Sarah Wong' },
  { name: 'Holiday Campaign Performance', type: 'Marketing', dateRange: 'Dec 1 - Dec 7, 2024', generated: 'Today', generatedBy: 'John Chen' },
];

export default async function ReportsPage() {
  const t = await getTranslations('reports');
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
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {t('actions.scheduleReport')}
            </button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.customReport')}
            </button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <Link className="tab active" href="/reports">{t('tabs.overview')}</Link>
        <Link className="tab" href="/reports/revenue">{t('tabs.revenue')}</Link>
        <Link className="tab" href="/reports/operations">{t('tabs.operations')}</Link>
        <Link className="tab" href="/reports/customers">{t('tabs.customers')}</Link>
        <Link className="tab" href="/reports/scheduled">{t('tabs.scheduled')}</Link>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.mtdRevenue')}</div>
          <div className="kpi-value">$847K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +18% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.mtdTransactions')}</div>
          <div className="kpi-value">42,350</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +12% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgDailyRevenue')}</div>
          <div className="kpi-value">$121K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +8%
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.equipmentUptime')}</div>
          <div className="kpi-value">98.5%</div>
          <div className="kpi-change neutral">Target: 99%</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('reportLibrary.title')}</h3>
        </div>
        <div className="grid-2" style={{ padding: '1.25rem', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h4 style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{t('reportLibrary.financial')}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {financialReports.map((r) => (
                <Link key={r.name} href="#" className="card-link" style={{ display: 'block', padding: '0.625rem 0.75rem', borderRadius: 6, textDecoration: 'none' }}>
                  <div className="list-item-title" style={{ fontSize: '0.875rem' }}>{r.name}</div>
                  <div className="list-item-subtitle">{r.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <h4 style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{t('reportLibrary.operations')}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {operationsReports.map((r) => (
                <Link key={r.name} href="#" className="card-link" style={{ display: 'block', padding: '0.625rem 0.75rem', borderRadius: 6, textDecoration: 'none' }}>
                  <div className="list-item-title" style={{ fontSize: '0.875rem' }}>{r.name}</div>
                  <div className="list-item-subtitle">{r.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <h4 style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{t('reportLibrary.customer')}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {customerReports.map((r) => (
                <Link key={r.name} href="#" className="card-link" style={{ display: 'block', padding: '0.625rem 0.75rem', borderRadius: 6, textDecoration: 'none' }}>
                  <div className="list-item-title" style={{ fontSize: '0.875rem' }}>{r.name}</div>
                  <div className="list-item-subtitle">{r.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              <h4 style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{t('reportLibrary.marketing')}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {marketingReports.map((r) => (
                <Link key={r.name} href="#" className="card-link" style={{ display: 'block', padding: '0.625rem 0.75rem', borderRadius: 6, textDecoration: 'none' }}>
                  <div className="list-item-title" style={{ fontSize: '0.875rem' }}>{r.name}</div>
                  <div className="list-item-subtitle">{r.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('recentlyGenerated.title')}</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('recentlyGenerated.columns.reportName')}</th>
                <th>{tc('table.type')}</th>
                <th>{t('recentlyGenerated.columns.dateRange')}</th>
                <th>{t('recentlyGenerated.columns.generated')}</th>
                <th>{t('recentlyGenerated.columns.generatedBy')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {recentlyGenerated.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.type}</td>
                  <td>{r.dateRange}</td>
                  <td>{r.generated}</td>
                  <td>{r.generatedBy}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary">{tc('actions.download')}</button>
                    <button className="btn btn-secondary">{tc('actions.view')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('scheduledReports.title')}</h3>
          <button className="btn btn-secondary">+ {t('scheduledReports.scheduleNew')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('scheduledReports.columns.report')}</th>
                <th>{t('scheduledReports.columns.frequency')}</th>
                <th>{t('scheduledReports.columns.recipients')}</th>
                <th>{t('scheduledReports.columns.nextRun')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.slice(0, 3).map((report) => (
                <tr key={report.id}>
                  <td>{report.name}</td>
                  <td>{frequencyLabels[report.frequency] ?? report.frequency}</td>
                  <td>{report.recipients[0]}</td>
                  <td>{getNextRunDisplay(report)}</td>
                  <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                  <td><Link href="/reports/scheduled" className="btn btn-secondary">{tc('actions.edit')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
