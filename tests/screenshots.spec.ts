/**
 * 8.5 Screenshots für die visuelle Sichtprüfung (nur mit SHOTS=1):
 * jede Seite × Sprache × Gerät (ganze Seite) in Chromium, zusätzlich WebKit auf iPhone 15,
 * dazu jeder Buchungsschritt, offene Menüs, Sheets, Lightbox, Fehler- und Leerzustände.
 * Ablage: docs/qa/screenshots/<gerät>[-webkit]/<sprache>/<seite>.png
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { test, expect, deviceOf, browserOf, isMobile, scrollThrough, waitImages } from './support/fixtures';
import { PAGES } from './support/site';
import { routes } from '../src/i18n/routes';
import { LOCALES } from '../src/i18n/config';

test.skip(!process.env.SHOTS, 'Screenshots nur mit SHOTS=1');

const dirFor = (info: Parameters<Parameters<typeof test>[1]>[1], lang: string) => {
  const dev = deviceOf(info.project) + (browserOf(info.project) === 'webkit' ? '-webkit' : '');
  const dir = path.join('docs', 'qa', 'screenshots', dev, lang);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const wanted = (info: Parameters<Parameters<typeof test>[1]>[1]) =>
  browserOf(info.project) === 'chromium' || deviceOf(info.project) === 'iphone-15';

async function full(page: Page, file: string) {
  await scrollThrough(page);
  await waitImages(page);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
}

for (const p of PAGES) {
  test(`Screenshot ${p.id}`, async ({ page }, info) => {
    test.skip(!wanted(info), 'Chromium alle Geräte, WebKit iPhone 15');
    await page.goto(p.path);
    await full(page, path.join(dirFor(info, p.lang), `${p.key}.png`));
  });
}

for (const lang of LOCALES) {
  test(`Screenshots Zustände ${lang}`, async ({ page }, info) => {
    test.skip(!wanted(info), 'Chromium alle Geräte, WebKit iPhone 15');
    const dir = dirFor(info, lang);
    const shot = (name: string) => page.screenshot({ path: path.join(dir, `zustand-${name}.png`), animations: 'disabled' });
    const B = routes.booking.path[lang];

    // Buchungsschritte
    await page.goto(`${B}?leistung=gel-polish`);
    await shot('buchung-1-leistung');
    await page.locator('[data-next]').click();
    await shot('buchung-2-mitarbeiterin');
    await page.locator('[data-next]').click();
    await page.locator('.day.is-available').first().waitFor();
    await shot('buchung-3-datum');
    await page.locator('.day.is-available').first().click();
    await page.locator('[data-next]').click();
    await page.locator('[data-slots] .skeleton').waitFor().catch(() => undefined);
    await shot('buchung-4-laden');
    await page.locator('.slot').first().waitFor();
    await shot('buchung-4-uhrzeit');
    await page.locator('.slot').first().click();
    await page.locator('[data-next]').click();
    await page.locator('[data-next]').click();
    await shot('buchung-5-fehler');
    await page.fill('#bk-name', 'Maria Muster');
    await page.fill('#bk-phone', '+43 660 1234567');
    await page.fill('#bk-email', 'maria@example.com');
    await page.locator('label.check:has(input[name="terms"])').click();
    if (await page.locator('[data-early]').isVisible()) await page.locator('[data-early] label.check').click();
    await shot('buchung-5-daten');
    await page.locator('[data-next]').click();
    await shot('buchung-6-zahlung');
    await page.locator('[data-submit]').click();
    await page.locator('#st7').waitFor();
    await shot('buchung-7-bestaetigung');

    // Fehlerzustand Uhrzeiten
    await page.goto(`${B}?leistung=gel-polish&demo=network`);
    await page.locator('[data-next]').click();
    await page.locator('[data-next]').click();
    await page.locator('.day.is-available').first().click();
    await page.locator('[data-next]').click();
    await page.locator('[data-slots] [role="alert"]').waitFor();
    await shot('buchung-4-fehler');

    // Leerzustand
    await page.locator('[data-back]').click();
    let full = page.locator('.day.is-full').first();
    if (!(await full.count())) {
      await page.locator('[data-cal-next]').click();
      await page.locator('.day.is-available').first().waitFor();
      full = page.locator('.day.is-full').first();
    }
    const date = await full.getAttribute('data-date');
    await page.evaluate((d) => {
      const s = JSON.parse(sessionStorage.getItem('hb-booking')!);
      Object.assign(s, { date: d, month: d!.slice(0, 7), slot: null, step: 4, maxStep: 4 });
      sessionStorage.setItem('hb-booking', JSON.stringify(s));
      history.replaceState(null, '', '#step-4');
    }, date);
    await page.reload();
    await page.locator('[data-slots] .empty').waitFor();
    await shot('buchung-4-leer');

    // Konflikt
    await page.evaluate(() => sessionStorage.clear());
    await page.goto(`${B}?leistung=gel-polish&demo=conflict`);
    await page.locator('[data-next]').click();
    await page.locator('[data-next]').click();
    await page.locator('.day.is-available').first().click();
    await page.locator('[data-next]').click();
    await page.locator('.slot').first().click();
    await page.locator('[data-next]').click();
    await page.locator('[data-next]').click();
    await page.locator('[data-submit]').click();
    await page.locator('[role="alert"].notice--error').first().waitFor();
    await shot('buchung-konflikt');

    // Menü, Sprach-Sheet, Popover
    await page.goto(routes.home.path[lang]);
    if (isMobile(info.project) && page.viewportSize()!.width < 1024) {
      await page.locator('[data-open="menu-sheet"]').click();
      await page.waitForTimeout(400);
      await shot('menue-offen');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    } else {
      await page.locator('[data-disclosure]').click();
      await shot('leistungen-popover');
      await page.keyboard.press('Escape');
    }
    await page.locator('[data-open="lang-sheet"]').click();
    await page.waitForTimeout(400);
    await shot('sprache-offen');
    await page.keyboard.press('Escape');

    // Lightbox
    await page.goto(routes.gallery.path[lang]);
    await page.locator('[data-gallery] button').nth(1).click();
    await page.locator('[data-lb-img]').evaluate((img: HTMLImageElement) => img.decode().catch(() => undefined));
    await page.waitForTimeout(300);
    await shot('lightbox');
    await page.keyboard.press('Escape');

    // Kontaktformular: Fehler und Erfolg
    await page.goto(routes.contact.path[lang]);
    await page.locator('[data-contact-form] [data-submit]').click();
    await page.locator('#message').scrollIntoViewIfNeeded();
    await shot('kontakt-fehler');
    await page.fill('#cf-name', 'Maria Muster');
    await page.fill('#cf-email', 'maria@example.com');
    await page.fill('#cf-message', 'Ich hätte gerne einen Gutschein.');
    await page.locator('[data-contact-form] [data-submit]').click();
    await page.locator('[data-success]').waitFor();
    await shot('kontakt-erfolg');
    expect(true).toBe(true);
  });
}
