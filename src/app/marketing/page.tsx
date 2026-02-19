import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { campaigns, notificationTemplates } from '@/data/marketing';
import { promoCodes } from '@/data/promo-codes';
import { getTranslations } from 'next-intl/server';
import CampaignsTable from './CampaignsTable';

function getPromoSitesBadge(code: (typeof promoCodes)[number], allSitesLabel: string) {
  if (code.siteIds.includes('all')) return <span className="badge-pill badge-info">{allSitesLabel}</span>;
  if (code.siteIds.length === 1) {
    const siteLabel = code.siteIds[0] === 'site-taoyuan-airport' ? 'Taoyuan Only' : code.siteIds[0];
    return <span className="badge-pill badge-warning">{siteLabel}</span>;
  }
  return <span className="badge-pill badge-info">{code.siteIds.length} Sites</span>;
}

function getPromoDiscount(code: (typeof promoCodes)[number]): string {
  if (code.discountType === 'percentage') return `${code.discountValue}% off`;
  if (code.discountType === 'free-service') return '100% off';
  if (code.discountType === 'fixed-amount') return `$${code.discountValue} off`;
  return `${code.discountValue}`;
}

function getPromoValidUntil(code: (typeof promoCodes)[number], ongoingLabel: string): string {
  if (code.validUntil === '2099-12-31') return ongoingLabel;
  const d = new Date(code.validUntil);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getPromoUsesLimit(code: (typeof promoCodes)[number], unlimitedLabel: string, perUserLabel: string): string {
  if (code.usesLimit === null) return unlimitedLabel;
  if (code.usesLimit === 0) return perUserLabel;
  return code.usesLimit.toLocaleString();
}

const pushNotifications = notificationTemplates
  .filter((tmpl) => tmpl.channel === 'push' && tmpl.type === 'promotional' && tmpl.enabled)
  .slice(0, 3);

const activeCampaignCodes = promoCodes
  .filter((p) => p.code !== '' && p.status === 'active')
  .slice(0, 4);

const recentEmailCampaigns = [
  { title: 'December Newsletter', meta: 'All sites · 45,230 sent · Dec 1', opened: '42% opened' },
  { title: 'Your November Wash Summary', meta: 'All sites · 12,450 sent · Nov 30', opened: '65% opened' },
  { title: 'Membership Renewal Reminder', meta: 'Targeted · 890 sent · Nov 25', opened: '58% opened' },
];

export default async function MarketingPage() {
  const t = await getTranslations('marketing');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('title')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('pageTitle')}</h1>
            <p className="page-subtitle">{t('pageSubtitle')}</p>
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

      <div className="tabs">
        <Link className="tab active" href="/marketing">{t('tabs.campaigns')}</Link>
        <Link className="tab" href="/marketing/promotions">{t('tabs.promotions')}</Link>
        <Link className="tab" href="/marketing/sites">{t('tabs.siteTargeting')}</Link>
        <Link className="tab" href="/marketing/notifications">{t('tabs.pushNotifications')}</Link>
        <Link className="tab" href="/marketing/analytics">{t('tabs.analytics')}</Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('campaigns.cardTitle')}</h3>
          <p className="card-body" style={{ margin: 0, fontSize: '0.875rem' }}>{t('campaigns.cardDesc')}</p>
        </div>
        <CampaignsTable data={campaigns} />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('activation.cardTitle')}</h3>
          <p className="card-body" style={{ margin: 0, fontSize: '0.875rem' }}>{t('activation.cardDesc')}</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('activation.table.site')}</th>
                <th>{t('activation.table.holiday')}</th>
                <th>{t('activation.table.referral')}</th>
                <th>{t('activation.table.weekend')}</th>
                <th>{t('activation.table.newYear')}</th>
                <th>{t('activation.table.birthday')}</th>
                <th>{t('campaigns.table.redemptions')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link href="/sites/taipei-main" className="card-link">Taipei Main Station</Link></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-warning">{tc('status.scheduled')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>1,890</td>
                <td><Link href="/sites/taipei-main/marketing" className="btn btn-secondary">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td><Link href="/sites/xinyi" className="card-link">Xinyi District</Link></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-warning">{tc('status.scheduled')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>2,450</td>
                <td><Link href="/sites/xinyi/marketing" className="btn btn-secondary">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td><Link href="/sites/banqiao" className="card-link">Banqiao Station</Link></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill">{t('activation.optedOut')}</span></td>
                <td><span className="badge-pill badge-warning">{tc('status.scheduled')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>980</td>
                <td><Link href="/sites/banqiao/marketing" className="btn btn-secondary">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td><Link href="/sites/taoyuan" className="card-link">Taoyuan Airport</Link></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill">{t('activation.optedOut')}</span></td>
                <td><span className="badge-pill">{t('activation.optedOut')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>1,560</td>
                <td><Link href="/sites/taoyuan/marketing" className="btn btn-secondary">{tc('actions.configure')}</Link></td>
              </tr>
              <tr>
                <td><Link href="/sites/zhonghe" className="card-link">Zhonghe Industrial</Link></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td><span className="badge-pill">{t('activation.optedOut')}</span></td>
                <td><span className="badge-pill badge-warning">{tc('status.scheduled')}</span></td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>780</td>
                <td><Link href="/sites/zhonghe/marketing" className="btn btn-secondary">{tc('actions.configure')}</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge-pill badge-success">{tc('status.active')}</span> {t('activation.legend.campaignRunning')}
            <span className="badge-pill badge-warning">{tc('status.scheduled')}</span> {t('activation.legend.startsLater')}
            <span className="badge-pill">{t('activation.optedOut')}</span> {t('activation.legend.siteOptedOut')}
          </div>
          <Link href="/marketing/sites" className="card-link">{t('activation.viewAllSites', { count: 12 })} →</Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('promoCodes.cardTitle')}</h3>
          <button className="btn btn-secondary">{t('promoCodes.createPromoCode')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('promoCodes.table.code')}</th>
                <th>{tc('table.description')}</th>
                <th>{t('promoCodes.table.discount')}</th>
                <th>{t('promoCodes.table.sites')}</th>
                <th>{t('promoCodes.table.uses')}</th>
                <th>{t('promoCodes.table.limit')}</th>
                <th>{t('promoCodes.table.validUntil')}</th>
                <th>{tc('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {activeCampaignCodes.map((code) => (
                <tr key={code.id}>
                  <td><code>{code.code}</code></td>
                  <td>{code.description.split('.')[0]}</td>
                  <td>{getPromoDiscount(code)}</td>
                  <td>{getPromoSitesBadge(code, t('promoCodes.allSites'))}</td>
                  <td>{code.usesCount.toLocaleString()}</td>
                  <td>{getPromoUsesLimit(code, t('promoCodes.unlimited'), t('promoCodes.onePerUser'))}</td>
                  <td>{getPromoValidUntil(code, t('promoCodes.ongoing'))}</td>
                  <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('performance.cardTitle')}</h3>
        </div>
        <div className="grid-2" style={{ padding: 0 }}>
          <div style={{ padding: '1.25rem', borderRight: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="badge-pill badge-success">{t('performance.topPerformingSite')}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Xinyi District</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{t('performance.highestRedemptionRate', { rate: '5.8%' })}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('kpi.totalRedemptions')}</span>
                <strong>2,450</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('kpi.revenueAttributed')}</span>
                <strong>$12,340</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('performance.campaignsActive')}</span>
                <strong>5/5</strong>
              </div>
            </div>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="badge-pill badge-warning">{t('performance.needsAttention')}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Zhonghe Industrial</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{t('performance.belowAvgRedemptionRate', { rate: '2.1%' })}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('kpi.totalRedemptions')}</span>
                <strong>780</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('kpi.revenueAttributed')}</span>
                <strong>$3,890</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>{t('performance.campaignsActive')}</span>
                <strong>3/5</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('recentPush.cardTitle')}</h3>
            <button className="btn btn-secondary">{t('recentPush.sendNew')}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pushNotifications.map((item, i) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1.25rem', borderTop: i > 0 ? '1px solid var(--color-border)' : undefined }}>
                <div>
                  <div className="list-item-title">{item.subject}</div>
                  <div className="list-item-subtitle">{item.triggerType === 'manual' ? t('recentPush.allSites') : t('recentPush.automated')} · {item.channel}</div>
                </div>
                <span className="badge-pill badge-success">{tc('status.active')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('recentEmail.cardTitle')}</h3>
            <button className="btn btn-secondary">{t('recentEmail.sendNew')}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentEmailCampaigns.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1.25rem', borderTop: i > 0 ? '1px solid var(--color-border)' : undefined }}>
                <div>
                  <div className="list-item-title">{item.title}</div>
                  <div className="list-item-subtitle">{item.meta}</div>
                </div>
                <span className="badge-pill badge-success">{item.opened}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
