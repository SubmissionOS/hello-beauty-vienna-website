/**
 * JSON-LD als verknüpfter @graph (Plan: docs/research/seo-geo.md, Abschnitt 4).
 * Kein aggregateRating: Google erlaubt keine selbst eingebundenen Bewertungen von Drittplattformen.
 */
import { site } from '../data/site';
import type { Lang } from '../i18n/config';
import { LANG_META } from '../i18n/config';
import { routes, href, type RouteKey } from '../i18n/routes';
import type { QA } from '../i18n/types';
import type { Service } from '../data/services';

const SALON_ID = `${site.url}/#salon`;
const SITE_ID = `${site.url}/#website`;

export const abs = (path: string) => new URL(path, site.url).href;

export function salonNode(lang: Lang, imageUrl: string, logoUrl: string) {
  return {
    '@type': ['NailSalon', 'BeautySalon'],
    '@id': SALON_ID,
    name: site.name,
    alternateName: ['Hello Beauty Schönheitssalon', 'HelloBeauty Vienna'],
    url: abs(href('home', lang)),
    telephone: site.phoneE164,
    email: site.email,
    image: imageUrl,
    logo: logoUrl,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: 'Wien',
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.maps.google,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: site.hours.open,
        closes: site.hours.close,
      },
    ],
    areaServed: { '@type': 'City', name: 'Wien' },
    knowsLanguage: ['de', 'hu'],
    sameAs: [site.social.instagram, site.social.facebook, site.rating.url],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: site.name,
    inLanguage: ['de-AT', 'en', 'hu'],
    publisher: { '@id': SALON_ID },
  };
}

export function webPageNode(o: { url: string; name: string; description: string; lang: Lang; type?: string; crumbs?: { name: string; url: string }[] }) {
  const node: Record<string, unknown> = {
    '@type': o.type ?? 'WebPage',
    '@id': `${o.url}#webpage`,
    url: o.url,
    name: o.name,
    description: o.description,
    inLanguage: LANG_META[o.lang].hreflang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': SALON_ID },
  };
  if (o.crumbs && o.crumbs.length > 1) {
    node.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: o.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    };
  }
  return node;
}

export function serviceNode(o: { url: string; name: string; description: string; lang: Lang; items: { name: string; x: Service }[] }) {
  return {
    '@type': 'Service',
    '@id': `${o.url}#service`,
    name: o.name,
    description: o.description,
    serviceType: o.name,
    provider: { '@id': SALON_ID },
    areaServed: { '@type': 'City', name: 'Wien' },
    url: o.url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: o.name,
      itemListElement: o.items.map(({ name, x }) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
        price: x.price.toFixed(2),
        priceCurrency: 'EUR',
        ...(x.from
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: x.price.toFixed(2), priceCurrency: 'EUR' } }
          : {}),
      })),
    },
  };
}

export function faqNode(url: string, items: readonly QA[], plain: (s: string) => string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(x.a) },
    })),
  };
}

/** Text ohne Link-Syntax und ohne Platzhalter für strukturierte Daten */
export function plainText(s: string): string {
  return s
    .replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1')
    .replace(/\s*\[(?:PLATZHALTER|PLACEHOLDER|HELYŐRZŐ)[^\]]*\]/g, '')
    .trim();
}

export function graph(nodes: Record<string, unknown>[]): string {
  // `<` maskieren, damit kein </script> aus Inhalten entstehen kann
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

export function crumbsFor(key: RouteKey, lang: Lang, names: (k: RouteKey) => string) {
  const chain: RouteKey[] = [];
  let k: RouteKey | undefined = key;
  while (k) {
    chain.unshift(k);
    k = routes[k].parent;
  }
  if (key !== 'home') chain.unshift('home');
  return chain.map((k) => ({ key: k, name: names(k), url: abs(href(k, lang)) }));
}
