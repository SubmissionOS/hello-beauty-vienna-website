/**
 * HTTP-Adapter für das spätere CRM-Backend (fertig, in der Demo inaktiv).
 * Aktivierung: PUBLIC_BOOKING_ADAPTER=http und optional PUBLIC_BOOKING_API_BASE (Standard: gleiche Domain).
 * Vertrag: docs/api-contract.md
 */
import {
  BookingError,
  type AvailabilityQuery,
  type AvailabilityResult,
  type Booking,
  type BookingApi,
  type CreateBookingRequest,
  type PaymentIntent,
  type PaymentIntentRequest,
  type ServiceDTO,
  type StaffDTO,
} from './types';

const TIMEOUT_MS = 12000;

export function createHttpAdapter(base = ''): BookingApi {
  async function request<T>(path: string, init: RequestInit & { idempotencyKey?: string } = {}): Promise<T> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(`${base}${path}`, {
        ...init,
        signal: ctrl.signal,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          ...(init.body ? { 'Content-Type': 'application/json' } : {}),
          ...(init.idempotencyKey ? { 'Idempotency-Key': init.idempotencyKey } : {}),
          ...(init.headers ?? {}),
        },
      });
    } catch {
      throw new BookingError('network', 'Netzwerkfehler');
    } finally {
      clearTimeout(timer);
    }
    const body = (await res.json().catch(() => ({}))) as { error?: { code?: string; message?: string; fields?: Record<string, string> } } & T;
    if (res.ok) return body as T;
    const msg = body.error?.message ?? res.statusText;
    if (res.status === 409) throw new BookingError('conflict', msg);
    if (res.status === 422 || res.status === 400) throw new BookingError('validation', msg, body.error?.fields);
    if (res.status === 503) throw new BookingError('unavailable', msg);
    throw new BookingError('server', msg);
  }

  return {
    getServices: () => request<{ services: ServiceDTO[] }>('/api/services').then((r) => r.services),
    getStaff: () => request<{ staff: StaffDTO[] }>('/api/staff').then((r) => r.staff),
    getAvailability(q: AvailabilityQuery) {
      const p = new URLSearchParams({ serviceIds: q.serviceIds.join(',') });
      if (q.date) p.set('date', q.date);
      if (q.from) p.set('from', q.from);
      if (q.to) p.set('to', q.to);
      if (q.staffId) p.set('staffId', q.staffId);
      return request<AvailabilityResult>(`/api/availability?${p}`);
    },
    createBooking(r: CreateBookingRequest) {
      const { idempotencyKey, ...payload } = r;
      return request<{ booking: Booking }>('/api/bookings', { method: 'POST', body: JSON.stringify(payload), idempotencyKey }).then((x) => x.booking);
    },
    createPaymentIntent(r: PaymentIntentRequest) {
      const { idempotencyKey, ...payload } = r;
      return request<{ paymentIntent: PaymentIntent }>('/api/payments/intent', { method: 'POST', body: JSON.stringify(payload), idempotencyKey }).then(
        (x) => x.paymentIntent,
      );
    },
  };
}
