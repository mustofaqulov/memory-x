export const elements = [
  { symbol: 'H', name: 'Vodorod', number: 1, family: 'Metallmas' },
  { symbol: 'He', name: 'Geliy', number: 2, family: 'Inert gaz' },
  { symbol: 'C', name: 'Uglerod', number: 6, family: 'Metallmas' },
  { symbol: 'N', name: 'Azot', number: 7, family: 'Metallmas' },
  { symbol: 'O', name: 'Kislorod', number: 8, family: 'Metallmas' },
  { symbol: 'Na', name: 'Natriy', number: 11, family: 'Metall' },
  { symbol: 'Mg', name: 'Magniy', number: 12, family: 'Metall' },
  { symbol: 'Cl', name: 'Xlor', number: 17, family: 'Metallmas' },
  { symbol: 'Ca', name: 'Kalsiy', number: 20, family: 'Metall' },
] as const;

export type ElementSymbol = typeof elements[number]['symbol'];
export type Recipe = {
  id: string; name: string; formula: string; atoms: Partial<Record<ElementSymbol, number>>;
  kind: 'simple' | 'molecular' | 'ionic'; hint: string; explanation: string;
};

// Authored teaching set, not a reaction predictor. Exact molecular counts matter.
export const recipes: Recipe[] = [
  { id: 'water', name: 'Suv', formula: 'H₂O', atoms: { H: 2, O: 1 }, kind: 'molecular', hint: 'Vodorod va kislorod kerak. Vodorod atomlari kislorodnikidan ikki marta ko‘p.', explanation: 'Bitta suv molekulasida 2 ta vodorod va 1 ta kislorod atomi bor. Indeks yozilmasa, 1 tushuniladi.' },
  { id: 'oxygen', name: 'Kislorod molekulasi', formula: 'O₂', atoms: { O: 2 }, kind: 'simple', hint: 'Ikkala katakka ham kisloroddan bittadan joylashtiring.', explanation: 'Ikki kislorod atomi O₂ molekulasini tashkil qiladi. Faqat bir xil elementdan tuzilgani uchun bu oddiy modda, birikma emas.' },
  { id: 'salt', name: 'Natriy xlorid', formula: 'NaCl', atoms: { Na: 1, Cl: 1 }, kind: 'ionic', hint: 'Natriy va xlorni teng, eng kichik butun sonli nisbatda tanlang.', explanation: 'NaCl ionli kristall: Na⁺ va Cl⁻ ionlari 1:1 nisbatda joylashadi. Bu alohida molekula emas; formula eng sodda ionlar nisbatini bildiradi.' },
  { id: 'carbon-dioxide', name: 'Karbonat angidrid', formula: 'CO₂', atoms: { C: 1, O: 2 }, kind: 'molecular', hint: 'Bir uglerod atomiga ikki kislorod atomi kerak.', explanation: 'CO₂ molekulasida 1 ta uglerod va 2 ta kislorod atomi mavjud. Kislorod sonini bittaga tushirsangiz, boshqa modda tarkibi hosil bo‘ladi.' },
  { id: 'hydrogen', name: 'Vodorod molekulasi', formula: 'H₂', atoms: { H: 2 }, kind: 'simple', hint: 'Bir xil element: jami ikkita vodorod atomi.', explanation: 'H₂ — ikki atomli vodorod molekulasi. Bu oddiy modda, chunki unda faqat vodorod elementi bor.' },
  { id: 'ammonia', name: 'Ammiak', formula: 'NH₃', atoms: { N: 1, H: 3 }, kind: 'molecular', hint: 'Bir azot atomiga uchta vodorod atomi tanlang.', explanation: 'NH₃ molekulasida azot va vodorod atomlari 1:3 nisbatda bo‘ladi. Formuladagi 3 faqat H belgisiga tegishli.' },
  { id: 'magnesium-oxide', name: 'Magniy oksid', formula: 'MgO', atoms: { Mg: 1, O: 1 }, kind: 'ionic', hint: 'Magniy va kislorod: eng kichik nisbat 1:1.', explanation: 'Mg²⁺ va O²⁻ ionlarining zaryadlari 1:1 nisbatda muvozanatlashadi. MgO ionli kristallning eng sodda nisbatini ifodalaydi.' },
  { id: 'methane', name: 'Metan', formula: 'CH₄', atoms: { C: 1, H: 4 }, kind: 'molecular', hint: 'Bitta uglerod va to‘rtta vodorod atomini tanlang.', explanation: 'Metan molekulasida 1 ta uglerod va 4 ta vodorod atomi bor. CH₄ — uning molekulyar formulasi.' },
  { id: 'nitrogen', name: 'Azot molekulasi', formula: 'N₂', atoms: { N: 2 }, kind: 'simple', hint: 'Ikkala katakka bir xil element: azotdan bittadan.', explanation: 'N₂ molekulasi ikki azot atomidan tuzilgan. Bir xil atomlar ham molekula hosil qilishi mumkin.' },
  { id: 'peroxide', name: 'Vodorod peroksid', formula: 'H₂O₂', atoms: { H: 2, O: 2 }, kind: 'molecular', hint: 'Vodoroddan ham, kisloroddan ham ikkitadan atom kerak.', explanation: 'H₂O₂ suvdan boshqa modda. Molekulyar formulani HO ga qisqartirmaymiz: bitta molekuladagi aniq atomlar soni saqlanishi kerak.' },
  { id: 'calcium-chloride', name: 'Kalsiy xlorid', formula: 'CaCl₂', atoms: { Ca: 1, Cl: 2 }, kind: 'ionic', hint: 'Bitta kalsiyga ikkita xlor. Ca²⁺ zaryadi ikkita Cl⁻ bilan muvozanatlashadi.', explanation: 'Kalsiy xloridda Ca²⁺ va Cl⁻ ionlari 1:2 nisbatda bo‘ladi. CaCl₂ — ionlar nisbati, alohida molekula emas.' },
  { id: 'carbon-monoxide', name: 'Uglerod(II) oksid', formula: 'CO', atoms: { C: 1, O: 1 }, kind: 'molecular', hint: 'Bir uglerod va bir kislorod atomi.', explanation: 'CO va CO₂ turli moddalar: bitta kislorod atomining farqi ham moddaning xossalarini o‘zgartiradi. CO zaharli gazdir.' },
  { id: 'chlorine', name: 'Xlor molekulasi', formula: 'Cl₂', atoms: { Cl: 2 }, kind: 'simple', hint: 'Ikkita xlor atomini birlashtiring.', explanation: 'Cl₂ — ikki xlor atomidan tuzilgan oddiy modda molekulasi. NaCl esa ikki xil elementdan tuzilgan ionli birikma.' },
];

export const kindLabels = { simple: 'Oddiy modda', molecular: 'Molekulyar birikma', ionic: 'Ionli birikma' };
