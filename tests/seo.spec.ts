/**
 * 8.4 SEO: hreflang gegenseitig, JSON-LD valide, Title/Description je Seite einzigartig und in richtiger Länge,
 * Canonical, Sitemap, robots.txt, llms.txt.
 */
import { test, expect } from './support/fixtures';
import { PAGES } from './support/site';

test.describe.configure({ mode: 'serial' });

test('Metadaten, hreflang und JSON-LD aller Seiten', async ({ request }, info) => {
  test.skip(info.project.name !== 'laptop-chromium', 'einmal pro Lauf');
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
  const alternates = new Map<string, Map<string, string>>();
  const problems: string[] = [];

  for (const p of PAGES) {
    const html = await (await request.get(p.path)).text();
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
    const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '';
    const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? '';
    const robots = /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? '';
    if (p.key === 'notFound') {
      if (!robots.includes('noindex')) problems.push(`${p.id}: 404 ohne noindex`);
      continue;
    }
    const tl = [...title].length;
    const dl = [...desc.replace(/&amp;/g, '&')].length;
    if (tl < 20 || tl > 62) problems.push(`${p.id}: Title-Länge ${tl} „${title}“`);
    if (dl < 110 || dl > 160) problems.push(`${p.id}: Description-Länge ${dl}`);
    if (titles.has(title)) problems.push(`${p.id}: Title doppelt mit ${titles.get(title)}`);
    if (descs.has(desc)) problems.push(`${p.id}: Description doppelt mit ${descs.get(desc)}`);
    titles.set(title, p.id);
    descs.set(desc, p.id);
    if (canonical !== `https://hellobeautysalon.at${p.path}`) problems.push(`${p.id}: Canonical ${canonical}`);
    if (robots.includes('noindex')) problems.push(`${p.id}: noindex auf indexierbarer Seite`);
    for (const og of ['og:title', 'og:description', 'og:image', 'og:url', 'og:locale', 'og:image:alt']) {
      if (!html.includes(`property="${og}"`)) problems.push(`${p.id}: ${og} fehlt`);
    }
    const alts = new Map<string, string>();
    for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) alts.set(m[1]!, m[2]!);
    alternates.set(`https://hellobeautysalon.at${p.path}`, alts);
    for (const h of ['de-AT', 'en', 'hu', 'x-default']) if (!alts.has(h)) problems.push(`${p.id}: hreflang ${h} fehlt`);

    const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    try {
      const data = JSON.parse(ld ?? '');
      const types = (data['@graph'] as { '@type': string | string[] }[]).flatMap((n) => n['@type']);
      for (const t of ['NailSalon', 'WebSite']) if (!types.includes(t)) problems.push(`${p.id}: JSON-LD ohne ${t}`);
      const salon = data['@graph'].find((n: { '@id': string }) => n['@id'] === 'https://hellobeautysalon.at/#salon');
      if (!salon?.address?.streetAddress || !salon?.geo?.latitude || !salon?.openingHoursSpecification) problems.push(`${p.id}: Salon-Knoten unvollständig`);
      if (String(p.key).startsWith('svc') && !types.includes('Service')) problems.push(`${p.id}: Service fehlt`);
      if (p.key === 'faq' && !types.includes('FAQPage')) problems.push(`${p.id}: FAQPage fehlt`);
    } catch (e) {
      problems.push(`${p.id}: JSON-LD ungültig (${(e as Error).message})`);
    }
  }

  // hreflang gegenseitig: jede Alternative verweist zurück
  for (const [url, alts] of alternates) {
    for (const [lang, target] of alts) {
      if (lang === 'x-default') continue;
      const back = alternates.get(target);
      if (!back) problems.push(`${url}: hreflang ${lang} → ${target} existiert nicht`);
      else if (![...back.values()].includes(url)) problems.push(`${target} verweist nicht zurück auf ${url}`);
    }
  }
  expect(problems, problems.join('\n')).toEqual([]);
});

test('sitemap.xml, robots.txt, llms.txt, manifest', async ({ request }, info) => {
  test.skip(info.project.name !== 'laptop-chromium', 'einmal pro Lauf');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
  expect(locs.length).toBe(PAGES.filter((p) => p.key !== 'notFound').length);
  for (const loc of locs) {
    const res = await request.get(new URL(loc).pathname);
    expect(res.status(), loc).toBe(200);
  }
  expect(sitemap).toContain('hreflang="x-default"');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://hellobeautysalon.at/sitemap.xml');
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('Barnabitengasse 7');
  expect(llms).toContain('+43 660 7055 631');
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
});
