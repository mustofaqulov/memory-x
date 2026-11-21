'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { useTranslate } from '@/components/preferences';
import styles from './back-button.module.css';

function fallbackPath(pathname: string) {
  if (pathname === '/kirish' || pathname === '/royxatdan-otish') return '/';
  if (pathname === '/fan/kimyo/laboratoriya') return '/fan/kimyo';
  if (pathname.startsWith('/mavzu/') && pathname.endsWith('/kartalar')) return pathname.slice(0, -'/kartalar'.length);
  return '/dashboard';
}

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslate();
  const routeStack = useRef<string[]>([pathname]);

  useEffect(() => {
    const stack = routeStack.current;
    if (stack[stack.length - 1] === pathname) return;
    if (stack.length > 1 && stack[stack.length - 2] === pathname) stack.pop();
    else stack.push(pathname);
  }, [pathname]);

  if (pathname === '/' || pathname === '/dashboard') return null;

  function goBack() {
    if (routeStack.current.length > 1) router.back();
    else {
      const fallback = fallbackPath(pathname);
      routeStack.current = [fallback];
      router.replace(fallback);
    }
  }

  return <button
    className={styles.back}
    type="button"
    onClick={goBack}
    aria-label={t('Orqaga qaytish')}
    title={t('Orqaga qaytish')}
  ><ArrowLeft size={20} strokeWidth={2} aria-hidden="true" /></button>;
}
