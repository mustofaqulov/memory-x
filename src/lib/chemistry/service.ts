import { db } from '../db';
import { evaluateFormula, type LabInput } from './evaluate';

export async function discoverFormula(userId: string, input: LabInput) {
  const result = evaluateFormula(input);
  if (result.recipe) {
    // Compound uniqueness makes repeated submissions and refreshes harmless.
    await db.labDiscovery.upsert({
      where: { userId_recipeId: { userId, recipeId: result.recipe.id } },
      create: { userId, recipeId: result.recipe.id },
      update: {},
    });
  }
  const discoveries = await db.labDiscovery.findMany({ where: { userId }, select: { recipeId: true } });
  return { ...result, discoveredIds: discoveries.map(item => item.recipeId) };
}
