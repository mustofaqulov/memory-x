'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import { translate, type Locale, type Theme } from '@/lib/i18n';
import { LanguagePicker } from './language-picker';

const PreferencesContext = createContext<{ locale: Locale; theme: Theme; setLocale: (locale: Locale) => void; setTheme: (theme: Theme) => void }>({ locale: 'uz', theme: 'dark', setLocale: () => {}, setTheme: () => {} });

export function PreferencesProvider({ initialLocale, initialTheme, children }: { initialLocale: Locale; initialTheme: Theme; children: ReactNode }) {
  const [locale, updateLocale] = useState(initialLocale);
  const [theme, updateTheme] = useState(initialTheme);
  const router = useRouter();
  function persist(name: string, value: string) {
    document.cookie = `memoryx-${name}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  function setLocale(value: Locale) {
    updateLocale(value);
    document.documentElement.lang = value;
    persist('locale', value);
    router.refresh();
  }
  function setTheme(value: Theme) {
    updateTheme(value);
    document.documentElement.dataset.theme = value;
    persist('theme', value);
  }
  return <PreferencesContext.Provider value={{ locale, theme, setLocale, setTheme }}>{children}</PreferencesContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(PreferencesContext).locale;
}

export function useTranslate() {
  const { locale } = useContext(PreferencesContext);
  return (text: string) => translate(text, locale);
}

export function T({ text }: { text: string | number | null | undefined }) {
  const t = useTranslate();
  if (typeof text !== 'string') return text ?? null;
  const result = t(text);
  if (result.trimEnd().endsWith('→')) return <>{result.replace(/→\s*$/, '')}<ArrowRight className="inline-icon" aria-hidden="true" /></>;
  if (result.trimStart().startsWith('←')) return <><ArrowLeft className="inline-icon" aria-hidden="true" />{result.replace(/^\s*←/, '')}</>;
  return result;
}

export function Preferences() {
  const { locale, theme, setLocale, setTheme } = useContext(PreferencesContext);
  const t = useTranslate();
  return <div className="preferences">
    <LanguagePicker locale={locale} label={t('Til')} onChange={setLocale} />
    <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t(theme === 'dark' ? 'Yorug‘ rejim' : 'Qorong‘i rejim')} title={t(theme === 'dark' ? 'Yorug‘ rejim' : 'Qorong‘i rejim')}>
      {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  </div>;
}
