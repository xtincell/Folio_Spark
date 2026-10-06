/** Browser checks for the redesigned portfolio. Start the app before running.
 * STUDIO_BASE_URL defaults to http://127.0.0.1:1009.
 * PUPPETEER_EXECUTABLE_PATH selects the managed Chromium without downloading it.
 * Optional AXE_SCRIPT_PATH enables an accessibility audit with a local axe-core script.
 * Optional STUDIO_SCREENSHOT_DIR saves desktop and mobile reference screenshots.
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const base = process.env.STUDIO_BASE_URL || 'http://127.0.0.1:1009';
const paths = process.env.STUDIO_CHECK_PATHS ? process.env.STUDIO_CHECK_PATHS.split(',') : [
  '/',
  '/work',
  '/work/friesland-campina',
  '/work/la-barre',
  '/galerie',
  '/cv',
  '/tech',
  '/design',
  '/tarifs',
  '/conditions',
  '/recrutement',
  '/upgraders',
  '/upgraders/services',
  '/upgraders/contact',
  '/upgraders/blog',
];
const failures = [];
const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
    let errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const path of paths) {
      errors = [];
      const response = await page.goto(base + path, {
        waitUntil: 'networkidle2',
        timeout: 90000,
      });
      const status = response?.status();
      if (path === '/work') {
        // Exercise the reference archive as an actual visitor would. Closed details
        // intentionally defer image loading and cannot validate their images.
        await page.evaluate(() => { const archive = document.querySelector('details'); if (archive) archive.open = true; });
      }
      const result = await page.evaluate(async () => {
        // Exercise lazy images and section content, then return to the first fold.
        for (let y = 0; y < document.documentElement.scrollHeight; y += 900) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        // Wait for visited lazy images to resolve, instead of mistaking an in-flight decode for a broken asset.
        await Promise.all(
          [...document.images]
            .filter((img) => img.getAttribute('src')?.startsWith('/'))
            .map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                    setTimeout(resolve, 15000);
                  })
            )
        );
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 250));
        const missing = [...document.images]
          .filter(
            (img) =>
              img.getAttribute('src')?.startsWith('/') &&
              img.getBoundingClientRect().width > 0 &&
              (!img.complete || img.naturalWidth === 0)
          )
          .map((img) => img.getAttribute('src'));
        return {
          headings: [...document.querySelectorAll('h1')].map((h) =>
            h.textContent?.trim()
          ),
          main: !!document.querySelector('main'),
          overflow:
            document.documentElement.scrollWidth > window.innerWidth + 2,
          missing,
          lang: document.documentElement.lang,
        };
      });
      if (
        status !== 200 ||
        !result.headings.length ||
        !result.main ||
        result.overflow ||
        result.missing.length ||
        errors.length
      ) {
        failures.push({ path, width, status, ...result, errors: [...errors] });
      }
      if (process.env.AXE_SCRIPT_PATH) {
        await page.addScriptTag({ path: process.env.AXE_SCRIPT_PATH });
        const violations = await page.evaluate(async () => {
          const r = await window.axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
          });
          return r.violations
            .filter((v) => ['serious', 'critical'].includes(v.impact))
            .map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            }));
        });
        if (violations.length)
          failures.push({ path, width, accessibility: violations });
      }
      if (
        process.env.STUDIO_SCREENSHOT_DIR &&
        ['/', '/work', '/galerie', '/work/friesland-campina'].includes(path)
      ) {
        await mkdir(process.env.STUDIO_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({
          path: `${process.env.STUDIO_SCREENSHOT_DIR}/${path.replaceAll('/', '-') || 'home'}-${width}.png`,
          fullPage: path !== '/',
        });
      }
      console.log(
        JSON.stringify({
          path,
          width,
          status,
          headings: result.headings.length,
          overflow: result.overflow,
          errors: errors.length,
        })
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify({ checked: paths.length * 2, failures }, null, 2));
if (failures.length) process.exitCode = 1;
