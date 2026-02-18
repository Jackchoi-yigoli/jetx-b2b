import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';

export default async function AccountIntegrationsPage() {
  const t = await getTranslations('account');
  const tc = await getTranslations('common');

  const accountTabs = [
    { label: t('tabs.profile'), href: '/account' },
    { label: t('tabs.security'), href: '/account/security' },
    { label: t('tabs.notifications'), href: '/account/notifications' },
    { label: t('tabs.integrations'), href: '/account/integrations' },
    { label: t('tabs.apiKeys'), href: '/account/api' },
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.settings')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/account">{t('breadcrumb')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('integrations.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      <TabNav tabs={accountTabs} />

      <div className="settings-layout">
        <div className="card">
          <div className="card-header">
            <h3>{t('integrations.connectedTitle')}</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Slack</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('integrations.slackDesc')}</div>
              </div>
              <span className="badge badge-success">{tc('status.connected')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{tc('actions.configure')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.disconnect')}</button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Google Workspace</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('integrations.googleWorkspaceDesc')}</div>
              </div>
              <span className="badge badge-success">{tc('status.connected')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{tc('actions.configure')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.disconnect')}</button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', background: 'var(--bg-secondary)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#635BFF"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Stripe</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('integrations.stripeDesc')}</div>
              </div>
              <span className="badge badge-success">{tc('status.connected')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{tc('actions.configure')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.disconnect')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('integrations.availableTitle')}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {[
              { name: 'QuickBooks', desc: t('integrations.quickbooksDesc'), fill: '#00D4AA', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
              { name: 'Zapier', desc: t('integrations.zapierDesc'), fill: '#FF6C37', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /> },
              { name: 'Jira', desc: t('integrations.jiraDesc'), fill: '#2684FF', icon: <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.213 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1 1 0 0 0-1-1.001zM23 0H11.429a5.215 5.215 0 0 0 5.214 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.485V1a1 1 0 0 0-1-1z" /> },
              { name: 'Microsoft Teams', desc: t('integrations.msTeamsDesc'), fill: '#0078D4', icon: <path d="M12.5 0L1.732 6v12L12.5 24l10.768-6V6L12.5 0zm7.464 16.47l-7.464 4.152-7.464-4.152V7.53l7.464-4.152 7.464 4.152v8.94z" /> },
              { name: 'Power BI', desc: t('integrations.powerBiDesc'), fill: '#F25022', icon: <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z" /> },
              { name: 'WhatsApp Business', desc: t('integrations.whatsappDesc'), fill: '#25D366', icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> },
              { name: 'LINE Notify', desc: t('integrations.lineNotifyDesc'), fill: '#00C300', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.55 17v-1.84c2.73-.33 4.86-2.6 4.86-5.38 0-2.99-2.42-5.41-5.41-5.41-2.99 0-5.41 2.42-5.41 5.41 0 2.78 2.13 5.05 4.86 5.38V19h1.1z" /> },
              { name: 'Datadog', desc: t('integrations.datadogDesc'), fill: '#7B68EE', icon: <><circle cx="12" cy="12" r="10" /><path fill="white" d="M8 14l2-2 2 2 4-4" /></> },
            ].map(({ name, desc, fill, icon }) => (
              <div key={name} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', borderRadius: '8px', margin: '0 auto 0.75rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill={fill}>{icon}</svg>
                </div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.4 }}>{desc}</div>
                <button className="btn btn-sm btn-primary">{t('integrations.connect')}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('integrations.webhooksTitle')}</h3>
            <button className="btn btn-sm btn-primary">{t('integrations.addWebhook')}</button>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('integrations.webhookProductionEvents')}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>https://api.mycompany.com/webhooks/jetx</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>transaction.completed</span>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>equipment.alert</span>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>membership.changed</span>
                </div>
              </div>
              <span className="badge badge-success">{tc('status.active')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{tc('actions.edit')}</button>
                <button className="btn btn-sm">{t('integrations.test')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.delete')}</button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('integrations.webhookAnalyticsPipeline')}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>https://analytics.internal/ingest</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>transaction.completed</span>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>customer.created</span>
                </div>
              </div>
              <span className="badge badge-success">{tc('status.active')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{tc('actions.edit')}</button>
                <button className="btn btn-sm">{t('integrations.test')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.delete')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
