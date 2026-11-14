import { createElement } from 'react';
import { Atom, BookA, BookOpen, BookType, Dna, FlaskConical, Sigma, type LucideIcon, type LucideProps } from 'lucide-react';

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  kimyo: FlaskConical,
  biologiya: Dna,
  fizika: Atom,
  matematika: Sigma,
  'ingliz-tili': BookA,
  'rus-tili': BookType,
};

export function SubjectIcon({ subjectId, ...props }: LucideProps & { subjectId: string }) {
  return createElement(SUBJECT_ICONS[subjectId] ?? BookOpen, props);
}
