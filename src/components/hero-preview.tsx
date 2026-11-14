'use client';

import { useState } from 'react';
import { CircleCheck, CircleX, FlaskConical, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useTranslate } from './preferences';

interface PreviewOption {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
}

const OPTIONS: PreviewOption[] = [
  { id: 'A', label: 'H₂O', correct: true, feedback: 'To‘g‘ri! Suv 2 ta vodorod va 1 ta kislorod atomidan iborat.' },
  { id: 'B', label: 'CO₂', correct: false, feedback: 'Bu karbonat angidrid. Yana urinib ko‘ring.' },
  { id: 'C', label: 'O₂', correct: false, feedback: 'Bu kislorod molekulasi. Yana urinib ko‘ring.' },
];

const XP_REWARD = 10;

function optionState(option: PreviewOption, selectedId: string | null): string {
  if (option.id !== selectedId) return '';
  return option.correct ? 'correct' : 'wrong';
}

export function HeroPreview() {
  const t = useTranslate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = OPTIONS.find(option => option.id === selectedId) ?? null;
  const solved = selected?.correct ?? false;

  return <div className={`hero-preview${solved ? ' solved' : ''}`} role="group" aria-label={t('O‘quv jarayoni namunasi')}>
    <div className="preview-top">
      <span className="subject-tag"><FlaskConical size={13} aria-hidden="true" />{t('Kimyo')}</span>
      <span className="preview-kicker">{t('Qisqa savol')} · 1/5</span>
    </div>
    <p className="preview-question">{t('Suvning kimyoviy formulasi qaysi?')}</p>
    <div className="preview-options">
      {OPTIONS.map(option => {
        const state = optionState(option, selectedId);
        return <button key={option.id} type="button" className={`preview-option ${state}`.trim()} aria-pressed={option.id === selectedId} disabled={solved && !option.correct} onClick={() => setSelectedId(option.id)}>
          <span className="option-letter">{option.id}</span>
          <span className="option-label">{option.label}</span>
          {state === 'correct' && <CircleCheck className="option-mark" size={18} aria-hidden="true" />}
          {state === 'wrong' && <CircleX className="option-mark" size={18} aria-hidden="true" />}
        </button>;
      })}
    </div>
    <div className="preview-progress" aria-hidden="true"><span style={{ transform: `scaleX(${solved ? 0.4 : 0.2})` }} /></div>
    <div className="preview-footer">
      <p className={`preview-feedback ${selected ? (solved ? 'correct' : 'wrong') : ''}`.trim()} key={selected?.id ?? 'idle'} aria-live="polite">
        {selected && (solved ? <Sparkles size={15} aria-hidden="true" /> : <RotateCcw size={15} aria-hidden="true" />)}
        {t(selected?.feedback ?? 'Javobni tanlang — izoh darhol chiqadi.')}
      </p>
      <span className={`preview-xp${solved ? ' earned' : ''}`}><Zap size={13} aria-hidden="true" />+{XP_REWARD} XP</span>
      {solved && <button type="button" className="preview-reset" onClick={() => setSelectedId(null)} title={t('Qayta urinish')} aria-label={t('Qayta urinish')}><RotateCcw size={14} aria-hidden="true" /></button>}
    </div>
  </div>;
}
