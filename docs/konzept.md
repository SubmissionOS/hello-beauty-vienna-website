# Konzept – hellobeautysalon.at (Relaunch 2026)

Grundlage: `docs/research/bestand.md`, `guddiweb-standard.md`, `recht-at-eu.md`, `impressum-daten.md`, `seo-geo.md`, `ios-design.md`.

## 1. Leitidee
Ruhig, hell, präzise. Die Website wirkt wie der Salon selbst: weißer Marmor, goldenes HB-Monogramm, Samt in Salbei und Petrol. Marke (Farben, Playfair Display, Roboto, Logo) bleibt; neu sind Layout, Hierarchie und eine Bedienung, die sich auf dem iPhone wie eine gute App anfühlt. Jede Seite endet in genau einem nächsten Schritt: **Termin buchen**.

Positionierung in einem Satz (Faktenblock, überall identisch): *Hello Beauty ist ein Nagel- und Kosmetiksalon in der Barnabitengasse 7 in 1060 Wien-Mariahilf, wenige Gehminuten von der Mariahilfer Straße. Das Team bietet Nagelmodellage, Maniküre mit Gellack und Shellac, Pediküre, Kosmetik, Wimpern & Brauen sowie Haarentfernung – Montag bis Samstag von 9 bis 19 Uhr.*

## 2. Sitemap (echte Multi-Page-Website)

| Schlüssel | DE | EN | HU |
|---|---|---|---|
| home | `/` | `/en/` | `/hu/` |
| services | `/leistungen/` | `/en/services/` | `/hu/szolgaltatasok/` |
| svcNails | `/leistungen/nagelmodellage/` | `/en/services/nail-extensions/` | `/hu/szolgaltatasok/mukorom/` |
| svcManicure | `/leistungen/manikuere/` | `/en/services/manicure/` | `/hu/szolgaltatasok/manikur/` |
| svcPedicure | `/leistungen/pedikuere/` | `/en/services/pedicure/` | `/hu/szolgaltatasok/pedikur/` |
| svcFacial | `/leistungen/kosmetik/` | `/en/services/facials/` | `/hu/szolgaltatasok/kozmetika/` |
| svcLashes | `/leistungen/wimpern-augenbrauen/` | `/en/services/lashes-brows/` | `/hu/szolgaltatasok/szempilla-szemoldok/` |
| svcHair | `/leistungen/haarentfernung/` | `/en/services/hair-removal/` | `/hu/szolgaltatasok/szortelenites/` |
| prices | `/preise/` | `/en/prices/` | `/hu/arak/` |
| gallery | `/galerie/` | `/en/gallery/` | `/hu/galeria/` |
| about | `/ueber-uns/` | `/en/about/` | `/hu/rolunk/` |
| contact | `/kontakt/` | `/en/contact/` | `/hu/kapcsolat/` |
| booking | `/termin-buchen/` | `/en/book/` | `/hu/idopontfoglalas/` |
| faq | `/faq/` | `/en/faq/` | `/hu/gyik/` |
| imprint | `/impressum/` | `/en/imprint/` | `/hu/impresszum/` |
| privacy | `/datenschutz/` | `/en/privacy/` | `/hu/adatvedelem/` |
| accessibility | `/barrierefreiheit/` | `/en/accessibility/` | `/hu/akadalymentesseg/` |
| 404 | `/404.html` | `/en/404.html` | `/hu/404.html` |

17 Seiten × 3 Sprachen = 51 Seiten + 3 Fehlerseiten. Die sechs Leistungsseiten entsprechen den Hauptkategorien der Preisliste (Wimpernlifting, Laminierung, Färben und Verlängerung → „Wimpern & Brauen“; Sugaring, Waxing, Laser → „Haarentfernung“). HU-Slugs ohne Akzente.

## 3. Seiten

| Seite | Ziel | Zielgruppe | Hauptkeyword DE / EN / HU | Inhaltsblöcke | Primäre Aktion |
|---|---|---|---|---|---|
| Start | In 5 Sekunden: Wer, wo, was, wie buchen | Neukundinnen aus Google/Maps, Stammkundinnen | Nagelstudio Wien 1060 / nail salon Vienna / körömszalon Bécs | Hero (Foto Empfang, H1, 2 CTAs), Faktenleiste (Adresse, Öffnungszeiten, Sprachen), 6 Leistungskarten mit „ab“-Preis, Warum Hello Beauty (4 Punkte), Bildband, Bewertungs-Hinweis Treatwell, Anfahrt kurz, FAQ-Auszug, Abschluss-CTA | Termin buchen |
| Leistungen | Überblick und Verteiler | Vergleichende | Kosmetikstudio Wien Mariahilf / beauty salon Vienna / szépségszalon Bécs | Intro, 6 Kategorie-Zeilen (Bild, Kurztext, Preisspanne, Link), CTA | Leistung wählen |
| 6 Leistungsseiten | Leistung verkaufen, Fragen klären | Kundinnen mit konkretem Wunsch | z. B. Gelnägel Wien 1060 / gel nails Vienna / műköröm Bécs | Hero mit Bild, Nutzen, Ablauf (Schritte), Dauer & Haltbarkeit, Pflegetipps, Preis-Ausschnitt, FAQ, verwandte Leistungen, Buchen mit Vorauswahl | Diese Leistung buchen (`?leistung=`) |
| Preise | Vollständige Preisliste | Preisvergleicherinnen | Preise Nagelstudio Wien / nail salon prices Vienna / körömszalon árak Bécs | Segmented Control / Sprungmarken je Kategorie, Tabellen (Desktop) bzw. Listen-Zellen (mobil), USt.-Hinweis, PDF-Download | Termin buchen |
| Galerie | Arbeitsproben zeigen | Unentschlossene | Nageldesign Ideen Wien / nail art Vienna / körömdíszítés Bécs | Filter (Alle/Nägel/Pediküre/Wimpern/Salon), Raster, Lightbox | Termin buchen |
| Über uns | Vertrauen | Neukundinnen | Hello Beauty Team / about Hello Beauty / Hello Beauty csapat | Geschichte (belegte Fakten), Werte (Hygiene, Präzision, Ruhe), Team [PLATZHALTER], Salonbilder, Sprachen | Termin buchen |
| Kontakt & Anfahrt | Erreichbarkeit | Alle | Nagelstudio Barnabitengasse / … | Kontaktzellen (Tel, E-Mail, Adresse kopieren), Öffnungszeiten, Anfahrt (U3 Neubaugasse 2–3 Gehminuten, Bus 13A/14A/57A Haus des Meeres, U4 Kettenbrückengasse), Karten-Links, Schaufensterfoto, Formular (Demo) | Anrufen / Buchen |
| Termin buchen | Buchung abschließen | Entschlossene | Termin Nagelstudio Wien online / book nail appointment Vienna / időpontfoglalás körmös Bécs | 7-Schritt-Flow | Zahlungspflichtig buchen (Demo) |
| FAQ | Einwände klären, GEO | Alle, KI-Suchmaschinen | Gel oder Shellac / gel vs shellac / zselé vagy shellac | Gruppierte Fragen (Details/summary), FAQPage-JSON-LD | Termin buchen |
| Impressum, Datenschutz, Barrierefreiheit | Rechtssicherheit | Behörden, Kundinnen | – | Rechtstexte; EN/HU mit Hinweis „deutsche Fassung maßgeblich“ | – |
| 404 | Rückweg | Verirrte | – | Kurzer Text, Links Start/Leistungen/Buchen | Zur Startseite |

## 4. Navigation
- **Mobil (< 1024 px):** Sticky Header (56 px + Safe-Area) mit Logo links, Sprachumschalter (Flagge + Kürzel) und Menü-Button rechts; Header mit dezentem Blur. Menü als Vollbild-Sheet von unten mit iOS-Listenzellen (Chevron). **Untere Aktionsleiste** mit „Termin buchen“ (volle Breite, 50 px) + Telefon-Icon-Button, Safe-Area-Padding, ausgeblendet auf der Buchungsseite und bei offener Tastatur.
- **Desktop (≥ 1024 px):** Logo links, Navigation Mitte (Leistungen mit Unterseiten als Popover-Liste, Preise, Galerie, Über uns, Kontakt), rechts Sprachumschalter (Popover) und Button „Termin buchen“.
- **Footer:** dunkel (Ink), Logo weiß, Faktenblock, Öffnungszeiten, Kontakt, Leistungslinks, Rechtliches, Social.
- **Breadcrumbs** ab Ebene 2 (Leistungsseiten, Rechtliches nicht).

## 5. Designsystem (CSS Custom Properties, `src/styles/tokens.css`)

### Farben (aus Phase 1, mit Rollen)
| Token | Hex | Rolle | Kontrast |
|---|---|---|---|
| `--c-gold` | `#9E8832` | Markengold (Original): Linien, Icons, Monogramm-Akzente, große Schrift ≥ 24 px | 3,49:1 auf Weiß (nur ≥ 24 px / UI) |
| `--c-gold-text` | `#7A6823` | **Abgedunkeltes Markengold für Text**, Links, primäre Buttons (weißer Text) | 5,48:1 Weiß · 4,90:1 Creme |
| `--c-gold-deep` | `#5C4F1C` | Hover/Active Buttons | 8,11:1 |
| `--c-gold-soft` | `#DDC87C` | Original-Verlaufsfarbe: Hairlines, Gold auf Dunkel | 9,06:1 auf Ink |
| `--c-accent` | `#DEBF4A` | Original-Akzent: Fokusring auf Dunkel, kleine Schmuckelemente | 8,37:1 auf Ink |
| `--c-cream` | `#F5F2EB` | Original-Secondary: Abschnittsflächen | – |
| `--c-paper` | `#FBF9F4` | Seitenhintergrund | – |
| `--c-white` | `#FFFFFF` | Karten, Zellen, Header | – |
| `--c-ink` | `#2B2618` | Fließtext, Überschriften, Footer-Fläche | 15,07:1 Weiß · 13,48:1 Creme |
| `--c-ink-muted` | `#635B4A` | Sekundärtext | 6,72:1 Weiß · 6,01:1 Creme |
| `--c-line` | `#E6DFCF` | dekorative Trennlinien | – |
| `--c-field` | `#8C8270` | Rahmen von Eingabefeldern/Steuerelementen | 3,79:1 Weiß · 3,39:1 Creme (≥ 3:1, WCAG 1.4.11) |
| `--c-on-dark-muted` | `#B9AE97` | Sekundärtext auf Ink | 6,87:1 |
| `--c-error` | `#A3261E` | Fehlermeldungen | 6,9:1 Weiß |
| `--c-success` | `#2F6B3A` | Erfolg | 6,4:1 Weiß |

**Abweichung dokumentiert:** Die Markenfarbe `#9E8832` war auf der alten Seite Textfarbe (3,49:1) und Button-Grund mit weißem Text auf `#CBBA7A→#DDC87C` (1,7–1,9:1). Neu: Text und Buttons in `#7A6823` (gleicher Farbton, ~20 % dunkler), das Original-Gold bleibt für Flächen, Linien und Ornamente. Kein Verlauf mehr auf Buttons (Kontrast, Ruhe).

### Typografie
- Überschriften: **Playfair Display 600** (wie Bestand), H1/Display 500–600, Zeilenhöhe 1,12–1,2, `text-wrap: balance`.
- Text: **Roboto 400** 17 px / 1,6 (Bestand nutzte 300 bei 15–16 px – für Lesbarkeit und Kontrast auf 400/17 px angehoben), Lead 300 bei 19–22 px, Buttons/Labels 500.
- Skala (fluid 360 → 1440 px): Display 38→64 px, H1 34→52, H2 28→40, H3 20→24, Lead 19→22, Body 17, Small 15, Eyebrow 13 (500, Versalien, Laufweite 0,12em).
- Inputs ≥ 16 px (iOS-Zoom), Ziffern tabellarisch (`font-variant-numeric: tabular-nums`) in Preisen und Uhrzeiten.

### Abstände, Raster, Radien, Schatten
- Basis 4 px: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96.
- Sektionsabstand `clamp(4rem, 2.9rem + 4.9vw, 7.5rem)`, Seitenrand `clamp(1rem, 0.5rem + 2.2vw, 2.5rem)`, Container 1200 px, Lesebreite 66ch.
- Radien dezent: Zellen/Inputs 12 px, Karten/Bilder 16 px, Sheets oben 24 px, Buttons/Chips/Segmented 999 px.
- Schatten warm (Ink-basiert): `--sh-1` Zellen, `--sh-2` Karten/Popover, `--sh-3` Sheets.
- Breakpoints: 480 · 768 · 1024 · 1280 px.

### Bewegung
`--ease-out: cubic-bezier(.2,.8,.2,1)`, `--ease-sheet: cubic-bezier(.32,.72,0,1)`; 150 ms (Tap/Hover), 220 ms (Standard), 320 ms (Sheets). Nur `transform`/`opacity`. `prefers-reduced-motion` → alles aus.

### Komponenten
Button (primär gold-text, sekundär Kontur, Text-Link), Listen-Zelle mit Chevron, Karte, Segmented Control (Radiogruppe), Chip (Radio/Checkbox), Bottom-Sheet (`<dialog>`), Popover, Lightbox, Kalender-Grid, Slot-Raster, Fortschrittsbalken, Hinweisbanner (Demo), Formularfeld mit Inline-Fehler, Breadcrumb, FAQ (`details`).

### Bewusst vermieden (kein KI-/Template-Look)
Keine Blau-/Lila-Verläufe, keine Emojis, kein Icon-Raster mit generischen Symbolen, keine Glasmorphismus-Karten, keine Zahlen-Zähler, keine erfundenen Testimonials. Icons nur funktional (Telefon, Pfeil, Chevron, Kalender, Uhr, Ort), 1,5-px-Linien, eigene Inline-SVGs.

## 6. Technik in Kürze
Astro 7 statisch, TypeScript strict, keine UI-Bibliothek. i18n über zentrale Routentabelle (`src/i18n/routes.ts`) + typisierte Wörterbücher (`src/i18n/{de,en,hu}.ts`); fehlende Schlüssel brechen Typprüfung und Build. Seiten über eine dynamische Route mit übersetzten Slugs. Bilder über `astro:assets` (AVIF/WebP). Buchung als Vanilla-TypeScript-Modul mit Adapter-Schnittstelle (`src/lib/booking/`). Kein Cookie, nur `sessionStorage` (Sprachwahl, Buchungsentwurf).
