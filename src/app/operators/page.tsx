import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { operators } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

function formatJoinDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatRevenue(amount: number) {
  return '$' + amount.toLocaleString('en-US');
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function OperatorsPage() {
  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  const totalOperators = operators.length;

  function statusBadge(status: string) {
    if (status === 'active') {
      return (
        <span className="badge-pill badge-success">
          <span className="status-dot online"></span>{tc('status.active')}
        </span>
      );
    }
    if (status === 'suspended') {
      return (
        <span className="badge-pill badge-danger">
          <span className="status-dot offline"></span>{tc('status.suspended')}
        </span>
      );
    }
    return (
      <span className="badge-pill badge-warning">
        <span className="status-dot alert"></span>{tc('status.pending')}
      </span>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.partners')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('title')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('addOperator')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalOperators')}</div>
          <div className="kpi-value">{totalOperators}</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +3 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.activeSites')}</div>
          <div className="kpi-value">156</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +12 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalRevenueMtd')}</div>
          <div className="kpi-value">$2.4M</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +18% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgSitesPerOperator')}</div>
          <div className="kpi-value">6.5</div>
          <div className="kpi-change">-</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 250 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('searchPlaceholder')} />
          </div>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{tc('status.active')}</option>
            <option>{tc('status.pending')}</option>
            <option>{tc('status.suspended')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allRegions')}</option>
            <option>{t('filters.north')}</option>
            <option>{t('filters.central')}</option>
            <option>{t('filters.south')}</option>
            <option>{t('filters.east')}</option>
          </select>
          <select className="filter-input">
            <option>{t('filters.allContractTypes')}</option>
            <option>{t('filters.franchise')}</option>
            <option>{t('filters.license')}</option>
            <option>{t('filters.partnership')}</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('table.operatorName')}</th>
                <th>{t('table.contactPerson')}</th>
                <th>{t('table.region')}</th>
                <th>{t('table.sites')}</th>
                <th>{t('table.mtdRevenue')}</th>
                <th>{t('table.contract')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((operator) => (
                <tr key={operator.id} className="clickable">
                  <td>
                    <Link href={`/operators/${operator.id}`} style={{ display: 'contents' }}>
                      <div className="list-item-title">{operator.name}</div>
                      <div className="list-item-subtitle">{t('table.since')} {formatJoinDate(operator.createdAt)}</div>
                    </Link>
                  </td>
                  <td>
                    <div className="list-item-title">{operator.contact.name}</div>
                    <div className="list-item-subtitle">{operator.contact.email}</div>
                  </td>
                  <td>{operator.territory}</td>
                  <td>{operator.siteLimit}</td>
                  <td><strong>{formatRevenue(operator.revenueSharePct * 10000)}</strong></td>
                  <td>{capitalize(operator.contractType)}</td>
                  <td>{statusBadge(operator.status)}</td>
                  <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('pagination.showing', { from: 1, to: operators.length, total: totalOperators })}</span>
          <div className="pagination-pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
