import { getTranslations } from 'next-intl/server';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import TabNav from '@/components/ui/TabNav';

export default async function AccountApiPage() {
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
          {t('api.breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('api.createApiKey')}
            </button>
          </div>
        </div>
      </div>

      <TabNav tabs={accountTabs} />

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">{t('api.kpi.callsToday')}</div>
          <div className="kpi-value">12,456</div>
          <div className="kpi-trend trend-up">+8% vs yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('api.kpi.callsMonth')}</div>
          <div className="kpi-value">324K</div>
          <div className="kpi-trend">{t('api.kpi.ofLimit')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('api.kpi.activeKeys')}</div>
          <div className="kpi-value">4</div>
          <div className="kpi-trend">{t('api.kpi.productionTesting')}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">{t('api.kpi.avgResponseTime')}</div>
          <div className="kpi-value">142ms</div>
          <div className="kpi-trend trend-up">{t('api.kpi.improvement')}</div>
        </div>
      </div>

      <div className="settings-layout">
        <div className="card">
          <div className="card-header">
            <h3>{t('api.sectionTitle')}</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('api.productionKey')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <span className="badge badge-success">{t('api.badgeProduction')}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Created Oct 15, 2025</span>
                  </div>
                </div>
                <span className="badge badge-success">{tc('status.active')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <code style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>jx_live_************************5f3a</code>
                <button className="btn btn-sm">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  {t('api.copy')}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {['transactions:read', 'transactions:write', 'customers:read', 'sites:read', 'reports:read'].map(p => (
                  <span key={p} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', fontFamily: 'monospace' }}>{p}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '2rem', padding: '0.75rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaLastUsed')}</span><span>2 minutes ago</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaCallsToday')}</span><span>8,234</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaRateLimit')}</span><span>1000/min</span></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{t('api.editPermissions')}</button>
                <button className="btn btn-sm">{t('api.viewLogs')}</button>
                <button className="btn btn-sm">{t('api.regenerate')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{t('api.revoke')}</button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('api.mobileAppKey')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <span className="badge badge-success">{t('api.badgeProduction')}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Created Nov 20, 2025</span>
                  </div>
                </div>
                <span className="badge badge-success">{tc('status.active')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <code style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>jx_live_************************8b2c</code>
                <button className="btn btn-sm">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  {t('api.copy')}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {['customers:read', 'memberships:read', 'sites:read'].map(p => (
                  <span key={p} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', fontFamily: 'monospace' }}>{p}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '2rem', padding: '0.75rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaLastUsed')}</span><span>5 minutes ago</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaCallsToday')}</span><span>4,222</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaRateLimit')}</span><span>500/min</span></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{t('api.editPermissions')}</button>
                <button className="btn btn-sm">{t('api.viewLogs')}</button>
                <button className="btn btn-sm">{t('api.regenerate')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{t('api.revoke')}</button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245, 200, 105, 0.15)', color: 'var(--warning)' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('api.devTestingKey')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <span className="badge badge-warning">{t('api.badgeTesting')}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Created Dec 1, 2025</span>
                  </div>
                </div>
                <span className="badge badge-success">{tc('status.active')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <code style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>jx_test_************************7d1e</code>
                <button className="btn btn-sm">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  {t('api.copy')}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {['all:read', 'all:write'].map(p => (
                  <span key={p} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', fontFamily: 'monospace' }}>{p}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '2rem', padding: '0.75rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaLastUsed')}</span><span>1 hour ago</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaCallsToday')}</span><span>156</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaRateLimit')}</span><span>100/min</span></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm">{t('api.editPermissions')}</button>
                <button className="btn btn-sm">{t('api.viewLogs')}</button>
                <button className="btn btn-sm">{t('api.regenerate')}</button>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{t('api.revoke')}</button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem', opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('api.legacyKey')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <span className="badge badge-muted">{tc('status.revoked')}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Created Aug 5, 2025</span>
                  </div>
                </div>
                <span className="badge badge-muted">{tc('status.revoked')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <code style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>jx_live_************************9a4f</code>
              </div>
              <div style={{ display: 'flex', gap: '2rem', padding: '0.75rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaRevoked')}</span><span>Nov 15, 2025</span></div>
                <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }}>{t('api.metaReason')}</span><span>Migration to new system</span></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{tc('actions.delete')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('api.quickReference')}</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t('api.baseUrl')}</h4>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                <code>https://api.jetx.com/v1</code>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t('api.authentication')}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t('api.authDesc')}</p>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                <code>Authorization: Bearer jx_live_your_api_key</code>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t('api.availableEndpoints')}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { method: 'GET', path: '/transactions' },
                  { method: 'POST', path: '/transactions' },
                  { method: 'GET', path: '/customers' },
                  { method: 'GET', path: '/sites' },
                  { method: 'GET', path: '/reports/revenue' },
                ].map(({ method, path }) => (
                  <div key={`${method}${path}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', background: method === 'GET' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(59, 130, 246, 0.15)', color: method === 'GET' ? 'var(--success)' : '#3B82F6' }}>{method}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{path}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Link href="#" className="btn btn-secondary">{t('api.viewFullDocs')}</Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
