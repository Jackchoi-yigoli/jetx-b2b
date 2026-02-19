import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import BarChart from '@/components/ui/BarChart';

export default async function CustomerMembershipsPage() {
  const t = await getTranslations('customers');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/customers/cust-45678' },
    { label: t('tabs.transactions'), href: '/customers/cust-45678/transactions' },
    { label: t('tabs.vehiclesCount', { count: 2 }), href: '/customers/cust-45678/vehicles' },
    { label: t('tabs.membership'), href: '/customers/cust-45678/memberships' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/customers">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Emily Chen
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Emily Chen</h1>
            <p className="page-subtitle">Customer #45678 · Member since March 2023</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('memberships.actions.changePlan')}</button>
            <button className="btn btn-secondary">{t('memberships.actions.pauseMembership')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('memberships.kpi.memberSince')}</div>
          <div className="kpi-value">20 mo</div>
          <div className="kpi-change positive">Jun 15, 2023</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('memberships.kpi.totalPaid')}</div>
          <div className="kpi-value">$1,980</div>
          <div className="kpi-change neutral">20 payments</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('memberships.kpi.washesUsed')}</div>
          <div className="kpi-value">156</div>
          <div className="kpi-change positive">$12.69 effective cost</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('memberships.kpi.nextBilling')}</div>
          <div className="kpi-value">Jan 15</div>
          <div className="kpi-change neutral">$99.00</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="status-banner status-premium mb-24">
        <div className="status-content">
          <span className="membership-badge">{t('memberships.banner.unlimitedMember')}</span>
          <span className="status-date">{t('memberships.banner.activeNextRenewal', { date: 'Jan 15, 2025' })}</span>
        </div>
        <span className="badge badge-success">{t('memberships.banner.autoRenewalOn')}</span>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('memberships.currentPlan')}</div>
            <button className="btn btn-text">{t('memberships.actions.changePlan')}</button>
          </div>
          <div className="card-body">
            <div className="plan-header">
              <div className="plan-name">Unlimited Wash</div>
              <div className="plan-price">$99<span>/month</span></div>
            </div>
            <div className="plan-features mt-16">
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.unlimitedWashes')}
              </div>
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.allWashLevels')}
              </div>
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.upToVehicles', { count: 3 })}
              </div>
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.addonDiscount', { percent: 10 })}
              </div>
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.priorityLane')}
              </div>
              <div className="feature-item">
                <svg className="feature-check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('memberships.planFeatures.doublePoints')}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('memberships.billingInformation')}</div>
            <button className="btn btn-text">{t('memberships.actions.update')}</button>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">{t('detail.fields.billingCycle')}</span>
                <span className="info-value">15th of each month</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.paymentMethod')}</span>
                <span className="info-value">
                  <div className="payment-method">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M2 10h20" stroke="currentColor" strokeWidth="2" /></svg>
                    Visa ending in 1234
                  </div>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('memberships.fields.cardExpiry')}</span>
                <span className="info-value">08/2026</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('memberships.fields.billingEmail')}</span>
                <span className="info-value">emily.chen@email.com</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.autoRenewal')}</span>
                <span className="info-value"><span className="badge badge-success">{tc('status.enabled')}</span></span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('memberships.fields.nextCharge')}</span>
                <span className="info-value">$99.00 on Jan 15, 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('memberships.membershipValue')}</div>
          </div>
          <div className="card-body">
            <div className="value-stats">
              <div className="value-stat">
                <div className="value-stat-label">{t('memberships.value.thisMonthWashes')}</div>
                <div className="value-stat-value">12</div>
                <div className="value-stat-sublabel">Retail value: $216</div>
              </div>
              <div className="value-stat">
                <div className="value-stat-label">{t('memberships.value.monthlySavings')}</div>
                <div className="value-stat-value text-success">$117</div>
                <div className="value-stat-sublabel">54% saved vs pay-per-wash</div>
              </div>
            </div>
            <div className="progress-section mt-16">
              <div className="progress-header">
                <span className="progress-label">{t('memberships.value.lifetimeRoi')}</span>
                <span className="progress-value text-success">+$821</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="progress-sublabel">Retail value of washes: $2,801 | Membership paid: $1,980</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('memberships.monthlyUsageChart')}</div>
          </div>
          <div className="card-body">
            <BarChart bars={[
              { label: 'Jul', value: 8 },
              { label: 'Aug', value: 10 },
              { label: 'Sep', value: 9 },
              { label: 'Oct', value: 11 },
              { label: 'Nov', value: 14 },
              { label: 'Dec', value: 12 },
            ]} height={160} />
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header">
          <div className="card-title">{t('memberships.billingHistory')}</div>
          <button className="btn btn-secondary btn-sm">{t('memberships.actions.downloadAllInvoices')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('memberships.table.invoiceNumber')}</th>
                <th>{tc('table.date')}</th>
                <th>{tc('table.description')}</th>
                <th>{tc('table.amount')}</th>
                <th>{t('detail.fields.paymentMethod')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#INV-2024-1215</td>
                <td>Dec 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
              <tr>
                <td>#INV-2024-1115</td>
                <td>Nov 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
              <tr>
                <td>#INV-2024-1015</td>
                <td>Oct 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
              <tr>
                <td>#INV-2024-0915</td>
                <td>Sep 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
              <tr>
                <td>#INV-2024-0815</td>
                <td>Aug 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
              <tr>
                <td>#INV-2024-0715</td>
                <td>Jul 15, 2024</td>
                <td>Unlimited Wash - Monthly</td>
                <td>$99.00</td>
                <td>Visa ****1234</td>
                <td><span className="badge badge-success">Paid</span></td>
                <td><button className="btn btn-text btn-sm">{tc('actions.download')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="table-info">{t('memberships.pagination.showingInvoices', { from: 1, to: 6, total: 20 })}</div>
          <div className="pagination">
            <button className="pagination-btn" disabled>{tc('actions.previous')}</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">{tc('actions.next')}</button>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header">
          <div className="card-title">{t('memberships.membershipActions')}</div>
        </div>
        <div className="card-body">
          <div className="action-grid">
            <div className="action-item">
              <div className="action-info">
                <div className="action-title">{t('memberships.actions.changePlan')}</div>
                <div className="action-description">{t('memberships.actionDescriptions.changePlan')}</div>
              </div>
              <button className="btn btn-secondary">{t('memberships.actions.changePlan')}</button>
            </div>
            <div className="action-item">
              <div className="action-info">
                <div className="action-title">{t('memberships.actions.pauseMembership')}</div>
                <div className="action-description">{t('memberships.actionDescriptions.pauseMembership')}</div>
              </div>
              <button className="btn btn-secondary">{t('memberships.actions.pause')}</button>
            </div>
            <div className="action-item">
              <div className="action-info">
                <div className="action-title">{t('memberships.actions.transferMembership')}</div>
                <div className="action-description">{t('memberships.actionDescriptions.transferMembership')}</div>
              </div>
              <button className="btn btn-secondary">{t('memberships.actions.transfer')}</button>
            </div>
            <div className="action-item warning">
              <div className="action-info">
                <div className="action-title">{t('memberships.actions.cancelMembership')}</div>
                <div className="action-description">{t('memberships.actionDescriptions.cancelMembership')}</div>
              </div>
              <button className="btn btn-danger">{tc('actions.cancel')}</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
