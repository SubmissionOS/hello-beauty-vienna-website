/**
 * Zentrale Routentabelle: jede Seite existiert in DE/EN/HU mit übersetztem Slug.
 * Sprachumschalter, hreflang, Sitemap, Breadcrumbs und interne Links lesen ausschließlich hier.
 */
import type { Lang } from './config';
import type { CategoryId } from '../data/services';

export type RouteKey =
  | 'home'
  | 'services'
  | 'svcNails'
  | 'svcManicure'
  | 'svcPedicure'
  | 'svcFacial'
  | 'svcLashes'
  | 'svcHair'
  | 'prices'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'booking'
  | 'faq'
  | 'imprint'
  | 'privacy'
  | 'accessibility';

interface RouteDef {
  path: Record<Lang, string>;
  parent?: RouteKey;
  /** In Sitemap und hreflang aufnehmen (alle Seiten außer 404) */
  priority: number;
}

export const routes: Record<RouteKey, RouteDef> = {
  home: { path: { de: '/', en: '/en/', hu: '/hu/' }, priority: 1 },
  services: { path: { de: '/leistungen/', en: '/en/services/', hu: '/hu/szolgaltatasok/' }, priority: 0.9 },
  svcNails: {
    path: { de: '/leistungen/nagelmodellage/', en: '/en/services/nail-extensions/', hu: '/hu/szolgaltatasok/mukorom/' },
    parent: 'services',
    priority: 0.9,
  },
  svcManicure: {
    path: {
      de: '/leistungen/manikuere/',
      en: '/en/services/manicure/',
      hu: '/hu/szolgaltatasok/manikur/',
    },
    parent: 'services',
    priority: 0.9,
  },
  svcPedicure: {
    path: { de: '/leistungen/pedikuere/', en: '/en/services/pedicure/', hu: '/hu/szolgaltatasok/pedikur/' },
    parent: 'services',
    priority: 0.9,
  },
  svcFacial: {
    path: { de: '/leistungen/kosmetik/', en: '/en/services/facials/', hu: '/hu/szolgaltatasok/kozmetika/' },
    parent: 'services',
    priority: 0.8,
  },
  svcLashes: {
    path: { de: '/leistungen/wimpern-augenbrauen/', en: '/en/services/lashes-brows/', hu: '/hu/szolgaltatasok/szempilla-szemoldok/' },
    parent: 'services',
    priority: 0.8,
  },
  svcHair: {
    path: { de: '/leistungen/haarentfernung/', en: '/en/services/hair-removal/', hu: '/hu/szolgaltatasok/szortelenites/' },
    parent: 'services',
    priority: 0.8,
  },
  prices: { path: { de: '/preise/', en: '/en/prices/', hu: '/hu/arak/' }, priority: 0.9 },
  gallery: { path: { de: '/galerie/', en: '/en/gallery/', hu: '/hu/galeria/' }, priority: 0.6 },
  about: { path: { de: '/ueber-uns/', en: '/en/about/', hu: '/hu/rolunk/' }, priority: 0.6 },
  contact: { path: { de: '/kontakt/', en: '/en/contact/', hu: '/hu/kapcsolat/' }, priority: 0.8 },
  booking: { path: { de: '/termin-buchen/', en: '/en/book/', hu: '/hu/idopontfoglalas/' }, priority: 0.9 },
  faq: { path: { de: '/faq/', en: '/en/faq/', hu: '/hu/gyik/' }, priority: 0.7 },
  imprint: { path: { de: '/impressum/', en: '/en/imprint/', hu: '/hu/impresszum/' }, priority: 0.2 },
  privacy: { path: { de: '/datenschutz/', en: '/en/privacy/', hu: '/hu/adatvedelem/' }, priority: 0.2 },
  accessibility: { path: { de: '/barrierefreiheit/', en: '/en/accessibility/', hu: '/hu/akadalymentesseg/' }, priority: 0.2 },
};

export const ROUTE_KEYS = Object.keys(routes) as RouteKey[];

/** Leistungsseite ↔ Preiskategorie */
export const SERVICE_PAGES: Record<CategoryId, RouteKey> = {
  nails: 'svcNails',
  manicure: 'svcManicure',
  pedicure: 'svcPedicure',
  facial: 'svcFacial',
  lashes: 'svcLashes',
  hair: 'svcHair',
};

export function href(key: RouteKey, lang: Lang, hash?: string): string {
  return routes[key].path[lang] + (hash ? `#${hash}` : '');
}

export function routeForPath(pathname: string): { key: RouteKey; lang: Lang } | null {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const key of ROUTE_KEYS) {
    for (const lang of ['de', 'en', 'hu'] as const) {
      if (routes[key].path[lang] === p) return { key, lang };
    }
  }
  return null;
}

// Build-Prüfung: Slugs eindeutig und mit Sprachpräfix
{
  const seen = new Set<string>();
  for (const key of ROUTE_KEYS) {
    for (const [lang, p] of Object.entries(routes[key].path)) {
      if (seen.has(p)) throw new Error(`Doppelter Pfad ${p}`);
      seen.add(p);
      if (lang !== 'de' && !p.startsWith(`/${lang}/`)) throw new Error(`Pfad ${p} ohne /${lang}/-Präfix`);
      if (!/^\/[a-z0-9/-]*$/.test(p)) throw new Error(`Pfad ${p} enthält unzulässige Zeichen`);
    }
  }
}
