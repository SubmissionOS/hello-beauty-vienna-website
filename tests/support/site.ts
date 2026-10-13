import { routes, ROUTE_KEYS, type RouteKey } from '../../src/i18n/routes';
import { LOCALES, type Lang } from '../../src/i18n/config';
import { dictionaries } from '../../src/i18n';
import { allServices } from '../../src/data/services';

export interface PageRef {
  key: RouteKey | 'notFound';
  lang: Lang;
  path: string;
  id: string;
}

export const PAGES: PageRef[] = [
  ...ROUTE_KEYS.flatMap((key) => LOCALES.map((lang) => ({ key, lang, path: routes[key].path[lang], id: `${lang}-${key}` }))),
  ...LOCALES.map((lang) => ({
    key: 'notFound' as const,
    lang,
    path: lang === 'de' ? '/404.html' : `/${lang}/404/`,
    id: `${lang}-404`,
  })),
];

export const HTML_LANG: Record<Lang, string> = { de: 'de-AT', en: 'en', hu: 'hu' };

/** Strings, die sich zwischen DE und Zielsprache unterscheiden – dürfen auf EN/HU-Seiten nicht vorkommen. */
export function germanResidue(lang: Lang): string[] {
  if (lang === 'de') return [];
  const out = new Set<string>();
  const walk = (a: unknown, b: unknown) => {
    if (typeof a === 'string' && typeof b === 'string') {
      if (a !== b && a.length >= 14 && !/^https?:|@|\+43/.test(a)) out.add(a.replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1').split(/[{[]/)[0]!.trim());
      return;
    }
    if (Array.isArray(a) && Array.isArray(b)) a.forEach((v, i) => walk(v, b[i]));
    else if (a && b && typeof a === 'object' && typeof b === 'object')
      for (const k of Object.keys(a)) walk((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]);
  };
  walk(dictionaries.de, dictionaries[lang]);
  for (const s of allServices) if (s.name.de !== s.name[lang] && s.name.de.length >= 14) out.add(s.name.de);
  // Eigennamen und bewusst im Original belassene österreichische Rechtsbegriffe (mit Übersetzung daneben)
  const allowed = ['ESZTER NAILS e.U.', 'eingetragenes Einzelunternehmen', 'Handelsgericht Wien', 'Magistratisches Bezirksamt', 'Germaine de Capuccini'];
  return [...out].filter((s) => s.length >= 14 && !allowed.some((a) => s === a || s.startsWith(a)));
}
