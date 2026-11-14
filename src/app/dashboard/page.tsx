import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { T } from '@/components/preferences';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubjectIcon } from '@/lib/subjects';
import { NextPanel } from './next-panel';
import { StatDetails } from './stat-details';

export default async function Dashboard() {
  const user = await requireUser();
  const [subjects, attempts, completedTopics, allTopics] = await Promise.all([
    db.subject.findMany({ include: { topics: { select: { id: true } } }, orderBy: { title: 'asc' } }),
    db.quizAttempt.findMany({ where: { userId: user.id, completedAt: { not: null } }, include: { topic: { include: { subject: true } } }, orderBy: { completedAt: 'desc' }, take: 5 }),
    db.quizAttempt.findMany({ where: { userId: user.id, completedAt: { not: null } }, distinct: ['topicId'], select: { topicId: true } }),
    db.topic.findMany({ orderBy: [{ subjectId: 'asc' }, { order: 'asc' }], select: { id: true, title: true, summary: true, durationMin: true, subjectId: true } }),
  ]);
  const done = new Set(completedTopics.map(attempt => attempt.topicId));
  const next = allTopics.find(topic => !done.has(topic.id)) ?? allTopics[0];
  const subjectTitles = new Map(subjects.map(subject => [subject.id, subject.title]));

  return <>
    <div className="dashboard-intro">
      <div>
        <p className="eyebrow"><T text="Shaxsiy o‘quv maydoningiz" /></p>
        <h1><T text="Salom, " />{user.isDemo && user.profile?.nickname === 'Demo o‘quvchi' ? <T text="Demo o‘quvchi" /> : user.profile?.nickname ?? <T text="o‘quvchi" />}!</h1>
        <p className="lead"><T text="Bugun bitta tushunchani yaxshiroq bilib oling." /></p>
      </div>
      <StatDetails userId={user.id} xp={user.profile?.xp ?? 0} coins={user.profile?.coins ?? 0} subjectTitles={subjectTitles} />
    </div>
    {user.isDemo && <p className="demo-note"><T text="Demo hisob: natijalar saqlanadi, ammo chiqsangiz bu hisobga qayta kira olmaysiz." /></p>}

    <section className="section courses-section" id="subjects">
      <div className="section-heading split-heading">
        <div><p className="eyebrow"><T text="Fanlar" /></p><h2><T text="O‘rganishni tanlang" /></h2></div>
        <span className="section-count">0{subjects.length} / MEMORYX</span>
      </div>
      <div className="grid subjects-grid">
        {subjects.map(subject => {
          const completed = subject.topics.filter(topic => done.has(topic.id)).length;
          return <article className={`subject-card subject-${subject.id}`} key={subject.id}>
            <div className="subject-top"><span className="subject-tag"><T text={subject.title} /></span><span className="subject-icon" aria-hidden="true"><SubjectIcon subjectId={subject.id} /></span></div>
            <div className="subject-content"><h3><T text={subject.title} /></h3><p><T text={subject.description} /></p></div>
            <div className="subject-progress"><div className="subject-progress-label"><span><T text="O‘tilgan mavzu" /></span><strong>{completed}/{subject.topics.length}</strong></div><div className="progress-track"><div className="progress-fill" style={{width:`${subject.topics.length ? completed / subject.topics.length * 100 : 0}%`}} /></div></div>
            <div className="subject-bottom"><span className="subject-count">{subject.topics.length} <T text="mavzu" /></span><Link className="btn subject-action" href={`/fan/${subject.id}`}><T text="Mavzularni ko‘rish →" /></Link></div>
          </article>;
        })}
      </div>
    </section>

    <div className="study-grid">
      <section className="card lesson-queue" aria-labelledby="lesson-queue-title">
        <div className="split-heading"><div><p className="eyebrow"><T text="O‘rganish yo‘li" /></p><h2 id="lesson-queue-title"><T text="Mavzularim" /></h2></div><span className="queue-count">{allTopics.length} <T text="mavzu" /></span></div>
        <div className="lesson-table-head"><span><T text="Dars" /></span><span><T text="Fan" /></span><span><T text="Vaqt" /></span></div>
        <div className="lesson-rows">{allTopics.map((topic, index) => <Link key={topic.id} href={`/mavzu/${topic.id}`} className="lesson-row">
          <span className="lesson-main"><span className="lesson-index">{String(index + 1).padStart(2, '0')}</span><span><strong><T text={topic.title} /></strong><small><T text={topic.summary} /></small></span></span>
          <span className={`lesson-subject ${topic.subjectId}`}><T text={subjectTitles.get(topic.subjectId)} /></span>
          <span className="lesson-time">{done.has(topic.id) ? <><Check size={16} aria-hidden="true" /><span className="sr-only"><T text="Yakunlangan" /></span></> : <>{topic.durationMin} <T text="daq" /></>}<ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>)}</div>
      </section>
      {next && <NextPanel next={next} upcoming={allTopics.filter(topic => topic.id !== next.id && !done.has(topic.id)).slice(0, 3)} subjectTitles={subjectTitles} doneCount={done.size} totalCount={allTopics.length} />}
    </div>
    <section className="section results-section" id="results">
      <div className="section-heading split-heading"><div><p className="eyebrow"><T text="O‘qish ko‘rsatkichlari" /></p><h2><T text="So‘nggi natijalar" /></h2></div></div>
      {attempts.length ? <div className="mini-list">{attempts.map(attempt => <Link href={`/natija/${attempt.id}`} className="mini-item" key={attempt.id}><strong><T text={attempt.topic.title} /></strong><span className="muted"><T text={attempt.topic.subject.title} /> · {attempt.score}/{attempt.total} <T text="to‘g‘ri" /></span><ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div> : <div className="empty"><T text="Hali test yakunlanmagan. Birinchi darsni ochib boshlang." /></div>}
    </section>
  </>;
}
