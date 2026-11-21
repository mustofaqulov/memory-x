import messages from './messages.json';
import curriculum from './curriculum.json';
import biology from './biology.json';
import physics from './physics.json';

export type Locale = 'uz' | 'ru' | 'en';
export type Theme = 'dark' | 'light';
export function isLocale(value: unknown): value is Locale {
  return value === 'uz' || value === 'ru' || value === 'en';
}
const dictionary: Record<string, string[]> = { ...messages, ...curriculum, ...biology, ...physics };

export function translate(text: string, locale: Locale): string {
  if (locale === 'uz') return text;
  const key = text.trim();
  const entry = dictionary[key];
  if (entry) return text.replace(key, entry[locale === 'ru' ? 0 : 1]);
  const grade = key.match(/^(\d+)-sinf$/);
  if (grade) return locale === 'ru' ? `${grade[1]}-й класс` : `Grade ${grade[1]}`;
  const improvement = key.match(/^Oldingi urinishdan ([+\d]+) ta (ko‘p|kam)$/);
  if (improvement) {
    const [, count, direction] = improvement;
    return locale === 'ru' ? `На ${count} ${direction === 'ko‘p' ? 'больше' : 'меньше'}, чем в прошлый раз` : `${count} ${direction === 'ko‘p' ? 'more' : 'fewer'} than the previous attempt`;
  }
  return text;
}
