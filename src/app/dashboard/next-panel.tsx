import Link from 'next/link';
import { ArrowUpRight, CircleCheck, Play } from 'lucide-react';
import { T } from '@/components/preferences';
import { db } from '@/lib/db';

interface PanelTopic {
  id: string;
  title: string;
  summary: string;
  durationMin: number;
  subjectId: string;
}

interface NextPanelProps {
  next: PanelTopic;
  upcoming: PanelTopic[];
  subjectTitles: Map<string, string>;
  doneCount: number;
  totalCount: number;
}

async function loadLessonFacts(topicId: string) {
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    select: { grade: true, _count: { select: { cards: true, questions: true } }, questions: { select: { conceptId: true }, orderBy: { order: 'asc' } } },
  });
  if (!topic) return null;
  const conceptIds = [...new Set(topic.questions.map(question => question.conceptId))];
  const concepts = await db.alternativeExplanation.findMany({ where: { conceptId: { in: conceptIds } }, select: { conceptId: true, title: true } });
  const titles = new Map(concepts.map(concept => [concept.conceptId, concept.title]));
  return { grade: topic.grade, cards: topic._count.cards, questions: topic._count.questions, concepts: conceptIds.map(id => titles.get(id)).filter((title): title is string => Boolean(title)) };
}

export async function NextPanel({ next, upcoming, subjectTitles, doneCount, totalCount }: NextPanelProps) {
  const facts = await loadLessonFacts(next.id);
  const progress = totalCount ? Math.round(doneCount / totalCount * 100) : 0;
  return <aside className="next-panel">
    <div className="next-panel-top"><span className="next-kicker"><Play size={14} fill="currentColor" aria-hidden="true" /><T text="Keyingi qadam" /></span><span className="next-decoration" aria-hidden="true">✳</span></div>
    <div className="next-panel-art" aria-hidden="true" />
    <div className="next-panel-copy"><p><T text={subjectTitles.get(next.subjectId)} /></p><h2><T text={next.title} /></h2><span><T text={next.summary} /></span></div>
    {facts && <dl className="next-facts">
      <div><dt><T text="Sinf" /></dt><dd>{facts.grade}</dd></div>
      <div><dt><T text="Daqiqa" /></dt><dd>{next.durationMin}</dd></div>
      <div><dt><T text="Kartochka" /></dt><dd>{facts.cards}</dd></div>
      <div><dt><T text="Savollar" /></dt><dd>{facts.questions}</dd></div>
    </dl>}
    {facts && facts.concepts.length > 0 && <div className="next-block">
      <p className="next-label"><T text="Bu darsda o‘rganasiz" /></p>
      <ul className="next-concepts">{facts.concepts.map(title => <li key={title}><CircleCheck size={15} aria-hidden="true" /><T text={title} /></li>)}</ul>
    </div>}
    <div className="next-block">
      <div className="next-progress-label"><p className="next-label"><T text="Umumiy progress" /></p><strong>{doneCount}/{totalCount}</strong></div>
      <div className="next-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
    </div>
    {upcoming.length > 0 && <div className="next-block">
      <p className="next-label"><T text="Keyin navbatda" /></p>
      <div className="next-upcoming">{upcoming.map(topic => <Link key={topic.id} href={`/mavzu/${topic.id}`}>
        <span><small><T text={subjectTitles.get(topic.subjectId)} /></small><T text={topic.title} /></span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>)}</div>
    </div>}
    <Link className="btn" href={`/mavzu/${next.id}`}><T text="Darsni ochish →" /></Link>
  </aside>;
}
