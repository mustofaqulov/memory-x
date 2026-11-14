import { describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { evaluateFormula } from '../src/lib/chemistry/evaluate';
import { recipes } from '../src/lib/chemistry/content';
import { discoverFormula } from '../src/lib/chemistry/service';
import { db } from '../src/lib/db';

describe('chemistry formula model', () => {
  it.each(recipes)('recognizes $formula regardless of tray order', recipe => {
    const atoms = Object.entries(recipe.atoms);
    const [first, second] = atoms.length === 1 ? [[atoms[0][0], 1], [atoms[0][0], 1]] : atoms;
    const input = { first: String(first[0]), firstCount: Number(first[1]), second: String(second[0]), secondCount: Number(second[1]) };
    expect(evaluateFormula(input).recipe?.id).toBe(recipe.id);
    expect(evaluateFormula({ first: input.second, second: input.first, firstCount: input.secondCount, secondCount: input.firstCount }).recipe?.id).toBe(recipe.id);
  });
  it('distinguishes water and peroxide and does not silently reduce molecular counts', () => {
    expect(evaluateFormula({ first: 'H', second: 'O', firstCount: 2, secondCount: 1 }).recipe?.id).toBe('water');
    expect(evaluateFormula({ first: 'H', second: 'O', firstCount: 2, secondCount: 2 }).recipe?.id).toBe('peroxide');
    expect(evaluateFormula({ first: 'H', second: 'O', firstCount: 4, secondCount: 2 }).recipe).toBeNull();
  });
  it('combines identical trays and rejects unlisted counts', () => {
    expect(evaluateFormula({ first: 'H', second: 'H', firstCount: 1, secondCount: 1 }).recipe?.formula).toBe('H₂');
    expect(evaluateFormula({ first: 'H', second: 'H', firstCount: 2, secondCount: 2 }).recipe).toBeNull();
  });
  it('validates symbols, integers, and bounds', () => {
    for (const count of [0, 5, -1, 1.5, NaN, Infinity]) expect(evaluateFormula({ first: 'H', second: 'O', firstCount: count, secondCount: 1 }).recipe).toBeNull();
    expect(evaluateFormula({ first: '<script>', second: 'O', firstCount: 2, secondCount: 1 }).recipe).toBeNull();
  });
  it('explains inert gases and unsupported combinations without claiming impossibility', () => {
    expect(evaluateFormula({ first: 'He', second: 'O', firstCount: 1, secondCount: 1 }).message).toContain('Geliy');
    expect(evaluateFormula({ first: 'Na', second: 'Mg', firstCount: 1, secondCount: 1 }).message).toContain('mavjud emas');
    expect(evaluateFormula({ first: 'Na', second: 'Cl', firstCount: 2, secondCount: 2 }).recipe).toBeNull();
  });
});

describe('saved chemistry discoveries', () => {
  it('persists one discovery per user and formula, with no client-supplied rewards', async () => {
    const first = await db.user.create({ data: { email: `lab-${randomUUID()}@test.local`, passwordHash: 'test-only' } });
    const second = await db.user.create({ data: { email: `lab-${randomUUID()}@test.local`, passwordHash: 'test-only' } });
    try {
      const input = { first: 'H', second: 'O', firstCount: 2, secondCount: 1 };
      await Promise.all([discoverFormula(first.id, input), discoverFormula(first.id, input)]);
      expect(await db.labDiscovery.count({ where: { userId: first.id } })).toBe(1);
      expect(await db.labDiscovery.count({ where: { userId: second.id } })).toBe(0);
      const other = await discoverFormula(second.id, { ...input, firstCount: 1 });
      expect(other.discoveredIds).toEqual([]);
      expect(await db.rewardTransaction.count({ where: { userId: first.id } })).toBe(0);
    } finally {
      await db.user.deleteMany({ where: { id: { in: [first.id, second.id] } } });
    }
  });
});
