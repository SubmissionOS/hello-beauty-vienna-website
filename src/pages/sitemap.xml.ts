import type { APIRoute } from 'astro';
import { LOCALES, LANG_META } from '../i18n/config';
import { routes, ROUTE_KEYS } from '../i18n/routes';
import { abs } from '../lib/schema';

/** Sitemap mit hreflang-Paaren (xhtml:link) für alle Seiten in allen Sprachen */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ROUTE_KEYS.flatMap((key) =>
    LOCALES.map((lang) => {
      const alt = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${LANG_META[l].hreflang}" href="${abs(routes[key].path[l])}"/>`).join('\n');
      return `  <url>
    <loc>${abs(routes[key].path[lang])}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${routes[key].priority.toFixed(1)}</priority>
${alt}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(routes[key].path.de)}"/>
  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
