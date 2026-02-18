import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function HardwareAlertsPage() {
  const t = await getTranslations('hardware');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.allMachines'), href: '/hardware' },
    { label: t('tabs.alerts'), href: '/hardware/alerts' },
    { label: t('tabs.mapView'), href: '/hardware/map' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.technical')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/hardware">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.alerts')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('allEquipment.title')}</h1>
            <p className="page-subtitle">{t('allEquipment.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {t('alerts.acknowledgeAll')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="kpi-grid">
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="kpi-label">{tc('priority.critical')}</div>
          <div className="kpi-value">1</div>
          <div className="kpi-trend">{t('alerts.kpi.requiresImmediateAction')}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div className="kpi-label">{t('alerts.kpi.warnings')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-trend">{t('alerts.kpi.attentionNeeded')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('alerts.kpi.acknowledged')}</div>
          <div className="kpi-value">4</div>
          <div className="kpi-trend">{t('alerts.kpi.beingHandled')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('alerts.kpi.resolvedToday')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend trend-up">+3 from yesterday</div>
        </div>
      </div>

      <div className="card">
        <div className="filters-row">
          <div className="filter-group">
            <label>{t('alerts.filters.severity')}</label>
            <select>
              <option value="">{t('alerts.filters.allSeverity')}</option>
              <option value="critical">{tc('priority.critical')}</option>
              <option value="warning">{t('alerts.filters.warning')}</option>
              <option value="info">{t('alerts.filters.info')}</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{tc('table.status')}</label>
            <select>
              <option value="">{tc('filters.allStatus')}</option>
              <option value="active">{tc('status.active')}</option>
              <option value="acknowledged">{t('alerts.kpi.acknowledged')}</option>
              <option value="resolved">{tc('status.resolved')}</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{t('table.site')}</label>
            <select>
              <option value="">{tc('filters.allSites')}</option>
              <option>JetX Xinyi Station</option>
              <option>Highway Station</option>
              <option>Airport Express</option>
            </select>
          </div>
          <div className="filter-group">
            <label>{tc('filters.dateRange')}</label>
            <select>
              <option value="24h">{t('alerts.filters.last24Hours')}</option>
              <option value="7d">{tc('filters.last7Days')}</option>
              <option value="30d">{tc('filters.last30Days')}</option>
            </select>
          </div>
          <button className="btn btn-secondary">{tc('actions.apply')} {tc('actions.filter')}</button>
        </div>
      </div>

      <div className="alerts-section">
        <h3 className="section-title">{t('alerts.activeAlerts')}</h3>

        <div className="alert-card-detailed critical">
          <div className="alert-severity">
            <span className="severity-badge critical">CRITICAL</span>
          </div>
          <div className="alert-main">
            <div className="alert-header">
              <div className="alert-title">Machine Offline - Communication Lost</div>
              <div className="alert-time">2 hours ago</div>
            </div>
            <div className="alert-machine">
              <span className="machine-id">A5-008</span>
              <span className="machine-location">Highway Station</span>
              <span className="machine-type badge-pill badge-secondary">A5 Automatic</span>
            </div>
            <div className="alert-description">
              No heartbeat received for 2 hours. Last known status: Online, running wash cycle #4521. Possible causes: Network failure, power outage, hardware malfunction.
            </div>
            <div className="alert-impact">
              <div className="impact-item">
                <span className="impact-label">{t('alerts.impact.estimatedRevenueLoss')}:</span>
                <span className="impact-value text-danger">$150/hour ($300 total)</span>
              </div>
              <div className="impact-item">
                <span className="impact-label">{t('alerts.impact.affectedCustomers')}:</span>
                <span className="impact-value">~45 (based on avg traffic)</span>
              </div>
            </div>
            <div className="alert-actions">
              <button className="btn btn-primary">{t('actions.createTicket')}</button>
              <button className="btn btn-secondary">{t('actions.acknowledge')}</button>
              <button className="btn btn-secondary">{t('actions.viewMachine')}</button>
              <button className="btn btn-secondary">{t('alerts.actions.viewCctv')}</button>
            </div>
          </div>
        </div>

        <div className="alert-card-detailed warning">
          <div className="alert-severity">
            <span className="severity-badge warning">WARNING</span>
          </div>
          <div className="alert-main">
            <div className="alert-header">
              <div className="alert-title">Low Water Pressure</div>
              <div className="alert-time">45 minutes ago</div>
            </div>
            <div className="alert-machine">
              <span className="machine-id">A0-015</span>
              <span className="machine-location">Airport Express</span>
              <span className="machine-type badge-pill badge-secondary">A0 Self-Service</span>
            </div>
            <div className="alert-description">
              Water pressure reading below threshold (45 PSI, minimum: 50 PSI). Machine still operational but wash quality may be affected.
            </div>
            <div className="alert-actions">
              <button className="btn btn-sm btn-secondary">{t('actions.createTicket')}</button>
              <button className="btn btn-sm btn-secondary">{t('actions.acknowledge')}</button>
              <button className="btn btn-sm btn-secondary">{t('actions.viewMachine')}</button>
            </div>
          </div>
        </div>

        <div className="alert-card-detailed warning">
          <div className="alert-severity">
            <span className="severity-badge warning">WARNING</span>
          </div>
          <div className="alert-main">
            <div className="alert-header">
              <div className="alert-title">Soap Dispenser Low</div>
              <div className="alert-time">1 hour ago</div>
            </div>
            <div className="alert-machine">
              <span className="machine-id">A7-003</span>
              <span className="machine-location">Downtown Plaza</span>
              <span className="machine-type badge-pill badge-secondary">A7 Premium</span>
            </div>
            <div className="alert-description">
              Soap reservoir at 15% capacity. Estimated 20-25 washes remaining before empty.
            </div>
            <div className="alert-actions">
              <button className="btn btn-sm btn-secondary">{t('actions.createTicket')}</button>
              <button className="btn btn-sm btn-secondary">{t('actions.acknowledge')}</button>
              <button className="btn btn-sm btn-secondary">{t('actions.viewMachine')}</button>
            </div>
          </div>
        </div>

        <div className="alert-card-detailed warning acknowledged">
          <div className="alert-severity">
            <span className="severity-badge warning">WARNING</span>
            <span className="badge-pill badge-info">{t('alerts.kpi.acknowledged')}</span>
          </div>
          <div className="alert-main">
            <div className="alert-header">
              <div className="alert-title">Maintenance Due</div>
              <div className="alert-time">3 hours ago</div>
            </div>
            <div className="alert-machine">
              <span className="machine-id">A5-012</span>
              <span className="machine-location">JetX Daan Station</span>
              <span className="machine-type badge-pill badge-secondary">A5 Automatic</span>
            </div>
            <div className="alert-description">
              Scheduled maintenance overdue by 3 days. Last maintenance: Nov 25, 2025. Brush replacement recommended.
            </div>
            <div className="alert-assigned">
              <span className="text-muted">{t('alerts.acknowledgedBy')}</span>
              <span className="user-avatar-sm">TT</span>
              <span>Tech Team</span>
              <span className="text-muted">• Ticket #4532 created</span>
            </div>
            <div className="alert-actions">
              <button className="btn btn-sm btn-secondary">{t('alerts.actions.viewTicket')}</button>
              <button className="btn btn-sm btn-secondary">{t('actions.viewMachine')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('alerts.recentlyResolved.title')}</h3>
          <div className="card-actions">
            <select className="form-select-sm">
              <option>{tc('time.today')}</option>
              <option>{tc('filters.last7Days')}</option>
              <option>{tc('filters.last30Days')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('alerts.recentlyResolved.columns.alert')}</th>
                <th>{t('table.machineId')}</th>
                <th>{t('table.site')}</th>
                <th>{t('alerts.recentlyResolved.columns.duration')}</th>
                <th>{t('alerts.recentlyResolved.columns.resolvedBy')}</th>
                <th>{t('alerts.recentlyResolved.columns.time')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cell-primary">Payment Terminal Error</div>
                  <div className="cell-secondary">Card reader unresponsive</div>
                </td>
                <td>A0-008</td>
                <td>JetX Xinyi Station</td>
                <td>45 min</td>
                <td>
                  <span className="user-avatar-sm">LW</span>
                  Lisa Wang
                </td>
                <td>Today, 2:30 PM</td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Door Sensor Fault</div>
                  <div className="cell-secondary">Entry door not detecting</div>
                </td>
                <td>A5-002</td>
                <td>Main Street</td>
                <td>2 hours</td>
                <td>
                  <span className="user-avatar-sm">TT</span>
                  Tech Team
                </td>
                <td>Today, 11:15 AM</td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Network Timeout</div>
                  <div className="cell-secondary">Intermittent connectivity</div>
                </td>
                <td>A7-001</td>
                <td>Downtown Plaza</td>
                <td>15 min</td>
                <td>
                  <span className="user-avatar-sm">--</span>
                  {t('alerts.recentlyResolved.autoResolved')}
                </td>
                <td>Today, 9:45 AM</td>
              </tr>
              <tr>
                <td>
                  <div className="cell-primary">Wax Dispenser Empty</div>
                  <div className="cell-secondary">Refill required</div>
                </td>
                <td>A5-005</td>
                <td>Airport Express</td>
                <td>1 hour</td>
                <td>
                  <span className="user-avatar-sm">MC</span>
                  Michael Chen
                </td>
                <td>Today, 8:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="btn btn-sm" disabled>{tc('actions.previous')}</button>
          <span className="pagination-info">{tc('pagination.page')} 1 {tc('pagination.of')} 3</span>
          <button className="btn btn-sm">{tc('actions.next')}</button>
        </div>
      </div>

      <style>{`
        .alerts-section {
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .alert-card-detailed {
          display: flex;
          gap: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1rem;
          border-left: 4px solid transparent;
        }
        .alert-card-detailed.critical {
          border-left-color: var(--danger);
          background: rgba(239, 68, 68, 0.05);
        }
        .alert-card-detailed.warning {
          border-left-color: var(--warning);
        }
        .alert-card-detailed.acknowledged {
          opacity: 0.8;
        }
        .alert-severity {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 100px;
        }
        .severity-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          text-align: center;
        }
        .severity-badge.critical {
          background: var(--danger);
          color: white;
        }
        .severity-badge.warning {
          background: var(--warning);
          color: #000;
        }
        .alert-main {
          flex: 1;
        }
        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .alert-title {
          font-weight: 600;
          font-size: 1rem;
        }
        .alert-time {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .alert-machine {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .machine-id {
          font-weight: 600;
          font-family: monospace;
          background: var(--bg-tertiary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .machine-location {
          color: var(--text-secondary);
        }
        .alert-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .alert-impact {
          display: flex;
          gap: 2rem;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border-radius: 6px;
          margin-bottom: 0.75rem;
        }
        .impact-item {
          font-size: 0.8rem;
        }
        .impact-label {
          color: var(--text-muted);
          margin-right: 0.25rem;
        }
        .impact-value {
          font-weight: 500;
        }
        .text-danger {
          color: var(--danger);
        }
        .alert-assigned {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
          padding: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
        }
        .user-avatar-sm {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .alert-actions {
          display: flex;
          gap: 0.5rem;
        }
        .text-muted {
          color: var(--text-muted);
        }
      `}</style>
    </DashboardLayout>
  );
}
