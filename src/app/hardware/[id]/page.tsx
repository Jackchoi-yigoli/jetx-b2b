import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function MachineDetailPage() {
  const t = await getTranslations('hardware');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.technical')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/hardware">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          WASH-001-A
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">WASH-001-A</h1>
            <p className="page-subtitle">Premium Tunnel Wash · Bay 1 · JetX Xinyi Station</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('detail.actions.remoteControl')}</button>
            <Link href="/tickets/create" className="btn btn-warning">{t('actions.createTicket')}</Link>
            <button className="btn btn-primary">{t('detail.actions.scheduleMaintenance')}</button>
          </div>
        </div>
      </div>

      <div className="status-banner status-active">
        <span className="status-indicator"></span>
        <span>{t('detail.status.onlineOperational')}</span>
        <span className="status-date">{t('detail.status.lastHeartbeat')}: 2 seconds ago</span>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.todaysWashes')}</div>
          <div className="kpi-value">47</div>
          <div className="kpi-trend trend-up">+8 vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.todaysRevenue')}</div>
          <div className="kpi-value">$1,175</div>
          <div className="kpi-trend trend-up">+12%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.uptime30Days')}</div>
          <div className="kpi-value">99.2%</div>
          <div className="kpi-trend">Target: 99%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.nextMaintenance')}</div>
          <div className="kpi-value">12 days</div>
          <div className="kpi-trend">Scheduled: Dec 19</div>
        </div>
      </div>

      <div className="tabs">
        <span className="tab active">{t('detail.tabs.overview')}</span>
        <span className="tab">{t('detail.tabs.diagnostics')}</span>
        <span className="tab">{t('detail.tabs.maintenance')}</span>
        <span className="tab">{t('detail.tabs.logs')}</span>
        <span className="tab">{t('detail.tabs.cctv')}</span>
        <span className="tab">{t('detail.tabs.settings')}</span>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.machineInfo.title')}</h3>
            <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.machineId')}</span>
              <span className="info-value">WASH-001-A</span>
            </div>
            <div className="info-row">
              <span className="info-label">{tc('table.type')}</span>
              <span className="info-value">Tunnel Wash</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.model')}</span>
              <span className="info-value">JetX Pro 5000</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.serialNumber')}</span>
              <span className="info-value">JP5K-2023-001234</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.installationDate')}</span>
              <span className="info-value">Jan 15, 2023</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.warrantyUntil')}</span>
              <span className="info-value">Jan 15, 2026</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.firmwareVersion')}</span>
              <span className="info-value">v3.2.1</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.machineInfo.totalWashCycles')}</span>
              <span className="info-value">24,567</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.sensors.title')}</h3>
            <span className="live-indicator">● LIVE</span>
          </div>
          <div className="sensor-grid">
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.waterTemp')}</div>
                <div className="sensor-value">42°C</div>
                <div className="sensor-status status-ok">{t('detail.sensors.normal')}</div>
              </div>
            </div>
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.waterPressure')}</div>
                <div className="sensor-value">45 PSI</div>
                <div className="sensor-status status-ok">{t('detail.sensors.normal')}</div>
              </div>
            </div>
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.soapLevel')}</div>
                <div className="sensor-value">72%</div>
                <div className="sensor-status status-ok">{t('detail.sensors.good')}</div>
              </div>
            </div>
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.waxLevel')}</div>
                <div className="sensor-value">35%</div>
                <div className="sensor-status status-warning">{t('detail.sensors.low')}</div>
              </div>
            </div>
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.powerDraw')}</div>
                <div className="sensor-value">18.5 kW</div>
                <div className="sensor-status status-ok">{t('detail.sensors.normal')}</div>
              </div>
            </div>
            <div className="sensor-card">
              <div className="sensor-info">
                <div className="sensor-label">{t('detail.sensors.motorRpm')}</div>
                <div className="sensor-value">1,450</div>
                <div className="sensor-status status-ok">{t('detail.sensors.normal')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.washStatus.title')}</h3>
          </div>
          <div className="wash-status">
            <div className="wash-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <div className="progress-label">65% {t('detail.washStatus.complete')}</div>
            </div>
            <div className="wash-details">
              <div className="wash-detail-row">
                <span>{t('detail.washStatus.currentStage')}:</span>
                <strong>Rinse Cycle</strong>
              </div>
              <div className="wash-detail-row">
                <span>{t('detail.washStatus.program')}:</span>
                <strong>Premium Wash</strong>
              </div>
              <div className="wash-detail-row">
                <span>{t('detail.washStatus.customer')}:</span>
                <strong>Member #45678</strong>
              </div>
              <div className="wash-detail-row">
                <span>{t('detail.washStatus.vehicle')}:</span>
                <strong>Tesla Model 3</strong>
              </div>
              <div className="wash-detail-row">
                <span>{t('detail.washStatus.estCompletion')}:</span>
                <strong>2 min 15 sec</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.todaysActivity.title')}</h3>
          </div>
          <div className="activity-stats">
            <div className="activity-stat">
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '45%' }}></div>
              </div>
              <div className="stat-label">Basic Wash</div>
              <div className="stat-value">12</div>
            </div>
            <div className="activity-stat">
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '35%' }}></div>
              </div>
              <div className="stat-label">Premium Wash</div>
              <div className="stat-value">18</div>
            </div>
            <div className="activity-stat">
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '20%' }}></div>
              </div>
              <div className="stat-label">Ultimate Wash</div>
              <div className="stat-value">17</div>
            </div>
          </div>
          <div className="hourly-chart">
            <div className="chart-title">{t('detail.todaysActivity.hourlyDistribution')}</div>
            <div className="mini-bars">
              <div className="mini-bar" style={{ height: '20%' }}><span>6</span></div>
              <div className="mini-bar" style={{ height: '35%' }}><span>7</span></div>
              <div className="mini-bar" style={{ height: '60%' }}><span>8</span></div>
              <div className="mini-bar" style={{ height: '80%' }}><span>9</span></div>
              <div className="mini-bar" style={{ height: '70%' }}><span>10</span></div>
              <div className="mini-bar" style={{ height: '55%' }}><span>11</span></div>
              <div className="mini-bar highlight" style={{ height: '90%' }}><span>12</span></div>
              <div className="mini-bar" style={{ height: '45%' }}><span>1</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('detail.recentTransactions.title')}</h3>
          <Link href="/transactions?machine=WASH-001-A" className="btn btn-sm btn-secondary">{tc('actions.viewAll')}</Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('detail.recentTransactions.columns.time')}</th>
                <th>{t('detail.recentTransactions.columns.transactionId')}</th>
                <th>{t('detail.recentTransactions.columns.customer')}</th>
                <th>{t('detail.recentTransactions.columns.program')}</th>
                <th>{tc('table.amount')}</th>
                <th>{tc('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12:34 PM</td>
                <td>TXN-789456</td>
                <td>Member #45678</td>
                <td>Premium Wash</td>
                <td>$25.00</td>
                <td><span className="badge-pill badge-info">{tc('status.inProgress')}</span></td>
              </tr>
              <tr>
                <td>12:21 PM</td>
                <td>TXN-789455</td>
                <td>Guest</td>
                <td>Basic Wash</td>
                <td>$15.00</td>
                <td><span className="badge-pill badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr>
                <td>12:08 PM</td>
                <td>TXN-789454</td>
                <td>Member #12345</td>
                <td>Ultimate Wash</td>
                <td>$35.00</td>
                <td><span className="badge-pill badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr>
                <td>11:52 AM</td>
                <td>TXN-789453</td>
                <td>Member #67890</td>
                <td>Premium Wash</td>
                <td>$25.00</td>
                <td><span className="badge-pill badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr>
                <td>11:38 AM</td>
                <td>TXN-789452</td>
                <td>Guest</td>
                <td>Basic Wash</td>
                <td>$15.00</td>
                <td><span className="badge-pill badge-success">{tc('status.completed')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.maintenanceHistory.title')}</h3>
          </div>
          <div className="maintenance-list">
            <div className="maintenance-item">
              <div className="maintenance-date">Nov 25, 2024</div>
              <div className="maintenance-info">
                <div className="maintenance-title">{t('detail.maintenanceHistory.scheduledMaintenance')}</div>
                <div className="maintenance-desc">Brush replacement, filter cleaning, calibration</div>
              </div>
              <span className="badge-pill badge-success">{tc('status.completed')}</span>
            </div>
            <div className="maintenance-item">
              <div className="maintenance-date">Oct 15, 2024</div>
              <div className="maintenance-info">
                <div className="maintenance-title">{t('detail.maintenanceHistory.emergencyRepair')}</div>
                <div className="maintenance-desc">Water pump replacement</div>
              </div>
              <span className="badge-pill badge-success">{tc('status.completed')}</span>
            </div>
            <div className="maintenance-item">
              <div className="maintenance-date">Sep 28, 2024</div>
              <div className="maintenance-info">
                <div className="maintenance-title">{t('detail.maintenanceHistory.scheduledMaintenance')}</div>
                <div className="maintenance-desc">General inspection, software update</div>
              </div>
              <span className="badge-pill badge-success">{tc('status.completed')}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.activeAlerts.title')}</h3>
          </div>
          <div className="alert-list">
            <div className="alert-item alert-warning">
              <div className="alert-content">
                <div className="alert-title">{t('detail.activeAlerts.lowWaxLevel')}</div>
                <div className="alert-desc">Wax tank at 35% - refill recommended within 2 days</div>
                <div className="alert-time">Triggered 2 hours ago</div>
              </div>
              <button className="btn btn-sm btn-secondary">{t('actions.acknowledge')}</button>
            </div>
            <div className="alert-item alert-info">
              <div className="alert-content">
                <div className="alert-title">{t('detail.activeAlerts.firmwareUpdate')}</div>
                <div className="alert-desc">Version 3.2.2 is available with bug fixes</div>
                <div className="alert-time">1 day ago</div>
              </div>
              <button className="btn btn-sm btn-secondary">{t('detail.activeAlerts.updateButton')}</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
