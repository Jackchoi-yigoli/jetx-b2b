import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  getCustomerById,
  getVehiclesByCustomer,
  getSubscriptionsByCustomer,
  getTransactionsByCustomer,
  getPlanById,
  getSiteById,
} from '@/lib/data';
import { notFound } from 'next/navigation';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getServiceLabel(serviceType: string) {
  return capitalizeFirst(serviceType) + ' Wash';
}

function getNumericId(id: string) {
  return id.replace(/\D/g, '');
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const t = await getTranslations('customers');
  const tc = await getTranslations('common');

  const vehicles = getVehiclesByCustomer(customer.id);
  const subscriptions = getSubscriptionsByCustomer(customer.id);
  const transactions = getTransactionsByCustomer(customer.id);

  const activeSub = subscriptions.find((s) => s.status === 'active') ?? subscriptions[0] ?? null;
  const plan = activeSub ? getPlanById(activeSub.planId) : null;
  const homeSite = getSiteById(customer.homeSiteId);

  const totalSpend = transactions.reduce((sum, t) => sum + t.total, 0);
  const rewardPoints = Math.round(transactions.reduce((sum, t) => sum + t.pointsEarned, 0));
  const numericId = getNumericId(customer.id);

  const primaryVehicle = vehicles.find((v) => v.isPrimary);
  const secondaryVehicles = vehicles.filter((v) => !v.isPrimary);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.business')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/customers">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {customer.name}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{customer.name}</h1>
            <p className="page-subtitle">{t('detail.subtitle', { id: numericId, date: formatDate(customer.joinDate) })}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('actions.sendMessage')}</button>
            <button className="btn btn-secondary">{t('actions.issueRefund')}</button>
            <button className="btn btn-primary">{t('actions.createTicket')}</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.lifetimeVisits')}</div>
          <div className="kpi-value">{transactions.length}</div>
          <div className="kpi-change positive">+12 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.lifetimeValue')}</div>
          <div className="kpi-value">${totalSpend.toFixed(2)}</div>
          <div className="kpi-change positive">{t('kpi.top5Percent')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.visitFrequency')}</div>
          <div className="kpi-value">3.2/week</div>
          <div className="kpi-change neutral">{t('kpi.consistent')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('kpi.rewardPoints')}</div>
          <div className="kpi-value">{rewardPoints.toLocaleString()}</div>
          <div className="kpi-change neutral">${(rewardPoints * 0.01).toFixed(2)} value</div>
        </div>
      </div>

      <div className="tabs">
        <span className="tab active">{t('tabs.overview')}</span>
        <span className="tab">{t('tabs.transactions')}</span>
        <span className="tab">{t('tabs.vehiclesCount', { count: vehicles.length })}</span>
        <span className="tab">{t('tabs.membership')}</span>
      </div>

      {activeSub && plan && (
        <div className="status-banner status-premium mb-24">
          <span className="font-semibold">{t('detail.memberBanner', { planName: plan.name })}</span>
          <span className="status-date">
            {t('detail.renewsOn', { date: formatDate(activeSub.renewalDate) })} · {t('detail.autoRenewal')} {activeSub.autoRenewal ? t('detail.autoRenewalOn') : t('detail.autoRenewalOff')}
          </span>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.contactInformation')}</div>
          </div>
          <div className="card-body">
            <div className="info-grid" style={{ padding: 0 }}>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.fullName')}</span>
                <span className="info-value">{customer.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{tc('table.email')}</span>
                <span className="info-value">{customer.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{tc('table.phone')}</span>
                <span className="info-value">{customer.phone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.preferredLanguage')}</span>
                <span className="info-value">{customer.language === 'zh-TW' ? t('detail.fields.chineseTraditional') : customer.language}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.homeSite')}</span>
                <span className="info-value">{homeSite?.name ?? customer.homeSiteId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.fields.joinDate')}</span>
                <span className="info-value">{formatDate(customer.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.membershipDetails')}</div>
            <a href="#" className="card-link">{tc('actions.manage')}</a>
          </div>
          <div className="card-body">
            <div className="info-grid" style={{ padding: 0 }}>
              {plan && activeSub ? (
                <>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.plan')}</span>
                    <span className="info-value">{plan.name} Wash</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.monthlyFee')}</span>
                    <span className="info-value">${activeSub.monthlyAmount}/month</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.billingCycle')}</span>
                    <span className="info-value">{activeSub.billingDay}{activeSub.billingDay === 1 ? 'st' : activeSub.billingDay === 2 ? 'nd' : activeSub.billingDay === 3 ? 'rd' : 'th'} of each month</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.paymentMethod')}</span>
                    <span className="info-value">{activeSub.paymentMethod}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.memberSince')}</span>
                    <span className="info-value">{formatDate(activeSub.startDate)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t('detail.fields.autoRenewal')}</span>
                    <span className="info-value">
                      <span className={`badge-pill ${activeSub.autoRenewal ? 'badge-success' : 'badge-gray'}`}>
                        {activeSub.autoRenewal ? tc('status.enabled') : tc('status.disabled')}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="info-row">
                  <span className="info-label">{t('detail.fields.plan')}</span>
                  <span className="info-value">{t('detail.noActiveMembership')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.visitFrequencyChart')}</div>
          </div>
          <div className="card-body">
            <div className="chart-placeholder">{t('detail.visitFrequencyChartPlaceholder')}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">{t('detail.preferredServices')}</div>
          </div>
          <div className="card-body">
            <div className="service-item">
              <div className="service-info">
                <span className="service-name">Premium Wash</span>
                <span className="service-count">68 visits (45%)</span>
              </div>
              <div className="service-bar">
                <div className="service-fill" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="service-item">
              <div className="service-info">
                <span className="service-name">Ultimate Wash</span>
                <span className="service-count">52 visits (35%)</span>
              </div>
              <div className="service-bar">
                <div className="service-fill" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="service-item">
              <div className="service-info">
                <span className="service-name">Basic Wash</span>
                <span className="service-count">36 visits (20%)</span>
              </div>
              <div className="service-bar">
                <div className="service-fill" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('detail.registeredVehicles')}</div>
          <a href="#" className="card-link">{tc('actions.manage')}</a>
        </div>
        <div className="card-body">
          <div className="grid-2">
            {primaryVehicle && (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px', background: 'var(--color-bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: 48, height: 48, background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="list-item-title">{primaryVehicle.make} {primaryVehicle.model}</div>
                  <div className="list-item-subtitle">{primaryVehicle.plate} · {primaryVehicle.color} · {primaryVehicle.year}</div>
                </div>
                <span className="badge-pill badge-success">{t('vehicles.primary')}</span>
              </div>
            )}
            {secondaryVehicles.map((vehicle) => (
              <div key={vehicle.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px', background: 'var(--color-bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: 48, height: 48, background: 'var(--color-bg-page)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexShrink: 0, border: '1px solid var(--color-border)' }}>
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="list-item-title">{vehicle.make} {vehicle.model}</div>
                  <div className="list-item-subtitle">{vehicle.plate} · {vehicle.color} · {vehicle.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">{t('detail.recentTransactions')}</div>
          <a href="#" className="card-link">{tc('actions.viewAll')}</a>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{tc('table.date')}</th>
                <th>{t('table.site')}</th>
                <th>{t('table.service')}</th>
                <th>{t('table.vehicle')}</th>
                <th>{tc('table.amount')}</th>
                <th>{t('table.points')}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => {
                const site = getSiteById(txn.siteId);
                const vehicle = vehicles.find((v) => v.id === txn.vehicleId);
                const vehicleLabel = vehicle ? `${vehicle.make} ${vehicle.model}` : '—';
                const amountLabel = txn.paymentMethod === 'membership'
                  ? `$${txn.total.toFixed(2)} (Membership)`
                  : txn.addons.length > 0
                    ? `$${txn.total.toFixed(2)} (Add-on)`
                    : `$${txn.total.toFixed(2)}`;
                return (
                  <tr key={txn.id} className="clickable">
                    <td>{formatDateTime(txn.dateTime)}</td>
                    <td>{site?.name ?? txn.siteId}</td>
                    <td>{getServiceLabel(txn.serviceType)}{txn.addons.length > 0 ? ` + ${txn.addons.join(', ')}` : ''}</td>
                    <td>{vehicleLabel}</td>
                    <td>{amountLabel}</td>
                    <td><span className="text-success">+{txn.pointsEarned} pts</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
