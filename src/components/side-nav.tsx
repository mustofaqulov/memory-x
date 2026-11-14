'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Atom, BookOpen, ChartNoAxesColumn, House, LogIn, UserRound, UserRoundPlus } from 'lucide-react';
import { useTranslate } from './preferences';

export function SideNav({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const t = useTranslate();
  const items = signedIn ? [
    { href: '/dashboard', label: 'Boshqaruv', Icon: House, active: pathname === '/dashboard' },
    { href: '/dashboard#subjects', label: 'Fanlar', Icon: BookOpen, active: pathname.startsWith('/fan/') || pathname.startsWith('/mavzu/') },
    { href: '/dashboard#results', label: 'So‘nggi natijalar', Icon: ChartNoAxesColumn, active: pathname.startsWith('/natija/') || pathname.startsWith('/test/') || pathname.startsWith('/takrorlash/') },
    { href: '/profil', label: 'Profil', Icon: UserRound, active: pathname === '/profil' },
  ] : [
    { href: '/', label: 'MEMORYX bosh sahifa', Icon: House, active: pathname === '/' },
    { href: '/kirish', label: 'Kirish', Icon: LogIn, active: pathname === '/kirish' },
    { href: '/royxatdan-otish', label: 'Hisob yaratish', Icon: UserRoundPlus, active: pathname === '/royxatdan-otish' },
  ];
  return <aside className="side-rail" aria-label={t('Asosiy menyu')}>
    <span className="rail-brand" aria-hidden="true"><Atom size={26} /></span>
    <nav className="rail-links" aria-label={t('Asosiy menyu')}>
      {items.map(({ href, label, Icon, active }) => <Link key={href} href={href} className={`rail-link${active ? ' active' : ''}`} aria-label={t(label)} aria-current={active ? 'page' : undefined} title={t(label)}><Icon size={21} strokeWidth={1.8} aria-hidden="true" /><span className="sr-only">{t(label)}</span></Link>)}
    </nav>
    <div className="rail-mark" aria-hidden="true">M<span>✦</span></div>
  </aside>;
}
