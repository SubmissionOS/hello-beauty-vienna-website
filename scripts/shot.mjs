// Usage: node shot.mjs <url> <outfile> <width> <height> [full=1] [browser=chromium]
import { chromium, webkit } from 'playwright';
const [url, out, w, h, full = '1', br = 'chromium'] = process.argv.slice(2);
const browser = await (br === 'webkit' ? webkit : chromium).launch();
const mobile = Number(w) < 1024;
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: full === 'seg' ? 1 : (mobile ? 2 : 1), isMobile: mobile && br !== 'webkit' ? true : undefined, hasTouch: mobile });
const page = await ctx.newPage();
const logs = [];
page.on('console', (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`));
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 60)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
await page.waitForTimeout(700);
if (full === "seg") {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const segH = Number(h) * 2; let i = 0;
  for (let y = 0; y < total; y += segH, i++) {
    await page.screenshot({ path: out.replace(/.png$/, "-" + i + ".png"), fullPage: true, clip: { x: 0, y, width: Number(w), height: Math.min(segH, total - y) } });
  }
  console.log("segments", i);
} else {
  await page.screenshot({ path: out, fullPage: full === "1" });
}
console.log(logs.join('\n') || 'console clean');
await browser.close();
