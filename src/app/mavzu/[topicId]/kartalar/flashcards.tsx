'use client';

import { useState } from 'react';

import { T, useTranslate } from '@/components/preferences';
import { SubjectIcon } from '@/lib/subjects';
import { CardArtwork } from './card-artwork';
import styles from './flashcards.module.css';

type Flashcard = { front: string; back: string };

export function Flashcards({ cards, topicId, topicTitle, subjectId }: {
  cards: Flashcard[];
  topicId: string;
  topicTitle: string;
  subjectId: string;
}) {
  const t = useTranslate();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  const displayText = flipped ? card.back : card.front;

  function move(next: number) {
    setIndex(next);
    setFlipped(false);
  }

  return <div className={styles.shell}>
    <div className="progress-track" aria-label={`${index + 1} / ${cards.length} ${t('kartochka')}`}>
      <div className="progress-fill" style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
    </div>
    <p className={styles.progressLabel}>{index + 1} / {cards.length}<T text=" kartochka" /></p>
    <button
      className={`${styles.card} ${styles[subjectId] ?? styles.fizika}`}
      data-flipped={flipped}
      type="button"
      aria-pressed={flipped}
      aria-label={`${t(flipped ? 'Javob. Savolni ko‘rish uchun bosing' : 'Savol. Javobni ko‘rish uchun bosing')}: ${t(displayText)}`}
      onClick={() => setFlipped(value => !value)}
    >
      <span className={styles.cardTop}>
        <span className={styles.topic}><SubjectIcon subjectId={subjectId} size={18} aria-hidden="true" /><T text={topicTitle} /></span>
        <span className={styles.cardCounter}>{String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
      </span>
      <span className={styles.cardMain}>
        <span className={styles.cardCopy}>
          <span className={styles.sideLabel}><T text={flipped ? 'Javob' : 'Savol'} /></span>
          <strong>{t(displayText)}</strong>
          <span className={styles.flipHint}><T text={flipped ? 'Savolga qaytish uchun bosing' : 'Javobni ochish uchun bosing'} /><span aria-hidden="true">↗</span></span>
        </span>
        <CardArtwork key={topicId} topicId={topicId} />
      </span>
    </button>
    <div className={styles.actions}>
      <button className="btn secondary" type="button" disabled={index === 0} onClick={() => move(index - 1)}><T text="← Oldingi" /></button>
      <button className="btn secondary" type="button" disabled={index === cards.length - 1} onClick={() => move(index + 1)}><T text="Keyingisi →" /></button>
    </div>
  </div>;
}
