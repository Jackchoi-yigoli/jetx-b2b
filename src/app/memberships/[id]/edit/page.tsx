import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function MembershipPlanEditPage() {
  const t = await getTranslations('memberships');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/memberships">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.planTemplates')}
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span>Premium (Edit)</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>P</span>
              {t('edit.title')}
            </h1>
            <p className="page-subtitle">{t('edit.subtitle')}</p>
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
          <div className="kpi-label">{t('edit.kpi.activeSubscribers')}</div>
          <div className="kpi-value">5,890</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +124 this month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('edit.kpi.monthlyRevenue')}</div>
          <div className="kpi-value">$347.5K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            +6.2% vs last month
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('edit.kpi.sitesOffering')}</div>
          <div className="kpi-value">12</div>
          <div className="kpi-change neutral">{t('edit.kpi.allSitesEnabled')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('edit.kpi.avgRetention')}</div>
          <div className="kpi-value">14.2 mo</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            Above avg (12.1 mo)
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-column">
          <div className="card">
            <div className="card-header">
              <h3>{t('edit.sections.basicInfo')}</h3>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label className="form-label">{t('edit.fields.planName')}</label>
                <input type="text" className="form-input" defaultValue="Premium" />
              </div>
              <div className="form-group">
                <label className="form-label">{tc('table.description')}</label>
                <textarea className="form-input form-textarea" rows={3} defaultValue="8 washes/month, 20% off add-ons, priority queue" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.fields.planIconColor')}</label>
                <div className="color-picker">
                  <div className="color-option basic" title="Blue (Basic)"></div>
                  <div className="color-option premium selected" title="Coral (Premium)"></div>
                  <div className="color-option unlimited" title="Gold (Unlimited)"></div>
                  <div className="color-option custom" title="Custom">+</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.fields.planStatus')}</label>
                <div className="toggle-group">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{tc('status.active')}</span>
                  </label>
                  <span className="form-hint">{t('edit.fields.planStatusHint')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('edit.sections.pricing')}</h3>
              <p className="card-description">{t('edit.sections.pricingDescription')}</p>
            </div>
            <div className="form-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('edit.fields.basePrice')}</label>
                  <div className="input-group">
                    <span className="input-prefix">$</span>
                    <input type="number" className="form-input" defaultValue={59} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('edit.fields.billingCycle')}</label>
                  <select className="form-select" defaultValue="monthly">
                    <option value="monthly">{t('edit.billingCycleOptions.monthly')}</option>
                    <option value="quarterly">{t('edit.billingCycleOptions.quarterly')}</option>
                    <option value="annual">{t('edit.billingCycleOptions.annual')}</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.fields.annualDiscount')}</label>
                <div className="input-group">
                  <input type="number" className="form-input" defaultValue={15} />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">Annual price: $602.10/year ($50.18/mo effective)</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('edit.sections.membershipScope')}</h3>
            </div>
            <div className="form-body">
              <div className="form-group">
                <div className="radio-group">
                  <label className="radio-option">
                    <input type="radio" name="scope" value="single" />
                    <span className="radio-custom"></span>
                    <div className="radio-content">
                      <strong>{t('scope.singleSite')}</strong>
                      <span>{t('edit.scopeDescriptions.singleSite')}</span>
                    </div>
                  </label>
                  <label className="radio-option selected">
                    <input type="radio" name="scope" value="multi" defaultChecked />
                    <span className="radio-custom"></span>
                    <div className="radio-content">
                      <strong>{t('scope.multiSite')}</strong>
                      <span>{t('edit.scopeDescriptions.multiSite')}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="card">
            <div className="card-header">
              <h3>{t('edit.sections.planBenefits')}</h3>
              <p className="card-description">{t('edit.sections.planBenefitsDescription')}</p>
            </div>
            <div className="form-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('edit.fields.washesPerMonth')}</label>
                  <select className="form-select" defaultValue="8">
                    <option value="4">4 washes</option>
                    <option value="6">6 washes</option>
                    <option value="8">8 washes</option>
                    <option value="12">12 washes</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('edit.fields.addonDiscount')}</label>
                  <div className="input-group">
                    <input type="number" className="form-input" defaultValue={20} />
                    <span className="input-suffix">%</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.fields.pointsMultiplier')}</label>
                <select className="form-select" defaultValue="1.5">
                  <option value="1">1x (Standard)</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('edit.fields.additionalBenefits')}</label>
                <div className="checkbox-list">
                  <label className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox-custom"></span>
                    <span>{t('edit.benefits.priorityQueue')}</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span className="checkbox-custom"></span>
                    <span>{t('edit.benefits.freeVacuum')}</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span className="checkbox-custom"></span>
                    <span>{t('edit.benefits.freeInteriorWipe')}</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox-custom"></span>
                    <span>{t('edit.benefits.memberOnlyPromotions')}</span>
                  </label>
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    <span className="checkbox-custom"></span>
                    <span>{t('edit.benefits.freeTireShine')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('edit.sections.siteAvailability')}</h3>
              <p className="card-description">{t('edit.sections.siteAvailabilityDescription')}</p>
            </div>
            <div className="form-body">
              <div className="site-select-header">
                <label className="checkbox-option select-all">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-custom"></span>
                  <span>{t('edit.fields.selectAllSites')}</span>
                </label>
                <span className="sites-count">12 of 12 selected</span>
              </div>
              <div className="site-checkbox-list">
                {[
                  { name: 'Taipei Main Station', price: '$59/mo', override: false },
                  { name: 'Xinyi District', price: '$65/mo', override: true },
                  { name: 'Banqiao Station', price: '$59/mo', override: false },
                  { name: 'Taoyuan Airport', price: '$69/mo', override: true },
                  { name: 'Zhonghe Industrial', price: '$49/mo', override: true },
                  { name: 'Nangang Tech Park', price: '$59/mo', override: false },
                  { name: 'Neihu Science', price: '$59/mo', override: false },
                  { name: 'Xindian Riverside', price: '$59/mo', override: false },
                  { name: 'Tucheng Industrial', price: '$59/mo', override: false },
                  { name: 'Sanchong Gateway', price: '$59/mo', override: false },
                  { name: 'Yonghe District', price: '$59/mo', override: false },
                  { name: 'Linkou Outlet', price: '$59/mo', override: false },
                ].map((site) => (
                  <label key={site.name} className="checkbox-option site-item">
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox-custom"></span>
                    <div className="site-info">
                      <span className="site-name">{site.name}</span>
                      <span className={`site-price${site.override ? ' override' : ''}`}>
                        {site.price} {site.override && <span className="override-icon">⚙</span>}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="form-hint" style={{ marginTop: '12px' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t('edit.fields.siteOverrideHint')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-danger">
        <div className="card-header">
          <h3>{t('edit.dangerZone.title')}</h3>
        </div>
        <div className="danger-zone">
          <div className="danger-item">
            <div className="danger-info">
              <strong>{t('edit.dangerZone.archiveTitle')}</strong>
              <span>{t('edit.dangerZone.archiveDescription')}</span>
            </div>
            <button className="btn btn-warning">{t('edit.dangerZone.archiveButton')}</button>
          </div>
          <div className="danger-item">
            <div className="danger-info">
              <strong>{t('edit.dangerZone.deleteTitle')}</strong>
              <span>{t('edit.dangerZone.deleteDescription')}</span>
            </div>
            <button className="btn btn-danger" disabled title="Cannot delete: 5,890 active subscribers">{t('edit.dangerZone.deleteButton')}</button>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <div className="action-bar-left">
          <span className="last-saved">Last saved: Dec 7, 2024 at 2:30 PM</span>
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
