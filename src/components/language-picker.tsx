'use client';

import { useEffect, useRef, useState, type JSX, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

function UzFlag() {
  return <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#1eb53a" />
    <rect width="30" height="13.2" fill="#fff" />
    <rect width="30" height="6.4" fill="#0099b5" />
    <rect y="6.4" width="30" height=".6" fill="#ce1126" />
    <rect y="12.6" width="30" height=".6" fill="#ce1126" />
    <circle cx="5.4" cy="3.2" r="2.1" fill="#fff" />
    <circle cx="6.2" cy="3.2" r="1.8" fill="#0099b5" />
    <g fill="#fff"><circle cx="9.6" cy="4.6" r=".45" /><circle cx="11.2" cy="4.6" r=".45" /><circle cx="12.8" cy="4.6" r=".45" /><circle cx="11.2" cy="3" r=".45" /><circle cx="12.8" cy="3" r=".45" /><circle cx="12.8" cy="1.4" r=".45" /></g>
  </svg>;
}

function RuFlag() {
  return <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#d52b1e" />
    <rect width="30" height="13.33" fill="#0039a6" />
    <rect width="30" height="6.67" fill="#fff" />
  </svg>;
}

function GbFlag() {
  return <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path d="M0 0v40h60V0z" fill="#012169" />
    <path d="M0 0l60 40m0-40L0 40" stroke="#fff" strokeWidth="8" />
    <path d="M0 0l60 40m0-40L0 40" stroke="#c8102e" strokeWidth="3" />
    <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
    <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7" />
  </svg>;
}

const LANGUAGES: { value: Locale; code: string; name: string; Flag: () => JSX.Element }[] = [
  { value: 'uz', code: 'UZ', name: 'O‘zbekcha', Flag: UzFlag },
  { value: 'ru', code: 'RU', name: 'Русский', Flag: RuFlag },
  { value: 'en', code: 'EN', name: 'English', Flag: GbFlag },
];

const NAVIGATION_KEYS: Record<string, (index: number, last: number) => number> = {
  ArrowDown: index => index + 1,
  ArrowUp: index => index - 1,
  Home: () => 0,
  End: (_, last) => last,
};

export function LanguagePicker({ locale, label, onChange }: { locale: Locale; label: string; onChange: (locale: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const current = LANGUAGES.find(language => language.value === locale) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    rootRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function choose(value: Locale) {
    close();
    if (value !== locale) onChange(value);
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') return close();
    if (event.key === 'Tab') return setOpen(false);
    const move = NAVIGATION_KEYS[event.key];
    if (!move) return;
    event.preventDefault();
    const items = [...(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [])];
    const next = move(items.indexOf(document.activeElement as HTMLButtonElement), items.length - 1);
    items[(next + items.length) % items.length]?.focus();
  }

  return <div className={`language-picker${open ? ' open' : ''}`} ref={rootRef}>
    <button ref={triggerRef} type="button" className="language-control" aria-haspopup="menu" aria-expanded={open} aria-label={`${label}: ${current.name}`} title={label} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); } }}>
      <span className="flag"><current.Flag /></span>
      <span className="lang-code">{current.code}</span>
      <ChevronDown className="lang-chevron" size={14} aria-hidden="true" />
    </button>
    {open && <div className="language-menu" role="menu" aria-label={label} onKeyDown={onMenuKeyDown}>
      {LANGUAGES.map(({ value, code, name, Flag }) => <button key={value} type="button" role="menuitemradio" aria-checked={value === locale} lang={value} className="language-option" onClick={() => choose(value)}>
        <span className="flag"><Flag /></span>
        <span className="language-name">{name}<small>{code}</small></span>
        {value === locale && <Check size={15} aria-hidden="true" />}
      </button>)}
    </div>}
  </div>;
}
