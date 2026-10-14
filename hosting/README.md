# Hosting (vorbereitet, nicht veröffentlicht)

Die Website ist rein statisch (`npm run build` → `dist/`). Für das spätere Hosting liegen hier fertige Konfigurationen:

| Datei | Zweck |
|---|---|
| `../vercel.json` | Liegt im Projektstamm: 301/308-Weiterleitungen aller alten WordPress-URLs (Seiten, PDFs, 154 Anhangseiten, Feeds, Sitemaps), Sicherheits-Header (CSP ohne Inline-Skripte, HSTS, nosniff, Referrer-, Permissions-Policy, COOP), Langzeit-Cache für `/_astro/*`. |
| `_redirects` | Gleiche Weiterleitungen für Netlify (nach `public/` kopieren), plus sprachspezifische 404-Seiten. |

Quelle der Weiterleitungs-Map: `docs/research/seo-geo.md`, Abschnitt 7. Abweichung: Alte Sitemaps leiten auf `/sitemap.xml` (die neue Sitemap liegt dort, nicht unter `/sitemap-index.xml`). Alte Startseiten-Anker (`/#uberuns`, `/#leistungen`, `/#galerie`, `/#preisliste`, `/#kontakt`) funktionieren weiter, weil die neue Startseite gleichnamige IDs trägt.

Sprachspezifische 404: Astro erzeugt `/404.html` (Deutsch), `/en/404/index.html` und `/hu/404/index.html`. Vercel liefert für unbekannte Pfade `/404.html`; Netlify nutzt die Regeln in `_redirects`.

Nach der Umstellung prüfen: `curl -sI https://hellobeautysalon.at/uber-uns/` → `308` + `location: /ueber-uns/`.

Vor dem Livegang:
- `PUBLIC_DEMO_MODE=false` setzen und den `X-Robots-Tag` aus `vercel.json` (jetzt im Projektstamm) entfernen.
- `PUBLIC_BOOKING_ADAPTER=http` erst setzen, wenn das CRM-Backend den Vertrag aus `docs/api-contract.md` erfüllt.
- Alle Platzhalter ersetzen (Liste im Bericht `docs/nachtschicht-website-2026-10-13.md`).
