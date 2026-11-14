# MEMORYX

Kimyo fanida yangi **Formulalar laboratoriyasi** mavjud: `/fan/kimyo/laboratoriya`.
Erkin kashfiyot va topshiriq rejimida 9 elementdan 13 formulani tuzing; ochilgan formulalar hisobda saqlanadi.
Qoidalar, manbalar va testlar: [docs/chemistry-lab.md](docs/chemistry-lab.md).
Prisma client `node_modules/@memoryx/prisma-client` papkasiga yaratiladi va Next.js uni Node.js paketi sifatida yuklaydi; mavjud loyihani yangilaganda `npm run db:deploy` va `npm run db:generate` bajaring.
Laboratoriyaning brauzer testi: `node scripts/lab-browser-check.cjs`; boshqa port uchun `BASE_URL` muhit o‘zgaruvchisini belgilang.

MEMORYX — o‘zbek tilidagi Kimyo va Biologiya o‘quv MVPsi. O‘quvchi fan va mavzuni tanlaydi, darsni o‘qiydi, kartochkalarni ko‘radi, test ishlaydi, xatolarining sababini ko‘radi, tushunchani boshqa izoh va qisqa mashq bilan takrorlaydi, keyin yangi urinish qiladi. Natijalar hisobda saqlanadi.

## Ishga tushirish

Talablar: Node.js 20.9+ (sinovda 24.21), npm va lokal SQLite yozish huquqi. Ushbu loyiha lokal ishlab chiqish uchun SQLite va Prisma ishlatadi. Toza muhitda paketlarni olish uchun npm tarmog‘iga ulanish kerak.

```powershell
Copy-Item .env.example .env
# .env ichida SESSION_SECRET ni kamida 32 ta tasodifiy belgiga almashtiring.
# DEMO_PASSWORD ixtiyoriy; seed qilinadigan lokal demo hisobi uchun.
npm.cmd install
npm.cmd run db:deploy
npm.cmd run db:seed
npm.cmd run dev
```

Mac/Linuxda `npm.cmd` o‘rniga `npm` ishlating. `http://localhost:3000` ni oching va **Demoni boshlash** tugmasini bosing. Bu tugma har tashrifchi uchun alohida, bazada saqlanadigan demo hisob yaratadi. Demo hisobdan chiqqandan keyin unga qayta kirish yo‘li yo‘q; davomli hisob kerak bo‘lsa, ro‘yxatdan o‘ting. `DEMO_PASSWORD` berilsa, seed skripti `demo@memoryx.local` hisobini ham yaratadi; uning paroli faqat lokal `.env` faylida turadi. Seed qayta ishlaganda mavjud demo paroli almashtirilmaydi.

Migratsiyalar allaqachon `prisma/migrations` ichida. Mavjud bazaga qo‘llash uchun `npm run db:deploy`, yangi sxema ustida ishlaganda `npm run db:migrate -- --name <nom>` ishlating. Prisma client: `npm run db:generate`. Production build: `npm run build`, keyin `npm run start`.

`.env.example`:

| O‘zgaruvchi | Vazifa |
| --- | --- |
| `DATABASE_URL` | Lokal SQLite fayli (`file:./dev.db`, Prisma sxemasiga nisbatan). |
| `SESSION_SECRET` | Sessiya tokenini HMAC bilan xeshlash uchun uzun sir. |
| `DEMO_PASSWORD` | Seed qilinadigan lokal demo hisob paroli; ixtiyoriy. |

Ishlab chiqarish muhitida SQLite faylini umumiy ko‘p foydalanuvchili saqlash deb qabul qilmang. PostgreSQLga o‘tish uchun Prisma datasource providerini, migratsiyalarni va joylashtirish sozlamalarini alohida tayyorlash kerak; faqat URLni almashtirish yetmaydi. Tarmoq cheklangan muhitda tayyor autentifikatsiya paketi o‘rniga scrypt parol xeshlash, bazadagi sessiyalar, HttpOnly/SameSite cookie va kirish urinishlari cheklovi yozildi. Ommaviy ishga tushirishdan oldin uni yaxshi qo‘llab-quvvatlanadigan autentifikatsiya yechimiga o‘tkazish kerak.

## O‘quv qoidalari

- **Zaif tushuncha:** joriy urinishda shu tushunchaga tegishli kamida bitta savol xato bo‘lsa, u takrorlash uchun ko‘rsatiladi. `ConceptProgress` umumiy to‘g‘ri/xato sonlarini va oxirgi urinishdagi holatni saqlaydi.
- **XP va tanga:** mavzudagi birinchi yakunlangan test uchun `10 + 5 × to‘g‘ri javob` XP va `to‘g‘ri javob` miqdorida virtual tanga. Keyingi urinishda faqat oldingi eng yaxshi natijadan oshgan har bir yangi to‘g‘ri javob uchun 2 XP va 1 tanga. Tangalar pul qiymatiga ega emas.
- **Qayta topshirish:** har safar yangi `QuizAttempt` ochiladi. Yakunlash, javoblar, tushuncha natijalari va mukofot yozuvi bitta DB tranzaksiyasida saqlanadi. Bir urinishni qayta yuborish yangi mukofot bermaydi.
- **Mashq:** takrorlashdagi qisqa javob serverda saqlangan javobga nisbatan tekshiriladi. Kichik harf, oxirgi tinish belgisi, ortiqcha bo‘shliq va oddiy `-da` qo‘shimchasi qabul qilinadi.

## Kontentni tahrirlash

`prisma/content.cjs` — interfeysdan ajratilgan mualliflik kontenti. Yangi fan uchun `prisma/seed.cjs` dagi fanlar ro‘yxatiga barqaror `id`, o‘zbekcha nom, tavsif va belgi qo‘shing. Yangi mavzu uchun `topics` massiviga `subject`, `grade`, `minutes`, `lesson` (`intro`, `body`, `example`), kamida 4 kartochka, tushunchalar va kamida 5 savol qo‘shing. Har savolning `concept`, 4 javob varianti, nol indeksli `answer`, `correctNote` va `wrongNote` maydonlari bo‘lishi kerak. Har bir tushuncha yozuvida boshqa izoh, o‘xshatish, mashq savoli, javobi va izohi mavjud bo‘lsin. Keyin `npm run db:seed` ni ishlating. IDlarni o‘zgartirish mavjud urinishlarga ta’sir qiladi; o‘chirish uchun alohida migratsiya kerak. Nashrdan oldin yangi ilmiy mazmunni fan mutaxassisi tekshirsin.

Hozirgi kontent: Kimyo — “Atom tuzilishi”, “Kimyoviy reaksiyalar”; Biologiya — “Hujayra tuzilishi”, “Fotosintez”. Har mavzuda 4 kartochka va 5 test savoli bor. Rasmiy darslikka moslik da’vo qilinmaydi.

## Tekshiruvlar

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

`npm test` alohida `prisma/test.db` bazasiga migratsiya va seedni qo‘llab, qoidalar hamda real tranzaksiyali o‘quv oqimini tekshiradi. Brauzer sinovi uchun `npm run dev` boshqa terminalda ishlasin, so‘ng `npm run test:e2e`. Windowsda skript odatiy Chrome manzilidan foydalanadi; boshqa muhitda `CHROME_PATH`ni brauzer executable fayliga o‘rnating yoki Playwright brauzerini o‘rnating. `SCREENSHOT=1` berilsa mobil/desktop tasvirlar `.artifacts` ichiga yoziladi.

## Tuzilma

| Joy | Vazifa |
| --- | --- |
| `prisma/schema.prisma`, `prisma/migrations/` | Relatsion sxema va migratsiyalar. |
| `prisma/content.cjs`, `prisma/seed.cjs` | Mualliflik kontenti va seed. |
| `src/lib/auth.ts`, `src/app/actions.ts` | Hisoblar, sessiyalar, validatsiya va server harakatlari. |
| `src/lib/learning.ts`, `src/lib/quiz.ts` | Baholash, zaif tushuncha, mukofot qoidasi va atomar yakunlash. |
| `src/app/` | Landing, dashboard, fan, dars, kartochka, test, natija, takrorlash va profil sahifalari. |
| `tests/`, `scripts/browser-check.cjs` | Qoidalar, DB integratsiyasi va brauzer oqimi sinovlari. |

## Qabul mezonlari

| Mezon | Amalga oshirilgan joy | Tekshiruv |
| --- | --- | --- |
| Landing, demo, ro‘yxatdan o‘tish, kirish/chiqish, profil | `/`, `/kirish`, `/royxatdan-otish`, `/profil`, `actions.ts` | Brauzer oqimi, TypeScript va build. |
| Dashboard, fan → mavzu → dars → kartochka → test | `/dashboard`, `/fan/[subjectId]`, `/mavzu/[topicId]`, `/test/[attemptId]` | Brauzer oqimi, mobil va desktop tasvirlari. |
| Kimyo/Biologiya, 2 tadan mavzu, darslar, kartochkalar, 20 savol | `prisma/content.cjs`, `prisma/seed.cjs` | Seed natijasi: 4 mavzu, 20 savol. |
| Server baholashi, javoblar, vaqt, tushuncha natijasi | `src/lib/quiz.ts`, `QuizAttempt`, `AttemptAnswer`, `ConceptProgress` | DB integratsiya testi va brauzer oqimi. |
| Xato izohi, boshqa izoh, mashq, qayta urinish va farq | `/natija/[attemptId]`, `/takrorlash/[attemptId]/[conceptId]` | Brauzer oqimi va qoidalar testi. |
| XP/tanga, tranzaksiya va takror yuborishdan himoya | `rewardForAttempt`, `RewardTransaction`, `finalizeAttempt` | Unit va DB integratsiya testlari. |
| Avtorizatsiya, maxfiy javob kaliti, himoyalangan natijalar | `auth.ts`, `actions.ts`, server sahifalari | DB begona foydalanuvchi testi, brauzer kirish nazorati. |
| Responsive, klaviatura, fokus, yuklanish/xato/bo‘sh holatlar | `globals.css`, forma komponentlari, `loading.tsx`, `error.tsx` | Mobil/desktop ko‘rish va brauzer oqimi. |

## Cheklovlar va keyingi bosqichlar

Bu lokal MVP. SQLite, oddiy matnli mashq javoblari, kichik qo‘lda yozilgan kontent va maxsus sessiya kodi bilan ishlaydi. Demo hisobni tiklash, parolni unutganda tiklash, hisobni o‘chirish va tahrirchi paneli hali yo‘q. Brauzer sinovi Chrome bilan bajarildi. O‘zbekiston bo‘yicha voyaga yetmaganlar ma’lumoti, ta’lim ma’lumoti va keyingi pullik mahsulot talablarini ishlab chiqarishga chiqarishdan oldin huquqiy mutaxassis tekshirishi kerak; bu loyiha muvofiqlik da’vo qilmaydi.

Keyingi uchta ustuvor ish:

1. PostgreSQL va standart autentifikatsiya tizimiga o‘tish, hisobni tiklash/o‘chirish va demo hisobni ro‘yxatdagi hisobga aylantirish.
2. Kontentni mutaxassis ko‘rigidan o‘tkazish, yangi fanlar va tahrirchi ish oqimini qo‘shish.
3. Alohida imtihon rejimini vaqt, baholash va tahlil qoidalari bilan qurish; undan keyin maktab PRO va to‘lovlarni alohida loyihalash.

Maktab PRO uchun 15 000 UZS/o‘quvchi/oy va kirish testi uchun 10 000 UZS g‘oyalari tasdiqlanmagan. Hozir to‘lov qabul qilinmaydi va bu narxlar ilovada faol mahsulot sifatida ko‘rsatilmaydi.
# memory-x
