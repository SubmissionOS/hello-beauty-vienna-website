/**
 * Mock-Adapter (aktiv in der Demo): läuft komplett im Browser, sendet nichts.
 * - 300–800 ms simulierte Latenz
 * - deterministische Belegung je Tag und Mitarbeiterin (aus dem Datum berechnet, jede Sitzung gleich)
 * - Öffnungszeiten Mo–Sa 09:00–19:00, 15-Minuten-Raster, 10 Minuten Puffer nach jedem Termin
 * - einzelne Tage komplett ausgebucht (für den Leer-Zustand mit „nächster freier Termin“)
 * - Schalter: nächste Anfrage mit Netzwerkfehler, nächste Buchung mit Konflikt (Slot gerade vergeben)
 */
import { allServices, categoryOfService } from '../../data/services';
import { site } from '../../data/site';
import {
  BookingError,
  type AvailabilityQuery,
  type AvailabilityResult,
  type Booking,
  type BookingApi,
  type CreateBookingRequest,
  type DayAvailability,
  type PaymentIntent,
  type ServiceDTO,
  type Slot,
  type StaffDTO,
} from './types';
import { addDays, compareDates, splitDateTime, toIsoDateTime, viennaNow, weekdayMon0 } from './time';

const STAFF = ['staff-1', 'staff-2', 'staff-3'];
const OPEN = 9 * 60;
const CLOSE = 19 * 60;
const STEP = 15;
const BUFFER = 10;
const LEAD = 60; // Mindestvorlauf in Minuten für Termine am selben Tag
const HORIZON = 120; // buchbar bis zu 120 Tage im Voraus
const CTL_KEY = 'hb-mock-ctl';
const TAKEN_KEY = 'hb-mock-taken';

interface Busy {
  start: number;
  end: number;
}

function fnv(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function read<T>(key: string, fallback: T): T {
  try {
    const v = sessionStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, v: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* Demo läuft auch ohne Speicher */
  }
}

/** Demo-Schalter (über die Demo-Werkzeuge oder ?demo=network / ?demo=conflict) */
export const mockControls = {
  get(): { failNext: boolean; conflictNext: boolean } {
    return read(CTL_KEY, { failNext: false, conflictNext: false });
  },
  set(v: Partial<{ failNext: boolean; conflictNext: boolean }>): void {
    write(CTL_KEY, { ...this.get(), ...v });
  },
};

const isFullDay = (date: string) => fnv(`full:${date}`) % 9 === 0;

/** Bereits belegte Zeiten einer Mitarbeiterin an einem Tag (deterministisch + in dieser Sitzung gebuchte) */
function busyFor(date: string, staff: string): Busy[] {
  const out: Busy[] = [];
  if (isFullDay(date)) {
    out.push({ start: OPEN, end: CLOSE });
  } else {
    const r = rng(fnv(`${date}|${staff}`));
    const saturday = weekdayMon0(date) === 5;
    // Teilzeit: manche Tage später Beginn oder früheres Ende
    const start = OPEN + [0, 0, 0, 30, 60, 120, 180][Math.floor(r() * 7)]!;
    const end = CLOSE - [0, 0, 0, 60, 120][Math.floor(r() * 5)]!;
    if (start > OPEN) out.push({ start: OPEN, end: start });
    if (end < CLOSE) out.push({ start: end, end: CLOSE });
    let t = start + [0, 15, 30, 60][Math.floor(r() * 4)]!;
    while (t < end - 30) {
      const len = [45, 60, 60, 75, 90, 120][Math.floor(r() * 6)]!;
      out.push({ start: t, end: Math.min(end, t + len + BUFFER) });
      const gap = saturday ? [0, 0, 15, 30, 60, 120][Math.floor(r() * 6)]! : [0, 15, 30, 45, 60, 90, 150, 210][Math.floor(r() * 8)]!;
      t += len + BUFFER + gap;
    }
  }
  for (const x of read<{ staffId: string; start: string; end: string }[]>(TAKEN_KEY, [])) {
    const a = splitDateTime(x.start);
    const b = splitDateTime(x.end);
    if (a.date === date && x.staffId === staff) out.push({ start: a.minutes, end: b.minutes + BUFFER });
  }
  return out;
}

function durationOf(serviceIds: string[]): number {
  const total = serviceIds.reduce((sum, id) => sum + (allServices.find((s) => s.id === id)?.min ?? 0), 0);
  return Math.max(STEP, Math.ceil(total / STEP) * STEP);
}

function dayAvailability(date: string, duration: number, staffId: string | null | undefined): DayAvailability {
  const now = viennaNow();
  if (weekdayMon0(date) === 6) return { date, status: 'closed', slots: [] };
  if (compareDates(date, now.date) < 0) return { date, status: 'past', slots: [] };
  if (compareDates(date, addDays(now.date, HORIZON)) > 0) return { date, status: 'closed', slots: [] };
  const staffList = staffId ? [staffId] : STAFF;
  const earliest = date === now.date ? Math.ceil((now.minutes + LEAD) / STEP) * STEP : OPEN;
  const slots: Slot[] = [];
  for (let t = Math.max(OPEN, earliest); t + duration <= CLOSE; t += STEP) {
    const free = staffList.find((s) => busyFor(date, s).every((b) => t + duration + BUFFER <= b.start || t >= b.end));
    if (free) slots.push({ start: toIsoDateTime(date, t), end: toIsoDateTime(date, t + duration), staffId: free });
  }
  return { date, status: slots.length ? 'available' : 'full', slots };
}

function nextAvailable(after: string, duration: number, staffId: string | null | undefined): Slot | null {
  for (let i = 1; i <= 60; i++) {
    const day = dayAvailability(addDays(after, i), duration, staffId);
    if (day.slots.length) return day.slots[0]!;
  }
  return null;
}

const delay = () => new Promise<void>((r) => setTimeout(r, 300 + Math.random() * 500));

function maybeFail(): void {
  const ctl = mockControls.get();
  if (ctl.failNext) {
    mockControls.set({ failNext: false });
    throw new BookingError('network', 'Simulierter Netzwerkfehler');
  }
}

export const mockAdapter: BookingApi = {
  async getServices(): Promise<ServiceDTO[]> {
    await delay();
    return allServices.map((s) => ({
      id: s.id,
      categoryId: categoryOfService(s.id) ?? '',
      name: s.name,
      price: s.price,
      priceFrom: !!s.from,
      durationMin: s.min,
      bookable: s.bookable,
    }));
  },

  async getStaff(): Promise<StaffDTO[]> {
    await delay();
    return STAFF.map((id) => ({ id, name: null }));
  },

  async getAvailability(q: AvailabilityQuery): Promise<AvailabilityResult> {
    await delay();
    maybeFail();
    const duration = durationOf(q.serviceIds);
    const from = q.date ?? q.from;
    const to = q.date ?? q.to ?? from;
    if (!from || !to) throw new BookingError('validation', 'date oder from/to fehlt');
    const days: DayAvailability[] = [];
    for (let d = from; compareDates(d, to) <= 0; d = addDays(d, 1)) days.push(dayAvailability(d, duration, q.staffId));
    return { timezone: 'Europe/Vienna', days, nextAvailable: nextAvailable(to, duration, q.staffId) };
  },

  async createBooking(r: CreateBookingRequest): Promise<Booking> {
    await delay();
    maybeFail();
    if (!r.consents.terms || !r.customer.name || !r.customer.email || !r.customer.phone) {
      throw new BookingError('validation', 'Pflichtangaben fehlen');
    }
    const { date, minutes } = splitDateTime(r.start);
    const duration = durationOf(r.serviceIds);
    const day = dayAvailability(date, duration, r.staffId);
    const slot = day.slots.find((s) => s.start === r.start);
    const ctl = mockControls.get();
    const taken = read<{ staffId: string; start: string; end: string; key: string }[]>(TAKEN_KEY, []);
    const repeat = taken.find((x) => x.key === r.idempotencyKey);
    if (!repeat && (!slot || ctl.conflictNext)) {
      if (ctl.conflictNext && slot) {
        // Simulation: eine andere Kundin war schneller – der Slot ist ab jetzt belegt
        taken.push({ staffId: slot.staffId, start: slot.start, end: slot.end, key: `other-${Date.now()}` });
        write(TAKEN_KEY, taken);
        mockControls.set({ conflictNext: false });
      }
      throw new BookingError('conflict', 'Slot nicht mehr verfügbar');
    }
    const staffId = repeat?.staffId ?? slot!.staffId;
    const end = toIsoDateTime(date, minutes + duration);
    if (!repeat) {
      taken.push({ staffId, start: r.start, end, key: r.idempotencyKey });
      write(TAKEN_KEY, taken);
    }
    const total = r.serviceIds.reduce((sum, id) => sum + (allServices.find((s) => s.id === id)?.price ?? 0), 0);
    const ref = `HB-${date.slice(2).replace(/-/g, '')}-${(fnv(r.idempotencyKey) % 9000) + 1000}`;
    return {
      id: `demo_${fnv(r.idempotencyKey).toString(36)}`,
      reference: ref,
      status: 'confirmed',
      start: r.start,
      end,
      staffId,
      serviceIds: r.serviceIds,
      totalPrice: Math.round(total * 100) / 100,
      currency: 'EUR',
    };
  },

  async createPaymentIntent(): Promise<PaymentIntent> {
    await delay();
    // Online-Zahlung ist in der Demo nicht verfügbar; es wird kein Zahlungsanbieter geladen
    return { id: 'demo_unavailable', status: 'unavailable' };
  },
};

export const MOCK_INFO = { phone: site.phone, staff: STAFF };
