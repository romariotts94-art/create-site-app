import fs from 'node:fs';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:8765/';
const out = 'artifacts/john-fry';
fs.mkdirSync(out, { recursive: true });
const report = { status: 'FAIL', tests: [], consoleErrors: [], pageErrors: [], screenshots: [], notes: ['Screenshots are evidence, not independent artistic approval.'] };
const assert = (ok, message) => { report.tests.push({ message, passed: !!ok }); if (!ok) console.error('FAIL', message); };
let browser;
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    page.on('pageerror', error => report.pageErrors.push({ width, message: String(error) }));
    page.on('console', msg => { if (msg.type() === 'error') report.consoleErrors.push({ width, message: msg.text() }); });
    const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    assert(response?.status() === 200, width + ': HTTP 200');
    assert((await page.title()).trim().length > 0, width + ': page title present');
    assert((await page.locator('body').innerText()).trim().length > 100, width + ': visible content');
    const dims = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    assert(dims.scroll <= dims.viewport + 3, width + ': no horizontal overflow');
    const screenshot = out + '/marketplace-' + width + '.png';
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    report.screenshots.push(screenshot);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + '#catalog', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  assert((await page.locator('body').innerText()).trim().length > 100, 'catalog route renders');
  await page.goto(base + '#site-1', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  assert((await page.locator('body').innerText()).trim().length > 100, 'site 1 route renders');
  await page.screenshot({ path: out + '/site-1-mobile.png', fullPage: true, animations: 'disabled' });
  report.screenshots.push(out + '/site-1-mobile.png');
  await page.close();
  assert(report.pageErrors.length === 0, 'no uncaught page exceptions');
  report.status = report.tests.every(t => t.passed) ? 'PASS' : 'FAIL';
} catch (error) { report.notes.push('Runner error: ' + String(error)); }
finally {
  if (browser) await browser.close();
  fs.writeFileSync(out + '/browser-report.json', JSON.stringify(report, null, 2) + '\n');
}
if (report.status !== 'PASS') process.exitCode = 1;
