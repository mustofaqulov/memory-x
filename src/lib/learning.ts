export type AnswerKey = { id: string; conceptId: string; correctChoiceId: string; choiceIds: string[] };
export type SubmittedAnswer = { questionId: string; choiceId: string };

export function scoreAnswers(keys: AnswerKey[], answers: SubmittedAnswer[]) {
  if (keys.length === 0 || answers.length !== keys.length || new Set(answers.map(a => a.questionId)).size !== answers.length) throw new Error('Javoblar to‘liq emas.');
  const byId = new Map(answers.map(answer => [answer.questionId, answer.choiceId]));
  const graded = keys.map(key => {
    const choiceId = byId.get(key.id);
    if (!choiceId || !key.choiceIds.includes(choiceId)) throw new Error('Javoblar to‘g‘ri formatda emas.');
    return { questionId: key.id, choiceId, conceptId: key.conceptId, correct: choiceId === key.correctChoiceId };
  });
  const score = graded.filter(a => a.correct).length;
  const weakConcepts = [...new Set(graded.filter(a => !a.correct).map(a => a.conceptId))];
  return { graded, score, weakConcepts };
}

export function rewardForAttempt(score: number, previousBest: number | null) {
  if (previousBest === null) return { xp: 10 + score * 5, coins: score };
  const gain = Math.max(0, score - previousBest);
  return { xp: gain * 2, coins: gain };
}

export function improvement(score: number, previousScore: number | null) {
  return previousScore === null ? null : score - previousScore;
}
