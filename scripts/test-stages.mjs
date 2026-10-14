// Führt die Playwright-Suite etappenweise aus (stabiler unter Windows als ein Riesenlauf).
// Aufruf: node scripts/test-stages.mjs [spec ...]   Ergebnis: docs/qa/testlauf.md
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const specs = process.argv.slice(2).length ? process.argv.slice(2) : ['pages', 'workflows', 'links', 'a11y-extra', 'seo', 'design', 'overlap'];
const rows = [];
let total = { passed: 0, failed: 0, skipped: 0, flaky: 0 };
for (const s of specs) {
  const t0 = Date.now();
  const r = spawnSync('npx', ['--no-install', 'playwright', 'test', `tests/${s}.spec.ts`, '--reporter=line'], {
    shell: true,
    encoding: 'utf8',
    env: { ...process.env, PW_WORKERS: process.env.PW_WORKERS ?? '4' },
    maxBuffer: 256 * 1024 * 1024,
  });
  const out = ((r.stdout ?? '') + (r.stderr ?? '')).replace(/\x1b\[[0-9;]*m/g, '');
  fs.writeFileSync(`test-results-${s}.log`, out);
  const n = (k) => Number(new RegExp(`(?:^|\\s)(\\d+) ${k}`).exec(out)?.[1] ?? 0);
  const res = { passed: n('passed'), failed: n('failed'), skipped: n('skipped'), flaky: n('flaky') };
  for (const k of Object.keys(total)) total[k] += res[k];
  rows.push(`| ${s} | ${res.passed} | ${res.failed} | ${res.flaky} | ${res.skipped} | ${Math.round((Date.now() - t0) / 60000)} min |`);
  console.log(`${s}: ${res.passed} passed, ${res.failed} failed, ${res.flaky} flaky, ${res.skipped} skipped`);
}
const md = `# Testlauf

${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })} · 7 Geräte × Chromium + WebKit · Playwright 1.63 · ${process.env.PW_WORKERS ?? 4} Worker

| Spezifikation | bestanden | fehlgeschlagen | instabil | übersprungen* | Dauer |
|---|---|---|---|---|---|
${rows.join('\n')}
| **gesamt** | **${total.passed}** | **${total.failed}** | **${total.flaky}** | ${total.skipped} | |

\* Übersprungen = bewusst nur auf Referenzprojekten ausgeführte Prüfungen (z. B. Linkprüfung auf 3 Projekten, SEO einmal) und Screenshots (eigener Lauf).
`;
if (process.argv.slice(2).length === 0) fs.writeFileSync('docs/qa/testlauf.md', md);
console.log(md);
