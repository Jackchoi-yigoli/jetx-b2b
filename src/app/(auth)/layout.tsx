import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('auth');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>JetX</h1>
          <span>B2B</span>
        </div>
        {children}
        <div className="auth-footer">
          <LanguageSwitcher />
          <p className="auth-copyright">{t('copyright')}</p>
        </div>
      </div>
    </div>
  );
}
