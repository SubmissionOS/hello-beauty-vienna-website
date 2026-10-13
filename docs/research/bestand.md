# Bestandsanalyse hellobeautysalon.at

Abgerufen am 2026-10-13 (curl, WordPress-REST-API, ausgeliefertes CSS). Alle Angaben mit Quelle.

## 1. Seitenstruktur (Crawl)

Quelle Sitemap: https://hellobeautysalon.at/wp-sitemap.xml → https://hellobeautysalon.at/wp-sitemap-posts-page-1.xml

| URL | Status | Inhalt |
|---|---|---|
| https://hellobeautysalon.at/ | 200 | One-Pager mit Ankern `#uberuns`, `#leistungen`, `#galerie`, `#preisliste`, `#kontakt` |
| https://hellobeautysalon.at/uber-uns/ | 200 | 5 Teamfotos mit Vorname + Rolle, sonst kein Text |
| https://hellobeautysalon.at/nagelmodellage/ | 200 | Nur Überschrift + Galerie (17 Bilder), kein Text |
| https://hellobeautysalon.at/kosmetik/ | 200 | Nur Überschrift + Galerie (22 Bilder), kein Text |
| https://hellobeautysalon.at/pedikure/ | 200 | Nur Überschrift + Galerie (10 Bilder), kein Text |
| https://hellobeautysalon.at/en/ | 200 | Leere „Archives“-Seite (Polylang), deutscher Header, kein Inhalt |
| https://hellobeautysalon.at/hu/ | 404 | – |
| https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf | 200 | Preisliste, 8 Seiten, 1,4 MB |
| https://hellobeautysalon.at/robots.txt | 200 | Standard-WP, verweist auf wp-sitemap.xml |

Weitere Dateien in der Mediathek (https://hellobeautysalon.at/wp-json/wp/v2/media, 154 Einträge): ältere Preislisten `2025/09/arlista_nyomtatas_augusztus_web.pdf`, `2025/04/arlista_web(-1).pdf`, `2023/12/arlista_web.pdf`, `2023/04/preislist_jav.pdf`, `2022/12/preislist(-1).pdf` – alle durch `2026/06/Preisliste.pdf` ersetzt.

Technik: WordPress, Theme Hello Elementor 3.4.7, Elementor 4.1.4 + Elementor Pro 4.1.1, Essential Addons, Polylang, jQuery 3.7.1, Swiper 8, Font Awesome 5.15.3. 17 JavaScript-Dateien und 30 Stylesheets auf der Startseite.

## 2. Inhalte (gesichert)

### Kontakt und Stammdaten (Quelle: Header/Kontaktsektion https://hellobeautysalon.at/ und Preisliste S. 8)
- Name: „Hello Beauty“ / „HelloBeauty Schönheitssalon“ (Title-Tag) / Logo-Zusatz „Schönheitssalon“ (Preisliste S. 1)
- Adresse: Barnabitengasse 7, 1060 Wien (Website schreibt „1060 Barnabitengasse 7.“, Preisliste korrekt „Barnabitengasse 7, 1060 Wien“)
- Telefon: +43 660 7055 631
- E-Mail: info@hellobeautysalon.at
- Öffnungszeiten: Montag – Samstag 09:00 – 19:00, Sonntag geschlossen
- Facebook: https://facebook.com/hellobeautywien
- Instagram: https://instagram.com/hellobeauty.salon.at (im Header korrekt, in der Kontaktsektion kaputt: `https://instagram.com/`)
- Buchung: ausschließlich Treatwell-Weiterleitung https://treatwellapp.page.link/Qg2Qj („Termin buchen“)

### Texte
- H2 Startseite: „Schönheitssalon in der Wiener Innerstadt!“ – „Willkommen auf der Hello Beauty Website!“
- Über uns (Startseite): „Es sind unsere Leistungen, die wir unseren Kundinnen jeden Tag mit Liebe, Detail und vollkommener Leidenschaft geben, denn wir lieben & leben Beauty. Für uns ist Beauty nicht nur ein Modebegriff, wir sehen unser Tun nicht als einen Job an, was wir machen ist unsere Erfüllung aus purer Leidenschaft. Bei Hello Beauty Salon wird Pflegen und Stylen mit Perfektion gleichgesetzt, unser Anspruch ist es jeden unserer Besucher, in eine andere Welt zu verführen, um sie mit frischer Energie und einem strahlenden Lächeln in ihren Alltag zurückkehren zu lassen.“
- Team (https://hellobeautysalon.at/uber-uns/, Bildstand 12/2023): Krisztina (Nageldesignerin), Alekszandra (Nageldesignerin), Tímea (Kosmetikerin), Viktória (Nageldesignerin), Anna (Fußpflegerin). Aktualität unbelegt → in der neuen Seite nicht namentlich verwendet, siehe Annahmen.
- Leistungsbeschreibungen: Nur in der Preisliste (Gesichtsbehandlungen, S. 6–7). Die Leistungsseiten haben keinen Text.

## 3. Preisliste (vollständig, exakt übernommen)

Quelle: https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf (Upload 2026-06-23). Keine Angabe zur USt. Dauern sind nur bei Gesichtsbehandlungen angegeben. Reihenfolge wie im PDF.

**Sugaring** (S. 2): Brazilian Sugaring wax 42 € · Bikini 22 € · Achseln 22 €

**Waxing** (S. 2): Bikini 22 € · Brazilian 42 € · Unterschenkel 30 € · Oberschenkel 33 € · Beine komplett 50 € · Achseln 22 € · Unterarme 25 € · Oberarme 20 € · Arme komplett 40 € · Oberlippe 15 € · Wange 15 € · Kinn 15 € · Rücken ab 35 € · Brust 25 € · Bauch 20 € · Unterbauch ab 15 €

**Dauerhafte Haarentfernung – Diodenlaser / SHR** (S. 2–3): Intim ohne Po falte Damen 45 € · Intim mit Po falte Damen 55 € · Bikini Damen 40 € · Unterschenkel 55 € · Oberschenkel 55 € · Beine komplett 85 € · Unterarme Damen 55 € / Herren 65 € · Oberarme Damen 40 € / Herren 55 € · Arme komplett Damen 75 € / Herren 85 € · Achseln 45 € · Unterer Rücken 29 € · Herren Rücken komplett 99 € · Herren / Damen Schultern 39 € · Oberlippe 29 € · Wangen 29 € · Herren Brust 25 € · Herren Brust + Bauch 45 € · Bauch Damen 35 € / Herren 55 €

**Augenbrauen & Wimpernbehandlungen** (S. 3): Augenbrauen färben 15 € · Augenbrauen Wimpern färben 15 € · Augenbrauen färben zupfen 28 € · Augenbrauen zupfen 15 € · Wimpern färben 20 € · Augenbrauen färben & zupfen, Wimpern färben 40 €

**Wimpernlifting** (S. 3): Wimpernlifting mit färben 65 € / ohne färben 60 € · Koreanische Wimpernlifting mit färben 60 € / ohne färben 55 € · Henna Brows & zupfen 40 €

**Augenbrauenlaminierung** (S. 3): ohne färben 55 € · mit färben 60 € · Augenbrauenlaminierung und Wimpernlifting mit färben 105 € · Augenbrauenlaminierung und Wimpernlifting ohne färben 95 €

**Wimpernverlängerungen (mit UV)** (S. 4): Neuanlage Technik 1D 85 € · Neuanlage Light Volumen Technik 2–3D 95 € · Neuanlage Volumen Technik 4–5D 100 € · Neuanlage Megavolumen – ab 6D 115 € · Auffüllen 1D Technik bis 2 Wochen 70 € / bis 3 Wochen 75 € / bis 4 Wochen 85 € · Auffüllen Light Volumen Technik 70 € / 75 € / 90 € · Auffüllen 4–5–6D Volumen Technik 75 € / 85 € / 95 € · Auffüllen Mega Volumen Technik 80 € / 95 € / 105 € (jeweils bis 2 / 3 / 4 Wochen)

**Maniküre** (S. 5): Maniküre ohne Lack 35 € · Paraffinbehandlung für Füße oder Hände 15 € · Japanische Maniküre 38 €
- Nagelmodellage – Neues Set mit Schablonentechnik / mit Farbe (Gel oder Acryl Gel): S 85 € · M 90 € · L 95 € · XL 100 €
- Nagelmodellage – Auffüllen mit Farbe (Gel oder Acryl Gel): S-M 56 € · L 63 € · XL 75 €
- Fingernägel lackieren mit Gellack oder mit Shellac: Gellack / Shellac 49 € · Gellack / Shellac lang 51 €
- Shellac entfernen mit Maniküre 40 € · Gellack entfernen mit Maniküre 40 € · Nagelmodellage entfernen inkl. Maniküre 45 € · Baby-Boomer oder French 5 € · Strasssteine / Muster / Chrome Pulver / Stück ab 0,50 €

**Pediküre** (S. 5): Fußpflege / Pediküre mit Skalpell 44 € · Fußpeeling 10 € · Pediküre mit Gellack / Shellac 58 € · Zehennagelmodellage – entfernen inkl. Maniküre 30 € · Titan-Spange für Zehennagel / Stück 40 € · Fußnägel lackieren mit Gellack / Shellac 42 € · Pediküre inkl. Paraffinbad 59 € · Intensive Pediküre 47 € · Intensive Pediküre mit Gellack oder Shellac 62 €

**Gesichtsbehandlungen** (S. 6–7, mit Dauer): Faszien-Gesichtsmassage – 45 Minuten 49 € · Germaine de Capuccini Luxus-Gesichtsbehandlungen 99 € (Produkte der Timexpert-Linie: Radiance C vitamin, Wrinkless, Hyaluronic, Royal Jelly, SRNS Anti-Age; keine Dauer) · Tiefenreinigung Gesichtsbehandlung – 1,5 Stunden 89 € · Microneedling mit Ultraschall – 1 Stunde 79 € („Nicht für die Anwendung im Sommer empfohlen“) · Gesichtsmassage – 40 Minuten 49 € · LED-Therapie – 1 Stunde 79 € · AquaFacial-Therapie – 45 Minuten 89 € · Kleine Behandlung – 1 Stunde 79 €

Auffälligkeiten: „Zehennagelmodellage – entfernen inkl. Maniküre“ (vermutlich „Pediküre“ gemeint – wörtlich übernommen, als Rückfrage notiert); „Augenbrauen Wimpern färben 15 €“ (gleich teuer wie nur Brauen – wörtlich übernommen, Rückfrage); Schreibweisen „Po falte“, „Koreanische Wimpernlifting“ in der neuen Seite orthografisch korrigiert („Pofalte“, „Koreanisches Wimpernlifting“), Preise unverändert.

## 4. Design-DNA (wird beibehalten)

Quellen: https://hellobeautysalon.at/wp-content/uploads/elementor/css/post-10.css (Elementor-Kit/Global), `post-5.css` (Startseite), `post-25.css` (Header), Google-Fonts-Links im `<head>`.

### Farben
| Hex | Rolle alt | Kontrast auf Weiß | Rolle neu |
|---|---|---|---|
| `#9E8832` | Global Primary + Text (Überschriften, Fließtext, Icons, Trennlinien) | 3,49:1 (AA-Text ✗) | Fläche, Linien, große Schrift ≥ 24 px; für Text abgedunkelt auf `#7A6823` (5,48:1 auf Weiß, 4,90:1 auf Creme) |
| `#DEBF4A` | Global Accent (Button-Hintergrund) | 1,80:1 | Nur dekorative Akzente (Linien, Fokus-Ring-Innenfarbe, Sterne), nie Text |
| `#F5F2EB` | Global Secondary (Creme-Flächen, Verlauf Hero) | – | Seitenhintergrund für Abschnitte |
| `#CBBA7A` → `#DDC87C` | Button-Verlauf 180° (weißer Text) | 1,94 / 1,66 | Nur dekorativ (Hairlines, Hover-Fläche); Buttons neu einfarbig `#7A6823` mit weißem Text |
| `#C5B26D` → `#DDC87C` | Button-Verlauf 230° (Header-CTA) | 2,11 | wie oben |
| `#FFFFFF` | Flächen, Header | – | Flächen |
| Logo-Gold (Raster-Logo) | ca. `#B39A4C`–`#D6BE6A` Verlauf | – | über Logo-PNG |

### Typografie
- **Playfair Display**, Gewicht 600 – alle Abschnittsüberschriften (28 px), Karten-Titel (22 px), Hauptnavigation (18 px) und Hero (mit weichem weißem Text-Schatten `3px 0 43px #FFF`).
- **Roboto** 300 (Fließtext 15–16 px), 400 (Kontakt 18 px / 30 px Zeilenhöhe, Icon-Titel 20 px), 500 (Buttons).
- **Josefin Sans** 600 – nur Sprachumschalter (Polylang). Wird nicht übernommen (eine Schrift weniger, kein Markenmerkmal).
- Roboto Slab ist als Global Secondary definiert, wird aber nur im ungenutzten Divider-Widget referenziert → nicht übernommen.
- Lizenzen: Playfair Display – SIL Open Font License 1.1; Roboto – SIL Open Font License 1.1 (seit Roboto v3, vorher Apache 2.0). Selbst-Hosting erlaubt.
- Logo-Wortmarke „Hello Beauty“ ist eine Didone-Serif (Rastergrafik), Zusatz „SCHÖNHEITSSALON“ in einer geometrischen Grotesk (Preisliste). Wird ausschließlich als Bild verwendet.

### Weitere Merkmale
- Container 1140 px, Widget-Abstand 20 px, Radius 0 (eckig), dünne 1-px-Trennlinien in Primary über Überschriften.
- Bildsprache: helles Interieur (weißer Marmor, Gold, Salbei-/Petrolsamt), Hände-Nahaufnahmen.

### Logo-Varianten (aktuell, Stand 12/2023 – 06/2026)
- HB-Monogramm Didone gold (`bg_logo.png`, 2000×2000, transparent) – Favicon und Preisliste
- HB-Monogramm weiß (`bg_logo_w.png`, 2000×2000)
- HB + „Hello Beauty“ gold, gestapelt (`logo-1.png`, 1038×885) – Header der aktuellen Seite
- HB + „Hello Beauty“ weiß, quer (`hb_logo_white.png`, 1000×222)
- Veraltet (2022, Schreibschrift-„HB“): `logo.png`, `logo_black.png`, `logo_gold.png`, `hblogo*.png`, `feher.png`, `fav.png`, `fav-1.png` – nicht verwenden.

## 5. Fehler- und Verstoßliste

### Recht / Datenschutz (AT/EU)
1. **Google Maps ohne Einwilligung**: `<iframe src="https://maps.google.com/maps?q=1060%20Barnabitengasse%207.&t=m&z=18&output=embed">` auf der Startseite (Kontaktsektion) lädt beim Seitenaufruf → Datenübermittlung an Google (USA) ohne Einwilligung (TKG 2021 § 165, DSGVO Art. 6).
2. **Google Fonts extern**: 4 Familien (Roboto, Roboto Slab, Playfair Display, Josefin Sans) in je 18 Schnitten von `fonts.googleapis.com` → IP-Übermittlung ohne Rechtsgrundlage.
3. **Kein Impressum** (§ 5 ECG, § 25 MedienG, § 63 GewO) – nirgends verlinkt.
4. **Keine Datenschutzerklärung** (Art. 13 DSGVO).
5. **Cookie** `pll_language` (Polylang, 1 Jahr) ohne Information.
6. Preisliste ohne Hinweis auf USt. (PrAG: Preise inkl. USt.).
7. Stockfotos in der Mediathek (Freepik-Dateinamen, z. B. `pedicurist-applying-transparent-varnish…`, `closeup-shot-process-manicure…`) – Lizenzlage unklar; im neuen Projekt nicht verwendet.

### Technik / UX
8. **Doppelte Menüs**: Hauptnavigation wird im DOM viermal ausgegeben (Desktop- und Mobil-Varianten, jeweils zweimal), dazu Logo doppelt.
9. **Kaputter Instagram-Link**: Kontaktsektion verlinkt `https://instagram.com/` ohne Profil (Header korrekt `http://instagram.com/hellobeauty.salon.at`).
10. Social-Links mit `http://` statt `https://`; „Über uns“-Link auf `http://www.hellobeautysalon.at/uber-uns` (Umweg über Redirect).
11. **„CLICK HIER“-Links** (5×): nicht aussagekräftig (WCAG 2.4.4), Denglisch.
12. **Buchung nur über Treatwell-Weiterleitung** (`treatwellapp.page.link`, Firebase Dynamic Links – Google hat diesen Dienst am 25.08.2025 eingestellt; Link-Funktion ungewiss) – Kundin verlässt die Seite, kein eigener Flow.
13. **Falsche Ortsangabe** „Schönheitssalon in der Wiener Innerstadt“: 1060 ist Mariahilf (6. Bezirk), Innere Stadt ist 1010. Neu: „in Mariahilf, wenige Gehminuten von der Mariahilfer Straße“.
14. **/en/** zeigt leere „Archives“-Seite mit deutschem Menü; keine HU-Version, obwohl das Team ungarischsprachig ist (Dateinamen „viber_kep“, „arlista“, „csoport“).
15. Preise nur als 1,4-MB-PDF (nicht durchsuchbar für Google/KI, mobil schlecht lesbar).
16. Leistungsseiten ohne einen einzigen Satz Text.
17. 1-MB-JavaScript-Ballast (jQuery, Swiper, Elementor) für eine statische Seite.

### Barrierefreiheit / SEO
18. **Alle Bilder ohne Alt-Text** (`alt=""` bei Inhaltsbildern, Galerie als Links ohne Text).
19. **Keine h1** auf der Startseite und den Unterseiten (nur `/en/` hat „Archives“ als h1); Überschriften `h3` ohne Inhalt im Header.
20. Kontrast: Fließtext `#9E8832` auf Weiß 3,49:1; Buttons Weiß auf `#CBBA7A`–`#DDC87C` 1,7–1,9:1 (WCAG 1.4.3 ✗).
21. Keine Meta-Description, kein Open Graph, kein strukturiertes Datenmarkup (LocalBusiness), hreflang nur `de-DE` (falsch: Österreich → `de-AT` bzw. `de`).
22. Titel generisch („HelloBeauty Schönheitssalon – Schönheitssalon in Wien“), Unterseiten „Kosmetik – HelloBeauty Schönheitssalon“.
23. Name uneinheitlich: „Hello Beauty“, „HelloBeauty“, „Hello Beauty Salon“, „HelloBeauty Schönheitssalon“ → Entitäten-Konsistenz für Google/KI schwach.

### Konsole
24. Messung im Browser erfolgt in Phase 8 nicht für die alte Seite (kein Ziel). Statisch auffällig: `jquery-migrate` (gibt im Browser standardmäßig „JQMIGRATE: Migrate is installed“ in der Konsole aus), Emoji-Skript von WordPress, Elementor-Sticky-Skript.

## 6. Was übernommen wird
- Farben und Schriften (siehe 4.), Logo-Monogramm, Bildwelt.
- Alle Preise exakt, Kontaktdaten, Öffnungszeiten, Social-Profile (korrigiert).
- Kernbotschaft „Liebe zum Detail, Leidenschaft, Perfektion, frische Energie“ – neu formuliert, ohne Floskeln.
