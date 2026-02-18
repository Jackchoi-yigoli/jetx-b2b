import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { pricingTemplates } from '@/data/pricing-templates';
import { getTranslations } from 'next-intl/server';

const ALL_DYNAMIC_RULES = pricingTemplates[0].dynamicRules;

const TEMPLATE_AVG_REVENUE = ['$38,500/mo', '$62,100/mo', '$28,900/mo'];

const SITE_PRICING_ASSIGNMENTS = [
  {
    siteId: 'main-street',
    siteName: 'Main Street',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Standard',
    overrides: 2,
    dynamicRulesActive: 3,
    monthlyRevenue: '$42,800',
  },
  {
    siteId: 'xinyi',
    siteName: 'Xinyi Station',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Premium',
    overrides: 0,
    dynamicRulesActive: 4,
    monthlyRevenue: '$68,500',
  },
  {
    siteId: 'daan',
    siteName: 'Daan Station',
    operatorName: 'ABC Car Wash Co.',
    template: 'Taiwan Premium',
    overrides: 0,
    dynamicRulesActive: 4,
    monthlyRevenue: '$62,100',
  },
  {
    siteId: 'neihu',
    siteName: 'Neihu Station',
    operatorName: 'XYZ Motors',
    template: 'Taiwan Standard',
    overrides: 1,
    dynamicRulesActive: 2,
    monthlyRevenue: '$38,200',
  },
  {
    siteId: 'banqiao',
    siteName: 'Banqiao Station',
    operatorName: 'XYZ Motors',
    template: 'Taiwan Budget',
    overrides: 0,
    dynamicRulesActive: 2,
    monthlyRevenue: '$28,900',
  },
];

function getRuleAdjustmentStyle(adjustmentPct: number) {
  return adjustmentPct > 0
    ? { color: 'var(--color-warning)', fontWeight: 600 }
    : { color: 'var(--color-success)', fontWeight: 600 };
}

function formatAdjustment(adjustmentPct: number): string {
  return adjustmentPct > 0 ? `+${adjustmentPct}%` : `${adjustmentPct}%`;
}

function getTriggerTypeLabel(triggerType: string): string {
  switch (triggerType) {
    case 'time-based': return 'Time-based';
    case 'day-based': return 'Day-based';
    case 'weather-based': return 'Weather-based';
    case 'calendar-based': return 'Calendar-based';
    default: return triggerType;
  }
}

function getRuleType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default async function PricingPage() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('common');

  const templateCount = pricingTemplates.length;
  const templateNames = pricingTemplates.map((tmpl) => tmpl.name.replace('Taiwan ', '')).join(', ');
  const activeRules = ALL_DYNAMIC_RULES.filter((r) => r.enabled);

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
            <button className="btn btn-secondary">{t('actions.importPrices')}</button>
            <button className="btn btn-primary">{t('actions.createTemplate')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.pricingTemplates')}</div>
          <div className="kpi-value">{templateCount}</div>
          <div className="kpi-change neutral">{templateNames}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.sitesWithOverrides')}</div>
          <div className="kpi-value">5</div>
          <div className="kpi-change neutral">{t('kpi.ofTotalSites', { count: 17 })}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.dynamicRulesActive')}</div>
          <div className="kpi-value">{activeRules.length}</div>
          <div className="kpi-change positive">
            {activeRules.filter((r) => r.type === 'surge').length} {t('kpi.surge')},{' '}
            {activeRules.filter((r) => r.type === 'discount').length} {t('kpi.discount')}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.avgRevenueSite')}</div>
          <div className="kpi-value">$42,800</div>
          <div className="kpi-change positive">{t('kpi.vsLastMonth', { pct: '+8%' })}</div>
        </div>
      </div>

      <div className="tabs">
        <Link className="tab active" href="/pricing">{t('tabs.templates')}</Link>
        <Link className="tab" href="/pricing/dynamic">{t('tabs.dynamicPricing')}</Link>
        <Link className="tab" href="/pricing/addons">{t('tabs.addons')}</Link>
        <Link className="tab" href="/pricing/sites">{t('tabs.siteAssignments')}</Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('templates.cardTitle')}</h3>
          <button className="btn btn-secondary">{t('actions.newTemplate')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('templates.table.name')}</th>
                <th>{t('templates.table.basicWash')}</th>
                <th>{t('templates.table.premiumWash')}</th>
                <th>{t('templates.table.ultimateWash')}</th>
                <th>{t('templates.table.sitesUsing')}</th>
                <th>{t('templates.table.avgRevenue')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pricingTemplates.map((template, i) => {
                const basicPrice = template.washPrices.find((w) => w.serviceType === 'basic')?.price ?? 0;
                const premiumPrice = template.washPrices.find((w) => w.serviceType === 'premium')?.price ?? 0;
                const ultimatePrice = template.washPrices.find((w) => w.serviceType === 'ultimate')?.price ?? 0;
                return (
                  <tr key={template.id} className="clickable">
                    <td>
                      <div className="list-item-title">{template.name}</div>
                      <div className="list-item-subtitle">{template.description}</div>
                    </td>
                    <td>${basicPrice.toFixed(2)}</td>
                    <td>${premiumPrice.toFixed(2)}</td>
                    <td>${ultimatePrice.toFixed(2)}</td>
                    <td><span className="badge-pill badge-info">{template.siteAssignments.length} {t('templates.table.sites')}</span></td>
                    <td>{TEMPLATE_AVG_REVENUE[i]}</td>
                    <td><span className="badge-pill badge-success">{template.status.charAt(0).toUpperCase() + template.status.slice(1)}</span></td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href="/pricing/template-edit" className="btn btn-secondary">{tc('actions.edit')}</Link>
                      <button className="btn btn-secondary">{t('actions.clone')}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('dynamicRules.cardTitle')}</h3>
          <button className="btn btn-secondary">{t('actions.newRule')}</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('dynamicRules.table.ruleName')}</th>
                <th>{tc('table.type')}</th>
                <th>{t('dynamicRules.table.condition')}</th>
                <th>{t('dynamicRules.table.adjustment')}</th>
                <th>{t('dynamicRules.table.sitesEnabled')}</th>
                <th>{tc('table.status')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {ALL_DYNAMIC_RULES.map((rule) => (
                <tr key={rule.id}>
                  <td>
                    <div className="list-item-title">{rule.name}</div>
                    <div className="list-item-subtitle">{getTriggerTypeLabel(rule.triggerType)}</div>
                  </td>
                  <td>{getRuleType(rule.type)}</td>
                  <td>{rule.conditions}</td>
                  <td style={getRuleAdjustmentStyle(rule.adjustmentPct)}>{formatAdjustment(rule.adjustmentPct)}</td>
                  <td>{rule.siteCount} {t('dynamicRules.table.ofSites', { total: 17 })}</td>
                  <td>
                    <span className={`badge-pill ${rule.enabled ? 'badge-success' : ''}`}>
                      {rule.enabled ? tc('status.active') : tc('status.inactive')}
                    </span>
                  </td>
                  <td><Link href="/pricing/dynamic" className="btn btn-secondary">{tc('actions.edit')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('siteAssignments.cardTitle')}</h3>
          <div>
            <select className="filter-input">
              <option>{t('siteAssignments.allTemplates')}</option>
              {pricingTemplates.map((tmpl) => (
                <option key={tmpl.id}>{tmpl.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('siteAssignments.table.site')}</th>
                <th>{t('siteAssignments.table.template')}</th>
                <th>{t('siteAssignments.table.hasOverrides')}</th>
                <th>{t('siteAssignments.table.dynamicRules')}</th>
                <th>{t('siteAssignments.table.monthlyRevenue')}</th>
                <th>{tc('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {SITE_PRICING_ASSIGNMENTS.map((site) => (
                <tr key={site.siteId} className="clickable">
                  <td>
                    <div className="list-item-title">{site.siteName}</div>
                    <div className="list-item-subtitle">{site.operatorName}</div>
                  </td>
                  <td>{site.template}</td>
                  <td>
                    {site.overrides > 0
                      ? <span className="badge-pill badge-warning">{site.overrides} {t('siteAssignments.override', { count: site.overrides })}</span>
                      : <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{t('siteAssignments.noOverrides')}</span>
                    }
                  </td>
                  <td>{site.dynamicRulesActive} {t('siteAssignments.active')}</td>
                  <td>{site.monthlyRevenue}</td>
                  <td><Link href={`/sites/${site.siteId}/pricing`} className="btn btn-secondary">{tc('actions.configure')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <span>{t('siteAssignments.showing', { shown: 5, total: 17 })}</span>
          <div className="pagination-pages">
            <button disabled>{tc('actions.previous')}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>{tc('actions.next')}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
