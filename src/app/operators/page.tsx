import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { operators } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import OperatorsTable from './OperatorsTable';

export default async function OperatorsPage() {
  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  const totalOperators = operators.length;

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

      <OperatorsTable data={operators} />
    </DashboardLayout>
  );
}
