import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function ResetPasswordPage() {
  const t = await getTranslations('auth.resetPassword');

  return (
    <>
      <h2 className="auth-title">{t('title')}</h2>
      <p className="auth-subtitle">{t('subtitle')}</p>

      <div className="auth-form">
        <div className="form-group">
          <label className="form-label">{t('newPasswordLabel')}</label>
          <input type="password" className="form-input" placeholder={t('newPasswordPlaceholder')} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('confirmPasswordLabel')}</label>
          <input type="password" className="form-input" placeholder={t('confirmPasswordPlaceholder')} />
        </div>
      </div>

      <div className="password-requirements">
        <span className="password-requirement met">{t('requireAtLeast8')}</span>
        <span className="password-requirement met">{t('requireUppercase')}</span>
        <span className="password-requirement met">{t('requireLowercase')}</span>
        <span className="password-requirement unmet">{t('requireNumber')}</span>
        <span className="password-requirement unmet">{t('requireSpecial')}</span>
      </div>

      <button className="btn btn-primary btn-lg btn-block">{t('resetPassword')}</button>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link href="/login" className="auth-link">{t('backToLogin')}</Link>
      </div>
    </>
  );
}
