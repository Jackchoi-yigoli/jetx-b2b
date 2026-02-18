import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getOperatorById, getSitesByOperator } from '@/lib/data';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatJoinDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSiteType(type: string) {
  return type.split('-').map(capitalize).join(' ');
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OperatorDetailPage({ params }: Props) {
  const { id } = await params;
  const operator = getOperatorById(id);

  if (!operator) {
    notFound();
  }

  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  const sites = getSitesByOperator(operator.id);

  function siteStatusBadge(status: string) {
    if (status === 'online') {
      return <span className="badge-pill badge-success">{tc('status.online')}</span>;
    }
    if (status === 'maintenance') {
      return <span className="badge-pill badge-warning">{tc('status.maintenance')}</span>;
    }
    if (status === 'offline') {
      return <span className="badge-pill badge-danger">{tc('status.offline')}</span>;
    }
    return <span className="badge-pill badge-warning">{capitalize(status)}</span>;
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.partners')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/operators">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {operator.name}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{operator.name}</h1>
            <p className="page-subtitle">{t('detail.subtitle', { date: formatJoinDate(operator.createdAt), contractType: capitalize(operator.contractType) })}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('detail.editOperator')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('detail.addSite')}
            </button>
          </div>
        </div>
      </div>

      <div className="status-banner status-active">
        <span className="status-indicator"></span>
        <span>{t('detail.activePartner')}</span>
        <span className="status-date">{t('detail.contractValidUntil', { date: formatDate(operator.contractEnd) })}</span>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.totalSites')}</div>
          <div className="kpi-value">{sites.length}</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +2 this year
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.mtdRevenue')}</div>
          <div className="kpi-value">$245,000</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +15% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.ytdRevenue')}</div>
          <div className="kpi-value">$2.8M</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +22% vs last year
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.activeMembers')}</div>
          <div className="kpi-value">3,450</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +180 this month
          </div>
        </div>
      </div>

      <div className="tabs">
        <span className="tab active">{t('tabs.overview')}</span>
        <span className="tab">{t('tabs.sites', { count: sites.length })}</span>
        <span className="tab">{t('tabs.financial')}</span>
        <span className="tab">{t('tabs.team')}</span>
        <span className="tab">{t('tabs.documents')}</span>
        <span className="tab">{t('tabs.activity')}</span>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.contactInfo.title')}</h3>
            <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('detail.contactInfo.primaryContact')}</span>
              <span className="info-value">{operator.contact.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contactInfo.position')}</span>
              <span className="info-value">{operator.contact.position}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{tc('table.email')}</span>
              <span className="info-value">{operator.contact.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{tc('table.phone')}</span>
              <span className="info-value">{operator.contact.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contactInfo.address')}</span>
              <span className="info-value">{operator.contact.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contactInfo.taxId')}</span>
              <span className="info-value">{operator.taxId}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.contractDetails.title')}</h3>
            <button className="btn btn-sm btn-secondary">{t('detail.contractDetails.viewContract')}</button>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.contractType')}</span>
              <span className="info-value">{capitalize(operator.contractType)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.startDate')}</span>
              <span className="info-value">{formatDate(operator.contractStart)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.endDate')}</span>
              <span className="info-value">{formatDate(operator.contractEnd)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.revenueShare')}</span>
              <span className="info-value">{operator.revenueSharePct}%</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.territory')}</span>
              <span className="info-value">{operator.territory}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.contractDetails.siteLimit')}</span>
              <span className="info-value">{t('detail.contractDetails.siteLimitValue', { count: operator.siteLimit })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('detail.sitesOverview.title')}</h3>
          <Link href="/sites" className="card-link">{tc('actions.viewAll')}</Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('detail.sitesOverview.table.siteName')}</th>
                <th>{t('detail.sitesOverview.table.location')}</th>
                <th>{tc('table.type')}</th>
                <th>{tc('table.status')}</th>
                <th>{t('table.mtdRevenue')}</th>
                <th>{t('detail.sitesOverview.table.machines')}</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id} className="clickable">
                  <td>{site.name}</td>
                  <td>{site.location}</td>
                  <td>{formatSiteType(site.type)}</td>
                  <td>{siteStatusBadge(site.status)}</td>
                  <td>—</td>
                  <td>{site.bayCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.revenueTrend.title')}</h3>
          </div>
          <div className="card-body">
            <div className="chart-placeholder">{t('detail.revenueTrend.chartPlaceholder')}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('detail.recentActivity.title')}</h3>
          </div>
          <div className="card-body">
            <div className="activity-item">
              <span className="activity-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div className="activity-content">
                <div className="activity-title">New site added: {operator.name} Songshan</div>
                <div className="activity-time">2 days ago</div>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <div className="activity-content">
                <div className="activity-title">Payment received: $85,000</div>
                <div className="activity-time">5 days ago</div>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div className="activity-content">
                <div className="activity-title">Maintenance completed at Zhongshan</div>
                <div className="activity-time">1 week ago</div>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <div className="activity-content">
                <div className="activity-title">New team member: Sarah Lin (Site Manager)</div>
                <div className="activity-time">2 weeks ago</div>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </span>
              <div className="activity-content">
                <div className="activity-title">Contract amendment signed</div>
                <div className="activity-time">3 weeks ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
