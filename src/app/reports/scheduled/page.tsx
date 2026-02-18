import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

const EditIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const ClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default async function ScheduledReportsPage() {
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
          {t('tabs.scheduled')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('scheduled.title')}</h1>
            <p className="page-subtitle">{t('scheduled.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.scheduleReport')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { value: '12', label: t('scheduled.kpi.activeSchedules') },
          { value: '156', label: t('scheduled.kpi.reportsSent') },
          { value: '98.7%', label: t('scheduled.kpi.deliverySuccessRate') },
          { value: '8', label: t('scheduled.kpi.recipients') },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { iconBg: '#10B98120', iconColor: '#10B981', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: t('scheduled.types.dailySummary'), desc: t('scheduled.types.dailySummaryDesc') },
          { iconBg: '#3B82F620', iconColor: '#3B82F6', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, title: t('scheduled.types.weeklyOperations'), desc: t('scheduled.types.weeklyOperationsDesc') },
          { iconBg: '#8B5CF620', iconColor: '#8B5CF6', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: t('scheduled.types.monthlyFinancial'), desc: t('scheduled.types.monthlyFinancialDesc') },
          { iconBg: '#F5C86920', iconColor: '#D4A84A', icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>, title: t('scheduled.types.customSchedule'), desc: t('scheduled.types.customScheduleDesc') },
        ].map((card) => (
          <div key={card.title} style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', cursor: 'pointer' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', background: card.iconBg, color: card.iconColor }}>{card.icon}</div>
            <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{card.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('scheduled.activeSchedules.title')}</h3>
          <span className="badge badge-success">12 {tc('status.active')}</span>
        </div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              {[t('scheduledReports.columns.report'), t('scheduledReports.columns.frequency'), t('scheduledReports.columns.recipients'), t('scheduledReports.columns.nextRun'), tc('table.status'), tc('table.actions')].map((h) => (
                <th key={h} style={{ padding: '1rem 0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--color-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                iconBg: '#10B98120', iconColor: '#10B981',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                name: 'Daily Revenue Summary', type: 'Financial Report',
                freqIcon: <ClockIcon />, freq: 'Daily at 6:00 AM',
                recipients: ['management@jetx.com'], more: null,
                date: 'Tomorrow', time: '6:00 AM',
              },
              {
                iconBg: '#3B82F620', iconColor: '#3B82F6',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                name: 'Weekly Operations Report', type: 'Operations Report',
                freqIcon: <CalendarIcon />, freq: 'Every Monday 8:00 AM',
                recipients: ['ops-team@jetx.com'], more: null,
                date: 'Dec 9, 2024', time: '8:00 AM',
              },
              {
                iconBg: '#10B98120', iconColor: '#10B981',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                name: 'Monthly Revenue Report', type: 'Financial Report',
                freqIcon: <CalendarIcon />, freq: '1st of month 9:00 AM',
                recipients: ['finance@jetx.com'], more: '+2',
                date: 'Jan 1, 2025', time: '9:00 AM',
              },
              {
                iconBg: '#8B5CF620', iconColor: '#8B5CF6',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                name: 'Customer Churn Alert', type: 'Customer Report',
                freqIcon: <CalendarIcon />, freq: 'Every Friday 5:00 PM',
                recipients: ['marketing@jetx.com'], more: null,
                date: 'Dec 13, 2024', time: '5:00 PM',
              },
              {
                iconBg: '#F5C86920', iconColor: '#D4A84A',
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
                name: 'Campaign Performance', type: 'Marketing Report',
                freqIcon: <CalendarIcon />, freq: 'Bi-weekly Monday 9:00 AM',
                recipients: ['marketing@jetx.com'], more: null,
                date: 'Dec 16, 2024', time: '9:00 AM',
              },
            ].map((row) => (
              <tr key={row.name}>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: row.iconBg, color: row.iconColor, flexShrink: 0 }}>{row.icon}</div>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '0.15rem' }}>{row.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.type}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.65rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                    {row.freqIcon}
                    {row.freq}
                  </div>
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {row.recipients.map((r) => (
                      <span key={r} style={{ padding: '0.25rem 0.5rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{r}</span>
                    ))}
                    {row.more && (
                      <span style={{ padding: '0.25rem 0.5rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>{row.more}</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <span style={{ fontWeight: 500 }}>{row.date}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.time}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ position: 'relative', width: '44px', height: '24px', background: 'var(--color-success)', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ position: 'absolute', top: '2px', left: '22px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'inline-block' }}></span>
                  </div>
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button title={tc('actions.edit')} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><EditIcon /></button>
                    <button title={t('scheduled.actions.runNow')} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayIcon /></button>
                    <button title={tc('actions.delete')} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrashIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>{t('scheduled.deliveryHistory.title')}</h3>
          <Link href="#" className="link-primary">{tc('actions.viewAll')}</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { status: 'success', name: 'Daily Revenue Summary', meta: 'Sent to management@jetx.com', time: 'Today 6:00 AM', failed: false },
            { status: 'success', name: 'Daily Revenue Summary', meta: 'Sent to management@jetx.com', time: 'Yesterday 6:00 AM', failed: false },
            { status: 'success', name: 'Customer Churn Alert', meta: 'Sent to marketing@jetx.com', time: 'Dec 6, 5:00 PM', failed: false },
            { status: 'failed', name: 'Weekly Operations Report', meta: 'Failed - SMTP connection error', time: 'Dec 2, 8:00 AM', failed: true },
            { status: 'success', name: 'Monthly Revenue Report', meta: 'Sent to finance@jetx.com +2', time: 'Dec 1, 9:00 AM', failed: false },
          ].map((item, i) => {
            const dotColor: Record<string, string> = { success: 'var(--color-success)', failed: 'var(--color-primary)', pending: 'var(--color-warning)' };
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor[item.status], flexShrink: 0, display: 'inline-block' }}></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.meta}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.time}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.failed
                    ? <button className="btn btn-sm btn-primary">{tc('actions.retry')}</button>
                    : (
                      <>
                        <button className="btn btn-sm">{tc('actions.view')}</button>
                        <button className="btn btn-sm">{tc('actions.download')}</button>
                      </>
                    )
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
