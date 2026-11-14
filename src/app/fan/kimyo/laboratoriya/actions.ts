'use server';

import { getUser } from '@/lib/auth';
import { discoverFormula } from '@/lib/chemistry/service';
import { recipes } from '@/lib/chemistry/content';

export type LabState = {
  status: 'idle' | 'success' | 'retry' | 'error';
  message: string;
  recipe?: { id: string; name: string; formula: string; kind: string };
  discoveredIds?: string[];
  collection?: { id: string; name: string; formula: string }[];
  targetReached?: boolean;
};

export async function combineElements(previous: LabState, form: FormData): Promise<LabState> {
  const user = await getUser();
  if (!user) return { ...previous, recipe: undefined, targetReached: false, status: 'error', message: 'Sessiya tugadi. Hisobga qayta kiring.' };
  const target = String(form.get('target') ?? '');
  if (target && !recipes.some(recipe => recipe.id === target)) return { ...previous, recipe: undefined, targetReached: false, status: 'error', message: 'Topshiriq topilmadi. Sahifani yangilang.' };
  try {
    const result = await discoverFormula(user.id, {
      first: String(form.get('first') ?? ''),
      second: String(form.get('second') ?? ''),
      firstCount: Number(form.get('firstCount')),
      secondCount: Number(form.get('secondCount')),
    });
    return {
      status: result.recipe ? 'success' : 'retry',
      message: result.message,
      recipe: result.recipe ? { id: result.recipe.id, name: result.recipe.name, formula: result.recipe.formula, kind: result.recipe.kind } : undefined,
      discoveredIds: result.discoveredIds,
      collection: recipes.filter(item => result.discoveredIds.includes(item.id)).map(({ id, name, formula }) => ({ id, name, formula })),
      targetReached: !!target && target === result.recipe?.id,
    };
  } catch {
    return { ...previous, recipe: undefined, targetReached: false, status: 'error', message: 'Natijani saqlab bo‘lmadi. Tanlovingiz saqlanib turibdi — qayta urinib ko‘ring.' };
  }
}
