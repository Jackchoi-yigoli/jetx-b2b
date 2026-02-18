import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function CampaignEditPage() {
  const t = await getTranslations('marketing');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/marketing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/marketing">{t('tabs.campaigns')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          Holiday Season Special
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('edit.pageTitle')}</h1>
            <p className="page-subtitle">{t('edit.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>{tc('status.active')}</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <div className="form-actions-left">
          <button className="btn btn-primary">{tc('actions.save')}</button>
          <button className="btn btn-secondary">{t('edit.preview')}</button>
        </div>
        <Link href="/marketing" className="btn">{tc('actions.cancel')}</Link>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3>{t('edit.basicInfo')}</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('edit.campaignName')} <span className="required">*</span></label>
            <input type="text" className="form-input" defaultValue="Holiday Season Special" />
          </div>
          <div className="form-group">
            <label className="form-label">{t('edit.campaignType')}</label>
            <select className="form-input form-select">
              <option value="seasonal">{t('edit.types.seasonal')}</option>
              <option value="referral">{t('edit.types.referral')}</option>
              <option value="recurring">{t('edit.types.recurring')}</option>
              <option value="flash">{t('edit.types.flashSale')}</option>
              <option value="loyalty">{t('edit.types.loyalty')}</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{tc('table.description')}</label>
          <textarea className="form-input form-textarea" defaultValue="Get 20% off all premium wash packages during the holiday season. Valid at all participating locations." />
          <div className="form-hint">{t('edit.descriptionHint')}</div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('edit.campaignColor')}</label>
          <div className="color-picker">
            <div className="color-option selected" style={{ background: '#10B981' }} title="Green"></div>
            <div className="color-option" style={{ background: '#3B82F6' }} title="Blue"></div>
            <div className="color-option" style={{ background: '#F5C869' }} title="Yellow"></div>
            <div className="color-option" style={{ background: '#E85D5D' }} title="Red"></div>
            <div className="color-option" style={{ background: '#9333EA' }} title="Purple"></div>
            <div className="color-option" style={{ background: '#F97316' }} title="Orange"></div>
            <div className="color-option" style={{ background: '#EC4899' }} title="Pink"></div>
            <div className="color-option" style={{ background: '#6366F1' }} title="Indigo"></div>
          </div>
        </div>

        <div className="campaign-preview">
          <div className="preview-icon" style={{ background: '#10B981' }}>H</div>
          <div className="preview-info">
            <div className="name">Holiday Season Special</div>
            <div className="desc">20% off all premium washes</div>
          </div>
          <span className="badge badge-muted">{t('edit.preview')}</span>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
          </div>
          <h3>{t('edit.offerDetails')}</h3>
        </div>

        <div className="form-group">
          <label className="form-label">{t('edit.offerType')}</label>
          <div className="offer-type-cards">
            <div className="offer-type-card selected">
              <div className="icon">%</div>
              <div className="label">{t('edit.offerTypes.percentageOff')}</div>
              <div className="desc">{t('edit.offerTypes.percentageOffExample')}</div>
            </div>
            <div className="offer-type-card">
              <div className="icon">$</div>
              <div className="label">{t('edit.offerTypes.fixedAmount')}</div>
              <div className="desc">{t('edit.offerTypes.fixedAmountExample')}</div>
            </div>
            <div className="offer-type-card">
              <div className="icon">0</div>
              <div className="label">{t('edit.offerTypes.freeItem')}</div>
              <div className="desc">{t('edit.offerTypes.freeItemExample')}</div>
            </div>
            <div className="offer-type-card">
              <div className="icon">+</div>
              <div className="label">{t('edit.offerTypes.freeUpgrade')}</div>
              <div className="desc">{t('edit.offerTypes.freeUpgradeExample')}</div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('edit.discountValue')} <span className="required">*</span></label>
            <input type="number" className="form-input" defaultValue={20} min={1} max={100} />
            <div className="form-hint">{t('edit.discountValueHint')}</div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('edit.appliesTo')}</label>
            <select className="form-input form-select">
              <option value="premium">{t('edit.appliesToOptions.premiumOnly')}</option>
              <option value="all">{t('edit.appliesToOptions.allTypes')}</option>
              <option value="basic">{t('edit.appliesToOptions.basicOnly')}</option>
              <option value="addons">{t('edit.appliesToOptions.addonsOnly')}</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('edit.promoCode')}</label>
          <input type="text" className="form-input" defaultValue="HOLIDAY20" placeholder={t('edit.promoCodePlaceholder')} />
          <div className="form-hint">{t('edit.promoCodeHint')}</div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3>{t('edit.durationSchedule')}</h3>
        </div>

        <div className="duration-toggle">
          <div className="duration-option selected">{t('edit.fixedDates')}</div>
          <div className="duration-option">{t('edit.ongoing')}</div>
          <div className="duration-option">{t('edit.recurring')}</div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('edit.startDate')} <span className="required">*</span></label>
            <input type="date" className="form-input" defaultValue="2024-12-01" />
          </div>
          <div className="form-group">
            <label className="form-label">{t('edit.endDate')} <span className="required">*</span></label>
            <input type="date" className="form-input" defaultValue="2024-12-31" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3>{t('edit.usageLimits')}</h3>
        </div>

        <div className="usage-limit-row">
          <div className="form-group">
            <label className="form-label">{t('edit.totalRedemptionLimit')}</label>
            <input type="number" className="form-input" defaultValue={5000} placeholder={t('promoCodes.unlimited')} />
            <div className="form-hint">{t('edit.totalRedemptionLimitHint')}</div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('edit.perCustomerLimit')}</label>
            <select className="form-input form-select">
              <option value="unlimited">{t('promoCodes.unlimited')}</option>
              <option value="1">{t('edit.perCustomerOptions.one')}</option>
              <option value="2">{t('edit.perCustomerOptions.two')}</option>
              <option value="3">{t('edit.perCustomerOptions.three')}</option>
              <option value="5">{t('edit.perCustomerOptions.five')}</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <div className="toggle-switch">
            <div className="toggle active"></div>
            <span className="toggle-label">{t('edit.combineMembership')}</span>
          </div>
        </div>
        <div className="form-group">
          <div className="toggle-switch">
            <div className="toggle"></div>
            <span className="toggle-label">{t('edit.combinePromotions')}</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3>{t('edit.siteTargeting')}</h3>
          <span className="badge badge-info" style={{ marginLeft: 'auto' }}>{t('edit.sitesSelected', { count: 12, total: 12 })}</span>
        </div>

        <div className="site-list">
          <div className="site-list-header">
            <span className="count">{t('edit.allSitesEligible')}</span>
            <div className="site-list-actions">
              <button>{t('edit.selectAll')}</button>
              <button>{t('edit.deselectAll')}</button>
            </div>
          </div>
          {[
            { name: 'Taipei Main Station', meta: '1,890 redemptions this campaign' },
            { name: 'Xinyi District', meta: '2,450 redemptions this campaign' },
            { name: 'Banqiao Station', meta: '980 redemptions this campaign' },
            { name: 'Taoyuan Airport', meta: '1,560 redemptions this campaign' },
            { name: 'Zhonghe Industrial', meta: '780 redemptions this campaign' },
            { name: 'Sanchong District', meta: '620 redemptions this campaign' },
            { name: 'Neihu Technology Park', meta: '890 redemptions this campaign' },
            { name: 'Songshan Airport', meta: '450 redemptions this campaign' },
            { name: 'Tucheng Industrial', meta: '340 redemptions this campaign' },
            { name: 'Xindian District', meta: '510 redemptions this campaign' },
            { name: 'Linkou Outlet', meta: '720 redemptions this campaign' },
            { name: 'Yonghe District', meta: '280 redemptions this campaign' },
          ].map((site) => (
            <div key={site.name} className="site-item">
              <input type="checkbox" className="site-checkbox" defaultChecked />
              <div className="site-info">
                <div className="site-name">{site.name}</div>
                <div className="site-meta">{site.meta}</div>
              </div>
              <span className="badge badge-success">{tc('status.active')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3>{t('edit.eligibilityRules')}</h3>
          <span className="badge badge-muted" style={{ marginLeft: 'auto' }}>{t('edit.optional')}</span>
        </div>

        <div className="eligibility-rules">
          <div className="rule-row">
            <select className="rule-field">
              <option>{t('edit.ruleFields.customerType')}</option>
              <option>{t('edit.ruleFields.membership')}</option>
              <option>{t('edit.ruleFields.totalVisits')}</option>
              <option>{t('edit.ruleFields.lastVisit')}</option>
              <option>{t('edit.ruleFields.pointsBalance')}</option>
            </select>
            <select className="rule-operator">
              <option>{t('edit.ruleOperators.is')}</option>
              <option>{t('edit.ruleOperators.isNot')}</option>
            </select>
            <select className="rule-value">
              <option>{t('edit.ruleValues.allCustomers')}</option>
              <option>{t('edit.ruleValues.newCustomers')}</option>
              <option>{t('edit.ruleValues.returningCustomers')}</option>
              <option>{t('edit.ruleValues.membersOnly')}</option>
            </select>
            <button className="rule-remove">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <button className="add-rule-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            {t('edit.addRule')}
          </button>
        </div>
      </div>

      <div className="form-section danger-zone">
        <div className="form-section-header">
          <div className="section-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3>{t('edit.dangerZone')}</h3>
        </div>

        <div className="danger-actions">
          <button className="btn-danger-outline">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t('edit.pauseCampaign')}
          </button>
          <button className="btn-danger-outline">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            {t('edit.archiveCampaign')}
          </button>
          <button className="btn-danger-outline">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            {t('edit.cloneCampaign')}
          </button>
          <button className="btn-danger-outline" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            {t('edit.deleteCampaign')}
          </button>
        </div>
      </div>

      <div className="form-actions">
        <div className="form-actions-left">
          <button className="btn btn-primary">{tc('actions.save')}</button>
          <button className="btn btn-secondary">{t('edit.preview')}</button>
        </div>
        <Link href="/marketing" className="btn">{tc('actions.cancel')}</Link>
      </div>

      <style>{`
        .form-section {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .form-section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        .form-section-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .section-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group:last-child {
          margin-bottom: 0;
        }
        .form-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }
        .required { color: var(--color-primary); }
        .form-input {
          width: 100%;
          padding: 0.65rem 0.9rem;
          font-size: 0.9rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
          font-family: inherit;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-light);
        }
        .form-textarea { min-height: 80px; resize: vertical; }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .form-hint {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-top: 0.35rem;
        }
        .color-picker { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .color-option {
          width: 32px; height: 32px;
          border-radius: var(--radius-md);
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.15s;
        }
        .color-option:hover { transform: scale(1.1); }
        .color-option.selected {
          border-color: var(--color-text-primary);
          box-shadow: 0 0 0 2px var(--color-bg-primary);
        }
        .campaign-preview {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 1rem;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-md);
          margin-top: 1rem;
        }
        .preview-icon {
          width: 40px; height: 40px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 1.1rem; color: white;
        }
        .preview-info .name { font-weight: 600; font-size: 0.95rem; }
        .preview-info .desc { font-size: 0.8rem; color: var(--color-text-muted); }
        .offer-type-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .offer-type-card {
          padding: 1rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          text-align: center;
          transition: all 0.15s;
        }
        .offer-type-card:hover { border-color: var(--color-text-muted); }
        .offer-type-card.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
        }
        .offer-type-card .icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .offer-type-card .label { font-size: 0.8rem; font-weight: 500; }
        .offer-type-card .desc { font-size: 0.7rem; color: var(--color-text-muted); margin-top: 0.25rem; }
        .duration-toggle { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .duration-option {
          flex: 1; padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          text-align: center; cursor: pointer;
          font-size: 0.85rem; font-weight: 500;
          transition: all 0.15s;
        }
        .duration-option:hover { border-color: var(--color-text-muted); }
        .duration-option.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
          color: var(--color-primary);
        }
        .usage-limit-row { display: flex; gap: 1rem; align-items: flex-end; }
        .usage-limit-row .form-group { flex: 1; }
        .toggle-switch { display: flex; align-items: center; gap: 0.75rem; }
        .toggle {
          position: relative; width: 44px; height: 24px;
          background: var(--color-bg-tertiary);
          border-radius: 12px; cursor: pointer; transition: all 0.2s;
        }
        .toggle.active { background: var(--color-primary); }
        .toggle::after {
          content: ''; position: absolute;
          top: 2px; left: 2px;
          width: 20px; height: 20px;
          background: white; border-radius: 50%;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .toggle.active::after { left: 22px; }
        .toggle-label { font-size: 0.85rem; color: var(--color-text-secondary); }
        .site-list {
          max-height: 300px; overflow-y: auto;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .site-list-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.75rem 1rem;
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border);
          position: sticky; top: 0;
        }
        .site-list-header .count { font-size: 0.8rem; color: var(--color-text-muted); }
        .site-list-actions { display: flex; gap: 0.5rem; }
        .site-list-actions button {
          font-size: 0.75rem; padding: 0.25rem 0.5rem;
          background: none; border: 1px solid var(--color-border);
          border-radius: var(--radius-sm); cursor: pointer;
          color: var(--color-text-secondary);
        }
        .site-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        .site-item:last-child { border-bottom: none; }
        .site-item:hover { background: var(--color-bg-tertiary); }
        .site-checkbox {
          width: 18px; height: 18px;
          border-radius: var(--radius-sm);
          accent-color: var(--color-primary);
        }
        .site-info { flex: 1; }
        .site-name { font-size: 0.85rem; font-weight: 500; }
        .site-meta { font-size: 0.75rem; color: var(--color-text-muted); }
        .eligibility-rules { display: flex; flex-direction: column; gap: 0.75rem; }
        .rule-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-md);
        }
        .rule-row select, .rule-row input {
          padding: 0.5rem 0.75rem; font-size: 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background: var(--color-bg-primary);
        }
        .rule-field { width: 150px; }
        .rule-operator { width: 120px; }
        .rule-value { flex: 1; }
        .rule-remove {
          padding: 0.4rem; background: none; border: none;
          color: var(--color-text-muted); cursor: pointer;
        }
        .rule-remove:hover { color: var(--color-primary); }
        .add-rule-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-md);
          background: none; color: var(--color-text-muted);
          font-size: 0.85rem; cursor: pointer; width: 100%;
          justify-content: center;
        }
        .add-rule-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .form-actions {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }
        .form-actions-left { display: flex; gap: 0.75rem; }
        .danger-zone { border-color: #FEE2E2; background: #FEF2F2; }
        .danger-zone .form-section-header { border-bottom-color: #FECACA; }
        .danger-zone h3 { color: #B91C1C; }
        .danger-zone .section-icon { background: #FEE2E2; color: #B91C1C; }
        .danger-actions { display: flex; gap: 0.75rem; }
        .btn-danger-outline {
          padding: 0.5rem 1rem;
          border: 1px solid #FCA5A5;
          background: white; color: #B91C1C;
          border-radius: var(--radius-md);
          font-size: 0.85rem; cursor: pointer;
        }
        .btn-danger-outline:hover { background: #FEE2E2; }
      `}</style>
    </DashboardLayout>
  );
}
