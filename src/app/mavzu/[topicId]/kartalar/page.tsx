import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Layers3, ListChecks } from 'lucide-react';

import { T } from '@/components/preferences';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubjectIcon } from '@/lib/subjects';
import { startAttempt } from '@/app/actions';
import { Flashcards } from './flashcards';
import styles from './page.module.css';

export default async function CardsPage({ params }: { params: Promise<{ topicId: string }> }) {
  await requireUser();
  const { topicId } = await params;
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    include: { subject: true, cards: { orderBy: { order: 'asc' }, select: { front: true, back: true } } },
  });
  if (!topic) notFound();

  return <>
    <div className="breadcrumbs">
      <Link href="/dashboard"><T text="Boshqaruv" /></Link><span>/</span>
      <Link href={`/fan/${topic.subjectId}`}><T text={topic.subject.title} /></Link><span>/</span>
      <Link href={`/mavzu/${topic.id}`}><T text={topic.title} /></Link><span>/</span>
      <T text="Kartochkalar" />
    </div>
    <div className={styles.studyColumn}>
      <section className={`${styles.hero} ${styles[topic.subjectId] ?? styles.fizika}`} aria-labelledby="cards-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><T text="2-qadam · eslab qolish" /> <span aria-hidden="true">/</span> <T text={topic.title} /></p>
          <h1 id="cards-title"><T text="Kartochkalar" /></h1>
          <p className={styles.lead}><T text="Savolni o‘qing, javobni o‘zingiz aytib ko‘ring, keyin kartani oching." /></p>
          <div className={styles.steps}>
            <span><BookOpen size={16} aria-hidden="true" /><T text="Dars" /></span>
            <span className={styles.currentStep} aria-current="step"><Layers3 size={16} aria-hidden="true" /><T text="Kartochkalar" /></span>
            <span><ListChecks size={16} aria-hidden="true" /><T text="Test" /></span>
          </div>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <span className={styles.heroOrbit} />
          <span className={styles.heroToken}><SubjectIcon subjectId={topic.subjectId} size={74} strokeWidth={1.3} /></span>
          <span className={styles.heroCardBack} />
          <span className={styles.heroSpark}>✦</span>
        </div>
      </section>
      {topic.cards.length
        ? <Flashcards cards={topic.cards} topicId={topic.id} topicTitle={topic.title} subjectId={topic.subjectId} />
        : <div className="empty"><T text="Bu mavzuda kartochka hali yo‘q." /></div>}
      <div className="divider" />
      <form action={startAttempt}>
        <input type="hidden" name="topicId" value={topic.id} />
        <button className="btn" type="submit"><T text="Testga o‘tish →" /></button>
      </form>
    </div>
  </>;
}
