/**
 * Mega-Menü „Leistungen“ (Bugfix-Runde 2), Chromium + WebKit.
 * Hover-Tests laufen mit echter Maus auf Laptop (1440) und Desktop (1920); Touch-Tests auf dem iPad quer (1180);
 * der Akkordeon-Test im mobilen Menü auf allen Handy-/Tablet-Hochformat-Profilen (unter 1024 px).
 * Zu jeder Situation entsteht ein Bild unter docs/qa/megamenu/<Profil>/ (nur in den Referenzprofilen).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Page, TestInfo } from '@playwright/test';
import { test, expect } from './support/fixtures';
import { routes, SERVICE_PAGES } from '../src/i18n/routes';
import { LOCALES } from '../src/i18n/config';
import { dictionaries } from '../src/i18n';
import { categories } from '../src/data/services';
import { shortTitle } from '../src/lib/menu';
import { layoutAudit } from './support/audit';
import { overlapAudit, pseudoLocalize } from './support/overlap';

const SHOT_PROJECTS = new Set(['laptop-chromium', 'desktop-webkit', 'ipad-quer-chromium', 'ipad-hoch-webkit']);

async function shot(page: Page, info: TestInfo, name: string) {
  if (!SHOT_PROJECTS.has(info.project.name)) return;
  const dir = path.join('docs', 'qa', 'megamenu', info.project.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.jpg`), type: 'jpeg', quality: 72 });
}

const ui = (page: Page) => ({
  trigger: page.locator('[data-mega-trigger]'),
  panel: page.locator('#mega-services'),
  scrim: page.locator('[data-mega-scrim]'),
  header: page.locator('[data-header]'),
});
const isOpen = async (page: Page) => (await ui(page).trigger.getAttribute('aria-expanded')) === 'true';
/** wartet, bis das Panel offen ist und die Animation (200 ms) durch ist */
async function settled(page: Page, open: boolean) {
  await expect(ui(page).trigger).toHaveAttribute('aria-expanded', String(open));
  if (open) await expect(ui(page).panel).toBeVisible();
  else await expect(ui(page).panel).toBeHidden();
  await page.waitForTimeout(280);
}

const desktopMouse = (page: Page, info: TestInfo) => !info.project.use.hasTouch && page.viewportSize()!.width >= 1024;
const desktopTouch = (page: Page, info: TestInfo) => !!info.project.use.hasTouch && page.viewportSize()!.width >= 1024;

test.describe('Mega-Menü: Maus', () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(!desktopMouse(page, info), 'Hover-Tests nur mit Maus und Desktop-Navigation');
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(5, 400);
  });

  test('Hover öffnet nach 120 ms Verweilen', async ({ page }, info) => {
    const { trigger } = ui(page);
    await page.evaluate(() => {
      const w = window as unknown as { __m: { enter?: number; open?: number } };
      w.__m = {};
      const tr = document.querySelector('[data-mega-trigger]')!;
      tr.parentElement!.addEventListener('pointerenter', () => (w.__m.enter = performance.now()), { once: true });
      new MutationObserver(() => {
        if (tr.getAttribute('aria-expanded') === 'true' && !w.__m.open) w.__m.open = performance.now();
      }).observe(tr, { attributes: true });
    });
    await trigger.hover();
    await shot(page, info, '01-hover-kurz-nach-dem-Betreten');
    await settled(page, true);
    const m = await page.evaluate(() => (window as unknown as { __m: { enter: number; open: number } }).__m);
    expect(m.open - m.enter, 'öffnet nicht früher als nach ~120 ms').toBeGreaterThanOrEqual(100);
    expect(m.open - m.enter, 'öffnet zügig').toBeLessThan(500);
    await expect(ui(page).scrim).toHaveClass(/is-open/);
    await shot(page, info, '02-hover-offen');
  });

  test('schräg vom Auslöser in die rechte untere Ecke des Panels: bleibt offen', async ({ page }, info) => {
    const { trigger, panel } = ui(page);
    await trigger.hover();
    await settled(page, true);
    const t = (await trigger.boundingBox())!;
    const p = (await panel.boundingBox())!;
    await page.mouse.move(t.x + t.width / 2, t.y + t.height / 2);
    await shot(page, info, '03-diagonal-start');
    const target = { x: p.x + p.width - 12, y: p.y + p.height - 12 };
    await page.mouse.move(target.x, target.y, { steps: 20 });
    expect(await isOpen(page), 'direkt nach der Bewegung offen').toBe(true);
    await page.waitForTimeout(700);
    expect(await isOpen(page), '700 ms später noch offen').toBe(true);
    await shot(page, info, '04-diagonal-ende-in-der-Ecke');
  });

  test('Maus raus: schließt nach über 300 ms; Maus raus und nach 150 ms zurück: bleibt offen', async ({ page }, info) => {
    const { trigger, panel } = ui(page);
    const vp = page.viewportSize()!;
    await trigger.hover();
    await settled(page, true);
    const p = (await panel.boundingBox())!;
    await page.mouse.move(p.x + p.width / 2, p.y + p.height / 2, { steps: 6 });

    // 1) raus und zurück nach ~150 ms
    await page.mouse.move(vp.width / 2, Math.min(vp.height - 8, p.y + p.height + 70), { steps: 3 });
    await page.waitForTimeout(150);
    expect(await isOpen(page), '150 ms nach dem Verlassen noch offen').toBe(true);
    await page.mouse.move(p.x + p.width / 2, p.y + p.height / 2, { steps: 3 });
    await page.waitForTimeout(800);
    expect(await isOpen(page), 'Zeiger zurück im Panel: bleibt offen').toBe(true);
    await shot(page, info, '05-raus-und-zurueck-bleibt-offen');

    // 2) raus und weg: schließt nach > 300 ms (Zeitstempel im Browser gemessen)
    await page.evaluate(() => {
      const w = window as unknown as { __c: { leave?: number; closed?: number } };
      w.__c = {};
      const tr = document.querySelector('[data-mega-trigger]')!;
      tr.parentElement!.addEventListener('pointerleave', () => (w.__c.leave = performance.now()), { once: true });
      new MutationObserver(() => {
        if (tr.getAttribute('aria-expanded') === 'false' && !w.__c.closed) w.__c.closed = performance.now();
      }).observe(tr, { attributes: true });
    });
    await page.mouse.move(vp.width / 2, Math.min(vp.height - 8, p.y + p.height + 70), { steps: 3 });
    await settled(page, false);
    const c = await page.evaluate(() => (window as unknown as { __c: { leave: number; closed: number } }).__c);
    expect(c.closed - c.leave, 'schließt nicht vor ~300 ms').toBeGreaterThanOrEqual(270);
    expect(c.closed - c.leave, 'schließt dann zügig').toBeLessThan(900);
    await expect(ui(page).scrim).not.toHaveClass(/is-open/);
    await shot(page, info, '06-raus-geschlossen');
  });

  test('Klick fixiert: Maus weg, 2 s warten, noch offen; Klick außerhalb schließt', async ({ page }, info) => {
    const { trigger, panel } = ui(page);
    const vp = page.viewportSize()!;
    await trigger.click();
    await settled(page, true);
    await shot(page, info, '07-klick-fixiert');
    await page.mouse.move(vp.width / 2, vp.height - 12, { steps: 8 });
    await page.waitForTimeout(2000);
    expect(await isOpen(page), 'nach 2 s ohne Maus noch offen').toBe(true);
    await shot(page, info, '08-fixiert-nach-2s-ohne-Maus');

    // Klick im Panel auf freie Fläche: bleibt offen
    const p = (await panel.boundingBox())!;
    await page.mouse.click(p.x + 8, p.y + 8);
    await page.waitForTimeout(350);
    expect(await isOpen(page), 'Klick auf freie Fläche im Panel: offen').toBe(true);
    await shot(page, info, '09-klick-auf-freie-Flaeche-bleibt-offen');

    // Klick außerhalb: schließt, ohne die Seite zu bedienen
    const url = page.url();
    await page.mouse.click(vp.width / 2, vp.height - 12);
    await settled(page, false);
    expect(page.url()).toBe(url);
    await shot(page, info, '10-klick-ausserhalb-geschlossen');
  });

  test('erneuter Klick auf „Leistungen“ schließt; Klick während Hover fixiert statt zu schließen', async ({ page }) => {
    const { trigger } = ui(page);
    await trigger.hover();
    await settled(page, true); // Hover-Zustand
    await trigger.click();
    await page.waitForTimeout(450);
    expect(await isOpen(page), 'Klick im Hover-Zustand fixiert').toBe(true);
    await page.mouse.move(600, 500, { steps: 6 });
    await page.waitForTimeout(700);
    expect(await isOpen(page), 'fixiert bleibt offen').toBe(true);
    await trigger.click();
    await settled(page, false);
  });

  test('Klick auf einen Link im Panel navigiert und schließt', async ({ page }, info) => {
    const { trigger, panel } = ui(page);
    await trigger.click();
    await settled(page, true);
    await panel.locator('a.mega__all, .mega__title a').first().click();
    await expect(page).toHaveURL(new RegExp(routes.svcNails.path.de));
    await expect(ui(page).trigger).toHaveAttribute('aria-expanded', 'false');
    await shot(page, info, '11-nach-Klick-auf-Link-neue-Seite');
    // Zurück: Menü startet geschlossen
    await page.goBack();
    await expect(ui(page).trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(ui(page).scrim).not.toHaveClass(/is-open/);
  });

  test('ESC schließt (Hover- und fixierter Zustand), Fokus liegt danach auf dem Auslöser', async ({ page }, info) => {
    const { trigger } = ui(page);
    await trigger.click();
    await settled(page, true);
    await page.keyboard.press('Escape');
    await settled(page, false);
    await expect(trigger).toBeFocused();
    await shot(page, info, '12-ESC-geschlossen-Fokus-am-Ausloeser');

    await page.mouse.move(5, 400);
    await trigger.hover();
    await settled(page, true);
    await page.keyboard.press('Escape');
    await settled(page, false);
    await expect(trigger).toBeFocused();
  });

  test('Andere Navigationspunkte schließen beim Hovern (auch fixiert) und beim Fokussieren', async ({ page }) => {
    const { trigger } = ui(page);
    const prices = page.locator('.desk-nav__link', { hasText: dictionaries.de.nav.prices });
    await trigger.hover();
    await settled(page, true);
    await prices.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 250 });

    await trigger.click();
    await settled(page, true);
    await prices.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 250 });

    await page.mouse.move(5, 400);
    await trigger.click();
    await settled(page, true);
    await prices.focus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 250 });
  });

  test('schnelles Hin- und Herbewegen: kein Flackern, nie mehr als ein Panel', async ({ page }) => {
    const { trigger } = ui(page);
    const names = [dictionaries.de.nav.prices, dictionaries.de.nav.gallery, dictionaries.de.nav.about];
    const others = names.map((n) => page.locator('.desk-nav__link', { hasText: n }));
    const centers: { x: number; y: number }[] = [];
    for (const el of [trigger, ...others]) {
      const bb = (await el.boundingBox())!;
      centers.push({ x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 });
    }
    // Im Browser messen: Verweildauer jedes Besuchs im Auslöser-Bereich und ob dabei geöffnet wurde
    await page.evaluate(() => {
      const w = window as unknown as { __log: { hovers: { dwell: number; opened: boolean }[]; opens: number } };
      w.__log = { hovers: [], opens: 0 };
      const tr = document.querySelector('[data-mega-trigger]')!;
      let enter = 0;
      let opened = false;
      tr.parentElement!.addEventListener('pointerenter', () => {
        enter = performance.now();
        opened = false;
      });
      tr.parentElement!.addEventListener('pointerleave', () => w.__log.hovers.push({ dwell: performance.now() - enter, opened }));
      new MutationObserver(() => {
        if (tr.getAttribute('aria-expanded') === 'true') {
          opened = true;
          w.__log.opens++;
        }
      }).observe(tr, { attributes: true, attributeFilter: ['aria-expanded'] });
    });
    // 12 Durchläufe mit direkten Mausbewegungen und ~20 ms Verweildauer
    for (let i = 0; i < 12; i++) {
      for (const c of centers) {
        await page.mouse.move(c.x, c.y);
        await page.waitForTimeout(20);
      }
    }
    await page.waitForTimeout(300);
    const log = await page.evaluate(() => (window as unknown as { __log: { hovers: { dwell: number; opened: boolean }[]; opens: number } }).__log);
    const quick = log.hovers.filter((h) => h.dwell < 105);
    expect(quick.length, 'es gab kurze Besuche').toBeGreaterThanOrEqual(6);
    expect(quick.filter((h) => h.opened), 'kurzes Überfahren (unter 120 ms) öffnet nie').toEqual([]);
    expect(log.hovers.filter((h) => h.opened && h.dwell < 118), 'geöffnet wird frühestens nach 120 ms').toEqual([]);
    expect(await isOpen(page), 'am Ende (auf Nachbar-Punkt) geschlossen').toBe(false);
    expect(await page.locator('[data-mega-panel]').count()).toBe(1);

    // Verweilen öffnet genau einmal; Wechsel auf einen Nachbarn schließt sofort; kurzer Rückweg öffnet nicht erneut
    await page.evaluate(() => ((window as unknown as { __log: { hovers: unknown[]; opens: number } }).__log = { hovers: [], opens: 0 }));
    await page.mouse.move(centers[0]!.x, centers[0]!.y);
    await settled(page, true);
    await page.mouse.move(centers[1]!.x, centers[1]!.y);
    await settled(page, false);
    await page.mouse.move(centers[0]!.x, centers[0]!.y);
    await page.waitForTimeout(20);
    await page.mouse.move(centers[2]!.x, centers[2]!.y);
    await page.waitForTimeout(400);
    const log2 = await page.evaluate(() => (window as unknown as { __log: { hovers: { dwell: number; opened: boolean }[]; opens: number } }).__log);
    expect(log2.hovers.slice(-1)[0]!.dwell, 'der Rückweg war kurz').toBeLessThan(105);
    expect(log2.hovers.slice(-1)[0]!.opened, 'kurzer Rückweg öffnet nicht erneut').toBe(false);
    expect(log2.opens, 'insgesamt genau ein Öffnen').toBe(1);
    expect(await isOpen(page)).toBe(false);
    expect(await page.locator('[data-mega-panel]').count()).toBe(1);
  });

  test('kein Layout-Shift beim Öffnen und Schließen, Seite darunter bleibt stehen', async ({ page }) => {
    const { trigger } = ui(page);
    const before = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, top: document.querySelector('main')!.getBoundingClientRect().top, y: scrollY }));
    await page.evaluate(() => {
      const w = window as unknown as { __cls: number };
      w.__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) w.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: false });
    });
    await trigger.click();
    await settled(page, true);
    const open = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, top: document.querySelector('main')!.getBoundingClientRect().top, y: scrollY, w: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    await trigger.click();
    await settled(page, false);
    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    expect(open.h).toBe(before.h);
    expect(open.top).toBe(before.top);
    expect(open.y).toBe(before.y);
    expect(open.w).toBeLessThanOrEqual(open.cw);
    expect(cls, 'CLS beim Öffnen und Schließen').toBeLessThan(0.001);
  });

  test('Tastatur: Enter/Leertaste öffnet, Fokus auf erstem Link, ESC schließt', async ({ page }, info) => {
    const { trigger, panel } = ui(page);
    for (const key of ['Enter', ' ']) {
      await trigger.focus();
      await page.keyboard.press(key);
      await settled(page, true);
      await expect(panel.locator('a[href]').first()).toBeFocused();
      if (key === 'Enter') await shot(page, info, '13-Tastatur-offen-Fokus-auf-erstem-Link');
      await page.keyboard.press('Escape');
      await settled(page, false);
      await expect(trigger).toBeFocused();
    }
  });

  test('Tastatur: Tab läuft durch das Panel, danach schließt es; Shift+Tab zurück zum Auslöser', async ({ page }, info) => {
    test.skip(info.project.use.browserName === 'webkit', 'Safari tabbt standardmäßig nicht auf Links – Reihenfolge in Chromium geprüft');
    const { trigger, panel } = ui(page);
    await trigger.focus();
    await page.keyboard.press('Enter');
    await settled(page, true);
    const links = await panel.locator('a[href]:not([tabindex="-1"])').count();
    expect(links).toBeGreaterThanOrEqual(6 + 6 + 2);
    for (let i = 1; i < links; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement?.closest('#mega-services')), `Tab ${i}/${links - 1} bleibt im Panel`).toBe(true);
    }
    await shot(page, info, '14-Tastatur-letzter-Link');
    await page.keyboard.press('Tab');
    await settled(page, false);
    expect(await page.evaluate(() => !!document.activeElement?.closest('#mega-services'))).toBe(false);

    // Shift+Tab vom ersten Link zurück zum Auslöser: Menü bleibt offen
    await trigger.focus();
    await page.keyboard.press('Enter');
    await settled(page, true);
    await page.keyboard.press('Shift+Tab');
    await expect(trigger).toBeFocused();
    expect(await isOpen(page)).toBe(true);
  });
});

test.describe('Mega-Menü: Touch (iPad quer, 1180 px)', () => {
  test('Tippen öffnet, Tippen außerhalb schließt, kein Hover-Flackern', async ({ page }, info) => {
    test.skip(!desktopTouch(page, info), 'Touch-Test nur mit Desktop-Navigation und Touch');
    await page.goto('/');
    const { trigger, panel } = ui(page);
    const vp = page.viewportSize()!;
    await trigger.tap();
    await settled(page, true);
    await shot(page, info, '20-touch-offen');
    // kein Hover-Zustand: nach 1,5 s ohne Eingabe noch offen
    await page.waitForTimeout(1500);
    expect(await isOpen(page)).toBe(true);
    // Tippen auf freie Fläche im Panel: bleibt offen
    const p = (await panel.boundingBox())!;
    await page.touchscreen.tap(p.x + 8, p.y + 8);
    await page.waitForTimeout(350);
    expect(await isOpen(page)).toBe(true);
    // Tippen außerhalb: schließt
    await page.touchscreen.tap(vp.width / 2, vp.height - 20);
    await settled(page, false);
    await shot(page, info, '21-touch-ausserhalb-geschlossen');
    // erneutes Tippen auf „Leistungen“ öffnet, nochmaliges Tippen schließt
    await trigger.tap();
    await settled(page, true);
    await trigger.tap();
    await settled(page, false);
    // Tippen auf einen Link im Panel navigiert
    await trigger.tap();
    await settled(page, true);
    await panel.locator('.mega__title a').nth(1).tap();
    await expect(page).toHaveURL(new RegExp(routes.svcManicure.path.de));
  });
});

test.describe('Mega-Menü: mobiles Akkordeon (unter 1024 px)', () => {
  for (const lang of LOCALES) {
    test(`Menü-Sheet: „Leistungen“ klappt auf und zu (${lang})`, async ({ page }, info) => {
      test.skip(page.viewportSize()!.width >= 1024, 'Akkordeon gibt es nur unter 1024 px');
      const d = dictionaries[lang];
      await page.goto(routes.home.path[lang]);
      await expect(page.locator('[data-mega-trigger]')).toBeHidden();
      await page.locator('.menu-btn').tap();
      const sheet = page.locator('#menu-sheet');
      await expect(sheet).toBeVisible();
      const acc = sheet.locator('details.menu-acc');
      await expect(acc).not.toHaveAttribute('open', '');
      const summary = acc.locator('summary');
      await expect(summary).toContainText(d.nav.services);
      await summary.tap();
      await expect(acc).toHaveAttribute('open', '');
      for (const c of categories) {
        await expect(acc.locator(`a[href="${routes[SERVICE_PAGES[c.id]].path[lang]}"]`).first()).toBeVisible();
        for (const [j, g] of c.groups.entries()) await expect(acc.locator(`.menu-acc__item:nth-child(${categories.indexOf(c) + 1}) .menu-acc__subs a`).nth(j)).toHaveText(shortTitle(g.title[lang]));
      }
      await expect(acc.locator('a', { hasText: d.mega.all })).toBeVisible();
      await page.waitForTimeout(250);
      await shot(page, info, `30-akkordeon-offen-${lang}`);
      await summary.tap();
      await expect(acc).not.toHaveAttribute('open', '');
      // Tippen auf den Hintergrund schließt das Sheet
      await page.mouse.click(page.viewportSize()!.width / 2, 4);
      await expect(sheet).toBeHidden();
    });
  }
});

test.describe('Mega-Menü: Inhalt in allen Sprachen', () => {
  for (const lang of LOCALES) {
    test(`Texte, Links und kein Überlauf, auch mit +40 % langen Wörtern (${lang})`, async ({ page }, info) => {
      test.skip(page.viewportSize()!.width < 1024, 'Mega-Menü ab 1024 px');
      const d = dictionaries[lang];
      await page.goto(routes.home.path[lang]);
      await page.evaluate(() => document.fonts.ready);
      const { trigger, panel } = ui(page);
      await trigger.click();
      await settled(page, true);

      // sechs Kategorien mit Titel, Kurzbeschreibung und Unterpunkten aus der Preisliste
      const cols = panel.locator('.mega__col');
      await expect(cols).toHaveCount(categories.length);
      for (const [i, c] of categories.entries()) {
        const col = cols.nth(i);
        await expect(col.locator('.mega__title a')).toHaveText(d.cards[c.id].title);
        await expect(col.locator('.mega__title a')).toHaveAttribute('href', routes[SERVICE_PAGES[c.id]].path[lang]);
        await expect(col.locator('.mega__desc')).toHaveText(d.mega.desc[c.id]);
        await expect(col.locator('.mega__subs li')).toHaveCount(c.groups.length);
        // Text jedes Unterpunkts = Gruppentitel der Preisliste ohne Klammerzusatz, nie leer
        for (const [j, g] of c.groups.entries()) {
          const text = shortTitle(g.title[lang]);
          expect(text.length).toBeGreaterThan(3);
          await expect(col.locator('.mega__subs a').nth(j)).toHaveText(text);
        }
        const sub = await col.locator('.mega__subs a').first().getAttribute('href');
        expect(sub).toMatch(new RegExp(`^${routes.prices.path[lang]}#p-${c.id}-`));
      }
      await expect(panel.locator('a.mega__all')).toHaveText(d.mega.all);
      await expect(panel.locator('a.btn')).toContainText(d.nav.book);
      await shot(page, info, `40-inhalt-${lang}`);

      const check = async (label: string) => {
        const overlap = await page.evaluate(overlapAudit, '#mega-services');
        expect(overlap, `${label}: Text über Text/Bild im Menü\n${overlap.join('\n')}`).toEqual([]);
        const layout = (await page.evaluate(layoutAudit, { mobile: false })).filter((i) => /^(Horizontaler Scroll|Ragt aus dem Viewport|Text läuft über)/.test(i));
        expect(layout, `${label}: Überlauf\n${layout.join('\n')}`).toEqual([]);
        const box = await panel.boundingBox();
        expect(box!.width).toBeGreaterThanOrEqual(page.viewportSize()!.width - 1);
        expect(await panel.evaluate((e) => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
      };
      await check('Originaltexte');
      await page.evaluate(pseudoLocalize);
      await page.waitForTimeout(100);
      await check('Pseudo-Lokalisierung +40 %');
      await shot(page, info, `41-pseudo-${lang}`);
    });
  }
});
