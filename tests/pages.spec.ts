/**
 * 8.4 Automatische Layout- und Inhaltsprüfungen pro Seite, Sprache und Gerät (Chromium + WebKit).
 */
import AxeBuilder from '@axe-core/playwright';
import { test, expect, isMobile, scrollThrough, waitImages } from './support/fixtures';
import { PAGES, HTML_LANG, germanResidue } from './support/site';
import { layoutAudit, coveredTargets } from './support/audit';

for (const p of PAGES) {
  test(`Seite ${p.id} ${p.path}`, async ({ page, watch }, info) => {
    const res = await page.goto(p.path, { waitUntil: 'networkidle' });
    expect(res?.status(), 'HTTP-Status').toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', HTML_LANG[p.lang]);

    await scrollThrough(page);
    await waitImages(page);

    // Layout, Text, Touch-Ziele, Bilder, Überschriften
    const issues = await page.evaluate(layoutAudit, { mobile: isMobile(info.project) });
    expect.soft(issues, issues.join('\n')).toEqual([]);

    // Fokusziele nicht von Sticky-Elementen verdeckt
    const covered = await page.evaluate(coveredTargets);
    expect.soft(covered, covered.join('\n')).toEqual([]);

    // Kein deutscher Reststring auf EN/HU
    if (p.lang !== 'de') {
      const text = await page.locator('body').innerText();
      const found = germanResidue(p.lang).filter((s) => text.includes(s));
      expect.soft(found, `Deutsche Reststrings: ${found.join(' | ')}`).toEqual([]);
    }

    // axe-core: 0 Verstöße (WCAG 2.0–2.2 A/AA + Best Practices)
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const v = axe.violations.map((x) => `${x.id} (${x.impact}): ${x.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(', ')}`);
    expect.soft(v, v.join('\n')).toEqual([]);

    // Keine Fremd-Requests, keine Fehler-Responses, Konsole leer
    expect.soft(watch.foreign, 'Requests an fremde Domains').toEqual([]);
    expect.soft(watch.failed, 'Fehlgeschlagene Requests').toEqual([]);
    expect.soft(watch.console, 'Konsolenmeldungen').toEqual([]);
  });
}
