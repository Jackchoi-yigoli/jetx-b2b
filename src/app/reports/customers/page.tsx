import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function CustomersReportPage() {
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
          {t('tabs.customers')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('customers.title')}</h1>
            <p className="page-subtitle">{t('customers.subtitle')}</p>
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
        <input type="date" defaultValue="2024-11-01" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', background: 'var(--color-bg-primary)' }} />
        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('dateFilter.to')}:</label>
        <input type="date" defaultValue="2024-12-07" style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', background: 'var(--color-bg-primary)' }} />
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{tc('filters.thisMonth')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'white' }}>{tc('filters.last30Days')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{t('dateFilter.last90Days')}</button>
          <button style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{t('dateFilter.ytd')}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: t('customers.kpi.totalCustomers'), value: '45,230', change: '+2,340 this month', positive: true, upArrow: true },
          { label: t('customers.kpi.activeMembers'), value: '8,456', change: '+12% vs last month', positive: true, upArrow: true },
          { label: t('customers.kpi.avgLtv'), value: '$186', change: '+$12 vs last quarter', positive: true, upArrow: true },
          { label: t('customers.kpi.churnRate'), value: '3.2%', change: '-0.5% vs last month', positive: true, upArrow: false },
        ].map((card) => (
          <div key={card.label} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{card.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{card.value}</div>
            <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
              {card.upArrow
                ? <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                : <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              }
              {card.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{t('customers.acquisition.title')}</h4>
            <span className="badge badge-info">{t('customers.acquisition.last8Weeks')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', paddingTop: '1rem' }}>
            {[
              { label: 'Oct 14', height: 85, value: '412' },
              { label: 'Oct 21', height: 95, value: '478' },
              { label: 'Oct 28', height: 78, value: '389' },
              { label: 'Nov 4', height: 102, value: '512' },
              { label: 'Nov 11', height: 118, value: '592' },
              { label: 'Nov 18', height: 125, value: '628' },
              { label: 'Nov 25', height: 138, value: '695' },
              { label: 'Dec 2', height: 145, value: '728' },
            ].map((bar) => (
              <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '100%', maxWidth: '40px', height: `${bar.height}px`, background: 'var(--color-primary)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{bar.value}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{t('customers.funnel.title')}</h4>
            <span className="badge badge-muted">{tc('filters.thisMonth')}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem 0' }}>
            {[
              { label: t('customers.funnel.appDownloads'), width: '100%', value: '12,450', rate: '100%' },
              { label: t('customers.funnel.registered'), width: '68%', value: '8,466', rate: '68%' },
              { label: t('customers.funnel.firstWash'), width: '42%', value: '5,229', rate: '42%' },
              { label: t('customers.funnel.repeatCustomer'), width: '19%', value: '2,366', rate: '19%' },
            ].map((step) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '100px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'right' }}>{step.label}</div>
                <div style={{ flex: 1, height: '28px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <div style={{ width: step.width, height: '100%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>{step.value}</span>
                  </div>
                </div>
                <div style={{ width: '50px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{step.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{t('customers.segments.title')}</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { iconBg: '#F5C86930', iconColor: '#D4A84A', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, name: 'VIP Members', desc: '10+ washes/month, Premium tier', count: '2,340', percent: '5.2%' },
              { iconBg: '#3B82F620', iconColor: '#3B82F6', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, name: 'Regular Members', desc: 'Active subscription, 2-9 washes/month', count: '6,116', percent: '13.5%' },
              { iconBg: '#10B98120', iconColor: '#10B981', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>, name: 'New Customers', desc: 'Joined in last 30 days', count: '2,340', percent: '5.2%' },
              { iconBg: '#EF444420', iconColor: '#EF4444', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>, name: 'At Risk', desc: 'No visit in 60+ days', count: '1,890', percent: '4.2%' },
            ].map((seg) => (
              <div key={seg.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: seg.iconBg, color: seg.iconColor, flexShrink: 0 }}>
                  {seg.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.15rem' }}>{seg.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{seg.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{seg.count}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{seg.percent}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{t('customers.ltv.title')}</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            {[
              { tier: 'VIP Members', value: '$892', valueColor: 'var(--color-success)', count: '2,340 customers' },
              { tier: 'Regular Members', value: '$324', valueColor: 'var(--color-info)', count: '6,116 customers' },
              { tier: 'Non-Members', value: '$68', valueColor: 'var(--color-text-muted)', count: '36,774 customers' },
            ].map((item) => (
              <div key={item.tier} style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{item.tier}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.15rem', color: item.valueColor }}>{item.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{item.count}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{t('customers.ltv.retentionTitle')}</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '140px', padding: '1rem 0' }}>
            {[
              { label: 'M0', primary: '100%', secondary: '100%' },
              { label: 'M1', primary: '92%', secondary: '45%' },
              { label: 'M2', primary: '88%', secondary: '28%' },
              { label: 'M3', primary: '85%', secondary: '18%' },
              { label: 'M6', primary: '82%', secondary: '12%' },
              { label: 'M12', primary: '78%', secondary: '8%' },
            ].map((bar) => (
              <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <div style={{ width: '100%', maxWidth: '30px', height: bar.primary, background: 'var(--color-primary)', borderRadius: '3px 3px 0 0' }}></div>
                <div style={{ width: '100%', maxWidth: '30px', height: bar.secondary, background: 'var(--color-secondary)', borderRadius: '3px 3px 0 0' }}></div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{bar.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--color-primary)', display: 'inline-block' }}></span>
              {t('customers.ltv.members')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--color-secondary)', display: 'inline-block' }}></span>
              {t('customers.ltv.nonMembers')}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('customers.cohort.title')}</h3>
          <span className="badge badge-info">{t('customers.cohort.badge')}</span>
        </div>
        <table style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {[t('customers.cohort.columns.cohort'), t('customers.cohort.columns.users'), 'Month 0', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'].map((h) => (
                <th key={h} style={{ padding: '0.5rem 0.35rem', textAlign: h === t('customers.cohort.columns.cohort') || h === t('customers.cohort.columns.users') ? 'left' : 'center', borderBottom: '1px solid var(--color-border)', fontWeight: 500, color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { cohort: 'Jun 2024', users: '1,890', cells: [{ v: '100%', l: 5 }, { v: '68%', l: 4 }, { v: '52%', l: 3 }, { v: '45%', l: 3 }, { v: '38%', l: 2 }, { v: '34%', l: 2 }, { v: '31%', l: 2 }] },
              { cohort: 'Jul 2024', users: '2,120', cells: [{ v: '100%', l: 5 }, { v: '72%', l: 4 }, { v: '55%', l: 3 }, { v: '48%', l: 3 }, { v: '42%', l: 2 }, { v: '38%', l: 2 }, { v: '-', l: 0 }] },
              { cohort: 'Aug 2024', users: '2,340', cells: [{ v: '100%', l: 5 }, { v: '70%', l: 4 }, { v: '54%', l: 3 }, { v: '46%', l: 3 }, { v: '40%', l: 2 }, { v: '-', l: 0 }, { v: '-', l: 0 }] },
              { cohort: 'Sep 2024', users: '2,560', cells: [{ v: '100%', l: 5 }, { v: '74%', l: 4 }, { v: '58%', l: 3 }, { v: '50%', l: 3 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }] },
              { cohort: 'Oct 2024', users: '2,780', cells: [{ v: '100%', l: 5 }, { v: '76%', l: 4 }, { v: '62%', l: 3 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }] },
              { cohort: 'Nov 2024', users: '3,120', cells: [{ v: '100%', l: 5 }, { v: '78%', l: 4 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }, { v: '-', l: 0 }] },
            ].map((row) => (
              <tr key={row.cohort}>
                <td style={{ padding: '0.5rem 0.35rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 500 }}>{row.cohort}</td>
                <td style={{ padding: '0.5rem 0.35rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>{row.users}</td>
                {row.cells.map((cell, i) => {
                  const bgMap: Record<number, string> = {
                    5: 'rgba(232, 93, 93, 1)',
                    4: 'rgba(232, 93, 93, 0.8)',
                    3: 'rgba(232, 93, 93, 0.6)',
                    2: 'rgba(232, 93, 93, 0.4)',
                    1: 'rgba(232, 93, 93, 0.2)',
                    0: 'var(--color-bg-tertiary)',
                  };
                  return (
                    <td key={i} style={{ padding: '0.5rem 0.35rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ display: 'inline-block', borderRadius: '4px', padding: '0.25rem', background: bgMap[cell.l], color: cell.l >= 3 ? 'white' : 'inherit' }}>{cell.v}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>{t('customers.topCustomers.title')}</h3>
          <div className="btn-group">
            <select className="form-select-sm">
              <option>{t('customers.topCustomers.allTime')}</option>
              <option>{t('customers.topCustomers.thisYear')}</option>
              <option>{tc('filters.thisQuarter')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('customers.topCustomers.columns.customer')}</th>
                <th>{t('customers.topCustomers.columns.memberSince')}</th>
                <th>{t('customers.topCustomers.columns.totalVisits')}</th>
                <th>{t('customers.topCustomers.columns.ltv')}</th>
                <th>{t('customers.topCustomers.columns.avgSpend')}</th>
                <th>{t('customers.topCustomers.columns.visitTrend')}</th>
                <th>{t('customers.topCustomers.columns.favoriteSite')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { initials: 'CL', name: 'Chen Li Wei', tier: 'Premium Member', since: 'Jan 2022', visits: 342, ltv: '$2,450', avg: '$28.40', trend: 'up', trendVal: '+15%', site: 'Xinyi District' },
                { initials: 'WH', name: 'Wang Hui Ming', tier: 'Premium Member', since: 'Mar 2022', visits: 298, ltv: '$2,180', avg: '$26.80', trend: 'same', trendVal: '0%', site: 'Taipei Main' },
                { initials: 'LY', name: 'Lin Yu Chen', tier: 'Premium Member', since: 'Jun 2022', visits: 276, ltv: '$1,920', avg: '$25.60', trend: 'up', trendVal: '+8%', site: 'Banqiao Station' },
                { initials: 'ZX', name: 'Zhang Xiao Wen', tier: 'Deluxe Member', since: 'Aug 2022', visits: 245, ltv: '$1,680', avg: '$24.20', trend: 'down', trendVal: '-5%', site: 'Taoyuan Airport' },
                { initials: 'HJ', name: 'Huang Jia Yi', tier: 'Premium Member', since: 'Oct 2022', visits: 234, ltv: '$1,560', avg: '$26.40', trend: 'up', trendVal: '+12%', site: 'Xinyi District' },
              ].map((customer) => (
                <tr key={customer.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>{customer.initials}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{customer.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{customer.tier}</div>
                      </div>
                    </div>
                  </td>
                  <td>{customer.since}</td>
                  <td>{customer.visits}</td>
                  <td>{customer.ltv}</td>
                  <td>{customer.avg}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: customer.trend === 'up' ? 'var(--color-success)' : customer.trend === 'down' ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                      {customer.trend === 'up' && <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                      {customer.trend === 'down' && <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                      {customer.trend === 'same' && <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>}
                      {customer.trendVal}
                    </span>
                  </td>
                  <td>{customer.site}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="text-muted">{t('customers.topCustomers.showingTop5')}</span>
          <Link href="/customers" className="link-primary">{t('customers.topCustomers.viewAll')}</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
