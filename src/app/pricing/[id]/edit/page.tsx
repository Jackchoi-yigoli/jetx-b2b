import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function PricingTemplateEditPage() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/pricing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.templates')}
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span>Taiwan Standard ({tc('actions.edit')})</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('edit.pageTitle')}</h1>
            <p className="page-subtitle">{t('edit.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{tc('actions.cancel')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {tc('actions.save')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.sitesUsing')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change neutral">{t('kpi.ofTotalSites', { count: 17 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.monthlyRevenue')}</div>
          <div className="kpi-value">$462.6K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('kpi.vsLastMonth', { pct: '+5.2%' })}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgTransaction')}</div>
          <div className="kpi-value">$18.40</div>
          <div className="kpi-change positive">{t('kpi.includesAddons')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.sitesWithOverrides')}</div>
          <div className="kpi-value">2</div>
          <div className="kpi-change neutral">{t('kpi.pctOfSites', { pct: '17%' })}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-column">
          <div className="card">
            <div className="card-header">
              <h3>{t('edit.basicInfo')}</h3>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label className="form-label">{t('edit.templateName')}</label>
                <input type="text" className="form-input" defaultValue="Taiwan Standard" />
              </div>
              <div className="form-group">
                <label className="form-label">{tc('table.description')}</label>
                <textarea className="form-input form-textarea" rows={2} defaultValue="Default pricing template for standard Taiwan locations" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.templateStatus')}</label>
                <div className="toggle-group">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{tc('status.active')}</span>
                  </label>
                  <span className="form-hint">{t('edit.deactivatingHint')}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.setAsDefault')}</label>
                <div className="toggle-group">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{t('edit.defaultTemplate')}</span>
                  </label>
                  <span className="form-hint">{t('edit.defaultTemplateHint')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('edit.washServicePricing')}</h3>
              <p className="card-description">{t('edit.washServicePricingDesc')}</p>
            </div>
            <div className="form-body">
              <div className="price-tier">
                <div className="tier-header">
                  <div className="tier-info">
                    <span className="tier-icon basic">B</span>
                    <div>
                      <strong>{t('edit.basicWash')}</strong>
                      <span>{t('edit.basicWashDesc')}</span>
                    </div>
                  </div>
                  <div className="tier-price">
                    <span className="input-prefix">$</span>
                    <input type="number" className="form-input price-input" defaultValue="12.00" />
                  </div>
                </div>
                <div className="tier-includes">
                  <span className="include-tag">{t('edit.preSoak')}</span>
                  <span className="include-tag">{t('edit.highPressureWash')}</span>
                  <span className="include-tag">{t('edit.rinse')}</span>
                  <span className="include-tag">{t('edit.airDry')}</span>
                </div>
              </div>

              <div className="price-tier">
                <div className="tier-header">
                  <div className="tier-info">
                    <span className="tier-icon premium">P</span>
                    <div>
                      <strong>{t('edit.premiumWash')}</strong>
                      <span>{t('edit.premiumWashDesc')}</span>
                    </div>
                  </div>
                  <div className="tier-price">
                    <span className="input-prefix">$</span>
                    <input type="number" className="form-input price-input" defaultValue="18.00" />
                  </div>
                </div>
                <div className="tier-includes">
                  <span className="include-tag">{t('edit.allBasicFeatures')}</span>
                  <span className="include-tag">{t('edit.tripleFoam')}</span>
                  <span className="include-tag">{t('edit.wheelCleaner')}</span>
                  <span className="include-tag">{t('edit.spotFreeRinse')}</span>
                </div>
              </div>

              <div className="price-tier">
                <div className="tier-header">
                  <div className="tier-info">
                    <span className="tier-icon ultimate">U</span>
                    <div>
                      <strong>{t('edit.ultimateWash')}</strong>
                      <span>{t('edit.ultimateWashDesc')}</span>
                    </div>
                  </div>
                  <div className="tier-price">
                    <span className="input-prefix">$</span>
                    <input type="number" className="form-input price-input" defaultValue="25.00" />
                  </div>
                </div>
                <div className="tier-includes">
                  <span className="include-tag">{t('edit.allPremiumFeatures')}</span>
                  <span className="include-tag">{t('edit.ceramicCoating')}</span>
                  <span className="include-tag">{t('edit.tireShine')}</span>
                  <span className="include-tag">{t('edit.rainRepellent')}</span>
                  <span className="include-tag">{t('edit.interiorVacuum')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('dynamicRules.cardTitle')}</h3>
              <p className="card-description">{t('edit.dynamicRulesDesc')}</p>
            </div>
            <div className="form-body">
              <div className="dynamic-rule-list">
                <label className="checkbox-option rule-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-custom"></span>
                  <div className="rule-info">
                    <strong>{t('edit.peakHoursSurge')}</strong>
                    <span>{t('edit.peakHoursSurgeDesc')}</span>
                  </div>
                </label>
                <label className="checkbox-option rule-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-custom"></span>
                  <div className="rule-info">
                    <strong>{t('edit.weekendPricing')}</strong>
                    <span>{t('edit.weekendPricingDesc')}</span>
                  </div>
                </label>
                <label className="checkbox-option rule-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-custom"></span>
                  <div className="rule-info">
                    <strong>{t('edit.rainyDayDiscount')}</strong>
                    <span>{t('edit.rainyDayDiscountDesc')}</span>
                  </div>
                </label>
                <label className="checkbox-option rule-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-custom"></span>
                  <div className="rule-info">
                    <strong>{t('edit.earlyBirdDiscount')}</strong>
                    <span>{t('edit.earlyBirdDiscountDesc')}</span>
                  </div>
                </label>
                <label className="checkbox-option rule-option">
                  <input type="checkbox" />
                  <span className="checkbox-custom"></span>
                  <div className="rule-info">
                    <strong>{t('edit.holidayPricing')}</strong>
                    <span>{t('edit.holidayPricingDesc')}</span>
                  </div>
                </label>
              </div>
              <Link href="/pricing/dynamic" className="link-primary" style={{ display: 'block', marginTop: '12px' }}>{t('edit.manageDynamicRules')}</Link>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="card">
            <div className="card-header">
              <h3>{t('edit.addonServicePricing')}</h3>
              <p className="card-description">{t('edit.addonServicePricingDesc')}</p>
            </div>
            <div className="form-body">
              <table className="addon-price-table">
                <thead>
                  <tr>
                    <th>{t('edit.service')}</th>
                    <th>{t('edit.regular')}</th>
                    <th>{t('edit.member')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t('edit.interiorVacuum')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="5.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="4.00" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.dashboardWipe')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="4.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="3.20" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.tireShine')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="3.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="2.40" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.rainRepellent')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="6.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="4.80" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.ceramicCoating')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="15.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="12.00" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.airFreshener')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="2.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="1.60" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.wheelCleaner')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="4.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="3.20" /></div></td>
                  </tr>
                  <tr>
                    <td>{t('edit.undercarriageWash')}</td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="5.00" /></div></td>
                    <td><div className="mini-input-group"><span>$</span><input type="number" defaultValue="4.00" /></div></td>
                  </tr>
                </tbody>
              </table>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">{t('edit.memberDiscount')}</label>
                <div className="input-group" style={{ maxWidth: '150px' }}>
                  <input type="number" className="form-input" defaultValue="20" />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">{t('edit.memberDiscountHint')}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('siteAssignments.cardTitle')}</h3>
              <p className="card-description">{t('edit.siteAssignmentsDesc')}</p>
            </div>
            <div className="form-body">
              <div className="site-select-header">
                <span className="sites-count">{t('edit.sitesAssigned', { count: 12 })}</span>
                <Link href="/pricing/sites" className="link-primary">{tc('actions.manage')} →</Link>
              </div>
              <div className="site-assignment-list">
                <div className="site-assign-item">
                  <span className="site-name">Taipei Main Station</span>
                  <span className="badge badge-success">{t('siteAssignments.noOverrides')}</span>
                </div>
                <div className="site-assign-item">
                  <span className="site-name">Nangang Station</span>
                  <span className="badge badge-success">{t('siteAssignments.noOverrides')}</span>
                </div>
                <div className="site-assign-item">
                  <span className="site-name">Xindian Riverside</span>
                  <span className="badge badge-success">{t('siteAssignments.noOverrides')}</span>
                </div>
                <div className="site-assign-item">
                  <span className="site-name">Neihu Tech Park</span>
                  <span className="badge badge-warning">{t('edit.oneOverride')}</span>
                </div>
                <div className="site-assign-item">
                  <span className="site-name">Linkou Outlet</span>
                  <span className="badge badge-warning">{t('edit.twoOverrides')}</span>
                </div>
                <div className="site-assign-item more">
                  <span>{t('edit.moreSites', { count: 7 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-danger">
        <div className="card-header">
          <h3>{t('edit.dangerZone')}</h3>
        </div>
        <div className="danger-zone">
          <div className="danger-item">
            <div className="danger-info">
              <strong>{t('edit.cloneTemplate')}</strong>
              <span>{t('edit.cloneTemplateDesc')}</span>
            </div>
            <button className="btn btn-secondary">{t('edit.cloneTemplate')}</button>
          </div>
          <div className="danger-item">
            <div className="danger-info">
              <strong>{t('edit.archiveTemplate')}</strong>
              <span>{t('edit.archiveTemplateDesc')}</span>
            </div>
            <button className="btn btn-warning">{t('edit.archive')}</button>
          </div>
          <div className="danger-item">
            <div className="danger-info">
              <strong>{t('edit.deleteTemplate')}</strong>
              <span>{t('edit.deleteTemplateDesc')}</span>
            </div>
            <button className="btn btn-danger" disabled title="Cannot delete: 12 sites assigned">{tc('actions.delete')}</button>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <div className="action-bar-left">
          <span className="last-saved">{t('edit.lastSaved')}</span>
        </div>
        <div className="action-bar-right">
          <button className="btn btn-secondary">{tc('actions.cancel')}</button>
          <button className="btn btn-primary">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {tc('actions.save')}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
