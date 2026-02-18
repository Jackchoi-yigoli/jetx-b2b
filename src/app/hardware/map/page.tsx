import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function HardwareMapPage() {
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
          {t('tabs.mapView')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('allEquipment.title')}</h1>
            <p className="page-subtitle">{t('allEquipment.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.addUnit')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card map-controls-card">
        <div className="map-controls">
          <div className="map-filter-group">
            <label>{t('map.statusFilter')}</label>
            <div className="map-legend">
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-dot legend-dot-online"></span>
                {tc('status.online')} (118)
              </label>
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-dot legend-dot-alert"></span>
                {tc('status.alert')} (6)
              </label>
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-dot legend-dot-offline"></span>
                {tc('status.offline')} (3)
              </label>
            </div>
          </div>
          <div className="map-filter-group">
            <label>{t('map.machineType')}</label>
            <div className="map-legend">
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-badge legend-badge-a0">A0</span>
                {t('map.selfService')} (45)
              </label>
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-badge legend-badge-a5">A5</span>
                {t('map.automatic')} (62)
              </label>
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                <span className="legend-badge legend-badge-a7">A7</span>
                {t('map.premium')} (20)
              </label>
            </div>
          </div>
          <div className="map-filter-group">
            <label>{t('map.viewOptions')}</label>
            <div className="map-options">
              <label className="legend-item">
                <input type="checkbox" defaultChecked />
                {t('map.clusterMarkers')}
              </label>
              <label className="legend-item">
                <input type="checkbox" />
                {t('map.showLabels')}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="map-wrapper">
        <div className="map-container">
          <div className="map-placeholder-inner">
            <svg viewBox="0 0 800 600" className="map-svg">
              <rect fill="#1a1f2e" width="800" height="600" />
              <path
                d="M400,100 Q450,120 460,180 Q470,240 450,300 Q440,360 420,400 Q400,450 380,480 Q360,500 340,490 Q320,470 330,420 Q340,370 350,300 Q360,230 370,180 Q380,130 400,100"
                fill="#2d3548" stroke="#3d4558" strokeWidth="2"
              />
              <g transform="translate(410, 150)" style={{ cursor: 'pointer' }}>
                <circle r="25" fill="var(--primary)" opacity="0.3" />
                <circle r="18" fill="var(--primary)" />
                <text fill="white" textAnchor="middle" dy="5" fontSize="12" fontWeight="600">28</text>
              </g>
              <g transform="translate(385, 190)" style={{ cursor: 'pointer' }}>
                <circle r="8" fill="var(--success)" />
                <circle r="4" fill="white" />
              </g>
              <g transform="translate(370, 230)" style={{ cursor: 'pointer' }}>
                <circle r="8" fill="var(--success)" />
                <circle r="4" fill="white" />
              </g>
              <g transform="translate(380, 290)" style={{ cursor: 'pointer' }}>
                <circle r="22" fill="var(--primary)" opacity="0.3" />
                <circle r="15" fill="var(--primary)" />
                <text fill="white" textAnchor="middle" dy="4" fontSize="11" fontWeight="600">18</text>
              </g>
              <g transform="translate(365, 350)" style={{ cursor: 'pointer' }}>
                <circle r="8" fill="var(--warning)" />
                <circle r="4" fill="white" />
              </g>
              <g transform="translate(360, 400)" style={{ cursor: 'pointer' }}>
                <circle r="20" fill="var(--primary)" opacity="0.3" />
                <circle r="14" fill="var(--primary)" />
                <text fill="white" textAnchor="middle" dy="4" fontSize="10" fontWeight="600">12</text>
              </g>
              <g transform="translate(370, 450)" style={{ cursor: 'pointer' }}>
                <circle r="23" fill="var(--primary)" opacity="0.3" />
                <circle r="16" fill="var(--primary)" />
                <text fill="white" textAnchor="middle" dy="5" fontSize="11" fontWeight="600">22</text>
              </g>
              <g transform="translate(395, 260)" style={{ cursor: 'pointer' }}>
                <circle r="10" fill="var(--danger)" />
                <text fill="white" textAnchor="middle" dy="4" fontSize="10">!</text>
              </g>
              <g transform="translate(440, 280)" style={{ cursor: 'pointer' }}>
                <circle r="8" fill="var(--success)" />
                <circle r="4" fill="white" />
              </g>
              <g transform="translate(450, 320)" style={{ cursor: 'pointer' }}>
                <circle r="8" fill="var(--success)" />
                <circle r="4" fill="white" />
              </g>
            </svg>

            <div className="map-label" style={{ top: '22%', left: '54%' }}>Taipei</div>
            <div className="map-label" style={{ top: '30%', left: '50%' }}>Taoyuan</div>
            <div className="map-label" style={{ top: '46%', left: '50%' }}>Taichung</div>
            <div className="map-label" style={{ top: '65%', left: '48%' }}>Tainan</div>
            <div className="map-label" style={{ top: '74%', left: '49%' }}>Kaohsiung</div>
          </div>

          <div className="map-zoom-controls">
            <button className="zoom-btn">+</button>
            <button className="zoom-btn">-</button>
          </div>
        </div>

        <div className="map-sidebar">
          <div className="map-sidebar-header">
            <h3>{t('map.sites')}</h3>
            <span className="text-muted">45 {t('map.locations')}</span>
          </div>
          <div className="map-site-list">
            <div className="map-site-item map-site-item-active">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">JetX Xinyi Station</div>
                <div className="map-site-meta">8 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">8</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">JetX Daan Station</div>
                <div className="map-site-meta">6 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">6</span>
              </div>
            </div>
            <div className="map-site-item map-site-item-alert">
              <div className="map-site-status map-site-status-offline"></div>
              <div className="map-site-info">
                <div className="map-site-name">Highway Station</div>
                <div className="map-site-meta">4 machines · 1 offline</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-danger">1</span>
                <span className="badge-pill badge-success">3</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-alert"></div>
              <div className="map-site-info">
                <div className="map-site-name">Airport Express</div>
                <div className="map-site-meta">5 machines · 1 alert</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-warning">1</span>
                <span className="badge-pill badge-success">4</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">Downtown Plaza</div>
                <div className="map-site-meta">7 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">7</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">Taichung Central</div>
                <div className="map-site-meta">5 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">5</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">Kaohsiung Harbor</div>
                <div className="map-site-meta">6 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">6</span>
              </div>
            </div>
            <div className="map-site-item">
              <div className="map-site-status map-site-status-online"></div>
              <div className="map-site-info">
                <div className="map-site-name">Tainan Station</div>
                <div className="map-site-meta">4 machines · All online</div>
              </div>
              <div className="map-site-stats">
                <span className="badge-pill badge-success">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .map-controls-card {
          margin-bottom: 1rem;
        }
        .map-controls {
          display: flex;
          gap: 2rem;
          padding: 1rem;
        }
        .map-filter-group > label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .map-legend, .map-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .legend-item input {
          width: 14px;
          height: 14px;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .legend-dot-online { background: var(--success); }
        .legend-dot-alert { background: var(--warning); }
        .legend-dot-offline { background: var(--danger); }
        .legend-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 3px;
        }
        .legend-badge-a0 { background: #3B82F6; color: white; }
        .legend-badge-a5 { background: #8B5CF6; color: white; }
        .legend-badge-a7 { background: #F59E0B; color: white; }

        .map-wrapper {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1rem;
          height: calc(100vh - 320px);
          min-height: 500px;
        }
        .map-container {
          background: var(--bg-secondary);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .map-placeholder-inner {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .map-svg {
          width: 100%;
          height: 100%;
        }
        .map-label {
          position: absolute;
          font-size: 0.7rem;
          color: var(--text-muted);
          pointer-events: none;
        }
        .map-zoom-controls {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .zoom-btn {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 1.2rem;
          cursor: pointer;
        }
        .zoom-btn:hover {
          background: var(--bg-tertiary);
        }

        .map-sidebar {
          background: var(--bg-secondary);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .map-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .map-sidebar-header h3 {
          margin: 0;
          font-size: 1rem;
        }
        .map-site-list {
          flex: 1;
          overflow-y: auto;
        }
        .map-site-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-left: 3px solid transparent;
        }
        .map-site-item:hover {
          background: var(--bg-tertiary);
        }
        .map-site-item-active {
          background: rgba(232, 93, 93, 0.1);
          border-left-color: var(--primary);
        }
        .map-site-item-alert {
          background: rgba(239, 68, 68, 0.05);
        }
        .map-site-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .map-site-status-online { background: var(--success); }
        .map-site-status-alert { background: var(--warning); }
        .map-site-status-offline { background: var(--danger); }
        .map-site-info {
          flex: 1;
          min-width: 0;
        }
        .map-site-name {
          font-weight: 500;
          font-size: 0.875rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .map-site-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .map-site-stats {
          display: flex;
          gap: 0.25rem;
        }
        .map-site-stats .badge-pill {
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
        }
        .text-muted {
          color: var(--text-muted);
        }
      `}</style>
    </DashboardLayout>
  );
}
