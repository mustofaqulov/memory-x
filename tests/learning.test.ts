import { describe, expect, it } from 'vitest';
import { improvement, rewardForAttempt, scoreAnswers } from '../src/lib/learning';

const keys = [
  { id: 'q1', conceptId: 'c1', correctChoiceId: 'a', choiceIds: ['a','b'] },
  { id: 'q2', conceptId: 'c1', correctChoiceId: 'c', choiceIds: ['c','d'] },
  { id: 'q3', conceptId: 'c2', correctChoiceId: 'e', choiceIds: ['e','f'] }
];
describe('learning rules', () => {
  it('scores answers and marks a concept weak if any answer for it is wrong', () => {
    const result = scoreAnswers(keys, [{ questionId: 'q1', choiceId: 'a' }, { questionId: 'q2', choiceId: 'd' }, { questionId: 'q3', choiceId: 'e' }]);
    expect(result.score).toBe(2);
    expect(result.weakConcepts).toEqual(['c1']);
  });
  it('rejects missing, duplicate, and foreign choices', () => {
    expect(() => scoreAnswers(keys, [{ questionId: 'q1', choiceId: 'a' }])).toThrow();
    expect(() => scoreAnswers(keys, [{ questionId: 'q1', choiceId: 'a' }, { questionId: 'q1', choiceId: 'a' }, { questionId: 'q3', choiceId: 'e' }])).toThrow();
    expect(() => scoreAnswers(keys, [{ questionId: 'q1', choiceId: 'foreign' }, { questionId: 'q2', choiceId: 'c' }, { questionId: 'q3', choiceId: 'e' }])).toThrow();
  });
  it('rewards first completion and only best-score improvement on retries', () => {
    expect(rewardForAttempt(4, null)).toEqual({ xp: 30, coins: 4 });
    expect(rewardForAttempt(5, 4)).toEqual({ xp: 2, coins: 1 });
    expect(rewardForAttempt(4, 5)).toEqual({ xp: 0, coins: 0 });
    expect(improvement(5, 4)).toBe(1);
  });
});
