const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

async function main() {
  fs.mkdirSync('.artifacts', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    const response = await page.goto('http://localhost:3000');
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.evaluate(() => document.fonts.check('16px Outfit')), true);
    await page.getByRole('button', { name: 'Qorong‘i rejim', exact: true }).click();
    await page.screenshot({ path: '.artifacts/home-dark.png', fullPage: true });
    await page.getByRole('button', { name: 'Yorug‘ rejim', exact: true }).click();
    await page.locator('.language-control select').selectOption('en');
    await page.getByRole('button', { name: 'Try the demo' }).waitFor();
    await page.screenshot({ path: '.artifacts/home-light.png', fullPage: true });
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    await page.getByRole('button', { name: 'Try the demo' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByRole('heading', { name: 'Hello, Demo learner!' }).waitFor();
    await page.screenshot({ path: '.artifacts/dashboard-light.png', fullPage: true });
    await page.goto('http://localhost:3000/profil');
    await page.getByLabel('Nickname', { exact: true }).fill('Design QA');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.waitForURL('**/profil?saved=1');
    await page.getByText('Profile saved.', { exact: true }).waitFor();
    await page.locator('.language-control select').selectOption('ru');
    await page.getByRole('heading', { name: 'Профиль', exact: true }).waitFor();
    await page.screenshot({ path: '.artifacts/profile-ru.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: '.artifacts/profile-mobile.png', fullPage: true });

    // Each language and theme must fit narrow screens and survive reloads.
    for (const locale of ['uz', 'ru', 'en']) {
      await page.locator('.language-control select').selectOption(locale);
      for (let i = 0; i < 2; i++) {
        await page.locator('.theme-toggle').click();
        const theme = await page.locator('html').getAttribute('data-theme');
        await page.reload();
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(await page.getByLabel(locale === 'uz' ? 'Taxallus' : locale === 'ru' ? 'Имя пользователя' : 'Nickname').inputValue(), 'Design QA');
      }
    }
    await page.locator('.language-control select').selectOption('ru');
    await page.goto('http://localhost:3000/mavzu/atom-tuzilishi');
    await page.getByRole('heading', { name: 'Строение атома', exact: true }).waitFor();
    assert.match(await page.locator('.lesson-copy').innerText(), /В центре атома находится ядро/);
    await page.locator('.language-control select').selectOption('en');
    await page.getByRole('link', { name: 'Go to flashcards' }).click();
    await page.getByRole('button', { name: 'Question. Click to reveal the answer', exact: true }).click();
    await page.getByRole('button', { name: 'Answer. Click to see the question', exact: true }).waitFor();
    assert.match(await page.locator('.flashcard').innerText(), /Protons and neutrons/);
    await page.getByRole('button', { name: 'Go to quiz' }).click();
    await page.waitForURL('**/test/**');
    const questions = page.locator('fieldset.question');
    await questions.first().waitFor();
    assert.equal(await questions.count(), 5);
    for (let i = 0; i < 5; i++) await questions.nth(i).locator('input[type=radio]').nth([1, 2, 1, 1, 2][i]).check();
    await page.getByRole('button', { name: 'Check answers' }).click();
    await page.waitForURL('**/natija/**');
    await page.getByRole('heading', { name: 'Your result', exact: true }).waitFor();
    await page.getByRole('link', { name: 'Review concept' }).first().click();
    await page.getByLabel('Your answer', { exact: true }).fill('protons and neutrons');
    await page.getByRole('button', { name: 'Check practice', exact: true }).click();
    await page.waitForURL('**?practice=correct');
    await page.locator('.language-control select').selectOption('ru');
    await page.getByLabel('Ваш ответ', { exact: true }).fill('протоны и нейтроны');
    await page.getByRole('button', { name: 'Проверить упражнение', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Верно!' }).waitFor();
    assert.deepEqual(errors, []);
    console.log('Design QA passed: local font, three languages, both themes, mobile layout, persistence, profile, flashcards, quiz, and bilingual practice answers.');
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
