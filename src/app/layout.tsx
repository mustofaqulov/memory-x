import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LogOut, ShieldCheck } from 'lucide-react';
import { getUser } from '@/lib/auth';
import { isLocale, translate } from '@/lib/i18n';
import { Preferences, PreferencesProvider, T } from '@/components/preferences';
import { SideNav } from '@/components/side-nav';
import { BackButton } from '@/components/back-button';
import { signOut } from './actions';
import './globals.css';
import './motion.css';

export async function generateMetadata(): Promise<Metadata> {
  const value = (await cookies()).get('memoryx-locale')?.value;
  const locale = isLocale(value) ? value : 'uz';
  return { title: translate('MEMORYX — tushunib o‘rganing', locale), description: translate('Fanlarni tushuning, mashq qiling va xatolaringiz ustida ishlang.', locale) };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, cookieStore] = await Promise.all([getUser(), cookies()]);
  const value = cookieStore.get('memoryx-locale')?.value;
  const locale = isLocale(value) ? value : 'uz';
  const theme = cookieStore.get('memoryx-theme')?.value === 'dark' ? 'dark' : 'light';
  return <html lang={locale} data-theme={theme} data-scroll-behavior="smooth"><body>
    <PreferencesProvider initialLocale={locale} initialTheme={theme}>
      <div className="site-shell">
        <SideNav signedIn={Boolean(user)} />
        <div className="workspace">
          <header className="site-header">
            <div className="header-start"><Suspense fallback={null}><BackButton /></Suspense><Link className="brand" href={user ? '/dashboard' : '/'} aria-label={translate('MEMORYX bosh sahifa', locale)}><span className="brand-kicker"><T text="Tushunishdan natijagacha" /></span><span>memory<span className="brand-accent">x</span></span></Link></div>
            <div className="header-controls">
              {!user && <nav className="top-nav" aria-label={translate('Asosiy menyu', locale)}><Link href="/kirish"><T text="Kirish" /></Link><Link className="nav-pill" href="/royxatdan-otish"><T text="Boshlash" /></Link></nav>}
              <Preferences />
              {user && <form action={signOut}><button type="submit" className="nav-button"><LogOut size={17} aria-hidden="true" /><T text="Chiqish" /></button></form>}
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="site-footer"><span>© {new Date().getFullYear()} MEMORYX</span><span><ShieldCheck size={15} aria-hidden="true" /><T text="Virtual tangalar pul qiymatiga ega emas. Ma’lumotlaringiz faqat o‘qish jarayoni uchun saqlanadi." /></span></footer>
        </div>
      </div>
    </PreferencesProvider>
  </body></html>;
}
