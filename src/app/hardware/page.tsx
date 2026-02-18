import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { machines } from '@/data/machines';
import { getSiteById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

const categoryLabel: Record<string, string> = {
  'a0-self-service': 'A0',
  'a5-automatic': 'A5',
  'a7-premium': 'A7',
};

const statusBadge: Record<string, { badge: string; dot: string; label: string }> = {
  online: { badge: 'badge-success', dot: 'online', label: 'Online' },
  offline: { badge: 'badge-error', dot: 'offline', label: 'Offline' },
  error: { badge: 'badge-error', dot: 'offline', label: 'Offline' },
  alert: { badge: 'badge-warning', dot: 'alert', label: 'Alert' },
  maintenance: { badge: 'badge-warning', dot: 'alert', label: 'Alert' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function HardwarePage() {
  const t = await getTranslations('hardware');
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

      <div className="tabs">
        <Link className="tab active" href="/hardware">{t('tabs.listView')}</Link>
        <Link className="tab" href="/hardware/map">{t('tabs.mapView')}</Link>
        <Link className="tab" href="/hardware/alerts">{t('tabs.alerts')}</Link>
      </div>

      <div className="mb-24">
        <div className="alert-card critical">
          <div className="alert-card-header">
            <div className="alert-card-title">
              <span className="badge badge-error">CRITICAL</span>
              Machine Offline - A5-008
            </div>
            <span className="alert-card-time">2 hours ago</span>
          </div>
          <div className="alert-card-body">
            <strong>Highway Station</strong> - Communication lost, no heartbeat for 2 hours. Estimated revenue loss: $150/hour.
          </div>
          <div className="alert-card-footer">
            <button className="btn btn-sm btn-secondary">{t('actions.createTicket')}</button>
            <button className="btn btn-sm btn-secondary">{t('actions.acknowledge')}</button>
            <button className="btn btn-sm btn-primary">{t('actions.viewMachine')}</button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 220 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('filters.searchEquipment')} />
          </div>
          <select className="filter-input">
            <option>{tc('filters.allSites')}</option>
            <option>Main Street</option>
            <option>Downtown</option>
            <option>Airport</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allTypes')}</option>
            <option>A0</option>
            <option>A5</option>
            <option>A7</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{tc('status.online')}</option>
            <option>{tc('status.alert')}</option>
            <option>{tc('status.offline')}</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('table.machineId')}</th>
                <th>{t('table.site')}</th>
                <th>{tc('table.type')}</th>
                <th>{tc('table.status')}</th>
                <th>{t('table.uptime')}</th>
                <th>{t('table.lastService')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => {
                const site = getSiteById(machine.siteId);
                const status = statusBadge[machine.status] ?? statusBadge.offline;
                const uptimeDisplay = machine.status === 'offline' || machine.status === 'error' ? '--' : `${machine.healthScore}.0%`;
                const alertDescription = machine.alerts[0]?.title ?? null;
                return (
                  <tr className="clickable" key={machine.id}>
                    <td>
                      <div className="list-item-title">{machine.serialNumber}</div>
                      <div className="list-item-subtitle">
                        {alertDescription ?? `${machine.totalWashCycles.toLocaleString()} ${t('table.totalCycles')}`}
                      </div>
                    </td>
                    <td>{site?.name ?? machine.siteId}</td>
                    <td>{categoryLabel[machine.category] ?? machine.category}</td>
                    <td>
                      <span className={`badge ${status.badge}`}>
                        <span className={`status-dot ${status.dot}`}></span>
                        {status.label}
                      </span>
                    </td>
                    <td>{uptimeDisplay}</td>
                    <td>{formatDate(machine.lastServiceDate)}</td>
                    <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('pagination.showing', { count: machines.length })}</span>
          <div className="pagination-pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>26</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
