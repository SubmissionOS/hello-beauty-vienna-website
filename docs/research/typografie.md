# Typografie-Auswahl (Design-Upgrade, 2026-10-14)

## Ausgangslage
Bisher Playfair Display + Roboto – beide auf der Verbotsliste des Upgrade-Briefings. Farben bleiben unverändert.

## Kandidaten und Lizenzprüfung

| Schrift | Rolle | Lizenz | Self-Hosting im öffentlichen Repo | Ergebnis |
|---|---|---|---|---|
| Gambetta, Zodiak, Erode (Display), Switzer (Text) | – | ITF Free Font License (Fontshare) | **nein** – Weitergabe der Fontdateien untersagt; Fontshare verweist auf Download über fontshare.com. Das Repo `SubmissionOS/hello-beauty-vienna-website` ist öffentlich, Commit der Dateien = Weitergabe | ausgeschieden |
| Bodoni Moda | Display | SIL OFL 1.1 (google/fonts `ofl/bodonimoda/OFL.txt`) | ja | getestet (Paar A) |
| Gloock | Display | SIL OFL 1.1, © 2022 The Gloock Project Authors (`ofl/gloock/OFL.txt`) | ja | **gewählt** |
| Young Serif | Display | SIL OFL 1.1 | ja | getestet (Paar C) |
| Instrument Sans | Text | SIL OFL 1.1 | ja | getestet (Paar A) |
| Hanken Grotesk | Text | SIL OFL 1.1, © 2021 The Hanken Grotesk Project Authors (`ofl/hankengrotesk/OFL.txt`) | ja | **gewählt** |
| Figtree | Text | SIL OFL 1.1 | ja | getestet (Paar C) |

Quellen Lizenztexte: https://github.com/google/fonts/blob/main/ofl/gloock/OFL.txt · https://github.com/google/fonts/blob/main/ofl/hankengrotesk/OFL.txt · https://github.com/google/fonts/blob/main/ofl/bodonimoda/OFL.txt · Fontshare-Einschränkung: Sekundärquellen (licenseorg.com, wiki.adom.inc), der FFL-Text selbst war ohne Konto nicht abrufbar – im Zweifel gegen die Nutzung entschieden.

## Testseite `/_typo-test/` (temporär, nach der Auswahl gelöscht)
Drei Paarungen mit echten Texten der Seite (Hero DE, HU-Zeile mit Ő ő Ű ű, Fließtext 16 px, Preiszeilen), Aufnahmen bei 390 und 1440 px in Chromium.

**Glyphentest** (Canvas-Breite der Webfont mit Serif- vs. Monospace-Fallback identisch ⇒ Glyphe stammt aus der Webfont): alle sechs Schriften rendern ő ű Ő Ű selbst – in Chromium und WebKit.

| Paar | Eindruck 1440 px | Eindruck 390 px | Bewertung |
|---|---|---|---|
| A Bodoni Moda + Instrument Sans | sehr edel, Modemagazin | Haarlinien bei 24–36 px zu fein, Akzente auf ő/ű kaum sichtbar | 3/5 |
| **B Gloock + Hanken Grotesk** | kontraststarke Didone mit Charakter, enge Ligaturen („fl“), wirkt nach Beauty-Magazin, nicht nach Template | bleibt stabil und gut lesbar, Hanken bei 16 px offen und ruhig | **5/5** |
| C Young Serif + Figtree | freundlich, rund – eher Café/Bäckerei als High-End | gut lesbar | 2/5 |

**Entscheidung:** Gloock (nur ein Schnitt, 400) für Überschriften, Hanken Grotesk (variabel 300–700) für Text und UI.

## Umsetzung
- woff2 lokal, Latin-Subset + Mini-Subset für Ő ő Ű ű (`unicode-range`), zusammen ~66 KB (vorher ~90 KB).
- **Kein Font-Preload (bewusste Abweichung vom Briefing):** Gemessen (Playwright, iPhone-Emulation): mit `<link rel=preload crossorigin>` lädt WebKit/Safari Gloock auf Unterseiten doppelt (2 Requests + Konsolenwarnung), ohne `crossorigin` lädt Chromium doppelt. Ein Preload, das in beiden Engines wirkt, gibt es hier nicht. Die @font-face-Regeln stehen im inline ausgelieferten CSS und werden sofort gefunden; das LCP-Element ist das Hero-Foto.
- `font-display: swap` mit metrisch angepassten Fallbacks (Georgia bzw. Times New Roman für Gloock, Arial für Hanken; `size-adjust`/`ascent-override`/`descent-override` im Browser gegen die Webfont gemessen).
- `font-synthesis: none` – kein künstliches Fett für Gloock.
- Display-Größen mit `clamp()` (H1 34→68 px, Display 44→108 px), Tracking −0,028 em (H1) / −0,02 em (H2).
- `text-wrap: balance` (Überschriften), `pretty` (Fließtext).
- Ziffern: Tabellenziffern (`tabular-nums lining-nums`) in Preisen. **Annahme/Einschränkung:** Weder Gloock noch Hanken Grotesk enthalten Mediävalziffern (`onum`, per Rendervergleich geprüft) – `oldstyle-nums` ist im Fließtext gesetzt, bleibt aber wirkungslos.
- Anführungszeichen: Texte bereits korrekt (DE „…“, EN “…”, HU „…”, per Skript geprüft); zusätzlich `quotes` je Sprache für `<q>`.
