# SEO- & GEO-Konzept Hello Beauty Wien (DE / EN / HU)

Stand: 2026-10-13 · Alle Quellen mit Abrufdatum 2026-10-13, sofern nicht anders angegeben.
Domain-Annahme: Die neue Astro-Seite läuft weiter auf **https://hellobeautysalon.at** (Hosting Vercel, `trailingSlash: 'always'`, siehe `guddiweb-standard.md`). Falls die Domain wechselt (z. B. auf eine „hellobeautyvienna“-Domain – aktuell ist keine solche Domain erreichbar, geprüft per HTTPS-Request am 2026-10-13), muss die Weiterleitungs-Map aus Abschnitt 7 domainübergreifend auf der alten Domain laufen.

Kennzeichnung: **[PRÜFEN]** = vom Salon zu bestätigen, nicht belegt. **[SCHÄTZUNG]** = qualitative Einschätzung ohne Volumenquelle.

---

## 0. Ausgangslage (Fakten, belegt)

| Fakt | Wert | Quelle |
|---|---|---|
| Name auf Website | „HelloBeauty Schönheitssalon“ (Title: „HelloBeauty Schönheitssalon – Schönheitssalon in Wien“) | https://hellobeautysalon.at/ |
| Adresse | Barnabitengasse 7, 1060 Wien | https://hellobeautysalon.at/ , Preisliste S. 8 |
| Telefon | +43 660 7055 631 | https://hellobeautysalon.at/ |
| E-Mail | info@hellobeautysalon.at | https://hellobeautysalon.at/ |
| Öffnungszeiten Website | Mo–Sa 09:00–19:00, So geschlossen | https://hellobeautysalon.at/ |
| Öffnungszeiten Treatwell | Mo, Mi, Sa 08:00–19:00; Di, Do, Fr 08:00–20:00; So geschlossen | https://www.treatwell.at/salon/hello-beauty-salon/ |
| Öffnungszeiten OSM | `Mo-Fr 09:00-19:00; Sa "nach Vereinbarung"; Su,PH off` (check_date:opening_hours 2025-03-16), `wheelchair=no` | https://api.openstreetmap.org/api/0.6/node/5204041868.json |
| Treatwell-Bewertung | 4,8 Sterne aus 2.811 Bewertungen; Name dort „Hello Beauty Salon“ | https://www.treatwell.at/salon/hello-beauty-salon/ |
| Facebook | „HelloBeauty Schönheitssalon \| Vienna“, facebook.com/hellobeautywien | https://www.facebook.com/hellobeautywien |
| Instagram | instagram.com/hellobeauty.salon.at (im Footer zusätzlich ein leerer Link auf instagram.com/) | Quellcode https://hellobeautysalon.at/ |
| Buchung | Nur Treatwell, Link `https://treatwellapp.page.link/Qg2Qj` (Firebase Dynamic Link) | Quellcode https://hellobeautysalon.at/ |
| Herold | Kein Eintrag „Hello Beauty“ gefunden (Suche/URL-Versuch → 404) | https://www.herold.at/gelbe-seiten/was_hello-beauty/wo_wien/ (404) |
| WKO-Firmen-A–Z | Unter Barnabitengasse 7, 1060 Wien: **ESZTER NAILS e.U.** (Fingernagelstudio) – Zusammenhang mit Hello Beauty **[PRÜFEN]** (möglicher Rechtsträger für Impressum/`legalName`) | https://firmen.wko.at/fingernagelstudio/wien-6-bezirk-mariahilf/?ni=a |
| Schema.org auf alter Seite | Keines (0 × `application/ld+json`) | Quellcode https://hellobeautysalon.at/ |
| Sprachen alte Seite | Polylang: `de` (de_DE) und `en` (en_GB), `/en/` = leere Archivseite, `/hu/` = 404 | https://hellobeautysalon.at/wp-json/pll/v1/languages |
| Markenverwechslung | `site:hellobeautysalon.at` lieferte in der Websuche nur fremde „Hello Beauty(ful)“-Salons (USA, Edinburgh) → Entitäten-Disambiguierung nötig | Websuche 2026-10-13 |

**Konsequenz:** Drei verschiedene Öffnungszeiten-Angaben und vier Namensvarianten im Netz. Das ist für Local SEO und KI-Antworten das größte Einzelproblem und muss vor Go-live bereinigt werden (siehe 3.2).

### Angebot laut Preisliste 06/2026 (Grundlage der Seitenstruktur)
Quelle: https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf (per `pdftotext` gelesen)

- **Haarentfernung:** Brazilian Sugaring, Waxing (Zonen), **Dauerhafte Haarentfernung Diodenlaser/SHR** (Damen/Herren, Zonen)
- **Augenbrauen & Wimpern:** Färben, Zupfen, Henna Brows, Wimpernlifting (mit/ohne Färben), Koreanisches Wimpernlifting, Augenbrauenlaminierung, Kombi Laminierung + Lifting, **Wimpernverlängerung** (1D, Light Volumen 2–3D, Volumen 4–5D, Megavolumen ab 6D; Auffüllen bis 2/3/4 Wochen)
- **Maniküre:** Maniküre ohne Lack (35 €), Japanische Maniküre (38 €), Paraffinbehandlung (15 €)
- **Nagelmodellage:** Neues Set mit Schablonentechnik, Gel oder Acryl-Gel, S/M/L/XL (85/90/95/100 €); Auffüllen S-M/L/XL (56/63/75 €); Entfernen; Babyboomer/French; Strass/Muster/Chrome
- **Gellack/Shellac:** 49 €, lang 51 €; Entfernen mit Maniküre 40 €
- **Pediküre:** Fußpflege/Pediküre mit Skalpell (44 €), Pediküre mit Gellack/Shellac (58 €), Intensive Pediküre (47 €), mit Gellack/Shellac (62 €), Paraffinbad, Fußpeeling, Titan-Spange
- **Gesichtsbehandlungen:** Faszien-Gesichtsmassage 45 Min (49 €), Germaine de Capuccini Luxus (99 €), Tiefenreinigung 1,5 h (89 €), Microneedling mit Ultraschall 1 h (79 €), Gesichtsmassage 40 Min (49 €), LED-Therapie 1 h (79 €), AquaFacial 45 Min (89 €), Kleine Behandlung 1 h (79 €)
- Treatwell führt zusätzlich „Massagen“ und „Körperbehandlungen“ – in der Preisliste nicht enthalten **[PRÜFEN]**.

Hinweis: Im Waxing-/Laser-Teil ist das PDF-Layout zweispaltig und die Zuordnung Preis ↔ Zone per Textextraktion nicht eindeutig. Diese Preise vor Übernahme manuell aus dem PDF abgleichen.

→ Daraus folgt: Zur Sitemap aus dem Briefing kommen **zwei zusätzliche Leistungsseiten**: **Wimpern & Augenbrauen** und **Haarentfernung (Laser/Waxing/Sugaring)**. Beide haben eigene, gut belegte Suchnachfrage (Autocomplete, s. u.).

### Lage und Öffis

**Koordinaten:** `48.1986658, 16.3535550`. Quelle: OpenStreetMap Nominatim, Treffer ist der OSM-Knoten 5204041868 „Hello Beauty“ (`shop=beauty`, `beauty=nails`, `addr:floor=0`): https://nominatim.openstreetmap.org/search?q=Barnabitengasse+7,+1060+Wien&format=json&addressdetails=1 · Knoten: https://www.openstreetmap.org/node/5204041868
Der Adressknoten des Hauses Barnabitengasse 7 liegt bei `48.1986042, 16.3535992` (OSM-Knoten 1760411631), also rund 7 m daneben. Für das Schema den Salon-Knoten verwenden. Das Grätzl heißt laut Nominatim „Magdalenengrund“ (Mariahilf).

**Nächste Haltestellen.** Luftlinie per Haversine zu OSM-Objekten, abgefragt über die Overpass API (https://overpass-api.de/api/interpreter, Stand OSM-Basis 2026-10-13T21:09Z). Die Gehzeit ist **[SCHÄTZUNG]**: Luftlinie × 1,3 Umwegfaktor ÷ 80 m/min, aufgerundet.

| Station | Linie | Luftlinie (nächster Zugang / Stationsmitte) | Gehzeit (Schätzung) |
|---|---|---|---|
| **Neubaugasse** | **U3** | Zugang „Kirchengasse“ 113 m, Zugang „Stiftgasse“ 176 m; Stationsknoten 98 m | **ca. 2–3 Min.** |
| Haus des Meeres | Bus 13A, 14A, 57A | Haltestelle 120 m | ca. 2 Min. |
| Neubaugasse (Bus) | 13A | 192 m | ca. 3 Min. |
| Kettenbrückengasse | U4 | Stationsknoten 404 m, Zugang Naschmarkt 454 m | ca. 7 Min. |
| Zieglergasse | U3 | Stationsknoten 564 m | ca. 9–10 Min. |
| Museumsquartier | U2 | Stationsknoten 725 m | ca. 12 Min. |
| Pilgramgasse | U4 | Stationsknoten 729 m | ca. 12 Min. |

Busse an der Haltestelle „Haus des Meeres“ (13A, 14A, 57A) laut https://haus-des-meeres.at/en/zoo/map-and-directions, 13A-Haltestellenfolge laut https://www.wienerlinien.at/bf/lines/bus_a/13A__1.html.
**Ergebnis:** Die U3 **Neubaugasse** ist klar die nächste U-Bahn-Station (ca. 2–3 Gehminuten). Die U3 **Zieglergasse** ist mit ca. 9–10 Minuten deutlich weiter und sollte nicht als „nächste Station“ genannt werden. Als zweite Option eignet sich die U4 **Kettenbrückengasse/Naschmarkt** (ca. 7 Min.). Die Barnabitengasse zweigt bei der Mariahilfer Kirche von der Mariahilfer Straße ab. Gehzeiten vor Veröffentlichung einmal real abgehen oder per Routenplaner prüfen **[PRÜFEN]**.
Barrierefreiheit: OSM führt den Salon mit `wheelchair=no`. Das ist **[PRÜFEN]** und wichtig für die Barrierefreiheits-/Anfahrt-Angaben sowie das GBP-Attribut.

---

## 1. Keyword-Recherche

**Methode:** Die Vorschläge stammen aus der Google-Autocomplete-Schnittstelle (`https://suggestqueries.google.com/complete/search?client=firefox&hl={de|en|hu}&gl=at&q=…`, Abruf 2026-10-13), ergänzt durch Websuchen und SERP-Beobachtung. **Keine der Quellen nennt Suchvolumina.** Alle Angaben zur Nachfrage sind daher **[SCHÄTZUNG]**, abgeleitet aus Autocomplete-Breite (viele Bezirks-/Preis-Varianten = höhere Nachfrage) und SERP-Wettbewerb. Für echte Volumina sollte der Salon den Google Ads Keyword Planner (kostenlos mit Ads-Konto) oder die Search Console der neuen Seite nach 4–8 Wochen auswerten.

**Allgemeine SERP-Beobachtung:** Für generische Wien-Keywords dominieren Plattformen. Treatwell hat Listen wie „Top 20 Nagelstudios …“ und „334 Salons, die Gel-Maniküre in Wien anbieten“, Fresha Landingpages, Herold/WKO Verzeichnisse. Quellen: https://www.treatwell.at/orte/behandlung-gruppe-nagel/angebot-typ-lokal/in-wien-at/ , https://www.treatwell.at/orte/behandlung-gel-manikuere/angebot-typ-lokal/in-wien-at/seite-3 , https://www.fresha.com/lp/en/tt/gel-nails/in/at-wien , https://www.herold.at/gelbe-seiten/wien/nagelstudio/seite/3/ . Die eigene Website gewinnt realistisch über (a) das **Local Pack/Maps (GBP)**, (b) **Bezirks- und Grätzl-Keywords** (1060, Mariahilf, Neubaugasse, Mariahilfer Straße) und (c) **Long-Tail-Leistungen** (japanische Maniküre, koreanisches Wimpernlifting, Laser 1060).

Autocomplete zeigt eine Eigenheit: Nutzer hängen sehr oft die **Postleitzahl** an („… wien 1010/1100/1220“). Für Hello Beauty heißt das: **„1060“** und **„6. Bezirk“** konsequent in Title, H1 und Text verwenden.

### 1.1 Deutsch (priorisiert)

| Prio | Keyword (Varianten) | Intention | Nachfrage [SCHÄTZUNG] | Belege (Autocomplete) | Zielseite |
|---|---|---|---|---|---|
| 1 | Nagelstudio Wien 1060 / Nagelstudio 1060 Wien / Nagelstudio Wien 6. Bezirk | lokal-transaktional | mittel | „nagelstudio 1060 wien“, „nagelstudio wien 6 bezirk“ | Start |
| 1 | Nagelstudio Mariahilfer Straße / Nagelstudio Mariahilf / Nagelstudio nähe Mariahilfer Str | lokal-transaktional | mittel | „nagelstudio mariahilferstraße wien“, „nagelstudio nähe mariahilfer str wien“ | Start, Kontakt |
| 1 | Nagelstudio Wien (+ „preise“, „günstig“) | lokal-kommerziell, plattformdominiert | hoch | „nagelstudio wien preise“, „nagelstudio wien günstig“ | Start, Preise |
| 1 | Gelnägel Wien / Gelnägel Wien Preise / Gelnägel auffüllen Wien | transaktional | hoch | „gelnägel wien preise“, „gelnägel auffüllen wien“ | Nagelmodellage |
| 1 | Maniküre Wien 1060 / Maniküre Pediküre Wien 1060 | transaktional | mittel | „maniküre 1060 wien“, „maniküre pediküre wien 1060“ | Maniküre |
| 1 | Pediküre Wien / Pediküre 1060 / Fußpflege 1060 Wien / Fußpflege Wien 6. Bezirk | transaktional | hoch (Wien) / mittel (1060) | „pediküre 1060 wien“, „fußpflege 1060 wien“, „fußpflege wien 6 bezirk“ | Pediküre |
| 2 | Shellac Wien / Gellack Wien / Gellack Maniküre Wien / Pediküre Gellack Wien | transaktional | mittel | „shellac wien“, „gellack maniküre wien“, „pediküre gellack wien“ | Maniküre, Pediküre |
| 2 | Laser Haarentfernung Wien / … 1060 / … Preise / … Männer | transaktional, preisgetrieben | hoch | „laser haarentfernung wien 1060“, „… preise“, „… männer“ | Haarentfernung |
| 2 | Wimpernlifting Wien / … Preise / Wimpernlifting 1060 Wien | transaktional | hoch | „wimpernlifting 1060 wien“, „wimpernlifting wien preise“ | Wimpern & Brauen |
| 2 | Wimpernverlängerung Wien / … Preise | transaktional | hoch | „wimpernverlängerung wien preise“ | Wimpern & Brauen |
| 2 | Kosmetik 1060 / Kosmetikstudio 1060 Wien / Kosmetikstudio Wien | lokal-transaktional | mittel | „kosmetik 1060 wien“, „kosmetikstudio 1060 wien“ | Kosmetik, Start |
| 2 | Gesichtsbehandlung Wien / … Preise / … günstig | transaktional | mittel | „gesichtsbehandlung wien preise“ | Kosmetik |
| 3 | Microneedling Wien / … Preise / … Erfahrungen | kommerziell-informativ | mittel | „microneedling wien preise“, „… erfahrungen“ | Kosmetik (Abschnitt) |
| 3 | Sugaring Wien / Waxing 1060 Wien | transaktional | mittel | „sugaring wien“, „waxing 1060 wien“ | Haarentfernung |
| 3 | Japanische Maniküre Wien | transaktional, Nische | niedrig–mittel | „japanische maniküre wien“ | Maniküre |
| 3 | Augenbrauenlaminierung Wien | transaktional, Nische | niedrig–mittel | „augenbrauenlaminierung wien“ | Wimpern & Brauen |
| 3 | Nagelmodellage Wien | transaktional | niedrig–mittel | „nagelmodellage wien“ | Nagelmodellage |
| 3 | Nagelstudio Neubaugasse | lokal-navigational | niedrig | „nagelstudio wien neubaugasse“ | Kontakt, Start |
| 3 | Russische Maniküre Wien | transaktional | niedrig–mittel | „russische maniküre wien“ – **nur verwenden, wenn angeboten [PRÜFEN]** (nicht in Preisliste) | – |
| 4 | Shellac oder Gel? / Wie lange halten Gelnägel? | informativ (PAA-artig) | mittel | Websuche: Ratgeber nennen Gel ≈ 3–4 Wochen, Shellac ≈ 2–3 Wochen (https://www.treatwell.ch/treatment-files?p=14568) | FAQ |
| 4 | Nagelstudio Wien Sonntag geöffnet | navigational | niedrig | „nagelstudio wien sonntag geöffnet“ – Salon hat So geschlossen → FAQ ehrlich beantworten | FAQ |

Wichtig: „**Medizinische Fußpflege**“ erscheint im Autocomplete („medizinische fußpflege 1060 wien“). Diesen Begriff nur verwenden, wenn die Fußpflegerin die entsprechende Qualifikation hat. Fußpflege ist in Österreich ein reglementiertes Gewerbe **[PRÜFEN]**.

### 1.2 Englisch (priorisiert)

Bei „… vienna“ mischen sich im Autocomplete fast immer **Vienna, VA (USA)** und Vienna, WV. Darum auf der Seite immer „Vienna, Austria“ bzw. „Vienna 1060“ / „Mariahilf“ ergänzen, auch im Schema (`addressCountry: AT`).

| Prio | Keyword | Intention | Nachfrage [SCHÄTZUNG] | Belege (Autocomplete) | Zielseite |
|---|---|---|---|---|---|
| 1 | nail salon Vienna (Austria) / nail salon Vienna near me | lokal-transaktional (Expats, Touristen) | mittel | „nail salon vienna austria“, „nail salon vienna near me“ | /en/ |
| 1 | manicure Vienna / gel manicure Vienna / manicure Vienna price | transaktional | mittel | „manicure vienna price“, „gel manicure vienna“ | /en/services/manicure/ |
| 1 | pedicure Vienna / medical pedicure Vienna / best pedicure Vienna | transaktional | mittel | „pedicure vienna austria“, „medical pedicure vienna“ [PRÜFEN Qualifikation] | /en/services/pedicure/ |
| 1 | gel nails Vienna / shellac nails Vienna / gel polish Vienna / builder gel nails Vienna | transaktional | mittel | „gel nails vienna“, „shellac nails vienna“, „builder gel nails vienna“ | Nail-extensions, Manicure |
| 2 | English speaking nail salon Vienna | transaktional, Expat | niedrig | „english speaking nail salon vienna“ | /en/about/, /en/ |
| 2 | lash lift Vienna / Korean lash lift Vienna / lash lift and tint Vienna | transaktional | mittel | „korean lash lift vienna“, „lash lift and tint vienna“ | /en/services/lashes-brows/ |
| 2 | eyelash extensions Vienna | transaktional | mittel | „eyelash extensions wien“ | /en/services/lashes-brows/ |
| 2 | laser hair removal Vienna / … price / permanent hair removal Vienna | transaktional | mittel | „laser hair removal vienna price“, „permanent hair removal vienna“ | /en/services/hair-removal/ |
| 3 | waxing Vienna / brazilian waxing Vienna / sugaring Vienna | transaktional | niedrig–mittel | „brazilian waxing vienna“, „sugaring studio vienna“ | /en/services/hair-removal/ |
| 3 | facial Vienna Austria / facial massage Vienna / best facial Vienna | transaktional | niedrig–mittel | „facial vienna austria“, „facial massage vienna“ | /en/services/facials/ |
| 3 | Japanese manicure Vienna / Russian manicure Vienna | transaktional | niedrig | „japanese manicure vienna“; „russian manicure vienna“ nur bei Angebot | /en/services/manicure/ |
| 3 | beauty salon Vienna (Austria) | lokal | mittel | „beauty salon vienna austria“ | /en/ |
| 4 | nail salon Mariahilfer Strasse | lokal-navigational | niedrig | „nail salon mariahilferstrasse“ | /en/contact/ |

### 1.3 Ungarisch (priorisiert)

**Befund:** Die Autocomplete-Nachfrage auf Ungarisch mit Bezug zu Wien ist **sehr gering**. Für „körömszalon bécs“, „magyar körmös bécs“, „műköröm bécs“, „szempilla bécs“ und „gél lakk bécs“ kamen **keine** Vorschläge. Für „manikűr bécs“, „pedikűr bécs“ und „műköröm bécs“ schlägt Google nur „… **bécsi út**“ vor, eine Straße in Budapest. Das ist eine Falle: Diese Wortkombination zieht Budapester Suchen an. Belegt ist **„magyar kozmetikus bécsben“** (bei „magyar kozmetikus“ an erster Stelle) und „kozmetikus bécs“. Ungarischsprachige in Wien suchen vermutlich oft auf Deutsch („Nagelstudio 1060“) oder über Facebook-Gruppen und Empfehlungen [SCHÄTZUNG].
**Strategie HU:** Die HU-Seiten dienen weniger dem Volumen als der **Conversion und dem Vertrauen** (Muttersprache) sowie **GEO**. LLM-Prompts wie „ungarischsprachiges Nagelstudio Wien“ oder „magyar körmös Bécsben“ brauchen einen zitierfähigen Satz „Wir sprechen Ungarisch“. Immer **„Bécsben“ (Lokativ) + „Bécs 6. kerület“ + „1060“** kombinieren. Die nackte Kombination „bécs“ + Leistung im Title meiden, wo sie mit „bécsi út“ kollidiert. Lösung: „Bécsben“ statt „Bécs“ im Fließtext, im Title „Bécs“ nur zusammen mit „1060“ oder „6. kerület“.

| Prio | Keyword | Intention | Nachfrage [SCHÄTZUNG] | Beleg | Zielseite |
|---|---|---|---|---|---|
| 1 | magyar kozmetikus Bécsben | transaktional, Community | niedrig (aber belegt) | Autocomplete „magyar kozmetikus bécsben“ | /hu/, /hu/szolgaltatasok/kozmetika/ |
| 1 | magyar körmös Bécsben / magyar műkörmös Bécs | transaktional | sehr niedrig | „magyar műkörmös“ (ohne Ort) belegt | /hu/, /hu/szolgaltatasok/mukorom/ |
| 1 | körömszalon Bécs / körmös Bécs 6. kerület | lokal | sehr niedrig | kein Vorschlag | /hu/ |
| 2 | műköröm Bécs / zselés köröm Bécsben | transaktional | sehr niedrig | nur „… bécsi út“ (Budapest!) | /hu/szolgaltatasok/mukorom/ |
| 2 | manikűr Bécsben / géllakk Bécs | transaktional | sehr niedrig | nur „… bécsi út“ | /hu/szolgaltatasok/manikur/ |
| 2 | pedikűr Bécsben / magyar pedikűrös Bécs | transaktional | sehr niedrig | nur „… bécsi út“ | /hu/szolgaltatasok/pedikur/ |
| 2 | kozmetikus Bécs | lokal | niedrig | „kozmetikus bécs“ belegt (Mischung mit „munka“ = Jobs) | /hu/szolgaltatasok/kozmetika/ |
| 3 | szempilla-hosszabbítás / szempilla-lifting Bécsben | transaktional | sehr niedrig | kein Vorschlag | /hu/szolgaltatasok/szempilla-szemoldok/ |
| 3 | lézeres szőrtelenítés Bécs / gyantázás Bécs | transaktional | sehr niedrig | nur „… bécsi út“ | /hu/szolgaltatasok/szortelenites/ |
| 3 | magyar szépségszalon Bécs | Community | sehr niedrig | kein Vorschlag | /hu/rolunk/ |

**Voraussetzung:** Dass das Team Ungarisch spricht, ist nur indirekt belegt: ungarische Dateinamen „arlista“, „viber_kep“, „csapat“, „csoport“, „masolat“ und ungarische Vornamen (Krisztina, Alekszandra, Tímea, Viktória) auf https://hellobeautysalon.at/uber-uns/ . Vor Veröffentlichung von „Wir sprechen Ungarisch/Englisch“ **[PRÜFEN]**.

---

## 2. Wettbewerbsanalyse: 5 Wiener Nagelstudio-Websites

Auswahl: Diese Studios mit **eigener Website** tauchten in der Websuche zu „Nagelstudio Wien Gelnägel Maniküre Online Termin“ sowie im Treatwell- und Englisch-Umfeld auf (Websuchen 2026-10-13). Die organischen Top-Plätze für „Nagelstudio Wien“ belegen Treatwell, Fresha, Herold und WKO. Eine echte Rangposition lässt sich ohne Rank-Tracker nicht belegen. Schema wurde per `curl` im Roh-HTML gezählt (`"@type"`).

| Studio | URL | Struktur / Seitentypen | Preise | Buchung | Schema.org (Roh-HTML) | Stärken | Schwächen |
|---|---|---|---|---|---|---|---|
| Ursula Beauty (1070) | https://www.ursulabeauty.at/ | One-Pager mit Ankern (#leistungen, #nagelpreise, #massagepreise, #kontakt) + `/termin`, `/blog` (z. B. `/blog/sommer-pedikuere-2026`), `/agb`, Impressum, Datenschutz; Next.js | **HTML-Preislisten** je Kategorie (z. B. 57 €, 58 €) | **Eigener Online-Flow** `/termin` („24/7“) + WhatsApp | `FAQPage` mit 10 Q&A; **kein LocalBusiness** | Title kombiniert PLZ + Leistung + „Online Termin buchen“; FAQ, Bewertungen, Blog, Kontakt & Anfahrt | Mehrere `<h1>` (Hero-Slider); keine eigenen Leistungsunterseiten; kein LocalBusiness-Schema; nur DE |
| nu.nails (1010) | https://www.nu-nails.at/ | Start, `/preise`, Impressum, Datenschutz (Wix) | eigene Preisseite | **Treatwell-Widget** (`buchung.treatwell.at/ort/nu-nails/`) | `LocalBusiness` (Name, Adresse, Telefon), `WebSite` – ohne geo, Öffnungszeiten, sameAs | Klarer Title mit Leistungen + Bezirk; Preisseite eigenständig | Schema minimal (`streetAddress: "21 Hegelgasse"` – Reihenfolge englisch); Wix-Performance; dünne Struktur |
| precious ten (1070) | https://www.precious-ten.at/ | WordPress: Start (Über uns, Team, Academy, Galerie), `/anfahrt/`, `/terminanfrage/`, Impressum, Datenschutz, Haftungsausschluss | keine €-Preise im Start-HTML | **Terminanfrage-Formular** + Instagram/FB/Telefon; „Nur Barzahlung möglich“ | Yoast-Standard: `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` – kein LocalBusiness | Title mit PLZ + Gel/Acryl/Shellac/Kosmetik; eigene Anfahrt-Seite | `<h1>` „Schau mal“ ohne Keyword; keine Online-Echtzeitbuchung; keine Preise im HTML |
| THE NAIL ART (1030) | https://www.thenailart.at/ | One-Pager (#ueberuns, #nageldesign, #team, #galerie, #preisliste, #kontakt) + Impressum, Datenschutz | Preisliste nicht als €-Text im HTML | „nach Vereinbarung“ (laut Suche) | Yoast-Standard `Organization`/`WebSite`/`BreadcrumbList` | Präziser Title „Nagelstudio in Wien 1030 Landstraße“, Description mit Adresse | Laut Suchsnippet seit ~826 Tagen nicht aktualisiert; keine Unterseiten; keine Online-Buchung |
| NAMI Nails & Beauty (1220, 2 Standorte) | https://www.naminails.at/ | WordPress/Elementor: **eigene Leistungsseiten** (`/professionelle-nagelpflege/`, `/professionelle-fuspflege-bei-nami-nail/`, `/professionelle-wimpernverlangerung-und-augenbrauenpflege/`), `/preisliste/`, `/look-book/`, `/uber-uns/`, `/kontakt/`, `/arbeit/`, AGB, Datenschutz | eigene Preisliste-Seite | **Eigene Buchungs-Subdomain** `booking.naminails.at` | keines erkannt | Hub & Spoke mit Leistungsseiten; Lookbook (Galerie); Standort-Sektionen; Mehrsprachigkeit im Team (DE/EN/VI laut Treatwell) | Lange, unnatürliche Slugs; Headings ohne Keyword („Luxuriöses Ambiente,“); kein Schema |

**Was wir übernehmen:**
1. **Title-Formel** „Leistung + Wien + PLZ | Marke“ (Ursula, precious ten, THE NAIL ART) und PLZ + Grätzl in der Description.
2. **Eigene Leistungsseiten** pro Kategorie (NAMI), aber mit kurzen, sauberen Slugs.
3. **Preise als HTML-Text**, nicht nur als PDF (Ursula, nu.nails). Das PDF bleibt optionaler Download.
4. **FAQ-Block mit FAQPage-Schema** (Ursula). Nutzen jetzt nur noch für GEO, siehe 4.
5. **Eigene Anfahrt-Seite** mit Öffi-Angaben (precious ten), bei uns zusammengelegt zu „Kontakt & Anfahrt“.
6. **Galerie/Lookbook** als eigene Seite (NAMI, THE NAIL ART) mit beschreibenden Alt-Texten.
7. **Ein Klick zur Buchung** in Header und Footer und auf jeder Leistungsseite (Ursula: 24/7-Flow).

**Was wir besser machen:** Bisher hat keiner der fünf ein vollständiges `LocalBusiness`/`NailSalon`-Schema mit `geo`, `openingHoursSpecification`, `sameAs` und `OfferCatalog`. Keiner ist mehrsprachig mit hreflang (0 × `hreflang` bei allen fünf). Keiner bietet Ungarisch an. Das ist die Lücke für Hello Beauty.

**Buchung:** Für Hello Beauty bietet sich an, **Treatwell als Buchungsmotor zu behalten**: 2.811 Bewertungen sind dort ein enormes Vertrauens- und GEO-Asset. Statt des toten Firebase-Links `treatwellapp.page.link` sollte die Seite aber direkt auf `https://www.treatwell.at/salon/hello-beauty-salon/` bzw. die Treatwell-Buchungs-URL/Widget-URL verlinken (Muster nu.nails: `buchung.treatwell.at/ort/<slug>/`). Die eigene Seite `/termin-buchen/` erklärt den Ablauf, nennt Telefon/WhatsApp als Alternative und verlinkt per Deep-Link. Kein iframe ohne Einwilligung, Datenschutz siehe `recht-at-eu.md`.

---

## 3. GEO (Generative Engine Optimization) – Stand Oktober 2026

### 3.1 Was belegt ist

- **Google (AI Overviews / AI Mode):** Laut Google braucht es „no additional requirements“ und keine besonderen Optimierungen. Zitat: „You don't need to create new machine readable files, AI text files, or markup to appear in these features.“ und „There's also no special schema.org structured data that you need to add.“ Empfohlen werden Crawlbarkeit, interne Verlinkung, wichtige Inhalte als **Text**, gute Page Experience und **aktuelle Business-Profile-Daten**. Quelle: https://developers.google.com/search/docs/appearance/ai-features (zuletzt aktualisiert 2025-12-10).
- **BrightLocal-Studie „Local AI Visibility“ (16.09.2026):** Rund 200.000 lokale Suchen in ChatGPT, Google AI Mode und AI Overviews, rund 1,9 Mio. Zitate. **Eigene Websites stellen 42 % aller Zitate**, **Google Business Profile 28,5 %** (vor allem AI Mode/AI Overviews, kaum ChatGPT), Yelp 9,5 %, Facebook 2,2 %. **ChatGPT stützt sich stark auf Bing.** Google Maps nennt ein getracktes Unternehmen in 66 % der Suchen, KI-Plattformen nur in 32–38 %. Die Ergebnisse sind volatil: Unternehmen tauchen bei wiederholten Abfragen nur zu 20–33 % erneut auf. Quelle: https://www.brightlocal.com/research/local-ai-visibility-study/
- **SOCi Local Visibility Index 2026** (Vendor-Studie, laut Sekundärquellen): ChatGPT empfahl 1,2 % der Standorte, Gemini 11 %, Perplexity 7,4 %, das Google Local 3-Pack dagegen 35,9 %. Quelle (Sekundär): https://mshahid.com/blog/ai-local-visibility-report-2026 , https://www.soci.ai/blog/ai-for-local-seo-how-agents-improve-rankings-for-multi-location-brands/ → Fazit: **Local Pack/GBP bleibt der größte Hebel**, die KI-Sichtbarkeit baut darauf auf.
- **FAQ-Rich-Results:** Seit Aug. 2023 nur noch für Behörden- und Gesundheitsseiten (https://developers.google.com/search/blog/2023/08/howto-faq-changes). **Seit 7. Mai 2026 zeigt Google gar keine FAQ-Rich-Results mehr**, der Report in der Search Console fiel im Juni 2026 weg, die API-Unterstützung im August 2026. Google: „FAQ rich results are no longer appearing in Google Search.“ Das Markup schadet nicht, bringt aber keine Darstellung. Quelle: https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/ (10.05.2026). → FAQ-**Inhalte** bleiben für GEO wertvoll (Frage-Antwort-Text ist gut extrahierbar). `FAQPage`-JSON-LD ist optional und billig, aber kein Muss.
- **Bewertungs-Markup:** Google: Wenn das bewertete Unternehmen die Bewertungen über sich selbst kontrolliert (eigene Website, auch per eingebettetem Widget), sind `LocalBusiness`-/`Organization`-Seiten **nicht** für Sterne berechtigt. Außerdem: „Don't aggregate reviews or ratings from other websites.“ Quelle: https://developers.google.com/search/docs/appearance/structured-data/review-snippet (aktualisiert 2026-09-08). → **Kein `aggregateRating` aus Treatwell-Daten ins Schema.** Bewertungen im Text zu nennen und zu verlinken ist erlaubt („4,8 Sterne aus über 2.800 Treatwell-Bewertungen“, mit Datum).
- **llms.txt:** Google (John Mueller, 2025) sagt, dass keine Google-Suchsysteme llms.txt lesen. Verbreitung laut Studien zwischen ca. 2 % (Web Almanac 2025) und ca. 10 % (SE-Ranking-Stichprobe). Crawler-Log-Analysen 2026 zeigen kaum Abrufe; berichtet werden 97 % der Dateien ohne einen einzigen Abruf (Ahrefs-Daten, nur sekundär zitiert). Quellen: https://aisaasradar.com/article/llms-txt-adoption-data-2026 , https://www.1clickreport.com/blog/llms-txt-evidence-2026 , https://byfaro.ai/blog/ai-crawlers-ignore-llmstxt-97-of-the-time-so-stop-making-one , https://limy.ai/blog/llms-txt-in-2026-the-full-guide . **Ehrliche Einschätzung:** Für einen lokalen Salon bringt llms.txt 2026 nachweislich **keinen Ranking- oder Zitationsvorteil**. Weil der Aufwand minimal ist (statische Datei aus denselben Daten wie das Schema), kann man sie anlegen, mit **Priorität niedrig**. Sie ersetzt nichts von 3.2–3.5.

### 3.2 Entitäten-Konsistenz (NAP+H), höchste Priorität

**Kanonischer Datensatz** (eine Quelle `src/data/site.ts` für Website, Schema, llms.txt und alle Profile):

| Feld | Kanonischer Wert |
|---|---|
| Name (überall gleich) | **Hello Beauty** (Kategorie-Zusatz nur, wo das Feld es verlangt, z. B. Treatwell „Hello Beauty Salon“ → möglichst auf „Hello Beauty“ ändern lassen) |
| alternateName | „HelloBeauty“, „Hello Beauty Salon“, „HelloBeauty Vienna“, „HelloBeauty Schönheitssalon“ |
| Adresse | Barnabitengasse 7, 1060 Wien, Österreich |
| Telefon | +43 660 7055 631 (Schema: `+436607055631`) |
| E-Mail | info@hellobeautysalon.at |
| Website | https://hellobeautysalon.at/ |
| Öffnungszeiten | **Mo–Sa 09:00–19:00, So geschlossen** (Vorgabe Briefing) – **widerspricht Treatwell (08:00–19/20:00) und OSM (Sa nach Vereinbarung) → mit Salon klären [PRÜFEN]** |
| Kategorie | Primär: Nagelstudio (GBP „Nail salon“). Sekundär: Kosmetikstudio, Haarentfernungsdienst, Wimpernstudio |
| Sprachen | Deutsch, Ungarisch, Englisch [PRÜFEN] |

**Abgleich-Checkliste (Ist → Soll):**

| Plattform | Ist (2026-10-13) | Maßnahme |
|---|---|---|
| Website (alt) | „HelloBeauty Schönheitssalon“, Mo–Sa 9–19 | Neue Seite: „Hello Beauty“ + kanonische Daten |
| Google Unternehmensprofil | nicht geprüft (kein Zugriff) | Name, Kategorien, Öffnungszeiten, Feiertage, Leistungen mit Preisen, Attribute (Rollstuhl: laut OSM nein), Buchungslink, Website-URL mit UTM, Fotos; Q&A/Updates pflegen **[PRÜFEN]** |
| Treatwell | „Hello Beauty Salon“, Mo/Mi/Sa 8–19, Di/Do/Fr 8–20, keine Website/Telefon sichtbar | Öffnungszeiten angleichen (oder Website an Treatwell angleichen, je nach Realität), Beschreibung mit 1060/Mariahilf/U3 Neubaugasse |
| Facebook | „HelloBeauty Schönheitssalon \| Vienna“ | Name „Hello Beauty“, Adresse, Öffnungszeiten, Website, Treatwell-Link |
| Instagram | @hellobeauty.salon.at | Bio: „Nagel- & Kosmetiksalon · Barnabitengasse 7, 1060 Wien · DE/HU/EN“ + Link zur Website |
| OpenStreetMap | Name ok; `opening_hours` abweichend; `wheelchair=no` | Öffnungszeiten aktualisieren (fließt u. a. in Apple Maps und viele Apps ein); `website`, `phone`, `contact:instagram` ergänzen |
| Herold.at | kein Eintrag gefunden | Kostenlosen Grundeintrag anlegen (vom Salon, nicht von uns) |
| WKO Firmen-A–Z | „ESZTER NAILS e.U.“ an derselben Adresse | Prüfen, ob das der Rechtsträger ist → Impressum `legalName`; ggf. Website-Link im WKO-Eintrag setzen |
| Bing Places / Apple Business Connect | nicht geprüft | Anlegen bzw. übernehmen: ChatGPT nutzt laut BrightLocal stark Bing, Siri/Apple Maps nutzt Apple Business Connect |
| Alte Preislisten-PDFs | 7 alte PDFs öffentlich (2022–2025) | per 301 auf /preise/ umleiten (Abschnitt 7), damit KI keine veralteten Preise zitiert |

### 3.3 Zitierfähige Faktenblöcke

Diese Blöcke stehen wörtlich als sichtbarer Text auf der Startseite (Abschnitt „Auf einen Blick“), auf „Über uns“ und auf „Kontakt“. Sie sind kurz, faktisch, ohne Superlative und enthalten Entität, Ort, Leistungen und Unterscheidungsmerkmal. Jedes Datum aktualisieren.

**DE:**
> Hello Beauty ist ein Nagel- und Kosmetiksalon in der Barnabitengasse 7 in 1060 Wien (Mariahilf), etwa zwei Gehminuten von der U3-Station Neubaugasse und der Mariahilfer Straße entfernt. Der Salon bietet Nagelmodellage mit Gel und Acryl-Gel, Maniküre mit Gellack und Shellac, japanische Maniküre, Pediküre, Wimpernverlängerung und Wimpernlifting, Augenbrauenbehandlungen, Gesichtsbehandlungen sowie Haarentfernung mit Diodenlaser, Waxing und Sugaring an. Geöffnet ist Montag bis Samstag von 9 bis 19 Uhr; Termine sind online buchbar. Das Team spricht Deutsch, Ungarisch und Englisch. Auf Treatwell hat Hello Beauty eine Bewertung von 4,8 von 5 Sternen aus über 2.800 Bewertungen (Stand: Oktober 2026).

**EN:**
> Hello Beauty is a nail and beauty salon at Barnabitengasse 7, 1060 Vienna, Austria (Mariahilf district), about a two-minute walk from U3 Neubaugasse station and Mariahilfer Strasse. Services include gel and acrylic-gel nail extensions, gel polish and shellac manicures, Japanese manicure, pedicures, eyelash extensions and lash lifts, brow treatments, facials, and diode laser hair removal, waxing and sugaring. Open Monday to Saturday, 9 am to 7 pm; appointments can be booked online. The team speaks German, Hungarian and English. Hello Beauty is rated 4.8 out of 5 from more than 2,800 reviews on Treatwell (as of October 2026).

**HU:**
> A Hello Beauty köröm- és kozmetikai szalon Bécs 6. kerületében (Mariahilf), a Barnabitengasse 7. szám alatt található, körülbelül két perc sétára az U3-as Neubaugasse megállótól és a Mariahilfer Straße-tól. Szolgáltatásaink: műköröm zselével és akril-zselével, manikűr géllakkal és shellackel, japán manikűr, pedikűr, műszempilla és szempilla-lifting, szemöldökkezelések, arckezelések, valamint diódalézeres szőrtelenítés, gyantázás és cukorpasztás szőrtelenítés. Nyitva tartás: hétfőtől szombatig 9 és 19 óra között; időpont online foglalható. Csapatunk magyarul, németül és angolul beszél. A Treatwellen 4,8/5 csillagos értékelésünk van több mint 2800 vélemény alapján (2026. októberi állapot).

(Rating-Zahl und Sprachen vor Go-live aktualisieren bzw. bestätigen; Öffnungszeiten nach Klärung 3.2.)

### 3.4 FAQ (Inhalt für /faq/ + Kurz-FAQ je Leistungsseite)

Die Fragen orientieren sich an Autocomplete-Mustern und Ratgeber-Themen. Antworten mit Salon-Fakten füllen. Platzhalter sind markiert, **nichts erfinden**.

1. Wo genau ist Hello Beauty und wie komme ich hin? → Adresse, U3 Neubaugasse ca. 2–3 Min., Bus 13A/14A/57A „Haus des Meeres“, U4 Kettenbrückengasse ca. 7 Min.
2. Wie buche ich einen Termin, und kann ich ohne Termin kommen? → Treatwell-Online-Buchung, Telefon; Walk-in [PRÜFEN]
3. Wie storniere oder verschiebe ich einen Termin? → [PRÜFEN: Stornoregel]
4. Was ist der Unterschied zwischen Gellack/Shellac und Gelnägeln (Nagelmodellage)? → Gellack/Shellac = Farbschicht auf dem Naturnagel; Modellage = Aufbau/Verlängerung mit Gel bzw. Acryl-Gel
5. Wie lange halten Shellac und Gelnägel? Wann muss ich auffüllen? → Richtwerte (Ratgeber: Gel ca. 3–4, Shellac ca. 2–3 Wochen; https://www.treatwell.ch/treatment-files?p=14568) durch Salon-Erfahrung ersetzen [PRÜFEN]
6. Was kosten Gelnägel / Maniküre / Pediküre bei Hello Beauty? → Preise aus /preise/ (gleiche Datenquelle)
7. Was ist eine japanische Maniküre? → kurze Erklärung
8. Wie läuft die Laser-Haarentfernung ab, wie viele Sitzungen braucht man? → [PRÜFEN fachlich]
9. Ist Microneedling im Sommer möglich? → Preisliste: „Nicht für die Anwendung im Sommer empfohlen.“
10. Sprechen Sie Englisch/Ungarisch? → [PRÜFEN]
11. Welche Zahlungsmittel werden akzeptiert? → [PRÜFEN] (auch für Schema `paymentAccepted`)
12. Ist der Salon barrierefrei erreichbar? → OSM sagt `wheelchair=no` [PRÜFEN]
13. Haben Sie sonntags geöffnet? → Nein, Mo–Sa (beantwortet die Suche „nagelstudio wien sonntag geöffnet“ ehrlich)
14. Gibt es Gutscheine? → [PRÜFEN]

### 3.5 GEO-Maßnahmen, priorisiert

1. **NAP+H vereinheitlichen** (3.2): Öffnungszeiten-Konflikt auflösen, Name „Hello Beauty“ überall.
2. **GBP vollständig pflegen**: Leistungen mit Preisen, Kategorien, Fotos, Buchungslink, regelmäßige Beiträge. Es ist die Hauptquelle für AI Mode und AI Overviews (BrightLocal).
3. **Preise, Leistungen, Dauer als HTML-Text** auf den Leistungsseiten statt nur PDF. KI und Google zitieren Text (Google AI-Features-Doku).
4. **Faktenblöcke 3.3** + FAQ 3.4 dreisprachig, mit sichtbarem „Stand“-Datum.
5. **Schema (Abschnitt 4)** mit `@id`-Graph, `sameAs`, `geo`, `openingHoursSpecification`, `hasOfferCatalog`, `knowsLanguage`.
6. **Bewertungen**: Treatwell-Bewertungen weiter sammeln. Zusätzlich aktiv um **Google-Bewertungen** bitten (QR-Code am Empfang, Link nach dem Termin), auf Bewertungen antworten. Auf der Website Bewertungen als Text mit Quelle und Datum nennen, **ohne** `aggregateRating`-Markup.
7. **Bing Webmaster Tools + IndexNow** einrichten (ChatGPT-Suche nutzt laut BrightLocal stark Bing). Dazu **Bing Places** und **Apple Business Connect**.
8. **robots.txt**: Such-/Antwort-Crawler nicht blockieren (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot/Claude-SearchBot, Applebot). Ob Trainings-Crawler (GPTBot, Google-Extended, Applebot-Extended, CCBot) erlaubt werden, ist eine Geschäftsentscheidung; für Sichtbarkeit sind sie nicht nötig.
9. **Erwähnungen in Drittquellen**: Wiener Stadtmagazine (z. B. 1000things „Die besten Nagelstudios in Wien“: https://www.1000thingsmagazine.com/de/a/7854/nagelstudios-in-wien/), Bezirksmedien (meinbezirk.at Mariahilf), ungarische Community-Kanäle in Wien. Ziel sind Nennungen mit Name und Bezirk, die KI-Systeme zitieren.
10. **llms.txt** (niedrig): `/llms.txt` mit Faktenblock DE/EN/HU, Links zu Leistungs-, Preis-, Kontakt- und FAQ-Seiten. Automatisch aus `site.ts` generieren, damit es nie veraltet.
11. **Monitoring**: Ein monatliches Prompt-Set (DE/EN/HU) in ChatGPT, Gemini, Perplexity und Google AI Mode protokollieren, z. B. „Nagelstudio 1060 Wien“, „ungarischsprachiges Nagelstudio Wien“, „nail salon near Neubaugasse Vienna“, „magyar kozmetikus Bécsben“. Weil die Antworten stark schwanken (BrightLocal: 20–33 % Wiederholungsrate), jeden Prompt mehrfach ausführen und Trends betrachten.

---

## 4. Schema.org-Plan (JSON-LD)

Grundsätze:
- `NailSalon` ist laut https://schema.org/NailSalon ein direkter Subtyp von `HealthAndBeautyBusiness` (→ `LocalBusiness` → `Organization` und `Place`). Weil das Angebot weit über Nägel hinausgeht, wird **Mehrfachtypisierung** genutzt: `["NailSalon","BeautySalon"]`. Da `LocalBusiness` bereits ein `Organization`-Subtyp ist, braucht es **keinen separaten Organization-Knoten**. Ausnahme: Falls Rechtsträger und Marke abweichen (z. B. „ESZTER NAILS e.U.“), `legalName` am selben Knoten setzen. Ein eigener `Organization`-Knoten lohnt sich erst bei mehreren Standorten.
- Ein **globaler Graph** (Salon + WebSite) liegt auf jeder Seite. Pro Seite kommen `WebPage` + `BreadcrumbList` dazu, auf Leistungsseiten `Service` mit `Offer`, auf /faq/ `FAQPage`.
- Stabile `@id`s (sprachunabhängig für die Entität, sprachabhängig für Seiten):
  - Salon: `https://hellobeautysalon.at/#salon`
  - WebSite: `https://hellobeautysalon.at/#website`
  - Seiten: `{URL}#webpage`, `{URL}#breadcrumb`, `{URL}#service`, `{URL}#faq`
- `inLanguage`: `de-AT` / `en` / `hu` je nach Seite. Die Salon-Entität ist für alle Sprachen dieselbe, nur `description` wird pro Sprache ausgespielt.
- Alle Werte (Preise, Zeiten, sameAs) kommen aus `src/data/site.ts` und `src/data/prices.ts`. Sichtbarer Text und Markup müssen übereinstimmen (Google-Vorgabe).
- Kein `aggregateRating`/`review` (siehe 3.1).

### 4.1 Globaler Graph (jede Seite; Beispiel DE-Startseite)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NailSalon", "BeautySalon"],
      "@id": "https://hellobeautysalon.at/#salon",
      "name": "Hello Beauty",
      "alternateName": ["HelloBeauty", "Hello Beauty Salon", "HelloBeauty Vienna", "HelloBeauty Schönheitssalon"],
      "legalName": "[PRÜFEN: Rechtsträger laut Impressum, z. B. ESZTER NAILS e.U.?]",
      "description": "Nagel- und Kosmetiksalon in 1060 Wien-Mariahilf, 2 Gehminuten von der U3 Neubaugasse: Nagelmodellage, Maniküre mit Gellack/Shellac, Pediküre, Wimpern & Brauen, Gesichtsbehandlungen, Laser-Haarentfernung, Waxing und Sugaring.",
      "url": "https://hellobeautysalon.at/",
      "telephone": "+436607055631",
      "email": "info@hellobeautysalon.at",
      "image": [
        "https://hellobeautysalon.at/images/salon-innen-1200x1200.jpg",
        "https://hellobeautysalon.at/images/salon-innen-1200x900.jpg",
        "https://hellobeautysalon.at/images/salon-innen-1200x675.jpg"
      ],
      "logo": {
        "@type": "ImageObject",
        "@id": "https://hellobeautysalon.at/#logo",
        "url": "https://hellobeautysalon.at/logo-512.png",
        "width": 512,
        "height": 512
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Barnabitengasse 7",
        "postalCode": "1060",
        "addressLocality": "Wien",
        "addressRegion": "Wien",
        "addressCountry": "AT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.1986658,
        "longitude": 16.3535550
      },
      "hasMap": "https://www.openstreetmap.org/node/5204041868",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Mariahilf" },
        { "@type": "City", "name": "Wien" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "[PRÜFEN: z. B. Cash, Credit Card]",
      "knowsLanguage": ["de", "hu", "en"],
      "sameAs": [
        "https://www.facebook.com/hellobeautywien",
        "https://www.instagram.com/hellobeauty.salon.at/",
        "https://www.treatwell.at/salon/hello-beauty-salon/",
        "https://www.openstreetmap.org/node/5204041868",
        "[PRÜFEN: Google-Maps-URL mit CID aus dem Unternehmensprofil]"
      ],
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.treatwell.at/salon/hello-beauty-salon/",
          "inLanguage": ["de", "en"],
          "actionPlatform": ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"]
        },
        "result": { "@type": "Reservation", "name": "Termin bei Hello Beauty" }
      },
      "hasOfferCatalog": { "@id": "https://hellobeautysalon.at/#angebot" }
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://hellobeautysalon.at/#angebot",
      "name": "Leistungen und Preise Hello Beauty",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Nagelmodellage",
          "url": "https://hellobeautysalon.at/leistungen/nagelmodellage/",
          "itemListElement": [
            { "@type": "Offer", "price": "85", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Nagelmodellage Neues Set (Gel oder Acryl-Gel), Größe S" } },
            { "@type": "Offer", "price": "56", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Nagelmodellage Auffüllen mit Farbe, Größe S–M" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Maniküre, Gellack & Shellac",
          "url": "https://hellobeautysalon.at/leistungen/manikuere/",
          "itemListElement": [
            { "@type": "Offer", "price": "35", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Maniküre ohne Lack" } },
            { "@type": "Offer", "price": "38", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Japanische Maniküre" } },
            { "@type": "Offer", "price": "49", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Gellack / Shellac" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Pediküre",
          "url": "https://hellobeautysalon.at/leistungen/pedikuere/",
          "itemListElement": [
            { "@type": "Offer", "price": "44", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Fußpflege / Pediküre mit Skalpell" } },
            { "@type": "Offer", "price": "58", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Pediküre mit Gellack / Shellac" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Gesichtsbehandlungen",
          "url": "https://hellobeautysalon.at/leistungen/kosmetik/",
          "itemListElement": [
            { "@type": "Offer", "price": "89", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Tiefenreinigung Gesichtsbehandlung (1,5 Stunden)" } },
            { "@type": "Offer", "price": "79", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Microneedling mit Ultraschall (1 Stunde)" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Wimpern & Augenbrauen",
          "url": "https://hellobeautysalon.at/leistungen/wimpern-augenbrauen/",
          "itemListElement": [
            { "@type": "Offer", "price": "65", "priceCurrency": "EUR",
              "itemOffered": { "@type": "Service", "name": "Wimpernlifting mit Färben" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Haarentfernung (Diodenlaser/SHR, Waxing, Sugaring)",
          "url": "https://hellobeautysalon.at/leistungen/haarentfernung/"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://hellobeautysalon.at/#website",
      "url": "https://hellobeautysalon.at/",
      "name": "Hello Beauty",
      "alternateName": "HelloBeauty Wien",
      "publisher": { "@id": "https://hellobeautysalon.at/#salon" },
      "inLanguage": ["de-AT", "en", "hu"]
    },
    {
      "@type": "WebPage",
      "@id": "https://hellobeautysalon.at/#webpage",
      "url": "https://hellobeautysalon.at/",
      "name": "Nagelstudio & Kosmetik Wien 1060 | Hello Beauty",
      "isPartOf": { "@id": "https://hellobeautysalon.at/#website" },
      "about": { "@id": "https://hellobeautysalon.at/#salon" },
      "primaryImageOfPage": { "@id": "https://hellobeautysalon.at/#logo" },
      "inLanguage": "de-AT",
      "dateModified": "2026-10-13"
    }
  ]
}
```

Hinweise:
- Preise im Katalog sind **Beispiele** aus der Preisliste 06/2026. Im Build werden alle Positionen aus `prices.ts` generiert, denselben Daten wie die sichtbare Preistabelle. Die Haarentfernungs-Preise erst nach manuellem PDF-Abgleich übernehmen.
- `priceRange` „€€“ ist eine Einordnung **[SCHÄTZUNG]**. Alternativ als Spanne angeben, z. B. „15–115 €“ (kleinster und größter Preis der Liste, ohne Kleinstposten wie „ab 0,50 €“).
- Öffnungszeiten erst nach Klärung (3.2) final setzen. Feiertage über `specialOpeningHoursSpecification` pflegen.
- `image`: drei Seitenverhältnisse (1:1, 4:3, 16:9) gemäß Google-LocalBusiness-Empfehlung; Dateinamen sind Platzhalter.

### 4.2 Leistungsseite (Beispiel /leistungen/manikuere/)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://hellobeautysalon.at/leistungen/manikuere/#webpage",
      "url": "https://hellobeautysalon.at/leistungen/manikuere/",
      "name": "Maniküre, Gellack & Shellac Wien 1060 | Hello Beauty",
      "isPartOf": { "@id": "https://hellobeautysalon.at/#website" },
      "about": { "@id": "https://hellobeautysalon.at/leistungen/manikuere/#service" },
      "breadcrumb": { "@id": "https://hellobeautysalon.at/leistungen/manikuere/#breadcrumb" },
      "inLanguage": "de-AT"
    },
    {
      "@type": "Service",
      "@id": "https://hellobeautysalon.at/leistungen/manikuere/#service",
      "name": "Maniküre, Gellack & Shellac",
      "serviceType": "Maniküre",
      "provider": { "@id": "https://hellobeautysalon.at/#salon" },
      "areaServed": { "@type": "City", "name": "Wien" },
      "offers": [
        { "@type": "Offer", "name": "Maniküre ohne Lack", "price": "35", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Japanische Maniküre", "price": "38", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Gellack / Shellac", "price": "49", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Gellack / Shellac lang", "price": "51", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Shellac/Gellack entfernen mit Maniküre", "price": "40", "priceCurrency": "EUR" },
        { "@type": "Offer", "name": "Paraffinbehandlung für Hände", "price": "15", "priceCurrency": "EUR" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://hellobeautysalon.at/leistungen/manikuere/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://hellobeautysalon.at/" },
        { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://hellobeautysalon.at/leistungen/" },
        { "@type": "ListItem", "position": 3, "name": "Maniküre, Gellack & Shellac" }
      ]
    }
  ]
}
```
EN/HU analog mit `/en/services/manicure/` bzw. `/hu/szolgaltatasok/manikur/`, übersetzten `name`-Werten und `inLanguage` `en` bzw. `hu`. `provider` zeigt immer auf dieselbe `#salon`-Entität.

### 4.3 FAQ-Seite (/faq/; optional, nur GEO-Nutzen)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://hellobeautysalon.at/faq/#faq",
  "inLanguage": "de-AT",
  "isPartOf": { "@id": "https://hellobeautysalon.at/#website" },
  "about": { "@id": "https://hellobeautysalon.at/#salon" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie komme ich mit den Öffis zu Hello Beauty?",
      "acceptedAnswer": { "@type": "Answer", "text": "Hello Beauty liegt in der Barnabitengasse 7, 1060 Wien. Die nächste U-Bahn-Station ist Neubaugasse (U3), etwa 2–3 Gehminuten entfernt. Die Busse 13A, 14A und 57A halten an der Station Haus des Meeres, die U4 Kettenbrückengasse ist etwa 7 Gehminuten entfernt." }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Shellac und Gelnägeln?",
      "acceptedAnswer": { "@type": "Answer", "text": "[Antwort des Salons, identisch mit sichtbarem Text]" }
    }
  ]
}
```
Hinweis: Google zeigt FAQ-Rich-Results seit 07.05.2026 überhaupt nicht mehr an (vorher seit 2023 nur für Behörden/Gesundheit). Das Markup ist unschädlich und hilft maschineller Extraktion, aber es ist kein Pflichtbestandteil.

### 4.4 Weitere Seiten

- **Kontakt & Anfahrt:** `ContactPage` + `about: #salon`. Keine Google-Maps-Einbettung ohne Einwilligung (siehe `bestand.md`), stattdessen statisches Kartenbild und Link.
- **Über uns:** `AboutPage` + `about: #salon`. Teammitglieder nur mit Einwilligung als `employee` (`Person`, `jobTitle`, `knowsLanguage`).
- **Galerie:** `CollectionPage` mit `ImageObject`s (`contentUrl`, `caption` dreisprachig, `creditText: "Hello Beauty"`, `copyrightHolder: #salon`).
- **Preise:** `WebPage` + `mainEntity: { "@id": "https://hellobeautysalon.at/#angebot" }`.
- **Termin buchen:** `WebPage` + `potentialAction` ReserveAction (s. o.).
- **Impressum/Datenschutz/Barrierefreiheit:** nur `WebPage` + Breadcrumb.

### 4.5 hreflang

Jede Seite bekommt `<link rel="alternate" hreflang="de-AT">`, `hreflang="en"`, `hreflang="hu"`, `hreflang="x-default"` (→ DE) auf die Entsprechung aus der zentralen Routentabelle (`routes.ts`, Muster Carlofy laut `guddiweb-standard.md`). Dazu die gleichen Paare in der Sitemap. `<html lang>` = `de-AT` / `en` / `hu`.

---

## 5. Keyword-Map, Slugs, Titles & Descriptions

### 5.1 Slug-Tabelle

| Seite | DE | EN | HU |
|---|---|---|---|
| Start | `/` | `/en/` | `/hu/` |
| Leistungen (Hub) | `/leistungen/` | `/en/services/` | `/hu/szolgaltatasok/` |
| Nagelmodellage | `/leistungen/nagelmodellage/` | `/en/services/nail-extensions/` | `/hu/szolgaltatasok/mukorom/` |
| Maniküre / Gellack / Shellac | `/leistungen/manikuere/` | `/en/services/manicure/` | `/hu/szolgaltatasok/manikur/` |
| Pediküre | `/leistungen/pedikuere/` | `/en/services/pedicure/` | `/hu/szolgaltatasok/pedikur/` |
| Kosmetik / Gesicht | `/leistungen/kosmetik/` | `/en/services/facials/` | `/hu/szolgaltatasok/kozmetika/` |
| Wimpern & Augenbrauen (neu) | `/leistungen/wimpern-augenbrauen/` | `/en/services/lashes-brows/` | `/hu/szolgaltatasok/szempilla-szemoldok/` |
| Haarentfernung (neu) | `/leistungen/haarentfernung/` | `/en/services/hair-removal/` | `/hu/szolgaltatasok/szortelenites/` |
| Preise | `/preise/` | `/en/prices/` | `/hu/arak/` |
| Galerie | `/galerie/` | `/en/gallery/` | `/hu/galeria/` |
| Über uns | `/ueber-uns/` | `/en/about/` | `/hu/rolunk/` |
| Kontakt & Anfahrt | `/kontakt/` | `/en/contact/` | `/hu/kapcsolat/` |
| Termin buchen | `/termin-buchen/` | `/en/book/` | `/hu/idopontfoglalas/` |
| FAQ | `/faq/` | `/en/faq/` | `/hu/gyik/` |
| Impressum | `/impressum/` | `/en/imprint/` | `/hu/impresszum/` |
| Datenschutz | `/datenschutz/` | `/en/privacy/` | `/hu/adatvedelem/` |
| Barrierefreiheit | `/barrierefreiheit/` | `/en/accessibility/` | `/hu/akadalymentesseg/` |

Regeln: Kleinschreibung, Bindestriche, Umlaute transkribiert (ü→ue, ß→ss). HU ohne Akzente (ű/ü→u, ő/ö→o, á→a, é→e, í→i). Trailing Slash immer. Die DE-Slugs `/leistungen/manikuere/` und `/leistungen/pedikuere/` sind bewusst kurz; „Gellack/Shellac“ und „Fußpflege“ tragen Title und H1. Die alte Schreibweise `/pedikure/` wird umgeleitet (Abschnitt 7). Rechtstexte in EN/HU sind optional; maßgeblich ist DE. Werden sie nicht übersetzt, verlinken EN/HU auf die DE-Rechtsseiten, und die EN/HU-Slugs entfallen.

### 5.2 H1-Vorschläge (DE; EN/HU sinngemäß)

- Start: „Nagelstudio & Kosmetik in Wien 1060 – Hello Beauty in Mariahilf“
- Leistungen: „Unsere Leistungen in Wien-Mariahilf“
- Nagelmodellage: „Nagelmodellage & Gelnägel in Wien 1060“
- Maniküre: „Maniküre mit Gellack & Shellac in Wien 1060“
- Pediküre: „Pediküre & Fußpflege in Wien 1060“
- Kosmetik: „Kosmetik & Gesichtsbehandlungen in Wien 1060“
- Wimpern & Brauen: „Wimpernverlängerung, Wimpernlifting & Brauen in Wien 1060“
- Haarentfernung: „Laser-Haarentfernung, Waxing & Sugaring in Wien 1060“
- Preise: „Preise – Nagelstudio & Kosmetik Hello Beauty“
- Kontakt: „Kontakt & Anfahrt: Barnabitengasse 7, 1060 Wien“

### 5.3 Titles (≤ 60 Zeichen) & Meta-Descriptions (140–160 Zeichen)

Zeichenzahlen per Skript gezählt (Unicode-Zeichen). Alle 51 Einträge liegen innerhalb der Grenzen. Angaben wie „2 Min. von der U3“, „Mo–Sa 9–19“, „Deutsch, Ungarisch und Englisch“ und „rund um die Uhr“ hängen an den **[PRÜFEN]**-Punkten (Öffnungszeiten, Sprachen, Buchungssystem) und müssen gegebenenfalls angepasst werden.


#### DE

| Seite | Slug | Primär-Keywords | Title (Zeichen) | Meta-Description (Zeichen) |
|---|---|---|---|---|
| start | `/` | Nagelstudio Wien 1060 · Nagelstudio Mariahilf · Kosmetik 1060 | Nagelstudio & Kosmetik Wien 1060 \| Hello Beauty (47) | Nagelstudio & Kosmetik in Wien-Mariahilf, 2 Min. von der U3 Neubaugasse: Gelnägel, Shellac, Pediküre, Wimpern, Laser. Mo–Sa 9–19 Uhr. Jetzt online buchen. (154) |
| services | `/leistungen/` | Beautysalon Wien 1060 · Kosmetikstudio 1060 | Leistungen: Nägel, Pediküre, Kosmetik \| Hello Beauty (52) | Alle Leistungen von Hello Beauty in Wien 1060: Nagelmodellage, Maniküre mit Gellack/Shellac, Pediküre, Gesichtsbehandlungen, Wimpern, Brauen und Haarentfernung. (160) |
| nails | `/leistungen/nagelmodellage/` | Gelnägel Wien · Nagelmodellage Wien · Gelnägel auffüllen Wien | Nagelmodellage & Gelnägel Wien 1060 \| Hello Beauty (50) | Gelnägel und Nagelmodellage in Wien-Mariahilf: Neues Set mit Gel oder Acryl-Gel, Auffüllen, French, Babyboomer und Nail-Art. Preise online, direkt buchen. (154) |
| manicure | `/leistungen/manikuere/` | Maniküre Wien 1060 · Shellac Wien · Gellack Wien · japanische Maniküre Wien | Maniküre, Gellack & Shellac Wien 1060 \| Hello Beauty (52) | Maniküre in Wien 1060: klassische und japanische Maniküre, Gellack und Shellac, Ablösen und Paraffinbad. Nahe Mariahilfer Straße, U3 Neubaugasse. Online buchen. (160) |
| pedicure | `/leistungen/pedikuere/` | Pediküre Wien · Fußpflege 1060 · Pediküre 1060 | Pediküre & Fußpflege Wien 1060 \| Hello Beauty (45) | Pediküre und Fußpflege in Wien-Mariahilf: Pediküre mit Skalpell, Intensiv-Pediküre, Gellack/Shellac für Zehennägel, Paraffinbad und Titan-Spange. Online buchen. (160) |
| cosmetics | `/leistungen/kosmetik/` | Kosmetik 1060 · Gesichtsbehandlung Wien · Microneedling Wien | Kosmetik & Gesichtsbehandlung Wien 1060 \| Hello Beauty (54) | Gesichtsbehandlungen in Wien 1060: Tiefenreinigung, Microneedling, AquaFacial, LED-Therapie, Faszien-Gesichtsmassage und Germaine de Capuccini. Jetzt buchen. (157) |
| lashes | `/leistungen/wimpern-augenbrauen/` | Wimpernlifting Wien · Wimpernverlängerung Wien · Augenbrauenlaminierung Wien | Wimpernlifting & Brauen Wien 1060 \| Hello Beauty (48) | Wimpern und Augenbrauen in Wien 1060: Wimpernverlängerung 1D bis Mega-Volumen, Wimpernlifting, Brow Lamination, Henna Brows, Färben und Zupfen. Online buchen. (158) |
| hair | `/leistungen/haarentfernung/` | Laser Haarentfernung Wien · Laser Haarentfernung 1060 · Sugaring Wien · Waxing 1060 | Laser-Haarentfernung, Waxing Wien 1060 \| Hello Beauty (53) | Haarentfernung in Wien 1060: dauerhafte Haarentfernung mit Diodenlaser/SHR, Waxing und Brazilian Sugaring für Damen und Herren. Preise je Zone, online buchen. (158) |
| prices | `/preise/` | Nagelstudio Wien Preise · Gelnägel Wien Preise · Pediküre Wien Preise | Preise Nagelstudio & Kosmetik Wien 1060 \| Hello Beauty (54) | Aktuelle Preisliste von Hello Beauty in Wien 1060: Maniküre, Gelnägel, Shellac, Pediküre, Kosmetik, Wimpern und Haarentfernung – übersichtlich in Euro. (151) |
| gallery | `/galerie/` | Nageldesign Wien · Nail Art Wien | Galerie: Nageldesign & Nail-Art aus Wien \| Hello Beauty (55) | Nageldesigns, Gelnägel, Pediküre und Wimpern aus unserem Salon in Wien-Mariahilf: Lassen Sie sich inspirieren und buchen Sie Ihren Wunschlook direkt online. (156) |
| about | `/ueber-uns/` | Beautysalon Mariahilf · ungarisches Nagelstudio Wien | Über uns: Ihr Beautysalon in Wien-Mariahilf \| Hello Beauty (58) | Hello Beauty ist ein Nagel- und Kosmetiksalon in der Barnabitengasse 7, 1060 Wien. Unser Team spricht Deutsch, Ungarisch und Englisch. Lernen Sie uns kennen. (157) |
| contact | `/kontakt/` | Nagelstudio Neubaugasse · Nagelstudio Mariahilfer Straße | Kontakt & Anfahrt: Barnabitengasse 7, Wien \| Hello Beauty (57) | Hello Beauty, Barnabitengasse 7, 1060 Wien: 2 Gehminuten von der U3 Neubaugasse, nahe Mariahilfer Straße. Mo–Sa 9–19 Uhr. Telefon, E-Mail und Anfahrt. (150) |
| book | `/termin-buchen/` | Nagelstudio Wien online buchen · Termin Maniküre Wien | Termin online buchen – Nagelstudio Wien \| Hello Beauty (54) | Buchen Sie Ihren Termin bei Hello Beauty in Wien 1060 online – Maniküre, Gelnägel, Pediküre, Kosmetik, Wimpern oder Laser. Rund um die Uhr, in wenigen Klicks. (158) |
| faq | `/faq/` | Shellac oder Gel · wie lange halten Gelnägel | FAQ: Gelnägel, Shellac, Pediküre & mehr \| Hello Beauty (54) | Antworten auf häufige Fragen: Wie lange halten Gelnägel und Shellac? Was kostet eine Pediküre? Wie storniere ich? Sprechen Sie Ungarisch? Alles zu Hello Beauty. (160) |
| imprint | `/impressum/` | — | Impressum \| Hello Beauty Wien (29) | Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG von Hello Beauty, Nagel- und Kosmetiksalon, Barnabitengasse 7, 1060 Wien: Inhaber, Kontakt, Gewerbe. (157) |
| privacy | `/datenschutz/` | — | Datenschutzerklärung \| Hello Beauty Wien (40) | Datenschutzerklärung von Hello Beauty Wien: welche Daten wir bei Website-Besuch, Kontakt und Online-Buchung verarbeiten, wie lange und welche Rechte Sie haben. (159) |
| a11y | `/barrierefreiheit/` | — | Barrierefreiheitserklärung \| Hello Beauty Wien (46) | Erklärung zur Barrierefreiheit der Website von Hello Beauty Wien: Stand der Umsetzung nach WCAG 2.2 AA, bekannte Einschränkungen und Kontakt für Feedback. (154) |

#### EN

| Seite | Slug | Primär-Keywords | Title (Zeichen) | Meta-Description (Zeichen) |
|---|---|---|---|---|
| start | `/en/` | nail salon Vienna · beauty salon Vienna · nail salon Mariahilf | Nail & Beauty Salon Vienna 1060 \| Hello Beauty (46) | Nail and beauty salon in Vienna's 6th district, 2 min from U3 Neubaugasse: gel nails, shellac, pedicure, lashes, facials. Mon–Sat 9am–7pm. Book online now. (155) |
| services | `/en/services/` | beauty salon Vienna services | Services: Nails, Pedicure, Facials \| Hello Beauty (49) | All treatments at Hello Beauty in Vienna 1060: nail extensions, gel and shellac manicure, pedicure, facials, lashes, brows, waxing and laser hair removal. (154) |
| nails | `/en/services/nail-extensions/` | gel nails Vienna · nail extensions Vienna · builder gel nails Vienna | Gel Nails & Nail Extensions Vienna \| Hello Beauty (49) | Gel nails and nail extensions in Vienna 1060: new sets in gel or acrylic gel, refills, French, baby boomer and nail art. Clear prices, easy online booking. (155) |
| manicure | `/en/services/manicure/` | manicure Vienna · gel manicure Vienna · shellac nails Vienna · Japanese manicure Vienna | Manicure, Gel Polish & Shellac Vienna \| Hello Beauty (52) | Manicure in Vienna's 6th district: classic and Japanese manicure, gel polish and shellac, removal and paraffin treatment. Near Mariahilfer Strasse. Book online. (160) |
| pedicure | `/en/services/pedicure/` | pedicure Vienna · foot care Vienna | Pedicure & Foot Care Vienna 1060 \| Hello Beauty (47) | Pedicure and foot care in Vienna 1060: classic and intensive pedicure, gel polish or shellac for toenails, paraffin bath and titanium brace. Book online now. (157) |
| cosmetics | `/en/services/facials/` | facial Vienna · microneedling Vienna | Facials & Skin Care Vienna 1060 \| Hello Beauty (46) | Facials in Vienna's 6th district: deep cleansing, microneedling, AquaFacial, LED therapy, fascia face massage and Germaine de Capuccini facials. Book online. (157) |
| lashes | `/en/services/lashes-brows/` | lash lift Vienna · eyelash extensions Vienna · Korean lash lift Vienna | Lash Lift, Extensions & Brows Vienna \| Hello Beauty (51) | Lashes and brows in Vienna 1060: eyelash extensions from classic to mega volume, lash lift, Korean lash lift, brow lamination, henna brows, tinting. Book now. (158) |
| hair | `/en/services/hair-removal/` | laser hair removal Vienna · waxing Vienna · sugaring Vienna | Laser Hair Removal & Waxing Vienna \| Hello Beauty (49) | Hair removal in Vienna 1060: permanent diode laser/SHR hair removal, waxing and Brazilian sugaring for women and men. Clear prices per zone, book online today. (159) |
| prices | `/en/prices/` | manicure Vienna price · laser hair removal Vienna price | Prices: Nail & Beauty Salon Vienna \| Hello Beauty (49) | Current price list of Hello Beauty in Vienna 1060: manicure, gel nails, shellac, pedicure, facials, lashes, brows and hair removal – all prices in euros. (153) |
| gallery | `/en/gallery/` | nail art Vienna · nail designs Vienna | Gallery: Nail Designs & Nail Art Vienna \| Hello Beauty (54) | Nail designs, gel nails, pedicures and lash work from our salon in Vienna's Mariahilf district. Get inspired by real results and book your look online. (151) |
| about | `/en/about/` | English speaking nail salon Vienna | About Us: Beauty Salon in Vienna Mariahilf \| Hello Beauty (57) | Hello Beauty is a nail and beauty salon at Barnabitengasse 7, 1060 Vienna. Our team speaks German, Hungarian and English. Meet the people behind your treatment. (160) |
| contact | `/en/contact/` | nail salon Mariahilfer Strasse | Contact & Directions: Vienna 1060 \| Hello Beauty (48) | Hello Beauty, Barnabitengasse 7, 1060 Vienna: a 2-minute walk from U3 Neubaugasse, just off Mariahilfer Strasse. Open Mon–Sat 9am–7pm. Phone, email, directions. (160) |
| book | `/en/book/` | book nail appointment Vienna | Book an Appointment Online in Vienna \| Hello Beauty (51) | Book your appointment at Hello Beauty in Vienna 1060 online – manicure, gel nails, pedicure, facials, lashes or laser hair removal – 24/7, in a few clicks. (155) |
| faq | `/en/faq/` | how long does shellac last · gel vs shellac | FAQ: Gel Nails, Shellac, Pedicure & More \| Hello Beauty (55) | Answers to common questions: How long do gel nails and shellac last? What does a pedicure cost? How do I cancel? Do you speak English? All about Hello Beauty. (158) |
| imprint | `/en/imprint/` | — | Legal Notice (Imprint) \| Hello Beauty Vienna (44) | Legal notice and disclosure under Austrian law (§ 5 ECG, § 25 MedienG) for Hello Beauty, nail and beauty salon, Barnabitengasse 7, 1060 Vienna, Austria. (152) |
| privacy | `/en/privacy/` | — | Privacy Policy \| Hello Beauty Vienna (36) | Privacy policy of Hello Beauty Vienna: which personal data we process when you visit our website, contact us or book online, how long we keep it, your rights. (158) |
| a11y | `/en/accessibility/` | — | Accessibility Statement \| Hello Beauty Vienna (45) | Accessibility statement for the Hello Beauty Vienna website: conformance status with WCAG 2.2 AA, known limitations and how to send us your feedback. (149) |

#### HU

| Seite | Slug | Primär-Keywords | Title (Zeichen) | Meta-Description (Zeichen) |
|---|---|---|---|---|
| start | `/hu/` | körömszalon Bécs · magyar körmös Bécs · magyar kozmetikus Bécsben | Körömszalon és kozmetika Bécs 1060 \| Hello Beauty (49) | Magyar nyelvű köröm- és kozmetikai szalon Bécs 6. kerületében, az U3 Neubaugasse mellett: műköröm, géllakk, pedikűr, szempilla. Foglalj időpontot online! (153) |
| services | `/hu/szolgaltatasok/` | kozmetikus Bécs · szépségszalon Bécs | Szolgáltatások: köröm, pedikűr, kozmetika \| Hello Beauty (56) | A Hello Beauty szolgáltatásai Bécs 6. kerületében: műköröm, manikűr géllakkal, pedikűr, arckezelések, szempilla, szemöldök, gyantázás és lézeres szőrtelenítés. (159) |
| nails | `/hu/szolgaltatasok/mukorom/` | műköröm Bécs · magyar körmös Bécs · zselés köröm Bécs | Műköröm és zselés köröm Bécsben \| Hello Beauty (46) | Műköröm Bécs 6. kerületében magyarul: új szett zselével vagy akril-zselével, töltés, francia, babyboomer és körömdíszítés. Áraink online, foglalj időpontot! (156) |
| manicure | `/hu/szolgaltatasok/manikur/` | manikűr Bécs · géllakk Bécs | Manikűr és géllakk Bécsben, 1060 \| Hello Beauty (47) | Manikűr Bécsben, a 6. kerületben magyarul: klasszikus és japán manikűr, géllakk és shellac, eltávolítás, paraffinos kezelés. Az U3 Neubaugasse mellett. (151) |
| pedicure | `/hu/szolgaltatasok/pedikur/` | pedikűr Bécs · magyar pedikűr Bécs | Pedikűr és lábápolás Bécsben \| Hello Beauty (43) | Pedikűr Bécsben magyarul: szikés pedikűr, intenzív pedikűr, géllakk vagy shellac a lábkörmökre, paraffinos lábfürdő és titán körömszabályzó. Foglalj most! (154) |
| cosmetics | `/hu/szolgaltatasok/kozmetika/` | magyar kozmetikus Bécsben · kozmetikus Bécs | Kozmetika és arckezelés Bécsben \| Hello Beauty (46) | Magyar kozmetikus Bécsben: mélytisztító arckezelés, microneedling, AquaFacial, LED-terápia, fasciás arcmasszázs és Germaine de Capuccini kezelések. Foglalj! (156) |
| lashes | `/hu/szolgaltatasok/szempilla-szemoldok/` | szempilla Bécs · szempilla-lifting Bécs | Szempilla és szemöldök Bécsben \| Hello Beauty (45) | Szempilla és szemöldök Bécs 6. kerületében: műszempilla 1D-től mega volumenig, szempilla-lifting, szemöldök-laminálás, henna és festés. Foglalj időpontot! (154) |
| hair | `/hu/szolgaltatasok/szortelenites/` | lézeres szőrtelenítés Bécs · gyantázás Bécs | Lézeres szőrtelenítés, gyantázás Bécs \| Hello Beauty (52) | Szőrtelenítés Bécsben magyarul: tartós szőrtelenítés diódalézerrel/SHR, gyantázás és brazil cukorpasztás szőrtelenítés nőknek és férfiaknak. Árak online. (153) |
| prices | `/hu/arak/` | műköröm ár Bécs · árlista | Árak – körömszalon és kozmetika Bécs \| Hello Beauty (51) | A Hello Beauty aktuális árlistája Bécsben: manikűr, műköröm, géllakk, pedikűr, kozmetika, szempilla, szemöldök és szőrtelenítés – áttekinthetően, euróban. (154) |
| gallery | `/hu/galeria/` | körömdíszítés Bécs | Galéria: körömdíszítés és műköröm Bécs \| Hello Beauty (53) | Körömdíszítések, műkörmök, pedikűr és szempilla munkáink a bécsi 6. kerületi szalonunkból. Nézd meg valódi munkáinkat, és foglald le a kedvenc stílusodat! (154) |
| about | `/hu/rolunk/` | magyar szépségszalon Bécs · magyar körmös Bécs | Rólunk: magyar szépségszalon Bécsben \| Hello Beauty (51) | A Hello Beauty köröm- és kozmetikai szalon a bécsi Barnabitengasse 7. szám alatt, a 6. kerületben. Csapatunk magyarul, németül és angolul is beszél. (148) |
| contact | `/hu/kapcsolat/` | körmös Bécs 6. kerület | Kapcsolat és megközelítés, Bécs 1060 \| Hello Beauty (51) | Hello Beauty, Barnabitengasse 7, 1060 Bécs: 2 perc sétára az U3 Neubaugasse megállótól, a Mariahilfer Straße közelében. Nyitva H–Szo 9–19. Telefon, e-mail. (155) |
| book | `/hu/idopontfoglalas/` | időpontfoglalás körmös Bécs | Online időpontfoglalás – Bécs 1060 \| Hello Beauty (49) | Foglalj időpontot online a bécsi Hello Beauty szalonba: manikűr, műköröm, pedikűr, kozmetika, szempilla vagy lézeres szőrtelenítés – néhány kattintással, 0–24. (159) |
| faq | `/hu/gyik/` | meddig tart a géllakk | GYIK: műköröm, géllakk, pedikűr \| Hello Beauty (46) | Válaszok a gyakori kérdésekre: Meddig tart a műköröm és a géllakk? Mennyibe kerül a pedikűr? Hogyan mondhatom le az időpontot? Minden a Hello Beauty szalonról. (159) |
| imprint | `/hu/impresszum/` | — | Impresszum \| Hello Beauty Bécs (30) | A Hello Beauty köröm- és kozmetikai szalon (Barnabitengasse 7, 1060 Bécs) impresszuma az osztrák jog (§ 5 ECG, § 25 MedienG) szerint: tulajdonos, kapcsolat. (156) |
| privacy | `/hu/adatvedelem/` | — | Adatvédelmi tájékoztató \| Hello Beauty Bécs (43) | A Hello Beauty adatvédelmi tájékoztatója: milyen adatokat kezelünk weboldal-látogatáskor, kapcsolatfelvételkor és online foglaláskor, és milyen jogaid vannak. (158) |
| a11y | `/hu/akadalymentesseg/` | — | Akadálymentességi nyilatkozat \| Hello Beauty Bécs (49) | A Hello Beauty weboldalának akadálymentességi nyilatkozata: a WCAG 2.2 AA szerinti megfelelés állapota, ismert korlátozások és visszajelzési lehetőség. (151) |

---

## 6. Interne Verlinkung (Hub & Spoke)

```
                         ┌──────────── Start (/) ────────────┐
                         │  Faktenblock · Top-Leistungen ·    │
                         │  Preise-Teaser · Galerie-Teaser ·  │
                         │  Bewertungen · Anfahrt · CTA       │
                         └──┬──────────┬──────────┬──────────┘
                            │          │          │
                   Leistungen-Hub   Preise     Kontakt & Anfahrt
                   (/leistungen/)  (/preise/)  (/kontakt/)
                            │
   ┌──────────┬────────────┼─────────────┬──────────────┬──────────────┐
Nagel-     Maniküre/    Pediküre     Kosmetik      Wimpern &      Haar-
modellage  Gel/Shellac                             Brauen         entfernung
   └── je Spoke: → Preise#anker · → Galerie#filter · → Termin buchen · → FAQ#frage · → 2 Geschwister-Spokes
```

Regeln:
1. **Hub → Spokes:** /leistungen/ verlinkt alle 6 Leistungsseiten mit beschreibendem Ankertext („Gelnägel & Nagelmodellage“, „Pediküre & Fußpflege“ …) und je 1–2 Sätzen + „ab“-Preis.
2. **Spoke → Hub + Geschwister:** Jede Leistungsseite verlinkt per Breadcrumb zurück zum Hub und kontextuell auf thematisch nahe Seiten:
   - Nagelmodellage ↔ Maniküre (Gellack vs. Modellage) ↔ Pediküre (Gellack an den Zehen)
   - Kosmetik ↔ Wimpern & Brauen ↔ Haarentfernung
3. **Spoke → Preise mit Anker** (`/preise/#nagelmodellage`) und **→ Galerie mit Filter/Anker** (`/galerie/#naegel`).
4. **Spoke → Termin buchen** als primärer CTA (oben und unten), dazu Telefon als `tel:`-Link.
5. **Spoke → FAQ**: 3–4 Kurzfragen pro Leistungsseite sichtbar, jeweils mit Link „Alle Fragen“ → `/faq/#…`.
6. **Preise → Leistungen**: jede Preiskategorie-Überschrift verlinkt die Leistungsseite.
7. **Galerie → Leistungen**: Bildunterschrift/Filter verlinkt die passende Leistung.
8. **Kontakt** wird von jeder Seite im Footer verlinkt (NAP-Block, identisch in allen Sprachen, als Text, nicht als Bild).
9. **Über uns → Leistungen** (Team-Spezialisierungen → Spoke-Seiten) und **→ Kontakt**.
10. **Sprachumschalter** verlinkt immer auf die Entsprechung derselben Seite (Routentabelle), nicht auf die Startseite.
11. **Header-Navigation** (max. 6–7 Punkte): Leistungen (Dropdown mit 6 Spokes), Preise, Galerie, Über uns, Kontakt, [Termin buchen-Button], Sprachwahl DE/EN/HU. **Footer:** NAP, Öffnungszeiten, Leistungen-Links, FAQ, Impressum, Datenschutz, Barrierefreiheit, Social-Links (https), Treatwell-Link.
12. **Keine Waisen:** jede Seite ist aus Navigation oder Footer erreichbar und steht in der Sitemap. Nur Rechtstexte bleiben aus der Hauptnavigation draußen.

---

## 7. Weiterleitungs-Map alte → neue URLs

**Crawl-Grundlage (Abruf 2026-10-13):**
- `https://hellobeautysalon.at/sitemap.xml` → leitet auf `/wp-sitemap.xml` weiter
- `https://hellobeautysalon.at/wp-sitemap.xml` → `wp-sitemap-posts-page-1.xml` (5 URLs), `wp-sitemap-users-1.xml`, `/en/wp-sitemap-users-1.xml`
- `https://hellobeautysalon.at/sitemap_index.xml` → 404 (kein Yoast/Rank Math)
- REST-API Seiten: `https://hellobeautysalon.at/wp-json/wp/v2/pages?per_page=100` → 6 Seiten (inkl. `/preisliste/`, nicht in der Sitemap)
- REST-API Beiträge: `/wp-json/wp/v2/posts` → 0 Beiträge
- REST-API Medien: `/wp-json/wp/v2/media` → 154 Anhänge (8 PDFs). Die **Anhangseiten liefern HTTP 200** und sind damit indexierbar (geprüft u. a. `/preisliste-3/`, `/arlista_web-2/`, `/brossura1-2-masolat-uj/`)
- Polylang: `https://hellobeautysalon.at/wp-json/pll/v1/languages` → `de` (Startseite `/`) und `en` (`/en/`). `/en/` = 200 (leer), `/hu/` = 404, `/en/uber-uns/` → 301 auf `/uber-uns/`
- Nicht existent (404): `/datenschutz/`, `/impressum/`, `/galerie/`, `/kontakt/`, `/leistungen/`. Die alte Seite hat **kein Impressum und keinen Datenschutz als eigene URL**.

### 7.1 Seiten (alle 301)

| Alte URL | Status alt | Neues Ziel (301) |
|---|---|---|
| `/` | 200 | `/` (gleich, keine Weiterleitung) |
| `/hauptseite/` | 301 → `/` | `/` |
| `/?p=5` | 301 → `/` | `/` (Query wird von statischem Hosting ignoriert, ok) |
| `/uber-uns/` | 200 | `/ueber-uns/` |
| `/nagelmodellage/` | 200 | `/leistungen/nagelmodellage/` |
| `/kosmetik/` | 200 | `/leistungen/kosmetik/` |
| `/pedikure/` | 200 | `/leistungen/pedikuere/` |
| `/preisliste/` (+ `/?page_id=32`) | 200 | `/preise/` |
| `/en/` | 200 (leer) | `/en/` (neue Inhalte, keine Weiterleitung) |
| `/en/uber-uns/` | 301 → `/uber-uns/` | `/en/about/` |
| `/en/*` (alle sonstigen) | – | `/en/` |
| `/hu/` | 404 | `/hu/` (neu) |
| `/author/nchristian/` | 200 | `/ueber-uns/` |
| `/feed/`, `/comments/feed/` | 200 | `/` |
| `/en/feed/`, `/en/comments/feed/` | 200 | `/en/` |
| `/wp-sitemap.xml`, `/wp-sitemap-posts-page-1.xml`, `/wp-sitemap-users-1.xml`, `/en/wp-sitemap-users-1.xml`, `/sitemap.xml` | 200/301 | `/sitemap-index.xml` (Astro-Sitemap) |
| Alte Anker `/#uberuns`, `/#leistungen`, `/#galerie`, `/#preisliste`, `/#kontakt` | – | nicht umleitbar (Fragment). Auf der neuen Startseite gleichnamige `id`s setzen: `id="uberuns"` → Abschnitt Über uns usw. |

### 7.2 Dateien

| Alte URL | Neues Ziel |
|---|---|
| `/wp-content/uploads/2026/06/Preisliste.pdf` | `/preise/` (301). Optional neues PDF unter `/downloads/preisliste-hello-beauty.pdf` verlinken |
| `/wp-content/uploads/2025/09/arlista_nyomtatas_augusztus_web.pdf` | `/preise/` |
| `/wp-content/uploads/2025/04/arlista_web-1.pdf` | `/preise/` |
| `/wp-content/uploads/2025/04/arlista_web.pdf` | `/preise/` |
| `/wp-content/uploads/2023/12/arlista_web.pdf` | `/preise/` |
| `/wp-content/uploads/2023/04/preislist_jav.pdf` | `/preise/` |
| `/wp-content/uploads/2022/12/preislist-1.pdf` | `/preise/` |
| `/wp-content/uploads/2022/12/preislist.pdf` | `/preise/` |
| `/wp-content/uploads/*` (alle Bilder) | `/galerie/` (301, Sammelregel nach den PDF-Regeln) |
| `/wp-content/*`, `/wp-includes/*`, `/wp-json/*`, `/xmlrpc.php`, `/wp-admin/*`, `/wp-login.php` | **keine Weiterleitung** → 404 (bzw. 410). Keine Pseudo-Redirects für Systempfade |

### 7.3 Anhangseiten (154, alle HTTP 200 auf alter Seite)

| Gruppe | Anzahl | Ziel (301) |
|---|---|---|
| PDF-Anhangseiten: `/preisliste-3/`, `/arlista_nyomtatas_augusztus_web/`, `/arlista_web-3/`, `/arlista_web-2/`, `/arlista_web/`, `/preislist_jav/`, `/preislist-2/`, `/preislist/` | 8 | `/preise/` |
| Unter `/uber-uns/<slug>/` (z. B. `/uber-uns/viber_kep_2023-12-09_20-04-36-274/`, `/uber-uns/img_3154/` …) | 15 | `/ueber-uns/` |
| Unter `/kosmetik/<slug>/` (`/kosmetik/img_6532/`, `/kosmetik/img_6533/`) | 2 | `/leistungen/kosmetik/` |
| Unter `/hauptseite/<slug>/` (z. B. `/hauptseite/csapat/`, `/hauptseite/nagelmodellage/`, `/hauptseite/kosmetik/`, `/hauptseite/pedikure/` …) | 22 | `/` (Ausnahmen: `/hauptseite/nagelmodellage/` → `/leistungen/nagelmodellage/`, `/hauptseite/kosmetik/` + `/hauptseite/kosmetik-2/` → `/leistungen/kosmetik/`, `/hauptseite/pedikure/` → `/leistungen/pedikuere/`) |
| `/?attachment_id=N` (935, 878, 859, 505, 399, 328, 178, 177, 75, 73, 49, 22, 19, 16) | 14 | landet auf `/` (Query bei statischer Seite ignoriert). Optional per Vercel-`has`-Query → `/galerie/` |
| Bild-Anhangseiten auf Root-Ebene (Liste Anhang A) | 93 | `/galerie/` |

### 7.4 `vercel.json`-Entwurf (Reihenfolge = Priorität)

```json
{
  "trailingSlash": true,
  "redirects": [
    { "source": "/hauptseite/nagelmodellage/", "destination": "/leistungen/nagelmodellage/", "permanent": true },
    { "source": "/hauptseite/kosmetik/", "destination": "/leistungen/kosmetik/", "permanent": true },
    { "source": "/hauptseite/kosmetik-2/", "destination": "/leistungen/kosmetik/", "permanent": true },
    { "source": "/hauptseite/pedikure/", "destination": "/leistungen/pedikuere/", "permanent": true },
    { "source": "/hauptseite/:slug*", "destination": "/", "permanent": true },
    { "source": "/uber-uns/:slug+", "destination": "/ueber-uns/", "permanent": true },
    { "source": "/uber-uns/", "destination": "/ueber-uns/", "permanent": true },
    { "source": "/kosmetik/:slug*", "destination": "/leistungen/kosmetik/", "permanent": true },
    { "source": "/nagelmodellage/", "destination": "/leistungen/nagelmodellage/", "permanent": true },
    { "source": "/pedikure/", "destination": "/leistungen/pedikuere/", "permanent": true },
    { "source": "/preisliste/", "destination": "/preise/", "permanent": true },
    { "source": "/(preisliste-3|preislist|preislist-2|preislist_jav|arlista_web|arlista_web-2|arlista_web-3|arlista_nyomtatas_augusztus_web)/", "destination": "/preise/", "permanent": true },
    { "source": "/wp-content/uploads/:path*.pdf", "destination": "/preise/", "permanent": true },
    { "source": "/wp-content/uploads/:path*", "destination": "/galerie/", "permanent": true },
    { "source": "/author/:slug*", "destination": "/ueber-uns/", "permanent": true },
    { "source": "/en/uber-uns/", "destination": "/en/about/", "permanent": true },
    { "source": "/en/feed/", "destination": "/en/", "permanent": true },
    { "source": "/en/comments/feed/", "destination": "/en/", "permanent": true },
    { "source": "/en/wp-sitemap-users-1.xml", "destination": "/sitemap-index.xml", "permanent": true },
    { "source": "/feed/", "destination": "/", "permanent": true },
    { "source": "/comments/feed/", "destination": "/", "permanent": true },
    { "source": "/(wp-sitemap.xml|wp-sitemap-posts-page-1.xml|wp-sitemap-users-1.xml|sitemap.xml)", "destination": "/sitemap-index.xml", "permanent": true },
    { "source": "/(brossura1-2-masolat-uj|brossura2-1-masolat-uj|photo-2023-12-17-10-02-26|photo-2023-12-17-10-02-26-1|photo-2023-12-17-10-02-27|photo-2023-12-17-10-02-27-1|photo-2023-12-17-10-02-27-3|photo-2023-12-17-10-02-27-4|unnamed|unnamed-1|unnamed-1-2|unnamed-1-3|unnamed-2|unnamed-3|unnamed-5|1|2|2-2|3|4)/", "destination": "/galerie/", "permanent": true },
    { "source": "/(eee6aae9-d2fb-43e3-95a6-ab6716fdb0e1|898507f9-006f-4840-83f2-f7bf377c25ef|12e21b21-1c73-4f94-a465-712826bf3fb6|b0c3f0ce-609f-4cc7-82a3-6a09c9379680)/", "destination": "/galerie/", "permanent": true },
    { "source": "/:img(img_[0-9a-z_-]+)/", "destination": "/galerie/", "permanent": true },
    { "source": "/:vk(viber_kep_[0-9_-]+)/", "destination": "/galerie/", "permanent": true }
  ]
}
```
Hinweise:
- `trailingSlash`-Einstellung in Vercel **und** Astro (`trailingSlash: 'always'`) konsistent halten; Quellen ohne Slash leitet Vercel selbst auf den Slash um.
- Regex-Muster `img_…` und `viber_kep_…` decken alle 62 `img_*`- bzw. 7 `viber_kep_*`-Anhangseiten auf Root-Ebene ab; die übrigen 24 Root-Anhangseiten stehen explizit in den beiden Listen-Regeln davor (zusammen 93). Darauf achten, dass keine neue Seite mit `img_` beginnt.
- Nach Deploy alle Zeilen aus 7.1–7.3 per Skript prüfen (`curl -sI` → `308/301` + `location`). Hinweis: Vercel nutzt bei `permanent: true` den Statuscode **308**, den Google wie 301 behandelt.
- Für die Treatwell-Altverlinkung (`treatwellapp.page.link/Qg2Qj`) ist keine Weiterleitung nötig, sie ist extern. Dafür auf allen Profilen die Website-URL aktualisieren.

---

## Anhang A – Bild-Anhangseiten Root-Ebene (93, alle → `/galerie/`)

`/brossura1-2-masolat-uj/`, `/brossura2-1-masolat-uj/`, `/photo-2023-12-17-10-02-26-1/`, `/photo-2023-12-17-10-02-27/`, `/photo-2023-12-17-10-02-26/`, `/photo-2023-12-17-10-02-27-1/`, `/photo-2023-12-17-10-02-27-3/`, `/photo-2023-12-17-10-02-27-4/`, `/eee6aae9-d2fb-43e3-95a6-ab6716fdb0e1/`, `/898507f9-006f-4840-83f2-f7bf377c25ef/`, `/img_1778/`, `/img_2143/`, `/img_2074/`, `/img_2094/`, `/img_2327/`, `/img_4656/`, `/img_4362/`, `/img_4667/`, `/img_5120/`, `/img_5147/`, `/img_5117/`, `/img_5115/`, `/img_5145/`, `/12e21b21-1c73-4f94-a465-712826bf3fb6/`, `/unnamed-3/`, `/unnamed-2/`, `/img_9735/`, `/img_9046/`, `/img_9049/`, `/img_0154/`, `/unnamed/`, `/unnamed-1-3/`, `/unnamed-1-2/`, `/viber_kep_2023-12-09_20-04-39-929/`, `/viber_kep_2023-12-09_20-04-40-399/`, `/viber_kep_2023-12-09_20-06-19-347/`, `/viber_kep_2023-08-22_18-37-46-867/`, `/2-2/`, `/viber_kep_2023-12-09_20-04-37-277/`, `/unnamed-5/`, `/unnamed-1/`, `/viber_kep_2023-12-09_20-04-38-388/`, `/viber_kep_2023-12-09_20-04-38-994/`, `/2/`, `/4/`, `/3/`, `/1/`, `/img_3292/`, `/img_3284/`, `/img_3281-2/`, `/img_3262-2/`, `/img_3255/`, `/img_3234/`, `/img_3232/`, `/img_3229/`, `/img_3222/`, `/img_3220/`, `/img_6537-2/`, `/img_383edd8420f3-1/`, `/img_6544/`, `/img_6543-2/`, `/img_6541/`, `/img_6540/`, `/img_6539/`, `/img_6538/`, `/img_6537/`, `/img_6536/`, `/img_6535/`, `/img_6534/`, `/b0c3f0ce-609f-4cc7-82a3-6a09c9379680/`, `/img_6530/`, `/img_6529/`, `/img_6528/`, `/img_6527/`, `/img_6526/`, `/img_6525/`, `/img_6524/`, `/img_6523/`, `/img_6522/`, `/img_6521/`, `/img_6520/`, `/img_6519/`, `/img_6518/`, `/img_6512/`, `/img_6510/`, `/img_6509/`, `/img_6508/`, `/img_6507/`, `/img_6506/`, `/img_6505-2/`, `/img_6504/`, `/img_6503/`, `/img_3262/`

Anhangseiten unter `/hauptseite/` (22): `img_5139`, `kosmetik-2`, `bg_logo_w`, `bg_logo`, `csapat`, `img_3073-masolat`, `csoport`, `img_3073-2`, `img_3073`, `img_3076`, `kosmetik`, `nagelmodellage`, `pedikure`, `img_3281`, `img_3254`, `pedicurist-applying-transparent-varnish-to-the-female-toenails-in-a-beauty-salon`, `the-master-of-the-manicure-saws-and-attaches-a-nail-shape-during`, `manicure-process-female-hands-finger-nails-polish-2`, `manicure-process-female-hands-finger-nails-polish`, `perfection-team-1`, `working-places-masters-hairdressing-beauty-salon-modern-design-interior`, `closeup-shot-of-a-process-of-a-manicure-in-the-beauty-salon`.
Anhangseiten unter `/uber-uns/` (15): `viber_kep_2023-12-09_20-04-36-274-2`, `viber_kep_2023-12-09_20-04-37-089-2`, `viber_kep_2023-12-09_20-04-36-274`, `viber_kep_2023-12-09_20-04-37-089`, `viber_kep_2023-12-09_20-04-36-102`, `viber_kep_2023-12-09_20-04-36-838`, `viber_kep_2023-12-09_20-04-36-447`, `img_3154`, `img_6421`, `img_3105`, `img_3172`, `316501523_1570098593467028_2309235731731019545_n`, `img_3162-2`, `img_3162`, `img_3158`.
Quelle aller Anhänge: https://hellobeautysalon.at/wp-json/wp/v2/media?per_page=100&page=1 und `&page=2` (X-WP-Total: 154).

## Anhang B – Quellen (alle abgerufen 2026-10-13)

- Alte Website: https://hellobeautysalon.at/ · https://hellobeautysalon.at/uber-uns/ · https://hellobeautysalon.at/wp-sitemap.xml · https://hellobeautysalon.at/wp-json/wp/v2/pages · https://hellobeautysalon.at/wp-json/wp/v2/media · https://hellobeautysalon.at/wp-json/pll/v1/languages · https://hellobeautysalon.at/robots.txt
- Preisliste: https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf
- Treatwell-Profil: https://www.treatwell.at/salon/hello-beauty-salon/
- Facebook: https://www.facebook.com/hellobeautywien
- WKO Firmen-A–Z 1060: https://firmen.wko.at/fingernagelstudio/wien-6-bezirk-mariahilf/?ni=a
- Nominatim: https://nominatim.openstreetmap.org/search?q=Barnabitengasse+7,+1060+Wien&format=json&addressdetails=1
- OSM-Knoten: https://www.openstreetmap.org/node/5204041868 (API: https://api.openstreetmap.org/api/0.6/node/5204041868.json)
- Overpass API: https://overpass-api.de/api/interpreter (Stationen/Zugänge/Haltestellen im 1-km-Radius)
- Haus des Meeres Anfahrt (Buslinien): https://haus-des-meeres.at/en/zoo/map-and-directions · Wiener Linien 13A: https://www.wienerlinien.at/bf/lines/bus_a/13A__1.html
- Google Autocomplete: https://suggestqueries.google.com/complete/search?client=firefox&hl=de|en|hu&gl=at&q=…
- Treatwell-/Fresha-Listen: https://www.treatwell.at/orte/behandlung-gruppe-nagel/angebot-typ-lokal/in-wien-at/ · https://www.treatwell.at/orte/behandlung-gel-manikuere/angebot-typ-lokal/in-wien-at/seite-3 · https://www.fresha.com/lp/en/tt/gel-nails/in/at-wien
- Herold Nagelstudio Wien: https://www.herold.at/gelbe-seiten/wien/nagelstudio/seite/3/
- Wettbewerber: https://www.ursulabeauty.at/ · https://www.nu-nails.at/ · https://www.precious-ten.at/ · https://www.thenailart.at/ · https://www.naminails.at/
- 1000things: https://www.1000thingsmagazine.com/de/a/7854/nagelstudios-in-wien/
- Google AI-Features: https://developers.google.com/search/docs/appearance/ai-features (Stand 2025-12-10)
- Google Review-Snippet-Richtlinien: https://developers.google.com/search/docs/appearance/structured-data/review-snippet (Stand 2026-09-08)
- Google FAQ/HowTo 2023: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- FAQ-Rich-Results-Ende 2026: https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/ (10.05.2026)
- BrightLocal Local AI Visibility Study: https://www.brightlocal.com/research/local-ai-visibility-study/ (16.09.2026)
- SOCi/Sekundär: https://mshahid.com/blog/ai-local-visibility-report-2026 · https://www.soci.ai/blog/ai-for-local-seo-how-agents-improve-rankings-for-multi-location-brands/
- llms.txt: https://aisaasradar.com/article/llms-txt-adoption-data-2026 · https://www.1clickreport.com/blog/llms-txt-evidence-2026 · https://byfaro.ai/blog/ai-crawlers-ignore-llmstxt-97-of-the-time-so-stop-making-one · https://limy.ai/blog/llms-txt-in-2026-the-full-guide
- Schema.org NailSalon: https://schema.org/NailSalon
- Shellac/Gel-Haltbarkeit (Ratgeber): https://www.treatwell.ch/treatment-files?p=14568
