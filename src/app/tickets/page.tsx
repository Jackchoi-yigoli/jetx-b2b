import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { tickets } from '@/data/tickets';
import { getSiteById } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

const priorityBadge: Record<string, { badge: string; label: string }> = {
  urgent: { badge: 'badge-danger', label: 'Urgent' },
  high: { badge: 'badge-warning', label: 'High' },
  medium: { badge: 'badge-secondary', label: 'Medium' },
  low: { badge: 'badge-secondary', label: 'Low' },
};

const statusBadge: Record<string, { badge: string; label: string }> = {
  open: { badge: 'badge-warning', label: 'Open' },
  'in-progress': { badge: 'badge-info', label: 'In Progress' },
  resolved: { badge: 'badge-success', label: 'Resolved' },
  closed: { badge: 'badge-secondary', label: 'Closed' },
};

const categoryLabel: Record<string, string> = {
  equipment: 'Equipment',
  billing: 'Billing',
  'customer-service': 'Customer Service',
  membership: 'Membership',
  complaint: 'Complaint',
  software: 'Software',
  other: 'Other',
};

const assigneeLabel: Record<string, string> = {
  'team-tech': 'Tech Team',
  'user-sarah': 'Sarah Wong',
  'user-john': 'John Chen',
};

function getAssigneeLabel(assigneeId: string | null) {
  if (!assigneeId) return 'Unassigned';
  return assigneeLabel[assigneeId] ?? assigneeId;
}

function formatUpdatedAt(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

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

      <div className="table-container">
        <div className="table-filters">
          <div className="search-input" style={{ width: 250 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder={t('filters.searchPlaceholder')} />
          </div>
          <select className="filter-input">
            <option>{tc('filters.allStatus')}</option>
            <option>{tc('status.open')}</option>
            <option>{tc('status.inProgress')}</option>
            <option>{tc('status.resolved')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allPriorities')}</option>
            <option>{tc('priority.urgent')}</option>
            <option>{tc('priority.high')}</option>
            <option>{tc('priority.medium')}</option>
            <option>{tc('priority.low')}</option>
          </select>
          <select className="filter-input">
            <option>{tc('filters.allCategories')}</option>
            <option>{t('categories.equipment')}</option>
            <option>{t('categories.billing')}</option>
            <option>{t('categories.membership')}</option>
            <option>{t('categories.complaint')}</option>
          </select>
          <select className="filter-input">
            <option>{t('filters.allAssignees')}</option>
            <option>{t('filters.assignedToMe')}</option>
            <option>{t('filters.unassigned')}</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('table.ticketId')}</th>
                <th>{t('table.subject')}</th>
                <th>{t('table.requester')}</th>
                <th>{t('table.category')}</th>
                <th>{t('table.priority')}</th>
                <th>{tc('table.status')}</th>
                <th>{t('table.assignee')}</th>
                <th>{t('table.updated')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const site = getSiteById(ticket.siteId);
                const location = site?.name ?? ticket.siteId;
                const priority = priorityBadge[ticket.priority] ?? { badge: 'badge-secondary', label: ticket.priority };
                const status = statusBadge[ticket.status] ?? { badge: 'badge-secondary', label: ticket.status };
                return (
                  <tr className="clickable" key={ticket.id}>
                    <td><strong>{ticket.id.toUpperCase()}</strong></td>
                    <td>
                      <div className="list-item-title">{ticket.subject}</div>
                      <div className="list-item-subtitle">{location}</div>
                    </td>
                    <td>{ticket.createdBy}</td>
                    <td>{categoryLabel[ticket.category] ?? ticket.category}</td>
                    <td><span className={`badge ${priority.badge}`}>{priority.label}</span></td>
                    <td><span className={`badge ${status.badge}`}>{status.label}</span></td>
                    <td>{getAssigneeLabel(ticket.assigneeId)}</td>
                    <td>{formatUpdatedAt(ticket.createdAt)}</td>
                    <td><button className="btn btn-icon btn-ghost sm">...</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('pagination.showing', { from: 1, to: tickets.length, total: 23 })}</span>
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
