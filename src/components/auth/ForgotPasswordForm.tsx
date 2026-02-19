'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const [submitted, setSubmitted] = useState(false);
  const mockEmail = 'admin@jetx.com';

  if (submitted) {
    return (
      <>
        <div className="auth-status-icon pending">
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <h2 className="auth-title">{t('successTitle')}</h2>
        <p className="auth-subtitle">{t('successMessage', { email: mockEmail })}</p>
        <p className="auth-bottom-text">
          {t('didNotReceive')}{' '}
          <button onClick={() => setSubmitted(false)} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {t('resendEmail')}
          </button>
        </p>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/login" className="auth-link">{t('backToLogin')}</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="auth-title">{t('title')}</h2>
      <p className="auth-subtitle">{t('subtitle')}</p>
      <div className="auth-form">
        <div className="form-group">
          <label className="form-label">{t('emailLabel')}</label>
          <input type="email" className="form-input" placeholder={t('emailPlaceholder')} defaultValue={mockEmail} />
        </div>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setSubmitted(true)}>
          {t('sendResetLink')}
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link href="/login" className="auth-link">{t('backToLogin')}</Link>
      </div>
    </>
  );
}
