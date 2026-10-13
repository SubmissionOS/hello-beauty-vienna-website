import { test as base, expect, type Page } from '@playwright/test';

export interface Watch {
  console: string[];
  foreign: string[];
  failed: string[];
}

/** Fixture: sammelt Konsolenmeldungen, Fremd-Requests und fehlgeschlagene Requests jeder Seite. */
export const test = base.extend<{ watch: Watch }>({
  watch: async ({ page, baseURL }, use) => {
    const w: Watch = { console: [], foreign: [], failed: [] };
    page.on('console', (m) => w.console.push(`${m.type()}: ${m.text()}`));
    page.on('pageerror', (e) => w.console.push(`pageerror: ${e.message}`));
    page.on('request', (r) => {
      const url = r.url();
      if (url.startsWith('data:') || url.startsWith('blob:')) return;
      if (!url.startsWith(baseURL!)) w.foreign.push(url);
    });
    page.on('response', (r) => {
      if (r.status() >= 400 && !r.url().endsWith('/404.html') && !/\/(en|hu)\/404\/$/.test(r.url())) w.failed.push(`${r.status()} ${r.url()}`);
    });
    await use(w);
  },
});

export { expect };

export const isMobile = (p: { metadata: Record<string, unknown> }) => p.metadata.mobile === true;
export const deviceOf = (p: { metadata: Record<string, unknown> }) => String(p.metadata.device);
export const browserOf = (p: { metadata: Record<string, unknown> }) => String(p.metadata.browser);

/** Scrollt die ganze Seite einmal durch (lädt Lazy-Bilder, löst Einblenden aus) */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += Math.round(window.innerHeight * 0.8)) {
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  });
  await page.waitForTimeout(150);
}

export async function waitImages(page: Page): Promise<void> {
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15_000 });
}
