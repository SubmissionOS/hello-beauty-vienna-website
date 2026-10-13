import type { Lang } from '../i18n/config';
import { href, type RouteKey } from '../i18n/routes';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const TOKEN =
  /\[\[([^\]|]+)\|([a-zA-Z]+)(#[a-z0-9-]+)?\]\]|(\[(?:PLATZHALTER|PLACEHOLDER|HELYŐRZŐ)[^\]]*\])|([\w.+-]+@[\w-]+\.[\w.]+)|(https:\/\/[^\s,;)]+[^\s,;).])|(\+43 [\d ]{6,}\d)/g;

/**
 * Wandelt einen Text in sicheres HTML um: interne Links [[Text|routeKey]], E-Mail, https-URL und
 * österreichische Telefonnummern werden verlinkt, Platzhalter als <mark> hervorgehoben.
 */
export function rich(text: string, lang: Lang, newWindowLabel = ''): string {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    out += esc(text.slice(last, m.index));
    last = (m.index ?? 0) + m[0].length;
    if (m[1] && m[2]) {
      out += `<a href="${href(m[2] as RouteKey, lang)}${m[3] ?? ''}">${esc(m[1])}</a>`;
    } else if (m[4]) {
      out += `<mark class="placeholder">${esc(m[4])}</mark>`;
    } else if (m[5]) {
      out += `<a href="mailto:${m[5]}">${esc(m[5])}</a>`;
    } else if (m[6]) {
      const label = m[6].replace(/^https:\/\//, '').replace(/\/$/, '');
      out += `<a href="${esc(m[6])}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="visually-hidden"> ${esc(newWindowLabel)}</span></a>`;
    } else if (m[7]) {
      out += `<a href="tel:${m[7].replace(/[^\d+]/g, '')}" class="nowrap">${esc(m[7])}</a>`;
    }
  }
  out += esc(text.slice(last));
  return out;
}

/** Nur Platzhalter markieren, keine Links (für Texte innerhalb von Links/Labels) */
export function marks(text: string): string {
  return esc(text).replace(/\[(?:PLATZHALTER|PLACEHOLDER|HELYŐRZŐ)[^\]]*\]/g, (p) => `<mark class="placeholder">${p}</mark>`);
}
