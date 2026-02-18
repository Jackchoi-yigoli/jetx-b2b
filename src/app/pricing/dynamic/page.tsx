import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';
import { getTranslations } from 'next-intl/server';

export default async function PricingDynamicPage() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('common');

  const tabs = [
    { label: t('tabs.templates'), href: '/pricing' },
    { label: t('tabs.addons'), href: '/pricing/addons' },
    { label: t('tabs.dynamicPricing'), href: '/pricing/dynamic' },
    { label: t('tabs.siteAssignments'), href: '/pricing/sites' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/pricing">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('tabs.dynamicPricing')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('dynamic.pageTitle')}</h1>
            <p className="page-subtitle">{t('dynamic.pageSubtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('dynamic.viewHistory')}</button>
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('dynamic.createRule')}
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('dynamic.kpi.activeRules')}</div>
          <div className="kpi-value">4</div>
          <div className="kpi-change neutral">{t('dynamic.kpi.ofTotalRules', { total: 5 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('dynamic.kpi.surgeRevenueImpact')}</div>
          <div className="kpi-value">+$28.4K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('dynamic.kpi.thisMonth')}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('dynamic.kpi.discountRevenueLost')}</div>
          <div className="kpi-value">-$12.1K</div>
          <div className="kpi-change neutral">{t('dynamic.kpi.offsetByVolume')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('dynamic.kpi.netDynamicImpact')}</div>
          <div className="kpi-value">+$16.3K</div>
          <div className="kpi-change positive">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            {t('dynamic.kpi.vsBase')}
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} />

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('dynamic.currentlyActive')}</h3>
          </div>
          <div className="active-rules-list">
            <div className="active-rule surge">
              <div className="rule-indicator"></div>
              <div className="rule-info">
                <strong>{t('edit.peakHoursSurge')}</strong>
                <span>{t('dynamic.activeUntil', { time: '7:00 PM' })}</span>
              </div>
              <div className="rule-adjustment">+20%</div>
            </div>
            <div className="active-rule discount">
              <div className="rule-indicator"></div>
              <div className="rule-info">
                <strong>{t('edit.rainyDayDiscount')}</strong>
                <span>{t('dynamic.weatherApiTriggered')}</span>
              </div>
              <div className="rule-adjustment">-15%</div>
            </div>
          </div>
          <div className="card-footer">
            <span className="text-muted">{t('dynamic.netEffect')}</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('dynamic.todaySchedule')}</h3>
          </div>
          <div className="schedule-timeline">
            <div className="schedule-item past">
              <div className="schedule-time">6-8 AM</div>
              <div className="schedule-rule">{t('edit.earlyBirdDiscount')}</div>
              <div className="schedule-adj discount">-10%</div>
            </div>
            <div className="schedule-item past">
              <div className="schedule-time">8-10 AM</div>
              <div className="schedule-rule">{t('edit.peakHoursSurge')}</div>
              <div className="schedule-adj surge">+20%</div>
            </div>
            <div className="schedule-item">
              <div className="schedule-time">10 AM-5 PM</div>
              <div className="schedule-rule">{t('dynamic.basePricing')}</div>
              <div className="schedule-adj">0%</div>
            </div>
            <div className="schedule-item current">
              <div className="schedule-time">5-7 PM</div>
              <div className="schedule-rule">{t('edit.peakHoursSurge')}</div>
              <div className="schedule-adj surge">+20%</div>
            </div>
            <div className="schedule-item">
              <div className="schedule-time">7-10 PM</div>
              <div className="schedule-rule">{t('dynamic.basePricing')}</div>
              <div className="schedule-adj">0%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('dynamic.allRules.cardTitle')}</h3>
          <div className="filter-group">
            <select className="form-select form-select-sm">
              <option>{tc('filters.allTypes')}</option>
              <option>{t('dynamic.allRules.surge')}</option>
              <option>{t('dynamic.allRules.discount')}</option>
            </select>
            <select className="form-select form-select-sm">
              <option>{tc('filters.allStatus')}</option>
              <option>{tc('status.active')}</option>
              <option>{tc('status.inactive')}</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('dynamicRules.table.ruleName')}</th>
                <th>{tc('table.type')}</th>
                <th>{t('dynamic.allRules.table.triggerCondition')}</th>
                <th>{t('dynamicRules.table.adjustment')}</th>
                <th>{t('dynamicRules.table.sitesEnabled')}</th>
                <th>{t('dynamic.allRules.table.thisMonthImpact')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon surge-icon">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.peakHoursSurge')}</strong>
                      <span className="template-desc">{t('dynamic.allRules.timeBased')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-warning">{t('dynamic.allRules.surge')}</span></td>
                <td>Weekdays 8-10 AM, 5-7 PM</td>
                <td className="text-warning">+20%</td>
                <td>15 of 17 sites</td>
                <td className="text-success">+$18,420</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
                  <button className="btn btn-sm btn-secondary">{tc('actions.disable')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon surge-icon">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.weekendPricing')}</strong>
                      <span className="template-desc">{t('dynamic.allRules.dayBased')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-warning">{t('dynamic.allRules.surge')}</span></td>
                <td>Saturday &amp; Sunday all day</td>
                <td className="text-warning">+10%</td>
                <td>12 of 17 sites</td>
                <td className="text-success">+$9,980</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
                  <button className="btn btn-sm btn-secondary">{tc('actions.disable')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon discount-icon">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.rainyDayDiscount')}</strong>
                      <span className="template-desc">{t('dynamic.allRules.weatherBased')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-info">{t('dynamic.allRules.discount')}</span></td>
                <td>{t('dynamic.allRules.whenRaining')}</td>
                <td className="text-success">-15%</td>
                <td>8 of 17 sites</td>
                <td className="text-muted">-$4,210 / +12% vol</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
                  <button className="btn btn-sm btn-secondary">{tc('actions.disable')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon discount-icon">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.earlyBirdDiscount')}</strong>
                      <span className="template-desc">{t('dynamic.allRules.timeBased')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-info">{t('dynamic.allRules.discount')}</span></td>
                <td>Weekdays 6-8 AM</td>
                <td className="text-success">-10%</td>
                <td>10 of 17 sites</td>
                <td className="text-muted">-$7,890 / +22% vol</td>
                <td><span className="badge-pill badge-success">{tc('status.active')}</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
                  <button className="btn btn-sm btn-secondary">{tc('actions.disable')}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="template-name">
                    <span className="template-icon surge-icon inactive">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </span>
                    <div>
                      <strong>{t('edit.holidayPricing')}</strong>
                      <span className="template-desc">{t('dynamic.allRules.calendarBased')}</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-pill badge-warning">{t('dynamic.allRules.surge')}</span></td>
                <td>{t('dynamic.allRules.publicHolidays')}</td>
                <td className="text-warning">+15%</td>
                <td>5 of 17 sites</td>
                <td className="text-muted">{t('dynamic.allRules.noHolidays')}</td>
                <td><span className="badge-pill badge-muted">{tc('status.inactive')}</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary">{tc('actions.edit')}</button>
                  <button className="btn btn-sm btn-secondary">{tc('actions.enable')}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('dynamic.charts.revenueImpact')}</h3>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars horizontal">
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.peakHours')}</span>
                <div className="bar-track">
                  <div className="bar-fill surge" style={{ width: '65%' }}></div>
                </div>
                <span className="bar-value">+$18.4K</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.weekend')}</span>
                <div className="bar-track">
                  <div className="bar-fill surge" style={{ width: '35%' }}></div>
                </div>
                <span className="bar-value">+$10.0K</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.earlyBird')}</span>
                <div className="bar-track">
                  <div className="bar-fill discount" style={{ width: '28%' }}></div>
                </div>
                <span className="bar-value">-$7.9K</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.rainyDay')}</span>
                <div className="bar-track">
                  <div className="bar-fill discount" style={{ width: '15%' }}></div>
                </div>
                <span className="bar-value">-$4.2K</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('dynamic.charts.volumeImpact')}</h3>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars horizontal">
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.earlyBird')}</span>
                <div className="bar-track">
                  <div className="bar-fill positive" style={{ width: '70%' }}></div>
                </div>
                <span className="bar-value">+22%</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.rainyDay')}</span>
                <div className="bar-track">
                  <div className="bar-fill positive" style={{ width: '55%' }}></div>
                </div>
                <span className="bar-value">+18%</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.peakHours')}</span>
                <div className="bar-track">
                  <div className="bar-fill negative" style={{ width: '25%' }}></div>
                </div>
                <span className="bar-value">-8%</span>
              </div>
              <div className="chart-bar-h">
                <span className="bar-label">{t('dynamic.charts.weekend')}</span>
                <div className="bar-track">
                  <div className="bar-fill negative" style={{ width: '15%' }}></div>
                </div>
                <span className="bar-value">-5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
