import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function MarketingAnalyticsPage() {
  const t = await getTranslations('marketing');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.campaigns'), href: '/marketing' },
    { label: t('tabs.promotions'), href: '/marketing/promotions' },
    { label: t('tabs.notifications'), href: '/marketing/notifications' },
    { label: t('tabs.analytics'), href: '/marketing/analytics' },
    { label: t('tabs.sites'), href: '/marketing/sites' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/marketing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.analytics')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('analytics.pageTitle')}</h1>
            <p className="page-subtitle">{t('analytics.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('actions.exportReport')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.createCampaign')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.activeCampaigns')}</div>
          <div className="kpi-value">8</div>
          <div className="kpi-change neutral">{t('kpi.runningAcrossSites', { count: 12 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalRedemptions')}</div>
          <div className="kpi-value">15.2K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+23%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgConversionRate')}</div>
          <div className="kpi-value">4.2%</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+0.8%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.revenueAttributed')}</div>
          <div className="kpi-value">$48K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+15%' })}
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="analytics-grid">
        <div className="roi-card">
          <div className="roi-header">{t('analytics.roi.header')}</div>
          <div className="roi-value">324%</div>
          <div className="roi-desc">{t('analytics.roi.desc')}</div>
          <div className="roi-breakdown">
            <div className="roi-item">
              <div className="label">{t('analytics.roi.totalSpend')}</div>
              <div className="value">$14,800</div>
            </div>
            <div className="roi-item">
              <div className="label">{t('analytics.roi.revenue')}</div>
              <div className="value">$48,000</div>
            </div>
            <div className="roi-item">
              <div className="label">{t('analytics.roi.netProfit')}</div>
              <div className="value">$33,200</div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h4>{t('analytics.channelPerformance.cardTitle')}</h4>
          </div>
          <div className="channel-list">
            <div className="channel-item">
              <div className="channel-icon push">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div className="channel-info">
                <div className="channel-name">{t('analytics.channelPerformance.pushNotifications')}</div>
                <div className="channel-stats">82K sent · 23% open rate</div>
              </div>
              <div className="channel-metric">
                <div className="value">$18.2K</div>
                <div className="label">{t('analytics.roi.revenue')}</div>
              </div>
            </div>
            <div className="channel-item">
              <div className="channel-icon email">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="channel-info">
                <div className="channel-name">{t('analytics.channelPerformance.emailCampaigns')}</div>
                <div className="channel-stats">58K sent · 42% open rate</div>
              </div>
              <div className="channel-metric">
                <div className="value">$15.8K</div>
                <div className="label">{t('analytics.roi.revenue')}</div>
              </div>
            </div>
            <div className="channel-item">
              <div className="channel-icon app">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div className="channel-info">
                <div className="channel-name">{t('analytics.channelPerformance.inAppPromos')}</div>
                <div className="channel-stats">45K impressions · 8% CTR</div>
              </div>
              <div className="channel-metric">
                <div className="value">$9.4K</div>
                <div className="label">{t('analytics.roi.revenue')}</div>
              </div>
            </div>
            <div className="channel-item">
              <div className="channel-icon sms">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div className="channel-info">
                <div className="channel-name">{t('analytics.channelPerformance.sms')}</div>
                <div className="channel-stats">12K sent · 35% open rate</div>
              </div>
              <div className="channel-metric">
                <div className="value">$4.6K</div>
                <div className="label">{t('analytics.roi.revenue')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('analytics.performanceTrend.cardTitle')}</h3>
          <div className="chart-period">
            <button>7D</button>
            <button className="active">30D</button>
            <button>90D</button>
            <button>YTD</button>
          </div>
        </div>
        <div className="line-chart">
          <div className="chart-lines">
            {[
              { label: 'Nov 8', primary: '45%', secondary: '30%' },
              { label: 'Nov 15', primary: '52%', secondary: '35%' },
              { label: 'Nov 22', primary: '48%', secondary: '32%' },
              { label: 'Nov 29', primary: '65%', secondary: '45%' },
              { label: 'Dec 1', primary: '85%', secondary: '58%' },
              { label: 'Dec 3', primary: '92%', secondary: '62%' },
              { label: 'Dec 5', primary: '78%', secondary: '55%' },
              { label: 'Dec 7', primary: '88%', secondary: '60%' },
            ].map((item) => (
              <div key={item.label} className="chart-bar-line">
                <div className="bar primary" style={{ height: item.primary }}></div>
                <div className="bar secondary" style={{ height: item.secondary }}></div>
                <span className="label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <span className="legend-item"><span className="legend-dot primary"></span> {t('analytics.performanceTrend.redemptions')}</span>
          <span className="legend-item"><span className="legend-dot secondary"></span> {t('analytics.performanceTrend.revenueK')}</span>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h4>{t('analytics.conversionFunnel.cardTitle')}</h4>
            <span className="badge badge-info">{t('analytics.conversionFunnel.thisMonth')}</span>
          </div>
          <div className="funnel-chart">
            {[
              { label: t('analytics.conversionFunnel.impressions'), width: '100%', value: '245K', rate: '100%' },
              { label: t('analytics.conversionFunnel.clicked'), width: '42%', value: '102K', rate: '42%' },
              { label: t('analytics.conversionFunnel.startedWash'), width: '18%', value: '44K', rate: '18%' },
              { label: t('analytics.conversionFunnel.redeemed'), width: '6.2%', value: '15.2K', rate: '6.2%' },
            ].map((step) => (
              <div key={step.label} className="funnel-step">
                <div className="funnel-label">{step.label}</div>
                <div className="funnel-bar-container">
                  <div className="funnel-bar" style={{ width: step.width }}>
                    <span className="funnel-value">{step.value}</span>
                  </div>
                </div>
                <div className="funnel-rate">{step.rate}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h4>{t('analytics.topCampaigns.cardTitle')}</h4>
            <Link href="/marketing" className="link-primary" style={{ fontSize: '0.8rem' }}>{tc('actions.viewAll')}</Link>
          </div>
          <div className="campaign-ranking">
            {[
              { rank: '1', cls: 'gold', name: 'Refer a Friend', type: 'Referral · Ongoing', value: '8,920' },
              { rank: '2', cls: 'silver', name: 'Weekend Warrior', type: 'Recurring · Every Sat-Sun', value: '3,450' },
              { rank: '3', cls: 'bronze', name: 'Holiday Season Special', type: 'Seasonal · Dec 1-31', value: '2,340' },
              { rank: '4', cls: '', name: 'Birthday Bonus', type: 'Loyalty · Ongoing', value: '490' },
            ].map((item) => (
              <div key={item.name} className="campaign-rank-item">
                <span className={`rank-number${item.cls ? ` ${item.cls}` : ''}`}>{item.rank}</span>
                <div className="rank-info">
                  <div className="rank-name">{item.name}</div>
                  <div className="rank-type">{item.type}</div>
                </div>
                <div className="rank-metric">
                  <div className="value">{item.value}</div>
                  <div className="label">{t('analytics.topCampaigns.redemptions')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('analytics.performanceBySite.cardTitle')}</h3>
          <div className="btn-group">
            <select className="form-select-sm">
              <option>{tc('filters.all')} Campaigns</option>
              <option>Holiday Season</option>
              <option>Refer a Friend</option>
              <option>Weekend Warrior</option>
            </select>
          </div>
        </div>
        <table className="site-performance-table">
          <thead>
            <tr>
              <th>{t('analytics.performanceBySite.table.site')}</th>
              <th>{t('analytics.conversionFunnel.impressions')}</th>
              <th>{t('campaigns.table.redemptions')}</th>
              <th>{t('kpi.avgConversionRate')}</th>
              <th>{t('analytics.roi.revenue')}</th>
              <th>{t('analytics.performanceBySite.table.performance')}</th>
              <th>{t('analytics.performanceBySite.table.trend')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link href="/sites" className="link-primary">Xinyi District</Link></td>
              <td>42,500</td>
              <td>2,450</td>
              <td>5.8%</td>
              <td>$12,340</td>
              <td className="performance-bar-cell">
                <div className="performance-bar">
                  <div className="performance-bar-fill" style={{ width: '100%', background: 'var(--color-success)' }}></div>
                </div>
              </td>
              <td><span className="trend-indicator positive"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>+12%</span></td>
            </tr>
            <tr>
              <td><Link href="/sites" className="link-primary">Taipei Main Station</Link></td>
              <td>38,200</td>
              <td>1,890</td>
              <td>4.9%</td>
              <td>$9,560</td>
              <td className="performance-bar-cell">
                <div className="performance-bar">
                  <div className="performance-bar-fill" style={{ width: '77%', background: 'var(--color-success)' }}></div>
                </div>
              </td>
              <td><span className="trend-indicator positive"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>+8%</span></td>
            </tr>
            <tr>
              <td><Link href="/sites" className="link-primary">Taoyuan Airport</Link></td>
              <td>32,100</td>
              <td>1,560</td>
              <td>4.9%</td>
              <td>$7,890</td>
              <td className="performance-bar-cell">
                <div className="performance-bar">
                  <div className="performance-bar-fill" style={{ width: '64%', background: 'var(--color-info)' }}></div>
                </div>
              </td>
              <td><span className="trend-indicator positive"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>+5%</span></td>
            </tr>
            <tr>
              <td><Link href="/sites" className="link-primary">Banqiao Station</Link></td>
              <td>24,800</td>
              <td>980</td>
              <td>4.0%</td>
              <td>$4,950</td>
              <td className="performance-bar-cell">
                <div className="performance-bar">
                  <div className="performance-bar-fill" style={{ width: '40%', background: 'var(--color-secondary)' }}></div>
                </div>
              </td>
              <td><span className="trend-indicator neutral"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>0%</span></td>
            </tr>
            <tr>
              <td><Link href="/sites" className="link-primary">Zhonghe Industrial</Link></td>
              <td>18,600</td>
              <td>780</td>
              <td>4.2%</td>
              <td>$3,890</td>
              <td className="performance-bar-cell">
                <div className="performance-bar">
                  <div className="performance-bar-fill" style={{ width: '32%', background: 'var(--color-secondary)' }}></div>
                </div>
              </td>
              <td><span className="trend-indicator negative"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>-3%</span></td>
            </tr>
          </tbody>
        </table>
        <div className="table-footer">
          <span className="text-muted">{t('analytics.performanceBySite.showingTop', { shown: 5, total: 12 })}</span>
          <Link href="/marketing/sites" className="link-primary">{t('analytics.performanceBySite.viewAll')} →</Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('analytics.insights.cardTitle')}</h3>
          <span className="badge badge-info">{t('analytics.insights.aiGenerated')}</span>
        </div>
        <div className="grid-2" style={{ padding: 0 }}>
          <div className="stat-block">
            <div className="stat-header">
              <span className="badge badge-success">{t('analytics.insights.opportunity')}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>{t('analytics.insights.opportunityTitle')}</div>
            <div className="stat-desc">{t('analytics.insights.opportunityDesc')}</div>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-sm btn-primary">{tc('actions.viewDetails')}</button>
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-header">
              <span className="badge badge-warning">{t('analytics.insights.attention')}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>{t('analytics.insights.attentionTitle')}</div>
            <div className="stat-desc">{t('analytics.insights.attentionDesc')}</div>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-sm">{t('analytics.insights.reviewSite')}</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .chart-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }
        .chart-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1rem;
        }
        .chart-header h4 { font-size: 1rem; font-weight: 600; margin: 0; }
        .chart-period { display: flex; gap: 0.25rem; }
        .chart-period button {
          padding: 0.25rem 0.5rem; font-size: 0.75rem;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary); cursor: pointer;
        }
        .chart-period button.active {
          background: var(--color-primary);
          border-color: var(--color-primary); color: white;
        }
        .line-chart { height: 200px; display: flex; flex-direction: column; }
        .chart-lines {
          flex: 1; display: flex; align-items: flex-end; gap: 2px;
          padding-bottom: 1.5rem; position: relative;
        }
        .chart-bar-line {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; gap: 0.25rem;
        }
        .chart-bar-line .bar {
          width: 100%; max-width: 40px;
          border-radius: 4px 4px 0 0; transition: all 0.3s;
        }
        .chart-bar-line .bar.primary { background: var(--color-primary); }
        .chart-bar-line .bar.secondary { background: var(--color-secondary); }
        .chart-bar-line .label {
          font-size: 0.65rem; color: var(--color-text-muted);
          position: absolute; bottom: 0;
        }
        .chart-legend {
          display: flex; gap: 1rem; margin-top: 0.75rem;
          padding-top: 0.75rem; border-top: 1px solid var(--color-border);
        }
        .legend-item {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.75rem; color: var(--color-text-secondary);
        }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
        .legend-dot.primary { background: var(--color-primary); }
        .legend-dot.secondary { background: var(--color-secondary); }
        .funnel-chart { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0; }
        .funnel-step { display: flex; align-items: center; gap: 1rem; }
        .funnel-label { width: 120px; font-size: 0.8rem; color: var(--color-text-secondary); text-align: right; }
        .funnel-bar-container {
          flex: 1; height: 32px;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-sm); overflow: hidden;
        }
        .funnel-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: flex-end;
          padding-right: 0.75rem;
        }
        .funnel-value { font-size: 0.75rem; font-weight: 600; color: white; }
        .funnel-rate { width: 60px; font-size: 0.75rem; color: var(--color-text-muted); }
        .channel-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .channel-item { display: flex; align-items: center; gap: 1rem; }
        .channel-icon {
          width: 36px; height: 36px; border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
        }
        .channel-icon.push { background: #EF444420; color: #EF4444; }
        .channel-icon.email { background: #3B82F620; color: #3B82F6; }
        .channel-icon.sms { background: #10B98120; color: #10B981; }
        .channel-icon.app { background: #8B5CF620; color: #8B5CF6; }
        .channel-info { flex: 1; }
        .channel-name { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.15rem; }
        .channel-stats { font-size: 0.75rem; color: var(--color-text-muted); }
        .channel-metric { text-align: right; }
        .channel-metric .value { font-size: 1rem; font-weight: 600; color: var(--color-text-primary); }
        .channel-metric .label { font-size: 0.7rem; color: var(--color-text-muted); }
        .roi-card {
          background: linear-gradient(135deg, var(--color-primary) 0%, #c94545 100%);
          border-radius: var(--radius-lg); padding: 1.5rem; color: white;
        }
        .roi-header { font-size: 0.85rem; opacity: 0.9; margin-bottom: 0.5rem; }
        .roi-value { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.25rem; }
        .roi-desc { font-size: 0.8rem; opacity: 0.85; margin-bottom: 1.25rem; }
        .roi-breakdown {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
          padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);
        }
        .roi-item .label { font-size: 0.7rem; opacity: 0.8; margin-bottom: 0.15rem; }
        .roi-item .value { font-size: 1.1rem; font-weight: 600; }
        .campaign-ranking { display: flex; flex-direction: column; gap: 0.75rem; }
        .campaign-rank-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-md);
        }
        .rank-number {
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--color-bg-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 600;
          color: var(--color-text-secondary);
        }
        .rank-number.gold { background: #F5C86920; color: #D4A84A; }
        .rank-number.silver { background: #94A3B820; color: #64748B; }
        .rank-number.bronze { background: #CD7F3220; color: #CD7F32; }
        .rank-info { flex: 1; }
        .rank-name { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.15rem; }
        .rank-type { font-size: 0.7rem; color: var(--color-text-muted); }
        .rank-metric { text-align: right; }
        .rank-metric .value { font-size: 0.95rem; font-weight: 600; color: var(--color-success); }
        .rank-metric .label { font-size: 0.65rem; color: var(--color-text-muted); }
        .site-performance-table { width: 100%; }
        .site-performance-table th,
        .site-performance-table td {
          padding: 0.75rem 0.5rem; text-align: left;
          font-size: 0.8rem; border-bottom: 1px solid var(--color-border);
        }
        .site-performance-table th {
          font-weight: 500; color: var(--color-text-muted);
          font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .site-performance-table tbody tr:hover { background: var(--color-bg-tertiary); }
        .performance-bar-cell { width: 120px; }
        .performance-bar {
          height: 6px; background: var(--color-bg-tertiary);
          border-radius: 3px; overflow: hidden;
        }
        .performance-bar-fill { height: 100%; border-radius: 3px; transition: width 0.3s; }
        .trend-indicator {
          display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem;
        }
        .trend-indicator.positive { color: var(--color-success); }
        .trend-indicator.negative { color: var(--color-primary); }
        .trend-indicator.neutral { color: var(--color-text-muted); }
        .table-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--color-border);
          font-size: 0.8rem;
        }
        .text-muted { color: var(--color-text-muted); }
        .stat-block { padding: 1.5rem; border-right: 1px solid var(--color-border); }
        .stat-block:last-child { border-right: none; }
        .stat-header { margin-bottom: 0.75rem; }
        .stat-value { font-weight: 600; margin-bottom: 0.5rem; }
        .stat-desc { font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; }
        .form-select-sm {
          padding: 6px 28px 6px 12px; font-size: 13px;
          border: 1px solid #e2e8f0; border-radius: 6px;
          background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") no-repeat right 6px center;
          background-size: 14px; appearance: none;
        }
      `}</style>
    </DashboardLayout>
  );
}
