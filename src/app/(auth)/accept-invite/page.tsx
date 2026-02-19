import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function AcceptInvitePage() {
  const t = await getTranslations('auth.acceptInvite');

  return (
    <>
      <h2 className="auth-title">{t('title')}</h2>
      <p className="auth-subtitle">{t('subtitle')}</p>

      <div className="auth-invite-banner">
        <div><strong>{t('invitedBy', { name: 'John Chen' })}</strong></div>
        <div>{t('assignedRole', { role: 'Site Manager' })}</div>
      </div>

      <div className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('firstNameLabel')}</label>
            <input type="text" className="form-input" placeholder={t('firstNamePlaceholder')} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('lastNameLabel')}</label>
            <input type="text" className="form-input" placeholder={t('lastNamePlaceholder')} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t('passwordLabel')}</label>
          <input type="password" className="form-input" placeholder={t('passwordPlaceholder')} />
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
        <span className="password-requirement met">{t('requireNumber')}</span>
        <span className="password-requirement unmet">{t('requireSpecial')}</span>
      </div>

      <button className="btn btn-primary btn-lg btn-block">{t('acceptInvitation')}</button>

      <p className="auth-bottom-text">
        {t('alreadyHaveAccount')}{' '}
        <Link href="/login" className="auth-link">{t('signIn')}</Link>
      </p>
    </>
  );
}
