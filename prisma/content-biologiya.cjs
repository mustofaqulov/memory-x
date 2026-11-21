// Biologiya: hujayradan tirik organizmlar xilma-xilligigacha.
const q = (id, concept, prompt, choices, answer, correctNote, wrongNote) => ({ id, concept, prompt, choices, answer, correctNote, wrongNote });

module.exports = [
  {
    id: 'toqimalar', subject: 'biologiya', title: 'To‘qimalar', summary: 'Bir xil vazifani bajaradigan hujayralar qanday birlashishini biling.', grade: 7, minutes: 13,
    lesson: {
      intro: 'To‘qima — tuzilishi va vazifasi o‘xshash hujayralar hamda ular orasidagi moddalarning birligi.',
      body: 'Ko‘p hujayrali organizmda hujayralar birgalikda ishlaydi. Hayvonlarda epiteliy to‘qimasi tana yuzasi va organlar ichini qoplaydi, biriktiruvchi to‘qima tayanch va bog‘lash vazifasini bajaradi, muskul to‘qimasi qisqarib harakatni ta’minlaydi, nerv to‘qimasi esa signallarni uzatadi. O‘simliklarda qoplovchi to‘qima himoya qiladi, o‘tkazuvchi to‘qima suv va oziq moddalarni tashiydi, hosil qiluvchi to‘qima o‘sishni ta’minlaydi.',
      example: 'Yurakdagi muskul to‘qimasi qisqaradi. Daraxt poyasidagi o‘tkazuvchi to‘qima esa suvni ildizdan barglarga yetkazadi.'
    },
    cards: [
      ['To‘qima nima?', 'O‘xshash vazifani bajaradigan hujayralar va hujayralararo moddalarning birligi.'],
      ['Muskul to‘qimasining vazifasi nima?', 'Qisqarib harakatni ta’minlash.'],
      ['Nerv to‘qimasi nima qiladi?', 'Signallarni uzatadi.'],
      ['O‘simlikda suvni qaysi to‘qima tashiydi?', 'O‘tkazuvchi to‘qima.']
    ],
    concepts: [
      ['bio-toqima-tarif', 'Hujayradan to‘qimaga', 'O‘xshash tuzilgan va bir vazifada ishlaydigan hujayralar to‘qimani hosil qiladi. To‘qima hujayradan yuqori tuzilish darajasidir.', 'Bir g‘isht devor bo‘lmagani kabi, bir hujayra ham butun to‘qima emas.', 'O‘xshash hujayralar birlashib nimani hosil qiladi?', 'to‘qima', 'O‘xshash hujayralar birgalikda to‘qima hosil qiladi.'],
      ['bio-hayvon-toqima', 'Hayvon to‘qimalari', 'Epiteliy qoplaydi, biriktiruvchi to‘qima tayanch bo‘ladi, muskul qisqaradi, nerv esa signallarni uzatadi.', 'Jamoada har kimning vazifasi turlicha: himoya, tayanch, harakat va aloqa.', 'Qaysi to‘qima qisqarib harakatni ta’minlaydi?', 'muskul', 'Muskul to‘qimasi qisqaradi.'],
      ['bio-osimlik-toqima', 'O‘simlik to‘qimalari', 'Qoplovchi to‘qima himoya qiladi, o‘tkazuvchi to‘qima moddalarni tashiydi, hosil qiluvchi to‘qima o‘sishni ta’minlaydi.', 'O‘tkazuvchi to‘qimani o‘simlik ichidagi tashish yo‘liga o‘xshatish mumkin.', 'Ildizdan bargga suvni qaysi to‘qima yetkazadi?', 'o‘tkazuvchi', 'Suv o‘tkazuvchi to‘qima orqali ko‘tariladi.']
    ],
    questions: [
      q('tk1', 'bio-toqima-tarif', 'O‘xshash vazifali hujayralar birlashib nimani hosil qiladi?', ['Organlar sistemasini', 'To‘qimani', 'Butun organizmni', 'Populyatsiyani'], 1, 'Hujayralar birgalikda to‘qima hosil qiladi.', 'To‘qima bir nechta o‘xshash hujayradan tuziladi.'),
      q('tk2', 'bio-hayvon-toqima', 'Qaysi to‘qima qisqarish orqali harakatni ta’minlaydi?', ['Epiteliy', 'Nerv', 'Muskul', 'Qoplovchi'], 2, 'Muskul to‘qimasi qisqaradi.', 'Nerv to‘qimasi signal uzatadi, epiteliy esa yuzani qoplaydi.'),
      q('tk3', 'bio-hayvon-toqima', 'Tana yuzasini qaysi hayvon to‘qimasi qoplaydi?', ['Epiteliy', 'Muskul', 'Nerv', 'O‘tkazuvchi'], 0, 'Epiteliy tana yuzasi va organlar ichini qoplaydi.', 'O‘tkazuvchi to‘qima o‘simliklarga xos.'),
      q('tk4', 'bio-osimlik-toqima', 'O‘simlikda suvni tashishga qaysi to‘qima yordam beradi?', ['Muskul', 'O‘tkazuvchi', 'Nerv', 'Epiteliy'], 1, 'O‘tkazuvchi to‘qima suv va boshqa moddalarni tashiydi.', 'Muskul va nerv to‘qimalari hayvonlarga xos.'),
      q('tk5', 'bio-osimlik-toqima', 'O‘simlikda o‘sishga qaysi to‘qima xizmat qiladi?', ['Qoplovchi', 'Hosil qiluvchi', 'Nerv', 'Biriktiruvchi'], 1, 'Hosil qiluvchi to‘qima yangi hujayralar hosil qilib o‘sishni ta’minlaydi.', 'Qoplovchi to‘qimaning asosiy vazifasi himoya qilishdir.')
    ]
  },
  {
    id: 'organlar-sistemasi', subject: 'biologiya', title: 'Organlar va organlar sistemasi', summary: 'To‘qimalar organ, organlar esa sistema hosil qilishini tushuning.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Turli to‘qimalar birlashib ma’lum vazifani bajaradigan organni hosil qiladi.',
      body: 'Yurak, o‘pka va oshqozon hayvon organizmidagi organlardir. Yurak qon aylanish sistemasida qonni harakatlantiradi, o‘pka nafas olish sistemasida gaz almashinuviga yordam beradi. Bir vazifani birgalikda bajaradigan organlar organlar sistemasini hosil qiladi. O‘simlikda ildiz, poya va barg ham organlardir: ildiz suv oladi, poya uni tashiydi, bargda fotosintez boradi. Hujayra → to‘qima → organ → organlar sistemasi → organizm ketma-ketligi tuzilish darajalarini ko‘rsatadi.',
      example: 'Odam nafas olganda burun, nafas yo‘llari va o‘pka birgalikda ishlaydi. Ular nafas olish sistemasining qismlaridir.'
    },
    cards: [
      ['Organ nimadan tuziladi?', 'Birgalikda ishlaydigan turli to‘qimalardan.'],
      ['Organlar sistemasi nima?', 'Umumiy vazifani bajaradigan organlar guruhi.'],
      ['Yurak qaysi sistemaga kiradi?', 'Qon aylanish sistemasiga.'],
      ['O‘simlik organlariga misol keltiring.', 'Ildiz, poya va barg.']
    ],
    concepts: [
      ['bio-organ-daraja', 'Tuzilish darajalari', 'Ko‘p hujayrali organizmda hujayralar to‘qima, to‘qimalar organ, hamkor organlar sistema hosil qiladi.', 'G‘ishtlardan devor, devorlardan xona, xonalardan bino tuzilishiga o‘xshaydi.', 'To‘qimalardan keyingi tuzilish darajasi nima?', 'organ', 'Turli to‘qimalar organni tashkil etadi.'],
      ['bio-organ-sistema', 'Organlar hamkorligi', 'Qon aylanish sistemasida yurak va qon tomirlari birgalikda moddalarni tashiydi. Nafas olish sistemasida nafas yo‘llari va o‘pka ishlaydi.', 'Bir jamoa umumiy ishni bo‘lib bajargani kabi, organlar ham bir sistemada hamkorlik qiladi.', 'Yurak qaysi organlar sistemasiga kiradi?', 'qon aylanish', 'Yurak qon aylanish sistemasining asosiy organidir.'],
      ['bio-osimlik-organ', 'O‘simlik organlari', 'Ildiz suv va mineral moddalarni oladi, poya tashish va tayanch vazifasini bajaradi, barg fotosintez qiladi.', 'Ildiz olish, poya yetkazish, barg esa oziq hosil qilish bilan bog‘liq.', 'Suvni tuproqdan qaysi organ oladi?', 'ildiz', 'Suvni tuproqdan ildiz oladi.']
    ],
    questions: [
      q('og1', 'bio-organ-daraja', 'Bir necha turdagi to‘qima birlashib nimani hosil qiladi?', ['Hujayrani', 'Organni', 'Populyatsiyani', 'Molekulani'], 1, 'To‘qimalar birlashib organ hosil qiladi.', 'Organ hujayradan yuqoriroq tuzilish darajasidir.'),
      q('og2', 'bio-organ-sistema', 'Yurak va qon tomirlari qaysi sistemada hamkorlik qiladi?', ['Nafas olish', 'Hazm qilish', 'Qon aylanish', 'Ayirish'], 2, 'Yurak va qon tomirlari qon aylanish sistemasiga kiradi.', 'O‘pka nafas olish, oshqozon esa hazm qilish bilan bog‘liq.'),
      q('og3', 'bio-organ-sistema', 'O‘pka qaysi sistemaning organi?', ['Nafas olish', 'Qon aylanish', 'Tayanch-harakat', 'Hazm qilish'], 0, 'O‘pka nafas olish sistemasida gaz almashinuviga yordam beradi.', 'Yurak qon aylanish sistemasining organidir.'),
      q('og4', 'bio-osimlik-organ', 'O‘simlikda suvni tuproqdan qaysi organ oladi?', ['Barg', 'Gul', 'Poya', 'Ildiz'], 3, 'Ildiz tuproqdan suv va mineral moddalarni oladi.', 'Poya suvni tashiydi, bargda esa fotosintez boradi.'),
      q('og5', 'bio-organ-daraja', 'Qaysi ketma-ketlik kichikdan kattaga to‘g‘ri tuzilgan?', ['Organ → to‘qima → hujayra', 'Hujayra → to‘qima → organ', 'To‘qima → hujayra → organ', 'Organizm → organ → hujayra'], 1, 'Hujayralar to‘qima, to‘qimalar organ hosil qiladi.', 'Hujayra eng kichik darajadan boshlanadi.')
    ]
  },
  {
    id: 'mikroorganizmlar', subject: 'biologiya', title: 'Mikroorganizmlar', summary: 'Bakteriyalar, mikroskopik zamburug‘lar va viruslarni farqlang.', grade: 7, minutes: 13,
    lesson: {
      intro: 'Mikroorganizmlar — odatda oddiy ko‘z bilan ko‘rib bo‘lmaydigan mayda organizmlar.',
      body: 'Bakteriyalar bir hujayrali organizmlar bo‘lib, tayyor yadroga ega emas. Ularning ayrimlari tuproqda moddalarni parchalaydi yoki oziq tayyorlashda yordam beradi; ayrimlari kasallik keltirib chiqarishi mumkin. Achitqi kabi zamburug‘lar ham mikroskopik bo‘ladi va non xamirining ko‘tarilishida qatnashadi. Viruslar hujayradan tuzilmagan va faqat mezbon hujayra ichida ko‘paya oladi; shu bois ularni hujayrali mikroorganizmlardan alohida o‘rganamiz. Qo‘lni yuvish ko‘plab kasallik qo‘zg‘atuvchilarining tarqalishini kamaytiradi.',
      example: 'Qatiq tayyorlashda foydali bakteriyalar, non xamirida esa achitqi zamburug‘lari ishlatiladi.'
    },
    cards: [
      ['Bakteriya qanday tuzilgan?', 'Bir hujayrali va tayyor yadrosiz.'],
      ['Achitqi qaysi guruhga kiradi?', 'Zamburug‘larga.'],
      ['Virus qayerda ko‘payadi?', 'Faqat mezbon hujayra ichida.'],
      ['Foydali bakteriyaga misol?', 'Qatiq tayyorlashda qatnashadigan bakteriyalar.']
    ],
    concepts: [
      ['bio-bakteriya', 'Bakteriyalar', 'Bakteriyalar bir hujayrali, tayyor yadrosiz organizmlar. Ular orasida foydali va kasallik keltiruvchi turlar bor.', 'Qatiq tayyorlashdagi bakteriyalar foydali ishlashiga misol bo‘ladi.', 'Bakteriya necha hujayrali?', 'bir', 'Bakteriya bir hujayrali organizmdir.'],
      ['bio-achitqi', 'Mikroskopik zamburug‘lar', 'Achitqi zamburug‘i non xamirida shakarni parchalaydi; ajralgan gaz xamirni ko‘taradi.', 'Xamir ichidagi mayda pufakchalar ko‘tarilishga yordam beradi.', 'Non xamirini ko‘tarishda qaysi zamburug‘ ishlatiladi?', 'achitqi', 'Non tayyorlashda achitqi ishlatiladi.'],
      ['bio-virus', 'Viruslarning farqi', 'Viruslar hujayrali tuzilishga ega emas va faqat mezbon hujayra ichida ko‘payadi. Bakteriyalar esa mustaqil hujayralardir.', 'Virus ko‘payish uchun boshqa hujayraning imkoniyatlaridan foydalanadi.', 'Virus qayerda ko‘paya oladi?', 'hujayra ichida', 'Virus faqat mezbon hujayra ichida ko‘payadi.']
    ],
    questions: [
      q('mk1', 'bio-bakteriya', 'Bakteriya necha hujayradan tuzilgan?', ['Bir', 'Ikki', 'Ming', 'Hujayrasi yo‘q'], 0, 'Bakteriyalar bir hujayrali organizmlardir.', 'Hujayrasi yo‘q tuzilma — virusga xos.'),
      q('mk2', 'bio-achitqi', 'Non xamirini ko‘tarishda nima ishlatiladi?', ['Virus', 'Achitqi zamburug‘i', 'Mox', 'Paporotnik'], 1, 'Achitqi zamburug‘i xamirda gaz hosil bo‘lishiga yordam beradi.', 'Mox va paporotnik o‘simliklar guruhiga kiradi.'),
      q('mk3', 'bio-virus', 'Virus qayerda ko‘paya oladi?', ['Faqat suvda', 'Tuproqda mustaqil', 'Mezbon hujayra ichida', 'Quruq havoda'], 2, 'Virus ko‘payishi uchun mezbon hujayra kerak.', 'Virus mustaqil hujayra emas.'),
      q('mk4', 'bio-bakteriya', 'Qaysi holatda bakteriyalar foyda keltiradi?', ['Qatiq tayyorlashda', 'Har doim kasallik tarqatganda', 'Faqat virus bilan birga', 'Faqat havoda uchganda'], 0, 'Ba’zi bakteriyalar qatiq tayyorlashda ishlatiladi.', 'Barcha bakteriyalar zararli emas.'),
      q('mk5', 'bio-virus', 'Bakteriya va virus orasidagi asosiy farq qaysi?', ['Ikkalasi ham bir hujayrali', 'Virus hujayrali, bakteriya hujayrasiz', 'Bakteriya hujayrali, virus hujayrasiz', 'Ikkalasi ham o‘simlik'], 2, 'Bakteriya hujayradan tuzilgan, virus esa hujayrali tuzilishga ega emas.', 'Virusni bakteriya bilan bir xil hujayrali organizm deb hisoblamang.')
    ]
  },
  {
    id: 'osimliklar-dunyosi', subject: 'biologiya', title: 'O‘simliklar dunyosi', summary: 'O‘simliklarning asosiy guruhlari va organlarini tanib oling.', grade: 7, minutes: 14,
    lesson: {
      intro: 'O‘simliklar turli muhitda yashaydi va tuzilishi bo‘yicha bir-biridan farq qiladi.',
      body: 'Moxlar nam joylarda ko‘proq uchraydi va sporalar bilan ko‘payadi. Qirqquloqlar ham sporalar hosil qiladi, ammo ularda haqiqiy ildiz, poya va barglar bor. Urug‘li o‘simliklar urug‘ orqali ko‘payadi. Gulli o‘simliklarda gul changlanish va urug‘ hosil bo‘lishida ishtirok etadi, meva esa urug‘ni himoya qiladi va tarqalishiga yordam beradi. O‘simlik ildizi suv va mineral moddalarni oladi; barg fotosintez jarayonining asosiy joylaridan biridir.',
      example: 'Olma daraxti gulli o‘simlik: gulidan keyin meva hosil bo‘ladi, meva ichida urug‘lar joylashadi.'
    },
    cards: [
      ['Mox va qirqquloq qanday ko‘payadi?', 'Sporalar bilan.'],
      ['Urug‘li o‘simlik nimasi bilan ko‘payadi?', 'Urug‘ bilan.'],
      ['Gulli o‘simlikda urug‘ni nima himoya qiladi?', 'Meva.'],
      ['Bargdagi muhim jarayon qaysi?', 'Fotosintez.']
    ],
    concepts: [
      ['bio-sporali', 'Sporali o‘simliklar', 'Moxlar va qirqquloqlar spora yordamida ko‘payadi. Qirqquloqda haqiqiy ildiz, poya va barg bo‘ladi.', 'Urug‘ o‘rniga spora orqali tarqalish — bu guruhning muhim belgisi.', 'Qirqquloq urug‘ bilanmi yoki spora bilanmi ko‘payadi?', 'spora', 'Qirqquloq sporalar bilan ko‘payadi.'],
      ['bio-urugli', 'Urug‘li o‘simliklar', 'Urug‘li o‘simliklar urug‘ hosil qiladi. Gulli o‘simlikda gul ko‘payishda qatnashadi, meva urug‘ni o‘rab turadi.', 'Olma mevasi ichidagi urug‘ni himoya qiladigan qobiq kabi.', 'Gulli o‘simlikda urug‘ni nima o‘rab turadi?', 'meva', 'Meva urug‘ni o‘rab, himoya qiladi.'],
      ['bio-osimlik-vazifa', 'Ildiz va barg vazifasi', 'Ildiz suv va mineral moddalarni oladi. Bargda yorug‘lik energiyasi yordamida fotosintez boradi.', 'Ildiz moddalarni oladi, barg esa o‘simlik uchun oziq hosil qiladi.', 'Tuproqdan suvni qaysi organ oladi?', 'ildiz', 'Suv va mineral moddalarni ildiz oladi.']
    ],
    questions: [
      q('osd1', 'bio-sporali', 'Qirqquloq qanday ko‘payadi?', ['Urug‘ bilan', 'Spora bilan', 'Meva bilan', 'Tuxum bilan'], 1, 'Qirqquloqlar spora hosil qiladi.', 'Meva gulli o‘simliklarda uchraydi.'),
      q('osd2', 'bio-urugli', 'Gulli o‘simlikda urug‘ni nima o‘rab turadi?', ['Ildiz', 'Poya', 'Meva', 'Barg'], 2, 'Meva urug‘ni himoya qiladi.', 'Barg fotosintez bilan bog‘liq.'),
      q('osd3', 'bio-osimlik-vazifa', 'Tuproqdan suv va mineral moddalarni qaysi organ oladi?', ['Ildiz', 'Gul', 'Barg', 'Meva'], 0, 'Ildiz suv va mineral moddalarni oladi.', 'Barg asosan fotosintez jarayonida qatnashadi.'),
      q('osd4', 'bio-sporali', 'Moxlar ko‘proq qanday joylarda uchraydi?', ['Faqat cho‘lda', 'Nam joylarda', 'Faqat dengiz tubida', 'Faqat qorda'], 1, 'Moxlar nam muhitga bog‘liq.', 'Moxlarni faqat bitta ekstremal muhit bilan bog‘lamang.'),
      q('osd5', 'bio-urugli', 'Gulli o‘simlikda gulning asosiy vazifalaridan biri nima?', ['Suvni shimish', 'Tayanch bo‘lish', 'Ko‘payishda qatnashish', 'Qonni haydash'], 2, 'Gul changlanish va urug‘ hosil bo‘lishida qatnashadi.', 'Suvni ildiz oladi; qon haydash hayvonlarga xos.')
    ]
  },
  {
    id: 'hayvonot-dunyosi', subject: 'biologiya', title: 'Hayvonot dunyosi', summary: 'Umurtqali va umurtqasiz hayvonlarni farqlashni o‘rganing.', grade: 7, minutes: 14,
    lesson: {
      intro: 'Hayvonlar tayyor organik moddalar bilan oziqlanadigan tirik organizmlardir.',
      body: 'Hayvonlar umurtqasizlar va umurtqalilarga ajratiladi. Umurtqasizlarda umurtqa pog‘onasi yo‘q; hasharotlar va chuvalchanglar bunga misol. Umurtqalilarda ichki skelet va umurtqa pog‘onasi bo‘ladi. Baliqlar suvda jabra bilan nafas oladi, qushlarning tanasi pat bilan qoplangan, sutemizuvchilar esa bolalarini sut bilan boqadi. Hayvonlarning tana tuzilishi yashash muhitiga moslashgan. Oziq zanjirida hayvonlar boshqa organizmlar bilan bog‘liq.',
      example: 'Kapalak umurtqasiz hasharot; chumchuq umurtqali qush. Ularning tana tuzilishi va harakat usuli turlicha.'
    },
    cards: [
      ['Umurtqasiz hayvonda nima bo‘lmaydi?', 'Umurtqa pog‘onasi.'],
      ['Baliq qanday nafas oladi?', 'Jabra bilan.'],
      ['Qush tanasi nima bilan qoplangan?', 'Pat bilan.'],
      ['Sutemizuvchilarning muhim belgisi?', 'Bolalarini sut bilan boqadi.']
    ],
    concepts: [
      ['bio-umurtqa', 'Umurtqali va umurtqasizlar', 'Umurtqalilarda umurtqa pog‘onasi bor, umurtqasizlarda esa yo‘q. Hasharotlar umurtqasizlarga kiradi.', 'Umurtqa pog‘onasi ichki tayanchning bir qismi sifatida ishlaydi.', 'Kapalak umurtqalimi yoki umurtqasizmi?', 'umurtqasiz', 'Kapalak hasharot va umurtqasiz hayvondir.'],
      ['bio-hayvon-guruh', 'Umurtqali hayvonlar', 'Baliqlar jabra bilan nafas oladi, qushlar patli, sutemizuvchilar bolalarini sut bilan boqadi.', 'Har guruhni o‘ziga xos belgisi orqali eslab qolish oson.', 'Bolalarini sut bilan boqadigan guruh qaysi?', 'sutemizuvchilar', 'Bu sutemizuvchilarning asosiy belgilaridan biri.'],
      ['bio-moslashuv', 'Yashash muhitiga moslashuv', 'Hayvonning tana tuzilishi va harakati yashash joyiga moslashgan. Baliqning jabralari suvdagi kislorodni olishga yordam beradi.', 'Suvda yashash uchun nafas olish usuli quruqlikdagidan farq qiladi.', 'Baliq suvda qaysi organi bilan nafas oladi?', 'jabra', 'Baliq jabra yordamida nafas oladi.']
    ],
    questions: [
      q('hy1', 'bio-umurtqa', 'Kapalak qaysi guruhga kiradi?', ['Umurtqali', 'Umurtqasiz', 'Sutemizuvchi', 'Baliq'], 1, 'Kapalak hasharot va umurtqasiz hayvondir.', 'Hasharotlarda umurtqa pog‘onasi yo‘q.'),
      q('hy2', 'bio-moslashuv', 'Baliq suvda nima bilan nafas oladi?', ['O‘pka', 'Teri xolos', 'Jabra', 'Pat'], 2, 'Baliq jabra orqali suvdagi kislorodni oladi.', 'Pat qush tanasini qoplaydi.'),
      q('hy3', 'bio-hayvon-guruh', 'Qushlarning tanasi nima bilan qoplangan?', ['Tangacha', 'Pat', 'Jun', 'Qobiq'], 1, 'Qushlar tanasi pat bilan qoplangan.', 'Jun odatda sutemizuvchilar bilan bog‘liq.'),
      q('hy4', 'bio-hayvon-guruh', 'Qaysi hayvonlar bolalarini sut bilan boqadi?', ['Baliqlar', 'Hasharotlar', 'Qushlar', 'Sutemizuvchilar'], 3, 'Sutemizuvchilar bolalarini sut bilan boqadi.', 'Bu belgi guruh nomida ham aks etgan.'),
      q('hy5', 'bio-umurtqa', 'Umurtqali hayvonning asosiy belgisi qaysi?', ['Umurtqa pog‘onasi bor', 'Doim uchadi', 'Faqat suvda yashaydi', 'Faqat o‘simlik yeydi'], 0, 'Umurtqalilarda umurtqa pog‘onasi bo‘ladi.', 'Umurtqalilar turli muhitda yashashi va turlicha oziqlanishi mumkin.')
    ]
  }
];
