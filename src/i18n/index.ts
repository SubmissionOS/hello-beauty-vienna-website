import { de } from './de';
import { en } from './en';
import { hu } from './hu';
import type { Widen } from './types';
import { LOCALES, type Lang } from './config';

export type Dict = Widen<typeof de>;

export const dictionaries: Record<Lang, Dict> = { de, en, hu };

export function t(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Ersetzt {name}-Platzhalter */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/* ------------------------------------------------------------------ */
/* Build-Prüfung: Jede Sprache hat dieselben Schlüssel, Array-Längen,   */
/* Platzhalter-Anzahl und keine leeren Texte. Fehler bricht den Build.  */
/* ------------------------------------------------------------------ */
const PLACEHOLDER = /\[(PLATZHALTER|PLACEHOLDER|HELYŐRZŐ)[^\]]*\]/g;
const VAR = /\{(\w+)\}/g;
const LINK = /\[\[[^\]|]+\|([a-zA-Z#-]+)\]\]/g;

function collect(s: string, re: RegExp): string[] {
  return [...s.matchAll(re)].map((m) => m[1] ?? m[0]).sort();
}

function compare(a: unknown, b: unknown, path: string, lang: Lang, errors: string[]): void {
  const ta = Array.isArray(a) ? 'array' : typeof a;
  const tb = Array.isArray(b) ? 'array' : typeof b;
  if (ta !== tb) {
    errors.push(`${lang}:${path} Typ ${ta} ≠ ${tb}`);
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) errors.push(`${lang}:${path} Länge ${a.length} ≠ ${b.length}`);
    a.forEach((v, i) => i < b.length && compare(v, b[i], `${path}[${i}]`, lang, errors));
    return;
  }
  if (ta === 'object' && a && b) {
    const ka = Object.keys(a as object);
    const kb = Object.keys(b as object);
    for (const k of ka) if (!kb.includes(k)) errors.push(`${lang}:${path}.${k} fehlt`);
    for (const k of kb) if (!ka.includes(k)) errors.push(`${lang}:${path}.${k} ist überzählig`);
    for (const k of ka) if (kb.includes(k)) compare((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`, lang, errors);
    return;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    if (b.trim() === '') errors.push(`${lang}:${path} ist leer`);
    if ((a.match(PLACEHOLDER) ?? []).length !== (b.match(PLACEHOLDER) ?? []).length)
      errors.push(`${lang}:${path} Anzahl Platzhalter ${(a.match(PLACEHOLDER) ?? []).length} ≠ ${(b.match(PLACEHOLDER) ?? []).length}`);
    if (collect(a, VAR).join() !== collect(b, VAR).join()) errors.push(`${lang}:${path} Variablen {…} weichen ab`);
    if (collect(a, LINK).join() !== collect(b, LINK).join()) errors.push(`${lang}:${path} interne Links [[…]] weichen ab`);
    if (lang !== 'de' && /\[PLATZHALTER/.test(b)) errors.push(`${lang}:${path} enthält deutsches „PLATZHALTER“`);
  }
}

if (process.env.I18N_SKIP_CHECK !== "1") {
  const errors: string[] = [];
  for (const lang of LOCALES) if (lang !== 'de') compare(de, dictionaries[lang], '$', lang, errors);
  if (errors.length) {
    throw new Error(`Übersetzungen unvollständig (${errors.length}):\n  ${errors.slice(0, 40).join('\n  ')}`);
  }
}
