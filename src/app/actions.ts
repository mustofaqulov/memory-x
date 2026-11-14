'use server';

import { randomBytes } from 'node:crypto';
import { Prisma } from '@memoryx/prisma-client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, clearSession, getUser, hashPassword, requireUser, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { finalizeAttempt } from '@/lib/quiz';
import { translate } from '@/lib/i18n';

const emailSchema = z.email().max(120).transform(s => s.trim().toLowerCase());
const passwordSchema = z.string().min(8).max(100);
const profileSchema = z.object({ nickname: z.string().trim().min(2).max(30), track: z.enum(['school', 'entrance']), grade: z.number().int().min(1).max(11).nullable() });
function value(form: FormData, key: string) { return String(form.get(key) ?? ''); }

export async function register(form: FormData) {
  const parsed = z.object({ email: emailSchema, password: passwordSchema, nickname: z.string().trim().min(2).max(30), track: z.enum(['school', 'entrance']) }).safeParse({ email: value(form, 'email'), password: value(form, 'password'), nickname: value(form, 'nickname'), track: value(form, 'track') });
  const grade = value(form, 'grade') ? Number(value(form, 'grade')) : null;
  if (!parsed.success || (parsed.data?.track === 'school' && (!Number.isInteger(grade) || grade! < 1 || grade! > 11))) redirect('/royxatdan-otish?error=validation');
  let user;
  try {
    user = await db.user.create({ data: { email: parsed.data.email, passwordHash: hashPassword(parsed.data.password), profile: { create: { nickname: parsed.data.nickname, track: parsed.data.track, grade: parsed.data.track === 'school' ? grade : null } } } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') redirect('/royxatdan-otish?error=exists');
    throw error;
  }
  await createSession(user.id);
  redirect('/dashboard');
}

export async function signIn(form: FormData) {
  const parsed = z.object({ email: emailSchema, password: z.string().min(1) }).safeParse({ email: value(form, 'email'), password: value(form, 'password') });
  if (!parsed.success) redirect('/kirish?error=invalid');
  const email = parsed.data.email;
  const now = new Date();
  const throttle = await db.authThrottle.findUnique({ where: { email } });
  if (throttle?.lockedUntil && throttle.lockedUntil > now) redirect('/kirish?error=locked');
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    const inWindow = throttle && now.getTime() - throttle.windowStart.getTime() < 15 * 60000;
    const failures = inWindow ? throttle.failures + 1 : 1;
    await db.authThrottle.upsert({ where: { email }, create: { email, failures, windowStart: now }, update: { failures, windowStart: inWindow ? throttle.windowStart : now, lockedUntil: failures >= 5 ? new Date(now.getTime() + 15 * 60000) : null } });
    redirect('/kirish?error=invalid');
  }
  await db.authThrottle.deleteMany({ where: { email } });
  await createSession(user.id);
  redirect('/dashboard');
}

export async function signOut() { await clearSession(); redirect('/'); }

export async function startDemo() {
  const id = randomBytes(8).toString('hex');
  const user = await db.user.create({ data: { email: `demo-${id}@memoryx.local`, isDemo: true, passwordHash: hashPassword(randomBytes(32).toString('hex')), profile: { create: { nickname: 'Demo o‘quvchi', track: 'school', grade: 8 } } } });
  await createSession(user.id);
  redirect('/dashboard');
}

export async function updateProfile(form: FormData) {
  const user = await requireUser();
  const track = value(form, 'track');
  const grade = value(form, 'grade') ? Number(value(form, 'grade')) : null;
  const parsed = profileSchema.safeParse({ nickname: value(form, 'nickname'), track, grade: track === 'school' ? grade : null });
  if (!parsed.success || (track === 'school' && grade === null)) redirect('/profil?error=validation');
  await db.profile.update({ where: { userId: user.id }, data: parsed.data });
  redirect('/profil?saved=1');
}

export async function startAttempt(form: FormData) {
  const user = await requireUser();
  const topicId = value(form, 'topicId');
  const topic = await db.topic.findUnique({ where: { id: topicId }, select: { id: true } });
  if (!topic) redirect('/dashboard');
  const attempt = await db.quizAttempt.create({ data: { userId: user.id, topicId } });
  redirect(`/test/${attempt.id}`);
}

export async function submitAttempt(form: FormData) {
  const user = await requireUser();
  const attemptId = value(form, 'attemptId');
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId: user.id }, select: { id: true, completedAt: true, topicId: true } });
  if (!attempt) redirect('/dashboard');
  if (attempt.completedAt) redirect(`/natija/${attempt.id}`);
  const questions = await db.question.findMany({ where: { topicId: attempt.topicId }, select: { id: true } });
  const answers = questions.map(q => ({ questionId: q.id, choiceId: value(form, `q:${q.id}`) }));
  try { await finalizeAttempt(user.id, attempt.id, answers); }
  catch (error) {
    if (error instanceof Error && error.message.startsWith('Javoblar')) redirect(`/test/${attempt.id}?error=answers`);
    throw error;
  }
  redirect(`/natija/${attempt.id}`);
}

export async function checkPractice(form: FormData) {
  const user = await getUser();
  if (!user) redirect('/kirish');
  const attemptId = value(form, 'attemptId');
  const conceptId = value(form, 'conceptId');
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId: user.id, completedAt: { not: null }, answers: { some: { conceptId, correct: false } } }, select: { id: true } });
  if (!attempt) redirect('/dashboard');
  const review = await db.alternativeExplanation.findUnique({ where: { conceptId } });
  if (!review) redirect(`/natija/${attemptId}`);
  const normalize = (s: string) => s.trim().toLocaleLowerCase('uz').replace(/[.!?]+$/g, '').replace(/\s+/g, ' ');
  const given = normalize(value(form, 'answer'));
  const expectedAnswers = [review.practiceAnswer, translate(review.practiceAnswer, 'ru'), translate(review.practiceAnswer, 'en')].map(normalize);
  const correct = expectedAnswers.some(expected => given === expected || (expected === normalize(review.practiceAnswer) && expected.length > 3 && given === `${expected}da`));
  redirect(`/takrorlash/${attemptId}/${conceptId}?practice=${correct ? 'correct' : 'wrong'}`);
}
