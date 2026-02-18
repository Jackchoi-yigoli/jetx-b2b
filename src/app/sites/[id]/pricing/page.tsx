import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function SitePricingPage() {
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
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/sites">{t('breadcrumb.sites')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Main Street
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Main Street</h1>
            <p className="page-subtitle">ABC Car Wash Co. &middot; 123 Main Street, City, State 12345</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('pricing.previewPrices')}</button>
            <button className="btn btn-primary">{t('pricing.saveChanges')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('pricing.kpi.membershipRevenue')}</div>
          <div className="kpi-value">$12,450</div>
          <div className="kpi-change positive">+8% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('pricing.kpi.activeMembers')}</div>
          <div className="kpi-value">234</div>
          <div className="kpi-change positive">+12 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('pricing.kpi.promoRedemptions')}</div>
          <div className="kpi-value">89</div>
          <div className="kpi-change positive">This month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('pricing.kpi.avgTransaction')}</div>
          <div className="kpi-value">$22.40</div>
          <div className="kpi-change positive">+5% vs last month</div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('pricing.cards.pricingConfiguration')}</div>
            <button className="btn btn-text">{t('pricing.config.editOverrides')}</button>
          </div>
          <div className="card-body">
            <div className="config-row mb-16">
              <div className="config-label">{t('pricing.config.pricingTemplate')}</div>
              <div className="config-value">
                <select className="form-select">
                  <option>Taiwan Standard</option>
                  <option>Taiwan Premium</option>
                  <option>Taiwan Budget</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>{t('pricing.table.service')}</th>
                    <th>{t('pricing.table.templatePrice')}</th>
                    <th>{t('pricing.table.siteOverride')}</th>
                    <th>{t('pricing.table.effectivePrice')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Wash</td>
                    <td>$12.00</td>
                    <td><span className="text-muted">&mdash;</span></td>
                    <td><strong>$12.00</strong></td>
                  </tr>
                  <tr>
                    <td>Premium Wash</td>
                    <td>$18.00</td>
                    <td><span className="text-success">+$2.00</span></td>
                    <td><strong>$20.00</strong></td>
                  </tr>
                  <tr>
                    <td>Ultimate Wash</td>
                    <td>$25.00</td>
                    <td><span className="text-muted">&mdash;</span></td>
                    <td><strong>$25.00</strong></td>
                  </tr>
                  <tr>
                    <td>Wax Add-on</td>
                    <td>$8.00</td>
                    <td><span className="text-muted">&mdash;</span></td>
                    <td><strong>$8.00</strong></td>
                  </tr>
                  <tr>
                    <td>Tire Shine</td>
                    <td>$5.00</td>
                    <td><span className="text-muted">&mdash;</span></td>
                    <td><strong>$5.00</strong></td>
                  </tr>
                  <tr>
                    <td>Interior Clean</td>
                    <td>$15.00</td>
                    <td><span className="text-error">-$3.00</span></td>
                    <td><strong>$12.00</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('pricing.cards.dynamicPricingRules')}</div>
            <a href="/pricing" className="card-link">{t('pricing.dynamicRules.manageRules')}</a>
          </div>
          <div className="card-body">
            <div className="toggle-list">
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-title">{t('pricing.dynamicRules.peakHoursPricing')}</div>
                  <div className="toggle-description">{t('pricing.dynamicRules.peakHoursDesc')}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-title">{t('pricing.dynamicRules.weekendPricing')}</div>
                  <div className="toggle-description">{t('pricing.dynamicRules.weekendDesc')}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-title">{t('pricing.dynamicRules.holidayPricing')}</div>
                  <div className="toggle-description">{t('pricing.dynamicRules.holidayDesc')}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-title">{t('pricing.dynamicRules.rainyDayDiscount')}</div>
                  <div className="toggle-description">{t('pricing.dynamicRules.rainyDayDesc')}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div className="current-modifier mt-16">
              <div className="modifier-label">{t('pricing.dynamicRules.currentModifier')}</div>
              <div className="modifier-value text-success">+20% (Peak Hours Active)</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('pricing.cards.acceptedMemberships')}</div>
            <a href="/memberships" className="card-link">{t('pricing.memberships.managePlans')}</a>
          </div>
          <div className="card-body">
            <div className="membership-list">
              <div className="membership-item">
                <div className="membership-checkbox">
                  <input type="checkbox" id="plan1" defaultChecked />
                </div>
                <label htmlFor="plan1" className="membership-info">
                  <div className="membership-name">Unlimited Wash</div>
                  <div className="membership-price">$99/month</div>
                </label>
                <div className="membership-stats">
                  <span className="member-count">156 members</span>
                  <span className="member-revenue">$15,444/mo</span>
                </div>
                <div className="membership-override">
                  <span className="text-muted">{t('pricing.memberships.noOverride')}</span>
                </div>
              </div>
              <div className="membership-item">
                <div className="membership-checkbox">
                  <input type="checkbox" id="plan2" defaultChecked />
                </div>
                <label htmlFor="plan2" className="membership-info">
                  <div className="membership-name">Premium Plan</div>
                  <div className="membership-price">$59/month</div>
                </label>
                <div className="membership-stats">
                  <span className="member-count">52 members</span>
                  <span className="member-revenue">$3,068/mo</span>
                </div>
                <div className="membership-override">
                  <span className="text-muted">{t('pricing.memberships.noOverride')}</span>
                </div>
              </div>
              <div className="membership-item">
                <div className="membership-checkbox">
                  <input type="checkbox" id="plan3" defaultChecked />
                </div>
                <label htmlFor="plan3" className="membership-info">
                  <div className="membership-name">Basic Plan</div>
                  <div className="membership-price">$29/month</div>
                </label>
                <div className="membership-stats">
                  <span className="member-count">26 members</span>
                  <span className="member-revenue">$754/mo</span>
                </div>
                <div className="membership-override">
                  <span className="text-success">$25/mo (site)</span>
                </div>
              </div>
              <div className="membership-item disabled">
                <div className="membership-checkbox">
                  <input type="checkbox" id="plan4" />
                </div>
                <label htmlFor="plan4" className="membership-info">
                  <div className="membership-name">Corporate Fleet</div>
                  <div className="membership-price">Custom pricing</div>
                </label>
                <div className="membership-stats">
                  <span className="text-muted">{t('pricing.memberships.notEnabled')}</span>
                </div>
                <div className="membership-override">
                  <span className="text-muted">&mdash;</span>
                </div>
              </div>
            </div>
            <div className="membership-summary mt-16">
              <div className="summary-row">
                <span className="summary-label">{t('pricing.memberships.totalActiveMembers')}</span>
                <span className="summary-value">234</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">{t('pricing.memberships.monthlyMembershipRevenue')}</span>
                <span className="summary-value">$19,266</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('pricing.cards.activeCampaigns')}</div>
            <a href="/marketing" className="card-link">{t('pricing.campaigns.manageCampaigns')}</a>
          </div>
          <div className="card-body">
            <div className="campaign-list">
              <div className="campaign-item active">
                <div className="campaign-status">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="campaign-info">
                  <div className="campaign-name">Holiday Special</div>
                  <div className="campaign-details">20% off all washes &middot; Dec 1-31</div>
                </div>
                <div className="campaign-stats">
                  <span className="campaign-redemptions">45 redemptions</span>
                  <span className="badge badge-success">{tc('status.active')}</span>
                </div>
              </div>
              <div className="campaign-item active">
                <div className="campaign-status">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="campaign-info">
                  <div className="campaign-name">New Member Bonus</div>
                  <div className="campaign-details">First wash free with signup &middot; Ongoing</div>
                </div>
                <div className="campaign-stats">
                  <span className="campaign-redemptions">12 signups</span>
                  <span className="badge badge-success">{tc('status.active')}</span>
                </div>
              </div>
              <div className="campaign-item">
                <div className="campaign-status">
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="campaign-info">
                  <div className="campaign-name">Refer-a-Friend</div>
                  <div className="campaign-details">$10 off for referrer and referee</div>
                </div>
                <div className="campaign-stats">
                  <span className="campaign-redemptions">&mdash;</span>
                  <span className="badge badge-secondary">{tc('status.disabled')}</span>
                </div>
              </div>
              <div className="campaign-item scheduled">
                <div className="campaign-status">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="campaign-info">
                  <div className="campaign-name">New Year Special</div>
                  <div className="campaign-details">Buy 5 get 1 free &middot; Jan 1-15</div>
                </div>
                <div className="campaign-stats">
                  <span className="campaign-redemptions">&mdash;</span>
                  <span className="badge badge-warning">{tc('status.scheduled')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header">
          <div className="card-title">{t('pricing.cards.revenueByPaymentType')}</div>
        </div>
        <div className="card-body">
          <div className="revenue-breakdown">
            <div className="revenue-item">
              <div className="revenue-bar" style={{width: '45%'}}></div>
              <div className="revenue-info">
                <span className="revenue-label">{t('pricing.revenue.membership')}</span>
                <span className="revenue-value">$19,266</span>
                <span className="revenue-percent">45%</span>
              </div>
            </div>
            <div className="revenue-item">
              <div className="revenue-bar secondary" style={{width: '35%'}}></div>
              <div className="revenue-info">
                <span className="revenue-label">{t('pricing.revenue.payPerWash')}</span>
                <span className="revenue-value">$15,012</span>
                <span className="revenue-percent">35%</span>
              </div>
            </div>
            <div className="revenue-item">
              <div className="revenue-bar tertiary" style={{width: '12%'}}></div>
              <div className="revenue-info">
                <span className="revenue-label">{t('pricing.revenue.promotions')}</span>
                <span className="revenue-value">$5,148</span>
                <span className="revenue-percent">12%</span>
              </div>
            </div>
            <div className="revenue-item">
              <div className="revenue-bar quaternary" style={{width: '8%'}}></div>
              <div className="revenue-info">
                <span className="revenue-label">{t('pricing.revenue.addOns')}</span>
                <span className="revenue-value">$3,432</span>
                <span className="revenue-percent">8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
