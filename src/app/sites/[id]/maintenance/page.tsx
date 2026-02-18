import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteMaintenancePage() {
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
          {t('breadcrumb.maintenance')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street - Maintenance</h1>
            <p className="page-subtitle">2 open tickets &middot; 1 scheduled maintenance</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('maintenance.scheduleMaintenance')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('maintenance.createTicket')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('maintenance.kpi.openTickets')}</div>
          <div className="kpi-value">2</div>
          <div className="kpi-change warning">1 high priority</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('maintenance.kpi.avgResolutionTime')}</div>
          <div className="kpi-value">4.2h</div>
          <div className="kpi-change positive">-15% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('maintenance.kpi.uptime30Days')}</div>
          <div className="kpi-value">98.5%</div>
          <div className="kpi-change positive">Above target</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('maintenance.kpi.nextScheduled')}</div>
          <div className="kpi-value">Dec 15</div>
          <div className="kpi-change neutral">Routine checkup</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('maintenance.cards.openIssues')}</div>
          <span className="badge badge-warning">2 {t('maintenance.badges.active')}</span>
        </div>
        <div className="issue-list">
          <div className="issue-card high">
            <div className="issue-priority">
              <span className="priority-badge high">{tc('priority.high')}</span>
            </div>
            <div className="issue-content">
              <div className="issue-header">
                <h4>Bay 4 - Motor Failure</h4>
                <span className="issue-id">#TKT-1234</span>
              </div>
              <p className="issue-desc">Self-service bay motor stopped working. Error code E-42. Customer unable to complete wash cycle.</p>
              <div className="issue-meta">
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Opened 2 hours ago
                </span>
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Assigned: Tech Team
                </span>
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                  Bay 4 - Self Service
                </span>
              </div>
            </div>
            <div className="issue-actions">
              <button className="btn btn-sm btn-secondary">{t('maintenance.issues.viewDetails')}</button>
              <button className="btn btn-sm btn-primary">{t('maintenance.issues.updateStatus')}</button>
            </div>
          </div>

          <div className="issue-card medium">
            <div className="issue-priority">
              <span className="priority-badge medium">{tc('priority.medium')}</span>
            </div>
            <div className="issue-content">
              <div className="issue-header">
                <h4>Bay 3 - Low Soap Level Alert</h4>
                <span className="issue-id">#TKT-1235</span>
              </div>
              <p className="issue-desc">Soap dispenser level at 15%. Needs refill within next 24 hours to avoid service interruption.</p>
              <div className="issue-meta">
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Opened 5 hours ago
                </span>
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Assigned: Supplies Team
                </span>
                <span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                  Bay 3 - Self Service
                </span>
              </div>
            </div>
            <div className="issue-actions">
              <button className="btn btn-sm btn-secondary">{t('maintenance.issues.viewDetails')}</button>
              <button className="btn btn-sm btn-primary">{t('maintenance.issues.markResolved')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('maintenance.cards.scheduledMaintenance')}</div>
            <a href="#" className="card-link">{t('maintenance.schedule.viewCalendar')}</a>
          </div>
          <div className="card-body">
            <div className="schedule-list">
              <div className="schedule-item upcoming">
                <div className="schedule-date">
                  <span className="schedule-day">15</span>
                  <span className="schedule-month">Dec</span>
                </div>
                <div className="schedule-info">
                  <div className="schedule-title">Routine Equipment Checkup</div>
                  <div className="schedule-desc">Monthly inspection of all wash bays and vacuum stations</div>
                  <div className="schedule-meta">
                    <span>9:00 AM - 12:00 PM</span>
                    <span>Tech: John Chen</span>
                  </div>
                </div>
                <span className="badge badge-info">{tc('status.scheduled')}</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">
                  <span className="schedule-day">22</span>
                  <span className="schedule-month">Dec</span>
                </div>
                <div className="schedule-info">
                  <div className="schedule-title">Water Filter Replacement</div>
                  <div className="schedule-desc">Quarterly filter change for main water tank</div>
                  <div className="schedule-meta">
                    <span>10:00 AM - 11:00 AM</span>
                    <span>Tech: Mike Wang</span>
                  </div>
                </div>
                <span className="badge badge-secondary">{t('maintenance.schedule.planned')}</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">
                  <span className="schedule-day">05</span>
                  <span className="schedule-month">Jan</span>
                </div>
                <div className="schedule-info">
                  <div className="schedule-title">Brush System Maintenance</div>
                  <div className="schedule-desc">Inspection and replacement of worn brushes on Bay 1 &amp; 2</div>
                  <div className="schedule-meta">
                    <span>8:00 AM - 2:00 PM</span>
                    <span>Tech: TBD</span>
                  </div>
                </div>
                <span className="badge badge-secondary">{t('maintenance.schedule.planned')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('maintenance.cards.recentHistory')}</div>
            <a href="#" className="card-link">{t('maintenance.history.viewAll')}</a>
          </div>
          <div className="card-body">
            <div className="history-list">
              <div className="history-item">
                <div className="history-icon success">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="history-content">
                  <div className="history-title">Bay 2 brush replacement completed</div>
                  <div className="history-meta">Dec 5, 2024 &middot; Resolved in 3.5 hours</div>
                </div>
              </div>
              <div className="history-item">
                <div className="history-icon success">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="history-content">
                  <div className="history-title">Payment terminal firmware updated</div>
                  <div className="history-meta">Dec 3, 2024 &middot; Resolved in 45 min</div>
                </div>
              </div>
              <div className="history-item">
                <div className="history-icon success">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="history-content">
                  <div className="history-title">Vacuum Station 1 motor serviced</div>
                  <div className="history-meta">Nov 28, 2024 &middot; Resolved in 2 hours</div>
                </div>
              </div>
              <div className="history-item">
                <div className="history-icon success">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="history-content">
                  <div className="history-title">Monthly routine checkup completed</div>
                  <div className="history-meta">Nov 15, 2024 &middot; All systems OK</div>
                </div>
              </div>
              <div className="history-item">
                <div className="history-icon success">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="history-content">
                  <div className="history-title">Water pump pressure issue fixed</div>
                  <div className="history-meta">Nov 10, 2024 &middot; Resolved in 5 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('maintenance.cards.equipmentHealthOverview')}</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('maintenance.table.equipment')}</th>
              <th>{t('maintenance.table.status')}</th>
              <th>{t('maintenance.table.healthScore')}</th>
              <th>{t('maintenance.table.lastService')}</th>
              <th>{t('maintenance.table.nextService')}</th>
              <th>{t('maintenance.table.totalRuntime')}</th>
              <th>{t('maintenance.table.issues90d')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bay 1 - Automatic</strong></td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>
                <div className="health-score good">
                  <div className="health-bar" style={{width: '92%'}}></div>
                  <span>92%</span>
                </div>
              </td>
              <td>Dec 5, 2024</td>
              <td>Jan 5, 2025</td>
              <td>2,450 hours</td>
              <td>1</td>
            </tr>
            <tr>
              <td><strong>Bay 2 - Automatic</strong></td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>
                <div className="health-score good">
                  <div className="health-bar" style={{width: '88%'}}></div>
                  <span>88%</span>
                </div>
              </td>
              <td>Dec 5, 2024</td>
              <td>Jan 5, 2025</td>
              <td>2,380 hours</td>
              <td>2</td>
            </tr>
            <tr>
              <td><strong>Bay 3 - Self Service</strong></td>
              <td><span className="badge badge-warning">{tc('status.alert')}</span></td>
              <td>
                <div className="health-score warning">
                  <div className="health-bar" style={{width: '75%'}}></div>
                  <span>75%</span>
                </div>
              </td>
              <td>Nov 28, 2024</td>
              <td>Dec 28, 2024</td>
              <td>1,890 hours</td>
              <td>3</td>
            </tr>
            <tr>
              <td><strong>Bay 4 - Self Service</strong></td>
              <td><span className="badge badge-error">{tc('status.offline')}</span></td>
              <td>
                <div className="health-score critical">
                  <div className="health-bar" style={{width: '45%'}}></div>
                  <span>45%</span>
                </div>
              </td>
              <td>Nov 28, 2024</td>
              <td>Pending repair</td>
              <td>1,920 hours</td>
              <td>5</td>
            </tr>
            <tr>
              <td><strong>Vacuum Station 1</strong></td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>
                <div className="health-score good">
                  <div className="health-bar" style={{width: '95%'}}></div>
                  <span>95%</span>
                </div>
              </td>
              <td>Nov 28, 2024</td>
              <td>Feb 28, 2025</td>
              <td>1,200 hours</td>
              <td>0</td>
            </tr>
            <tr>
              <td><strong>Vacuum Station 2</strong></td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>
                <div className="health-score good">
                  <div className="health-bar" style={{width: '90%'}}></div>
                  <span>90%</span>
                </div>
              </td>
              <td>Nov 28, 2024</td>
              <td>Feb 28, 2025</td>
              <td>1,150 hours</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
