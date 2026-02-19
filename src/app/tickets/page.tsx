import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { tickets } from '@/data/tickets';
import { getSiteById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import TicketsTable from './TicketsTable';

// Enrich tickets with site names for client component
const ticketRows = tickets.map((ticket) => {
  const site = getSiteById(ticket.siteId);
  return {
    ...ticket,
    siteName: site?.name ?? ticket.siteId,
  };
});

export default async function TicketsPage() {
  const t = await getTranslations('tickets');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.technical')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <Link href="/tickets/create" className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.createTicket')}
            </Link>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.openTickets')}</div>
          <div className="kpi-value">23</div>
          <div className="kpi-change negative">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            5 urgent
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgResponseTime')}</div>
          <div className="kpi-value">2.4h</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            -30 min vs last week
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgResolutionTime')}</div>
          <div className="kpi-value">18h</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            -2h vs last week
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.satisfactionRate')}</div>
          <div className="kpi-value">94%</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +2% vs last month
          </div>
        </div>
      </div>

      <TicketsTable data={ticketRows} />
    </DashboardLayout>
  );
}
