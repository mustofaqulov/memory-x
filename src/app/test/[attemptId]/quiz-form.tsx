'use client';
import { T } from '@/components/preferences';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitAttempt } from '@/app/actions';

type PublicQuestion = { id: string; prompt: string; choices: { id: string; text: string }[] };
function SubmitButton() { const { pending } = useFormStatus(); return <button className="btn" type="submit" disabled={pending}><T text={pending ? 'Tekshirilmoqda…' : 'Javoblarni tekshirish →'} /></button>; }

export function QuizForm({ attemptId, questions }: { attemptId: string; questions: PublicQuestion[] }) {
  const [selected, setSelected] = useState<Record<string,string>>({});
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { const saved = sessionStorage.getItem(`memoryx-quiz-${attemptId}`); if (saved) setSelected(JSON.parse(saved)); } catch { /* A browser may block session storage. The form still works. */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [attemptId]);
  function choose(id: string, choiceId: string) {
    const next = { ...selected, [id]: choiceId }; setSelected(next);
    try { sessionStorage.setItem(`memoryx-quiz-${attemptId}`, JSON.stringify(next)); } catch { /* Optional draft storage. */ }
  }
  return <form action={submitAttempt} className="quiz-list"><input type="hidden" name="attemptId" value={attemptId} />{questions.map((question, index) => <fieldset className="question" key={question.id}><legend><span className="question-number"><T text={"SAVOL "} />{index + 1} / {questions.length}</span><T text={question.prompt} /></legend>{question.choices.map(choice => <label className="option" key={choice.id}><input type="radio" name={`q:${question.id}`} value={choice.id} checked={selected[question.id] === choice.id} onChange={() => choose(question.id, choice.id)} required /><span><T text={choice.text} /></span></label>)}</fieldset>)}<p className="form-note"><T text={"Javoblar serverda tekshiriladi. Bu urinish yakunlangach qayta o‘zgartirib bo‘lmaydi."} /></p><SubmitButton /></form>;
}
