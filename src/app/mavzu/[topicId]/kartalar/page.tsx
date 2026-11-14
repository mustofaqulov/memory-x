
import { T } from '@/components/preferences';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { startAttempt } from '@/app/actions';
import { Flashcards } from './flashcards';

export default async function CardsPage({ params }: { params: Promise<{ topicId: string }> }) {
  await requireUser();
  const { topicId } = await params;
  const topic = await db.topic.findUnique({ where: { id: topicId }, include: { subject: true, cards: { orderBy: { order: 'asc' }, select: { front: true, back: true } } } });
  if (!topic) notFound();
  return <><div className="breadcrumbs"><Link href="/dashboard"><T text={"Boshqaruv"} /></Link><span>/</span><Link href={`/fan/${topic.subjectId}`}><T text={topic.subject.title} /></Link><span>/</span><Link href={`/mavzu/${topic.id}`}><T text={topic.title} /></Link><span>/</span><T text={"Kartochkalar"} /></div><div className="page-head"><p className="eyebrow"><T text={"2-qadam · eslab qolish"} /></p><h1><T text={"Kartochkalar"} /></h1><p className="lead"><T text={"Savolni o‘qing, javobni o‘zingiz aytib ko‘ring, keyin kartani oching."} /></p></div>{topic.cards.length ? <Flashcards cards={topic.cards} /> : <div className="empty"><T text={"Bu mavzuda kartochka hali yo‘q."} /></div>}<div className="divider" /><form action={startAttempt}><input type="hidden" name="topicId" value={topic.id} /><button className="btn" type="submit"><T text={"Testga o‘tish →"} /></button></form></>;
}
