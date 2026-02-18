'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <select value={locale} onChange={handleChange}>
      {localeOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
