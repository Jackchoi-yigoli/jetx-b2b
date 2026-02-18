import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteDetailPage() {
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
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/sites">{t('breadcrumb.sites')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Main Street
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street</h1>
            <p className="page-subtitle">ABC Car Wash Co. &middot; 123 Main Street, City, State 12345</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              {t('detail.viewOnMap')}
            </button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              {t('detail.editSite')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.todaysRevenue')}</div>
          <div className="kpi-value">$2,340</div>
          <div className="kpi-change positive">+15% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.transactions')}</div>
          <div className="kpi-value">87</div>
          <div className="kpi-change positive">+12% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.avgTicket')}</div>
          <div className="kpi-value">$26.90</div>
          <div className="kpi-change positive">+3%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('detail.kpi.equipmentUptime')}</div>
          <div className="kpi-value">100%</div>
          <div className="kpi-change neutral">{t('detail.kpi.allOnline')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.cards.siteInformation')}</div>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">{t('detail.info.status')}</div>
                <div className="info-value"><span className="badge badge-success"><span className="status-dot online"></span>{tc('status.online')}</span></div>
              </div>
              <div className="info-item">
                <div className="info-label">{t('detail.info.equipmentType')}</div>
                <div className="info-value">A5 Rollover + A0 Self-Service</div>
              </div>
              <div className="info-item">
                <div className="info-label">{t('detail.info.totalMachines')}</div>
                <div className="info-value">3 machines</div>
              </div>
              <div className="info-item">
                <div className="info-label">{t('detail.info.operatingHours')}</div>
                <div className="info-value">06:00 - 22:00</div>
              </div>
              <div className="info-item">
                <div className="info-label">{t('detail.info.contact')}</div>
                <div className="info-value">John Doe</div>
              </div>
              <div className="info-item">
                <div className="info-label">{t('detail.info.phone')}</div>
                <div className="info-value">+1-234-567-8900</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.cards.equipmentStatus')}</div>
            <a href="/hardware" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            <table>
              <thead>
                <tr>
                  <th>{t('detail.table.machine')}</th>
                  <th>{t('detail.table.type')}</th>
                  <th>{t('detail.table.status')}</th>
                  <th>{t('detail.table.lastService')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="clickable">
                  <td><strong>A5-001</strong></td>
                  <td>A5</td>
                  <td><span className="badge badge-success">{tc('status.online')}</span></td>
                  <td>Dec 1, 2025</td>
                </tr>
                <tr className="clickable">
                  <td><strong>A0-012</strong></td>
                  <td>A0</td>
                  <td><span className="badge badge-success">{tc('status.online')}</span></td>
                  <td>Nov 28, 2025</td>
                </tr>
                <tr className="clickable">
                  <td><strong>A0-013</strong></td>
                  <td>A0</td>
                  <td><span className="badge badge-success">{tc('status.online')}</span></td>
                  <td>Nov 28, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.cards.revenueTrend')}</div>
            <a href="/reports" className="card-link">{tc('actions.viewFullReport')}</a>
          </div>
          <div className="card-body">
            <div className="chart-placeholder tall">Revenue Chart</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.cards.recentTransactions')}</div>
            <a href="/transactions" className="card-link">{tc('actions.viewAll')}</a>
          </div>
          <div className="card-body">
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">#TX-2847 &middot; Premium Wash</div>
                <div className="list-item-subtitle">John Smith &middot; 2 min ago</div>
              </div>
              <div className="list-item-value">
                <div className="list-item-amount">$24.99</div>
                <span className="badge badge-success">{tc('status.completed')}</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">#TX-2843 &middot; Basic Wash</div>
                <div className="list-item-subtitle">Jane Doe &middot; 15 min ago</div>
              </div>
              <div className="list-item-value">
                <div className="list-item-amount">$14.99</div>
                <span className="badge badge-success">{tc('status.completed')}</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">#TX-2840 &middot; Ultimate Wash</div>
                <div className="list-item-subtitle">Bob Wilson &middot; 32 min ago</div>
              </div>
              <div className="list-item-value">
                <div className="list-item-amount">$34.99</div>
                <span className="badge badge-success">{tc('status.completed')}</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-main">
                <div className="list-item-title">#TX-2838 &middot; Self-Service</div>
                <div className="list-item-subtitle">Guest &middot; 45 min ago</div>
              </div>
              <div className="list-item-value">
                <div className="list-item-amount">$8.99</div>
                <span className="badge badge-success">{tc('status.completed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
