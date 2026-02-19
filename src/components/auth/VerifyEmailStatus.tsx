'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function VerifyEmailStatus() {
  const t = useTranslations('auth.verifyEmail');
  const [verified, setVerified] = useState(false);
  const mockEmail = 'admin@jetx.com';

  if (verified) {
    return (
      <>
        <div className="auth-status-icon success">
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="auth-title">{t('successTitle')}</h2>
        <p className="auth-subtitle">{t('successMessage')}</p>
        <Link href="/login" className="btn btn-primary btn-lg btn-block">
          {t('continueToLogin')}
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="auth-status-icon pending">
        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>
      <h2 className="auth-title">{t('pendingTitle')}</h2>
      <p className="auth-subtitle">{t('pendingSubtitle', { email: mockEmail })}</p>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: 24 }}>
        {t('pendingMessage')}
      </p>
      <button className="btn btn-primary btn-lg btn-block" onClick={() => setVerified(true)}>
        {t('resendEmail')}
      </button>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link href="/login" className="auth-link">{t('backToLogin')}</Link>
      </div>
    </>
  );
}
