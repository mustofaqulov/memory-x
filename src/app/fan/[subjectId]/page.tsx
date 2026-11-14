import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Atom, BookA, BookType, Divide, Dna, Equal, FlaskConical, Gauge, Languages, Leaf, Zap, type LucideIcon } from 'lucide-react';
import { T } from '@/components/preferences';
import { requireUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubjectIcon } from '@/lib/subjects';
import './showcase.css';

const topicIcons: Record<string, [LucideIcon, LucideIcon]> = {
  kimyo: [Atom, FlaskConical],
  biologiya: [Dna, Leaf],
  fizika: [Gauge, Zap],
  matematika: [Divide, Equal],
  'ingliz-tili': [BookA, BookType],
  'rus-tili': [BookType, Languages],
};

const examples: Record<string, [string, string, string]> = {
  kimyo: ['H₂O', 'NaCl', 'CO₂'],
  fizika: ['v = s / t', 'U = I · R', 's = v · t'],
  matematika: ['½ + ¼', '¾', 'x + 3 = 7'],
  'ingliz-tili': ['I play', 'I played', 'now / yesterday'],
  'rus-tili': ['он / она', 'оно', 'кто? что?'],
};

function SubjectScene({ subjectId }: { subjectId: string }) {
  if (subjectId === 'biologiya') return <div className="showcase-cell-scene" aria-hidden="true"><span className="showcase-cell-orbit orbit-one"/><span className="showcase-cell-orbit orbit-two"/><span className="showcase-cell"><span className="showcase-cell-inner"><span className="showcase-cell-nucleus"/></span><i/><i/><i/><i/></span><span className="showcase-cell-label label-membrane"><T text="Membrana" /></span><span className="showcase-cell-label label-nucleus"><T text="Yadro" /></span><span className="showcase-cell-label label-cytoplasm"><T text="Sitoplazma" /></span></div>;
  const [main, first, second] = examples[subjectId];
  return <div className="showcase-example-scene" aria-hidden="true">
    <span className="showcase-example-orbit orbit-one"/><span className="showcase-example-orbit orbit-two"/>
    <span className="showcase-example-icon"><SubjectIcon subjectId={subjectId} /></span>
    <span className="showcase-example-main">{main}</span>
    <span className="showcase-example-chip chip-one">{first}</span>
    <span className="showcase-example-chip chip-two">{second}</span>
  </div>;
}

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const user = await requireUser();
  const { subjectId } = await params;
  const subject = await db.subject.findUnique({ where: { id: subjectId }, include: { topics: { orderBy: { order: 'asc' } } } });
  if (!subject) notFound();
  const attempts = await db.quizAttempt.findMany({ where: { userId: user.id, topicId: { in: subject.topics.map(topic => topic.id) }, completedAt: { not: null } }, select: { topicId: true, score: true, total: true } });
  const hasShowcase = Object.hasOwn(topicIcons, subject.id);
  const completedTopics = new Set(attempts.map(attempt => attempt.topicId)).size;
  const nextTopic = subject.topics.find(topic => !attempts.some(attempt => attempt.topicId === topic.id)) ?? subject.topics[0];
  const SecondTopicIcon = topicIcons[subject.id]?.[1] ?? ArrowRight;
  return <div className={`showcase-page showcase-page--${subject.id}`}>
    <div className="breadcrumbs"><Link href="/dashboard"><T text="Boshqaruv" /></Link><span>/</span><T text={subject.title} /></div>
    {hasShowcase ? <section className="showcase-hero" aria-labelledby="showcase-heading">
      <div className="showcase-hero-copy">
        <p className="eyebrow"><T text="Fan" /> / <T text={subject.id === 'biologiya' ? 'Tirik tabiat' : 'O‘rganish yo‘li'} /></p>
        <h1 id="showcase-heading"><T text={subject.title} /></h1>
        <p className="showcase-hero-lead"><T text={subject.description} /> <T text={subject.id === 'biologiya' ? 'Hujayradan fotosintezgacha bo‘lgan yo‘lni bosib o‘ting.' : 'Mavzularni ketma-ket o‘rganing va natijangizni kuzating.'} /></p>
        <div className="showcase-facts">
          <span><strong>{subject.topics.length}</strong><T text="mavzu" /></span>
          <span><strong>≈ {subject.topics.reduce((total, topic) => total + topic.durationMin, 0)}</strong><T text="daq" /></span>
          <span><strong>{completedTopics}/{subject.topics.length}</strong><T text="yakunlangan" /></span>
        </div>
        {nextTopic && <Link className="btn showcase-hero-cta" href={`/mavzu/${nextTopic.id}`}><T text={completedTopics ? 'O‘rganishni davom ettirish' : 'Birinchi darsni boshlash'} /><ArrowRight size={18} aria-hidden="true" /></Link>}
      </div>
      <div className="showcase-visual">
        <div className="showcase-visual-top"><span><SubjectIcon subjectId={subject.id} size={16} aria-hidden="true" /> <T text={subject.id === 'biologiya' ? 'Tiriklikning asosi' : subject.topics[0]?.title ?? subject.title} /></span><span>01 — {String(subject.topics.length).padStart(2, '0')}</span></div>
        <SubjectScene subjectId={subject.id} />
        {subject.topics[1] && <div className="showcase-visual-bottom"><SecondTopicIcon size={19} aria-hidden="true" /><span><T text="Keyingi qadam" /> <strong><T text={subject.topics[1].title} /></strong></span><ArrowRight size={18} aria-hidden="true" /></div>}
      </div>
    </section> : <section className={`subject-banner subject-${subject.id}`}>
      <div><p className="eyebrow"><T text="Fan" /></p><h1><T text={subject.title} /></h1><p><T text={subject.description} /></p><span className="subject-tag">{subject.topics.length} <T text="mavzu" /></span></div>
      <div className="subject-banner-icon" aria-hidden="true"><SubjectIcon subjectId={subject.id} /></div>
    </section>}
    {subject.id === 'kimyo' && <section className="showcase-lab-feature"><div><p className="eyebrow">Interaktiv o‘yin</p><h2>Formulalar laboratoriyasi</h2><p>Elementlarni tanlang, atomlar sonini moslang va 13 ta formulani kashf qiling. Natijalaringiz hisobda saqlanadi.</p><Link className="btn" href="/fan/kimyo/laboratoriya"><FlaskConical size={19} /> Laboratoriyani ochish <ArrowRight size={17} aria-hidden="true" /></Link></div><div className="showcase-lab-art" aria-hidden="true"><span>H₂</span><FlaskConical size={82} /><span>H₂O</span></div></section>}
    <section className="section">
      <div className="section-heading split-heading"><div><p className="eyebrow"><T text="O‘rganish yo‘li" /></p><h2><T text="Mavzular" /></h2></div><span className="section-count">{subject.topics.length} <T text="mavzu" /></span></div>
      <div className={`subject-topics${hasShowcase ? ' showcase-topic-grid' : ''}`}>{subject.topics.map((topic, index) => {
        const relevant = attempts.filter(attempt => attempt.topicId === topic.id);
        const best = relevant.length ? Math.max(...relevant.map(attempt => attempt.score ?? 0)) : null;
        const TopicIcon = topicIcons[subject.id]?.[index];
        return <article className={`topic-card${hasShowcase ? ' showcase-topic-card' : ''}`} key={topic.id}>
          <span className="topic-order">{String(index + 1).padStart(2, '0')}</span>
          {hasShowcase && <span className="showcase-topic-icon" aria-hidden="true">{TopicIcon ? <TopicIcon size={30} /> : <SubjectIcon size={30} subjectId={subject.id} />}</span>}
          <div className="topic-body"><h3><T text={topic.title} /></h3><p><T text={topic.summary} /></p><div className="topic-meta"><span className="chip"><T text={`${topic.grade}-sinf`} /></span><span className="chip">≈ {topic.durationMin} <T text="daq" /></span>{best !== null && <span className="chip green"><T text="Eng yaxshi: " />{best}/5</span>}</div></div>
          {hasShowcase && <div className="showcase-topic-progress"><span><T text={best === null ? 'Hali boshlanmagan' : 'Eng yaxshi natija'} /></span><strong>{best === null ? '0/5' : `${best}/5`}</strong><progress value={best ?? 0} max={5} aria-label={`${topic.title}: ${best ?? 0}/5`} /></div>}
          <Link className="btn secondary" href={`/mavzu/${topic.id}`}><T text={best === null ? 'Boshlash' : 'Qayta ko‘rish'} /><T text=" →" /></Link>
        </article>;
      })}</div>
    </section>
  </div>;
}
