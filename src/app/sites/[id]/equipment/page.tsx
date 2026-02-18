import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteEquipmentPage() {
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
          {t('breadcrumb.equipment')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street - Equipment</h1>
            <p className="page-subtitle">8 machines &middot; CleanWash Corp</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('equipment.runDiagnostics')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('equipment.addEquipment')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('equipment.kpi.totalEquipment')}</div>
          <div className="kpi-value">8</div>
          <div className="kpi-sublabel">4 bays, 2 vacuums, 2 others</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('equipment.kpi.online')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-change positive">75% uptime</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('equipment.kpi.needsAttention')}</div>
          <div className="kpi-value">1</div>
          <div className="kpi-change warning">Low soap level</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('equipment.kpi.offline')}</div>
          <div className="kpi-value">1</div>
          <div className="kpi-change negative">Motor issue</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('equipment.sections.washBays')}</div>
          <span className="badge badge-info">4 Units</span>
        </div>
        <div className="equipment-detail-grid">
          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Bay 1 - Automatic Tunnel</h4>
                <span className="badge badge-success">{tc('status.online')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">45 washes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$1,125</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.avgTime')}</span>
                  <span className="stat-value">8 min</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waterPressure')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '85%'}}></div></div>
                  <span className="sensor-value">85 PSI</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.soapLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '72%'}}></div></div>
                  <span className="sensor-value">72%</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waxLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '65%'}}></div></div>
                  <span className="sensor-value">65%</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.brushWear')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '40%'}}></div></div>
                  <span className="sensor-value">40%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Pro 3000</span>
                <span>Serial: JP3K-2023-0451</span>
                <span>Installed: Mar 2023</span>
              </div>
            </div>
          </div>

          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Bay 2 - Automatic Tunnel</h4>
                <span className="badge badge-success">{tc('status.online')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">38 washes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$950</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.avgTime')}</span>
                  <span className="stat-value">8 min</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waterPressure')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '82%'}}></div></div>
                  <span className="sensor-value">82 PSI</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.soapLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '88%'}}></div></div>
                  <span className="sensor-value">88%</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waxLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '71%'}}></div></div>
                  <span className="sensor-value">71%</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.brushWear')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '35%'}}></div></div>
                  <span className="sensor-value">35%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Pro 3000</span>
                <span>Serial: JP3K-2023-0452</span>
                <span>Installed: Mar 2023</span>
              </div>
            </div>
          </div>

          <div className="equipment-detail-card warning">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Bay 3 - Self Service</h4>
                <span className="badge badge-warning">{t('equipment.badges.lowSoap')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="alert alert-warning">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {t('equipment.alerts.soapLowRefill')}
              </div>
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">22 washes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$330</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.avgTime')}</span>
                  <span className="stat-value">12 min</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waterPressure')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '78%'}}></div></div>
                  <span className="sensor-value">78 PSI</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.soapLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill critical" style={{width: '15%'}}></div></div>
                  <span className="sensor-value critical">15%</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waxLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '55%'}}></div></div>
                  <span className="sensor-value">55%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Self 1000</span>
                <span>Serial: JS1K-2022-0891</span>
                <span>Installed: Nov 2022</span>
              </div>
            </div>
          </div>

          <div className="equipment-detail-card offline">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Bay 4 - Self Service</h4>
                <span className="badge badge-error">{tc('status.offline')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="alert alert-error">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t('equipment.alerts.motorFailure')}
              </div>
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.offlineSince')}</span>
                  <span className="stat-value">2 hours ago</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.lastWash')}</span>
                  <span className="stat-value">10:34 AM</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.estRepair')}</span>
                  <span className="stat-value">Tomorrow</span>
                </div>
              </div>
              <div className="equipment-action-row">
                <a href="/tickets/1234" className="btn btn-sm btn-secondary">View Ticket #1234</a>
                <button className="btn btn-sm btn-primary">{t('equipment.actions.requestUrgentRepair')}</button>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Self 1000</span>
                <span>Serial: JS1K-2022-0892</span>
                <span>Installed: Nov 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('equipment.sections.vacuumStations')}</div>
          <span className="badge badge-info">2 Units</span>
        </div>
        <div className="equipment-detail-grid">
          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Vacuum Station 1</h4>
                <span className="badge badge-success">{tc('status.online')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">67 uses</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$134</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.avgDuration')}</span>
                  <span className="stat-value">4 min</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.motorStatus')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '100%'}}></div></div>
                  <span className="sensor-value">OK</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.filterStatus')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '60%'}}></div></div>
                  <span className="sensor-value">60%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Vac 500</span>
                <span>Serial: JV5-2023-0123</span>
              </div>
            </div>
          </div>

          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Vacuum Station 2</h4>
                <span className="badge badge-success">{tc('status.online')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">54 uses</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$108</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.avgDuration')}</span>
                  <span className="stat-value">5 min</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.motorStatus')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '100%'}}></div></div>
                  <span className="sensor-value">OK</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.filterStatus')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '75%'}}></div></div>
                  <span className="sensor-value">75%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Vac 500</span>
                <span>Serial: JV5-2023-0124</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('equipment.sections.otherEquipment')}</div>
          <span className="badge badge-info">2 Units</span>
        </div>
        <div className="equipment-detail-grid">
          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Water Tank</h4>
                <span className="badge badge-success">{t('equipment.badges.normal')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.waterLevel')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '85%'}}></div></div>
                  <span className="sensor-value">8,500L / 10,000L</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.temperature')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '50%'}}></div></div>
                  <span className="sensor-value">22&deg;C</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.pumpPressure')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '70%'}}></div></div>
                  <span className="sensor-value">Normal</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Capacity: 10,000L</span>
                <span>Last Refill: 2 days ago</span>
              </div>
            </div>
          </div>

          <div className="equipment-detail-card online">
            <div className="equipment-detail-header">
              <div className="equipment-detail-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="equipment-detail-title">
                <h4>Payment Terminal</h4>
                <span className="badge badge-success">{tc('status.connected')}</span>
              </div>
              <button className="btn btn-icon btn-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="equipment-detail-body">
              <div className="equipment-stats-row">
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.today')}</span>
                  <span className="stat-value">156 txns</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.revenue')}</span>
                  <span className="stat-value">$2,647</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t('equipment.stats.successRate')}</span>
                  <span className="stat-value">99.4%</span>
                </div>
              </div>
              <div className="equipment-sensors">
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.connection')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '100%'}}></div></div>
                  <span className="sensor-value">Stable</span>
                </div>
                <div className="sensor-row">
                  <span className="sensor-label">{t('equipment.sensors.receiptPaper')}</span>
                  <div className="sensor-bar"><div className="sensor-fill good" style={{width: '45%'}}></div></div>
                  <span className="sensor-value">45%</span>
                </div>
              </div>
              <div className="equipment-meta">
                <span>Model: JetX Pay Pro</span>
                <span>Serial: JPP-2023-0089</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
