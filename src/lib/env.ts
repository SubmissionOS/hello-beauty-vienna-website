/**
 * Demo-Modus (Standard): noindex/nofollow auf allen Seiten, robots.txt sperrt alles.
 * Für den Livegang PUBLIC_DEMO_MODE=false setzen (und den X-Robots-Tag in vercel.json entfernen).
 */
export const demoMode = (import.meta.env.PUBLIC_DEMO_MODE ?? 'true') !== 'false';

/**
 * Ziel des Login-Buttons (späteres Kundenportal). Für den Livegang PUBLIC_PORTAL_URL setzen.
 * Die Sprache wird als ?lang=de|en|hu mitgegeben. Im Demo-Modus öffnet der Button stattdessen einen Hinweis.
 */
const PORTAL_DEFAULT = 'https://kundenportal.hellobeautysalon.at';
export function portalUrl(lang: 'de' | 'en' | 'hu'): string {
  const raw = import.meta.env.PUBLIC_PORTAL_URL || PORTAL_DEFAULT;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    url = new URL(PORTAL_DEFAULT);
  }
  url.searchParams.set('lang', lang);
  return url.toString();
}
