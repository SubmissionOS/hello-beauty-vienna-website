# Hello Beauty – Website

Neue Website für Hello Beauty, Barnabitengasse 7, 1060 Wien. Statische Astro-Seite in Deutsch (`/`), Englisch (`/en/`) und Ungarisch (`/hu/`) mit Demo-Buchungsstrecke.

## Voraussetzungen

- Node.js **22.15.0** (siehe `.nvmrc`; mit nvm: `nvm use`)
- npm 10 (kommt mit Node)

## Starten

**Windows (PowerShell) und macOS (Terminal) – identische Befehle:**

```sh
npm ci --ignore-scripts
npm run build
npm run preview
```

Dann im Browser öffnen: <http://localhost:4321>

Für die Entwicklung mit automatischem Neuladen: `npm run dev`.

## Offline-Nutzung

Nach einmaligem `npm ci --ignore-scripts` braucht die Seite kein Internet: Schriften, Bilder und Skripte liegen lokal, es gibt keine externen Anfragen (keine Google Fonts, Karten, CDNs oder Tracker). `npm run build` und `npm run preview` laufen komplett offline – gut für die Vorführung beim Kunden.

## Demo-Modus

Standardmäßig ist der Demo-Modus aktiv (`PUBLIC_DEMO_MODE` nicht gesetzt oder `true`):

- alle Seiten tragen `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` sperrt alles (`Disallow: /`)
- `vercel.json` sendet zusätzlich `X-Robots-Tag: noindex, nofollow`
- die Buchung läuft gegen einen simulierten Kalender (`PUBLIC_BOOKING_ADAPTER=mock`); Formulare senden keine Daten

## Login-Button (Kundenportal)

Rechts oben im Kopfbereich steht „Anmelden“ (EN „Log in“, HU „Bejelentkezés“). Ziel ist `PUBLIC_PORTAL_URL` (Standard `https://kundenportal.hellobeautysalon.at`), die Sprache wird als `?lang=de|en|hu` angehängt; der Link öffnet im selben Tab. Solange `PUBLIC_DEMO_MODE=true` ist, öffnet der Button stattdessen den Hinweis „Kundenportal – bald verfügbar“.

Für den Livegang in Vercel (Settings → Environment Variables) setzen: `PUBLIC_DEMO_MODE=false` und bei abweichender Adresse `PUBLIC_PORTAL_URL=https://…`, danach neu deployen (die Werte werden beim Build eingelesen).

## Livegang

1. Alle `[PLATZHALTER: …]` ersetzen (Liste: `docs/nachtschicht-website-2026-10-13.md`).
2. In Vercel `PUBLIC_DEMO_MODE=false` setzen; Login-Ziel bei Bedarf über `PUBLIC_PORTAL_URL` (siehe oben).
3. In `vercel.json` den Header `X-Robots-Tag` entfernen.
4. Buchung: `PUBLIC_BOOKING_ADAPTER=http` (und ggf. `PUBLIC_BOOKING_API_BASE`) erst setzen, wenn das CRM den Vertrag aus `docs/api-contract.md` erfüllt.
5. Domain `hellobeautysalon.at` verbinden; Weiterleitungen der alten WordPress-URLs stehen bereits in `vercel.json`.

## Qualitätssicherung

```sh
npm run check                          # TypeScript + Groß-/Kleinschreibung der Pfade
npx --no-install playwright install    # einmalig: Test-Browser
npm test                               # Playwright: 7 Geräte × Chromium + WebKit
npm run lighthouse                     # bei laufendem `npm run preview`
```

Dokumentation: `docs/` (Konzept, Recherche, API-Vertrag, Abhängigkeiten, QA-Befunde, Review).

## Sicherheit der Abhängigkeiten

`.npmrc` setzt `ignore-scripts`, `save-exact` und eine Cooldown-Grenze (`before=`). Neue Pakete nur nach Prüfung; siehe `docs/dependencies.md`.
