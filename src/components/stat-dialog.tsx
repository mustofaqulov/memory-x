'use client';

import { useRef, type ReactNode } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useTranslate } from './preferences';

interface StatDialogProps {
  id: string;
  icon: ReactNode;
  label: string;
  value: number;
  title: string;
  children: ReactNode;
}

export function StatDialog({ id, icon, label, value, title, children }: StatDialogProps) {
  const t = useTranslate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${id}-title`;

  function close() {
    dialogRef.current?.close();
  }

  return <>
    <button type="button" className="stat stat-button" aria-haspopup="dialog" aria-controls={id} onClick={() => dialogRef.current?.showModal()}>
      {icon}
      <span>{t(label)}</span>
      <strong>{value}</strong>
      <ChevronRight className="stat-more" size={15} aria-hidden="true" />
    </button>
    <dialog ref={dialogRef} id={id} className="stat-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="stat-dialog-panel">
        <header className="stat-dialog-head">
          <span className="stat-dialog-icon" aria-hidden="true">{icon}</span>
          <div><p className="eyebrow">{t(label)}</p><h2 id={titleId}>{t(title)}</h2></div>
          <strong className="stat-dialog-total">{value}</strong>
          <button type="button" className="stat-dialog-close" onClick={close} aria-label={t('Yopish')} title={t('Yopish')}><X size={18} aria-hidden="true" /></button>
        </header>
        <div className="stat-dialog-body">{children}</div>
      </div>
    </dialog>
  </>;
}
