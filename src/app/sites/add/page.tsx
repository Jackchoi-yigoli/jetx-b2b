import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function AddSitePage() {
  const t = await getTranslations('sites');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/sites">{t('breadcrumb.sites')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('add.breadcrumbLabel')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('add.pageTitle')}</h1>
            <p className="page-subtitle">{t('add.pageSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="form-progress">
        <div className="progress-step active">
          <span className="step-number">1</span>
          <span className="step-label">{t('add.steps.basicInfo')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">2</span>
          <span className="step-label">{t('add.steps.location')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">3</span>
          <span className="step-label">{t('add.steps.equipment')}</span>
        </div>
        <div className="progress-connector"></div>
        <div className="progress-step">
          <span className="step-number">4</span>
          <span className="step-label">{t('add.steps.review')}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.sections.basicInformation')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.fields.siteName')}</label>
              <input type="text" placeholder={t('add.placeholders.siteName')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.siteCode')}</label>
              <input type="text" placeholder={t('add.placeholders.siteCode')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.operator')}</label>
              <select>
                <option value="">{t('add.placeholders.selectOperator')}</option>
                <option value="cleanwash">CleanWash Corp</option>
                <option value="autospa">AutoSpa Holdings</option>
                <option value="quickshine">QuickShine Ltd</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.fields.siteType')}</label>
              <select>
                <option value="">{t('add.placeholders.selectType')}</option>
                <option value="full">{t('add.siteTypeOptions.fullService')}</option>
                <option value="self">{t('add.siteTypeOptions.selfService')}</option>
                <option value="hybrid">{t('add.siteTypeOptions.hybrid')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.fields.openingDate')}</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>{t('add.fields.status')}</label>
              <select>
                <option value="setup">{t('add.statusOptions.setup')}</option>
                <option value="active">{t('add.statusOptions.active')}</option>
                <option value="maintenance">{t('add.statusOptions.underMaintenance')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.sections.locationDetails')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>{t('add.fields.address')}</label>
              <input type="text" placeholder={t('add.placeholders.streetAddress')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.district')}</label>
              <input type="text" placeholder={t('add.placeholders.district')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.city')}</label>
              <input type="text" placeholder={t('add.placeholders.city')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.postalCode')}</label>
              <input type="text" placeholder={t('add.placeholders.postalCode')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.country')}</label>
              <select>
                <option value="TW">Taiwan</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.fields.latitude')}</label>
              <input type="text" placeholder={t('add.placeholders.latitude')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.longitude')}</label>
              <input type="text" placeholder={t('add.placeholders.longitude')} />
            </div>
          </div>
          <div className="map-placeholder">
            <span>🗺️</span>
            <div>{t('add.map.placeholder')}</div>
            <div className="map-hint">{t('add.map.hint')}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.sections.operatingHours')}</h3>
        </div>
        <div className="form-section">
          <div className="hours-grid">
            <div className="hours-row">
              <span className="day-label">{tc('days.monday')}</span>
              <input type="time" defaultValue="06:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="22:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.tuesday')}</span>
              <input type="time" defaultValue="06:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="22:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.wednesday')}</span>
              <input type="time" defaultValue="06:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="22:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.thursday')}</span>
              <input type="time" defaultValue="06:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="22:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.friday')}</span>
              <input type="time" defaultValue="06:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="22:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.saturday')}</span>
              <input type="time" defaultValue="07:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="21:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
            <div className="hours-row">
              <span className="day-label">{tc('days.sunday')}</span>
              <input type="time" defaultValue="07:00" />
              <span>{t('add.hours.to')}</span>
              <input type="time" defaultValue="21:00" />
              <label><input type="checkbox" defaultChecked /> {t('add.hours.open')}</label>
            </div>
          </div>
          <div className="form-group">
            <label><input type="checkbox" /> {t('add.hours.allDayOperation')}</label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.sections.equipmentConfiguration')}</h3>
          <button className="btn btn-sm">{t('add.equipment.addBay')}</button>
        </div>
        <div className="form-section">
          <div className="equipment-list">
            <div className="equipment-row">
              <div className="equipment-info">
                <span className="equipment-label">Bay 1</span>
                <select>
                  <option value="tunnel">{t('add.equipmentTypeOptions.tunnelWash')}</option>
                  <option value="rollover">{t('add.equipmentTypeOptions.rolloverWash')}</option>
                  <option value="selfserve">{t('add.equipmentTypeOptions.selfServiceBay')}</option>
                </select>
              </div>
              <select>
                <option value="">{t('add.placeholders.selectMachineModel')}</option>
                <option value="jp5k">JetX Pro 5000</option>
                <option value="jp3k">JetX Pro 3000</option>
                <option value="jss">JetX Self-Service</option>
              </select>
              <button className="btn btn-sm btn-danger">{t('add.equipment.remove')}</button>
            </div>
            <div className="equipment-row">
              <div className="equipment-info">
                <span className="equipment-label">Bay 2</span>
                <select defaultValue="rollover">
                  <option value="tunnel">{t('add.equipmentTypeOptions.tunnelWash')}</option>
                  <option value="rollover">{t('add.equipmentTypeOptions.rolloverWash')}</option>
                  <option value="selfserve">{t('add.equipmentTypeOptions.selfServiceBay')}</option>
                </select>
              </div>
              <select defaultValue="jp3k">
                <option value="">{t('add.placeholders.selectMachineModel')}</option>
                <option value="jp5k">JetX Pro 5000</option>
                <option value="jp3k">JetX Pro 3000</option>
                <option value="jss">JetX Self-Service</option>
              </select>
              <button className="btn btn-sm btn-danger">{t('add.equipment.remove')}</button>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.fields.vacuumStations')}</label>
              <input type="number" defaultValue={4} min={0} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.paymentKiosks')}</label>
              <input type="number" defaultValue={2} min={0} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('add.sections.siteManagement')}</h3>
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>{t('add.fields.siteManager')}</label>
              <select>
                <option value="">{t('add.placeholders.selectOrInvite')}</option>
                <option value="new">+ Invite New User</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('add.fields.contactPhone')}</label>
              <input type="tel" placeholder={t('add.placeholders.contactPhone')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.contactEmail')}</label>
              <input type="email" placeholder={t('add.placeholders.contactEmail')} />
            </div>
            <div className="form-group">
              <label>{t('add.fields.pricingTemplate')}</label>
              <select>
                <option value="default">Default Pricing</option>
                <option value="premium">Premium Location</option>
                <option value="economy">Economy Location</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions-bar">
        <div className="form-actions-left">
          <Link href="/sites" className="btn btn-secondary">{t('add.actions.cancel')}</Link>
        </div>
        <div className="form-actions-right">
          <button className="btn btn-secondary">{t('add.actions.saveAsDraft')}</button>
          <button className="btn btn-primary">{t('add.actions.createSite')}</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
