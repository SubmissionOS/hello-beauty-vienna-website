/**
 * Buchungs-Schnittstelle. Die Oberfläche kennt nur `BookingApi` – nie einen konkreten Adapter.
 * Vertrag für das CRM-Backend: docs/api-contract.md
 */

/** Kalenderdatum in Europe/Vienna, Format YYYY-MM-DD */
export type IsoDate = string;
/** Zeitpunkt nach ISO 8601 mit Offset, z. B. 2026-10-15T09:30:00+02:00 */
export type IsoDateTime = string;

export interface ServiceDTO {
  id: string;
  categoryId: string;
  name: { de: string; en: string; hu: string };
  price: number;
  priceFrom: boolean;
  durationMin: number;
  bookable: boolean;
}

export interface StaffDTO {
  id: string;
  /** null = Name noch nicht hinterlegt */
  name: string | null;
}

export interface AvailabilityQuery {
  serviceIds: string[];
  /** Ein Tag … */
  date?: IsoDate;
  /** … oder ein Zeitraum (inklusive) */
  from?: IsoDate;
  to?: IsoDate;
  /** null/undefined = keine Präferenz */
  staffId?: string | null;
}

export type DayStatus = 'available' | 'full' | 'closed' | 'past';

export interface Slot {
  start: IsoDateTime;
  end: IsoDateTime;
  /** Mitarbeiterin, die den Termin übernehmen würde */
  staffId: string;
}

export interface DayAvailability {
  date: IsoDate;
  status: DayStatus;
  slots: Slot[];
}

export interface AvailabilityResult {
  timezone: 'Europe/Vienna';
  days: DayAvailability[];
  /** Nächster freier Termin nach dem letzten abgefragten Tag (für den Leer-Zustand) */
  nextAvailable: Slot | null;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  note?: string;
}

export interface CreateBookingRequest {
  serviceIds: string[];
  staffId: string | null;
  start: IsoDateTime;
  customer: Customer;
  paymentMethod: 'onsite' | 'online';
  locale: 'de' | 'en' | 'hu';
  consents: { terms: boolean; earlyStart: boolean };
  /** Gleicher Schlüssel = gleiche Buchung (Wiederholung nach Netzwerkfehler legt keinen zweiten Termin an) */
  idempotencyKey: string;
}

export interface Booking {
  id: string;
  reference: string;
  status: 'confirmed' | 'pending_payment';
  start: IsoDateTime;
  end: IsoDateTime;
  staffId: string;
  serviceIds: string[];
  totalPrice: number;
  currency: 'EUR';
}

export interface PaymentIntentRequest {
  bookingId: string;
  amount: number;
  currency: 'EUR';
  idempotencyKey: string;
}

export interface PaymentIntent {
  id: string;
  status: 'requires_action' | 'succeeded' | 'unavailable';
  /** Weiterleitung zum Zahlungsanbieter (später) */
  redirectUrl?: string;
}

export type BookingErrorCode = 'conflict' | 'validation' | 'network' | 'unavailable' | 'server';

export class BookingError extends Error {
  constructor(
    public readonly code: BookingErrorCode,
    message: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'BookingError';
  }
}

export interface BookingApi {
  getServices(): Promise<ServiceDTO[]>;
  getStaff(): Promise<StaffDTO[]>;
  getAvailability(q: AvailabilityQuery): Promise<AvailabilityResult>;
  createBooking(r: CreateBookingRequest): Promise<Booking>;
  createPaymentIntent(r: PaymentIntentRequest): Promise<PaymentIntent>;
}
