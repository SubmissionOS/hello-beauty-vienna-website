/**
 * Konsistenz (Bugfix-Runde 2):
 * 1. Sprachparität: Spalten und Bilder liegen in DE, EN und HU an derselben Stelle. Unterschiedlich lange Texte
 *    dürfen das Raster nicht verschieben (Klasse des Hero-Fehlers). Verglichen werden Position und Breite aller
 *    sichtbaren Bilder im Hauptbereich, nicht ihre Höhe oder vertikale Lage (die hängt vom Text ab).
 * 2. Ausrichtung: Die Hauptüberschrift jeder Seite steht bündig mit dem Logo (gleiche linke Kante auf allen Seiten).
 */
import type { Page } from '@playwright/test';
import { test, expect } from './support/fixtures';
import { ROUTE_KEYS, routes } from '../src/i18n/routes';
import { LOCALES } from '../src/i18n/config';

async function imageColumns(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const out: string[] = [];
    for (const img of document.querySelectorAll<HTMLImageElement>('main img')) {
      const cs = getComputedStyle(img);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (img.closest('[hidden], dialog:not([open]), details:not([open]) > :not(summary)')) continue;
      const r = img.getBoundingClientRect();
      if (r.width < 8) continue;
      // nur Bilder im Hauptbereich, die nicht von Textmenge abhängen: Position links und Breite
      out.push(`${Math.round(r.left)}|${Math.round(r.width)}`);
    }
    return out;
  });
}

test.describe('Konsistenz', () => {
  for (const key of ROUTE_KEYS) {
    test(`Sprachparität der Bildspalten: ${key}`, async ({ page }) => {
      const per: Record<string, string[]> = {};
      for (const lang of LOCALES) {
        await page.goto(routes[key].path[lang]);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(100);
        per[lang] = await imageColumns(page);
      }
      const ref = per.de!;
      for (const lang of ['en', 'hu'] as const) {
        const got = per[lang]!;
        expect(got.length, `Anzahl sichtbarer Bilder ${key} ${lang} vs. de`).toBe(ref.length);
        const diffs = ref
          .map((r, i) => {
            const [l1, w1] = r.split('|').map(Number) as [number, number];
            const [l2, w2] = got[i]!.split('|').map(Number) as [number, number];
            return Math.abs(l1 - l2) > 2 || Math.abs(w1 - w2) > 2 ? `Bild ${i + 1}: de ${r} ≠ ${lang} ${got[i]}` : '';
          })
          .filter(Boolean);
        expect(diffs, `Bildspalten ${key}: ${lang} weicht von de ab`).toEqual([]);
      }
    });
  }

  for (const lang of LOCALES) {
    test(`Überschrift bündig mit dem Logo auf jeder Seite (${lang})`, async ({ page }) => {
      const misaligned: string[] = [];
      for (const key of ROUTE_KEYS) {
        await page.goto(routes[key].path[lang]);
        const r = await page.evaluate(() => {
          const logo = document.querySelector('.brand')!.getBoundingClientRect().left;
          const h1 = document.querySelector('h1')!.getBoundingClientRect().left;
          return { logo, h1 };
        });
        if (Math.abs(r.logo - r.h1) > 2) misaligned.push(`${key}: Logo ${Math.round(r.logo)} · h1 ${Math.round(r.h1)}`);
      }
      expect(misaligned, 'h1 nicht bündig mit dem Logo').toEqual([]);
    });
  }
});
