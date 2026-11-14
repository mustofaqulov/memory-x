
import { T } from '@/components/preferences';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { improvement } from '@/lib/learning';
import { startAttempt } from '@/app/actions';

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const user = await requireUser();
  const { attemptId } = await params;
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId: user.id }, include: { topic: { include: { subject: true, questions: { orderBy: { order: 'asc' }, include: { choices: true } } } }, answers: true, reward: true } });
  if (!attempt) notFound();
  if (!attempt.completedAt) redirect(`/test/${attemptId}`);
  const previous = await db.quizAttempt.findFirst({ where: { userId: user.id, topicId: attempt.topicId, completedAt: { lt: attempt.completedAt } }, orderBy: { completedAt: 'desc' }, select: { score: true } });
  const delta = improvement(attempt.score ?? 0, previous?.score ?? null);
  const answerMap = new Map(attempt.answers.map(a => [a.questionId, a]));
  const weak = [...new Set(attempt.answers.filter(a => !a.correct).map(a => a.conceptId))];
  const reviews = await db.alternativeExplanation.findMany({ where: { conceptId: { in: weak } } });
  return <><div className="breadcrumbs"><Link href="/dashboard"><T text={"Boshqaruv"} /></Link><span>/</span><Link href={`/mavzu/${attempt.topicId}`}><T text={attempt.topic.title} /></Link><span>/</span><T text={"Natija"} /></div><div className="page-head"><p className="eyebrow"><T text={"Test yakunlandi"} /></p><h1><T text={"Natijangiz"} /></h1><p className="lead"><T text={"Har bir javob ostida nima to‘g‘ri yoki xato bo‘lganini ko‘ring."} /></p></div><div className="card result-summary" style={{maxWidth:850}}><div className="score">{attempt.score}<span> / {attempt.total}</span></div><p className="muted"><T text={"To‘g‘ri javob · "} /><T text={attempt.topic.title} /></p>{delta !== null && <p className="chip"><T text={delta > 0 ? `Oldingi urinishdan +${delta} ta ko‘p` : delta < 0 ? `Oldingi urinishdan ${Math.abs(delta)} ta kam` : 'Oldingi urinish bilan bir xil'} /></p>}<p className="form-note"><T text={"Bu faqat urinishlar orasidagi farq; o‘quv samaradorligi bahosi emas."} /></p><div className="topic-meta"><span className="chip green">+{attempt.reward?.xp ?? 0}<T text={" XP"} /></span><span className="chip">+{attempt.reward?.coins ?? 0}<T text={" virtual tanga"} /></span></div></div>
    {reviews.length > 0 ? <section className="section" style={{maxWidth:850}}><p className="eyebrow"><T text={"Qayta ko‘rish"} /></p><h2><T text={"E’tibor beriladigan tushunchalar"} /></h2><div className="mini-list">{reviews.map(review => <div className="card" key={review.id}><h3><T text={review.title} /></h3><p className="muted"><T text={"Boshqa izoh va bitta qisqa mashq bilan mustahkamlang."} /></p><Link className="btn secondary small" href={`/takrorlash/${attemptId}/${review.conceptId}`}><T text={"Tushunchani ko‘rish →"} /></Link></div>)}</div></section> : <section className="section"><div className="success" style={{maxWidth:850}}><T text={"Barcha savollar to‘g‘ri. Mavzuni yaxshi bajardingiz!"} /></div></section>}
    <section className="section" style={{paddingTop:0}}><h2><T text={"Javoblar tahlili"} /></h2><div className="result-list">{attempt.topic.questions.map((q,index) => { const answer = answerMap.get(q.id); const chosen = q.choices.find(c => c.id === answer?.choiceId); const correct = q.choices.find(c => c.id === q.correctChoiceId); return <article className={`result-item ${answer?.correct ? 'correct' : 'wrong'}`} key={q.id}><span className="eyebrow">{index+1}<T text={"-savol · "} /><T text={answer?.correct ? 'To‘g‘ri' : 'Xato'} /></span><h3 style={{margin:'8px 0'}}><T text={q.prompt} /></h3><p><T text={"Sizning javobingiz: "} /><strong><T text={chosen?.text ?? 'Topilmadi'} /></strong></p>{!answer?.correct && <p><T text={"To‘g‘ri javob: "} /><strong><T text={correct?.text} /></strong></p>}<p className="muted"><T text={answer?.correct ? q.correctNote : q.wrongNote} /></p>{!answer?.correct && <Link style={{color:'var(--blue)',fontWeight:800}} href={`/takrorlash/${attemptId}/${q.conceptId}`}><T text={"Shu tushunchani qayta ko‘rish →"} /></Link>}</article>; })}</div></section>
    <div className="actions"><form action={startAttempt}><input type="hidden" name="topicId" value={attempt.topicId} /><button className="btn" type="submit"><T text={"Yangi urinish →"} /></button></form><Link className="btn secondary" href="/dashboard"><T text={"Boshqaruvga qaytish"} /></Link></div>
  </>;
}
