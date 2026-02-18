import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function CustomerTransactionsPage() {
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
            <button className="btn btn-secondary">{t('transactions.actions.exportCsv')}</button>
            <button className="btn btn-secondary">{t('actions.issueRefund')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.totalTransactions')}</div>
          <div className="kpi-value">156</div>
          <div className="kpi-change positive">+12 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.totalSpent')}</div>
          <div className="kpi-value">$2,340</div>
          <div className="kpi-change positive">+$180 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.avgTransaction')}</div>
          <div className="kpi-value">$15.00</div>
          <div className="kpi-change neutral">{t('transactions.kpi.addOnsOnly')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('transactions.kpi.pointsEarned')}</div>
          <div className="kpi-value">4,560</div>
          <div className="kpi-change positive">+320 this month</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('transactions.spendingByService')}</div>
          </div>
          <div className="card-body">
            <div className="service-breakdown">
              <div className="service-item">
                <div className="service-info">
                  <span className="service-name">{t('transactions.serviceCategories.membershipFee')}</span>
                  <span className="service-count">$1,188 (20 months)</span>
                </div>
                <div className="service-bar">
                  <div className="service-fill" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-info">
                  <span className="service-name">{t('transactions.serviceCategories.addonServices')}</span>
                  <span className="service-count">$756</span>
                </div>
                <div className="service-bar">
                  <div className="service-fill" style={{ width: '32%' }}></div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-info">
                  <span className="service-name">{t('transactions.serviceCategories.payPerWash')}</span>
                  <span className="service-count">$396</span>
                </div>
                <div className="service-bar">
                  <div className="service-fill" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('transactions.monthlySpendingTrend')}</div>
          </div>
          <div className="card-body">
            <div className="chart-placeholder">{t('transactions.monthlySpendingChartPlaceholder')}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('transactions.transactionHistory')}</div>
          <span className="card-count">{t('transactions.transactionCount', { count: 156 })}</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('transactions.table.transactionId')}</th>
                <th>{t('transactions.table.dateTime')}</th>
                <th>{t('table.site')}</th>
                <th>{t('table.service')}</th>
                <th>{t('table.vehicle')}</th>
                <th>{t('transactions.table.payment')}</th>
                <th>{tc('table.amount')}</th>
                <th>{t('table.points')}</th>
                <th>{tc('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-001</a></td>
                <td>Dec 7, 2024 · 10:32 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>Tesla Model 3</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+25</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-002</a></td>
                <td>Dec 5, 2024 · 3:15 PM</td>
                <td>JetX Daan Station</td>
                <td>Ultimate Wash</td>
                <td>Tesla Model 3</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+35</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-003</a></td>
                <td>Dec 3, 2024 · 11:45 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash + Wax</td>
                <td>Toyota RAV4</td>
                <td>Visa ****1234</td>
                <td>$12.00</td>
                <td><span className="text-success">+37</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-004</a></td>
                <td>Dec 1, 2024 · 9:20 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>Tesla Model 3</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+25</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-005</a></td>
                <td>Nov 28, 2024 · 2:45 PM</td>
                <td>JetX Neihu Station</td>
                <td>Ultimate Wash + Tire Shine</td>
                <td>Tesla Model 3</td>
                <td>Visa ****1234</td>
                <td>$8.00</td>
                <td><span className="text-success">+43</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-006</a></td>
                <td>Nov 25, 2024 · 10:10 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>Toyota RAV4</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+25</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-007</a></td>
                <td>Nov 22, 2024 · 4:30 PM</td>
                <td>JetX Daan Station</td>
                <td>Ultimate Wash</td>
                <td>Tesla Model 3</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+35</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-008</a></td>
                <td>Nov 20, 2024 · 11:00 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash + Interior Clean</td>
                <td>Tesla Model 3</td>
                <td>Visa ****1234</td>
                <td>$18.00</td>
                <td><span className="text-success">+43</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-009</a></td>
                <td>Nov 17, 2024 · 8:45 AM</td>
                <td>JetX Xinyi Station</td>
                <td>Premium Wash</td>
                <td>Tesla Model 3</td>
                <td>Membership</td>
                <td>$0.00</td>
                <td><span className="text-success">+25</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
              <tr className="clickable">
                <td><a href="#">#TXN-45678-010</a></td>
                <td>Nov 15, 2024 · 3:20 PM</td>
                <td>JetX Xinyi Station</td>
                <td>Membership Renewal</td>
                <td>—</td>
                <td>Visa ****1234</td>
                <td>$99.00</td>
                <td><span className="text-success">+100</span></td>
                <td><span className="badge badge-success">{tc('status.completed')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="table-info">{t('transactions.pagination.showingTransactions', { from: 1, to: 10, total: 156 })}</div>
          <div className="pagination">
            <button className="pagination-btn" disabled>{tc('actions.previous')}</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-ellipsis">...</span>
            <button className="pagination-btn">16</button>
            <button className="pagination-btn">{tc('actions.next')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
