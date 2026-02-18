import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { cameras, cctvRecordings } from '@/data/cameras';
import { getTranslations } from 'next-intl/server';

const SITE_ID = 'site-xinyi';

const siteCameras = cameras.filter((c) => c.siteId === SITE_ID);
const siteRecordings = cctvRecordings.filter((r) => r.siteId === SITE_ID && !r.tags.length);
const flaggedRecordings = cctvRecordings.filter((r) => r.siteId === SITE_ID && r.tags.length > 0 && r.incidentTitle);

function formatRecordingMeta(rec: { startTime: string; duration: number }) {
  const date = new Date(rec.startTime);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const dateStr = isToday
    ? 'Today'
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const mins = Math.floor(rec.duration / 60);
  const secs = rec.duration % 60;
  return `${dateStr} ${timeStr} · ${mins} min ${String(secs).padStart(2, '0')} sec`;
}

function incidentIcon(severity?: string) {
  if (severity === 'warning') return '⚠️';
  if (severity === 'info') return 'ℹ️';
  return '⚠️';
}

function incidentType(severity?: string) {
  return severity === 'info' ? 'info' : 'warning';
}

function formatIncidentMeta(rec: { startTime: string; cameraId: string }) {
  const date = new Date(rec.startTime);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  let dateStr: string;
  if (date.toDateString() === now.toDateString()) {
    dateStr = 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    dateStr = 'Yesterday';
  } else {
    dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${dateStr} ${timeStr} · ${rec.cameraId}`;
}

export default async function CCTVPage() {
  const t = await getTranslations('cctv');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.technical')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('title')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('monitoring.title')}</h1>
            <p className="page-subtitle">{t('monitoring.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 16 0z" /></svg>
              {t('actions.recordingSettings')}
            </button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              {t('actions.fullScreenView')}
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="filters-row">
          <div className="filter-group">
            <label>{t('filters.site')}</label>
            <select id="site-selector">
              <option value="xinyi">JetX Xinyi Station</option>
              <option value="daan">JetX Daan Station</option>
              <option value="zhongshan">JetX Zhongshan</option>
              <option value="neihu">JetX Neihu</option>
            </select>
          </div>
          <div className="status-indicators">
            <span className="status-dot online"></span> {siteCameras.filter((c) => c.status === 'online').length} {tc('status.online')}
            <span className="status-dot offline"></span> {siteCameras.filter((c) => c.status === 'offline').length} {tc('status.offline')}
          </div>
          <div className="live-indicator large">● LIVE</div>
        </div>
      </div>

      <div className="camera-grid">
        {siteCameras.map((cam) => (
          <div className="camera-feed" key={cam.id}>
            <div className="camera-header">
              <span className="camera-name">{cam.name}</span>
              <span className="camera-status online">● {t('camera.live')}</span>
            </div>
            <div className="camera-view">
              <div className={`camera-placeholder${cam.isActive ? ' active' : ''}`}>
                <span className="camera-icon">📹</span>
                <div className="camera-info">
                  <div>{cam.label}</div>
                  <div className="camera-details">{cam.detail}</div>
                </div>
              </div>
            </div>
            <div className="camera-controls">
              <button className="btn btn-sm">{t('camera.expand')}</button>
              <button className="btn btn-sm">{t('camera.playback')}</button>
              <button className="btn btn-sm">{t('camera.snapshot')}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('recordings.title')}</h3>
            <button className="btn btn-sm">{tc('actions.viewAll')}</button>
          </div>
          <div className="recording-list">
            {siteRecordings.map((rec) => (
              <div className="recording-item" key={rec.id}>
                <div className="recording-thumb">📼</div>
                <div className="recording-info">
                  <div className="recording-title">{rec.incidentTitle}</div>
                  <div className="recording-meta">{formatRecordingMeta(rec)}</div>
                </div>
                <button className="btn btn-sm">{t('recordings.play')}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('incidents.title')}</h3>
          </div>
          <div className="incident-list">
            {flaggedRecordings.map((rec) => (
              <div className={`incident-item ${incidentType(rec.severity)}`} key={rec.id}>
                <div className="incident-icon">{incidentIcon(rec.severity)}</div>
                <div className="incident-info">
                  <div className="incident-title">{rec.incidentTitle}</div>
                  <div className="incident-meta">{formatIncidentMeta(rec)}</div>
                </div>
                <button className="btn btn-sm">{t('incidents.review')}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('storage.title')}</h3>
        </div>
        <div className="storage-info">
          <div className="storage-bar">
            <div className="storage-used" style={{ width: '68%' }}></div>
          </div>
          <div className="storage-details">
            <span>{t('storage.used')}</span>
            <span>68% · ~45 {t('storage.daysOfRecordings')}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
