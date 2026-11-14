import { elements, recipes, type ElementSymbol } from './content';

export type LabInput = { first: string; second: string; firstCount: number; secondCount: number };
export function evaluateFormula(input: LabInput) {
  const valid = (symbol: string) => elements.some(element => element.symbol === symbol);
  if (!valid(input.first) || !valid(input.second) || ![input.firstCount, input.secondCount].every(n => Number.isInteger(n) && n >= 1 && n <= 4)) {
    return { recipe: null, message: 'Ikkita element tanlang. Har bir katakda atomlar soni 1 dan 4 gacha bo‘lsin.' };
  }
  const atoms: Partial<Record<ElementSymbol, number>> = {};
  for (const [symbol, count] of [[input.first, input.firstCount], [input.second, input.secondCount]] as [ElementSymbol, number][]) atoms[symbol] = (atoms[symbol] ?? 0) + count;
  const sameElements = (other: typeof atoms) => Object.keys(atoms).length === Object.keys(other).length && Object.keys(atoms).every(key => key in other);
  const recipe = recipes.find(item => sameElements(item.atoms) && Object.entries(atoms).every(([key, count]) => item.atoms[key as ElementSymbol] === count));
  if (recipe) return { recipe, message: recipe.explanation };
  if ('He' in atoms) return { recipe: null, message: 'Geliy odatiy sharoitda alohida atomlar holida uchraydi va juda kam reaktiv. Bu boshlang‘ich to‘plamda geliyli birikma yo‘q. Boshqa elementni sinang.' };
  const candidates = recipes.filter(item => sameElements(item.atoms));
  if (candidates.length) return { recipe: null, message: `Elementlar mos, lekin bu atomlar soni katalogdagi formulaga mos kelmadi. ${candidates[0].hint} Molekulyar formuladagi indekslarni o‘zboshimchalik bilan qisqartirmang.` };
  return { recipe: null, message: 'Bu tarkib hozirgi o‘quv katalogida yo‘q. Bu “bunday modda mavjud emas” degani emas. Topshiriq tanlang yoki boshqa elementlarni sinang.' };
}
