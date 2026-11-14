const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const executablePath = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : undefined);
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(baseUrl);
    await page.getByRole('button', { name: /Demoni boshlash/ }).click();
    await page.waitForURL('**/dashboard');
    await page.goto(`${baseUrl}/fan/kimyo`);
    await page.getByRole('link', { name: /Laboratoriyani ochish/ }).click();
    await page.getByRole('heading', { name: 'Formulalar laboratoriyasi' }).waitFor();
    await page.getByLabel('O‘yin rejimi').selectOption('water');
    await page.getByRole('button', { name: 'Vodorod (H)', exact: true }).click();
    await page.getByRole('button', { name: 'Kislorod (O)', exact: true }).click();
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'atomlar soni katalogdagi' }).waitFor();
    await page.getByRole('button', { name: '1-katak: atomni ko‘paytirish', exact: true }).click();
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Topshiriq bajarildi!' }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Suv: H₂O', exact: true }).count(), 1);
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).click();
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).waitFor({ state: 'visible' });
    await page.reload();
    await page.getByRole('button', { name: 'Suv: H₂O', exact: true }).waitFor();
    assert.equal(await page.locator('.lab-progress progress').getAttribute('value'), '1');
    await page.getByLabel('O‘yin rejimi').selectOption('oxygen');
    await page.getByRole('button', { name: 'Yordam', exact: true }).click();
    await page.locator('.lab-hint').waitFor();
    await page.getByRole('button', { name: 'Kislorod (O)', exact: true }).click();
    await page.getByRole('button', { name: 'Kislorod (O)', exact: true }).click();
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Oddiy modda' }).waitFor();
    await page.getByLabel('O‘yin rejimi').selectOption('');
    await page.getByRole('button', { name: 'Geliy (He)', exact: true }).click();
    await page.getByRole('button', { name: 'Kislorod (O)', exact: true }).click();
    await page.getByRole('button', { name: 'Formulani tuzish', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Geliy odatiy sharoitda' }).waitFor();
    assert.equal(await page.locator('.lab-progress progress').getAttribute('value'), '2');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false);
    fs.mkdirSync('.artifacts', { recursive: true });
    await page.screenshot({ path: '.artifacts/lab-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: '.artifacts/lab-desktop.png', fullPage: true });
    const stranger = await browser.newPage();
    await stranger.goto(`${baseUrl}/fan/kimyo/laboratoriya`);
    await stranger.waitForURL('**/kirish');
    await stranger.close();
    assert.deepEqual(errors, []);
    console.log('Lab browser flow passed: ratio correction, mission, repeat submit, refresh, same-element molecule, helium, responsive layout, unauthenticated access.');
  } catch (error) {
    fs.mkdirSync('.artifacts', { recursive: true });
    await page.screenshot({ path: '.artifacts/lab-failure.png', fullPage: true });
    console.error('Failure location:', page.url(), (await page.locator('body').innerText()).slice(0, 2000));
    throw error;
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
