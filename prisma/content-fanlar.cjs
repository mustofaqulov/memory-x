// Fizika, matematika, ingliz tili va rus tili bo‘yicha boshlang‘ich kontent. Tarjimalar src/lib/i18n/curriculum.json da.
const q = (id, concept, prompt, choices, answer, correctNote, wrongNote) => ({ id, concept, prompt, choices, answer, correctNote, wrongNote });
const subjects = [
  { id: 'fizika', title: 'Fizika', description: 'Harakat, kuch va energiya qonuniyatlarini kashf eting.', icon: '⚛' },
  { id: 'matematika', title: 'Matematika', description: 'Sonlar va tenglamalar bilan mantiqiy fikrlashni o‘rganing.', icon: '∑' },
  { id: 'ingliz-tili', title: 'Ingliz tili', description: 'Ingliz tili grammatikasini misollar bilan o‘zlashtiring.', icon: 'A' },
  { id: 'rus-tili', title: 'Rus tili', description: 'Rus tili grammatikasining asosiy qoidalarini o‘rganing.', icon: 'Я' }
];
const topics = [
  {
    id: 'tezlik-harakat', subject: 'fizika', title: 'Tezlik va harakat', summary: 'Yo‘l, vaqt va tezlik o‘rtasidagi bog‘lanishni tushuning.', grade: 7, minutes: 12,
    lesson: {
      intro: 'Jism vaqt o‘tishi bilan joyini o‘zgartirsa, u harakatlanayotgan bo‘ladi.',
      body: 'Jismning bosib o‘tgan masofasi yo‘l deyiladi va metrda (m) o‘lchanadi. Harakat vaqti sekundda (s) o‘lchanadi. Tezlik vaqt birligida bosib o‘tilgan yo‘lni ko‘rsatadi: v = s / t. Tezlik o‘zgarmas bo‘lsa, harakat tekis harakat deyiladi. Yo‘lni topish uchun tezlikni vaqtga ko‘paytiramiz: s = v · t.',
      example: 'Velosipedchi 10 sekundda 50 metr yo‘l bosdi. Uning tezligi v = 50 m / 10 s = 5 m/s.'
    },
    cards: [
      ['Tezlik formulasi qanday?', 'v = s / t.'],
      ['Yo‘l qaysi birlikda o‘lchanadi?', 'Metrda (m).'],
      ['Tekis harakat nima?', 'Tezlik o‘zgarmas bo‘lgan harakat.'],
      ['Yo‘lni qanday topamiz?', 'Tezlikni vaqtga ko‘paytirib: s = v · t.']
    ],
    concepts: [
      ['tezlik-formula', 'Tezlik formulasi', 'Tezlik yo‘lni vaqtga bo‘lish orqali topiladi: v = s / t. Natija m/s da chiqadi.', 'Agar har sekundda 3 qadam tashlasangiz, tezligingiz «sekundiga 3 qadam» bo‘ladi — fizikada qadam o‘rniga metr olinadi.', '20 m yo‘lni 4 s da bosgan jism tezligi necha m/s?', '5', '20 / 4 = 5 m/s.'],
      ['yol-topish', 'Yo‘lni topish', 'Tezlik va vaqt ma’lum bo‘lsa, yo‘l s = v · t formula bilan topiladi.', 'Har soatda 60 km yuradigan avtobus 2 soatda 120 km yo‘l bosadi.', '3 m/s tezlik bilan 10 s harakatlangan jism necha metr yo‘l bosadi?', '30', '3 × 10 = 30 m.'],
      ['birliklar', 'O‘lchov birliklari', 'Xalqaro birliklar tizimida yo‘l metrda, vaqt sekundda, tezlik esa m/s da o‘lchanadi.', 'Birliklar umumiy tilga o‘xshaydi: hamma bir xil birlikdan foydalansa, natijalarni solishtirish oson.', 'Vaqtning asosiy birligi nima?', 'sekund', 'Vaqt sekundda (s) o‘lchanadi.']
    ],
    questions: [
      q('tz1', 'tezlik-formula', '100 m yo‘lni 20 s da bosgan jismning tezligi qancha?', ['2 m/s', '5 m/s', '80 m/s', '2000 m/s'], 1, '100 / 20 = 5 m/s.', 'Tezlikni topish uchun yo‘lni vaqtga bo‘ling, ko‘paytirmang.'),
      q('tz2', 'yol-topish', '4 m/s tezlik bilan 15 s harakatlangan jism qancha yo‘l bosadi?', ['19 m', '11 m', '60 m', '3,75 m'], 2, 's = v · t = 4 × 15 = 60 m.', 'Yo‘lni topishda tezlik va vaqt ko‘paytiriladi.'),
      q('tz3', 'birliklar', 'Tezlikning XBT dagi birligi qaysi?', ['m/s', 'km', 's', 'kg'], 0, 'Tezlik metr taqsim sekundda o‘lchanadi.', 'km — masofa, s — vaqt, kg — massa birligi.'),
      q('tz4', 'tezlik-formula', 'Tekis harakatda nima o‘zgarmaydi?', ['Yo‘l', 'Vaqt', 'Tezlik', 'Joylashuv'], 2, 'Tekis harakatda tezlik o‘zgarmas bo‘ladi.', 'Yo‘l va vaqt ortib boradi, tezlik esa bir xil qoladi.'),
      q('tz5', 'birliklar', 'Yo‘l qaysi harf bilan belgilanadi?', ['v', 't', 's', 'm'], 2, 'Yo‘l s harfi bilan belgilanadi.', 'v — tezlik, t — vaqt, m — massa belgisi.')
    ]
  },
  {
    id: 'elektr-toki', subject: 'fizika', title: 'Elektr toki', summary: 'Tok kuchi, kuchlanish va qarshilik bog‘liqligini o‘rganing.', grade: 8, minutes: 14,
    lesson: {
      intro: 'Elektr toki — zaryadli zarrachalarning tartibli harakati.',
      body: 'Metall o‘tkazgichlarda tokni elektronlar hosil qiladi. Tok kuchi I amperda (A), kuchlanish U voltda (V), qarshilik R esa omda (Ω) o‘lchanadi. Om qonuniga ko‘ra, zanjir qismidagi tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional: I = U / R. Tok faqat yopiq zanjirda oqadi.',
      example: 'Qarshiligi 4 Ω bo‘lgan lampaga 12 V kuchlanish berilsa, tok kuchi I = 12 / 4 = 3 A bo‘ladi.'
    },
    cards: [
      ['Elektr toki nima?', 'Zaryadli zarrachalarning tartibli harakati.'],
      ['Tok kuchi qaysi birlikda o‘lchanadi?', 'Amperda (A).'],
      ['Om qonuni formulasi?', 'I = U / R.'],
      ['Tok qanday zanjirda oqadi?', 'Yopiq zanjirda.']
    ],
    concepts: [
      ['om-qonuni', 'Om qonuni', 'Tok kuchi kuchlanishni qarshilikka bo‘lish orqali topiladi: I = U / R. Kuchlanish ortsa tok ortadi, qarshilik ortsa tok kamayadi.', 'Quvurdagi suvni tasavvur qiling: bosim — kuchlanish, quvurning torligi — qarshilik, oqayotgan suv — tok.', '6 V kuchlanish va 2 Ω qarshilikda tok kuchi necha amper?', '3', '6 / 2 = 3 A.'],
      ['elektr-birliklar', 'Elektr kattaliklari birliklari', 'Tok kuchi amperda, kuchlanish voltda, qarshilik omda o‘lchanadi.', 'Har bir kattalikning o‘z «familiyasi» bor: amper, volt va om — olimlar sharafiga qo‘yilgan nomlar.', 'Kuchlanish qaysi birlikda o‘lchanadi?', 'volt', 'Kuchlanish voltda (V) o‘lchanadi.'],
      ['yopiq-zanjir', 'Yopiq zanjir', 'Tok oqishi uchun manba, o‘tkazgich va iste’molchi uzilishsiz ulangan bo‘lishi kerak. Kalit ochilsa, zanjir uziladi va tok to‘xtaydi.', 'Zanjir aylana yo‘lga o‘xshaydi: ko‘prik buzilsa, mashinalar aylana bo‘ylab yura olmaydi.', 'Kalit ochilganda zanjirda tok bo‘ladimi? (ha/yo‘q)', 'yo‘q', 'Ochiq zanjirda tok oqmaydi.']
    ],
    questions: [
      q('el1', 'om-qonuni', 'Kuchlanish 10 V, qarshilik 5 Ω bo‘lsa, tok kuchi qancha?', ['50 A', '2 A', '15 A', '0,5 A'], 1, 'I = U / R = 10 / 5 = 2 A.', 'Om qonunida kuchlanish qarshilikka bo‘linadi.'),
      q('el2', 'elektr-birliklar', 'Qarshilik qaysi birlikda o‘lchanadi?', ['Amper', 'Volt', 'Om', 'Vatt'], 2, 'Qarshilik omda (Ω) o‘lchanadi.', 'Amper — tok kuchi, volt — kuchlanish birligi.'),
      q('el3', 'om-qonuni', 'Kuchlanish o‘zgarmay qarshilik ortsa, tok kuchi qanday o‘zgaradi?', ['Ortadi', 'Kamayadi', 'O‘zgarmaydi', 'Nolga teng bo‘ladi'], 1, 'Tok qarshilikka teskari proporsional, shuning uchun kamayadi.', 'Qarshilik — tokka to‘siq; to‘siq kattalashsa, tok kamayadi.'),
      q('el4', 'yopiq-zanjir', 'Zanjirda tok oqishi uchun qanday shart kerak?', ['Zanjir ochiq bo‘lishi', 'Zanjir yopiq bo‘lishi', 'Manba bo‘lmasligi', 'O‘tkazgich uzilgan bo‘lishi'], 1, 'Tok faqat yopiq zanjirda oqadi.', 'Zanjir uzilsa, zaryadlar harakati to‘xtaydi.'),
      q('el5', 'elektr-birliklar', 'Tok kuchi qaysi harf bilan belgilanadi?', ['U', 'R', 'I', 'A'], 2, 'Tok kuchi I harfi bilan belgilanadi.', 'U — kuchlanish, R — qarshilik, A esa birlik (amper).')
    ]
  },
  {
    id: 'oddiy-kasrlar', subject: 'matematika', title: 'Oddiy kasrlar', summary: 'Kasrlarni qisqartirish va qo‘shishni tushuning.', grade: 6, minutes: 12,
    lesson: {
      intro: 'Kasr butunning qismlarini ko‘rsatadi.',
      body: 'Kasr chizig‘i ustidagi son surat, ostidagi son maxraj deyiladi. Maxraj butun nechta teng qismga bo‘linganini, surat esa nechta qism olinganini bildiradi. Kasrni qisqartirish uchun surat va maxraj bir xil songa bo‘linadi. Maxrajlari bir xil kasrlarni qo‘shishda suratlar qo‘shiladi, maxraj esa o‘zgarmaydi.',
      example: 'Pitsa 8 bo‘lakka bo‘lindi va 2 bo‘lagi yeyildi: bu 2/8 = 1/4 qism. 1/5 + 2/5 = 3/5.'
    },
    cards: [
      ['Kasrning surati nima?', 'Kasr chizig‘i ustidagi son.'],
      ['Maxraj nimani bildiradi?', 'Butun nechta teng qismga bo‘linganini.'],
      ['4/8 ni qisqartiring.', '1/2.'],
      ['2/7 + 3/7 = ?', '5/7.']
    ],
    concepts: [
      ['surat-maxraj', 'Surat va maxraj', 'Maxraj butun nechta teng qismga bo‘linganini, surat esa shundan nechtasi olinganini ko‘rsatadi.', 'Shokolad 6 bo‘lakka bo‘lingan bo‘lsa, maxraj 6; siz 2 bo‘lak olsangiz, surat 2 bo‘ladi.', '3/10 kasrning maxraji nechaga teng?', '10', 'Maxraj — chiziq ostidagi son: 10.'],
      ['kasr-qisqartirish', 'Kasrni qisqartirish', 'Surat va maxrajni ularning umumiy bo‘luvchisiga bo‘lsak, kasr qiymati o‘zgarmaydi, faqat ko‘rinishi soddalashadi.', 'Bir pitsani 8 yoki 4 bo‘lakka bo‘lsangiz ham, uning yarmi baribir yarim bo‘lib qoladi.', '6/9 kasrni qisqartirganda surat nechaga teng bo‘ladi?', '2', '6 va 9 ni 3 ga bo‘lamiz: 2/3.'],
      ['kasr-qoshish', 'Bir xil maxrajli kasrlarni qo‘shish', 'Maxrajlar teng bo‘lsa, faqat suratlar qo‘shiladi, maxraj o‘zgarmaydi.', '3 ta chorak va yana 1 ta chorak — jami 4 ta chorak: bo‘laklar soni o‘zgaradi, bo‘lak hajmi esa yo‘q.', '1/9 + 4/9 yig‘indining surati nechaga teng?', '5', '1 + 4 = 5, javob 5/9.']
    ],
    questions: [
      q('ks1', 'surat-maxraj', '5/12 kasrda surat qaysi son?', ['12', '5', '17', '7'], 1, 'Surat — kasr chizig‘i ustidagi son: 5.', '12 — maxraj, u chiziq ostida turadi.'),
      q('ks2', 'kasr-qisqartirish', '8/12 kasrni qisqartiring.', ['4/6', '2/3', '1/4', '3/4'], 1, '8 va 12 ni 4 ga bo‘lamiz: 2/3.', '4/6 ham to‘g‘ri qiymat, lekin hali oxirigacha qisqartirilmagan.'),
      q('ks3', 'kasr-qoshish', '3/10 + 4/10 = ?', ['7/20', '7/10', '12/10', '1/10'], 1, 'Suratlar qo‘shiladi: 3 + 4 = 7, maxraj 10 qoladi.', 'Maxrajlarni qo‘shmang — ular bir xil bo‘lsa, o‘zgarmaydi.'),
      q('ks4', 'surat-maxraj', 'Butun 6 ta teng qismga bo‘lingan va 1 qism olingan. Bu qaysi kasr?', ['6/1', '1/6', '5/6', '1/5'], 1, '1 qism olingan — surat 1; 6 qismga bo‘lingan — maxraj 6.', 'Maxraj umumiy qismlar soni, surat esa olingan qismlar soni.'),
      q('ks5', 'kasr-qisqartirish', 'Qaysi kasr 1/2 ga teng?', ['2/3', '3/6', '3/5', '4/10'], 1, '3/6 ni 3 ga qisqartirsak 1/2 hosil bo‘ladi.', 'Surat maxrajning aynan yarmiga teng bo‘lishi kerak.')
    ]
  },
  {
    id: 'chiziqli-tenglama', subject: 'matematika', title: 'Chiziqli tenglamalar', summary: 'Noma’lumni topish uchun tenglamani bosqichma-bosqich yeching.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Tenglama — noma’lum son qatnashgan tenglik.',
      body: 'Tenglamani yechish — noma’lumning tenglikni to‘g‘ri qiladigan qiymatini topish demakdir. Tenglikning ikkala tomoniga bir xil son qo‘shish yoki ayirish mumkin. Ikkala tomonni noldan farqli bir xil songa ko‘paytirish yoki bo‘lish ham mumkin. Qo‘shiluvchini boshqa tomonga o‘tkazganda uning ishorasi o‘zgaradi.',
      example: '2x + 3 = 11. Ikkala tomondan 3 ni ayiramiz: 2x = 8. Ikkala tomonni 2 ga bo‘lamiz: x = 4. Tekshiramiz: 2 · 4 + 3 = 11.'
    },
    cards: [
      ['Tenglama nima?', 'Noma’lum son qatnashgan tenglik.'],
      ['x + 5 = 9 bo‘lsa, x = ?', '4.'],
      ['Hadni boshqa tomonga o‘tkazganda nima o‘zgaradi?', 'Uning ishorasi.'],
      ['3x = 12 bo‘lsa, x = ?', '4.']
    ],
    concepts: [
      ['tenglama-muvozanat', 'Tenglik muvozanati', 'Tenglama — muvozanatdagi tarozi. Ikkala tomonga bir xil amal bajarilsa, muvozanat saqlanadi.', 'Tarozining ikki pallasiga bir xil yuk qo‘shsangiz, u baribir teng turadi.', 'x − 7 = 3 tenglamada x nechaga teng?', '10', 'Ikkala tomonga 7 qo‘shamiz: x = 10.'],
      ['ishora-almashish', 'Hadni o‘tkazish', 'Qo‘shiluvchi tenglikning boshqa tomoniga o‘tganda ishorasi teskarisiga o‘zgaradi: + bo‘lsa −, − bo‘lsa + bo‘ladi.', 'Eshikdan chiqish kirishning teskarisi: tomonni almashtirsangiz, amal ham teskarisiga aylanadi.', 'x + 6 = 15 bo‘lsa, x nechaga teng?', '9', '6 ni o‘ngga o‘tkazamiz: x = 15 − 6 = 9.'],
      ['koeffitsiyent-bolish', 'Koeffitsiyentga bo‘lish', 'ax = b ko‘rinishidagi tenglamada x ni topish uchun ikkala tomon a ga bo‘linadi.', '3 do‘st 18 ta konfetni teng bo‘lishsa, har biriga 18 / 3 = 6 tadan tegadi.', '5x = 35 bo‘lsa, x nechaga teng?', '7', '35 / 5 = 7.']
    ],
    questions: [
      q('tg1', 'ishora-almashish', 'x + 8 = 20 tenglamani yeching.', ['x = 28', 'x = 12', 'x = 2,5', 'x = 160'], 1, '8 ni o‘ngga o‘tkazamiz: x = 20 − 8 = 12.', 'Qo‘shiluvchini o‘tkazganda ishora o‘zgaradi: + 8 emas, − 8 bo‘ladi.'),
      q('tg2', 'koeffitsiyent-bolish', '4x = 28 bo‘lsa, x nechaga teng?', ['7', '24', '32', '112'], 0, 'Ikkala tomonni 4 ga bo‘lamiz: x = 7.', '4x — bu 4 · x; uni yo‘qotish uchun bo‘lish kerak, ayirish emas.'),
      q('tg3', 'tenglama-muvozanat', '2x + 1 = 9 tenglamaning yechimi qaysi?', ['x = 5', 'x = 4', 'x = 3', 'x = 8'], 1, '2x = 8, keyin x = 4.', 'Avval 1 ni ayiring, so‘ng 2 ga bo‘ling.'),
      q('tg4', 'ishora-almashish', 'x − 5 = 2 bo‘lsa, x = ?', ['−3', '3', '7', '10'], 2, '5 ni o‘ngga o‘tkazamiz: x = 2 + 5 = 7.', '−5 boshqa tomonga +5 bo‘lib o‘tadi.'),
      q('tg5', 'tenglama-muvozanat', 'Tenglamaning ikkala tomoniga bir xil son qo‘shilsa nima bo‘ladi?', ['Yechim o‘zgaradi', 'Tenglik buziladi', 'Tenglik saqlanadi', 'Noma’lum yo‘qoladi'], 2, 'Ikkala tomonga bir xil amal tenglikni saqlaydi.', 'Faqat bir tomonga qo‘shsangiz muvozanat buziladi; ikkala tomonga qo‘shish xavfsiz.')
    ]
  },
  {
    id: 'present-simple', subject: 'ingliz-tili', title: 'Present Simple', summary: 'Doimiy odatlar va faktlar haqida gapirishni o‘rganing.', grade: 6, minutes: 12,
    lesson: {
      intro: 'Present Simple doimiy odatlar, kundalik ishlar va umumiy faktlarni ifodalaydi.',
      body: 'I, you, we, they bilan fe’l o‘zgarmaydi: I play. He, she, it bilan fe’lga -s yoki -es qo‘shiladi: she plays, he watches. Inkor gapda do not (don’t) yoki does not (doesn’t) ishlatiladi. Savol gap Do yoki Does bilan boshlanadi. Does dan keyin fe’l -s olmaydi.',
      example: 'I drink tea every morning. She drinks coffee. He doesn’t like milk. Do you speak English?'
    },
    cards: [
      ['She ___ (play) tennis.', 'plays.'],
      ['He bilan inkor qanday yasaladi?', 'doesn’t + fe’l: He doesn’t play.'],
      ['Savol gap qaysi so‘z bilan boshlanadi?', 'Do yoki Does.'],
      ['Present Simple nimani ifodalaydi?', 'Odatlar va doimiy faktlarni.']
    ],
    concepts: [
      ['uchinchi-shaxs-s', 'He, she, it uchun -s', 'Uchinchi shaxs birlikda (he, she, it) fe’lga -s yoki -es qo‘shiladi: works, goes, watches.', '-s — bu «boshqa bitta odam» haqida gapirayotganingizni bildiruvchi kichik belgi.', 'He ___ (read) books. Bo‘sh joyga so‘zni yozing.', 'reads', 'He bilan fe’l -s oladi: reads.'],
      ['do-does', 'Do va Does', 'Savol va inkorda I, you, we, they bilan do, he, she, it bilan does ishlatiladi. Does dan keyin fe’l -s olmaydi.', '-s go‘yo does ga «ko‘chib o‘tadi»: She plays → Does she play?', '___ she like music? (Do/Does)', 'does', 'She bilan Does ishlatiladi.'],
      ['odat-fakt', 'Qachon ishlatiladi', 'Present Simple odatlar (every day, usually), jadvallar va umumiy haqiqatlar uchun ishlatiladi: The sun rises in the east.', 'Bu zamon — hayotingizning «doimiy jadvali», hozir sodir bo‘layotgan bir martalik ish emas.', 'Water ___ at 100 degrees. (boil)', 'boils', 'Umumiy fakt va «it» uchun: boils.']
    ],
    questions: [
      q('ps1', 'uchinchi-shaxs-s', 'My brother ___ football every Sunday.', ['play', 'plays', 'playing', 'is play'], 1, 'He (my brother) bilan fe’l -s oladi: plays.', 'Uchinchi shaxs birlikda fe’lga -s qo‘shishni unutmang.'),
      q('ps2', 'do-does', '___ they live in Tashkent?', ['Does', 'Do', 'Is', 'Are'], 1, 'They bilan Do ishlatiladi.', 'Does faqat he, she, it bilan keladi.'),
      q('ps3', 'do-does', 'She ___ like cold weather.', ['don’t', 'doesn’t', 'isn’t', 'not'], 1, 'She bilan inkorda doesn’t ishlatiladi.', 'don’t — I, you, we, they uchun.'),
      q('ps4', 'odat-fakt', 'Qaysi gap Present Simple da to‘g‘ri yozilgan?', ['The sun rise in the east.', 'The sun rises in the east.', 'The sun rising in the east.', 'The sun is rise in the east.'], 1, 'Umumiy fakt va «the sun» (it) uchun: rises.', 'Sun — uchinchi shaxs birlik, fe’l -s oladi.'),
      q('ps5', 'do-does', 'Does he ___ English?', ['speaks', 'speak', 'speaking', 'spoke'], 1, 'Does dan keyin fe’l asosiy shaklda: speak.', '-s allaqachon does da bor, fe’lga qayta qo‘shilmaydi.')
    ]
  },
  {
    id: 'past-simple', subject: 'ingliz-tili', title: 'Past Simple', summary: 'O‘tgan zamonda tugallangan ishlar haqida gapiring.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Past Simple o‘tmishda boshlanib, tugagan harakatni ifodalaydi.',
      body: 'To‘g‘ri fe’llarga -ed qo‘shiladi: play → played, watch → watched. Noto‘g‘ri fe’llarning o‘tgan zamon shaklini yodlash kerak: go → went, see → saw, have → had. Inkor va savolda did ishlatiladi, undan keyin fe’l asosiy shaklda keladi: I didn’t go. Did you see it? Ko‘pincha yesterday, last week, ago so‘zlari bilan keladi.',
      example: 'Yesterday I visited my grandmother. We had lunch together. I didn’t watch TV. Did you go to school yesterday?'
    },
    cards: [
      ['play ning o‘tgan zamon shakli?', 'played.'],
      ['go ning o‘tgan zamon shakli?', 'went.'],
      ['Past Simple da savol qaysi so‘z bilan tuziladi?', 'Did.'],
      ['Did dan keyin fe’l qanday shaklda?', 'Asosiy shaklda: Did you go?']
    ],
    concepts: [
      ['togri-fel', 'To‘g‘ri fe’llar', 'To‘g‘ri fe’llar o‘tgan zamonda -ed oladi: work → worked, clean → cleaned.', '-ed — fe’lga taqilgan «o‘tmish yorlig‘i».', 'watch fe’lining o‘tgan zamon shaklini yozing.', 'watched', 'To‘g‘ri fe’l: watch + ed = watched.'],
      ['notogri-fel', 'Noto‘g‘ri fe’llar', 'Ba’zi fe’llar -ed olmaydi va shaklini o‘zgartiradi: go → went, eat → ate, see → saw. Ularni yodlash kerak.', 'Noto‘g‘ri fe’llar taxallusli do‘stlarga o‘xshaydi: ularning o‘tgan zamondagi ismini alohida eslab qolasiz.', 'see fe’lining o‘tgan zamon shaklini yozing.', 'saw', 'see → saw.'],
      ['did-savol', 'Did bilan savol va inkor', 'Savol va inkorda did ishlatiladi, asosiy fe’l esa oddiy shaklga qaytadi: She went → Did she go? She didn’t go.', 'Did o‘tmishni o‘ziga oladi, shuning uchun fe’l «yengil» — asosiy shaklda qoladi.', 'Did you ___ (buy) bread? Bo‘sh joyga so‘zni yozing.', 'buy', 'Did dan keyin asosiy shakl: buy.']
    ],
    questions: [
      q('pt1', 'togri-fel', 'Yesterday she ___ her room.', ['clean', 'cleans', 'cleaned', 'cleaning'], 2, 'clean — to‘g‘ri fe’l: cleaned.', 'Yesterday o‘tgan zamonni bildiradi, fe’lga -ed qo‘shing.'),
      q('pt2', 'notogri-fel', 'I ___ to the park last Sunday.', ['goed', 'went', 'go', 'gone'], 1, 'go — noto‘g‘ri fe’l, o‘tgan zamoni went.', 'go fe’liga -ed qo‘shilmaydi.'),
      q('pt3', 'did-savol', '___ you see the film yesterday?', ['Do', 'Does', 'Did', 'Were'], 2, 'O‘tgan zamonda savol Did bilan tuziladi.', 'Yesterday — o‘tmish belgisi, Do/Does esa hozirgi zamon uchun.'),
      q('pt4', 'did-savol', 'He didn’t ___ his homework.', ['did', 'does', 'do', 'done'], 2, 'didn’t dan keyin fe’l asosiy shaklda: do.', 'O‘tmish didn’t da ifodalangan, fe’lni o‘zgartirmang.'),
      q('pt5', 'notogri-fel', 'Qaysi fe’l noto‘g‘ri fe’l?', ['play', 'watch', 'eat', 'clean'], 2, 'eat → ate: -ed olmaydi.', 'play, watch, clean -ed oladi — ular to‘g‘ri fe’llar.')
    ]
  },
  {
    id: 'ot-rodi', subject: 'rus-tili', title: 'Otlarning rodi', summary: 'Rus tilida otning rodini oxirgi harfiga qarab aniqlang.', grade: 6, minutes: 12,
    lesson: {
      intro: 'Rus tilida har bir ot uchta roddan biriga tegishli: erkak, ayol yoki o‘rta rod.',
      body: 'Erkak rodidagi otlar odatda undosh yoki -й bilan tugaydi: стол, дом, музей. Ayol rodidagi otlar ko‘pincha -а yoki -я bilan tugaydi: книга, земля. O‘rta roddagi otlar -о yoki -е bilan tugaydi: окно, море. Rodni tekshirish uchun он, она, оно olmoshlarini qo‘yib ko‘rish mumkin: стол — он, книга — она, окно — оно.',
      example: 'Мой дом (он) — erkak rod. Моя книга (она) — ayol rod. Моё окно (оно) — o‘rta rod.'
    },
    cards: [
      ['стол qaysi rodda?', 'Erkak rodida (он).'],
      ['книга qaysi rodda?', 'Ayol rodida (она).'],
      ['окно qaysi rodda?', 'O‘rta rodda (оно).'],
      ['O‘rta rod otlari qaysi harflar bilan tugaydi?', '-о yoki -е.']
    ],
    concepts: [
      ['erkak-rod', 'Erkak rodi', 'Undosh yoki -й bilan tugagan otlar ko‘pincha erkak rodida bo‘ladi va он bilan almashtiriladi: стол, чай, город.', 'Erkak rodi otlari «qattiq» tugaydi — oxirida unli yo‘q.', 'дом so‘ziga qaysi olmosh mos keladi? (он/она/оно)', 'он', 'дом undosh bilan tugaydi — он.'],
      ['ayol-rod', 'Ayol rodi', '-а yoki -я bilan tugagan otlar ko‘pincha ayol rodida bo‘ladi va она bilan almashtiriladi: мама, школа, неделя.', '-а va -я — ayol rodining eng ko‘p uchraydigan «imzosi».', 'школа so‘ziga qaysi olmosh mos keladi? (он/она/оно)', 'она', 'школа -а bilan tugaydi — она.'],
      ['orta-rod', 'O‘rta rod', '-о yoki -е bilan tugagan otlar o‘rta rodda bo‘ladi va оно bilan almashtiriladi: молоко, солнце, поле.', 'O‘rta rod na erkak, na ayol: «оно» — neytral tanlov.', 'море so‘ziga qaysi olmosh mos keladi? (он/она/оно)', 'оно', 'море -е bilan tugaydi — оно.']
    ],
    questions: [
      q('rd1', 'erkak-rod', 'Qaysi ot erkak rodida?', ['книга', 'окно', 'город', 'земля'], 2, 'город undosh bilan tugaydi — он.', 'книга, земля — ayol rodi; окно — o‘rta rod.'),
      q('rd2', 'ayol-rod', '«неделя» so‘zi qaysi rodda?', ['Erkak', 'Ayol', 'O‘rta', 'Rodsiz'], 1, '-я bilan tugaydi — она, ayol rodi.', '-я oxiri ko‘pincha ayol rodini bildiradi.'),
      q('rd3', 'orta-rod', 'Qaysi ot o‘rta rodda?', ['солнце', 'стол', 'мама', 'музей'], 0, 'солнце -е bilan tugaydi — оно.', 'стол, музей — erkak; мама — ayol rodi.'),
      q('rd4', 'orta-rod', '«молоко» so‘ziga qaysi olmosh mos keladi?', ['он', 'она', 'оно', 'они'], 2, '-о bilan tugagan ot — оно.', 'они ko‘plik uchun; молоко esa birlikdagi o‘rta rod oti.'),
      q('rd5', 'erkak-rod', '«чай» so‘zi qaysi rodda?', ['Erkak', 'Ayol', 'O‘rta', 'Ko‘plik'], 0, '-й bilan tugagan ot erkak rodida: он.', '-й unli emas; bunday otlar erkak rodiga kiradi.')
    ]
  },
  {
    id: 'kelishiklar', subject: 'rus-tili', title: 'Kelishiklar asoslari', summary: 'Rus tilidagi oltita kelishik va ularning savollarini o‘rganing.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Rus tilida otlar gapdagi vazifasiga qarab kelishiklarda o‘zgaradi.',
      body: 'Rus tilida oltita kelishik bor: именительный (кто? что?), родительный (кого? чего?), дательный (кому? чему?), винительный (кого? что?), творительный (кем? чем?), предложный (о ком? о чём?). Kelishikni aniqlash uchun otga savol beriladi. Masalan, «Я пишу ручкой» gapida «чем?» savoli — творительный падеж.',
      example: 'Это книга (что? — именительный). У меня нет книги (чего? — родительный). Я читаю о книге (о чём? — предложный).'
    },
    cards: [
      ['Rus tilida nechta kelishik bor?', 'Oltita.'],
      ['Именительный падеж savollari?', 'кто? что?'],
      ['Творительный падеж savollari?', 'кем? чем?'],
      ['«о ком? о чём?» qaysi kelishik?', 'Предложный падеж.']
    ],
    concepts: [
      ['kelishik-soni', 'Kelishiklar tizimi', 'Rus tilida oltita kelishik bor va har birining o‘z savollari bor. Ot gapdagi vazifasiga ko‘ra qo‘shimchasini o‘zgartiradi.', 'Kelishiklar — so‘zning turli «kiyimlari»: vaziyatga qarab ot boshqa qo‘shimcha kiyadi.', 'Rus tilida nechta kelishik bor? Raqam bilan yozing.', '6', 'Rus tilida 6 ta kelishik bor.'],
      ['kelishik-savol', 'Savol orqali aniqlash', 'Kelishikni aniqlash uchun otga savol beriladi: кем? чем? — творительный, кому? чему? — дательный.', 'Savol — bu kelishikni ochadigan kalit.', '«чем?» savoli qaysi kelishikka tegishli? (rus tilida yozing)', 'творительный', 'чем? — творительный падеж.'],
      ['bosh-kelishik', 'Именительный падеж', 'Именительный падеж — otning lug‘atdagi boshlang‘ich shakli. U кто? что? savollariga javob beradi va ko‘pincha gapda ega bo‘ladi.', 'Bosh kelishik — so‘zning «pasportdagi» rasmiy ismi.', '«кто? что?» savollari qaysi kelishikka tegishli? (rus tilida yozing)', 'именительный', 'кто? что? — именительный падеж.']
    ],
    questions: [
      q('kl1', 'kelishik-soni', 'Rus tilida nechta kelishik bor?', ['4', '5', '6', '7'], 2, 'Rus tilida oltita kelishik bor.', 'Sanab chiqing: им., род., дат., вин., твор., предл. — jami oltita.'),
      q('kl2', 'kelishik-savol', '«Я пишу ручкой.» gapida «ручкой» qaysi kelishikda?', ['Именительный', 'Дательный', 'Творительный', 'Предложный'], 2, 'Пишу чем? — ручкой: творительный.', 'Otga savol bering: «чем?» savoli творительный ga tegishli.'),
      q('kl3', 'bosh-kelishik', 'Otning lug‘atdagi boshlang‘ich shakli qaysi kelishikda?', ['Родительный', 'Именительный', 'Винительный', 'Дательный'], 1, 'Lug‘atda otlar именительный padejida beriladi.', 'Boshlang‘ich shakl кто? что? savollariga javob beradi.'),
      q('kl4', 'kelishik-savol', '«кому? чему?» savollari qaysi kelishikka tegishli?', ['Дательный', 'Родительный', 'Предложный', 'Творительный'], 0, 'кому? чему? — дательный падеж.', 'Родительный — кого? чего?, предложный — о ком? о чём?'),
      q('kl5', 'kelishik-savol', '«Я думаю о маме.» gapida «о маме» qaysi kelishikda?', ['Винительный', 'Творительный', 'Предложный', 'Именительный'], 2, 'Думаю о ком? — о маме: предложный.', '«о» predlogi va «о ком?» savoli предложный padejini ko‘rsatadi.')
    ]
  }
];
module.exports = { subjects, topics };
