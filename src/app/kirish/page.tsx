
import { T } from '@/components/preferences';
import Link from 'next/link';
import { signIn, startDemo } from '../actions';

export default async function SignIn({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <div className="form-wrap"><div className="form-card"><p className="eyebrow"><T text={"Qaytganingizdan xursandmiz"} /></p><h1 style={{fontSize:36}}><T text={"Hisobga kirish"} /></h1><p className="muted"><T text={"O‘qishni davom ettirish uchun hisobingizga kiring."} /></p>{error && <p className="alert" role="alert"><T text={error === 'locked' ? 'Ko‘p urinish bo‘ldi. 15 daqiqadan keyin qayta urinib ko‘ring.' : 'Elektron pochta yoki parol noto‘g‘ri.'} /></p>}<form action={signIn}><label className="field"><span><T text={"Elektron pochta"} /></span><input className="input" name="email" type="email" autoComplete="email" required /></label><label className="field"><span><T text={"Parol"} /></span><input className="input" name="password" type="password" autoComplete="current-password" required /></label><button className="btn full" type="submit"><T text={"Kirish"} /></button></form><div className="divider" /><p className="form-note"><T text={"Hali hisobingiz yo‘qmi? "} /><Link href="/royxatdan-otish" style={{color:'var(--blue)'}}><T text={"Ro‘yxatdan o‘ting"} /></Link></p><form action={startDemo}><button className="btn ghost full" type="submit"><T text={"Alohida demo hisobni ochish"} /></button></form></div></div>;
}
