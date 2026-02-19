import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { machines } from '@/data/machines';
import { getSiteById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import HardwareTable from './HardwareTable';

// Enrich machines with site names for client component
const machineRows = machines.map((machine) => {
  const site = getSiteById(machine.siteId);
  return {
    ...machine,
    siteName: site?.name ?? machine.siteId,
  };
});

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

      <HardwareTable data={machineRows} />
    </DashboardLayout>
  );
}
