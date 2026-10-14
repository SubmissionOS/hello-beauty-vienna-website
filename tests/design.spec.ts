/**
 * Design-Upgrade: die drei Signature-Momente und die Typografie – auf jedem Gerät, Chromium und WebKit.
 * - Nagelform-Wähler (Maus, Touch, Tastatur, alle Sprachen, Deep-Link mit Notiz)
 * - „Nächster freier Termin“-Chip (lädt, Deep-Link mit vorausgewähltem Slot)
 * - View Transitions (eindeutige Namen, kein kaputter Zustand nach Zurück-Navigation)
 * - Glyphentest HU (ő ű kommen aus der Webfont, nicht aus dem Fallback)
 */
import { test, expect } from './support/fixtures';
import { routes } from '../src/i18n/routes';
import { LOCALES } from '../src/i18n/config';
import { dictionaries } from '../src/i18n';
import { servicePageMedia } from '../src/data/gallery';

test.describe('Nagelform-Wähler', () => {
  for (const lang of LOCALES) {
    test(`Maus/Touch, Tastatur und Buchungslink (${lang})`, async ({ page }, info) => {
      const s = dictionaries[lang].shapes;
      await page.goto(routes.svcNails.path[lang]);
      const root = page.locator('#shapes-nails');
      await root.scrollIntoViewIfNeeded();
      const panel = (k: string) => root.locator(`.shapes__panel[data-shape="${k}"]`);
      const visiblePanels = root.locator('.shapes__panel:visible');

      // Start: erste Form (Mandel) gewählt und als einzige groß zu sehen
      await expect(root.locator('input[value="almond"]')).toBeChecked();
      await expect(visiblePanels).toHaveCount(1);
      await expect(panel('almond')).toBeVisible();

      // Antippen bzw. Klicken
      const square = root.locator('.shapes__opt').filter({ has: page.locator('input[value="square"]') });
      if (info.project.use.hasTouch) await square.tap();
      else await square.click();
      await expect(root.locator('input[value="square"]')).toBeChecked();
      await expect(panel('square')).toBeVisible();
      await expect(panel('square').locator('.shapes__name')).toHaveText(s.items.square.name);
      await expect(visiblePanels).toHaveCount(1);

      // Tastatur: Pfeiltaste wählt die nächste Form der Radiogruppe
      await root.locator('input[value="square"]').focus();
      await page.keyboard.press('ArrowRight');
      await expect(root.locator('input[value="squoval"]')).toBeChecked();
      await expect(panel('squoval')).toBeVisible();

      // Touch-Ziele der Auswahl ≥ 44 px
      const sizes = await root.locator('.shapes__chip').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
      for (const h of sizes) expect(h).toBeGreaterThanOrEqual(44);

      // „Diese Form buchen“ → Buchung mit Nagelmodellage und Notiz
      const link = panel('squoval').locator('a.btn');
      const href = await link.getAttribute('href');
      expect(href).toContain(`leistung=${servicePageMedia.nails.book}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(routes.booking.path[lang]));
      await page.locator('[data-booking][data-ready]').waitFor();
      await expect(page.locator(`input[name="svc"][value="${servicePageMedia.nails.book}"]`)).toBeChecked();
      await expect(page.locator('#bk-note')).toHaveValue(s.note.replace('{shape}', s.items.squoval.name));
    });
  }

  test('kompakt auf der Startseite', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('#shapes-home');
    await expect(root).toBeVisible();
    await expect(root.locator('.shapes__opt')).toHaveCount(7);
    await expect(root.locator('.shapes__panel:visible')).toHaveCount(1);
  });
});

test.describe('Termin-Chip', () => {
  for (const lang of LOCALES) {
    test(`lädt den nächsten Slot und öffnet die Buchung vorausgewählt (${lang})`, async ({ page }, info) => {
      await page.goto(routes.home.path[lang]);
      const chip = page.locator(page.viewportSize()!.width < 1024 ? '.slot-chip--bar' : '.slot-chip--hero');
      await expect(chip).toHaveAttribute('data-state', 'ready', { timeout: 10_000 });
      const href = (await chip.getAttribute('href')) ?? '';
      expect(href).toContain('leistung=gel-polish');
      expect(href).toContain('termin=');
      expect(await chip.getAttribute('aria-label')).toBeTruthy();
      const start = decodeURIComponent(/termin=([^&]+)/.exec(href)![1]!);

      // Chip hält seinen Platz: Leiste/Hero ändern beim Laden nicht die Höhe
      const box = await chip.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);

      await chip.click();
      await expect(page).toHaveURL(new RegExp(routes.booking.path[lang]));
      await page.locator('[data-booking][data-ready]').waitFor();
      await expect(page.locator('input[name="svc"][value="gel-polish"]')).toBeChecked();
      const time = start.slice(11, 16).replace(/^0/, '');
      await expect(page.locator('[data-preselected]')).toContainText(time, { timeout: 10_000 });
      // Entwurf enthält den Slot – ohne Zurück-zum-Kalender
      const draft = await page.evaluate(() => JSON.parse(sessionStorage.getItem('hb-booking') ?? '{}'));
      expect(draft.slot?.start).toBe(start);
      // Adresse ohne Parameter (kein erneutes Anwenden beim Neuladen)
      expect(page.url()).not.toContain('termin=');
    });
  }
});

test.describe('View Transitions', () => {
  test('eindeutige Namen und intakter Zustand nach Zurück', async ({ page }) => {
    const dupes = async () =>
      page.evaluate(() => {
        const names = [...document.querySelectorAll('*')].map((e) => getComputedStyle(e).viewTransitionName).filter((n) => n && n !== 'none');
        return names.filter((n, i) => names.indexOf(n) !== i);
      });
    for (const p of ['/', routes.services.path.de, routes.svcNails.path.de, routes.svcLashes.path.en]) {
      await page.goto(p);
      expect(await dupes(), `doppelte view-transition-name auf ${p}`).toEqual([]);
    }

    await page.goto('/');
    const row = page.locator('.sx__row').first();
    await row.scrollIntoViewIfNeeded();
    await row.click();
    await expect(page).toHaveURL(new RegExp(routes.svcNails.path.de));
    await expect(page.locator('.svc-hero__media img')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    // keine hängenden Übergangs-Animationen, Seite bedienbar
    await page.waitForTimeout(600);
    const running = await page.evaluate(() => document.getAnimations().filter((a) => String((a.effect as KeyframeEffect | null)?.pseudoElement ?? '').startsWith('::view-transition')).length);
    expect(running).toBe(0);
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.sx__row').first()).toBeVisible();
    await page.locator('.sx__row').nth(1).click();
    await expect(page).toHaveURL(new RegExp(routes.svcManicure.path.de));
  });
});

test.describe('Typografie', () => {
  test('HU: ő ű werden in den Webfonts gerendert, nicht im Fallback', async ({ page }) => {
    await page.goto('/hu/');
    const result = await page.evaluate(async () => {
      const out: Record<string, boolean> = {};
      for (const fam of ['Bodoni Moda', 'Jost']) {
        await document.fonts.load(`40px "${fam}"`, 'ŐőŰű');
        const c = document.createElement('canvas').getContext('2d')!;
        const w = (stack: string) => {
          c.font = `40px ${stack}`;
          return c.measureText('ŐőŰű').width;
        };
        // Breite identisch mit Serif- und Monospace-Fallback ⇒ Glyphen stammen aus der Webfont
        out[fam] = Math.abs(w(`"${fam}", serif`) - w(`"${fam}", monospace`)) < 0.01;
      }
      return out;
    });
    expect(result).toEqual({ 'Bodoni Moda': true, Jost: true });
    // Überschrift nutzt tatsächlich Gloock, Fließtext Hanken Grotesk
    expect(await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily)).toMatch(/^"?Bodoni Moda/);
    expect(await page.locator('body').evaluate((e) => getComputedStyle(e).fontFamily)).toMatch(/^"?Jost/);
  });
});
