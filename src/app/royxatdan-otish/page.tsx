import Link from 'next/link';
import { Atom } from 'lucide-react';

import { T } from '@/components/preferences';
import { SubjectIcon } from '@/lib/subjects';
import { register } from '../actions';
import styles from './register.module.css';
import { SubmitButton } from './submit-button';

const subjects = [
  { id: 'fizika', title: 'Fizika', mark: 'v = s / t' },
  { id: 'kimyo', title: 'Kimyo', mark: 'H₂O' },
  { id: 'biologiya', title: 'Biologiya', mark: 'DNA' },
  { id: 'matematika', title: 'Matematika', mark: '∑ x' },
  { id: 'ingliz-tili', title: 'Ingliz tili', mark: 'A – Z' },
  { id: 'rus-tili', title: 'Rus tili', mark: 'А – Я' },
] as const;

export default async function Register({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return <section className={styles.page} aria-labelledby="register-title">
    <div className={styles.visual}>
      <div className={styles.visualTop}><span><Atom size={18} aria-hidden="true" /> MEMORYX</span><span>06 / <T text="Fanlar" /></span></div>
      <div className={styles.visualIntro}>
        <p className={styles.kicker}><T text="Tushunishdan natijagacha" /></p>
        <h2><T text="Olti fan. Bitta yo‘l." /></h2>
        <p><T text="O‘qishni o‘zingizga mos yo‘nalishdan boshlang." /></p>
      </div>
      <div className={styles.orbitStage} aria-hidden="true">
        <span className={styles.orbitOne} /><span className={styles.orbitTwo} />
        <span className={styles.orbitCore}><Atom size={65} strokeWidth={1.2} /></span>
      </div>
      <ul className={styles.subjects}>
        {subjects.map(subject => <li className={`${styles.subject} ${styles[subject.id]}`} key={subject.id}>
          <span className={styles.subjectIcon}><SubjectIcon subjectId={subject.id} size={28} strokeWidth={1.7} aria-hidden="true" /></span>
          <span className={styles.subjectText}><strong><T text={subject.title} /></strong><small aria-hidden="true">{subject.mark}</small></span>
        </li>)}
      </ul>
    </div>

    <div className={styles.formPanel}>
      <div className={styles.formHeader}>
        <p className="eyebrow"><T text="MEMORYXga xush kelibsiz" /></p>
        <h1 id="register-title"><T text="Hisob yarating" /></h1>
        <p className="muted"><T text="Ism, maktab va telefon raqami kerak emas." /></p>
      </div>
      {error && <p className="alert" role="alert"><T text={error === 'exists' ? 'Bu elektron pochta bilan hisob bor. Kirib ko‘ring.' : 'Ma’lumotlarni tekshiring: taxallus kamida 2 belgi, parol kamida 8 belgi va sinf 1–11 oralig‘ida bo‘lsin.'} /></p>}
      <form className={styles.form} action={register}>
        <label className="field"><span><T text="Taxallus" /></span><input className="input" name="nickname" minLength={2} maxLength={30} autoComplete="nickname" required /></label>
        <label className="field"><span><T text="Elektron pochta" /></span><input className="input" name="email" type="email" autoComplete="email" required /></label>
        <label className={`field ${styles.passwordField}`}><span><T text="Parol (kamida 8 belgi)" /></span><input className="input" name="password" type="password" minLength={8} maxLength={100} autoComplete="new-password" required /></label>
        <label className="field"><span><T text="O‘quv yo‘nalishi" /></span><select className="input" name="track" defaultValue="school"><option value="school"><T text="Maktab fanlari" /></option><option value="entrance"><T text="Oliy ta’limga tayyorgarlik" /></option></select></label>
        <label className="field"><span><T text="Sinf (maktab o‘quvchisi uchun)" /></span><select className="input" name="grade" defaultValue="8"><option value=""><T text="Tanlanmagan" /></option>{Array.from({ length: 11 }, (_, i) => <option key={i + 1} value={i + 1}><T text={`${i + 1}-sinf`} /></option>)}</select></label>
        <SubmitButton />
      </form>
      <div className={styles.formFooter}>
        <p className="form-note"><T text="Kirish orqali o‘qish natijalarini saqlashga rozilik bildirasiz. Ma’lumotlar ochiq reytingda ko‘rsatilmaydi." /></p>
        <p className="form-note"><T text="Hisobingiz bormi? " /><Link href="/kirish"><T text="Kirish" /></Link></p>
      </div>
    </div>
  </section>;
}
