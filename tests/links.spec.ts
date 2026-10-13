/**
 * 8.1 Klick-Inventar und 8.2 Bedienung jedes Elements.
 * Inventar: alle interaktiven Elemente jeder Seite in jeder Sprache → docs/qa/inventar.json
 * Links: intern 200 + richtige Sprache, Anker vorhanden und nicht unter dem Sticky Header,
 * extern mit rel=noopener, tel:/mailto: korrekt formatiert. Buttons: sichtbare Reaktion.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { test, expect, isMobile, deviceOf, browserOf } from './support/fixtures';
import { PAGES, HTML_LANG } from './support/site';

interface Item {
  tag: string;
  role: string | null;
  name: string;
  href: string | null;
  type: string | null;
  inDialog: string | null;
  action: string;
}

const SELECTOR =
  'a, button, input, select, textarea, summary, [role=button], [role=link], [role=tab], [role=radio], [role=checkbox], [role=switch], [tabindex]';

async function inventory(page: Page): Promise<Item[]> {
  return page.evaluate((sel) => {
    return [...document.querySelectorAll<HTMLElement>(sel)].map((el) => {
      const name = (el.getAttribute('aria-label') ?? el.textContent ?? el.getAttribute('value') ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);
      const dialog = el.closest('dialog');
      const href = el.getAttribute('href');
      let action = 'interaktiv';
      if (el.tagName === 'A') action = href?.startsWith('#') ? 'Anker' : href?.startsWith('tel:') ? 'Anruf' : href?.startsWith('mailto:') ? 'E-Mail' : /^https?:/.test(href ?? '') ? 'extern' : 'intern';
      else if (el.dataset.open) action = `öffnet #${el.dataset.open}`;
      else if (el.matches('[data-close]')) action = 'schließt Dialog';
      else if (el.matches('[data-disclosure]')) action = 'Popover';
      else if (el.matches('[data-copy]')) action = 'kopiert Adresse';
      else if (el.tagName === 'SUMMARY') action = 'klappt auf';
      else if (el.matches('input, select, textarea')) action = 'Eingabe';
      else if (el.matches('.day')) action = 'Kalendertag';
      return {
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role'),
        name,
        href,
        type: el.getAttribute('type'),
        inDialog: dialog?.id ?? null,
        action,
      };
    });
  }, SELECTOR);
}

test('Klick-Inventar aller Seiten und Sprachen', async ({ page }, info) => {
  test.skip(!['laptop-chromium', 'iphone-15-chromium'].includes(info.project.name), 'Inventar auf Laptop und iPhone');
  const out: Record<string, { path: string; count: number; items: Item[] }> = {};
  for (const p of PAGES) {
    await page.goto(p.path);
    const items = await inventory(page);
    out[p.id] = { path: p.path, count: items.length, items };
  }
  const file = path.join('docs', 'qa', `inventar-${deviceOf(info.project)}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ erzeugt: new Date().toISOString(), seiten: Object.keys(out).length, elemente: Object.values(out).reduce((a, x) => a + x.count, 0), out }, null, 1));
  if (info.project.name === 'laptop-chromium') fs.copyFileSync(file, path.join('docs', 'qa', 'inventar.json'));
});

const checked = new Map<string, number>();

for (const p of PAGES) {
  test(`Links und Bedienelemente ${p.id}`, async ({ page, request, watch }, info) => {
    test.skip(!['laptop-chromium', 'iphone-15-webkit', 'android-360-chromium'].includes(info.project.name), 'Linkprüfung auf drei Referenzprojekten');
    await page.goto(p.path);
    const links = await page.locator('a[href]').evaluateAll((as) =>
      as.map((a) => ({
        href: a.getAttribute('href')!,
        rel: a.getAttribute('rel') ?? '',
        target: a.getAttribute('target'),
        text: (a.textContent ?? a.getAttribute('aria-label') ?? '').trim().slice(0, 40),
        download: a.hasAttribute('download'),
      })),
    );
    for (const l of links) {
      if (l.href.startsWith('tel:')) {
        expect(l.href, `tel-Format: ${l.text}`).toMatch(/^tel:\+43\d{6,13}$/);
      } else if (l.href.startsWith('mailto:')) {
        expect(l.href).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[a-z]{2,}$/);
      } else if (/^https?:\/\//.test(l.href)) {
        expect(l.rel, `rel bei externem Link ${l.href}`).toContain('noopener');
        expect(l.target, `target bei externem Link ${l.href}`).toBe('_blank');
        expect(l.href.startsWith('https://'), `https: ${l.href}`).toBe(true);
      } else if (l.href.startsWith('#')) {
        const id = decodeURIComponent(l.href.slice(1));
        await expect(page.locator(`[id="${id}"]`), `Anker ${l.href} existiert`).toHaveCount(1);
      } else {
        const url = new URL(l.href, page.url());
        const key = url.pathname + url.search;
        if (!checked.has(key)) {
          const res = await request.get(url.pathname + url.search);
          checked.set(key, res.status());
          if (!l.download && res.headers()['content-type']?.includes('text/html')) {
            const html = await res.text();
            const lang = /<html lang="([^"]+)"/.exec(html)?.[1];
            const expected = url.pathname.startsWith('/en/') ? 'en' : url.pathname.startsWith('/hu/') ? 'hu' : 'de-AT';
            expect(lang, `Sprache von ${url.pathname}`).toBe(expected);
          }
        }
        expect(checked.get(key), `Status ${key} (Link „${l.text}“)`).toBe(200);
        if (url.hash) {
          const html = await (await request.get(url.pathname)).text();
          expect(html.includes(`id="${url.hash.slice(1)}"`), `Anker ${url.hash} auf ${url.pathname}`).toBe(true);
        }
      }
    }

    // Anker innerhalb der Seite: nach dem Klick sichtbar und nicht unter dem Sticky Header
    for (const href of [...new Set(links.filter((l) => l.href.startsWith('#') && l.href.length > 1).map((l) => l.href))]) {
      const link = page.locator(`main a[href="${href}"]`).first();
      if (!(await link.count()) || !(await link.isVisible())) continue;
      await link.click();
      await page.waitForTimeout(800);
      const target = page.locator(href);
      await expect(target).toBeInViewport();
      const headerBottom = await page.locator('[data-header]').evaluate((h) => h.getBoundingClientRect().bottom);
      const top = await target.evaluate((t) => t.getBoundingClientRect().top);
      expect(top, `Anker ${href} unter dem Sticky Header`).toBeGreaterThanOrEqual(headerBottom - 2);
    }

    // Jeder sichtbare Button reagiert sichtbar (Attribut-, DOM- oder URL-Änderung)
    const buttons = page.locator('main button:visible, header button:visible');
    const n = await buttons.count();
    for (let i = 0; i < n; i++) {
      await page.goto(p.path);
      const btn = page.locator('main button:visible, header button:visible').nth(i);
      if (!(await btn.isVisible())) continue;
      if ((await btn.getAttribute('aria-disabled')) === 'true' || (await btn.isDisabled())) continue;
      const before = await page.evaluate(() => document.body.innerHTML.length + location.href + (document.activeElement?.outerHTML ?? '') + document.querySelectorAll('[open], [aria-expanded="true"], .is-open, .is-done').length);
      await btn.click();
      await page.waitForTimeout(700);
      const after = await page.evaluate(() => document.body.innerHTML.length + location.href + (document.activeElement?.outerHTML ?? '') + document.querySelectorAll('[open], [aria-expanded="true"], .is-open, .is-done').length);
      expect(after, `Button ohne sichtbare Reaktion: „${(await btn.textContent())?.trim()}“`).not.toBe(before);
      await page.keyboard.press('Escape');
    }
    expect(watch.console, 'Konsole').toEqual([]);
    expect(watch.foreign, 'Fremd-Requests').toEqual([]);
    void HTML_LANG;
    void isMobile;
    void browserOf;
  });
}
