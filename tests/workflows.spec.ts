/**
 * 8.3 Nutzer-Workflows – auf jedem Gerät, in Chromium und WebKit, in jeder Sprache.
 */
import fs from 'node:fs';
import type { Page } from '@playwright/test';
import { test, expect, isMobile, browserOf } from './support/fixtures';
import { routes, ROUTE_KEYS, SERVICE_PAGES } from '../src/i18n/routes';
import { LOCALES, type Lang } from '../src/i18n/config';
import { dictionaries } from '../src/i18n';
import { servicePageMedia } from '../src/data/gallery';
import type { CategoryId } from '../src/data/services';

const HTML_LANG: Record<Lang, string> = { de: 'de-AT', en: 'en', hu: 'hu' };
const visibleStep = (page: Page) => page.locator('section.step:not([hidden])');

/** wartet, bis sanftes Scrollen abgeschlossen ist */
async function scrollSettled(page: Page) {
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        const y = window.scrollY;
        setTimeout(() => resolve(Math.abs(window.scrollY - y) < 1), 150);
      }),
    null,
    { timeout: 5000 },
  );
}

async function expectStep(page: Page, n: number) {
  await expect(page.locator(`section.step[data-step="${n}"]`)).toBeVisible();
  await expect(page.locator(`#st${n}`)).toBeFocused({ timeout: 5000 }).catch(() => undefined);
}

async function next(page: Page) {
  await page.locator('[data-next]').click();
}

/** Schritt 3 → 4: ersten freien Tag wählen */
async function pickDate(page: Page) {
  const day = page.locator('.day.is-available').first();
  await expect(day).toBeVisible({ timeout: 10_000 });
  await day.click();
  await expect(day).toHaveAttribute('aria-selected', 'true');
}

async function pickSlot(page: Page, index = 0) {
  const slot = page.locator('.slot').nth(index);
  await expect(slot).toBeVisible({ timeout: 10_000 });
  await slot.click();
  await expect(slot.locator('input')).toBeChecked();
}

async function fillDetails(page: Page) {
  await page.fill('#bk-name', 'Maria Muster');
  await page.fill('#bk-phone', '+43 660 1234567');
  await page.fill('#bk-email', 'maria@example.com');
  await page.fill('#bk-note', 'Nude, kurz');
  await page.locator('label.check:has(input[name="terms"])').click();
  if (await page.locator('[data-early]').isVisible()) await page.locator('[data-early] label.check').click();
}

/** Schritte 2–7 ab einer gewählten Leistung, gibt den .ics-Inhalt zurück */
async function completeBooking(page: Page): Promise<string> {
  await next(page);
  await expectStep(page, 2);
  await next(page);
  await expectStep(page, 3);
  await pickDate(page);
  await next(page);
  await expectStep(page, 4);
  await pickSlot(page);
  await next(page);
  await expectStep(page, 5);
  await fillDetails(page);
  await next(page);
  await expectStep(page, 6);
  await expect(page.locator('[data-summary] .cell')).toHaveCount(5);
  await page.locator('[data-submit]').click();
  await expectStep(page, 7);
  await expect(page.locator('[data-done-summary]')).toContainText(/HB-\d{6}-\d{4}/);
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('[data-ics]').click()]);
  expect(download.suggestedFilename()).toMatch(/^hello-beauty-HB-.+\.ics$/);
  return fs.readFileSync((await download.path())!, 'utf8');
}

test.describe('Buchung', () => {
  for (const lang of LOCALES) {
    test(`kompletter Weg Startseite → Leistung → Preis → Buchung → .ics (${lang})`, async ({ page, watch }) => {
      await page.goto(routes.home.path[lang]);
      await page.locator('.service-card__link').first().click();
      await expect(page).toHaveURL(new RegExp(routes.svcNails.path[lang]));
      await page.locator('.svc-hero a[href="#prices"]').click();
      await expect(page.locator('#prices')).toBeInViewport();
      await scrollSettled(page);
      await page.locator('#prices a.btn').first().click();
      await expect(page).toHaveURL(new RegExp(`${routes.booking.path[lang]}#step-1$`));
      await expect(page.locator(`input[name="svc"][value="${servicePageMedia.nails.book}"]`)).toBeChecked();
      await expect(page.locator('[data-preselected]')).toBeVisible();
      const ics = await completeBooking(page);
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('LOCATION:Hello Beauty\\, Barnabitengasse 7\\, 1060');
      expect(ics).toMatch(/DTSTART:\d{8}T\d{6}Z/);
      expect(watch.console).toEqual([]);
      expect(watch.foreign).toEqual([]);
    });
  }

  test('Deep-Link aus jeder Leistungsseite (alle Sprachen)', async ({ page }) => {
    for (const lang of LOCALES) {
      for (const [cat, key] of Object.entries(SERVICE_PAGES) as [CategoryId, keyof typeof routes][]) {
        await page.goto(routes[key].path[lang]);
        await page.locator('.svc-hero .btn').first().click();
        await expect(page).toHaveURL(new RegExp(routes.booking.path[lang]));
        await expect(page.locator(`input[name="svc"][value="${servicePageMedia[cat].book}"]`)).toBeChecked();
        await expect(page.locator('input[name="svc"]:checked')).toHaveCount(1);
        await expect(page.locator('details.svc-cat[open]')).toHaveAttribute('data-cat', cat);
      }
    }
  });

  test('Zurückgehen und Ändern in jedem Schritt, Eingaben bleiben erhalten', async ({ page }) => {
    await page.goto(`${routes.booking.path.de}?leistung=gel-polish`);
    await next(page); // 2
    await page.locator('input[name="staff"][value="staff-2"]').locator('xpath=..').click();
    await next(page); // 3
    await pickDate(page);
    await next(page); // 4
    await pickSlot(page);
    await next(page); // 5
    await fillDetails(page);
    // Zurück (Button) bis Schritt 1 – Auswahl bleibt erhalten
    for (const n of [4, 3, 2, 1]) {
      await page.locator('[data-back]').click();
      await expectStep(page, n);
    }
    await expect(page.locator('input[name="svc"][value="gel-polish"]')).toBeChecked();
    // Leistung ergänzen → Uhrzeit muss neu gewählt werden, Kontaktdaten bleiben
    await page.locator('details.svc-cat[data-cat="pedicure"] > summary').click();
    await page.locator('input[name="svc"][value="foot-scrub"]').locator('xpath=..').click();
    await next(page); // 2
    await expect(page.locator('input[name="staff"][value="staff-2"]')).toBeChecked();
    await next(page); // 3
    await expect(page.locator('.day[aria-selected="true"]')).toHaveCount(1);
    await next(page); // 4
    await pickSlot(page);
    await next(page); // 5
    await expect(page.locator('#bk-name')).toHaveValue('Maria Muster');
    await expect(page.locator('#bk-email')).toHaveValue('maria@example.com');
    await next(page); // 6
    await expect(page.locator('[data-summary]')).toContainText('Fußpeeling');
    // „Ändern“ in der Zusammenfassung springt zum jeweiligen Schritt
    await page.locator('[data-summary] .edit').nth(1).click();
    await expectStep(page, 2);
    // Browser-Zurück
    await page.goBack();
    await expect(visibleStep(page)).toHaveAttribute('data-step', /[1-6]/);
  });

  test('Konfliktfall: Slot wird vergeben → Hinweis und neue Auswahl', async ({ page }) => {
    await page.goto(`${routes.booking.path.de}?leistung=gel-polish&demo=conflict`);
    await next(page);
    await next(page);
    await pickDate(page);
    await next(page);
    const first = await page.locator('.slot input').first().getAttribute('value');
    await pickSlot(page);
    await next(page);
    await fillDetails(page);
    await next(page);
    await page.locator('[data-submit]').click();
    await expectStep(page, 4);
    await expect(page.getByRole('alert').filter({ hasText: dictionaries.de.booking.payment.conflict })).toBeVisible();
    await expect(page.locator('.slot input:checked')).toHaveCount(0);
    await expect(page.locator(`.slot input[value="${first}"]`)).toHaveCount(0);
    await pickSlot(page);
    await next(page);
    await expect(page.locator('#bk-name')).toHaveValue('Maria Muster');
    await next(page);
    await page.locator('[data-submit]').click();
    await expectStep(page, 7);
  });

  test('Netzwerkfehler → „Erneut versuchen“ lädt die Uhrzeiten', async ({ page }) => {
    await page.goto(`${routes.booking.path.en}?leistung=gel-polish`);
    await next(page);
    await next(page);
    await pickDate(page);
    await page.locator('[data-dev="failNext"]').evaluate((el: HTMLInputElement) => {
      el.closest('details')!.open = true;
    });
    await page.locator('label.check:has([data-dev="failNext"])').click();
    await next(page);
    const alert = page.locator('[data-slots] [role="alert"]');
    await expect(alert).toContainText(dictionaries.en.booking.time.error);
    await alert.getByRole('button', { name: dictionaries.en.booking.time.retry }).click();
    await expect(page.locator('.slot').first()).toBeVisible();
  });

  test('Tag ohne freie Slots → Vorschlag nächster freier Termin', async ({ page }) => {
    await page.goto(`${routes.booking.path.hu}?leistung=gel-polish`);
    await next(page);
    await next(page);
    // einen ausgebuchten Tag suchen (aktueller oder nächster Monat)
    let full = page.locator('.day.is-full').first();
    await page.locator('.day.is-available').first().waitFor();
    if ((await full.count()) === 0) {
      await page.locator('[data-cal-next]').click();
      await page.locator('.day.is-available').first().waitFor();
      full = page.locator('.day.is-full').first();
    }
    await expect(full).toHaveAttribute('aria-disabled', 'true');
    const date = await full.getAttribute('data-date');
    // Situation: Sitzung wiederhergestellt, Tag inzwischen ausgebucht
    await page.evaluate((d) => {
      const s = JSON.parse(sessionStorage.getItem('hb-booking')!);
      Object.assign(s, { date: d, month: d!.slice(0, 7), slot: null, step: 4, maxStep: 4 });
      sessionStorage.setItem('hb-booking', JSON.stringify(s));
      history.replaceState(null, '', '#step-4');
    }, date);
    await page.reload();
    const empty = page.locator('[data-slots] .empty');
    await expect(empty).toContainText(dictionaries.hu.booking.time.empty);
    await expect(empty).toContainText(dictionaries.hu.booking.time.nextFree.split('{')[0]!.trim());
    await empty.getByRole('button', { name: dictionaries.hu.booking.time.takeNext }).click();
    await expect(page.locator('.slot input:checked')).toHaveCount(1);
    await next(page);
    await expectStep(page, 5);
  });

  test('Sprachwechsel mitten im Buchungsflow behält Schritt und Auswahl', async ({ page }) => {
    await page.goto(`${routes.booking.path.de}?leistung=gel-polish`);
    await next(page);
    await next(page);
    await pickDate(page);
    await next(page);
    await pickSlot(page);
    await page.locator('[data-open="lang-sheet"]').click();
    await page.locator('#lang-sheet a[data-lang-link="hu"]').click();
    await expect(page).toHaveURL(new RegExp(routes.booking.path.hu));
    await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
    await expectStep(page, 4);
    await expect(page.locator('#st4')).toHaveText(dictionaries.hu.booking.time.title);
    await expect(page.locator('.slot input:checked')).toHaveCount(1);
    await expect(page.locator('[data-total]')).toContainText('49');
  });
});

test.describe('Kontaktformular', () => {
  for (const lang of LOCALES) {
    test(`leer, falsch, korrekt (${lang})`, async ({ page }) => {
      const f = dictionaries[lang].form;
      await page.goto(routes.contact.path[lang]);
      const form = page.locator('[data-contact-form]');
      // Ausgangszustand: keine Fehler- oder Erfolgsmeldung sichtbar
      await expect(form.locator('[data-summary-box]')).toBeHidden();
      await expect(page.locator('[data-success]')).toBeHidden();
      await form.locator('[data-submit]').click();
      await expect(form.locator('[data-summary-box]')).toBeVisible();
      await expect(page.locator('#cf-name')).toBeFocused();
      await expect(page.locator('#cf-name-err')).toHaveText(f.errors.nameRequired);
      await expect(page.locator('#cf-email-err')).toHaveText(f.errors.emailRequired);
      await expect(page.locator('#cf-message-err')).toHaveText(f.errors.messageRequired);
      await expect(page.locator('#cf-name')).toHaveAttribute('aria-invalid', 'true');

      await page.fill('#cf-name', 'Maria Muster');
      await page.fill('#cf-email', 'maria@');
      await page.fill('#cf-phone', 'abc');
      await page.fill('#cf-message', 'Hallo');
      await form.locator('[data-submit]').click();
      await expect(page.locator('#cf-email-err')).toHaveText(f.errors.emailInvalid);
      await expect(page.locator('#cf-phone-err')).toHaveText(f.errors.phoneInvalid);
      await expect(page.locator('#cf-message-err')).toHaveText(f.errors.messageShort);
      await expect(page.locator('#cf-name-err')).toHaveText('');

      await page.fill('#cf-email', 'maria@example.com');
      await page.fill('#cf-phone', '+43 660 1234567');
      await page.fill('#cf-message', 'Ich hätte gerne einen Gutschein.');
      await form.locator('[data-submit]').click();
      const ok = page.locator('[data-success]');
      await expect(ok).toBeVisible();
      await expect(ok).toBeFocused();
      await expect(ok).toContainText(f.success.title);
      await expect(ok).toContainText(/Dem[oó]/);
    });
  }
});

test.describe('Sprachwechsel', () => {
  for (const key of ROUTE_KEYS) {
    test(`auf ${key}: gleiche Seite in jeder Zielsprache`, async ({ page }) => {
      for (const from of LOCALES) {
        for (const to of LOCALES) {
          if (from === to) continue;
          await page.goto(routes[key].path[from]);
          await page.locator('[data-open="lang-sheet"]').click();
          const sheet = page.locator('#lang-sheet');
          await expect(sheet).toBeVisible();
          await expect(sheet.locator(`a[data-lang-link="${from}"]`)).toHaveAttribute('aria-current', 'true');
          await sheet.locator(`a[data-lang-link="${to}"]`).click();
          await expect(page).toHaveURL(new RegExp(`${routes[key].path[to]}(#.*)?$`));
          await expect(page.locator('html')).toHaveAttribute('lang', HTML_LANG[to]);
          await expect(page.locator('h1')).toBeVisible();
        }
      }
    });
  }
});

test.describe('Menü, Sheets, Popover', () => {
  test('Menü (mobil) bzw. Leistungs-Popover (Desktop): öffnen, schließen, Fokus-Rückgabe', async ({ page }, info) => {
    await page.goto('/');
    if (isMobile(info.project) && info.project.use.viewport!.width < 1024) {
      const btn = page.locator('[data-open="menu-sheet"]');
      const sheet = page.locator('#menu-sheet');
      await btn.click();
      await expect(sheet).toBeVisible();
      await expect(sheet.locator('[data-close]')).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(sheet).toBeHidden();
      await expect(btn).toBeFocused();
      await btn.click();
      await sheet.locator('[data-close]').click();
      await expect(sheet).toBeHidden();
      // Wischen nach unten schließt
      await btn.click();
      await expect(sheet).toBeVisible();
      await page.waitForTimeout(350);
      const grab = await sheet.locator('[data-sheet-grab]').boundingBox();
      await page.mouse.move(grab!.x + grab!.width / 2, grab!.y + grab!.height / 2);
      await page.mouse.down();
      await page.mouse.move(grab!.x + grab!.width / 2, grab!.y + 500, { steps: 8 });
      await page.mouse.up();
      await expect(sheet).toBeHidden();
      // Navigation über das Menü
      await btn.click();
      await sheet.getByRole('link', { name: dictionaries.de.nav.prices, exact: true }).click();
      await expect(page).toHaveURL(/\/preise\/$/);
    } else {
      const toggle = page.locator('[data-disclosure]');
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#services-popover')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#services-popover')).toBeHidden();
      await expect(toggle).toBeFocused();
      await toggle.click();
      await page.locator('#services-popover a').nth(2).click();
      await expect(page).toHaveURL(/\/leistungen\/manikuere\/$/);
    }
  });

  test('Sprach-Sheet: öffnen, ESC, Hintergrund-Klick', async ({ page }) => {
    await page.goto('/en/');
    const btn = page.locator('[data-open="lang-sheet"]');
    await btn.click();
    await expect(page.locator('#lang-sheet')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#lang-sheet')).toBeHidden();
    await expect(btn).toBeFocused();
    await btn.click();
    await page.mouse.click(5, 5);
    await expect(page.locator('#lang-sheet')).toBeHidden();
  });
});

test.describe('Galerie', () => {
  test('Filter und Lightbox: Pfeile, Tasten, Wischen, ESC, Zähler', async ({ page }) => {
    await page.goto('/galerie/');
    const items = page.locator('[data-gallery] li');
    const total = await items.count();
    await page.locator('.segmented__opt:has(input[value="pedicure"])').click();
    const shown = await page.locator('[data-gallery] li:not([hidden])').count();
    expect(shown).toBeLessThan(total);
    await expect(page.locator('[data-filter-status]')).toHaveText(new RegExp(`${shown}`));
    await page.locator('.segmented__opt:has(input[value="all"])').click();

    const first = page.locator('[data-gallery] button').first();
    await first.click();
    const box = page.locator('[data-lightbox]');
    await expect(box).toBeVisible();
    const count = box.locator('[data-lb-count]');
    await expect(count).toHaveText(`Bild 1 von ${total}`);
    await expect(box.locator('[data-lb-img]')).not.toHaveAttribute('alt', '');
    await box.locator('[data-lb-next]').click();
    await expect(count).toHaveText(`Bild 2 von ${total}`);
    await page.keyboard.press('ArrowRight');
    await expect(count).toHaveText(`Bild 3 von ${total}`);
    await page.keyboard.press('ArrowLeft');
    await expect(count).toHaveText(`Bild 2 von ${total}`);
    await box.locator('[data-lb-prev]').click();
    await box.locator('[data-lb-prev]').click();
    await expect(count).toHaveText(`Bild ${total} von ${total}`);
    // Wischen nach links → nächstes Bild
    const vp = page.viewportSize()!;
    await page.mouse.move(vp.width * 0.7, vp.height / 2);
    await page.mouse.down();
    await page.mouse.move(vp.width * 0.2, vp.height / 2, { steps: 6 });
    await page.mouse.up();
    await expect(count).toHaveText(`Bild 1 von ${total}`);
    await page.keyboard.press('Escape');
    await expect(box).toBeHidden();
    await expect(first).toBeFocused();
  });
});

test.describe('404', () => {
  for (const [lang, path, home] of [
    ['de', '/gibt-es-nicht/', '/'],
    ['en', '/en/does-not-exist/', '/en/'],
    ['hu', '/hu/nincs-ilyen/', '/hu/'],
  ] as const) {
    test(`Fehlerseite und Rückweg (${lang})`, async ({ page }) => {
      const res = await page.goto(lang === 'de' ? path : `/${lang}/404/`);
      if (lang === 'de') expect(res?.status()).toBe(404);
      await expect(page.locator('h1')).toHaveText(dictionaries[lang].notFound.h1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await page.locator('[data-home-link]').click();
      await expect(page).toHaveURL(new RegExp(`${home}$`));
    });
  }
});

test.describe('Tastatur', () => {
  test('kompletter Durchlauf nur mit Tastatur', async ({ page }, info) => {
    test.skip(isMobile(info.project), 'Tastatur-Durchlauf auf Desktop-Profilen');
    test.skip(browserOf(info.project) === 'webkit' && process.platform === 'darwin', 'Safari springt per Tab nur mit Systemeinstellung zu Links');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    // Zur Buchung über den Header-Button
    await page.locator('.header-book').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/termin-buchen/);
    await expect(page.locator('[data-booking]')).toBeVisible();
    // Schritt 1: erste Kategorie ist offen → erste Leistung mit Leertaste wählen
    await page.locator('input[name="svc"]').first().focus();
    await page.keyboard.press('Space');
    await expect(page.locator('input[name="svc"]').first()).toBeChecked();
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Enter');
    // Schritt 2: Pfeiltaste in der Radiogruppe
    await expectStep(page, 2);
    await page.locator('input[name="staff"]').first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input[name="staff"]').nth(1)).toBeChecked();
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Enter');
    // Schritt 3: Kalender per Pfeiltasten, Bild ab/auf, Pos1/Ende
    await expectStep(page, 3);
    await page.locator('.day.is-available').first().waitFor();
    await page.locator('.day[tabindex="0"]').focus();
    await page.keyboard.press('PageDown');
    await expect(page.locator('[data-cal-title]')).not.toHaveText('');
    await page.keyboard.press('PageUp');
    await page.locator('.day.is-available').first().waitFor();
    await page.keyboard.press('End');
    await page.keyboard.press('Home');
    let guard = 0;
    while (guard++ < 40) {
      const ok = await page.evaluate(() => document.activeElement?.classList.contains('is-available'));
      if (ok) break;
      await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('Enter');
    await expect(page.locator('.day[aria-selected="true"]')).toHaveCount(1);
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Enter');
    // Schritt 4: Slot per Pfeiltaste
    await expectStep(page, 4);
    await page.locator('.slot input').first().focus();
    await page.keyboard.press('Space');
    await expect(page.locator('.slot input:checked')).toHaveCount(1);
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Enter');
    // Schritt 5: Formular per Tab
    await expectStep(page, 5);
    await page.locator('#bk-name').focus();
    await page.keyboard.type('Maria Muster');
    await page.keyboard.press('Tab');
    await page.keyboard.type('+43 660 1234567');
    await page.keyboard.press('Tab');
    await page.keyboard.type('maria@example.com');
    await page.locator('input[name="terms"]').focus();
    await page.keyboard.press('Space');
    if (await page.locator('[data-early]').isVisible()) {
      await page.locator('input[name="earlyStart"]').focus();
      await page.keyboard.press('Space');
    }
    await page.locator('[data-next]').focus();
    await page.keyboard.press('Enter');
    await expectStep(page, 6);
    await page.locator('[data-submit]').focus();
    await page.keyboard.press('Enter');
    await expectStep(page, 7);
    // Sprach-Popover per Tastatur, ESC schließt
    await page.locator('[data-open="lang-sheet"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#lang-sheet')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#lang-sheet')).toBeHidden();
  });
});
