# Buchungs-API – Vertrag für das CRM-Backend

Stand: 2026-10-14 · Version 1

Die Website spricht ausschließlich über die Schnittstelle `BookingApi` (`src/lib/booking/types.ts`). In der Demo ist der `mockAdapter` aktiv. Sobald ein Backend diesen Vertrag erfüllt, wird mit `PUBLIC_BOOKING_ADAPTER=http` (optional `PUBLIC_BOOKING_API_BASE=https://…`) auf den fertigen `httpAdapter` umgeschaltet – ohne Änderung an der Oberfläche.

## Grundregeln
- **Zeitzone:** Alle Termine gelten in `Europe/Vienna`. Daten als `YYYY-MM-DD` (Kalendertag in Wien), Zeitpunkte nach **ISO 8601 mit Offset**, z. B. `2026-10-15T09:30:00+02:00` (Sommerzeit) bzw. `+01:00` (Winterzeit).
- **Format:** JSON, UTF-8. Beträge in Euro als Zahl mit zwei Nachkommastellen (`49.00`), immer **inklusive USt.**
- **Sprache:** `locale` = `de` | `en` | `hu` (für Bestätigungs-E-Mails und Texte).
- **Idempotenz:** Schreibende Aufrufe senden den Header `Idempotency-Key: <UUID v4>`. Gleicher Schlüssel + gleicher Inhalt innerhalb von 24 h → gleiche Antwort, kein zweiter Termin. Gleicher Schlüssel + anderer Inhalt → `422` mit `code: "idempotency_mismatch"`.
- **Fehlerformat** (alle 4xx/5xx):
  ```json
  { "error": { "code": "slot_taken", "message": "Der Termin ist nicht mehr verfügbar.", "fields": { "email": "invalid" } } }
  ```
- **CORS:** Gleiche Domain empfohlen (z. B. `/api/*` hinter derselben Domain), dann keine CORS-Konfiguration nötig. Die CSP der Website erlaubt nur `connect-src 'self'`.
- **Datenschutz:** Notizfeld darf keine Gesundheitsdaten enthalten (Hinweis im Formular). Speicherfristen siehe Datenschutzerklärung.

## GET /api/services
Liste aller Leistungen (Quelle der Wahrheit wird das CRM; die Website hat eine identische Kopie in `src/data/services.ts`).

```json
{
  "services": [
    {
      "id": "gel-polish",
      "categoryId": "manicure",
      "name": { "de": "Gellack / Shellac", "en": "Gel polish / Shellac", "hu": "Gél lakk / shellac" },
      "price": 49.0,
      "priceFrom": false,
      "durationMin": 60,
      "bookable": true
    }
  ]
}
```
`bookable: false` = nur als Zusatz zu einer Hauptleistung (z. B. `extra-french`).

## GET /api/staff
```json
{ "staff": [{ "id": "staff-1", "name": "Anna" }, { "id": "staff-2", "name": null }] }
```

## GET /api/availability
Parameter:

| Name | Pflicht | Beispiel | Bedeutung |
|---|---|---|---|
| `serviceIds` | ja | `gel-polish,extra-french` | kommagetrennt; das Backend berechnet Gesamtdauer inkl. Pufferzeiten |
| `date` | entweder `date` … | `2026-10-15` | ein Tag (Uhrzeit-Schritt) |
| `from`, `to` | … oder Zeitraum | `2026-10-01`, `2026-10-31` | inklusive, max. 62 Tage (Kalender-Schritt) |
| `staffId` | nein | `staff-2` | fehlt = keine Präferenz |

Antwort `200`:
```json
{
  "timezone": "Europe/Vienna",
  "days": [
    {
      "date": "2026-10-15",
      "status": "available",
      "slots": [
        { "start": "2026-10-15T09:00:00+02:00", "end": "2026-10-15T10:00:00+02:00", "staffId": "staff-1" },
        { "start": "2026-10-15T09:15:00+02:00", "end": "2026-10-15T10:15:00+02:00", "staffId": "staff-3" }
      ]
    },
    { "date": "2026-10-18", "status": "closed", "slots": [] }
  ],
  "nextAvailable": { "start": "2026-10-16T11:30:00+02:00", "end": "2026-10-16T12:30:00+02:00", "staffId": "staff-2" }
}
```
- `status`: `available` | `full` (offen, aber kein Slot frei) | `closed` (Sonntag, Feiertag, außerhalb des Buchungshorizonts) | `past`.
- Slots im 15-Minuten-Raster innerhalb der Öffnungszeiten (Mo–Sa 09:00–19:00), Mindestvorlauf am selben Tag (Demo: 60 Minuten), Pufferzeit nach jedem Termin (Demo: 10 Minuten).
- `nextAvailable`: erster freier Slot **nach** dem letzten angefragten Tag (für „nächster freier Termin“), sonst `null`.
- Fehler: `400` (Parameter fehlen/ungültig), `503` (Kalender vorübergehend nicht erreichbar).

## POST /api/bookings
Header: `Idempotency-Key: 3f6c…` (Pflicht)

```json
{
  "serviceIds": ["gel-polish"],
  "staffId": null,
  "start": "2026-10-15T09:00:00+02:00",
  "customer": { "name": "Maria Muster", "phone": "+43 660 1234567", "email": "maria@example.com", "note": "Nude, kurz" },
  "paymentMethod": "onsite",
  "locale": "de",
  "consents": { "terms": true, "earlyStart": true }
}
```

| Status | Bedeutung | Antwort |
|---|---|---|
| `201 Created` | Termin angelegt | `{ "booking": Booking }` |
| `409 Conflict` | Slot wurde zwischenzeitlich vergeben | `{ "error": { "code": "slot_taken", … } }` → Oberfläche zeigt Hinweis und lädt die Uhrzeiten neu, Eingaben bleiben erhalten |
| `422 Unprocessable Entity` | Validierung (Pflichtfelder, ungültige E-Mail, `consents.terms` fehlt, `earlyStart` fehlt bei Termin innerhalb von 14 Tagen, Zusatzleistung ohne Hauptleistung) | `{ "error": { "code": "validation", "fields": { "email": "invalid" } } }` |
| `503` | Backend nicht verfügbar | Oberfläche zeigt Fehler + Telefonnummer |

`Booking`:
```json
{
  "id": "bk_01J9Z…",
  "reference": "HB-261015-4821",
  "status": "confirmed",
  "start": "2026-10-15T09:00:00+02:00",
  "end": "2026-10-15T10:00:00+02:00",
  "staffId": "staff-1",
  "serviceIds": ["gel-polish"],
  "totalPrice": 49.0,
  "currency": "EUR"
}
```
Pflichten des Backends nach `201` (FAGG § 7 Abs 3): Bestätigung auf dauerhaftem Datenträger (E-Mail) mit Leistung, Termin, Preis, Vertragspartnerin, Storno- und Rücktrittsinformation sowie Muster-Widerrufsformular. `status: "pending_payment"` nur bei Online-Zahlung.

## POST /api/payments/intent
Für die spätere Online-Zahlung (derzeit „bald verfügbar“, kein Zahlungsanbieter eingebunden).

Header: `Idempotency-Key` (Pflicht)
```json
{ "bookingId": "bk_01J9Z…", "amount": 49.0, "currency": "EUR" }
```
Antwort `201`:
```json
{ "paymentIntent": { "id": "pi_…", "status": "requires_action", "redirectUrl": "https://pay.example/…" } }
```
- Die Website leitet zur `redirectUrl` des Zahlungsanbieters weiter (Hosted Checkout). **Keine Kartenfelder und kein Anbieter-Skript auf der Website** – so bleibt die CSP streng und es fällt kein Cookie-Banner an.
- `status: "unavailable"` → Oberfläche bietet nur „Vor Ort bezahlen“ an.
- Rückkehr nach der Zahlung: `/termin-buchen/?bezahlt=<bookingId>` (Website ruft dann `GET /api/bookings/:id` ab – in Version 2 zu ergänzen).

## Fehlercodes (Übersicht)
| HTTP | `error.code` | Oberfläche |
|---|---|---|
| 400 | `bad_request` | Fehlermeldung, Telefonnummer |
| 409 | `slot_taken` | „Dieser Termin wurde gerade vergeben …“ → zurück zur Uhrzeit |
| 422 | `validation`, `idempotency_mismatch` | Feldfehler am Formular |
| 429 | `rate_limited` | „Bitte versuchen Sie es in einer Minute erneut.“ |
| 503 | `unavailable` | Fehler + „Erneut versuchen“ |
| Netzwerk/Timeout (12 s) | – | „Erneut versuchen“; Buchung mit gleichem Idempotency-Key wiederholbar |

## Testfälle für das Backend
1. Verfügbarkeit eines Sonntags → `status: "closed"`.
2. Zwei parallele `POST /api/bookings` auf denselben Slot mit unterschiedlichen Schlüsseln → genau ein `201`, ein `409`.
3. Wiederholung mit gleichem Schlüssel → identisches `201` ohne zweiten Termin.
4. Termin am Tag der Zeitumstellung (letzter Sonntag im März/Oktober) → korrekter Offset.
5. `earlyStart: false` bei Termin in 3 Tagen → `422`.
