/**
 * Demo-Modus (Standard): noindex/nofollow auf allen Seiten, robots.txt sperrt alles.
 * Für den Livegang PUBLIC_DEMO_MODE=false setzen (und den X-Robots-Tag in vercel.json entfernen).
 */
export const demoMode = (import.meta.env.PUBLIC_DEMO_MODE ?? 'true') !== 'false';
