import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { recipes } from '@/lib/chemistry/content';
import { T } from '@/components/preferences';
import { Laboratory } from './laboratory';
import './laboratory.css';

export default async function LaboratoryPage() {
  const user = await requireUser();
  const discoveries = await db.labDiscovery.findMany({ where: { userId: user.id }, select: { recipeId: true } });
  const known = discoveries.map(item => item.recipeId);
  return <>
    <div className="breadcrumbs"><Link href="/dashboard"><T text="Boshqaruv" /></Link><span>/</span><Link href="/fan/kimyo"><T text="Kimyo" /></Link><span>/</span><T text="Laboratoriya" /></div>
    <div className="page-head"><p className="eyebrow">Kimyo • interaktiv o‘yin</p><h1>Formulalar laboratoriyasi</h1><p className="lead">Element tanlang, atomlar sonini sozlang va yangi formulalarni kashf qiling.</p></div>
    <Laboratory initialDiscoveries={known} challenges={recipes.map(({ id, name, hint }) => ({ id, name, hint }))} initialCollection={recipes.filter(item => known.includes(item.id)).map(({ id, formula, name }) => ({ id, formula, name }))} />
    <p className="lab-footnote">Bu formula tuzish modeli. Atomlarni ekranda tanlash haqiqiy moddalar o‘z-o‘zidan reaksiyaga kirishishini bildirmaydi. Ionli formulalar ionlar nisbatini ko‘rsatadi.</p>
    <p className="lab-footnote">O‘quv manbalari: <a href="https://openstax.org/books/chemistry-2e/pages/2-4-chemical-formulas" target="_blank" rel="noreferrer">OpenStax — kimyoviy formulalar</a> · <a href="https://periodic-table.rsc.org/" target="_blank" rel="noreferrer">RSC — elementlar jadvali</a></p>
  </>;
}
