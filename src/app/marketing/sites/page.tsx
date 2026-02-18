import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function MarketingSitesPage() {
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
          {t('sitesPage.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('sitesPage.pageTitle')}</h1>
            <p className="page-subtitle">{t('sitesPage.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('sitesPage.bulkUpdate')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              {t('sitesPage.exportMatrix')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('sitesPage.kpi.totalSites')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change neutral">{t('sitesPage.kpi.activeLocations')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sitesPage.kpi.fullParticipation')}</div>
          <div className="kpi-value">7</div>
          <div className="kpi-change positive">{t('sitesPage.kpi.sitesWithAllCampaigns')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sitesPage.kpi.partialOptOut')}</div>
          <div className="kpi-value">4</div>
          <div className="kpi-change neutral">{t('sitesPage.kpi.sitesWithSomeOptOuts')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('sitesPage.kpi.avgCampaignCoverage')}</div>
          <div className="kpi-value">92%</div>
          <div className="kpi-change positive">{t('sitesPage.kpi.acrossAllSites')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <h3>{t('sitesPage.matrix.cardTitle')}</h3>
          <p className="card-description">{t('sitesPage.matrix.cardDesc')}</p>
        </div>
        <div className="matrix-scroll">
          <table className="matrix-table">
            <thead>
              <tr>
                <th className="sticky-col">{t('sitesPage.matrix.table.site')}</th>
                <th>{t('sitesPage.matrix.table.holidaySpecial')}</th>
                <th>{t('sitesPage.matrix.table.referAFriend')}</th>
                <th>{t('sitesPage.matrix.table.weekendWarrior')}</th>
                <th>{t('sitesPage.matrix.table.newYearSale')}</th>
                <th>{t('sitesPage.matrix.table.birthdayBonus')}</th>
                <th>{t('campaigns.table.redemptions')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Taipei Main Station', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '1,890' },
                { name: 'Xinyi District', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '2,450' },
                { name: 'Banqiao Station', operator: 'XYZ Motors', cols: ['active', 'active', 'opted-out', 'scheduled', 'active'], redemptions: '980' },
                { name: 'Taoyuan Airport', operator: 'ABC Car Wash', cols: ['active', 'active', 'opted-out', 'opted-out', 'active'], redemptions: '1,560' },
                { name: 'Zhonghe Industrial', operator: 'XYZ Motors', cols: ['active', 'active', 'opted-out', 'scheduled', 'active'], redemptions: '780' },
                { name: 'Nangang Tech Park', operator: 'Clean Fleet', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '1,120' },
                { name: 'Neihu Science', operator: 'Clean Fleet', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '1,340' },
                { name: 'Xindian Riverside', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '890' },
                { name: 'Tucheng Industrial', operator: 'XYZ Motors', cols: ['active', 'active', 'opted-out', 'scheduled', 'active'], redemptions: '650' },
                { name: 'Sanchong Gateway', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '1,080' },
                { name: 'Yonghe District', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'scheduled', 'active'], redemptions: '920' },
                { name: 'Linkou Outlet', operator: 'ABC Car Wash', cols: ['active', 'active', 'active', 'opted-out', 'active'], redemptions: '1,540' },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="sticky-col">
                    <div className="cell-primary">{row.name}</div>
                    <div className="cell-secondary">{row.operator}</div>
                  </td>
                  {row.cols.map((status, i) => (
                    <td key={i}><span className={`status-dot ${status}`}></span></td>
                  ))}
                  <td>{row.redemptions}</td>
                  <td><Link href="/sites" className="btn btn-sm">{tc('actions.configure')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="legend-inline">
            <span className="status-dot active"></span> {tc('status.active')}
            <span className="status-dot scheduled"></span> {tc('status.scheduled')}
            <span className="status-dot opted-out"></span> {t('activation.optedOut')}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('sitesPage.coverage.cardTitle')}</h3>
          </div>
          <div className="coverage-list">
            {[
              { name: 'Holiday Special', count: '12/12 sites', width: '100%', cls: '' },
              { name: 'Refer a Friend', count: '12/12 sites', width: '100%', cls: '' },
              { name: 'Birthday Bonus', count: '12/12 sites', width: '100%', cls: '' },
              { name: 'Weekend Warrior', count: '8/12 sites', width: '67%', cls: 'partial' },
              { name: 'New Year Sale', count: '10/12 sites', width: '83%', cls: 'scheduled' },
            ].map((item) => (
              <div key={item.name} className="coverage-item">
                <div className="coverage-header">
                  <strong>{item.name}</strong>
                  <span>{item.count}</span>
                </div>
                <div className="coverage-bar">
                  <div className={`coverage-fill${item.cls ? ` ${item.cls}` : ''}`} style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('sitesPage.topSites.cardTitle')}</h3>
          </div>
          <div className="site-ranking">
            {[
              { rank: '1', cls: 'gold', name: 'Xinyi District', detail: '5/5 campaigns active', value: '2,450' },
              { rank: '2', cls: 'silver', name: 'Taipei Main Station', detail: '5/5 campaigns active', value: '1,890' },
              { rank: '3', cls: 'bronze', name: 'Taoyuan Airport', detail: '3/5 campaigns active', value: '1,560' },
              { rank: '4', cls: '', name: 'Linkou Outlet', detail: '4/5 campaigns active', value: '1,540' },
              { rank: '5', cls: '', name: 'Neihu Science', detail: '5/5 campaigns active', value: '1,340' },
            ].map((item) => (
              <div key={item.name} className="ranking-item">
                <span className={`rank${item.cls ? ` ${item.cls}` : ''}`}>{item.rank}</span>
                <div className="ranking-info">
                  <strong>{item.name}</strong>
                  <span>{item.detail}</span>
                </div>
                <div className="ranking-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('sitesPage.optOuts.cardTitle')}</h3>
          <p className="card-description">{t('sitesPage.optOuts.cardDesc')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('sitesPage.matrix.table.site')}</th>
                <th>{t('campaigns.table.campaign')}</th>
                <th>{t('sitesPage.optOuts.table.reason')}</th>
                <th>{t('sitesPage.optOuts.table.optedOut')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taoyuan Airport</td>
                <td>Weekend Warrior</td>
                <td>High weekend traffic already - no discount needed</td>
                <td>Nov 15, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
              <tr>
                <td>Taoyuan Airport</td>
                <td>New Year Sale</td>
                <td>Airport location runs separate holiday promotions</td>
                <td>Dec 1, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
              <tr>
                <td>Banqiao Station</td>
                <td>Weekend Warrior</td>
                <td>Lower weekend traffic - focusing on weekday promos</td>
                <td>Oct 20, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
              <tr>
                <td>Zhonghe Industrial</td>
                <td>Weekend Warrior</td>
                <td>Industrial area closed on weekends</td>
                <td>Sep 1, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
              <tr>
                <td>Tucheng Industrial</td>
                <td>Weekend Warrior</td>
                <td>Industrial area closed on weekends</td>
                <td>Sep 1, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
              <tr>
                <td>Linkou Outlet</td>
                <td>New Year Sale</td>
                <td>Outlet mall runs competing promotions</td>
                <td>Dec 5, 2024</td>
                <td><button className="btn btn-sm">{t('sitesPage.optOuts.reEnable')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .matrix-scroll { overflow-x: auto; }
        .matrix-table { min-width: 900px; width: 100%; border-collapse: collapse; }
        .matrix-table th,
        .matrix-table td {
          text-align: center; padding: 12px 16px;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.85rem;
        }
        .matrix-table th {
          font-weight: 500; color: var(--color-text-muted);
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;
          background: var(--color-bg-tertiary);
        }
        .matrix-table th:first-child,
        .matrix-table td:first-child { text-align: left; }
        .sticky-col {
          position: sticky; left: 0;
          background: white; z-index: 1;
        }
        .cell-primary { font-size: 0.85rem; font-weight: 500; color: var(--color-text-primary); }
        .cell-secondary { font-size: 0.75rem; color: var(--color-text-muted); }
        .status-dot {
          display: inline-block; width: 12px; height: 12px; border-radius: 50%;
        }
        .status-dot.active { background: #22c55e; }
        .status-dot.scheduled { background: #f59e0b; }
        .status-dot.opted-out { background: #e2e8f0; }
        .table-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1.5rem; border-top: 1px solid var(--color-border);
          font-size: 0.8rem;
        }
        .coverage-list { padding: 20px 24px; }
        .coverage-item { margin-bottom: 16px; }
        .coverage-item:last-child { margin-bottom: 0; }
        .coverage-header {
          display: flex; justify-content: space-between;
          margin-bottom: 8px; font-size: 14px;
        }
        .coverage-header strong { color: #1e293b; }
        .coverage-header span { color: #64748b; }
        .coverage-bar { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
        .coverage-fill { height: 100%; background: #22c55e; border-radius: 4px; }
        .coverage-fill.partial { background: #f59e0b; }
        .coverage-fill.scheduled { background: #3b82f6; }
        .site-ranking { padding: 16px 24px; }
        .ranking-item {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 0; border-bottom: 1px solid #f1f5f9;
        }
        .ranking-item:last-child { border-bottom: none; }
        .rank {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: #f1f5f9; border-radius: 50%;
          font-weight: 600; font-size: 13px; color: #64748b;
        }
        .rank.gold { background: #fef3c7; color: #f59e0b; }
        .rank.silver { background: #e2e8f0; color: #64748b; }
        .rank.bronze { background: #fed7aa; color: #ea580c; }
        .ranking-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .ranking-info strong { font-size: 14px; color: #1e293b; }
        .ranking-info span { font-size: 12px; color: #64748b; }
        .ranking-value { font-weight: 600; font-size: 14px; color: #1e293b; }
        .legend-inline {
          display: flex; align-items: center; gap: 16px;
          font-size: 13px; color: #64748b;
        }
        .legend-inline .status-dot { margin-right: 6px; }
        .card-description { font-size: 0.8rem; color: var(--color-text-muted); margin: 0; }
      `}</style>
    </DashboardLayout>
  );
}
