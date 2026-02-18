import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

const CarIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={size === 64 ? 1.5 : 2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={size === 64 ? 1.5 : 2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

export default async function CustomerVehiclesPage() {
  const t = await getTranslations('customers');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/customers/cust-45678' },
    { label: t('tabs.transactions'), href: '/customers/cust-45678/transactions' },
    { label: t('tabs.vehiclesCount', { count: 2 }), href: '/customers/cust-45678/vehicles' },
    { label: t('tabs.membership'), href: '/customers/cust-45678/memberships' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/customers">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Emily Chen
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Emily Chen</h1>
            <p className="page-subtitle">Customer #45678 · Member since March 2023</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">{t('vehicles.actions.addVehicle')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('vehicles.kpi.registeredVehicles')}</div>
          <div className="kpi-value">2</div>
          <div className="kpi-change neutral">{t('vehicles.kpi.maxAllowed', { count: 3 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('vehicles.kpi.primaryVehicleWashes')}</div>
          <div className="kpi-value">124</div>
          <div className="kpi-change positive">Tesla Model 3</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('vehicles.kpi.secondaryVehicleWashes')}</div>
          <div className="kpi-value">32</div>
          <div className="kpi-change neutral">Toyota RAV4</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('vehicles.kpi.lastWash')}</div>
          <div className="kpi-value">Dec 7</div>
          <div className="kpi-change neutral">1 day ago</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="badge badge-success mr-8">{t('vehicles.primary')}</span>
              Tesla Model 3
            </div>
            <button className="btn btn-text">{tc('actions.edit')}</button>
          </div>
          <div className="card-body">
            <div className="vehicle-detail-header">
              <div className="vehicle-icon-large">
                <CarIcon size={64} />
              </div>
              <div className="vehicle-detail-info">
                <div className="vehicle-plate-large">ABC-1234</div>
                <div className="vehicle-meta">Black · 2023 · Electric</div>
              </div>
            </div>
            <div className="info-grid mt-16">
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.make')}</span>
                <span className="info-value">Tesla</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.model')}</span>
                <span className="info-value">Model 3 Long Range</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.year')}</span>
                <span className="info-value">2023</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.color')}</span>
                <span className="info-value">Solid Black</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.licensePlate')}</span>
                <span className="info-value">ABC-1234</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.registrationDate')}</span>
                <span className="info-value">Mar 15, 2023</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.totalWashes')}</span>
                <span className="info-value">124</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.lastWash')}</span>
                <span className="info-value">Dec 7, 2024</span>
              </div>
            </div>
            <div className="card-actions mt-16">
              <button className="btn btn-secondary btn-sm">{t('vehicles.actions.viewWashHistory')}</button>
              <button className="btn btn-text btn-sm">{t('vehicles.actions.removeVehicle')}</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="badge badge-secondary mr-8">{t('vehicles.secondary')}</span>
              Toyota RAV4
            </div>
            <button className="btn btn-text">{tc('actions.edit')}</button>
          </div>
          <div className="card-body">
            <div className="vehicle-detail-header">
              <div className="vehicle-icon-large">
                <CarIcon size={64} />
              </div>
              <div className="vehicle-detail-info">
                <div className="vehicle-plate-large">XYZ-5678</div>
                <div className="vehicle-meta">White · 2022 · Hybrid</div>
              </div>
            </div>
            <div className="info-grid mt-16">
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.make')}</span>
                <span className="info-value">Toyota</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.model')}</span>
                <span className="info-value">RAV4 Hybrid</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.year')}</span>
                <span className="info-value">2022</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.color')}</span>
                <span className="info-value">Super White</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.licensePlate')}</span>
                <span className="info-value">XYZ-5678</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.registrationDate')}</span>
                <span className="info-value">Aug 22, 2023</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.totalWashes')}</span>
                <span className="info-value">32</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('vehicles.fields.lastWash')}</span>
                <span className="info-value">Dec 3, 2024</span>
              </div>
            </div>
            <div className="card-actions mt-16">
              <button className="btn btn-secondary btn-sm">{t('vehicles.actions.viewWashHistory')}</button>
              <button className="btn btn-secondary btn-sm">{t('vehicles.actions.setAsPrimary')}</button>
              <button className="btn btn-text btn-sm">{t('vehicles.actions.removeVehicle')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header">
          <div className="card-title">{t('vehicles.recentVehicleWashes')}</div>
          <Link href="/customers/cust-45678/transactions" className="card-link">{t('vehicles.viewAllTransactions')}</Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{tc('table.date')}</th>
                <th>{t('table.vehicle')}</th>
                <th>{t('table.site')}</th>
                <th>{t('table.service')}</th>
                <th>{t('vehicles.table.duration')}</th>
                <th>{tc('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable">
                <td>Dec 7, 2024 · 10:32 AM</td>
                <td>
                  <div className="vehicle-cell">
                    <span className="vehicle-name">Tesla Model 3</span>
                    <span className="vehicle-plate-small">ABC-1234</span>
                  </div>
                </td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>4 min 32 sec</td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td>Dec 5, 2024 · 3:15 PM</td>
                <td>
                  <div className="vehicle-cell">
                    <span className="vehicle-name">Tesla Model 3</span>
                    <span className="vehicle-plate-small">ABC-1234</span>
                  </div>
                </td>
                <td>JetX Daan Station</td>
                <td>Ultimate Wash</td>
                <td>6 min 15 sec</td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td>Dec 3, 2024 · 11:45 AM</td>
                <td>
                  <div className="vehicle-cell">
                    <span className="vehicle-name">Toyota RAV4</span>
                    <span className="vehicle-plate-small">XYZ-5678</span>
                  </div>
                </td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash + Wax</td>
                <td>7 min 22 sec</td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td>Dec 1, 2024 · 9:20 AM</td>
                <td>
                  <div className="vehicle-cell">
                    <span className="vehicle-name">Tesla Model 3</span>
                    <span className="vehicle-plate-small">ABC-1234</span>
                  </div>
                </td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>4 min 18 sec</td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td>Nov 28, 2024 · 2:45 PM</td>
                <td>
                  <div className="vehicle-cell">
                    <span className="vehicle-name">Tesla Model 3</span>
                    <span className="vehicle-plate-small">ABC-1234</span>
                  </div>
                </td>
                <td>JetX Neihu Station</td>
                <td>Ultimate Wash + Tire Shine</td>
                <td>7 min 45 sec</td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
