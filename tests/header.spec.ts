/**
 * Kopfbereich (Bugfix-Runde 2): korrekte Flaggen im Sprachumschalter und Login-Button mit Demo-Hinweis.
 */
import type { Page } from '@playwright/test';
import { test, expect } from './support/fixtures';
import { routes } from '../src/i18n/routes';
import { LOCALES, LANG_META } from '../src/i18n/config';
import { dictionaries } from '../src/i18n';

const isDesktopNav = (page: Page) => page.viewportSize()!.width >= 1024;

/** liest die Farbe an relativen Positionen einer Flagge (Bild wird auf ein Canvas gezeichnet) */
async function flagColors(page: Page, src: string, points: [number, number][]): Promise<string[]> {
  return page.evaluate(
    async ({ src, points }) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = 300;
      c.height = 200;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0, 300, 200);
      return points.map(([x, y]) => {
        const [r, g, b] = ctx.getImageData(Math.round(x * 299), Math.round(y * 199), 1, 1).data;
        return `${r},${g},${b}`;
      });
    },
    { src, points },
  );
}

test.describe('Sprachumschalter: Flaggen', () => {
  const expected = { de: 'de', en: 'gb', hu: 'hu' } as const;
  for (const lang of LOCALES) {
    test(`Flagge im Kopfbereich und in der Auswahl (${lang})`, async ({ page }) => {
      await page.goto(routes.home.path[lang]);
      const btn = page.locator('.lang-btn');
      const img = btn.locator('img.flag');
      await expect(img).toHaveAttribute('src', `/flags/${expected[lang]}.svg`);
      // geladen, 3:2 ohne Verzerrung
      const info = await img.evaluate((e: HTMLImageElement) => ({ ok: e.complete && e.naturalWidth > 0, w: e.getBoundingClientRect().width, h: e.getBoundingClientRect().height }));
      expect(info.ok).toBe(true);
      expect(info.w / info.h).toBeCloseTo(1.5, 1);
      // Sprachname steht als Text daneben (außer auf sehr schmalen Handys unter 340 px)
      if (page.viewportSize()!.width >= 340) await expect(btn.locator('.lang-btn__name')).toHaveText(LANG_META[lang].label);

      // alle drei Flaggen in der Auswahl
      await btn.click();
      const sheet = page.locator('#lang-sheet');
      await expect(sheet).toBeVisible();
      for (const l of LOCALES) {
        const flag = sheet.locator(`a[data-lang-link="${l}"] img.lang-flag`);
        await expect(flag).toHaveAttribute('src', `/flags/${expected[l]}.svg`);
        await expect(flag).toHaveAttribute('alt', '');
        expect(await flag.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0)).toBe(true);
      }
    });
  }

  test('Deutsch ist Schwarz-Rot-Gold (nicht Österreich), Ungarn Rot-Weiß-Grün, England mit Union Jack', async ({ page }) => {
    await page.goto('/');
    expect(await flagColors(page, '/flags/de.svg', [[0.5, 0.1], [0.5, 0.5], [0.5, 0.9]])).toEqual(['0,0,0', '221,0,0', '255,206,0']);
    const hu = await flagColors(page, '/flags/hu.svg', [[0.5, 0.1], [0.5, 0.5], [0.5, 0.9]]);
    expect(hu[0]).toBe('206,41,57');
    expect(hu[1]).toBe('255,255,255');
    expect(hu[2]).toBe('71,112,80');
    // Union Jack: Mitte rot (Kreuz), die Felder zwischen den Armen blau
    const gb = await flagColors(page, '/flags/gb.svg', [[0.5, 0.5], [0.322, 0.133], [0.678, 0.867]]);
    expect(gb[0]).toBe('200,16,46');
    expect(gb[1]).toBe('1,33,105');
    expect(gb[2]).toBe('1,33,105');
    // die österreichische Flagge ist nicht mehr Teil der Seite
    const austria = 'at';
    const html = await (await page.request.get('/')).text();
    expect(html).not.toContain(`/flags/${austria}.svg`);
    expect((await page.request.get(`/flags/${austria}.svg`)).status()).toBe(404);
  });
});

test.describe('Login-Button', () => {
  for (const lang of LOCALES) {
    test(`Kopfbereich, Demo-Hinweis und Fokus (${lang})`, async ({ page }, info) => {
      const d = dictionaries[lang];
      await page.goto(routes.home.path[lang]);
      const login = page.locator('.site-header .login-btn');
      await expect(login).toBeVisible();
      await expect(login).toHaveAccessibleName(d.nav.login);

      const box = await login.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);

      // Reihenfolge am Desktop: Sprache, Login, Termin buchen; mobil: Sprache, Login, Menü
      const order = await page.locator('.site-header__actions > :visible').evaluateAll((els) => els.map((e) => (e.classList.contains('lang-btn') ? 'lang' : e.classList.contains('login-btn') ? 'login' : e.classList.contains('header-book') ? 'book' : e.classList.contains('menu-btn') ? 'menu' : '?')));
      expect(order).toEqual(isDesktopNav(page) ? ['lang', 'login', 'book'] : ['lang', 'login', 'menu']);

      // Demo-Modus: kein Sprung ins Leere, sondern Hinweis
      await login.click();
      const sheet = page.locator('#portal-sheet');
      await expect(sheet).toBeVisible();
      await expect(sheet.locator('.sheet__title')).toHaveText(d.portal.title);
      await expect(sheet).toContainText(d.portal.text);
      expect(page.url()).toContain(routes.home.path[lang]);

      if (isDesktopNav(page) || page.viewportSize()!.width >= 768) {
        // Popover am Desktop/Tablet: unterhalb des Kopfbereichs, innerhalb des Fensters (nach der Einblend-Animation)
        await page.waitForTimeout(400);
        const r = await sheet.boundingBox();
        expect(r!.y).toBeGreaterThanOrEqual(60);
        expect(r!.x + r!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      } else {
        // Bottom-Sheet am Handy: nach der Einblend-Animation unten verankert
        const vh = page.viewportSize()!.height;
        await expect.poll(async () => {
          const r = await sheet.boundingBox();
          return Math.round(Math.abs(r!.y + r!.height - vh));
        }).toBeLessThan(2);
      }

      // ESC schließt, Fokus kehrt zum Button zurück
      await page.keyboard.press('Escape');
      await expect(sheet).toBeHidden();
      await expect(login).toBeFocused();

      // und mit dem Schließen-Knopf
      await login.click();
      await expect(sheet).toBeVisible();
      await sheet.locator('.portal__close').click();
      await expect(sheet).toBeHidden();
      void info;
    });
  }

  test('Mobiles Menü: Eintrag „Anmelden“ schließt das Menü und zeigt den Hinweis', async ({ page }) => {
    test.skip(isDesktopNav(page), 'Menü-Sheet gibt es nur unter 1024 px');
    const d = dictionaries.de;
    await page.goto('/');
    const menuBtn = page.locator('.menu-btn');
    await menuBtn.click();
    const menu = page.locator('#menu-sheet');
    await expect(menu).toBeVisible();
    const entry = menu.locator('button.cell', { hasText: d.nav.login });
    await entry.scrollIntoViewIfNeeded();
    await entry.click();
    await expect(menu).toBeHidden();
    const sheet = page.locator('#portal-sheet');
    await expect(sheet).toBeVisible();
    await expect(sheet.locator('.sheet__title')).toHaveText(d.portal.title);
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    // Fokus liegt wieder auf dem Menü-Knopf
    await expect(menuBtn).toBeFocused();
  });

  test('Tastatur: Tab erreicht den Login-Button, Enter öffnet den Hinweis', async ({ page }, info) => {
    test.skip(!isDesktopNav(page) || info.project.use.browserName === 'webkit', 'Tab-Reihenfolge am Desktop (WebKit tabbt nicht auf Links/Buttons ohne Systemeinstellung)');
    await page.goto('/');
    await page.locator('.lang-btn').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.site-header .login-btn')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#portal-sheet')).toBeVisible();
  });
});
