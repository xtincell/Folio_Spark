import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const base = process.env.STUDIO_BASE_URL || 'http://127.0.0.1:1009';
const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
  headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
const go = path => page.goto(base + path, { waitUntil: 'networkidle2', timeout: 90000 });
try {
  await go('/');
  const menu = await page.$('button[aria-controls="studio-menu"]');
  await menu.click();
  await page.waitForSelector('#studio-menu');
  await page.keyboard.press('Escape');
  await page.waitForSelector('#studio-menu', { hidden: true });
  assert.equal(await page.evaluate(button => document.activeElement === button, menu), true);
  console.log('PASS mobile menu: Escape closes and restores focus');

  await page.click('button[aria-label="Switch to English"]');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  await go('/work');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert.match(await page.$eval('h1', h => h.textContent), /The idea/);
  const total = await page.$eval('[role="status"]', el => Number.parseInt(el.textContent));
  await page.type('input[type="search"]', 'definitely-no-project-93489');
  await page.waitForFunction(() => document.querySelector('[role="status"]').textContent.startsWith('0 '));
  await page.click('section button');
  await page.waitForFunction(total => document.querySelector('[role="status"]').textContent.startsWith(`${total} `), {}, total);
  const filters = await page.$$('[role="group"][aria-label="Filter projects"] button');
  await filters[1].click();
  await page.waitForFunction(total => Number.parseInt(document.querySelector('[role="status"]').textContent) < total, {}, total);
  assert.ok(await page.$eval('[role="status"]', el => Number.parseInt(el.textContent)) > 0);
  console.log('PASS English persists, search empty state/reset and discipline filtering');

  await go('/work/friesland-campina');
  await page.waitForSelector('button[aria-label^="Enlarge"]');
  const image = await page.$('button[aria-label^="Enlarge"]');
  await image.click();
  await page.waitForSelector('dialog[open]');
  assert.equal(await page.evaluate(() => document.activeElement?.tagName), 'BUTTON');
  await page.keyboard.press('Escape');
  await page.waitForSelector('dialog[open]', { hidden: true });
  assert.equal(await page.evaluate(button => document.activeElement === button, image), true);
  console.log('PASS image viewer: opens, focuses close, Escape restores focus');

  await go('/');
  await page.waitForSelector('video');
  assert.equal(await page.$eval('video', v => v.paused), true);
  await page.click('button[aria-label="Play showreel"]');
  await page.waitForFunction(() => document.querySelector('video').currentTime > .2);
  const video = await page.$eval('video', v => ({ width: v.videoWidth, muted: v.muted, duration: v.duration }));
  assert.equal(video.width, 1920);
  assert.equal(video.muted, true);
  assert.ok(Math.abs(video.duration - 48) < .1);
  await page.click('button[aria-label="Pause showreel"]');
  await page.waitForFunction(() => document.querySelector('video').paused);
  console.log('PASS reduced-motion suppresses autoplay; manual video play/pause works');

  await go('/tarifs');
  const fcfa = await page.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'FCFA'));
  await fcfa.asElement().click();
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'FCFA' && b.getAttribute('aria-pressed') === 'true'));
  console.log('PASS pricing currency selector');

  await page.click('button[aria-label="Passer en français"]');
  await page.waitForFunction(() => document.documentElement.lang === 'fr');
  console.log('PASS switch back to French');
} finally {
  await browser.close();
}
