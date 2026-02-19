import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { machines, tickets, operators, sites } from '@/lib/data';
import BarChart from '@/components/ui/BarChart';

// ─── Derived data from shared data layer ───

// Equipment health: count machines by status
const onlineMachineCount = machines.filter((m) => m.status === 'online').length;
const warningMachineCount = machines.filter((m) => m.status === 'alert' || m.status === 'maintenance').length;
const offlineMachineCount = machines.filter((m) => m.status === 'offline' || m.status === 'error').length;
const totalMachineCount = machines.length;
const equipmentOnlinePct =
  totalMachineCount > 0
    ? ((onlineMachineCount / totalMachineCount) * 100).toFixed(1)
    : '0.0';

// Critical/warning alerts across all machines
const allAlerts = machines.flatMap((m) =>
  m.alerts
    .filter((a) => a.status === 'active')
    .map((a) => ({ ...a, machineName: m.id.toUpperCase() }))
);
const criticalAlerts = allAlerts.filter((a) => a.severity === 'critical').slice(0, 2);
const warningAlerts = allAlerts.filter((a) => a.severity === 'warning').slice(0, 1);
const displayedAlerts = [...criticalAlerts, ...warningAlerts];

// Open tickets: all tickets with status open or in-progress
const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in-progress');
const openTicketCount = openTickets.length;
const criticalTicketCount = openTickets.filter((t) => t.priority === 'urgent').length;
const highTicketCount = openTickets.filter((t) => t.priority === 'high').length;
const mediumTicketCount = openTickets.filter((t) => t.priority === 'medium').length;
const lowTicketCount = openTickets.filter((t) => t.priority === 'low').length;
const topOpenTickets = openTickets.slice(0, 2);

// Operator performance: operators with their site counts
// NOTE: Revenue (MTD), uptime %, and change % are not available in the shared data layer — kept inline below
const operatorPerformance = operators.map((op, index) => ({
  rank: index + 1,
  name: op.name,
  siteCount: sites.filter((s) => s.operatorId === op.id).length,
}));

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">{t('breadcrumb')}</div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
          </div>
        </div>
      </div>

      <div className="welcome-banner">
        <div className="welcome-title">{t('greeting', { name: 'James' })}</div>
        <div className="welcome-subtitle">{t('subtitle')}</div>
      </div>

      <div className="kpi-grid mb-24">
        {/* NOTE: Region Revenue (MTD) and Total Downtime figures are not in the shared data layer */}
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.regionRevenue')}</div>
          <div className="kpi-value">$284,500</div>
          <div className="kpi-change positive">+18% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.equipmentOnline')}</div>
          <div className="kpi-value">{equipmentOnlinePct}%</div>
          <div className="kpi-change warning">
            {offlineMachineCount !== 1
              ? t('kpi.machinesOfflinePlural', { count: offlineMachineCount })
              : t('kpi.machinesOffline', { count: offlineMachineCount })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.openTickets')}</div>
          <div className="kpi-value">{openTicketCount}</div>
          <div className="kpi-change negative">{t('kpi.ticketsSummary', { critical: criticalTicketCount, high: highTicketCount })}</div>
        </div>
        {/* NOTE: Total Downtime (MTD) and change % are not in the shared data layer */}
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalDowntime')}</div>
          <div className="kpi-value">18.5h</div>
          <div className="kpi-change positive">-25% vs last month</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Revenue Trend */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.revenueTrend')}</div>
            <a href="/reports" className="card-link">{tc('actions.viewFullReport')}</a>
          </div>
          <div className="card-body">
            <BarChart bars={[
              { label: 'Jul', value: 198000 },
              { label: 'Aug', value: 215000 },
              { label: 'Sep', value: 228000 },
              { label: 'Oct', value: 245000 },
              { label: 'Nov', value: 262000 },
              { label: 'Dec', value: 284500 },
            ]} height={220} showValues />
          </div>
        </div>

        {/* Equipment Health */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.equipmentHealth')}</div>
            <a href="/hardware" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            <div className="health-summary">
              <div className="health-item">
                <div className="health-icon online"></div>
                <div className="health-details">
                  <div className="health-value">{onlineMachineCount}</div>
                  <div className="health-label">{t('health.online')}</div>
                </div>
              </div>
              <div className="health-item">
                <div className="health-icon warning"></div>
                <div className="health-details">
                  <div className="health-value">{warningMachineCount}</div>
                  <div className="health-label">{t('health.needsAttention')}</div>
                </div>
              </div>
              <div className="health-item">
                <div className="health-icon offline"></div>
                <div className="health-details">
                  <div className="health-value">{offlineMachineCount}</div>
                  <div className="health-label">{t('health.offline')}</div>
                </div>
              </div>
            </div>
            {displayedAlerts.map((alert) => {
              const site = sites.find((s) => s.id === alert.siteId);
              return (
                <div key={alert.id} className="alert-item" style={displayedAlerts.indexOf(alert) === 0 ? { marginTop: 16 } : undefined}>
                  <div className={`alert-icon ${alert.severity === 'critical' ? 'critical' : 'warning'}`}></div>
                  <div className="alert-content">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-meta">{site?.name ?? alert.siteId} &middot; {new Date(alert.triggeredAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Tickets */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.openTickets')}</div>
            <a href="/tickets" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            <div className="ticket-summary">
              <div className="ticket-priority-row">
                <span className="priority-badge critical">{tc('priority.critical')}</span>
                <span className="ticket-count">{criticalTicketCount}</span>
              </div>
              <div className="ticket-priority-row">
                <span className="priority-badge high">{tc('priority.high')}</span>
                <span className="ticket-count">{highTicketCount}</span>
              </div>
              <div className="ticket-priority-row">
                <span className="priority-badge medium">{tc('priority.medium')}</span>
                <span className="ticket-count">{mediumTicketCount}</span>
              </div>
              <div className="ticket-priority-row">
                <span className="priority-badge low">{tc('priority.low')}</span>
                <span className="ticket-count">{lowTicketCount}</span>
              </div>
            </div>
            {topOpenTickets.map((ticket, index) => {
              const site = sites.find((s) => s.id === ticket.siteId);
              const priorityLabel = ticket.priority === 'urgent' ? 'critical' : ticket.priority;
              const lastMessage = ticket.messages[ticket.messages.length - 1];
              const statusLabel = lastMessage?.author.role === 'Internal' ? 'In Progress' : ticket.status.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase());
              return (
                <div key={ticket.id} className="list-item" style={index === 0 ? { marginTop: 16 } : undefined}>
                  <div className="list-item-main">
                    <div className="list-item-title">#{ticket.id.toUpperCase()} {ticket.subject}</div>
                    <div className="list-item-subtitle">{site?.name ?? ticket.siteId} &middot; {statusLabel}</div>
                  </div>
                  <span className={`priority-badge ${priorityLabel}`}>{priorityLabel.charAt(0).toUpperCase() + priorityLabel.slice(1)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sites */}
        {/* NOTE: No "upcoming" or scheduled-launch status exists in the shared sites data — kept inline */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.upcomingSites')}</div>
            <a href="/sites" className="card-link">{t('cards.viewAllSites')}</a>
          </div>
          <div className="card-body">
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">Riverside Mall</div>
                <div className="list-item-subtitle">ABC Car Wash &middot; 2x A5, 4x A0</div>
              </div>
              <div className="list-item-value">
                <span className="badge-pill badge-info">Dec 15</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">Tech Park</div>
                <div className="list-item-subtitle">XYZ Wash &middot; 1x A5, 2x A0</div>
              </div>
              <div className="list-item-value">
                <span className="badge-pill badge-info">Dec 20</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">Central Station</div>
                <div className="list-item-subtitle">QuickClean &middot; 3x A0</div>
              </div>
              <div className="list-item-value">
                <span className="badge-pill badge-info">Jan 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operator Performance */}
        {/* NOTE: Revenue (MTD) and change % per operator are not available in the shared data layer — kept inline */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.operatorPerformance')}</div>
            <a href="/operators" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            {operatorPerformance.map((op, index) => {
              const revenueData = [
                { amount: '$98,400', change: '+22%', positive: true, uptime: '98%' },
                { amount: '$72,100', change: '+15%', positive: true, uptime: '97%' },
                { amount: '$54,200', change: '+8%', positive: true, uptime: '95%' },
                { amount: '$32,800', change: '-5%', positive: false, uptime: '92%' },
              ];
              const revenue = revenueData[index] ?? revenueData[revenueData.length - 1];
              return (
                <div key={op.name} className="list-item">
                  <div className="list-item-main">
                    <div className="list-item-title">{op.rank}. {op.name}</div>
                    <div className="list-item-subtitle">{op.siteCount} site{op.siteCount !== 1 ? 's' : ''} &middot; {revenue.uptime} uptime</div>
                  </div>
                  <div className="list-item-value">
                    <div className="list-item-amount">{revenue.amount}</div>
                    <div className={`kpi-change ${revenue.positive ? 'positive' : 'negative'}`}>{revenue.change}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {/* NOTE: This activity feed (ticket resolved, new site added, equipment alert) does not map to
            the shared activityLogs data, which tracks user audit events (login, settings changes, etc.) */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cards.recentActivity')}</div>
          </div>
          <div className="card-body">
            <div className="activity-item">
              <div className="activity-icon success">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">{t('activity.ticketResolved', { id: 'TK-1228' })}</div>
                <div className="activity-meta">ABC Car Wash &middot; 30 min ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon info">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">{t('activity.newSiteAdded', { name: 'Mall Location' })}</div>
                <div className="activity-meta">XYZ Wash &middot; 2 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon warning">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">{t('activity.equipmentAlert', { location: 'Highway Station' })}</div>
                <div className="activity-meta">{t('activity.autoTicketCreated')} &middot; 3 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon success">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">{t('activity.autoResetSuccess', { machine: 'A0-015' })}</div>
                <div className="activity-meta">Downtown Plaza &middot; 5 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
