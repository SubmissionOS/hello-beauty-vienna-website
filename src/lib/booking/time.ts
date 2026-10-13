/**
 * Kalender- und Zeitrechnung in Europe/Vienna – unabhängig von der Zeitzone des Geräts.
 * Datumswerte sind Strings YYYY-MM-DD, Uhrzeiten Minuten seit Mitternacht (Wiener Ortszeit).
 */
export const TZ = 'Europe/Vienna';

const pad = (n: number) => String(n).padStart(2, '0');

export function toIsoDate(y: number, m: number, d: number): string {
  return `${y}-${pad(m)}-${pad(d)}`;
}

export function parseIsoDate(s: string): { y: number; m: number; d: number } {
  const [y, m, d] = s.split('-').map(Number) as [number, number, number];
  return { y, m, d };
}

/** Wochentag 0 = Montag … 6 = Sonntag (kalendarisch, zeitzonenunabhängig) */
export function weekdayMon0(s: string): number {
  const { y, m, d } = parseIsoDate(s);
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
}

export function addDays(s: string, n: number): string {
  const { y, m, d } = parseIsoDate(s);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return toIsoDate(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function compareDates(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Aktuelles Datum und Uhrzeit in Wien */
export function viennaNow(now = new Date()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { date: toIsoDate(get('year'), get('month'), get('day')), minutes: get('hour') * 60 + get('minute') };
}

/** UTC-Offset von Wien an einem Tag um 12 Uhr, z. B. "+02:00" (Sommerzeit) */
export function viennaOffset(date: string): string {
  const { y, m, d } = parseIsoDate(date);
  const probe = new Date(Date.UTC(y, m - 1, d, 12));
  const local = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' }).format(probe);
  const diff = Number(local) - 12;
  return `${diff >= 0 ? '+' : '-'}${pad(Math.abs(diff))}:00`;
}

export function toIsoDateTime(date: string, minutes: number): string {
  return `${date}T${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00${viennaOffset(date)}`;
}

/** Zerlegt einen Zeitstempel in Wiener Datum und Minuten (Eingabe muss Wiener Offset tragen) */
export function splitDateTime(iso: string): { date: string; minutes: number } {
  const date = iso.slice(0, 10);
  const [h, mi] = iso.slice(11, 16).split(':').map(Number) as [number, number];
  return { date, minutes: h * 60 + mi };
}

export function hhmm(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}
