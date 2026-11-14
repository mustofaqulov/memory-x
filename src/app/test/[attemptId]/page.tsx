
import { T } from '@/components/preferences';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { QuizForm } from './quiz-form';

export default async function QuizPage({ params, searchParams }: { params: Promise<{ attemptId: string }>; searchParams: Promise<{ error?: string }> }) {
  const user = await requireUser();
  const { attemptId } = await params;
  const { error } = await searchParams;
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId: user.id }, include: { topic: { include: { subject: true } } } });
  if (!attempt) notFound();
  if (attempt.completedAt) redirect(`/natija/${attemptId}`);
  const questions = await db.question.findMany({ where: { topicId: attempt.topicId }, orderBy: { order: 'asc' }, select: { id: true, prompt: true, choices: { orderBy: { order: 'asc' }, select: { id: true, text: true } } } });
  return <><div className="breadcrumbs"><Link href="/dashboard"><T text={"Boshqaruv"} /></Link><span>/</span><Link href={`/mavzu/${attempt.topicId}`}><T text={attempt.topic.title} /></Link><span>/</span><T text={"Test"} /></div><div className="page-head"><p className="eyebrow"><T text={"3-qadam · bilimingizni tekshiring"} /></p><h1><T text={attempt.topic.title} /><T text={" testi"} /></h1><p className="lead"><T text={"Har savolga bitta javob tanlang. Xato bo‘lsa, sababini va qaysi tushunchani qayta ko‘rishni bilib olasiz."} /></p></div>{error && <p className="alert" role="alert"><T text={"Javoblarni tekshirib, barcha savollarga qayta javob bering. Tanlovlaringiz shu brauzerda vaqtincha saqlangan."} /></p>}{questions.length ? <QuizForm attemptId={attemptId} questions={questions} /> : <div className="empty"><T text={"Bu mavzuda test savollari hali yo‘q."} /></div>}</>;
}
