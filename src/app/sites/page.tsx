import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { sites, getOperatorById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

function getSiteStatusBadge(status: string, t: (key: string) => string) {
  switch (status) {
    case 'online':
      return <span className="badge-pill badge-success"><span className="status-dot online"></span>{t('list.status.online')}</span>;
    case 'alert':
      return <span className="badge-pill badge-warning"><span className="status-dot alert"></span>{t('list.status.alert')}</span>;
    case 'offline':
      return <span className="badge-pill badge-error"><span className="status-dot offline"></span>{t('list.status.offline')}</span>;
    case 'maintenance':
      return <span className="badge-pill badge-warning"><span className="status-dot alert"></span>{t('list.status.maintenance')}</span>;
    default:
      return <span className="badge-pill badge-gray">{status}</span>;
  }
}

export default async function SitesPage() {
  const t = await getTranslations('sites');
  const tc = await getTranslations('common');

  const operatorCount = new Set(sites.map((s) => s.operatorId)).size;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb.sites')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('list.title')}</h1>
            <p className="page-subtitle">{t('list.subtitle', { siteCount: sites.length, operatorCount })}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('list.addSite')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('list.kpi.totalSites')}</div>
          <div className="kpi-value">{sites.length}</div>
          <div className="kpi-change neutral">{t('list.kpi.totalSitesChange', { count: operatorCount })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('list.kpi.newThisMonth')}</div>
          <div className="kpi-value">3</div>
          <div className="kpi-change positive">+7% growth</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('list.kpi.avgWashesPerDay')}</div>
          <div className="kpi-value">156</div>
          <div className="kpi-change positive">+12% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('list.kpi.avgRevenuePerSite')}</div>
          <div className="kpi-value">$2,340</div>
          <div className="kpi-change positive">+8% vs last month</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 250 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('list.searchPlaceholder')} />
          </div>
          <select className="filter-input">
            <option>{tc('filters.allOperators')}</option>
            <option>ABC Car Wash</option>
            <option>XYZ Wash</option>
            <option>QuickClean</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{t('list.status.online')}</option>
            <option>{t('list.status.alert')}</option>
            <option>{t('list.status.offline')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allTypes')}</option>
            <option>A0</option>
            <option>A5</option>
            <option>A7</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('list.table.siteName')}</th>
                <th>{t('list.table.operator')}</th>
                <th>{t('list.table.type')}</th>
                <th>{t('list.table.machines')}</th>
                <th>{t('list.table.status')}</th>
                <th>{t('list.table.todaysRevenue')}</th>
                <th>{t('list.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => {
                const operator = getOperatorById(site.operatorId);
                return (
                  <tr key={site.id} className="clickable">
                    <td>
                      <div className="list-item-title">{site.name}</div>
                      <div className="list-item-subtitle">{site.location}</div>
                    </td>
                    <td>{operator?.name ?? site.operatorId}</td>
                    <td>{site.equipmentType}</td>
                    <td>{site.bayCount}</td>
                    <td>{getSiteStatusBadge(site.status, t)}</td>
                    <td><strong>{site.status === 'offline' ? '$0' : '$—'}</strong></td>
                    <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('list.pagination.showing', { count: sites.length, total: sites.length })}</span>
          <div className="pagination-pages">
            <button className="active">1</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
