import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

const heatmapData = {
  Mon: [0,0,0,0,0,1,2,3,4,3,3,4,3,2,2,3,3,4,4,3,2,1,1,0],
  Tue: [0,0,0,0,0,1,2,3,3,3,2,3,3,2,2,2,3,3,4,3,2,1,0,0],
  Wed: [0,0,0,0,0,1,2,3,3,2,2,3,2,2,2,2,3,3,3,3,2,1,0,0],
  Thu: [0,0,0,0,0,1,2,3,4,3,3,3,3,2,2,3,4,4,4,3,2,1,1,0],
  Fri: [0,0,0,0,0,1,2,3,4,4,3,4,4,3,3,4,5,5,5,4,3,2,1,0],
  Sat: [0,0,0,0,0,0,1,2,4,5,5,5,4,4,5,5,5,4,4,3,2,1,0,0],
  Sun: [0,0,0,0,0,0,1,2,3,4,5,5,4,4,4,4,4,3,3,2,1,1,0,0],
};

export default async function OperationsReportPage() {
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
          {t('tabs.operations')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('operations.title')}</h1>
            <p className="page-subtitle">{t('operations.subtitle')}</p>
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
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('operations.kpi.equipmentUptime')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>98.5%</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Target: 99%
          </div>
        </div>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('operations.kpi.avgWaitTime')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>4.2 min</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Below 5 min target
          </div>
        </div>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('operations.kpi.washesPerHour')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>18.4</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +12% vs last week
          </div>
        </div>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('operations.kpi.activeAlerts')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>3</div>
          <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            2 maintenance due
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 1rem 0' }}>{t('operations.heatmap.title')}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(24, 1fr)', gap: '2px' }}>
          <div></div>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>{i}</div>
          ))}
          {(Object.entries(heatmapData) as [string, number[]][]).map(([day, hours]) => (
            <>
              <div key={`label-${day}`} style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', paddingRight: '0.5rem' }}>{day}</div>
              {hours.map((level, i) => {
                const bgMap: Record<number, string> = {
                  0: 'var(--color-bg-tertiary)',
                  1: 'rgba(232, 93, 93, 0.2)',
                  2: 'rgba(232, 93, 93, 0.4)',
                  3: 'rgba(232, 93, 93, 0.6)',
                  4: 'rgba(232, 93, 93, 0.8)',
                  5: 'var(--color-primary)',
                };
                return <div key={`${day}-${i}`} style={{ aspectRatio: '1', borderRadius: '3px', minHeight: '20px', background: bgMap[level] }}></div>;
              })}
            </>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <span>{t('operations.heatmap.less')}</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[0,1,2,3,4,5].map((l) => {
              const bgMap: Record<number, string> = {
                0: 'var(--color-bg-tertiary)',
                1: 'rgba(232, 93, 93, 0.2)',
                2: 'rgba(232, 93, 93, 0.4)',
                3: 'rgba(232, 93, 93, 0.6)',
                4: 'rgba(232, 93, 93, 0.8)',
                5: 'var(--color-primary)',
              };
              return <span key={l} style={{ width: '16px', height: '16px', borderRadius: '3px', background: bgMap[l], display: 'inline-block' }}></span>;
            })}
          </div>
          <span>{t('operations.heatmap.more')}</span>
          <span style={{ marginLeft: '1rem' }}>Peak hours: Sat 10-11am, 2-4pm (avg 28 washes/hr)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1rem 0' }}>{t('operations.siteUtilization.title')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { site: 'Xinyi District', pct: '92%', width: '92%', cls: 'excellent', bg: 'var(--color-success)' },
              { site: 'Taipei Main Station', pct: '88%', width: '88%', cls: 'excellent', bg: 'var(--color-success)' },
              { site: 'Taoyuan Airport', pct: '78%', width: '78%', cls: 'good', bg: 'var(--color-info)' },
              { site: 'Banqiao Station', pct: '72%', width: '72%', cls: 'good', bg: 'var(--color-info)' },
              { site: 'Zhonghe Industrial', pct: '58%', width: '58%', cls: 'moderate', bg: 'var(--color-secondary)' },
            ].map((item) => (
              <div key={item.site} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '140px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{item.site}</span>
                <div style={{ flex: 1, height: '24px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: item.width, height: '100%', borderRadius: 'var(--radius-sm)', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: item.cls === 'moderate' ? 'var(--color-text-primary)' : 'white' }}>{item.pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 1rem 0' }}>{t('operations.downtimeEvents.title')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { iconBg: '#3B82F620', iconColor: '#3B82F6', icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: 'Scheduled Maintenance - Bay 3', meta: 'Banqiao Station · Dec 6, 2024', time: '2h 15m', impact: '~$340 lost' },
              { iconBg: '#EF444420', iconColor: '#EF4444', icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>, title: 'Brush Motor Error - Bay 1', meta: 'Xinyi District · Dec 5, 2024', time: '45m', impact: '~$180 lost' },
              { iconBg: '#F5C86920', iconColor: '#D4A84A', icon: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, title: 'Chemical Refill - All Bays', meta: 'Taoyuan Airport · Dec 4, 2024', time: '30m', impact: '~$120 lost' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.iconBg, color: item.iconColor, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.meta}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.time}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{item.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('operations.equipmentStatus.title')}</h3>
          <div className="btn-group">
            <select className="form-select-sm">
              <option>{tc('filters.allSites')}</option>
              <option>Taipei Region</option>
              <option>New Taipei Region</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('operations.equipmentStatus.columns.site')}</th>
                <th>{t('operations.equipmentStatus.columns.bays')}</th>
                <th>{tc('table.status')}</th>
                <th>{t('operations.equipmentStatus.columns.uptime7d')}</th>
                <th>{t('operations.equipmentStatus.columns.washesToday')}</th>
                <th>{t('operations.equipmentStatus.columns.avgWait')}</th>
                <th>{t('operations.equipmentStatus.columns.nextMaintenance')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { site: 'Xinyi District', bays: '4 bays', statusDot: 'online', statusText: '4/4 Online', uptimePct: '99.2%', uptimeWidth: '99.2%', uptimeCls: 'high', washes: 342, wait: '3.8 min', next: 'Dec 15' },
                { site: 'Taipei Main Station', bays: '3 bays', statusDot: 'online', statusText: '3/3 Online', uptimePct: '98.8%', uptimeWidth: '98.8%', uptimeCls: 'high', washes: 298, wait: '4.2 min', next: 'Dec 18' },
                { site: 'Taoyuan Airport', bays: '3 bays', statusDot: 'maintenance', statusText: '2/3 Online', uptimePct: '96.5%', uptimeWidth: '96.5%', uptimeCls: 'medium', washes: 245, wait: '5.1 min', next: 'In Progress' },
                { site: 'Banqiao Station', bays: '2 bays', statusDot: 'online', statusText: '2/2 Online', uptimePct: '99.5%', uptimeWidth: '99.5%', uptimeCls: 'high', washes: 187, wait: '3.5 min', next: 'Dec 20' },
                { site: 'Zhonghe Industrial', bays: '2 bays', statusDot: 'online', statusText: '2/2 Online', uptimePct: '98.1%', uptimeWidth: '98.1%', uptimeCls: 'high', washes: 156, wait: '2.8 min', next: 'Dec 12' },
              ].map((row) => {
                const dotColor: Record<string, string> = { online: 'var(--color-success)', maintenance: 'var(--color-warning)', offline: 'var(--color-primary)' };
                const barColor: Record<string, string> = { high: 'var(--color-success)', medium: 'var(--color-warning)', low: 'var(--color-primary)' };
                return (
                  <tr key={row.site}>
                    <td><Link href="/sites" className="link-primary">{row.site}</Link></td>
                    <td>{row.bays}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor[row.statusDot], display: 'inline-block' }}></span>
                        {row.statusText}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100px', height: '6px', background: 'var(--color-bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: row.uptimeWidth, height: '100%', borderRadius: '3px', background: barColor[row.uptimeCls] }}></div>
                        </div>
                        {row.uptimePct}
                      </div>
                    </td>
                    <td>{row.washes}</td>
                    <td>{row.wait}</td>
                    <td>{row.next}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="text-muted">{t('operations.equipmentStatus.showing5of12')}</span>
          <Link href="/hardware" className="link-primary">{t('operations.equipmentStatus.viewAllEquipment')}</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>{t('operations.weeklySummary.title')}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { iconBg: '#10B98120', iconColor: '#10B981', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>, value: '34,165', label: t('operations.weeklySummary.totalWashes') },
            { iconBg: '#F5C86920', iconColor: '#D4A84A', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, value: '12.4 hrs', label: t('operations.weeklySummary.totalDowntime') },
            { iconBg: '#3B82F620', iconColor: '#3B82F6', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, value: '$1,240', label: t('operations.weeklySummary.revenueLost') },
          ].map((card) => (
            <div key={card.label} style={{ background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', margin: '0 auto 0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: card.iconBg, color: card.iconColor }}>{card.icon}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.15rem' }}>{card.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
