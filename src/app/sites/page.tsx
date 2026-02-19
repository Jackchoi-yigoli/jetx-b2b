import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { sites, getOperatorById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import SitesTable from './SitesTable';

export default async function SitesPage() {
  const t = await getTranslations('sites');
  const tc = await getTranslations('common');

  const operatorCount = new Set(sites.map((s) => s.operatorId)).size;

  const operatorNames: Record<string, string> = {};
  sites.forEach((s) => {
    if (!operatorNames[s.operatorId]) {
      const op = getOperatorById(s.operatorId);
      operatorNames[s.operatorId] = op?.name ?? s.operatorId;
    }
  });

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

      <SitesTable data={sites} operatorNames={operatorNames} />
    </DashboardLayout>
  );
}
