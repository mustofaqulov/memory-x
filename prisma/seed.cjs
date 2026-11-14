const { PrismaClient } = require('@memoryx/prisma-client');
const { randomBytes, scryptSync } = require('node:crypto');
const { subjects, topics } = require('./content.cjs');
const db = new PrismaClient();

function passwordHash(password) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

async function main() {
  for (const subject of subjects) await db.subject.upsert({ where: { id: subject.id }, create: subject, update: subject });

  for (const [order, item] of topics.entries()) {
    await db.topic.upsert({
      where: { id: item.id },
      create: { id: item.id, subjectId: item.subject, title: item.title, summary: item.summary, grade: item.grade, durationMin: item.minutes, order },
      update: { title: item.title, summary: item.summary, grade: item.grade, durationMin: item.minutes, order }
    });
    await db.lesson.upsert({ where: { topicId: item.id }, create: { id: `${item.id}-lesson`, topicId: item.id, ...item.lesson }, update: item.lesson });
    for (const [index, card] of item.cards.entries()) {
      const data = { topicId: item.id, front: card[0], back: card[1], order: index };
      await db.flashcard.upsert({ where: { id: `${item.id}-card-${index + 1}` }, create: { id: `${item.id}-card-${index + 1}`, ...data }, update: data });
    }
    for (const concept of item.concepts) {
      const [conceptId, title, explanation, analogy, practicePrompt, practiceAnswer, practiceFeedback] = concept;
      const data = { title, explanation, analogy, practicePrompt, practiceAnswer, practiceFeedback };
      await db.alternativeExplanation.upsert({ where: { conceptId }, create: { id: `${conceptId}-review`, conceptId, ...data }, update: data });
    }
    for (const [index, question] of item.questions.entries()) {
      const data = { topicId: item.id, prompt: question.prompt, conceptId: question.concept, correctChoiceId: `${question.id}-choice-${question.answer}`, correctNote: question.correctNote, wrongNote: question.wrongNote, order: index };
      await db.question.upsert({ where: { id: question.id }, create: { id: question.id, ...data }, update: data });
      for (const [choiceIndex, choice] of question.choices.entries()) {
        const choiceData = { questionId: question.id, text: choice, order: choiceIndex };
        await db.choice.upsert({ where: { id: `${question.id}-choice-${choiceIndex}` }, create: { id: `${question.id}-choice-${choiceIndex}`, ...choiceData }, update: choiceData });
      }
    }
  }
  if (process.env.DEMO_PASSWORD) {
    const email = 'demo@memoryx.local';
    const user = await db.user.upsert({ where: { email }, create: { email, passwordHash: passwordHash(process.env.DEMO_PASSWORD) }, update: {} });
    await db.profile.upsert({ where: { userId: user.id }, create: { userId: user.id, nickname: 'Demo o‘quvchi', track: 'school', grade: 8 }, update: {} });
  }
  console.log(`Tayyor: ${topics.length} mavzu, ${topics.reduce((n, t) => n + t.questions.length, 0)} savol.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
