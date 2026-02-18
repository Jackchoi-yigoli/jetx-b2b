import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function CreateTicketPage() {
  const t = await getTranslations('tickets');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/tickets">{t('breadcrumb')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('actions.createTicket')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('create.title')}</h1>
            <p className="page-subtitle">{t('create.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="ticket-form-layout">
        <div className="ticket-form-main">
          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.ticketDetails')}</h3>
            </div>
            <div className="form-section">
              <div className="form-group">
                <label>{t('create.form.subject')}</label>
                <input type="text" className="form-input" placeholder={t('create.form.subjectPlaceholder')} />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('create.form.category')}</label>
                  <select className="form-select">
                    <option value="">{t('create.form.selectCategory')}</option>
                    <option value="equipment">{t('create.categoryOptions.equipment')}</option>
                    <option value="billing">{t('create.categoryOptions.billing')}</option>
                    <option value="membership">{t('create.categoryOptions.membership')}</option>
                    <option value="complaint">{t('create.categoryOptions.complaint')}</option>
                    <option value="feature">{t('create.categoryOptions.feature')}</option>
                    <option value="other">{t('create.categoryOptions.other')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('create.form.priority')}</label>
                  <select className="form-select" defaultValue="medium">
                    <option value="low">{tc('priority.low')}</option>
                    <option value="medium">{tc('priority.medium')}</option>
                    <option value="high">{tc('priority.high')}</option>
                    <option value="urgent">{tc('priority.urgent')}</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{t('create.form.description')}</label>
                <textarea className="form-textarea" rows={6} placeholder={t('create.form.descriptionPlaceholder')}></textarea>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('create.sections.relatedInfo')}</h3>
              <span className="card-subtitle">{t('create.sections.relatedInfoSubtitle')}</span>
            </div>
            <div className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('create.form.site')}</label>
                  <select className="form-select">
                    <option value="">{t('create.form.selectSite')}</option>
                    <option value="xinyi">JetX Xinyi Station</option>
                    <option value="daan">JetX Daan Station</option>
                    <option value="zhongshan">JetX Zhongshan</option>
                    <option value="neihu">JetX Neihu</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('create.form.machine')}</label>
                  <select className="form-select">
                    <option value="">{t('create.form.selectMachine')}</option>
                    <option value="wash-001-a">WASH-001-A</option>
                    <option value="wash-001-b">WASH-001-B</option>
                    <option value="wash-002-a">WASH-002-A</option>
                    <option value="wash-003-b">WASH-003-B</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('create.form.transactionId')}</label>
                  <input type="text" className="form-input" placeholder="e.g., TXN-789456" />
                </div>
                <div className="form-group">
                  <label>{t('create.form.customerId')}</label>
                  <input type="text" className="form-input" placeholder="e.g., #45678" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('create.sections.attachments')}</h3>
            </div>
            <div className="form-section">
              <div className="upload-area">
                <div className="upload-placeholder">
                  <svg className="upload-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  <div className="upload-text">{t('create.upload.text')}</div>
                  <div className="upload-hint">{t('create.upload.hint')}</div>
                  <button className="btn btn-secondary">{t('create.upload.browseFiles')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-form-sidebar">
          <div className="card">
            <div className="card-header">
              <h3>{t('create.sections.quickTips')}</h3>
            </div>
            <div className="tips-list">
              <div className="tip-item">
                <svg className="tip-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <div className="tip-text">{t('create.tips.errorMessages')}</div>
              </div>
              <div className="tip-item">
                <svg className="tip-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <div className="tip-text">{t('create.tips.whenStarted')}</div>
              </div>
              <div className="tip-item">
                <svg className="tip-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <div className="tip-text">{t('create.tips.attachPhotos')}</div>
              </div>
              <div className="tip-item">
                <svg className="tip-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <div className="tip-text">{t('create.tips.troubleshootingTried')}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('create.sections.relatedArticles')}</h3>
            </div>
            <div className="article-list compact">
              <a href="#" className="article-item">
                <div className="article-content">
                  <div className="article-title">How to reset a wash machine</div>
                </div>
              </a>
              <a href="#" className="article-item">
                <div className="article-content">
                  <div className="article-title">Troubleshooting water pressure</div>
                </div>
              </a>
              <a href="#" className="article-item">
                <div className="article-content">
                  <div className="article-title">Processing refund requests</div>
                </div>
              </a>
            </div>
            <a href="#" className="btn btn-sm btn-block">{t('create.actions.searchKnowledgeBase')}</a>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('create.sections.needUrgentHelp')}</h3>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div className="contact-text">
                  <div className="contact-label">{t('create.contact.hotline')}</div>
                  <div className="contact-value">+886-2-1234-5678</div>
                </div>
              </div>
              <div className="contact-item">
                <svg className="contact-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <div className="contact-text">
                  <div className="contact-label">{t('create.contact.liveChat')}</div>
                  <div className="contact-value">{t('create.contact.available247')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions-bar">
        <div className="form-actions-left">
          <Link href="/tickets" className="btn btn-secondary">{tc('actions.cancel')}</Link>
        </div>
        <div className="form-actions-right">
          <button className="btn btn-secondary">{tc('actions.saveAsDraft')}</button>
          <button className="btn btn-primary">{t('actions.createTicket')}</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
