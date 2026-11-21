// Fizika: boshlang‘ich mexanika va moddaning molekulyar tuzilishi.
const q = (id, concept, prompt, choices, answer, correctNote, wrongNote) => ({ id, concept, prompt, choices, answer, correctNote, wrongNote });

module.exports = [
  {
    id: 'massa-zichlik', subject: 'fizika', title: 'Massa va zichlik', summary: 'Massa, hajm va zichlik orasidagi bog‘lanishni hisoblang.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Massa jismdagi modda miqdorini ifodalaydi; zichlik esa birlik hajmga to‘g‘ri keladigan massani ko‘rsatadi.',
      body: 'Massa m harfi bilan belgilanadi va kilogrammda (kg) o‘lchanadi. Hajm V jism egallagan joyni bildiradi va kub metrda (m³) o‘lchanishi mumkin. Zichlik ρ = m / V formula bilan topiladi; uning XBT dagi birligi kg/m³. Bir xil hajmdagi jismlarning massasi turlicha bo‘lishi mumkin, chunki moddalarning zichligi farq qiladi. Massani topish uchun m = ρ · V, hajmni topish uchun V = m / ρ formulalaridan foydalaniladi.',
      example: 'Massasi 6 kg, hajmi 2 m³ bo‘lgan jismning zichligi ρ = 6 / 2 = 3 kg/m³.'
    },
    cards: [
      ['Massa qaysi harf bilan belgilanadi?', 'm harfi bilan.'],
      ['Zichlik formulasi qanday?', 'ρ = m / V.'],
      ['Zichlikning XBT birligi qaysi?', 'kg/m³.'],
      ['Massani zichlik va hajmdan qanday topamiz?', 'm = ρ · V.']
    ],
    concepts: [
      ['fz-massa-hajm', 'Massa va hajm', 'Massa jismdagi modda miqdorini, hajm esa u egallagan joyni ifodalaydi. Massa kg, hajm m³ bilan o‘lchanadi.', 'Bir xil hajmdagi yog‘och va temir bo‘laklarining massasi bir xil bo‘lishi shart emas.', 'Massaning XBT birligi nima?', 'kilogramm', 'Massa kilogrammda (kg) o‘lchanadi.'],
      ['fz-zichlik-formula', 'Zichlik formulasi', 'Zichlik massaning hajmga nisbatidir: ρ = m / V. Massa bir xil bo‘lsa, hajm kamayganda zichlik ortadi.', 'Bir xil o‘lchamdagi ikki qutidan og‘irrog‘i zichroq modda bilan to‘ldirilgan bo‘lishi mumkin.', '4 kg massa va 2 m³ hajmda zichlik qancha kg/m³?', '2', 'ρ = 4 / 2 = 2 kg/m³.'],
      ['fz-zichlik-birlik', 'Zichlik birligi', 'Massa kg va hajm m³ da berilsa, zichlik kg/m³ da chiqadi. Hisobdan oldin birliklarni moslang.', 'Kilogrammni kub metrga bo‘lsangiz, birlik ham kg/m³ bo‘ladi.', 'Zichlikning XBT birligini yozing.', 'kg/m³', 'Zichlikning XBT birligi kg/m³.']
    ],
    questions: [
      q('mz1', 'fz-zichlik-formula', 'Massasi 12 kg, hajmi 3 m³ bo‘lgan jismning zichligi qancha?', ['4 kg/m³', '9 kg/m³', '15 kg/m³', '36 kg/m³'], 0, 'ρ = 12 / 3 = 4 kg/m³.', 'Zichlikni topish uchun massani hajmga bo‘ling.'),
      q('mz2', 'fz-massa-hajm', 'Massa qaysi birlikda o‘lchanadi?', ['Paskal', 'Sekund', 'Kilogramm', 'Metr'], 2, 'Massaning XBT birligi kilogramm.', 'Paskal bosim, metr uzunlik birligidir.'),
      q('mz3', 'fz-zichlik-birlik', 'Zichlikning XBT birligi qaysi?', ['kg/m³', 'm/s', 'N', 'm³/kg'], 0, 'Zichlik massa taqsim hajm: kg/m³.', 'm/s tezlik, N esa kuch birligidir.'),
      q('mz4', 'fz-zichlik-formula', 'Zichlik 5 kg/m³ va hajm 2 m³ bo‘lsa, massa qancha?', ['2,5 kg', '7 kg', '10 kg', '25 kg'], 2, 'm = ρ · V = 5 · 2 = 10 kg.', 'Massani topish uchun zichlik va hajmni ko‘paytiring.'),
      q('mz5', 'fz-massa-hajm', 'Hajm nimani bildiradi?', ['Jism egallagan joyni', 'Harakat vaqtini', 'Jismning tezligini', 'Ta’sir etuvchi kuchni'], 0, 'Hajm jism egallagan fazoni bildiradi.', 'Tezlik va kuch boshqa fizik kattaliklardir.')
    ]
  },
  {
    id: 'bosim', subject: 'fizika', title: 'Bosim', summary: 'Kuch va sirt yuzasi bosimga qanday ta’sir qilishini tushuning.', grade: 7, minutes: 13,
    lesson: {
      intro: 'Bosim sirtning birlik yuzasiga tik yo‘nalishda ta’sir qiluvchi kuchni ko‘rsatadi.',
      body: 'Bosim p = F / S formula bilan topiladi. Bu yerda F — sirtga tik ta’sir qiluvchi kuch (N), S — ta’sir yuzasi (m²). Bosimning XBT birligi paskal (Pa): 1 Pa = 1 N/m². Bir xil kuch kichikroq yuzaga ta’sir qilsa, bosim kattaroq bo‘ladi. Suyuqlik va gazlar ham bosim hosil qiladi; tinch suyuqlikda chuqurlik ortgan sari bosim ortadi.',
      example: '20 N kuch 4 m² yuzaga bir tekis ta’sir qilsa, bosim p = 20 / 4 = 5 Pa. O‘tkir pichoqning kichik tegish yuzasi bosimni oshiradi.'
    },
    cards: [
      ['Bosim formulasi qanday?', 'p = F / S.'],
      ['Bosimning XBT birligi qaysi?', 'Paskal (Pa).'],
      ['Yuza kamayib, kuch o‘zgarmasa bosim nima bo‘ladi?', 'Ortadi.'],
      ['Suyuqlikda chuqurlik ortsa bosim qanday o‘zgaradi?', 'Ortadi.']
    ],
    concepts: [
      ['fz-bosim-formula', 'Bosimni hisoblash', 'Sirtga tik ta’sir qiluvchi kuchni yuzaga bo‘ling: p = F / S. Natija N/m² yoki Pa bo‘ladi.', 'Bir xil og‘irlikdagi odam muzga chang‘ida turganda bosim kichikroq yuzali poyabzaldagidan kamroq bo‘ladi.', '10 N kuch 2 m² yuzaga ta’sir qilsa, bosim necha Pa?', '5', '10 / 2 = 5 Pa.'],
      ['fz-bosim-yuza', 'Yuzaning ta’siri', 'Kuch o‘zgarmasa, ta’sir yuzasi kichrayishi bosimni oshiradi; yuza kattalashishi bosimni kamaytiradi.', 'O‘tkir igna uchining yuzasi juda kichik, shuning uchun bosim katta bo‘ladi.', 'Bir xil kuchda yuza ikki marta oshsa, bosim nima bo‘ladi?', 'kamayadi', 'Bosim yuzaga teskari bog‘liq.'],
      ['fz-suyuqlik-bosim', 'Suyuqlik bosimi', 'Tinch suyuqlikda chuqurlik ortgan sari ustidagi suyuqlik qatlami ko‘payadi va bosim ortadi.', 'Suv havzasining tubida yuqoridagiga qaraganda ko‘proq suv qatlami bor.', 'Suvda chuqurroq tushganda bosim ortadimi?', 'ha', 'Chuqurlik ortishi bilan suyuqlik bosimi ortadi.']
    ],
    questions: [
      q('bs1', 'fz-bosim-formula', '30 N kuch 5 m² yuzaga ta’sir qilsa, bosim qancha?', ['6 Pa', '25 Pa', '35 Pa', '150 Pa'], 0, 'p = 30 / 5 = 6 Pa.', 'Bosim kuchni yuzaga bo‘lish orqali topiladi.'),
      q('bs2', 'fz-bosim-yuza', 'Kuch o‘zgarmay sirt yuzasi kamaytirilsa, bosim qanday o‘zgaradi?', ['Kamayadi', 'O‘zgarmaydi', 'Ortadi', 'Nol bo‘ladi'], 2, 'Yuza kichrayganda bosim ortadi.', 'p = F / S: maxraj kichrayganda natija kattalashadi.'),
      q('bs3', 'fz-bosim-formula', 'Bosimning XBT birligi qaysi?', ['Nyuton', 'Paskal', 'Kilogramm', 'Volt'], 1, 'Bosim paskalda (Pa) o‘lchanadi.', 'Nyuton kuch, volt kuchlanish birligidir.'),
      q('bs4', 'fz-suyuqlik-bosim', 'Tinch suvda chuqurlik oshsa, bosim qanday o‘zgaradi?', ['Kamayadi', 'O‘zgarmaydi', 'Ortadi', 'Faqat haroratga bog‘liq'], 2, 'Chuqurlik oshganda suyuqlik bosimi ortadi.', 'Chuqurroq joyning ustida ko‘proq suv qatlami bo‘ladi.'),
      q('bs5', 'fz-bosim-yuza', 'Nima uchun o‘tkir igna matoga osonroq kiradi?', ['Kuchi yo‘qligi uchun', 'Uchi yuzasi kichik bo‘lib bosimni oshirgani uchun', 'Massasi katta bo‘lgani uchun', 'Harorati yuqori bo‘lgani uchun'], 1, 'Kichik tegish yuzasi bir xil kuchda kattaroq bosim hosil qiladi.', 'Bosim faqat massa bilan belgilanmaydi; ta’sir yuzasi ham muhim.')
    ]
  },
  {
    id: 'nyuton-qonunlari', subject: 'fizika', title: 'Nyuton qonunlari', summary: 'Kuch va harakat orasidagi uchta asosiy qonunni ajrating.', grade: 8, minutes: 15,
    lesson: {
      intro: 'Nyuton qonunlari kuchlar jism harakatiga qanday ta’sir qilishini tushuntiradi.',
      body: 'Birinchi qonun — inersiya: natijaviy kuch nol bo‘lsa, jism tinch turadi yoki to‘g‘ri chiziqli tekis harakatini davom ettiradi. Ikkinchi qonun: natijaviy kuch jismga tezlanish beradi, F = m · a. Bir xil massada kuch ortsa tezlanish ham ortadi. Uchinchi qonun: o‘zaro ta’sirlashayotgan jismlar bir-biriga moduli teng, yo‘nalishi qarama-qarshi kuch bilan ta’sir qiladi. Bu ikki kuch turli jismlarga ta’sir qilgani uchun bir-birini bekor qilmaydi.',
      example: 'Massasi 2 kg bo‘lgan aravachaga 6 N natijaviy kuch ta’sir qilsa, tezlanish a = F / m = 3 m/s² bo‘ladi.'
    },
    cards: [
      ['Nyutonning birinchi qonuni nimani tushuntiradi?', 'Inersiyani.'],
      ['Ikkinchi qonun formulasi qanday?', 'F = m · a.'],
      ['Natijaviy kuch nol bo‘lsa jism nima qiladi?', 'Tinch turadi yoki to‘g‘ri chiziqli tekis harakat qiladi.'],
      ['Uchinchi qonunda kuchlar qanday?', 'Moduli teng, yo‘nalishi qarama-qarshi va turli jismlarga ta’sir qiladi.']
    ],
    concepts: [
      ['fz-inersiya', 'Birinchi qonun: inersiya', 'Natijaviy kuch nol bo‘lsa, jism tezligini o‘zgartirmaydi: tinch turadi yoki to‘g‘ri chiziqli tekis harakat qiladi.', 'Avtobus to‘xtaganda yo‘lovchining oldinga intilishi inersiyaga misol.', 'Natijaviy kuch nol bo‘lsa, tezlik o‘zgaradimi?', 'yo‘q', 'Natijaviy kuch nol bo‘lsa, tezlik o‘zgarmaydi.'],
      ['fz-ikkinchi-qonun', 'Ikkinchi qonun: F = m · a', 'Tezlanish natijaviy kuchga to‘g‘ri, massaga teskari proporsional. a = F / m.', 'Bir xil kuch yengil aravachani og‘ir aravachaga qaraganda tezroq tezlatadi.', '4 N kuch 2 kg jismga qanday tezlanish beradi (m/s²)?', '2', 'a = 4 / 2 = 2 m/s².'],
      ['fz-uchinchi-qonun', 'Uchinchi qonun: o‘zaro ta’sir', 'Jismlar bir-biriga moduli teng va qarama-qarshi yo‘nalgan kuch bilan ta’sir qiladi. Kuchlar turli jismlarga qo‘yiladi.', 'Yurganda oyoq yerni orqaga itaradi, yer esa oyoqni oldinga itaradi.', 'Uchinchi qonundagi kuchlar bitta jismgami yoki turli jismlargami ta’sir qiladi?', 'turli', 'O‘zaro ta’sir kuchlari turli jismlarga ta’sir qiladi.']
    ],
    questions: [
      q('ny1', 'fz-inersiya', 'Natijaviy kuch nol bo‘lsa, harakatlanayotgan jism qanday harakat qiladi?', ['Darhol to‘xtaydi', 'To‘g‘ri chiziqli tekis harakat qiladi', 'Tezlanadi', 'Aylanadi'], 1, 'Birinchi qonunga ko‘ra tezlik o‘zgarmaydi.', 'Kuch bo‘lmasa tezlik o‘z-o‘zidan o‘zgarmaydi.'),
      q('ny2', 'fz-ikkinchi-qonun', 'Massasi 3 kg jismga 12 N natijaviy kuch ta’sir qilsa, tezlanish qancha?', ['3 m/s²', '4 m/s²', '9 m/s²', '36 m/s²'], 1, 'a = F / m = 12 / 3 = 4 m/s².', 'Tezlanish uchun kuchni massaga bo‘ling.'),
      q('ny3', 'fz-ikkinchi-qonun', 'Nyutonning ikkinchi qonuni qaysi formula bilan ifodalanadi?', ['p = F / S', 'v = s / t', 'F = m · a', 'ρ = m / V'], 2, 'Ikkinchi qonun: F = m · a.', 'Boshqa formulalar bosim, tezlik va zichlikka tegishli.'),
      q('ny4', 'fz-uchinchi-qonun', 'Ta’sir va aks ta’sir kuchlari qanday bo‘ladi?', ['Bir yo‘nalishda va teng', 'Qarama-qarshi yo‘nalishda va moduli teng', 'Faqat bitta jismga ta’sir qiladi', 'Har doim nolga teng'], 1, 'Ular moduli teng, yo‘nalishi qarama-qarshi.', 'Bu kuchlar turli jismlarga ta’sir qiladi.'),
      q('ny5', 'fz-inersiya', 'Avtobus keskin to‘xtaganda yo‘lovchining oldinga intilishi nimaga misol?', ['Bosimga', 'Zichlikka', 'Inersiyaga', 'Bug‘lanishga'], 2, 'Jism oldingi harakat holatini saqlashga intiladi.', 'Bu hodisa birinchi qonun bilan tushuntiriladi.')
    ]
  },
  {
    id: 'ishqalanish-kuchi', subject: 'fizika', title: 'Ishqalanish kuchi', summary: 'Ishqalanish harakatga qanday qarshilik qilishini biling.', grade: 7, minutes: 13,
    lesson: {
      intro: 'Ishqalanish kuchi tegib turgan jismlarning bir-biriga nisbatan siljishiga qarshilik qiladi.',
      body: 'Sirtlarning notekisligi va ular orasidagi o‘zaro ta’sir ishqalanish paydo bo‘lishiga sabab bo‘ladi. Sirpanish ishqalanishi jism sirt bo‘ylab sirpanganda, dumalash ishqalanishi g‘ildirak dumalaganda yuz beradi. Tinchlik ishqalanishi esa jismni sirpanib ketishdan saqlashi mumkin. Ishqalanish har doim zararli emas: yurish, yozish va avtomobilning tormozlanishida kerak. Moylash yoki g‘ildirakdan foydalanish ayrim holatlarda ishqalanishni kamaytiradi.',
      example: 'Muzli yo‘lda ishqalanish kamligi sababli yurish qiyinlashadi. Poyabzal tagidagi naqsh sirt bilan ilashishni oshiradi.'
    },
    cards: [
      ['Ishqalanish kuchi nimaga qarshilik qiladi?', 'Sirtlarning nisbiy siljishiga.'],
      ['G‘ildirak harakatida qaysi ishqalanish bor?', 'Dumalash ishqalanishi.'],
      ['Yurishda ishqalanish foydalimi?', 'Ha, sirpanmasdan qadam tashlashga yordam beradi.'],
      ['Ishqalanishni kamaytirishning bir usuli?', 'Moylash yoki g‘ildirakdan foydalanish.']
    ],
    concepts: [
      ['fz-ishqalanish-yonalish', 'Ishqalanish yo‘nalishi', 'Ishqalanish tegib turgan sirtlarning nisbiy siljishiga yoki siljishga intilishiga qarshi yo‘naladi.', 'Stol ustida o‘ngga surilayotgan kitobga ishqalanish chapga ta’sir qiladi.', 'Kitob o‘ngga sirpansa, ishqalanish qaysi tomonga yo‘naladi?', 'chapga', 'Sirpanishga qarshi: chapga.'],
      ['fz-ishqalanish-tur', 'Ishqalanish turlari', 'Tinchlik, sirpanish va dumalash ishqalanishi farqlanadi. G‘ildirak aylanganda dumalash ishqalanishi kuzatiladi.', 'Chamadan g‘ildiragi uni yer bo‘ylab sudragandan ko‘ra osonroq yurishga yordam beradi.', 'G‘ildirakda qaysi ishqalanish turi yuz beradi?', 'dumalash', 'G‘ildirak dumalaganda dumalash ishqalanishi bo‘ladi.'],
      ['fz-ishqalanish-foyda', 'Foydali va zararli ishqalanish', 'Ishqalanish yurish va tormozlashda foydali, mexanizmlarda esa qizish va yeyilishga sabab bo‘lishi mumkin. Moylash uni kamaytiradi.', 'Tormozda ishqalanish kerak, podshipnikda esa uni kamaytirishga intilamiz.', 'Moylash ishqalanishni oshiradimi yoki kamaytiradimi?', 'kamaytiradi', 'Moylash odatda ishqalanishni kamaytiradi.']
    ],
    questions: [
      q('ish1', 'fz-ishqalanish-yonalish', 'Sirpanayotgan jismga ishqalanish kuchi qaysi tomonga yo‘naladi?', ['Siljishiga qarshi', 'Siljish yo‘nalishida', 'Doim yuqoriga', 'Doim pastga'], 0, 'Ishqalanish nisbiy sirpanishga qarshi yo‘naladi.', 'Uning yo‘nalishi harakat holatiga bog‘liq.'),
      q('ish2', 'fz-ishqalanish-tur', 'G‘ildirak aylanganda qaysi ishqalanish turi kuzatiladi?', ['Tinchlik xolos', 'Dumalash', 'Faqat suyuqlik', 'Hech qanday'], 1, 'G‘ildirak dumalaganda dumalash ishqalanishi bo‘ladi.', 'Ishqalanish turi sirtlar qanday harakatlanishiga bog‘liq.'),
      q('ish3', 'fz-ishqalanish-foyda', 'Qaysi holatda ishqalanish foyda keltiradi?', ['Yurishda sirpanmaslikda', 'Mexanizm qismlarini yeyishda', 'Keraksiz qizishda', 'Harakatni doim to‘xtatishda'], 0, 'Yurishda ishqalanish oyoqning sirpanishini kamaytiradi.', 'Ishqalanish ham foydali, ham zararli bo‘lishi mumkin.'),
      q('ish4', 'fz-ishqalanish-foyda', 'Mexanizmdagi ishqalanishni kamaytirish uchun nima ishlatiladi?', ['Qum sepish', 'Moylash', 'Sirtni qo‘pol qilish', 'Bosimni oshirish'], 1, 'Moylash sirtlar orasidagi ishqalanishni kamaytiradi.', 'Qum va qo‘pol sirt ko‘pincha ilashishni oshiradi.'),
      q('ish5', 'fz-ishqalanish-yonalish', 'Kitob stol ustida o‘ngga sirpansa, ishqalanish qayerga yo‘naladi?', ['O‘ngga', 'Chapga', 'Yuqoriga', 'Pastga'], 1, 'Ishqalanish nisbiy sirpanishga qarshi, chapga yo‘naladi.', 'Sirpanish yo‘nalishining teskarisini tanlang.')
    ]
  },
  {
    id: 'moddaning-molekulyar-holati', subject: 'fizika', title: 'Moddaning molekulyar holati', summary: 'Qattiq, suyuq va gaz holatlarda zarrachalar qanday joylashishini biling.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Moddalar mayda zarrachalardan tashkil topgan; zarrachalar doim harakatda bo‘ladi.',
      body: 'Qattiq jismda zarrachalar bir-biriga yaqin joylashib, asosan o‘z o‘rni atrofida tebranadi; jism shakli va hajmini saqlaydi. Suyuqlikda zarrachalar yaqin bo‘lsa ham bir-biri yonidan siljiy oladi: suyuqlik hajmini saqlaydi, idish shaklini oladi. Gazda zarrachalar bir-biridan uzoqroq va erkin harakat qiladi, gaz idish hajmini to‘ldiradi. Qizdirish zarrachalar harakatini kuchaytirishi mumkin. Erish qattiqdan suyuqqa, bug‘lanish suyuqdan gazga, kondensatsiya gazdan suyuqqa o‘tishdir.',
      example: 'Muz erib suvga aylanadi, suv bug‘lanib gaz holatiga o‘tadi. Sovuq oynadagi suv tomchilari bug‘ning kondensatsiyalanishidan hosil bo‘ladi.'
    },
    cards: [
      ['Qattiq jismda zarrachalar qanday harakat qiladi?', 'Asosan o‘z o‘rni atrofida tebranadi.'],
      ['Suyuqlik shaklini saqlaydimi?', 'Yo‘q, idish shaklini oladi; hajmini saqlaydi.'],
      ['Bug‘lanish qaysi holatlar orasidagi o‘tish?', 'Suyuqlikdan gazga.'],
      ['Kondensatsiya nima?', 'Gazning suyuqlikka aylanishi.']
    ],
    concepts: [
      ['fz-qattiq-holat', 'Qattiq holat', 'Qattiq jism zarrachalari yaqin joylashadi va o‘rinlari atrofida tebranadi. Shakli ham, hajmi ham saqlanadi.', 'Bir joyda turgan, ammo qimirlab turgan odamlar qatoriga o‘xshatish mumkin.', 'Qattiq jism shaklini saqlaydimi?', 'ha', 'Qattiq jism shakli va hajmini saqlaydi.'],
      ['fz-suyuq-gaz', 'Suyuq va gaz holatlar', 'Suyuqlik hajmini saqlab idish shaklini oladi. Gaz esa butun idish hajmiga tarqaladi.', 'Suv stakan shaklini oladi, havo esa stakanning barcha bo‘sh joyiga tarqaladi.', 'Qaysi holat idishning butun hajmini to‘ldiradi?', 'gaz', 'Gaz zarrachalari butun idishga tarqaladi.'],
      ['fz-holat-ozgarish', 'Holat o‘zgarishlari', 'Erish: qattiq → suyuq. Bug‘lanish: suyuq → gaz. Kondensatsiya: gaz → suyuq.', 'Muzning erishi va oynadagi suv tomchilari turli yo‘nalishdagi holat o‘zgarishlaridir.', 'Gaz suyuqlikka aylanishi nima deyiladi?', 'kondensatsiya', 'Gazdan suyuqlikka o‘tish kondensatsiya deyiladi.']
    ],
    questions: [
      q('mh1', 'fz-qattiq-holat', 'Qaysi holat shakli va hajmini saqlaydi?', ['Gaz', 'Suyuqlik', 'Qattiq jism', 'Bug‘'], 2, 'Qattiq jism shakli va hajmini saqlaydi.', 'Suyuqlik idish shaklini oladi, gaz esa butun idishga tarqaladi.'),
      q('mh2', 'fz-suyuq-gaz', 'Suyuqlik idishga quyilganda nima bo‘ladi?', ['Shakli o‘zgarmaydi', 'Idish shaklini oladi', 'Darhol gazga aylanadi', 'Hajmi har doim nol bo‘ladi'], 1, 'Suyuqlik hajmini saqlaydi, idish shaklini oladi.', 'Suyuqlik qattiq jism kabi o‘z shaklini saqlamaydi.'),
      q('mh3', 'fz-suyuq-gaz', 'Qaysi holat idishning barcha bo‘sh joyiga tarqaladi?', ['Qattiq', 'Suyuq', 'Gaz', 'Muz'], 2, 'Gaz zarrachalari erkin harakat qilib idish hajmini to‘ldiradi.', 'Suyuqlik idish tubida to‘planadi.'),
      q('mh4', 'fz-holat-ozgarish', 'Suyuqlikning gazga aylanishi nima deyiladi?', ['Erish', 'Qotish', 'Kondensatsiya', 'Bug‘lanish'], 3, 'Suyuqlikdan gazga o‘tish bug‘lanishdir.', 'Kondensatsiya teskari yo‘nalish: gazdan suyuqlikka.'),
      q('mh5', 'fz-holat-ozgarish', 'Gazning suyuqlikka aylanishi nima deyiladi?', ['Bug‘lanish', 'Kondensatsiya', 'Erish', 'Sublimatsiya'], 1, 'Gazdan suyuqlikka o‘tish kondensatsiya deyiladi.', 'Bug‘lanish suyuqlikdan gazga o‘tishdir.')
    ]
  }
];
