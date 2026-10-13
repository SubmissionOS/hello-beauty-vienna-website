import type { APIRoute } from 'astro';
import { categories } from '../data/services';
import { site } from '../data/site';
import { href, SERVICE_PAGES } from '../i18n/routes';
import { t } from '../i18n';
import { abs } from '../lib/schema';
import { euro } from '../lib/format';

/** llms.txt (https://llmstxt.org): kompakte, zitierfähige Fakten für KI-Assistenten. Gleiche Datenquelle wie die Website. */
export const GET: APIRoute = () => {
  const de = t('de');
  const en = t('en');
  const lines = [
    '# Hello Beauty',
    '',
    `> ${de.home.glance.text}`,
    '',
    `> ${en.home.glance.text}`,
    '',
    '## Fakten',
    `- Adresse: ${site.address.street}, ${site.address.postalCode} ${site.address.city} (Bezirk ${site.address.district}), Österreich`,
    `- Telefon: ${site.phone}`,
    `- E-Mail: ${site.email}`,
    `- Öffnungszeiten: Montag bis Samstag ${site.hours.open}–${site.hours.close} Uhr, Sonntag geschlossen`,
    `- Öffentlich: U3 Neubaugasse (ca. 2–3 Gehminuten), Bus 13A/14A/57A Haus des Meeres, U4 Kettenbrückengasse (ca. 7 Gehminuten)`,
    `- Preise: Endpreise in Euro inkl. 20 % USt., vollständige Liste: ${abs(href('prices', 'de'))}`,
    `- Online-Buchung: ${abs(href('booking', 'de'))}`,
    `- Instagram: ${site.social.instagram}`,
    `- Facebook: ${site.social.facebook}`,
    '',
    '## Leistungen',
    ...categories.map((c) => {
      const items = c.groups.flatMap((g) => g.items).filter((x) => x.bookable && !x.minor);
      const min = Math.min(...items.map((x) => x.price));
      return `- [${de.cards[c.id].title}](${abs(href(SERVICE_PAGES[c.id], 'de'))}): ${de.cards[c.id].text} Ab ${euro(min, 'de')}.`;
    }),
    '',
    '## Seiten',
    `- [Häufige Fragen](${abs(href('faq', 'de'))})`,
    `- [Kontakt & Anfahrt](${abs(href('contact', 'de'))})`,
    `- [Über uns](${abs(href('about', 'de'))})`,
    `- [English version](${abs(href('home', 'en'))})`,
    `- [Magyar változat](${abs(href('home', 'hu'))})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
