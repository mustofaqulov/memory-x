import { db } from './db';
import { scoreAnswers, rewardForAttempt, type SubmittedAnswer } from './learning';

export async function finalizeAttempt(userId: string, attemptId: string, answers: SubmittedAnswer[]) {
  const attempt = await db.quizAttempt.findFirst({ where: { id: attemptId, userId }, include: { topic: { include: { questions: { include: { choices: true } } } } } });
  if (!attempt) throw new Error('Urinish topilmadi.');
  if (attempt.completedAt) return attempt;
  const keys = attempt.topic.questions.map(q => ({ id: q.id, conceptId: q.conceptId, correctChoiceId: q.correctChoiceId, choiceIds: q.choices.map(c => c.id) }));
  const result = scoreAnswers(keys, answers);
  await db.$transaction(async tx => {
    const claimed = await tx.quizAttempt.updateMany({ where: { id: attemptId, userId, completedAt: null }, data: { completedAt: new Date(), score: result.score, total: keys.length } });
    if (claimed.count !== 1) return;
    const previous = await tx.quizAttempt.findMany({ where: { userId, topicId: attempt.topicId, id: { not: attemptId }, completedAt: { not: null } }, select: { score: true } });
    const previousBest = previous.length ? Math.max(...previous.map(a => a.score ?? 0)) : null;
    const reward = rewardForAttempt(result.score, previousBest);
    await tx.attemptAnswer.createMany({ data: result.graded.map(a => ({ attemptId, questionId: a.questionId, choiceId: a.choiceId, conceptId: a.conceptId, correct: a.correct })) });
    for (const conceptId of new Set(result.graded.map(a => a.conceptId))) {
      const matching = result.graded.filter(a => a.conceptId === conceptId);
      await tx.conceptProgress.upsert({
        where: { userId_conceptId: { userId, conceptId } },
        create: { userId, conceptId, correctCount: matching.filter(a => a.correct).length, wrongCount: matching.filter(a => !a.correct).length, lastCorrect: matching.every(a => a.correct) },
        update: { correctCount: { increment: matching.filter(a => a.correct).length }, wrongCount: { increment: matching.filter(a => !a.correct).length }, lastCorrect: matching.every(a => a.correct) }
      });
    }
    await tx.rewardTransaction.create({ data: { userId, attemptId, xp: reward.xp, coins: reward.coins } });
    await tx.profile.update({ where: { userId }, data: { xp: { increment: reward.xp }, coins: { increment: reward.coins } } });
  });
  return db.quizAttempt.findUniqueOrThrow({ where: { id: attemptId } });
}
