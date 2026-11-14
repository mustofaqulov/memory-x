import { BookOpen, Layers, RotateCcw } from 'lucide-react';

import { T } from '@/components/preferences';
import { HeroPreview } from '@/components/hero-preview';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { startDemo } from './actions';

export default async function Home() {
  const user = await getUser();
  return <>
    <section className="hero">
      <div><p className="eyebrow"><T text={"Tushunishdan natijagacha"} /></p><h1><T text={"O‘rganing. Mashq qiling. "} /><span className="gradient-text"><T text={"Xatodan o‘sing."} /></span></h1><p className="lead"><T text={"MEMORYX darsni tushunishga, bilimni kartochkalar bilan mustahkamlashga va testdagi xatoni aniq mavzu orqali tuzatishga yordam beradi."} /></p><div className="actions">{user ? <Link className="btn" href="/dashboard"><T text={"O‘qishni davom ettirish →"} /></Link> : <><form action={startDemo}><button className="btn" type="submit"><T text={"Demoni boshlash →"} /></button></form><Link className="btn secondary" href="/royxatdan-otish"><T text={"Hisob yaratish"} /></Link></>}</div><p className="form-note" style={{marginTop:18}}><T text={"Demo natijalari saqlanadi, ammo hisobdan chiqsangiz unga qayta kira olmaysiz. Bu sinov versiyasida to‘lovlar yo‘q."} /></p></div>
      <div className="hero-visual"><HeroPreview /></div>
    </section>
    <section className="section"><div className="section-heading"><p className="eyebrow"><T text={"O‘rganish yo‘li"} /></p><h2><T text={"Har bir qadam keyingisiga yordam beradi"} /></h2></div><div className="grid"><div className="card"><span className="step-number"><BookOpen aria-hidden="true" /></span><h3><T text={"Tushuning"} /></h3><p className="muted"><T text={"Qisqa dars va hayotga yaqin misollar bilan mavzuni oching."} /></p></div><div className="card"><span className="step-number"><Layers aria-hidden="true" /></span><h3><T text={"Mustahkamlang"} /></h3><p className="muted"><T text={"Kartochkalarni aylantiring, keyin savollarga javob bering."} /></p></div><div className="card"><span className="step-number"><RotateCcw aria-hidden="true" /></span><h3><T text={"Qayta ko‘ring"} /></h3><p className="muted"><T text={"Xato bo‘lgan tushunchani boshqa izoh bilan o‘rganib, yana urinib ko‘ring."} /></p></div></div></section>
  </>;
}
