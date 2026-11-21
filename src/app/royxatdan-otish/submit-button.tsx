'use client';

import { useFormStatus } from 'react-dom';

import { T } from '@/components/preferences';
import styles from './register.module.css';

export function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className={`btn full ${styles.submitButton}`} type="submit" disabled={pending} aria-busy={pending}>
    <T text={pending ? 'Hisob yaratilmoqda…' : 'Hisob yaratish'} />
  </button>;
}
