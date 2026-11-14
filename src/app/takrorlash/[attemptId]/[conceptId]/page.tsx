
import { T } from '@/components/preferences';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { checkPractice, startAttempt } from '@/app/actions';

export default async function ReviewPage({ params, searchParams }: { params: Promise<{ attemptId: string; conceptId: string }>; searchParams: Promise<{ practice?: string }> }) {
  const user = await requireUser();
  const { attemptId, conceptId } = await params;
  const { practice } = await searchParams;
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId: user.id, completedAt: { not: null }, answers: { some: { conceptId, correct: false } } }, include: { topic: true } });
  const review = await db.alternativeExplanation.findUnique({ where: { conceptId } });
  if (!attempt || !review) notFound();
  return <><div className="breadcrumbs"><Link href="/dashboard"><T text={"Boshqaruv"} /></Link><span>/</span><Link href={`/natija/${attemptId}`}><T text={"Natija"} /></Link><span>/</span><T text={"Takrorlash"} /></div><div className="page-head"><p className="eyebrow"><T text={"4-qadam · boshqa yo‘l bilan tushuning"} /></p><h1><T text={review.title} /></h1><p className="lead"><T text={"Bu izoh aynan shu urinishdagi xato tushunchaga mos."} /></p></div><div className="lesson-layout"><article className="card lesson-copy"><h2><T text={"Boshqa izoh"} /></h2><p><T text={review.explanation} /></p><div className="example"><strong><T text={"O‘xshatish"} /></strong><p style={{margin:'8px 0 0'}}><T text={review.analogy} /></p></div><div className="review-box"><p className="eyebrow"><T text={"Qisqa mashq"} /></p><h3><T text={review.practicePrompt} /></h3><form action={checkPractice}><input type="hidden" name="attemptId" value={attemptId} /><input type="hidden" name="conceptId" value={conceptId} /><label className="field"><span><T text={"Javobingiz"} /></span><input className="input" name="answer" required maxLength={100} autoComplete="off" /></label><button className="btn small" type="submit"><T text={"Mashqni tekshirish"} /></button></form>{practice === 'correct' && <p className="success" role="status"><T text={"To‘g‘ri! "} /><T text={review.practiceFeedback} /></p>}{practice === 'wrong' && <p className="alert" role="status"><T text={"Hali to‘g‘ri emas. Izohni yana bir bor o‘qib, qayta urinib ko‘ring."} /></p>}</div></article><aside className="card aside-box"><p className="eyebrow"><T text={"5-qadam · qayta urinish"} /></p><h3><T text={"Bilimingizni yana tekshiring"} /></h3><p className="muted"><T text={"Yangi test alohida urinish sifatida yoziladi. Oldingi natijangiz saqlanadi."} /></p><form action={startAttempt}><input type="hidden" name="topicId" value={attempt.topicId} /><button className="btn full" type="submit"><T text={"Yangi testni boshlash →"} /></button></form><div className="divider" /><Link className="btn ghost full" href={`/natija/${attemptId}`}><T text={"Natijaga qaytish"} /></Link></aside></div></>;
}
