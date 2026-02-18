import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function AddOperatorPage() {
  const t = await getTranslations('operators');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.partners')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/operators">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('add.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('add.title')}</h1>
            <p className="page-subtitle">{t('add.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="form-progress">
        <div className="progress-step active">
          <span className="step-number">1</span>
          <span className="step-label">{t('add.steps.companyInfo')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">2</span>
          <span className="step-label">{t('add.steps.contactDetails')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">3</span>
          <span className="step-label">{t('add.steps.contractTerms')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">4</span>
          <span className="step-label">{t('add.steps.review')}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.companyInfo.title')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>{t('add.companyInfo.companyName')}</label>
              <input type="text" className="form-input" placeholder={t('add.companyInfo.companyNamePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.businessRegNumber')}</label>
              <input type="text" className="form-input" placeholder="e.g., 12345678" />
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.taxId')}</label>
              <input type="text" className="form-input" placeholder="e.g., 12345678" />
            </div>
            <div className="form-group full-width">
              <label>{t('add.companyInfo.businessAddress')}</label>
              <input type="text" className="form-input" placeholder={t('add.companyInfo.streetAddress')} />
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.city')}</label>
              <input type="text" className="form-input" placeholder={t('add.companyInfo.city')} />
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.regionState')}</label>
              <select className="form-select">
                <option value="">{t('add.companyInfo.selectRegion')}</option>
                <option value="north">{t('filters.north')}</option>
                <option value="central">{t('filters.central')}</option>
                <option value="south">{t('filters.south')}</option>
                <option value="east">{t('filters.east')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.postalCode')}</label>
              <input type="text" className="form-input" placeholder="e.g., 100" />
            </div>
            <div className="form-group">
              <label>{t('add.companyInfo.country')}</label>
              <select className="form-select">
                <option value="TW">Taiwan</option>
                <option value="HK">Hong Kong</option>
                <option value="SG">Singapore</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.primaryContact.title')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.primaryContact.firstName')}</label>
              <input type="text" className="form-input" placeholder={t('add.primaryContact.firstName')} />
            </div>
            <div className="form-group">
              <label>{t('add.primaryContact.lastName')}</label>
              <input type="text" className="form-input" placeholder={t('add.primaryContact.lastName')} />
            </div>
            <div className="form-group">
              <label>{t('add.primaryContact.positionTitle')}</label>
              <input type="text" className="form-input" placeholder={t('add.primaryContact.positionPlaceholder')} />
            </div>
            <div className="form-group">
              <label>{tc('table.email')}</label>
              <input type="email" className="form-input" placeholder="email@company.com" />
            </div>
            <div className="form-group">
              <label>{tc('table.phone')}</label>
              <input type="tel" className="form-input" placeholder="+886-XXX-XXX-XXX" />
            </div>
            <div className="form-group">
              <label>{t('add.primaryContact.mobile')}</label>
              <input type="tel" className="form-input" placeholder="+886-XXX-XXX-XXX" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.contractTerms.title')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.contractTerms.contractType')}</label>
              <select className="form-select">
                <option value="">{t('add.contractTerms.selectType')}</option>
                <option value="franchise">{t('filters.franchise')}</option>
                <option value="license">{t('filters.license')}</option>
                <option value="partnership">{t('filters.partnership')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.territory')}</label>
              <select className="form-select">
                <option value="">{t('add.contractTerms.selectTerritory')}</option>
                <option value="north">{t('add.contractTerms.northRegion')}</option>
                <option value="central">{t('add.contractTerms.centralRegion')}</option>
                <option value="south">{t('add.contractTerms.southRegion')}</option>
                <option value="east">{t('add.contractTerms.eastRegion')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.exclusiveTerritory')}</label>
              <select className="form-select">
                <option value="yes">{t('add.contractTerms.exclusive')}</option>
                <option value="no">{t('add.contractTerms.nonExclusive')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.siteLimit')}</label>
              <input type="number" className="form-input" placeholder={t('add.contractTerms.siteLimitPlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.contractStartDate')}</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.contractEndDate')}</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.revenueShare')}</label>
              <input type="number" className="form-input" placeholder="e.g., 15" min="0" max="100" />
            </div>
            <div className="form-group">
              <label>{t('add.contractTerms.minAnnualRevenue')}</label>
              <input type="number" className="form-input" placeholder="e.g., 500000" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.userAccount.title')}</h3>
          <span className="card-subtitle">{t('add.userAccount.subtitle')}</span>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.userAccount.username')}</label>
              <input type="text" className="form-input" placeholder={t('add.userAccount.usernamePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('add.userAccount.emailForLogin')}</label>
              <input type="email" className="form-input" placeholder="login@company.com" />
            </div>
            <div className="form-group full-width">
              <label>
                <input type="checkbox" defaultChecked /> {t('add.userAccount.sendWelcomeEmail')}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.documents.title')}</h3>
        </div>
        <div className="form-section">
          <div className="upload-area">
            <div className="upload-placeholder">
              <svg className="upload-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="upload-text">{t('add.documents.dragDrop')}</div>
              <div className="upload-hint">{t('add.documents.hint')}</div>
              <button className="btn btn-secondary">{t('add.documents.browseFiles')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions-bar">
        <div className="form-actions-left">
          <Link href="/operators" className="btn btn-secondary">{tc('actions.cancel')}</Link>
        </div>
        <div className="form-actions-right">
          <button className="btn btn-secondary">{tc('actions.saveAsDraft')}</button>
          <button className="btn btn-primary">{t('add.createOperator')}</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
