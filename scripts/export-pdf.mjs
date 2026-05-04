#!/usr/bin/env node
/**
 * Export pages → PDF.
 *
 * Boots a Next.js production server on a free port, drives a headless
 * Chromium with puppeteer, and writes A4 print-ready PDFs to ./source/.
 *
 * Usage:  node scripts/export-pdf.mjs
 *
 * Override the targets via PDF_TARGETS env (JSON array of { path, file }).
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');
const OUT_DIR = path.join(ROOT, 'source');

const DEFAULT_TARGETS = [
  { path: '/cv', file: 'xtincell-cv.pdf', title: 'CV' },
  { path: '/', file: 'xtincell-folio.pdf', title: 'Folio' },
];

const TARGETS = process.env.PDF_TARGETS ? JSON.parse(process.env.PDF_TARGETS) : DEFAULT_TARGETS;

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return resolve();
      } catch {
        /* retry */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`server not ready: ${url}`));
      setTimeout(tick, 500);
    };
    tick();
  });
}

async function ensureBuild() {
  if (existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) {
    console.log('· using existing .next build');
    return;
  }
  console.log('· running next build (first time)...');
  await new Promise((resolve, reject) => {
    const p = spawn('npm', ['run', 'build'], {
      cwd: ROOT,
      stdio: 'inherit',
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`build failed: ${code}`))));
  });
}

async function startServer(port) {
  const proc = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  proc.stdout.on('data', (b) => process.stdout.write(`  [next] ${b}`));
  proc.stderr.on('data', (b) => process.stderr.write(`  [next] ${b}`));
  await waitForServer(`http://127.0.0.1:${port}/`);
  return proc;
}

async function renderPdf(browser, url, outFile, title) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');
  console.log(`  → loading ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
  // Give in-view animations / lazy content a beat to settle
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  await new Promise((r) => setTimeout(r, 1200));

  const pdf = await page.pdf({
    path: outFile,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:'Helvetica',sans-serif;font-size:8px;color:#888;width:100%;padding:0 14mm;">
      <span>${title} — Xtincell · Alexandre Djengue</span>
    </div>`,
    footerTemplate: `<div style="font-family:'Helvetica',sans-serif;font-size:8px;color:#888;width:100%;padding:0 14mm;display:flex;justify-content:space-between;">
      <span>xtincell.com</span>
      <span>p. <span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`,
  });
  await page.close();
  console.log(`  ✓ wrote ${path.relative(ROOT, outFile)} (${(pdf.length / 1024).toFixed(0)} kb)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await ensureBuild();

  const port = await getFreePort();
  console.log(`· starting next on :${port}`);
  const server = await startServer(port);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium'],
    });

    for (const t of TARGETS) {
      const url = `http://127.0.0.1:${port}${t.path}`;
      const out = path.join(OUT_DIR, t.file);
      await renderPdf(browser, url, out, t.title);
    }

    const manifest = {
      generatedAt: new Date().toISOString(),
      pages: TARGETS.map((t) => ({ path: t.path, file: t.file, title: t.title })),
    };
    await writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log(`✓ done — ${TARGETS.length} pdf(s) in source/`);
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
