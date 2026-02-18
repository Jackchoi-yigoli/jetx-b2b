import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function OperatorFinancialPage() {
  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.overview'), href: '/operators/op-cleanwash' },
    { label: t('tabs.sites', { count: 12 }), href: '/operators/op-cleanwash/sites' },
    { label: t('tabs.financial'), href: '/operators/op-cleanwash/financial' },
    { label: t('tabs.team'), href: '#' },
    { label: t('tabs.documents'), href: '#' },
    { label: t('tabs.activity'), href: '#' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/operators">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/operators/op-cleanwash">CleanWash Corp</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.financial')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">CleanWash Corp - {t('tabs.financial')}</h1>
            <p className="page-subtitle">{t('financial.subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('financial.exportReport')}</button>
            <button className="btn btn-primary">{t('financial.generateInvoice')}</button>
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('financial.kpi.mtdGrossRevenue')}</div>
          <div className="kpi-value">$245,000</div>
          <div className="kpi-change positive">+15% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('financial.kpi.mtdJetxShare')}</div>
          <div className="kpi-value">$36,750</div>
          <div className="kpi-change positive">+15% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('financial.kpi.ytdGrossRevenue')}</div>
          <div className="kpi-value">$2.8M</div>
          <div className="kpi-change positive">+22% vs last year</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('financial.kpi.ytdJetxShare')}</div>
          <div className="kpi-value">$420,000</div>
          <div className="kpi-change positive">+22% vs last year</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('financial.revenueBySite.title')}</div>
          <div className="filter-group">
            <select className="form-select">
              <option>December 2024</option>
              <option>November 2024</option>
              <option>October 2024</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('financial.revenueBySite.table.site')}</th>
                <th>{t('financial.revenueBySite.table.grossRevenue')}</th>
                <th>{t('financial.revenueBySite.table.transactions')}</th>
                <th>{t('financial.revenueBySite.table.avgTransaction')}</th>
                <th>{t('financial.revenueBySite.table.jetxShare')}</th>
                <th>{t('financial.revenueBySite.table.vsLastMonth')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>CleanWash Xinyi</strong></td>
                <td>$32,500</td>
                <td>1,245</td>
                <td>$26.10</td>
                <td>$4,875</td>
                <td><span className="text-success">+18%</span></td>
              </tr>
              <tr>
                <td><strong>CleanWash Neihu</strong></td>
                <td>$28,100</td>
                <td>1,082</td>
                <td>$25.97</td>
                <td>$4,215</td>
                <td><span className="text-success">+12%</span></td>
              </tr>
              <tr>
                <td><strong>CleanWash Zhongshan</strong></td>
                <td>$24,800</td>
                <td>1,024</td>
                <td>$24.22</td>
                <td>$3,720</td>
                <td><span className="text-success">+8%</span></td>
              </tr>
              <tr>
                <td><strong>CleanWash Songshan</strong></td>
                <td>$22,400</td>
                <td>896</td>
                <td>$25.00</td>
                <td>$3,360</td>
                <td><span className="text-success">+15%</span></td>
              </tr>
              <tr>
                <td><strong>CleanWash Daan</strong></td>
                <td>$18,200</td>
                <td>892</td>
                <td>$20.40</td>
                <td>$2,730</td>
                <td><span className="text-error">-3%</span></td>
              </tr>
              <tr>
                <td><strong>CleanWash Banqiao</strong></td>
                <td>$15,600</td>
                <td>624</td>
                <td>$25.00</td>
                <td>$2,340</td>
                <td><span className="text-success">+5%</span></td>
              </tr>
              <tr>
                <td><strong>{t('financial.revenueBySite.otherSites', { count: 6 })}</strong></td>
                <td>$103,400</td>
                <td>4,137</td>
                <td>$24.99</td>
                <td>$15,510</td>
                <td><span className="text-success">+10%</span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>{t('financial.revenueBySite.table.total')}</strong></td>
                <td><strong>$245,000</strong></td>
                <td><strong>9,900</strong></td>
                <td><strong>$24.75</strong></td>
                <td><strong>$36,750</strong></td>
                <td><strong className="text-success">+15%</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('financial.paymentHistory.title')}</div>
            <Link href="#" className="card-link">{tc('actions.viewAll')}</Link>
          </div>
          <div className="card-body">
            <div className="payment-list">
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Dec 1, 2024</div>
                  <div className="payment-desc">November 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$32,100</div>
                <span className="badge badge-success">{t('financial.paymentHistory.paid')}</span>
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Nov 1, 2024</div>
                  <div className="payment-desc">October 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$29,850</div>
                <span className="badge badge-success">{t('financial.paymentHistory.paid')}</span>
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Oct 1, 2024</div>
                  <div className="payment-desc">September 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$31,200</div>
                <span className="badge badge-success">{t('financial.paymentHistory.paid')}</span>
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Sep 1, 2024</div>
                  <div className="payment-desc">August 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$28,500</div>
                <span className="badge badge-success">{t('financial.paymentHistory.paid')}</span>
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Aug 1, 2024</div>
                  <div className="payment-desc">July 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$27,300</div>
                <span className="badge badge-success">{t('financial.paymentHistory.paid')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('financial.pendingInvoices.title')}</div>
            <Link href="#" className="card-link">{tc('actions.viewAll')}</Link>
          </div>
          <div className="card-body">
            <div className="payment-list">
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Due: Jan 1, 2025</div>
                  <div className="payment-desc">December 2024 Revenue Share</div>
                </div>
                <div className="payment-amount">$36,750</div>
                <span className="badge badge-warning">{tc('status.pending')}</span>
              </div>
              <div className="payment-item">
                <div className="payment-info">
                  <div className="payment-date">Due: Dec 15, 2024</div>
                  <div className="payment-desc">Equipment License Fee (Q4)</div>
                </div>
                <div className="payment-amount">$4,500</div>
                <span className="badge badge-warning">{tc('status.pending')}</span>
              </div>
            </div>
            <div className="invoice-summary">
              <div className="invoice-total">
                <span>{t('financial.pendingInvoices.totalPending')}</span>
                <span className="amount">$41,250</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('financial.monthlyRevenueTrend.title')}</div>
          <div className="legend">
            <span className="legend-item"><span className="legend-dot gross"></span> {t('financial.monthlyRevenueTrend.grossRevenue')}</span>
            <span className="legend-item"><span className="legend-dot share"></span> {t('financial.monthlyRevenueTrend.jetxShare')}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-container">
            <div className="chart-bars-horizontal">
              <div className="chart-row">
                <span className="chart-label">Jan</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '70%' }}></div>
                  <div className="chart-bar share" style={{ width: '10.5%' }}></div>
                </div>
                <span className="chart-value">$175K / $26.3K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Feb</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '68%' }}></div>
                  <div className="chart-bar share" style={{ width: '10.2%' }}></div>
                </div>
                <span className="chart-value">$170K / $25.5K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Mar</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '76%' }}></div>
                  <div className="chart-bar share" style={{ width: '11.4%' }}></div>
                </div>
                <span className="chart-value">$190K / $28.5K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Apr</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '82%' }}></div>
                  <div className="chart-bar share" style={{ width: '12.3%' }}></div>
                </div>
                <span className="chart-value">$205K / $30.8K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">May</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '88%' }}></div>
                  <div className="chart-bar share" style={{ width: '13.2%' }}></div>
                </div>
                <span className="chart-value">$220K / $33K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Jun</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '86%' }}></div>
                  <div className="chart-bar share" style={{ width: '12.9%' }}></div>
                </div>
                <span className="chart-value">$215K / $32.3K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Jul</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '84%' }}></div>
                  <div className="chart-bar share" style={{ width: '12.6%' }}></div>
                </div>
                <span className="chart-value">$210K / $31.5K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Aug</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '80%' }}></div>
                  <div className="chart-bar share" style={{ width: '12%' }}></div>
                </div>
                <span className="chart-value">$200K / $30K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Sep</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '83%' }}></div>
                  <div className="chart-bar share" style={{ width: '12.5%' }}></div>
                </div>
                <span className="chart-value">$208K / $31.2K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Oct</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '79%' }}></div>
                  <div className="chart-bar share" style={{ width: '11.9%' }}></div>
                </div>
                <span className="chart-value">$199K / $29.9K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Nov</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '85%' }}></div>
                  <div className="chart-bar share" style={{ width: '12.8%' }}></div>
                </div>
                <span className="chart-value">$214K / $32.1K</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Dec</span>
                <div className="chart-bar-container">
                  <div className="chart-bar gross" style={{ width: '98%' }}></div>
                  <div className="chart-bar share" style={{ width: '14.7%' }}></div>
                </div>
                <span className="chart-value">$245K / $36.8K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
