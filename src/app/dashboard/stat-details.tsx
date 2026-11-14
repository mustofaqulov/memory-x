import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, BookOpenCheck, Coins, Zap } from 'lucide-react';
import { LocalDate } from '@/components/local-date';
import { T } from '@/components/preferences';
import { StatDialog } from '@/components/stat-dialog';
import { db } from '@/lib/db';

const HISTORY_LIMIT = 50;

interface StatDetailsProps {
  userId: string;
  xp: number;
  coins: number;
  subjectTitles: Map<string, string>;
}

interface RewardRow {
  id: string;
  amount: number;
  createdAt: string;
  score: number | null;
  total: number | null;
  topicTitle: string;
  subjectId: string;
}

interface CompletedTopic {
  topicId: string;
  title: string;
  subjectId: string;
  firstCompletedAt: string;
  bestScore: number;
  total: number;
  attempts: number;
}

async function loadHistory(userId: string) {
  const [rewards, attempts] = await Promise.all([
    db.rewardTransaction.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: HISTORY_LIMIT, select: { id: true, xp: true, coins: true, createdAt: true, attempt: { select: { score: true, total: true, topic: { select: { title: true, subjectId: true } } } } } }),
    db.quizAttempt.findMany({ where: { userId, completedAt: { not: null } }, orderBy: { completedAt: 'asc' }, select: { topicId: true, completedAt: true, score: true, total: true, topic: { select: { title: true, subjectId: true } } } }),
  ]);
  const toRows = (pick: 'xp' | 'coins'): RewardRow[] => rewards.filter(reward => reward[pick] > 0).map(reward => ({
    id: reward.id, amount: reward[pick], createdAt: reward.createdAt.toISOString(), score: reward.attempt.score, total: reward.attempt.total, topicTitle: reward.attempt.topic.title, subjectId: reward.attempt.topic.subjectId,
  }));
  const topics = new Map<string, CompletedTopic>();
  for (const attempt of attempts) {
    const existing = topics.get(attempt.topicId);
    const score = attempt.score ?? 0;
    topics.set(attempt.topicId, existing
      ? { ...existing, bestScore: Math.max(existing.bestScore, score), attempts: existing.attempts + 1 }
      : { topicId: attempt.topicId, title: attempt.topic.title, subjectId: attempt.topic.subjectId, firstCompletedAt: (attempt.completedAt ?? new Date()).toISOString(), bestScore: score, total: attempt.total ?? 0, attempts: 1 });
  }
  return { xpRows: toRows('xp'), coinRows: toRows('coins'), completed: [...topics.values()].reverse() };
}

function SubjectChip({ subjectId, subjectTitles }: { subjectId: string; subjectTitles: Map<string, string> }) {
  return <span className={`lesson-subject ${subjectId}`}><T text={subjectTitles.get(subjectId)} /></span>;
}

function RewardList({ rows, unit, empty, subjectTitles }: { rows: RewardRow[]; unit: ReactNode; empty: string; subjectTitles: Map<string, string> }) {
  if (!rows.length) return <p className="empty"><T text={empty} /></p>;
  return <>
    <ul className="history-list">{rows.map(row => <li key={row.id} className="history-row">
      <SubjectChip subjectId={row.subjectId} subjectTitles={subjectTitles} />
      <span className="history-main"><strong><T text={row.topicTitle} /></strong><small><LocalDate iso={row.createdAt} />{row.total ? <> · {row.score}/{row.total} <T text="to‘g‘ri" /></> : null}</small></span>
      <span className="history-amount">+{row.amount} {unit}</span>
    </li>)}</ul>
    <p className="history-note"><T text="Mavzu qayta topshirilganda mukofot faqat natija yaxshilansa beriladi." /></p>
  </>;
}

export async function StatDetails({ userId, xp, coins, subjectTitles }: StatDetailsProps) {
  const { xpRows, coinRows, completed } = await loadHistory(userId);
  return <div className="stat-row" aria-label="O‘qish ko‘rsatkichlari">
    <StatDialog id="xp-history" icon={<Zap aria-hidden="true" />} label="Jami XP" value={xp} title="XP qayerdan keldi">
      <RewardList rows={xpRows} unit="XP" empty="Hali XP to‘planmagan. Birinchi testni yakunlang." subjectTitles={subjectTitles} />
    </StatDialog>
    <StatDialog id="coin-history" icon={<Coins aria-hidden="true" />} label="Virtual tanga" value={coins} title="Tangalar qayerdan keldi">
      <RewardList rows={coinRows} unit={<Coins size={14} aria-label="tanga" />} empty="Hali tanga yo‘q. To‘g‘ri javoblar uchun tanga beriladi." subjectTitles={subjectTitles} />
    </StatDialog>
    <StatDialog id="completed-topics" icon={<BookOpenCheck aria-hidden="true" />} label="O‘tilgan mavzu" value={completed.length} title="O‘tilgan mavzular">
      {completed.length ? <ul className="history-list">{completed.map(topic => <li key={topic.topicId} className="history-row">
        <SubjectChip subjectId={topic.subjectId} subjectTitles={subjectTitles} />
        <Link className="history-main history-link" href={`/mavzu/${topic.topicId}`}><strong><T text={topic.title} /><ArrowUpRight size={14} aria-hidden="true" /></strong><small><LocalDate iso={topic.firstCompletedAt} /> · <T text="Urinishlar:" /> {topic.attempts}</small></Link>
        <span className="history-amount"><T text="Eng yaxshi:" /> {topic.bestScore}/{topic.total}</span>
      </li>)}</ul> : <p className="empty"><T text="Hali o‘tilgan mavzu yo‘q. Birinchi darsni ochib boshlang." /></p>}
    </StatDialog>
  </div>;
}
