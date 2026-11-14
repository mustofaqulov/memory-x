
import { T } from '@/components/preferences';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { startAttempt } from '@/app/actions';

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const user = await requireUser();
  const { topicId } = await params;
  const topic = await db.topic.findUnique({ where: { id: topicId }, include: { subject: true, lesson: true, cards: { select: { id: true } } } });
  if (!topic || !topic.lesson) notFound();
  const previous = await db.quizAttempt.findFirst({ where: { userId: user.id, topicId, completedAt: { not: null } }, orderBy: { completedAt: 'desc' } });
  return <><div className="breadcrumbs"><Link href="/dashboard"><T text={"Boshqaruv"} /></Link><span>/</span><Link href={`/fan/${topic.subjectId}`}><T text={topic.subject.title} /></Link><span>/</span><T text={topic.title} /></div><div className="page-head"><p className="eyebrow">{topic.grade}<T text={"-sinf · "} />{topic.durationMin}<T text={" daqiqa"} /></p><h1><T text={topic.title} /></h1><p className="lead"><T text={topic.summary} /></p></div><div className="lesson-layout"><article className="card lesson-copy"><h2><T text={"Dars"} /></h2><p><T text={topic.lesson.intro} /></p><p><T text={topic.lesson.body} /></p><div className="example"><strong><T text={"Misol"} /></strong><p style={{margin:'8px 0 0'}}><T text={topic.lesson.example} /></p></div></article><aside className="card aside-box"><p className="eyebrow"><T text={"Sizning yo‘lingiz"} /></p><h3><T text={"Dars → kartochka → test"} /></h3><p className="muted"><T text={"Avval "} />{topic.cards.length}<T text={" ta kartochka bilan asosiy tushunchalarni mustahkamlang."} /></p><Link className="btn full" href={`/mavzu/${topic.id}/kartalar`}><T text={"Kartochkalarga o‘tish →"} /></Link><div className="divider" /><form action={startAttempt}><input type="hidden" name="topicId" value={topic.id} /><button className="btn secondary full" type="submit"><T text={"Testni boshlash"} /></button></form>{previous && <p className="form-note" style={{marginTop:12}}><T text={"So‘nggi natija: "} />{previous.score}/{previous.total}<T text={". Yangi test alohida urinish sifatida saqlanadi."} /></p>}</aside></div></>;
}
