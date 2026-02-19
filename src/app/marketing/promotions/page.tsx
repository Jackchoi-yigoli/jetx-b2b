import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';
import PromotionsTable from './PromotionsTable';
import BarChart from '@/components/ui/BarChart';

const promoData = [
  { id: 'promo-1', code: 'HOLIDAY20', description: 'Holiday 20% off all washes', discount: '20% off', discountBadge: 'badge-success', sites: 'All Sites', usesLimit: '1,234 / 5,000', validPeriod: 'Dec 1 - Dec 31', revenue: '$18,420', status: 'active' },
  { id: 'promo-2', code: 'FIRSTWASH', description: 'First time customer discount', discount: '50% off', discountBadge: 'badge-success', sites: 'All Sites', usesLimit: '5,678 / unlimited', validPeriod: 'Ongoing', revenue: '$42,100', status: 'active' },
  { id: 'promo-3', code: 'AIRPORT15', description: 'Airport exclusive discount', discount: '15% off', discountBadge: 'badge-success', sites: 'Taoyuan Only', sitesBadge: 'badge-warning', usesLimit: '456 / 1,000', validPeriod: 'Ongoing', revenue: '$8,920', status: 'active' },
  { id: 'promo-4', code: 'BIRTHDAY', description: 'Free wash on your birthday', discount: 'Free Wash', discountBadge: 'badge-premium', sites: 'All Sites', usesLimit: '234 / 1 per user', validPeriod: 'Ongoing', revenue: '$5,850', status: 'active' },
  { id: 'promo-5', code: 'MEMBER10', description: 'Membership sign-up bonus', discount: '$10 off', discountBadge: 'badge-success', sites: 'All Sites', usesLimit: '890 / unlimited', validPeriod: 'Ongoing', revenue: '$15,200', status: 'active' },
  { id: 'promo-6', code: 'REFERRAL', description: 'Refer a friend reward', discount: 'Free Wash', discountBadge: 'badge-premium', sites: 'All Sites', usesLimit: '1,456 / unlimited', validPeriod: 'Ongoing', revenue: '$28,400', status: 'active' },
  { id: 'promo-7', code: 'NEWYEAR25', description: 'New Year 2025 celebration', discount: '25% off', discountBadge: 'badge-success', sites: 'All Sites', usesLimit: '0 / 10,000', validPeriod: 'Jan 1 - Jan 7', revenue: '-', status: 'scheduled' },
  { id: 'promo-8', code: 'FLASH30', description: 'Flash sale 30% off', discount: '30% off', discountBadge: 'badge-success', sites: '3 Sites', sitesBadge: 'badge-warning', usesLimit: '2,100 / 2,500', validPeriod: 'Nov 20 - Nov 30', revenue: '$12,600', status: 'expired' },
];

export default async function PromotionsPage() {
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
          {t('tabs.promotions')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('promotions.pageTitle')}</h1>
            <p className="page-subtitle">{t('promotions.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{tc('actions.export')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('promotions.createPromoCode')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('promotions.kpi.activePromoCodes')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change neutral">{t('promotions.kpi.expiringSoon', { count: 4 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.totalRedemptions')}</div>
          <div className="kpi-value">7,602</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+18%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('promotions.kpi.discountValueGiven')}</div>
          <div className="kpi-value">$24.8K</div>
          <div className="kpi-change neutral">{t('promotions.kpi.thisMonth')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('promotions.kpi.revenueGenerated')}</div>
          <div className="kpi-value">$86.4K</div>
          <div className="kpi-change positive">{t('promotions.kpi.roi')}</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="card">
        <div className="card-header">
          <h3>{t('promoCodes.cardTitle')}</h3>
        </div>
        <PromotionsTable data={promoData} />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('promotions.topPerforming.cardTitle')}</h3>
          </div>
          <div className="promo-ranking">
            {[
              { rank: '1', cls: 'gold', code: 'FIRSTWASH', uses: '5,678 uses', value: '$42.1K' },
              { rank: '2', cls: 'silver', code: 'REFERRAL', uses: '1,456 uses', value: '$28.4K' },
              { rank: '3', cls: 'bronze', code: 'HOLIDAY20', uses: '1,234 uses', value: '$18.4K' },
              { rank: '4', cls: '', code: 'MEMBER10', uses: '890 uses', value: '$15.2K' },
              { rank: '5', cls: '', code: 'AIRPORT15', uses: '456 uses', value: '$8.9K' },
            ].map((item) => (
              <div key={item.code} className="ranking-item">
                <span className={`rank${item.cls ? ` ${item.cls}` : ''}`}>{item.rank}</span>
                <div className="ranking-info">
                  <span className="promo-code small">{item.code}</span>
                  <span>{item.uses}</span>
                </div>
                <div className="ranking-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('promotions.redemptionTrend.cardTitle')}</h3>
          </div>
          <div className="card-body">
            <BarChart bars={[
              { label: 'W1', value: 342 },
              { label: 'W2', value: 478 },
              { label: 'W3', value: 612 },
              { label: 'W4', value: 756 },
            ]} height={160} showValues />
          </div>
          <div className="chart-legend">
            <span>{t('promotions.redemptionTrend.legendDesc')}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('promotions.autoApply.cardTitle')}</h3>
          <p className="card-description">{t('promotions.autoApply.cardDesc')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('promotions.autoApply.table.promotion')}</th>
                <th>{t('promotions.autoApply.table.triggerCondition')}</th>
                <th>{t('promoCodes.table.discount')}</th>
                <th>{t('promoCodes.table.sites')}</th>
                <th>{t('promotions.autoApply.table.appliedThisMonth')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('promotions.autoApply.loyaltyMilestone')}</strong></td>
                <td>{t('promotions.autoApply.loyaltyMilestoneTrigger')}</td>
                <td>{t('promotions.autoApply.freeBasicWash')}</td>
                <td><span className="badge badge-info">{t('promoCodes.allSites')}</span></td>
                <td>342</td>
                <td><span className="badge badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('promotions.autoApply.memberAnniversary')}</strong></td>
                <td>{t('promotions.autoApply.memberAnniversaryTrigger')}</td>
                <td>{t('promotions.autoApply.freeUltimateWash')}</td>
                <td><span className="badge badge-info">{t('promoCodes.allSites')}</span></td>
                <td>89</td>
                <td><span className="badge badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('promotions.autoApply.bulkPurchase')}</strong></td>
                <td>{t('promotions.autoApply.bulkPurchaseTrigger')}</td>
                <td>{t('promotions.autoApply.bulkPurchaseDiscount')}</td>
                <td><span className="badge badge-info">{t('promoCodes.allSites')}</span></td>
                <td>156</td>
                <td><span className="badge badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm">{tc('actions.edit')}</button></td>
              </tr>
              <tr>
                <td><strong>{t('promotions.autoApply.offPeakHours')}</strong></td>
                <td>{t('promotions.autoApply.offPeakHoursTrigger')}</td>
                <td>{t('promotions.autoApply.offPeakHoursDiscount')}</td>
                <td><span className="badge badge-warning">8 Sites</span></td>
                <td>1,240</td>
                <td><span className="badge badge-success">{tc('status.active')}</span></td>
                <td><button className="btn btn-sm">{tc('actions.edit')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('promotions.recentRedemptions.cardTitle')}</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('promotions.recentRedemptions.table.time')}</th>
                <th>{t('promotions.recentRedemptions.table.customer')}</th>
                <th>{t('promoCodes.table.code')}</th>
                <th>{t('promotions.recentRedemptions.table.site')}</th>
                <th>{t('promotions.recentRedemptions.table.original')}</th>
                <th>{t('promoCodes.table.discount')}</th>
                <th>{t('promotions.recentRedemptions.table.final')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2 min ago</td>
                <td>Amy Chen (#45892)</td>
                <td><span className="promo-code small">HOLIDAY20</span></td>
                <td>Xinyi District</td>
                <td>$25.00</td>
                <td className="text-success">-$5.00</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <td>8 min ago</td>
                <td>Kevin Liu (#45891)</td>
                <td><span className="promo-code small">FIRSTWASH</span></td>
                <td>Taipei Main</td>
                <td>$18.00</td>
                <td className="text-success">-$9.00</td>
                <td>$9.00</td>
              </tr>
              <tr>
                <td>15 min ago</td>
                <td>Jessica Wang (#45890)</td>
                <td><span className="promo-code small">REFERRAL</span></td>
                <td>Banqiao Station</td>
                <td>$12.00</td>
                <td className="text-success">-$12.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>22 min ago</td>
                <td>Tom Chen (#45889)</td>
                <td><span className="promo-code small">MEMBER10</span></td>
                <td>Neihu Tech</td>
                <td>$59.00</td>
                <td className="text-success">-$10.00</td>
                <td>$49.00</td>
              </tr>
              <tr>
                <td>31 min ago</td>
                <td>Lisa Lin (#45888)</td>
                <td><span className="promo-code small">AIRPORT15</span></td>
                <td>Taoyuan Airport</td>
                <td>$30.00</td>
                <td className="text-success">-$4.50</td>
                <td>$25.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .promo-code {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 4px;
          color: #E85D5D;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        .promo-code.small { font-size: 12px; padding: 3px 8px; }
        .promo-ranking { padding: 16px 24px; }
        .ranking-item {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
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
        .ranking-info {
          flex: 1; display: flex; flex-direction: column; gap: 4px;
        }
        .ranking-info span:last-child { font-size: 12px; color: #64748b; }
        .ranking-value { font-weight: 600; font-size: 14px; color: #1e293b; }
        .chart-legend {
          padding: 12px 24px;
          text-align: center;
          font-size: 13px; color: #64748b;
          border-top: 1px solid #f1f5f9;
        }
        .badge-premium { background: rgba(232, 93, 93, 0.1); color: #E85D5D; }
        .filter-group { display: flex; gap: 8px; }
        .form-select-sm {
          padding: 6px 28px 6px 12px;
          font-size: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") no-repeat right 6px center;
          background-size: 14px;
          appearance: none;
        }
        .text-success { color: #22c55e; font-weight: 500; }
      `}</style>
    </DashboardLayout>
  );
}
