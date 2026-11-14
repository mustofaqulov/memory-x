'use client';

import { useSyncExternalStore } from 'react';
import type { Locale } from '@/lib/i18n';
import { useLocale } from './preferences';

// Browsers ship no Uzbek month names, so Uzbek dates are assembled by hand.
const UZ_MONTHS = ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'];
const LOCALE_TAGS = { ru: 'ru-RU', en: 'en-GB' } as const;
const noopSubscribe = () => () => {};

function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (locale !== 'uz') return new Intl.DateTimeFormat(LOCALE_TAGS[locale], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return `${date.getDate()}-${UZ_MONTHS[date.getMonth()]}, ${time}`;
}

// Formats in the viewer's own time zone; the server render falls back to the ISO date to avoid hydration mismatches.
export function LocalDate({ iso }: { iso: string }) {
  const locale = useLocale();
  const text = useSyncExternalStore(noopSubscribe, () => formatDate(iso, locale), () => iso.slice(0, 10));
  return <time dateTime={iso}>{text}</time>;
}
