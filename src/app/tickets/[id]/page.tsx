import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function TicketDetailPage() {
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
          TKT-4567
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">TKT-4567</h1>
            <p className="page-subtitle">Machine WASH-003-B not responding</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary">{t('detail.actions.assign')}</button>
            <button className="btn btn-secondary">{t('detail.actions.escalate')}</button>
            <button className="btn btn-success">{t('detail.actions.resolve')}</button>
          </div>
        </div>
      </div>

      <div className="ticket-status-bar">
        <div className="status-item">
          <span className="status-label">{tc('table.status')}:</span>
          <span className="badge badge-warning">{tc('status.open')}</span>
        </div>
        <div className="status-item">
          <span className="status-label">{t('table.priority')}:</span>
          <span className="badge badge-error">{tc('priority.urgent')}</span>
        </div>
        <div className="status-item">
          <span className="status-label">{t('table.category')}:</span>
          <span className="badge badge-secondary">{t('categories.equipment')}</span>
        </div>
        <div className="status-item">
          <span className="status-label">{t('detail.statusBar.created')}:</span>
          <span>Today 12:30 PM (35 min ago)</span>
        </div>
      </div>

      <div className="ticket-layout">
        <div className="ticket-main">
          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.ticketDetails')}</h3>
            </div>
            <div className="ticket-content">
              <div className="message-item original">
                <div className="message-header">
                  <div className="message-author">
                    <span className="author-avatar">SM</span>
                    <div className="author-info">
                      <span className="author-name">Site Manager</span>
                      <span className="author-role">JetX Xinyi Station</span>
                    </div>
                  </div>
                  <span className="message-time">Today 12:30 PM</span>
                </div>
                <div className="message-body">
                  <p>Machine WASH-003-B in Bay 3 has stopped responding to commands. The control panel shows no errors but the machine won&apos;t start any wash cycles.</p>
                  <p>We&apos;ve tried restarting the machine twice but the issue persists. Customers are being redirected to Bay 1 and Bay 2 but we&apos;re getting a queue during peak hours.</p>
                  <p>Please send a technician ASAP.</p>
                </div>
                <div className="message-attachments">
                  <div className="attachment">
                    <span className="attachment-icon">📷</span>
                    <span className="attachment-name">control_panel.jpg</span>
                  </div>
                  <div className="attachment">
                    <span className="attachment-icon">📷</span>
                    <span className="attachment-name">error_log.png</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.conversation')}</h3>
            </div>
            <div className="conversation-thread">
              <div className="message-item reply">
                <div className="message-header">
                  <div className="message-author">
                    <span className="author-avatar">TT</span>
                    <div className="author-info">
                      <span className="author-name">Tech Team</span>
                      <span className="author-role">Internal</span>
                    </div>
                  </div>
                  <span className="message-time">Today 12:45 PM</span>
                </div>
                <div className="message-body">
                  <p>Thank you for reporting this issue. I&apos;m checking the remote diagnostics now.</p>
                  <p>Initial assessment shows the machine is online but there appears to be a communication error between the control board and the main PLC. This is likely a software issue.</p>
                  <p>Can you please try the following:</p>
                  <ol>
                    <li>Power off the machine completely</li>
                    <li>Wait 2 minutes</li>
                    <li>Power on while holding the RESET button for 10 seconds</li>
                  </ol>
                </div>
              </div>

              <div className="message-item reply">
                <div className="message-header">
                  <div className="message-author">
                    <span className="author-avatar">SM</span>
                    <div className="author-info">
                      <span className="author-name">Site Manager</span>
                      <span className="author-role">JetX Xinyi Station</span>
                    </div>
                  </div>
                  <span className="message-time">Today 12:58 PM</span>
                </div>
                <div className="message-body">
                  <p>Tried the reset procedure but it didn&apos;t work. The machine powers on but still won&apos;t accept wash commands. The display shows &quot;SYSTEM READY&quot; but nothing happens when we select a wash program.</p>
                </div>
              </div>
            </div>

            <div className="reply-form">
              <div className="form-group">
                <label>{t('detail.reply.addReply')}</label>
                <textarea className="reply-input" placeholder={t('detail.reply.placeholder')}></textarea>
              </div>
              <div className="reply-actions">
                <div className="reply-options">
                  <button className="btn btn-sm">{t('detail.reply.attachFile')}</button>
                  <button className="btn btn-sm">{t('detail.reply.insertTemplate')}</button>
                </div>
                <div className="reply-submit">
                  <select className="reply-type">
                    <option value="public">{t('detail.reply.publicReply')}</option>
                    <option value="internal">{t('detail.reply.internalNote')}</option>
                  </select>
                  <button className="btn btn-primary">{t('detail.reply.sendReply')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-sidebar">
          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.ticketInfo')}</h3>
              <button className="btn btn-sm">{tc('actions.edit')}</button>
            </div>
            <div className="info-grid compact">
              <div className="info-row">
                <span className="info-label">{t('table.assignee')}</span>
                <span className="info-value">
                  <select>
                    <option value="">{t('filters.unassigned')}</option>
                    <option value="tech">Tech Team</option>
                    <option value="john">John Chen</option>
                    <option value="sarah">Sarah Wong</option>
                  </select>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('table.priority')}</span>
                <span className="info-value">
                  <select defaultValue="urgent">
                    <option value="urgent">{tc('priority.urgent')}</option>
                    <option value="high">{tc('priority.high')}</option>
                    <option value="medium">{tc('priority.medium')}</option>
                    <option value="low">{tc('priority.low')}</option>
                  </select>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('table.category')}</span>
                <span className="info-value">{t('categories.equipment')}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('detail.info.slaDue')}</span>
                <span className="info-value text-warning">In 1h 25min</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.related')}</h3>
            </div>
            <div className="related-links">
              <a href="#" className="related-link">
                <span className="related-icon">📍</span>
                <span>JetX Xinyi Station</span>
              </a>
              <a href="#" className="related-link">
                <span className="related-icon">🔧</span>
                <span>WASH-003-B</span>
              </a>
              <a href="#" className="related-link">
                <span className="related-icon">📹</span>
                <span>{t('detail.related.viewCctv', { bay: 3 })}</span>
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.activity')}</h3>
            </div>
            <div className="activity-log">
              <div className="activity-item">
                <span className="activity-time">12:58 PM</span>
                <span className="activity-text">Site Manager replied</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">12:45 PM</span>
                <span className="activity-text">Tech Team replied</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">12:32 PM</span>
                <span className="activity-text">Auto-assigned to Tech Team</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">12:30 PM</span>
                <span className="activity-text">{t('detail.activity.ticketCreated')}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>{t('detail.sections.similarTickets')}</h3>
            </div>
            <div className="similar-tickets">
              <a href="#" className="similar-ticket">
                <span className="ticket-id">TKT-4234</span>
                <span className="ticket-subject">Machine not responding - Bay 1</span>
                <span className="badge badge-success">{tc('status.resolved')}</span>
              </a>
              <a href="#" className="similar-ticket">
                <span className="ticket-id">TKT-3987</span>
                <span className="ticket-subject">WASH-003-B calibration issue</span>
                <span className="badge badge-success">{tc('status.resolved')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
