'use client';
import { T, useTranslate } from '@/components/preferences';

import { useState } from 'react';

export function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const t = useTranslate();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  return <div style={{maxWidth:720}}><div className="progress-track" aria-label={`${index + 1} / ${cards.length} ${t('kartochka')}`}><div className="progress-fill" style={{width:`${((index+1)/cards.length)*100}%`}} /></div><p className="muted small-text" style={{margin:'12px 0 18px'}}>{index + 1} / {cards.length}<T text={" kartochka"} /></p><button className="flashcard" type="button" aria-label={t(flipped ? 'Javob. Savolni ko‘rish uchun bosing' : 'Savol. Javobni ko‘rish uchun bosing')} onClick={() => setFlipped(!flipped)}><span className="eyebrow"><T text={flipped ? 'Javob' : 'Savol'} /></span><strong><T text={flipped ? card.back : card.front} /></strong><span className="muted"><T text={flipped ? 'Savolga qaytish uchun bosing' : 'Javobni ochish uchun bosing'} /></span></button><div className="actions"><button className="btn secondary" type="button" disabled={index === 0} onClick={() => {setIndex(index-1);setFlipped(false);}}><T text={"← Oldingi"} /></button><button className="btn secondary" type="button" disabled={index === cards.length-1} onClick={() => {setIndex(index+1);setFlipped(false);}}><T text={"Keyingisi →"} /></button></div></div>;
}
