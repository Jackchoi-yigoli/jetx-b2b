import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteCctvPage() {
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
          {t('breadcrumb.cctv')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street - CCTV</h1>
            <p className="page-subtitle">6 cameras &middot; All online</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {t('cctv.downloadClips')}
            </button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              {t('cctv.fullScreenView')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('cctv.kpi.totalCameras')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-change neutral">All connected</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('cctv.kpi.online')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-change positive">100% uptime</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('cctv.kpi.recording')}</div>
          <div className="kpi-value">6</div>
          <div className="kpi-change positive">All active</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('cctv.kpi.storageUsed')}</div>
          <div className="kpi-value">72%</div>
          <div className="kpi-change warning">28 days remaining</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="cctv-grid">
        <div className="cctv-feed main">
          <div className="cctv-video">
            <div className="cctv-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span>{t('cctv.feed.liveFeed')}</span>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live">
                <span className="live-dot"></span>
                {t('cctv.feed.live')}
              </div>
              <div className="cctv-time">14:52:38</div>
            </div>
          </div>
          <div className="cctv-info">
            <div className="cctv-name">Bay 1 - Automatic Tunnel</div>
            <div className="cctv-controls">
              <button className="cctv-btn" title="Fullscreen">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              </button>
              <button className="cctv-btn" title="Record">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <button className="cctv-btn" title="Screenshot">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="cctv-feed">
          <div className="cctv-video">
            <div className="cctv-placeholder small">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live"><span className="live-dot"></span>{t('cctv.feed.live')}</div>
            </div>
          </div>
          <div className="cctv-info"><div className="cctv-name">Bay 2 - Automatic Tunnel</div></div>
        </div>

        <div className="cctv-feed">
          <div className="cctv-video">
            <div className="cctv-placeholder small">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live"><span className="live-dot"></span>{t('cctv.feed.live')}</div>
            </div>
          </div>
          <div className="cctv-info"><div className="cctv-name">Bay 3 - Self Service</div></div>
        </div>

        <div className="cctv-feed">
          <div className="cctv-video">
            <div className="cctv-placeholder small">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live"><span className="live-dot"></span>{t('cctv.feed.live')}</div>
            </div>
          </div>
          <div className="cctv-info"><div className="cctv-name">Bay 4 - Self Service</div></div>
        </div>

        <div className="cctv-feed">
          <div className="cctv-video">
            <div className="cctv-placeholder small">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live"><span className="live-dot"></span>{t('cctv.feed.live')}</div>
            </div>
          </div>
          <div className="cctv-info"><div className="cctv-name">Entrance / Exit</div></div>
        </div>

        <div className="cctv-feed">
          <div className="cctv-video">
            <div className="cctv-placeholder small">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div className="cctv-overlay">
              <div className="cctv-status live"><span className="live-dot"></span>{t('cctv.feed.live')}</div>
            </div>
          </div>
          <div className="cctv-info"><div className="cctv-name">Payment Area</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cctv.cards.recentMotionEvents')}</div>
            <select className="form-select form-select-sm">
              <option>{t('cctv.motionFilter.allCameras')}</option>
              <option>Bay 1</option>
              <option>Bay 2</option>
              <option>Bay 3</option>
              <option>Bay 4</option>
              <option>Entrance</option>
              <option>Payment</option>
            </select>
          </div>
          <div className="card-body">
            <div className="event-list">
              <div className="event-item">
                <div className="event-thumb">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="event-info">
                  <div className="event-title">Vehicle entered Bay 1</div>
                  <div className="event-meta">Bay 1 &middot; 2:45 PM &middot; 32s clip</div>
                </div>
                <button className="btn btn-sm btn-secondary">{t('cctv.eventActions.view')}</button>
              </div>
              <div className="event-item">
                <div className="event-thumb">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="event-info">
                  <div className="event-title">Wash cycle completed</div>
                  <div className="event-meta">Bay 2 &middot; 2:38 PM &middot; 8m 24s clip</div>
                </div>
                <button className="btn btn-sm btn-secondary">{t('cctv.eventActions.view')}</button>
              </div>
              <div className="event-item">
                <div className="event-thumb">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="event-info">
                  <div className="event-title">Payment processed</div>
                  <div className="event-meta">Payment Area &middot; 2:31 PM &middot; 15s clip</div>
                </div>
                <button className="btn btn-sm btn-secondary">{t('cctv.eventActions.view')}</button>
              </div>
              <div className="event-item">
                <div className="event-thumb alert">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="event-info">
                  <div className="event-title">Unusual activity detected</div>
                  <div className="event-meta">Entrance &middot; 2:15 PM &middot; 45s clip</div>
                </div>
                <button className="btn btn-sm btn-primary">{t('cctv.eventActions.review')}</button>
              </div>
              <div className="event-item">
                <div className="event-thumb">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="event-info">
                  <div className="event-title">Vehicle exited Bay 3</div>
                  <div className="event-meta">Bay 3 &middot; 2:08 PM &middot; 28s clip</div>
                </div>
                <button className="btn btn-sm btn-secondary">{t('cctv.eventActions.view')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('cctv.cards.savedRecordings')}</div>
            <a href="#" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            <div className="recording-list">
              <div className="recording-item">
                <div className="recording-info">
                  <div className="recording-title">Customer complaint - Bay 2</div>
                  <div className="recording-meta">Dec 7, 2024 &middot; 3:45 PM &middot; 5m 32s</div>
                </div>
                <span className="badge badge-warning">{t('cctv.badges.flagged')}</span>
              </div>
              <div className="recording-item">
                <div className="recording-info">
                  <div className="recording-title">Equipment malfunction - Bay 4</div>
                  <div className="recording-meta">Dec 6, 2024 &middot; 11:20 AM &middot; 12m 15s</div>
                </div>
                <span className="badge badge-error">{t('cctv.badges.incident')}</span>
              </div>
              <div className="recording-item">
                <div className="recording-info">
                  <div className="recording-title">Successful service demo</div>
                  <div className="recording-meta">Dec 5, 2024 &middot; 2:00 PM &middot; 8m 45s</div>
                </div>
                <span className="badge badge-success">{t('cctv.badges.training')}</span>
              </div>
              <div className="recording-item">
                <div className="recording-info">
                  <div className="recording-title">Payment issue resolved</div>
                  <div className="recording-meta">Dec 4, 2024 &middot; 4:30 PM &middot; 2m 18s</div>
                </div>
                <span className="badge badge-info">{t('cctv.badges.support')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('cctv.cards.cameraStatus')}</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('cctv.table.camera')}</th>
              <th>{t('cctv.table.location')}</th>
              <th>{t('cctv.table.status')}</th>
              <th>{t('cctv.table.resolution')}</th>
              <th>{t('cctv.table.storageUsed')}</th>
              <th>{t('cctv.table.lastMotion')}</th>
              <th>{t('cctv.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CAM-001</strong></td>
              <td>Bay 1 - Automatic Tunnel</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>45.2 GB / 100 GB</td>
              <td>{tc('time.justNow')}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
            <tr>
              <td><strong>CAM-002</strong></td>
              <td>Bay 2 - Automatic Tunnel</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>42.8 GB / 100 GB</td>
              <td>{tc('time.minutesAgo', { count: 2 })}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
            <tr>
              <td><strong>CAM-003</strong></td>
              <td>Bay 3 - Self Service</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>38.5 GB / 100 GB</td>
              <td>{tc('time.minutesAgo', { count: 5 })}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
            <tr>
              <td><strong>CAM-004</strong></td>
              <td>Bay 4 - Self Service</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>36.1 GB / 100 GB</td>
              <td>{tc('time.minutesAgo', { count: 8 })}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
            <tr>
              <td><strong>CAM-005</strong></td>
              <td>Entrance / Exit</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>52.3 GB / 100 GB</td>
              <td>{tc('time.justNow')}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
            <tr>
              <td><strong>CAM-006</strong></td>
              <td>Payment Area</td>
              <td><span className="badge badge-success">{tc('status.online')}</span></td>
              <td>1080p @ 30fps</td>
              <td>48.7 GB / 100 GB</td>
              <td>{tc('time.minutesAgo', { count: 3 })}</td>
              <td><button className="btn btn-sm btn-secondary">{t('cctv.table.settings')}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
