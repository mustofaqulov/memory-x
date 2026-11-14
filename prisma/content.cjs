// Authored starter curriculum. The answer index is used only during seeding.
const q = (id, concept, prompt, choices, answer, correctNote, wrongNote) => ({ id, concept, prompt, choices, answer, correctNote, wrongNote });
const topics = [
  {
    id: 'atom-tuzilishi', subject: 'kimyo', title: 'Atom tuzilishi', summary: 'Proton, neytron va elektron qanday joylashishini tushuning.', grade: 7, minutes: 12,
    lesson: {
      intro: 'Moddalar atomlardan tuzilgan. Atom juda kichik bo‘lsa ham, uning ichki tuzilishi bor.',
      body: 'Atom markazida yadro joylashadi. Yadroda musbat zaryadli proton va zaryadsiz neytron bo‘ladi. Manfiy zaryadli elektronlar yadro atrofida harakatlanadi. Neytral atomda protonlar soni elektronlar soniga teng. Elementning tartib raqami uning protonlari sonini bildiradi.',
      example: 'Masalan, uglerodning tartib raqami 6. Demak, har bir uglerod atomida 6 ta proton bor. Neytral uglerod atomida 6 ta elektron ham bo‘ladi.'
    },
    cards: [
      ['Atom yadrosida qaysi zarrachalar bor?', 'Proton va neytron.'],
      ['Protonning zaryadi qanday?', 'Musbat zaryadli.'],
      ['Elektron qayerda joylashadi?', 'Yadro atrofida.'],
      ['Neytral atomda nimalar soni teng?', 'Protonlar va elektronlar soni.']
    ],
    concepts: [
      ['atom-qismlari', 'Atomning qismlari', 'Atomni kichik markaz va uning atrofidagi elektronlar sifatida tasavvur qiling. Markaz — yadro; unda proton va neytron bor. Elektron yadro tashqarisida.', 'Stadion markazi yadro bo‘lsa, tashqaridagi yo‘lak elektronlar joylashadigan hududga o‘xshaydi. Bu faqat joylashuvni eslash uchun o‘xshatish.', 'Yadro ichida qaysi ikki zarracha bor?', 'proton va neytron', 'Yadroda proton va neytron bo‘ladi; elektron yadro tashqarisida.'],
      ['atom-zaryad', 'Zaryad va neytrallik', 'Proton musbat, elektron manfiy, neytron zaryadsiz. Neytral atomda musbat va manfiy zaryadlar soni teng.', 'Tarozining ikki pallasi teng bo‘lsa, umumiy natija nol bo‘ladi. Proton va elektron soni teng bo‘lsa, atom ham neytral.', '5 protonli neytral atomda nechta elektron bor?', '5', 'Neytral atomda proton va elektron soni teng.'],
      ['tartib-raqam', 'Tartib raqami', 'Elementning tartib raqami protonlar sonidir. Neytral atomda elektronlar sonini ham shu son orqali topish mumkin.', 'Tartib raqami atomning pasport raqamiga o‘xshaydi: u protonlar sonini aniq bildiradi.', 'Tartib raqami 8 bo‘lgan atomda nechta proton bor?', '8', 'Tartib raqami protonlar soniga teng.']
    ],
    questions: [
      q('a1','atom-qismlari','Atom yadrosida qaysi zarrachalar joylashgan?',['Proton va neytron','Proton va elektron','Faqat elektron','Elektron va neytron'],0,'Yadro proton va neytrondan iborat.','Elektronlar yadro ichida emas, uning atrofida joylashadi.'),
      q('a2','atom-zaryad','Qaysi zarracha manfiy zaryadli?',['Proton','Neytron','Elektron','Yadro'],2,'Elektron manfiy zaryadli.','Proton musbat, neytron esa zaryadsiz.'),
      q('a3','atom-zaryad','Neytral atomda protonlar soni qaysi zarrachalar soniga teng?',['Neytronlar','Elektronlar','Yadrolar','Molekulalar'],1,'Musbat proton va manfiy elektron soni teng bo‘lganda atom neytral bo‘ladi.','Neytronlar soni o‘zgarishi mumkin; neytrallikni elektronlar bilan protonlar belgilaydi.'),
      q('a4','tartib-raqam','Tartib raqami 11 bo‘lgan element atomida nechta proton bor?',['10','11','12','22'],1,'Tartib raqami protonlar sonini bildiradi.','Tartib raqamini neytronlar yoki barcha zarrachalar yig‘indisi bilan aralashtirmang.'),
      q('a5','atom-qismlari','Elektron atomning qaysi qismida joylashadi?',['Yadro ichida','Proton ichida','Yadro atrofida','Neytron ichida'],2,'Elektronlar yadro atrofida joylashadi.','Yadro ichida proton va neytron bor, elektron emas.')
    ]
  },
  {
    id: 'kimyoviy-reaksiya', subject: 'kimyo', title: 'Kimyoviy reaksiyalar', summary: 'Reagent, mahsulot va massa saqlanishini amalda ajrating.', grade: 8, minutes: 14,
    lesson: {
      intro: 'Kimyoviy reaksiyada boshlang‘ich moddalar yangi moddalarga aylanadi.',
      body: 'Reaksiyaga kirishgan moddalar reagentlar, hosil bo‘lgan moddalar mahsulotlar deyiladi. Tenglamada reagentlar chapda, mahsulotlar o‘ngda yoziladi. Atomlar yo‘qolmaydi va paydo bo‘lmaydi; ular qayta guruhlanadi. Shuning uchun yopiq tizimda umumiy massa saqlanadi.',
      example: '2H₂ + O₂ → 2H₂O: vodorod va kislorod reagentlar, suv mahsulot. Chapda ham, o‘ngda ham 4 ta vodorod va 2 ta kislorod atomi bor.'
    },
    cards: [
      ['Reagent nima?', 'Reaksiyaga kirishadigan boshlang‘ich modda.'],
      ['Mahsulot nima?', 'Reaksiya natijasida hosil bo‘lgan modda.'],
      ['Tenglamaning chap tomonida nima yoziladi?', 'Reagentlar.'],
      ['Yopiq tizimda umumiy massa qanday o‘zgaradi?', 'Saqlanadi.']
    ],
    concepts: [
      ['reaksiya-tomonlari','Reaksiya tenglamasining tomonlari','O‘qni “aylanadi” deb o‘qing. O‘qdan oldingi moddalar reagent, o‘qdan keyingilar mahsulot.', 'Retseptdagi masalliqlar reagentlarga, tayyor taom mahsulotga o‘xshaydi. Kimyoda esa atomlar qayta joylashadi.', 'A + B → C tenglamasida C nima?', 'mahsulot', 'C o‘ng tomonda, demak mahsulot.'],
      ['massa-saqlanish','Massa saqlanishi','Yopiq tizimda reaksiyadan oldingi va keyingi umumiy massa teng. Atomlar qayta joylashadi, ammo yo‘qolmaydi.', 'Konstruktor bo‘laklaridan yangi shakl yasasangiz ham, bo‘laklar soni o‘zgarmaydi.', 'Yopiq idishda 3 g va 5 g modda reaksiyaga kirishsa, mahsulotlar jami necha gramm?', '8', 'Yopiq tizimda 3 + 5 = 8 g.'],
      ['tenglama-koeff','Tenglama koeffitsiyenti','Formula oldidagi son butun molekulalar sonini bildiradi. 2H₂ — ikki dona H₂ molekulasi, jami to‘rt H atomi.', 'Ikki quti, har birida ikki olma bo‘lsa, jami to‘rt olma bo‘ladi.', '2H₂ da jami nechta vodorod atomi bor?', '4', 'Har bir H₂ da ikki atom; 2 × 2 = 4.']
    ],
    questions: [
      q('r1','reaksiya-tomonlari','A + B → C tenglamasida A va B nima deyiladi?',['Mahsulotlar','Reagentlar','Katalizatorlar','Atomlar'],1,'O‘qdan oldingi A va B reagentlardir.','Mahsulot o‘qdan keyin yoziladi.'),
      q('r2','reaksiya-tomonlari','2H₂ + O₂ → 2H₂O tenglamasida mahsulot qaysi?',['H₂','O₂','H₂O','H₂ va O₂'],2,'Suv o‘qdan keyin turibdi, shuning uchun mahsulot.','Vodorod va kislorod o‘qdan oldin: ular reagent.'),
      q('r3','massa-saqlanish','Yopiq idishda 7 g va 3 g modda to‘liq reaksiyaga kirishsa, mahsulotlar jami massasi qancha?',['3 g','7 g','10 g','11 g'],2,'Yopiq tizimda massa saqlanadi: 7 + 3 = 10 g.','Reaksiyada atomlar yo‘qolmaydi; boshlang‘ich massalarni qo‘shing.'),
      q('r4','tenglama-koeff','3O₂ yozuvida jami nechta kislorod atomi bor?',['2','3','5','6'],3,'Uchta O₂ molekulasi: 3 × 2 = 6 atom.','Formula oldidagi 3 molekulalar soni, pastdagi 2 esa har molekuladagi atomlar soni.'),
      q('r5','massa-saqlanish','Yopiq tizimdagi kimyoviy reaksiyada atomlar bilan nima sodir bo‘ladi?',['Yo‘qoladi','Yangidan paydo bo‘ladi','Qayta guruhlanadi','Massasiz bo‘lib qoladi'],2,'Atomlar qayta guruhlanib, yangi moddalarni hosil qiladi.','Reaksiya atomlarni yo‘q qilmaydi va yo‘qdan yaratmaydi.')
    ]
  },
  {
    id: 'hujayra-tuzilishi', subject: 'biologiya', title: 'Hujayra tuzilishi', summary: 'Membrana, sitoplazma va yadroning vazifalarini biling.', grade: 7, minutes: 12,
    lesson: {
      intro: 'Hujayra tirik organizmlarning asosiy tuzilish va faoliyat birligidir.',
      body: 'Hujayra membranasi hujayrani o‘rab, moddalarning kirishi va chiqishini tartibga soladi. Sitoplazma hujayraning ichki suyuq muhitidir. Yadro ko‘plab hujayralarda irsiy axborotni saqlaydi. O‘simlik hujayrasida qo‘shimcha hujayra devori va fotosintez qiladigan xloroplastlar bo‘ladi.',
      example: 'Barg hujayrasidagi xloroplastlar yorug‘lik energiyasidan foydalanadi. Hayvon hujayrasida esa xloroplast bo‘lmaydi.'
    },
    cards: [
      ['Membrananing vazifasi nima?', 'Moddalar kirishi va chiqishini tartibga solish.'],
      ['Sitoplazma nima?', 'Hujayraning ichki suyuq muhiti.'],
      ['Yadro nimani saqlaydi?', 'Irsiy axborotni.'],
      ['Xloroplast qaysi hujayrada bo‘ladi?', 'Fotosintez qiladigan o‘simlik hujayralarida.']
    ],
    concepts: [
      ['membrana','Membrana vazifasi','Membrana hujayra chegarasi bo‘lib, hamma moddani bir xil o‘tkazmaydi. U kirish va chiqishni tartibga soladi.', 'Eshik kim kirib chiqishini boshqaradi; membrana ham moddalar oqimini boshqaradi.', 'Moddalar kirishi va chiqishini nima tartibga soladi?', 'membrana', 'Bu vazifa membranaga tegishli.'],
      ['yadro-sitoplazma','Yadro va sitoplazma','Sitoplazma hujayraning ichki muhiti. Yadro esa ko‘plab hujayralarda irsiy axborotni saqlaydi.', 'Xonadagi umumiy joy sitoplazmaga, muhim ko‘rsatmalar saqlanadigan joy esa yadroga o‘xshaydi.', 'Irsiy axborot qayerda saqlanadi?', 'yadro', 'Ko‘plab hujayralarda irsiy axborot yadroda saqlanadi.'],
      ['osimlik-hujayra','O‘simlik hujayrasining o‘ziga xosligi','Fotosintez qiladigan o‘simlik hujayralarida xloroplast bor. Hujayra devori membranadan tashqarida qo‘shimcha tayanch beradi.', 'Membrana ichki chegara, devor esa uning tashqarisidagi mustahkam qobiq kabi.', 'Fotosintez qaysi organoidda boradi?', 'xloroplast', 'Fotosintez xloroplastda boradi.']
    ],
    questions: [
      q('h1','membrana','Hujayraga moddalar kirishi va chiqishini nima tartibga soladi?',['Yadro','Membrana','Xloroplast','Hujayra devori'],1,'Membrana moddalar almashinuvini tartibga soladi.','Yadro irsiy axborot bilan bog‘liq; devor esa asosan tayanch beradi.'),
      q('h2','yadro-sitoplazma','Ko‘plab hujayralarda irsiy axborot qayerda saqlanadi?',['Sitoplazmada','Membranada','Yadroda','Hujayra devorida'],2,'Yadro irsiy axborotni saqlaydi.','Sitoplazma ichki muhit, membrana chegara vazifasini bajaradi.'),
      q('h3','yadro-sitoplazma','Hujayraning ichki suyuq muhiti nima deyiladi?',['Sitoplazma','Yadro','Xloroplast','Devori'],0,'Sitoplazma hujayra ichidagi suyuq muhitdir.','Yadro sitoplazma ichidagi alohida tuzilma.'),
      q('h4','osimlik-hujayra','Fotosintez qaysi organoidda boradi?',['Yadroda','Xloroplastda','Membranada','Sitoplazmada'],1,'Xloroplast yorug‘lik energiyasidan foydalanadi.','Yadro axborot saqlaydi; fotosintezning asosiy joyi xloroplast.'),
      q('h5','osimlik-hujayra','O‘simlik hujayra devori membranaga nisbatan qayerda joylashadi?',['Membrana tashqarisida','Yadro ichida','Xloroplast ichida','Membrana o‘rnida'],0,'Hujayra devori membrananing tashqarisida joylashadi.','Devor membranani almashtirmaydi; ular turli tuzilmalardir.')
    ]
  },
  {
    id: 'fotosintez', subject: 'biologiya', title: 'Fotosintez', summary: 'O‘simliklar yorug‘likdan qanday foydalanishini o‘rganing.', grade: 8, minutes: 14,
    lesson: {
      intro: 'Fotosintezda o‘simlik yorug‘lik energiyasi yordamida organik modda hosil qiladi.',
      body: 'Fotosintez asosan bargdagi xloroplastlarda boradi. O‘simlik karbonat angidridni havodan, suvni ildiz orqali oladi. Yorug‘lik energiyasi yordamida glyukoza hosil bo‘ladi va kislorod ajraladi. Jarayon uchun yorug‘lik kerak; nafas olish esa boshqa jarayon bo‘lib, kunu tun davom etadi.',
      example: 'Oddiy ko‘rinish: karbonat angidrid + suv + yorug‘lik → glyukoza + kislorod. Bu yozuv jarayonni tushunishga yordam beradi, to‘liq tenglama emas.'
    },
    cards: [
      ['Fotosintez asosan qayerda boradi?', 'Xloroplastlarda.'],
      ['O‘simlik karbonat angidridni qayerdan oladi?', 'Havodan.'],
      ['Fotosintezda ajraladigan gaz qaysi?', 'Kislorod.'],
      ['Fotosintez uchun qaysi energiya kerak?', 'Yorug‘lik energiyasi.']
    ],
    concepts: [
      ['foto-kirish','Fotosintezga kerak bo‘ladiganlar','Fotosintezga karbonat angidrid, suv va yorug‘lik energiyasi kerak. O‘simlik CO₂ ni havodan, suvni tuproqdan oladi.', 'Oshpaz retsept uchun masalliqlar va energiyaga muhtoj; o‘simlik uchun “masalliqlar” CO₂ va suv, energiya esa yorug‘lik.', 'Fotosintezda havodan olinadigan gaz qaysi?', 'karbonat angidrid', 'O‘simlik havodan karbonat angidrid oladi.'],
      ['foto-mahsulot','Fotosintez mahsulotlari','Fotosintez natijasida glyukoza hosil bo‘ladi va kislorod ajraladi. Kislorod kirish moddasi emas.', 'Tayyor natijani eslang: o‘simlik uchun oziq bo‘ladigan glyukoza va havoga chiqadigan kislorod.', 'Fotosintezda ajraladigan gaz qaysi?', 'kislorod', 'Fotosintezda kislorod ajraladi.'],
      ['foto-joy','Fotosintez joyi','Fotosintez asosan xloroplastlarda boradi. Xlorofill yorug‘likni yutishga yordam beradi.', 'Xloroplastni yorug‘lik bilan ishlaydigan kichik ustaxona deb tasavvur qiling.', 'Fotosintez qaysi organoidda boradi?', 'xloroplast', 'Fotosintezning asosiy joyi xloroplast.']
    ],
    questions: [
      q('f1','foto-joy','Fotosintez asosan qaysi organoidda boradi?',['Mitoxondriyada','Xloroplastda','Yadroda','Membranada'],1,'Xloroplast fotosintezning asosiy joyi.','Mitoxondriya hujayra nafas olishi bilan bog‘liq; fotosintez xloroplastda boradi.'),
      q('f2','foto-kirish','O‘simlik fotosintez uchun karbonat angidridni qayerdan oladi?',['Tuproqdan','Havodan','Quyoshdan','Xlorofilldan'],1,'Karbonat angidrid havodan olinadi.','Suv asosan tuproqdan olinadi; yorug‘lik quyoshdan keladi.'),
      q('f3','foto-mahsulot','Fotosintezda qaysi gaz ajraladi?',['Azot','Karbonat angidrid','Kislorod','Vodorod'],2,'Fotosintez natijasida kislorod ajraladi.','Karbonat angidrid boshlang‘ich modda sifatida ishlatiladi.'),
      q('f4','foto-kirish','Fotosintez uchun qaysi energiya zarur?',['Yorug‘lik energiyasi','Tovush energiyasi','Faqat issiqlik','Elektr toki'],0,'Yorug‘lik energiyasi fotosintezni ta’minlaydi.','Issiqlikning o‘zi yorug‘lik o‘rnini bosa olmaydi.'),
      q('f5','foto-mahsulot','Fotosintezda hosil bo‘ladigan organik modda qaysi?',['Suv','Kislorod','Glyukoza','Karbonat angidrid'],2,'Glyukoza fotosintezda hosil bo‘ladigan organik moddadir.','Suv va karbonat angidrid boshlang‘ich moddalardir; kislorod organik modda emas.')
    ]
  }
];
const extra = require('./content-fanlar.cjs');
const subjects = [
  { id: 'kimyo', title: 'Kimyo', description: 'Moddalar va ularning o‘zgarishini o‘rganing.', icon: '⚗' },
  { id: 'biologiya', title: 'Biologiya', description: 'Tirik tabiat jarayonlarini tushuning.', icon: '◌' },
  ...extra.subjects
];
module.exports = { subjects, topics: [...topics, ...extra.topics] };
