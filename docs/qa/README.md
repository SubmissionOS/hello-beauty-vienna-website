# QA – so wird geprüft

Alle Prüfungen laufen lokal gegen den statischen Build (`npm run build`, dann startet Playwright `npm run preview` selbst).

| Befehl | Was |
|---|---|
| `npm run check` | TypeScript strict (`tsc --noEmit`) |
| `npm run build` | Build inkl. Übersetzungsprüfung (fehlender Schlüssel, leerer Text, abweichende Platzhalter/Links → Build bricht ab) |
| `npm test` | komplette Playwright-Suite, 7 Geräte × Chromium + WebKit (14 Projekte) |
| `npm run test:shots` | Screenshots aller Seiten/Sprachen/Geräte und Zustände → `docs/qa/screenshots/` |
| `npm run lighthouse` | Lighthouse mobil + Desktop für alle 51 Seiten → `docs/qa/lighthouse.md` |

## Testdateien
| Datei | Inhalt | Projekte |
|---|---|---|
| `tests/pages.spec.ts` | je Seite × Sprache: HTTP 200, `lang`, kein horizontales Scrollen, nichts ragt aus dem Viewport, kein überlaufender Text, Touch-Ziele ≥ 44 × 44 (mobil), Fokusziele nicht verdeckt, Bilder geladen + `alt`, eine h1, keine Überschriftensprünge, keine Schlüsselnamen/Variablen/`[[…]]` im UI, kein `hidden`-Element sichtbar, keine deutschen Reststrings auf EN/HU, axe-core (WCAG 2.0–2.2 A/AA + Best Practices) = 0, keine Fremd-Requests, keine Fehler-Responses, Konsole leer | alle 14 |
| `tests/workflows.spec.ts` | Buchung komplett (Start → Leistung → Preise → 7 Schritte → .ics) je Sprache, Deep-Links aller Leistungsseiten, Zurück/Ändern, Konflikt, Netzwerkfehler + Erneut versuchen, Tag ohne Slots, Sprachwechsel im Flow, Kontaktformular (leer/falsch/korrekt), Sprachwechsel auf jeder Seite in jede Sprache, Menü/Sheets/Popover (ESC, Wischen, Fokus-Rückgabe), Galerie-Filter + Lightbox (Pfeile, Tasten, Wischen, ESC, Zähler), 404 + Rückweg, kompletter Tastatur-Durchlauf | alle 14 (Tastatur: Desktop-Profile) |
| `tests/links.spec.ts` | Klick-Inventar → `inventar.json`; jeder Link: intern 200 + richtige Sprache, Anker vorhanden und nicht unter dem Sticky Header, extern `rel=noopener` + `target=_blank` + https, `tel:`/`mailto:` korrekt; jeder sichtbare Button zeigt eine Reaktion | Laptop/Chromium, iPhone 15/WebKit, Android 360/Chromium (+ Inventar iPhone 15/Chromium) |
| `tests/a11y-extra.spec.ts` | Reflow bei 320 px und 200 % Zoom, Textabstände WCAG 1.4.12, `prefers-reduced-motion`, `forced-colors` | Laptop/iPhone |
| `tests/seo.spec.ts` | Title/Description einzigartig und in Länge, Canonical, OG, hreflang gegenseitig + x-default, JSON-LD valide mit Salon-, Service- und FAQ-Knoten; Sitemap, robots.txt, llms.txt, Manifest | Laptop/Chromium |
| `tests/screenshots.spec.ts` | Ganzseiten-Aufnahmen + Zustände (alle Buchungsschritte, Laden, Fehler, Leer, Konflikt, Menü, Sprach-Sheet, Popover, Lightbox, Formularfehler/-erfolg) | Chromium alle Geräte, WebKit iPhone 15 |

## Sichtprüfung
`scripts/columns-all.ps1` legt jede Ganzseiten-Aufnahme in Spalten nebeneinander, damit auch 20 000 px lange Handy-Seiten vollständig in einem Bild betrachtet werden können. Befunde und Fixes: `befunde.md`.
