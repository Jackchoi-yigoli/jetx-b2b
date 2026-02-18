import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

const machineIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const coinIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const tankIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

const shieldIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default async function OperatorSitesPage() {
  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/operators/op-cleanwash' },
    { label: t('tabs.sites', { count: 12 }), href: '/operators/op-cleanwash/sites' },
    { label: t('tabs.financial'), href: '/operators/op-cleanwash/financial' },
    { label: t('tabs.team'), href: '#' },
    { label: t('tabs.documents'), href: '#' },
    { label: t('tabs.activity'), href: '#' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/operators">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/operators/op-cleanwash">CleanWash Corp</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.sites', { count: 12 })}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">CleanWash Corp - {t('tabs.sites', { count: 12 })}</h1>
            <p className="page-subtitle">{t('sites.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('detail.addSite')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.totalSites')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change positive">+2 this year</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{tc('status.online')}</div>
          <div className="kpi-value">10</div>
          <div className="kpi-change positive">83% uptime</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sites.kpi.totalMachines')}</div>
          <div className="kpi-value">68</div>
          <div className="kpi-change positive">+8 this year</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sites.kpi.avgRevenueSite')}</div>
          <div className="kpi-value">$20,400</div>
          <div className="kpi-change positive">+12% vs last month</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('sites.allSites')}</div>
          <div className="filter-group">
            <select className="form-select">
              <option>{tc('filters.allStatus')}</option>
              <option>{tc('status.online')}</option>
              <option>{tc('status.offline')}</option>
              <option>{tc('status.maintenance')}</option>
            </select>
            <select className="form-select">
              <option>{tc('filters.allTypes')}</option>
              <option>{t('sites.types.fullService')}</option>
              <option>{t('sites.types.selfService')}</option>
              <option>{t('sites.types.hybrid')}</option>
            </select>
          </div>
        </div>

        <div className="site-card-expanded">
          <div className="site-card-header">
            <div className="site-info">
              <div className="site-name">CleanWash Xinyi</div>
              <div className="site-location">Xinyi District, Taipei</div>
            </div>
            <div className="site-badges">
              <span className="badge badge-success">{tc('status.online')}</span>
              <span className="badge badge-info">{t('sites.types.fullService')}</span>
            </div>
            <div className="site-stats">
              <div className="stat">
                <span className="stat-value">$32,500</span>
                <span className="stat-label">{t('table.mtdRevenue')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">8</span>
                <span className="stat-label">{t('sites.stats.machines')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">1,245</span>
                <span className="stat-label">{t('sites.stats.mtdWashes')}</span>
              </div>
            </div>
          </div>
          <div className="equipment-grid">
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 1 - Automatic</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 45 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 2 - Automatic</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 38 washes</div>
            </div>
            <div className="equipment-item warning">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 3 - Self-Service</div>
              <div className="equipment-status">{t('sites.equipment.lowSoap')}</div>
              <div className="equipment-stats">Today: 22 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 4 - Self-Service</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 28 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{coinIcon}</div>
              <div className="equipment-name">Vacuum Station 1</div>
              <div className="equipment-status">{tc('status.available')}</div>
              <div className="equipment-stats">Today: 67 uses</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{coinIcon}</div>
              <div className="equipment-name">Vacuum Station 2</div>
              <div className="equipment-status">{tc('status.available')}</div>
              <div className="equipment-stats">Today: 54 uses</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{tankIcon}</div>
              <div className="equipment-name">Water Tank</div>
              <div className="equipment-status">85% Full</div>
              <div className="equipment-stats">Capacity: 10,000L</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{shieldIcon}</div>
              <div className="equipment-name">Payment Terminal</div>
              <div className="equipment-status">{tc('status.connected')}</div>
              <div className="equipment-stats">Today: $2,450</div>
            </div>
          </div>
        </div>

        <div className="site-card-expanded">
          <div className="site-card-header">
            <div className="site-info">
              <div className="site-name">CleanWash Daan</div>
              <div className="site-location">Daan District, Taipei</div>
            </div>
            <div className="site-badges">
              <span className="badge badge-success">{tc('status.online')}</span>
              <span className="badge badge-secondary">{t('sites.types.selfService')}</span>
            </div>
            <div className="site-stats">
              <div className="stat">
                <span className="stat-value">$18,200</span>
                <span className="stat-label">{t('table.mtdRevenue')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">4</span>
                <span className="stat-label">{t('sites.stats.machines')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">892</span>
                <span className="stat-label">{t('sites.stats.mtdWashes')}</span>
              </div>
            </div>
          </div>
          <div className="equipment-grid">
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 1 - Self-Service</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 32 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 2 - Self-Service</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 28 washes</div>
            </div>
            <div className="equipment-item offline">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 3 - Self-Service</div>
              <div className="equipment-status">Offline - Motor Issue</div>
              <div className="equipment-stats">Ticket #1234</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{coinIcon}</div>
              <div className="equipment-name">Vacuum Station</div>
              <div className="equipment-status">{tc('status.available')}</div>
              <div className="equipment-stats">Today: 45 uses</div>
            </div>
          </div>
        </div>

        <div className="site-card-expanded">
          <div className="site-card-header">
            <div className="site-info">
              <div className="site-name">CleanWash Zhongshan</div>
              <div className="site-location">Zhongshan District, Taipei</div>
            </div>
            <div className="site-badges">
              <span className="badge badge-warning">{tc('status.maintenance')}</span>
              <span className="badge badge-info">{t('sites.types.hybrid')}</span>
            </div>
            <div className="site-stats">
              <div className="stat">
                <span className="stat-value">$24,800</span>
                <span className="stat-label">{t('table.mtdRevenue')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">6</span>
                <span className="stat-label">{t('sites.stats.machines')}</span>
              </div>
              <div className="stat">
                <span className="stat-value">1,024</span>
                <span className="stat-label">{t('sites.stats.mtdWashes')}</span>
              </div>
            </div>
          </div>
          <div className="equipment-grid">
            <div className="equipment-item warning">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 1 - Automatic</div>
              <div className="equipment-status">{tc('status.scheduled')}</div>
              <div className="equipment-stats">Until 3:00 PM</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 2 - Automatic</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 41 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 3 - Self-Service</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 18 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{machineIcon}</div>
              <div className="equipment-name">Bay 4 - Self-Service</div>
              <div className="equipment-status">{tc('status.running')}</div>
              <div className="equipment-stats">Today: 22 washes</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{coinIcon}</div>
              <div className="equipment-name">Vacuum Station 1</div>
              <div className="equipment-status">{tc('status.available')}</div>
              <div className="equipment-stats">Today: 38 uses</div>
            </div>
            <div className="equipment-item online">
              <div className="equipment-icon">{coinIcon}</div>
              <div className="equipment-name">Vacuum Station 2</div>
              <div className="equipment-status">{tc('status.available')}</div>
              <div className="equipment-stats">Today: 31 uses</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
