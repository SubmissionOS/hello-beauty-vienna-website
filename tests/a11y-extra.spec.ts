/**
 * 8.4 Erweiterte Barrierefreiheit: Reflow 320 px (WCAG 1.4.10), 200 % Zoom (1.4.4), Textabstände (1.4.12),
 * prefers-reduced-motion, forced-colors.
 */
import { test, expect, scrollThrough } from './support/fixtures';
import { PAGES } from './support/site';
import { layoutAudit } from './support/audit';

const onlyOverflow = (issues: string[]) => issues.filter((i) => /Horizontaler Scroll|Ragt aus|Text läuft über/.test(i));

test.describe('Reflow und Zoom', () => {
  for (const p of PAGES) {
    test(`320 px und 200 % Zoom: ${p.id}`, async ({ page }, info) => {
      test.skip(!['laptop-chromium', 'laptop-webkit'].includes(info.project.name), 'Reflow-Prüfung auf Laptop-Profilen');
      // 320 CSS-Pixel Breite (= 1280 px bei 400 %)
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(p.path);
      await scrollThrough(page);
      let issues = onlyOverflow(await page.evaluate(layoutAudit, { mobile: true }));
      expect.soft(issues, `320 px:\n${issues.join('\n')}`).toEqual([]);
      // 200 % Zoom auf einem 1280-px-Fenster entspricht 640 CSS-Pixeln
      await page.setViewportSize({ width: 640, height: 450 });
      await page.reload();
      await scrollThrough(page);
      issues = onlyOverflow(await page.evaluate(layoutAudit, { mobile: true }));
      expect.soft(issues, `200 %:\n${issues.join('\n')}`).toEqual([]);
    });
  }
});

test.describe('Textabstände WCAG 1.4.12', () => {
  for (const p of PAGES.filter((x) => x.lang === 'hu' || x.key === 'home' || x.key === 'booking')) {
    test(`Textabstände: ${p.id}`, async ({ page }, info) => {
      test.skip(!['iphone-15-chromium', 'laptop-chromium'].includes(info.project.name), 'zwei Referenzprofile');
      await page.goto(p.path);
      await page.addStyleTag({
        content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }',
      });
      await scrollThrough(page);
      const issues = onlyOverflow(await page.evaluate(layoutAudit, { mobile: true }));
      expect(issues, issues.join('\n')).toEqual([]);
    });
  }
});

test('prefers-reduced-motion schaltet Bewegung ab', async ({ page }, info) => {
  test.skip(!info.project.name.startsWith('iphone-15'), 'iPhone-Profile');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const d = await page.locator('.btn').first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(d.split(',').every((x) => parseFloat(x) <= 0.00001)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  // Einblende-Elemente sind sofort sichtbar
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  const hiddenReveal = await page.evaluate(() => [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length);
  expect(hiddenReveal).toBe(0);
  // Sheet öffnet ohne Animation sofort
  await page.locator('[data-open="menu-sheet"]').click();
  await expect(page.locator('#menu-sheet')).toBeVisible();
});

test('forced-colors (Windows-Kontrastmodus): Bedienelemente bleiben erkennbar', async ({ page }, info) => {
  test.skip(info.project.name !== 'laptop-chromium', 'forced-colors nur in Chromium emulierbar');
  await page.emulateMedia({ forcedColors: 'active' });
  for (const path of ['/', '/termin-buchen/?leistung=gel-polish', '/kontakt/']) {
    await page.goto(path);
    const borders = await page.locator('.btn:visible').evaluateAll((els) => els.map((e) => getComputedStyle(e).borderStyle));
    expect(borders.every((b) => b !== 'none')).toBe(true);
    const issues = onlyOverflow(await page.evaluate(layoutAudit, { mobile: false }));
    expect(issues).toEqual([]);
  }
});
