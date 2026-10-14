/**
 * Überlappungs-Test (Bugfix-Runde 2): Auf jeder Seite, in jeder Sprache, bei 360/390/430/820/1180/1440/1920 px,
 * in Chromium und WebKit darf kein Text ein Bild oder anderen Text schneiden. Danach läuft derselbe Test
 * (plus Overflow-Prüfung) noch einmal im Pseudo-Lokalisierungsmodus mit 40 % längeren Wörtern.
 */
import type { Page } from '@playwright/test';
import { test, expect, isMobile } from './support/fixtures';
import { PAGES } from './support/site';
import { layoutAudit } from './support/audit';
import { overlapAudit, pseudoLocalize } from './support/overlap';

const settle = async (page: Page) => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const fam of ['Gloock', 'Hanken Grotesk']) await document.fonts.load(`40px "${fam}"`, 'ŐőŰű');
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
};

for (const p of PAGES) {
  test(`Überlappung und Pseudo-Lokalisierung: ${p.id}`, async ({ page }, info) => {
    await page.goto(p.path, { waitUntil: 'load' });
    await settle(page);

    const plain = await page.evaluate(overlapAudit);
    expect.soft(plain, `Überlappung (Originaltexte)\n${plain.join('\n')}`).toEqual([]);

    await page.evaluate(pseudoLocalize);
    await settle(page);
    const pseudo = await page.evaluate(overlapAudit);
    expect.soft(pseudo, `Überlappung (Pseudo-Lokalisierung +40 %)\n${pseudo.join('\n')}`).toEqual([]);

    const layout = (await page.evaluate(layoutAudit, { mobile: isMobile(info.project) })).filter((i) => /^(Horizontaler Scroll|Ragt aus dem Viewport|Text läuft über)/.test(i));
    expect.soft(layout, `Overflow (Pseudo-Lokalisierung +40 %)\n${layout.join('\n')}`).toEqual([]);
  });
}
