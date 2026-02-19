'use client';

import { useTranslations } from 'next-intl';
import ThemeToggle from '../ui/ThemeToggle';

export default function Topbar() {
  const t = useTranslations('topbar');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-search">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder={t('searchPlaceholder')} />
        </div>
      </div>
      <div className="topbar-actions">
        <ThemeToggle />
        <div className="topbar-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="badge">3</span>
        </div>
        <div className="user-menu">
          <div className="user-avatar">JC</div>
          <div className="user-info">
            <div className="user-name">James Chen</div>
            <div className="user-role">{t('userRole')}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
