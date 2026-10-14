/**
 * Signature-Moment 3: „Nächster freier Termin“-Chip (Hero und mobile Aktionsleiste).
 * Fragt die Buchungs-API (Demo: mockAdapter) nach dem nächsten freien Slot und verlinkt
 * in den Buchungsflow mit vorausgewählter Leistung und Uhrzeit (?leistung=…&termin=…).
 * Bis die Antwort da ist, hält der Chip seinen Platz (kein Layout-Sprung).
 */
import { api, isDemo } from '../lib/booking';
import { addDays, hhmm, parseIsoDate, splitDateTime, viennaNow } from '../lib/booking/time';
import { fmtClient as fmt } from './fmt';

interface Labels {
  today: string;
  tomorrow: string;
  on: string;
  fallback: string;
  label: string;
  demoNote: string;
}

const chips = [...document.querySelectorAll<HTMLAnchorElement>('[data-slot-chip]')];

async function load(first: HTMLAnchorElement): Promise<void> {
  const L = JSON.parse(first.dataset.labels ?? '{}') as Labels;
  const service = first.dataset.service ?? '';
  const serviceName = first.dataset.serviceName ?? '';
  const intl = first.dataset.intl ?? 'de-AT';
  const today = viennaNow().date;
  const set = (text: string, short: string, href?: string, aria?: string) => {
    for (const c of chips) {
      c.querySelector('[data-slot-text]')!.textContent = c.dataset.variant === 'bar' ? short : text;
      if (href) c.href = href;
      if (aria) c.setAttribute('aria-label', aria);
      c.dataset.state = 'ready';
    }
  };
  try {
    const res = await api.getAvailability({ serviceIds: [service], from: today, to: addDays(today, 13) });
    const slot = res.days.flatMap((d) => d.slots)[0] ?? res.nextAvailable;
    if (!slot) throw new Error('kein Slot');
    const { date, minutes } = splitDateTime(slot.start);
    const { y, m, d } = parseIsoDate(date);
    const day =
      date === today
        ? L.today
        : date === addDays(today, 1)
          ? L.tomorrow
          : fmt(L.on, { day: new Intl.DateTimeFormat(intl, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d)) });
    const when = `${day} ${hhmm(minutes)}`;
    // Kurzform für die Aktionsleiste: „Heute 16:30“, „Morgen 9:15“, „Fr. 10:00“
    const diff = date === today ? 0 : date === addDays(today, 1) ? 1 : null;
    const rel = diff === null ? new Intl.DateTimeFormat(intl, { weekday: 'short', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d)) : new Intl.RelativeTimeFormat(intl, { numeric: 'auto' }).format(diff, 'day');
    const short = `${rel.charAt(0).toUpperCase()}${rel.slice(1)} ${hhmm(minutes)}`;
    const href = `${first.pathname}?leistung=${encodeURIComponent(service)}&termin=${encodeURIComponent(slot.start)}`;
    const aria = fmt(L.label, { service: serviceName, when }) + (isDemo ? ` (${L.demoNote})` : '');
    set(`${day} · ${hhmm(minutes)}`, short, href, aria);
  } catch {
    // Kein Slot oder API nicht erreichbar: Chip bleibt ein Link in die Buchung
    set(L.fallback, L.fallback);
  }
}

if (chips[0]) void load(chips[0]);
