import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function TransactionDetailPage() {
  const t = await getTranslations('transactions');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/transactions">{t('title')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          TXN-789456
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('detail.pageTitle')} TXN-789456</h1>
            <p className="page-subtitle">December 7, 2024 · 12:34 PM</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('detail.actions.printReceipt')}</button>
            <button className="btn btn-warning">{t('detail.actions.issueRefund')}</button>
            <Link href="/tickets/create" className="btn btn-primary">{t('detail.actions.createTicket')}</Link>
          </div>
        </div>
      </div>

      <div className="status-banner status-info">
        <span className="status-indicator"></span>
        <span>{tc('status.inProgress')}</span>
        <span className="status-date">{t('detail.washEstimate')}</span>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('detail.sections.transactionDetails')}</h3>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('table.transactionId')}</span>
              <span className="info-value monospace">TXN-789456</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.dateTime')}</span>
              <span className="info-value">Dec 7, 2024 · 12:34:28 PM</span>
            </div>
            <div className="info-row">
              <span className="info-label">{tc('table.status')}</span>
              <span className="info-value"><span className="badge badge-info">{tc('status.inProgress')}</span></span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.duration')}</span>
              <span className="info-value">4 min 32 sec (of ~6 min)</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('detail.sections.customerInformation')}</h3>
            <Link href="/customers/45678" className="btn btn-sm">{t('detail.actions.viewProfile')}</Link>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('table.customer')}</span>
              <span className="info-value">Emily Chen (#45678)</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.membership')}</span>
              <span className="info-value"><span className="badge badge-premium">Unlimited</span></span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.vehicle')}</span>
              <span className="info-value">Tesla Model 3 · ABC-1234</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.previousVisits')}</span>
              <span className="info-value">155 (this is visit #156)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('detail.sections.serviceDetails')}</h3>
          </div>
          <div className="service-breakdown-detail">
            <div className="service-line-item">
              <div className="service-line-name">Premium Wash</div>
              <div className="service-line-price">$25.00</div>
            </div>
            <div className="service-line-item addon">
              <div className="service-line-name">├─ Exterior Wash</div>
              <div className="service-line-price">{t('detail.serviceLines.included')}</div>
            </div>
            <div className="service-line-item addon">
              <div className="service-line-name">├─ Tire Shine</div>
              <div className="service-line-price">{t('detail.serviceLines.included')}</div>
            </div>
            <div className="service-line-item addon">
              <div className="service-line-name">└─ Air Dry</div>
              <div className="service-line-price">{t('detail.serviceLines.included')}</div>
            </div>
            <div className="service-divider"></div>
            <div className="service-line-item subtotal">
              <div className="service-line-name">{t('detail.serviceLines.subtotal')}</div>
              <div className="service-line-price">$25.00</div>
            </div>
            <div className="service-line-item discount">
              <div className="service-line-name">{t('detail.serviceLines.membershipDiscount')}</div>
              <div className="service-line-price">-$25.00</div>
            </div>
            <div className="service-divider"></div>
            <div className="service-line-item total">
              <div className="service-line-name">{t('detail.serviceLines.totalCharged')}</div>
              <div className="service-line-price">$0.00</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('detail.sections.locationEquipment')}</h3>
          </div>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">{t('table.site')}</span>
              <span className="info-value"><a href="#">JetX Xinyi Station</a></span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.operator')}</span>
              <span className="info-value"><a href="#">CleanWash Corp</a></span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.machine')}</span>
              <span className="info-value"><a href="#">WASH-001-A (Bay 1)</a></span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('detail.fields.machineType')}</span>
              <span className="info-value">Premium Tunnel Wash</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('detail.sections.paymentInformation')}</h3>
        </div>
        <div className="grid-3">
          <div className="payment-info-block">
            <div className="payment-label">{t('table.payment')}</div>
            <div className="payment-value">Membership (Unlimited Plan)</div>
          </div>
          <div className="payment-info-block">
            <div className="payment-label">{t('detail.fields.amountCharged')}</div>
            <div className="payment-value">$0.00</div>
          </div>
          <div className="payment-info-block">
            <div className="payment-label">{t('detail.fields.pointsEarned')}</div>
            <div className="payment-value">+25 points</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('detail.sections.washProgress')}</h3>
          <span className="live-indicator">● {t('detail.live')}</span>
        </div>
        <div className="timeline">
          <div className="timeline-item completed">
            <div className="timeline-marker">✓</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.entryDetection')}</div>
              <div className="timeline-time">12:34:28 PM</div>
            </div>
          </div>
          <div className="timeline-item completed">
            <div className="timeline-marker">✓</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.paymentConfirmed')}</div>
              <div className="timeline-time">12:34:30 PM</div>
            </div>
          </div>
          <div className="timeline-item completed">
            <div className="timeline-marker">✓</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.preSoak')}</div>
              <div className="timeline-time">12:34:45 PM · Duration: 45s</div>
            </div>
          </div>
          <div className="timeline-item completed">
            <div className="timeline-marker">✓</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.soapApplication')}</div>
              <div className="timeline-time">12:35:30 PM · Duration: 60s</div>
            </div>
          </div>
          <div className="timeline-item completed">
            <div className="timeline-marker">✓</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.brushWash')}</div>
              <div className="timeline-time">12:36:30 PM · Duration: 90s</div>
            </div>
          </div>
          <div className="timeline-item active">
            <div className="timeline-marker">●</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.rinseCycle')}</div>
              <div className="timeline-time">{tc('status.inProgress')}...</div>
            </div>
          </div>
          <div className="timeline-item pending">
            <div className="timeline-marker">○</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.tireShine')}</div>
              <div className="timeline-time">{tc('status.pending')}</div>
            </div>
          </div>
          <div className="timeline-item pending">
            <div className="timeline-marker">○</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.airDry')}</div>
              <div className="timeline-time">{tc('status.pending')}</div>
            </div>
          </div>
          <div className="timeline-item pending">
            <div className="timeline-marker">○</div>
            <div className="timeline-content">
              <div className="timeline-title">{t('detail.washSteps.exit')}</div>
              <div className="timeline-time">Est. 12:40 PM</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('detail.sections.cctvSnapshot')}</h3>
          <a href="#" className="btn btn-sm">{t('detail.actions.viewLiveFeed')}</a>
        </div>
        <div className="cctv-grid">
          <div className="cctv-thumbnail">
            <div className="cctv-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <div>{t('detail.cctv.entryCamera')}</div>
              <div className="cctv-time">12:34:28 PM</div>
            </div>
          </div>
          <div className="cctv-thumbnail">
            <div className="cctv-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <div>{t('detail.cctv.bay1Camera')}</div>
              <div className="cctv-time">{t('detail.live')}</div>
            </div>
          </div>
          <div className="cctv-thumbnail">
            <div className="cctv-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <div>{t('detail.cctv.exitCamera')}</div>
              <div className="cctv-time">{t('detail.cctv.waiting')}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
