// Lighthouse für alle Seiten in allen Sprachen, mobil und Desktop.
// Aufruf: npm run lighthouse (erwartet `npm run preview` auf Port 4321). Chrome: Playwright-Chromium.
// Ergebnis: docs/qa/lighthouse.md (Tabelle; anderer Pfad über LH_OUT), Rohdaten in lh/ (nicht im Repository). LH_BASE und LH_ONLY wählen Server und Seiten.
import fs from 'node:fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from 'playwright';

const BASE = process.env.LH_BASE ?? 'http://localhost:4321';
const only = process.env.LH_ONLY ? process.env.LH_ONLY.split(',') : null;
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
let paths = [...sitemap.matchAll(/<loc>https:\/\/hellobeautysalon\.at([^<]+)<\/loc>/g)].map((m) => m[1]);
if (only) paths = paths.filter((p) => only.some((o) => p.includes(o)));
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];

fs.mkdirSync('lh', { recursive: true });
const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
const all = [];
for (const form of ['mobil', 'desktop']) {
  for (const p of paths) {
    const config =
      form === 'desktop'
        ? {
            extends: 'lighthouse:default',
            settings: {
              formFactor: 'desktop',
              screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
              throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
              onlyCategories: cats,
            },
          }
        : { extends: 'lighthouse:default', settings: { onlyCategories: cats } };
    const r = await lighthouse(`${BASE}${p}`, { port: chrome.port, output: 'json', logLevel: 'error' }, config);
    const lhr = r.lhr;
    fs.writeFileSync(`lh/${form}-${p.replace(/\//g, '_') || 'root'}.json`, r.report);
    const s = cats.map((c) => Math.round((lhr.categories[c]?.score ?? 0) * 100));
    const lcp = lhr.audits['largest-contentful-paint']?.numericValue ?? 0;
    const cls = lhr.audits['cumulative-layout-shift']?.numericValue ?? 0;
    const tbt = lhr.audits['total-blocking-time']?.numericValue ?? 0;
    const longTasks = (lhr.audits['long-tasks']?.details?.items ?? []).filter((t) => t.url && t.url.startsWith(BASE) && t.url.includes('/_astro/')).length;
    const bad = Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && !['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode))
      .map((a) => a.id)
      .slice(0, 5)
      .join(', ');
    all.push({ form, p, s, lcp, cls, tbt, longTasks, bad });
    rows.push(`| ${form} | \`${p}\` | ${s.join(' | ')} | ${(lcp / 1000).toFixed(2)} s | ${cls.toFixed(3)} | ${Math.round(tbt)} ms | ${longTasks} | ${bad || '–'} |`);
    process.stdout.write(`${form} ${p} ${s.join('/')} LCP ${(lcp / 1000).toFixed(2)} CLS ${cls.toFixed(3)}\n`);
  }
}
await chrome.kill();

const min = (i) => Math.min(...all.map((x) => x.s[i]));
const maxLcp = Math.max(...all.map((x) => x.lcp));
const maxCls = Math.max(...all.map((x) => x.cls));
const md = `# Lighthouse

Gemessen am ${new Date().toISOString().slice(0, 16).replace('T', ' ')} gegen ${process.env.LH_NOTE ?? '`npm run preview` (lokal, Demo-Modus: noindex, daher SEO 69 durch „Seite ist für die Indexierung gesperrt“)'} (UTC), Lighthouse mit Playwright-Chromium.
Mobil: Standard-Emulation (Moto G Power, simuliertes langsames 4G, 4× CPU). Desktop: 1350 × 940, ohne CPU-Drosselung.

**Minimum über alle ${all.length} Messungen:** Performance ${min(0)} · Barrierefreiheit ${min(1)} · Best Practices ${min(2)} · SEO ${min(3)} · max. LCP ${(maxLcp / 1000).toFixed(2)} s · max. CLS ${maxCls.toFixed(3)}

| Gerät | Seite | Perf | A11y | BP | SEO | LCP | CLS | TBT | Long Tasks (eigenes JS) | Audits < 90 |
|---|---|---|---|---|---|---|---|---|---|---|
${rows.join('\n')}
`;
fs.writeFileSync(process.env.LH_OUT ?? 'docs/qa/lighthouse.md', md);
console.log(`\nMinimum: ${min(0)}/${min(1)}/${min(2)}/${min(3)}  max LCP ${(maxLcp / 1000).toFixed(2)} s  max CLS ${maxCls.toFixed(3)}`);
