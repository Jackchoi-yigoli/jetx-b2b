import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function NotificationsPage() {
  const t = await getTranslations('marketing');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.campaigns'), href: '/marketing' },
    { label: t('tabs.promotions'), href: '/marketing/promotions' },
    { label: t('tabs.notifications'), href: '/marketing/notifications' },
    { label: t('tabs.analytics'), href: '/marketing/analytics' },
    { label: t('tabs.sites'), href: '/marketing/sites' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/marketing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.pushNotifications')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('notifications.pageTitle')}</h1>
            <p className="page-subtitle">{t('notifications.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('notifications.templates')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              {t('notifications.sendNotification')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('notifications.kpi.appUsers')}</div>
          <div className="kpi-value">48.2K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('notifications.kpi.newThisMonth', { count: '+2.4K' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('notifications.kpi.pushEnabled')}</div>
          <div className="kpi-value">38.6K</div>
          <div className="kpi-change neutral">{t('notifications.kpi.optInRate', { rate: '80%' })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('notifications.kpi.avgOpenRate')}</div>
          <div className="kpi-value">28.4%</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+3.2%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('notifications.kpi.conversions')}</div>
          <div className="kpi-value">4.8%</div>
          <div className="kpi-change positive">{t('notifications.kpi.ctrToAction')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <h3>{t('notifications.recent.cardTitle')}</h3>
          <div className="filter-group">
            <select className="form-select-sm">
              <option>{tc('filters.allTypes')}</option>
              <option>{t('notifications.types.promotional')}</option>
              <option>{t('notifications.types.transactional')}</option>
              <option>{t('notifications.types.reminder')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('notifications.recent.table.notification')}</th>
                <th>{tc('table.type')}</th>
                <th>{t('notifications.recent.table.audience')}</th>
                <th>{t('notifications.recent.table.delivered')}</th>
                <th>{t('notifications.recent.table.opened')}</th>
                <th>{t('notifications.recent.table.clicked')}</th>
                <th>{t('notifications.recent.table.sent')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="notif-preview">
                    <strong>Weekend is here! Free upgrade awaits</strong>
                    <span>Get a free upgrade to Premium wash this weekend only!</span>
                  </div>
                </td>
                <td><span className="badge badge-info">{t('notifications.types.promotional')}</span></td>
                <td>8 sites</td>
                <td>34,560</td>
                <td><span className="text-success">23%</span></td>
                <td><span className="text-success">8.2%</span></td>
                <td>Dec 7, 9:00 AM</td>
                <td>
                  <button className="btn btn-sm">{tc('actions.view')}</button>
                  <button className="btn btn-sm">{t('actions.clone')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="notif-preview">
                    <strong>Your points are expiring soon!</strong>
                    <span>You have 450 points expiring on Dec 31. Use them now!</span>
                  </div>
                </td>
                <td><span className="badge badge-warning">{t('notifications.types.reminder')}</span></td>
                <td>{t('notifications.recent.table.targeted')}</td>
                <td>2,340</td>
                <td><span className="text-success">45%</span></td>
                <td><span className="text-success">12.4%</span></td>
                <td>Dec 5, 2:00 PM</td>
                <td>
                  <button className="btn btn-sm">{tc('actions.view')}</button>
                  <button className="btn btn-sm">{t('actions.clone')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="notif-preview">
                    <strong>Holiday Special: 20% off this month</strong>
                    <span>Celebrate the holidays with 20% off all premium washes!</span>
                  </div>
                </td>
                <td><span className="badge badge-info">{t('notifications.types.promotional')}</span></td>
                <td>{t('notifications.recent.table.allUsers')}</td>
                <td>45,230</td>
                <td><span className="text-success">31%</span></td>
                <td><span className="text-success">9.8%</span></td>
                <td>Dec 1, 10:00 AM</td>
                <td>
                  <button className="btn btn-sm">{tc('actions.view')}</button>
                  <button className="btn btn-sm">{t('actions.clone')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="notif-preview">
                    <strong>Your wash is ready!</strong>
                    <span>Your car is clean and ready for pickup at Bay 3.</span>
                  </div>
                </td>
                <td><span className="badge badge-success">{t('notifications.types.transactional')}</span></td>
                <td>{t('notifications.recent.table.auto')}</td>
                <td>12,450</td>
                <td><span className="text-success">72%</span></td>
                <td><span className="text-muted">N/A</span></td>
                <td>{t('promoCodes.ongoing')}</td>
                <td>
                  <button className="btn btn-sm">{t('notifications.recent.table.settings')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="notif-preview">
                    <strong>Membership renewal reminder</strong>
                    <span>Your Premium membership expires in 3 days. Renew now!</span>
                  </div>
                </td>
                <td><span className="badge badge-warning">{t('notifications.types.reminder')}</span></td>
                <td>{t('notifications.recent.table.auto')}</td>
                <td>890</td>
                <td><span className="text-success">58%</span></td>
                <td><span className="text-success">22.1%</span></td>
                <td>{t('promoCodes.ongoing')}</td>
                <td>
                  <button className="btn btn-sm">{t('notifications.recent.table.settings')}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.scheduled.cardTitle')}</h3>
            <button className="btn btn-sm">{t('notifications.scheduled.schedule')}</button>
          </div>
          <div className="scheduled-list">
            {[
              { date: 'Dec 14', time: '9:00 AM', title: 'Weekend Warrior Reminder', body: "Don't forget - free upgrade this weekend!" },
              { date: 'Dec 24', time: '8:00 AM', title: 'Christmas Eve Special', body: 'Last chance for holiday wash deals!' },
              { date: 'Jan 1', time: '12:00 AM', title: 'Happy New Year!', body: 'First wash of 2025 is on us!' },
            ].map((item) => (
              <div key={item.title} className="scheduled-item">
                <div className="scheduled-time">
                  <span className="time">{item.date}</span>
                  <span className="label">{item.time}</span>
                </div>
                <div className="scheduled-content">
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </div>
                <button className="btn btn-sm btn-text">{tc('actions.edit')}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('notifications.triggers.cardTitle')}</h3>
            <button className="btn btn-sm">{t('notifications.triggers.addTrigger')}</button>
          </div>
          <div className="trigger-list">
            {[
              { title: 'Wash Complete', body: 'Notify when car is ready for pickup', active: true },
              { title: 'Membership Expiring', body: '3 days before expiration', active: true },
              { title: 'Points Expiring', body: '7 days before expiration', active: true },
              { title: 'Birthday Greeting', body: "On customer's birthday", active: true },
              { title: 'Win-back Campaign', body: '30 days inactive', active: false },
            ].map((trigger) => (
              <div key={trigger.title} className="trigger-item">
                <div className={`trigger-icon ${trigger.active ? 'active' : 'inactive'}`}>
                  {trigger.active ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                </div>
                <div className="trigger-content">
                  <strong>{trigger.title}</strong>
                  <span>{trigger.body}</span>
                </div>
                <span className={`badge ${trigger.active ? 'badge-success' : 'badge-muted'}`}>{trigger.active ? tc('status.active') : tc('status.inactive')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('notifications.bestSendTimes.cardTitle')}</h3>
          <p className="card-description">{t('notifications.bestSendTimes.cardDesc')}</p>
        </div>
        <div className="time-heatmap">
          {[
            { day: tc('days.monday').slice(0, 3), cells: ['low', 'medium', 'high', 'medium', 'high', 'medium'] },
            { day: tc('days.tuesday').slice(0, 3), cells: ['low', 'high', 'medium', 'medium', 'high', 'low'] },
            { day: tc('days.wednesday').slice(0, 3), cells: ['low', 'medium', 'high', 'medium', 'high', 'medium'] },
            { day: tc('days.thursday').slice(0, 3), cells: ['low', 'high', 'medium', 'low', 'high', 'medium'] },
            { day: tc('days.friday').slice(0, 3), cells: ['medium', 'high', 'medium', 'medium', 'highest', 'high'] },
            { day: tc('days.saturday').slice(0, 3), cells: ['medium', 'highest', 'high', 'medium', 'medium', 'low'] },
            { day: tc('days.sunday').slice(0, 3), cells: ['low', 'high', 'highest', 'high', 'medium', 'low'] },
          ].map((row) => (
            <div key={row.day} className="heatmap-row">
              <span className="heatmap-label">{row.day}</span>
              {row.cells.map((cls, i) => (
                <div key={i} className={`heatmap-cell ${cls}`}>{['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'][i]}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="heatmap-legend">
          <span className="legend-item"><span className="legend-color low"></span> &lt;15%</span>
          <span className="legend-item"><span className="legend-color medium"></span> 15-25%</span>
          <span className="legend-item"><span className="legend-color high"></span> 25-35%</span>
          <span className="legend-item"><span className="legend-color highest"></span> &gt;35%</span>
        </div>
      </div>

      <style>{`
        .notif-preview { display: flex; flex-direction: column; gap: 4px; max-width: 300px; }
        .notif-preview strong { font-size: 14px; color: #1e293b; }
        .notif-preview span { font-size: 12px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .scheduled-list { padding: 16px 24px; }
        .scheduled-item {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 0; border-bottom: 1px solid #f1f5f9;
        }
        .scheduled-item:last-child { border-bottom: none; }
        .scheduled-time { display: flex; flex-direction: column; align-items: center; min-width: 60px; }
        .scheduled-time .time { font-weight: 600; color: #E85D5D; font-size: 14px; }
        .scheduled-time .label { font-size: 11px; color: #64748b; }
        .scheduled-content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .scheduled-content strong { font-size: 14px; color: #1e293b; }
        .scheduled-content span { font-size: 12px; color: #64748b; }
        .trigger-list { padding: 16px 24px; }
        .trigger-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid #f1f5f9;
        }
        .trigger-item:last-child { border-bottom: none; }
        .trigger-icon {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .trigger-icon.active { background: #dcfce7; color: #22c55e; }
        .trigger-icon.inactive { background: #f1f5f9; color: #94a3b8; }
        .trigger-content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .trigger-content strong { font-size: 14px; color: #1e293b; }
        .trigger-content span { font-size: 12px; color: #64748b; }
        .time-heatmap { padding: 24px; }
        .heatmap-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .heatmap-label { width: 40px; font-size: 12px; font-weight: 500; color: #64748b; }
        .heatmap-cell {
          flex: 1; height: 36px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: #64748b;
        }
        .heatmap-cell.low { background: #f1f5f9; }
        .heatmap-cell.medium { background: #fef3c7; }
        .heatmap-cell.high { background: #fed7aa; }
        .heatmap-cell.highest { background: #fca5a5; }
        .heatmap-legend {
          display: flex; justify-content: center; gap: 24px;
          padding: 16px; border-top: 1px solid #f1f5f9;
        }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
        .legend-color { width: 16px; height: 16px; border-radius: 4px; }
        .legend-color.low { background: #f1f5f9; }
        .legend-color.medium { background: #fef3c7; }
        .legend-color.high { background: #fed7aa; }
        .legend-color.highest { background: #fca5a5; }
        .filter-group { display: flex; gap: 8px; }
        .form-select-sm {
          padding: 6px 28px 6px 12px; font-size: 13px;
          border: 1px solid #e2e8f0; border-radius: 6px;
          background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") no-repeat right 6px center;
          background-size: 14px; appearance: none;
        }
        .text-success { color: #22c55e; font-weight: 500; }
        .text-muted { color: #94a3b8; }
      `}</style>
    </DashboardLayout>
  );
}
