import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SiteCustomersPage() {
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
          <Link href="/sites">{t('breadcrumb.sites')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/sites/site-xinyi">Main Street</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb.customers')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street - Customers</h1>
            <p className="page-subtitle">1,245 total customers &middot; 320 active members</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('customers.exportList')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('customers.addCustomer')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('customers.kpi.totalCustomers')}</div>
          <div className="kpi-value">1,245</div>
          <div className="kpi-change positive">+48 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('customers.kpi.activeMembers')}</div>
          <div className="kpi-value">320</div>
          <div className="kpi-change positive">26% of total</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('customers.kpi.avgVisitsPerMonth')}</div>
          <div className="kpi-value">3.2</div>
          <div className="kpi-change positive">+0.4 vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('customers.kpi.customerLtv')}</div>
          <div className="kpi-value">$285</div>
          <div className="kpi-change positive">+12% YoY</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('customers.cards.customerSegments')}</div>
          </div>
          <div className="card-body">
            <div className="segment-list">
              <div className="segment-item">
                <div className="segment-info">
                  <div className="segment-icon premium">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div>
                    <div className="segment-name">{t('customers.segments.premiumMembers')}</div>
                    <div className="segment-desc">{t('customers.segments.premiumMembersDesc')}</div>
                  </div>
                </div>
                <div className="segment-stats">
                  <span className="segment-count">85</span>
                  <span className="segment-revenue">$4,250/mo</span>
                </div>
              </div>
              <div className="segment-item">
                <div className="segment-info">
                  <div className="segment-icon standard">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <div>
                    <div className="segment-name">{t('customers.segments.standardMembers')}</div>
                    <div className="segment-desc">{t('customers.segments.standardMembersDesc')}</div>
                  </div>
                </div>
                <div className="segment-stats">
                  <span className="segment-count">235</span>
                  <span className="segment-revenue">$7,050/mo</span>
                </div>
              </div>
              <div className="segment-item">
                <div className="segment-info">
                  <div className="segment-icon regular">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <div className="segment-name">{t('customers.segments.regularCustomers')}</div>
                    <div className="segment-desc">{t('customers.segments.regularCustomersDesc')}</div>
                  </div>
                </div>
                <div className="segment-stats">
                  <span className="segment-count">412</span>
                  <span className="segment-revenue">$8,650/mo</span>
                </div>
              </div>
              <div className="segment-item">
                <div className="segment-info">
                  <div className="segment-icon occasional">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="segment-name">{t('customers.segments.occasionalVisitors')}</div>
                    <div className="segment-desc">{t('customers.segments.occasionalVisitorsDesc')}</div>
                  </div>
                </div>
                <div className="segment-stats">
                  <span className="segment-count">513</span>
                  <span className="segment-revenue">$5,130/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('customers.cards.visitFrequency')}</div>
          </div>
          <div className="card-body">
            <div className="frequency-chart">
              <div className="frequency-bar">
                <div className="frequency-label">{t('customers.frequency.oneVisit')}</div>
                <div className="frequency-track">
                  <div className="frequency-fill" style={{width: '35%'}}></div>
                </div>
                <div className="frequency-value">436</div>
              </div>
              <div className="frequency-bar">
                <div className="frequency-label">{t('customers.frequency.twoVisits')}</div>
                <div className="frequency-track">
                  <div className="frequency-fill" style={{width: '28%'}}></div>
                </div>
                <div className="frequency-value">349</div>
              </div>
              <div className="frequency-bar">
                <div className="frequency-label">{t('customers.frequency.threeVisits')}</div>
                <div className="frequency-track">
                  <div className="frequency-fill" style={{width: '18%'}}></div>
                </div>
                <div className="frequency-value">224</div>
              </div>
              <div className="frequency-bar">
                <div className="frequency-label">{t('customers.frequency.fourVisits')}</div>
                <div className="frequency-track">
                  <div className="frequency-fill" style={{width: '12%'}}></div>
                </div>
                <div className="frequency-value">150</div>
              </div>
              <div className="frequency-bar">
                <div className="frequency-label">{t('customers.frequency.fivePlusVisits')}</div>
                <div className="frequency-track">
                  <div className="frequency-fill" style={{width: '7%'}}></div>
                </div>
                <div className="frequency-value">86</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('customers.cards.topCustomers')}</div>
          <a href="/customers" className="card-link">{t('customers.viewAllCustomers')}</a>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('customers.table.customer')}</th>
              <th>{t('customers.table.membership')}</th>
              <th>{t('customers.table.visits30d')}</th>
              <th>{t('customers.table.totalSpent')}</th>
              <th>{t('customers.table.avgTicket')}</th>
              <th>{t('customers.table.lastVisit')}</th>
              <th>{t('customers.table.preferredService')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">EC</div>
                  <div>
                    <div className="customer-name">Emily Chen</div>
                    <div className="customer-email">emily.chen@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-primary">Premium</span></td>
              <td><strong>12</strong></td>
              <td>$0 (Unlimited)</td>
              <td>--</td>
              <td>Today, 2:45 PM</td>
              <td>Premium Wash</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">DW</div>
                  <div>
                    <div className="customer-name">David Wang</div>
                    <div className="customer-email">david.wang@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-primary">Premium</span></td>
              <td><strong>10</strong></td>
              <td>$0 (Unlimited)</td>
              <td>--</td>
              <td>Today, 2:31 PM</td>
              <td>Deluxe Wash</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">MH</div>
                  <div>
                    <div className="customer-name">Michael Huang</div>
                    <div className="customer-email">m.huang@company.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-info">Standard</span></td>
              <td><strong>8</strong></td>
              <td>$165.00</td>
              <td>$20.63</td>
              <td>Today, 1:55 PM</td>
              <td>Deluxe + Detail</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">SL</div>
                  <div>
                    <div className="customer-name">Sarah Lin</div>
                    <div className="customer-email">sarah.lin@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-info">Standard</span></td>
              <td><strong>6</strong></td>
              <td>$84.00</td>
              <td>$14.00</td>
              <td>Today, 2:15 PM</td>
              <td>Premium Wash</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">JW</div>
                  <div>
                    <div className="customer-name">Jennifer Wu</div>
                    <div className="customer-email">jen.wu@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-info">Standard</span></td>
              <td><strong>5</strong></td>
              <td>$0 (4-wash plan)</td>
              <td>--</td>
              <td>Today, 1:30 PM</td>
              <td>Basic Wash</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">KL</div>
                  <div>
                    <div className="customer-name">Kevin Lee</div>
                    <div className="customer-email">kevin.lee@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-secondary">Regular</span></td>
              <td><strong>5</strong></td>
              <td>$140.00</td>
              <td>$28.00</td>
              <td>{tc('time.yesterday')}</td>
              <td>Premium Wash</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">AC</div>
                  <div>
                    <div className="customer-name">Amy Chang</div>
                    <div className="customer-email">amy.chang@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-secondary">Regular</span></td>
              <td><strong>4</strong></td>
              <td>$112.00</td>
              <td>$28.00</td>
              <td>{tc('time.daysAgo', { count: 2 })}</td>
              <td>Premium + Wax</td>
            </tr>
            <tr className="clickable-row">
              <td>
                <div className="customer-info">
                  <div className="customer-avatar">TH</div>
                  <div>
                    <div className="customer-name">Tom Ho</div>
                    <div className="customer-email">tom.ho@email.com</div>
                  </div>
                </div>
              </td>
              <td><span className="badge badge-secondary">Regular</span></td>
              <td><strong>4</strong></td>
              <td>$72.00</td>
              <td>$18.00</td>
              <td>{tc('time.daysAgo', { count: 3 })}</td>
              <td>Basic Wash</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
