import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function RevenueReportPage() {
  const t = await getTranslations('reports');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/reports' },
    { label: t('tabs.revenue'), href: '/reports/revenue' },
    { label: t('tabs.customers'), href: '/reports/customers' },
    { label: t('tabs.operations'), href: '/reports/operations' },
    { label: t('tabs.scheduled'), href: '/reports/scheduled' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/reports">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.revenue')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('revenue.title')}</h1>
            <p className="page-subtitle">{t('revenue.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {tc('actions.export')}
            </button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.customReport')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('dateFilter.from')}:</label>
        <input type="date" defaultValue="2024-12-01" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', background: 'var(--color-bg-primary)' }} />
        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('dateFilter.to')}:</label>
        <input type="date" defaultValue="2024-12-07" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', background: 'var(--color-bg-primary)' }} />
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{tc('filters.today', { defaultValue: 'Today' })}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'white' }}>{t('dateFilter.thisWeek')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{tc('filters.thisMonth')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{tc('filters.lastMonth')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{t('dateFilter.ytd')}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('revenue.kpi.totalRevenue')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>$847,234</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +18.2% vs last period
          </div>
        </div>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('revenue.kpi.avgTransactionValue')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>$24.80</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +$2.40 vs last period
          </div>
        </div>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('revenue.kpi.transactions')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>34,165</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +12.4% vs last period
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{t('revenue.chart.revenueTrend')}</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'white' }}>{t('revenue.chart.daily')}</button>
            <button style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{t('revenue.chart.weekly')}</button>
            <button style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{t('revenue.chart.monthly')}</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '200px', paddingTop: '1rem' }}>
          {[
            { label: 'Dec 1', addons: 15, single: 45, membership: 50 },
            { label: 'Dec 2', addons: 18, single: 52, membership: 55 },
            { label: 'Dec 3', addons: 14, single: 48, membership: 52 },
            { label: 'Dec 4', addons: 16, single: 50, membership: 54 },
            { label: 'Dec 5', addons: 20, single: 58, membership: 60 },
            { label: 'Dec 6', addons: 25, single: 72, membership: 68 },
            { label: 'Dec 7', addons: 28, single: 78, membership: 72 },
          ].map((bar) => (
            <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '100%', maxWidth: '50px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ width: '100%', height: `${bar.addons}px`, background: 'var(--color-info)', borderRadius: '3px 3px 0 0' }}></div>
                <div style={{ width: '100%', height: `${bar.single}px`, background: 'var(--color-secondary)', borderRadius: '3px 3px 0 0' }}></div>
                <div style={{ width: '100%', height: `${bar.membership}px`, background: 'var(--color-primary)', borderRadius: '3px 3px 0 0' }}></div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>{bar.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--color-primary)', display: 'inline-block' }}></span>
            {t('revenue.chart.legend.membershipRevenue')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--color-secondary)', display: 'inline-block' }}></span>
            {t('revenue.chart.legend.singleWashRevenue')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--color-info)', display: 'inline-block' }}></span>
            {t('revenue.chart.legend.addonRevenue')}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1rem 0' }}>{t('revenue.byServiceType')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Premium Wash', width: '100%', bg: 'var(--color-primary)', value: '$312,450', percent: '36.9%' },
              { name: 'Deluxe Wash', width: '78%', bg: 'var(--color-secondary)', value: '$243,680', percent: '28.8%' },
              { name: 'Basic Wash', width: '52%', bg: 'var(--color-info)', value: '$162,340', percent: '19.2%' },
              { name: 'Add-on Services', width: '41%', bg: 'var(--color-success)', value: '$128,764', percent: '15.2%' },
            ].map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ flex: 1, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{item.name}</span>
                <div style={{ width: '120px', height: '8px', background: 'var(--color-bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: item.width, height: '100%', borderRadius: '4px', background: item.bg }}></div>
                </div>
                <span style={{ width: '80px', textAlign: 'right', fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</span>
                <span style={{ width: '50px', textAlign: 'right', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.percent}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1rem 0' }}>{t('revenue.paymentMethods')}</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { iconBg: '#3B82F620', iconColor: '#3B82F6', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>, label: 'Card', value: '$356K', percent: '42%' },
              { iconBg: '#10B98120', iconColor: '#10B981', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, label: 'Mobile', value: '$271K', percent: '32%' },
              { iconBg: '#E85D5D20', iconColor: '#E85D5D', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, label: 'Member', value: '$186K', percent: '22%' },
              { iconBg: '#F5C86920', iconColor: '#D4A84A', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, label: 'Cash', value: '$34K', percent: '4%' },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '40px', height: '40px', margin: '0 auto 0.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.iconBg, color: item.iconColor }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.percent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('revenue.bySite.title')}</h3>
          <div className="btn-group">
            <select className="form-select-sm">
              <option>{tc('filters.allSites')}</option>
              <option>Taipei Region</option>
              <option>New Taipei Region</option>
            </select>
          </div>
        </div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.site')}</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.revenue')}</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.transactions')}</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.avgValue')}</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.sevenDayTrend')}</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{t('revenue.bySite.columns.change')}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { site: 'Xinyi District', revenue: '$98,450', transactions: '3,890', avg: '$25.31', trend: [12, 14, 11, 16, 18, 22, 24], change: '+22%', positive: true },
              { site: 'Taipei Main Station', revenue: '$87,230', transactions: '3,456', avg: '$25.24', trend: [14, 16, 15, 18, 17, 20, 21], change: '+18%', positive: true },
              { site: 'Taoyuan Airport', revenue: '$76,890', transactions: '2,980', avg: '$25.80', trend: [16, 15, 17, 16, 19, 18, 20], change: '+15%', positive: true },
              { site: 'Banqiao Station', revenue: '$65,340', transactions: '2,780', avg: '$23.50', trend: [14, 15, 14, 16, 15, 17, 16], change: '+8%', positive: true },
              { site: 'Zhonghe Industrial', revenue: '$54,120', transactions: '2,340', avg: '$23.13', trend: [16, 14, 15, 13, 14, 12, 13], change: '-5%', positive: false },
            ].map((row) => (
              <tr key={row.site}>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)', fontWeight: 500 }}>
                  <Link href="/sites" className="link-primary">{row.site}</Link>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>{row.revenue}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>{row.transactions}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>{row.avg}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px' }}>
                    {row.trend.map((h, i) => (
                      <div key={i} style={{ width: '4px', height: `${h}px`, background: 'var(--color-primary)', borderRadius: '2px', opacity: i === row.trend.length - 1 ? 1 : 0.6 }}></div>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: row.positive ? 'var(--color-success)' : 'var(--color-primary)' }}>
                    {row.positive
                      ? <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      : <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    }
                    {row.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span className="text-muted">{t('revenue.bySite.showingTop5')}</span>
          <Link href="/sites" className="link-primary">{t('revenue.bySite.viewAllSites')}</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
