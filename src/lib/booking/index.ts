/**
 * Einstiegspunkt der Buchung. Welcher Adapter aktiv ist, entscheidet die Umgebungsvariable
 * PUBLIC_BOOKING_ADAPTER ('mock' | 'http', Standard: mock). Die Oberfläche importiert nur `api`.
 */
import { mockAdapter, mockControls } from './mockAdapter';
import { createHttpAdapter } from './httpAdapter';
import type { BookingApi } from './types';

export * from './types';

const mode = import.meta.env.PUBLIC_BOOKING_ADAPTER ?? 'mock';

export const api: BookingApi = mode === 'http' ? createHttpAdapter(import.meta.env.PUBLIC_BOOKING_API_BASE ?? '') : mockAdapter;
export const isDemo = mode !== 'http';

/** Schalter der Demo (Netzwerkfehler/Konflikt simulieren). Im HTTP-Betrieb wirkungslos. */
export const demoControls = mockControls;
