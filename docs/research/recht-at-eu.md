# Recht AT/EU – Compliance-Checkliste für die neue Website „Hello Beauty“

**Projekt:** statische Astro-Website (DE/EN/HU) für Hello Beauty / HelloBeauty Vienna, Barnabitengasse 7, 1060 Wien
**Rechtsträger (recherchiert, siehe `impressum-daten.md`):** ESZTER NAILS e.U., Inhaberin Eszter Szedlacsek, FN 475773t, HG Wien
**Rechtsstand:** Oktober 2026 · **Recherchedatum (Abrufdatum aller Quellen):** 2026-10-13
**Hinweis:** Das ist Compliance-Recherche, keine Rechtsberatung. Gilt österreichisches Recht und EU-Recht, **nicht** deutsches Recht. Punkte mit Restrisiko sind markiert und sollten vor dem Livegang von der Inhaberin bzw. einer Rechtsberatung (z. B. WKO Wien Rechtsservice) bestätigt werden.

Technischer Ausgangsstand der Website: keine Cookies, keine Requests an Dritte, Schriften lokal gehostet, Demo-Kontaktformular und Demo-Buchungsflow (beide senden nichts), `sessionStorage` nur für Sprachwahl und Buchungsentwurf, nur **Links** (keine Embeds) zu Instagram, Facebook, Google Maps und Apple Karten. Texte teils KI-unterstützt, Fotos vom bisherigen Webauftritt übernommen.

Legende Status: **P** = Pflicht · **E** = empfohlen · **N** = nicht relevant (derzeit) · **P*** = Pflicht erst, wenn Buchung oder Zahlung live geht

---

## 0. Schnellübersicht

| # | Thema | Status | Umsetzung in einem Satz |
|---|---|---|---|
| 1 | Impressum § 5 ECG | **P** | Seite `/impressum` (DE/EN/HU), von jeder Seite im Footer mit max. 2 Klicks erreichbar |
| 2 | § 14 UGB (Firmenbuch) | **P** | e.U. ist eingetragen: Firma, Rechtsform, Sitz, FN, Firmenbuchgericht angeben |
| 3 | § 63 GewO | **P** | Firmenwortlaut und Gewerbestandort angeben; „Hello Beauty“ nur als Geschäftsbezeichnung *neben* der Firma |
| 4 | Offenlegung § 25 MedienG (kleine Website, Abs 5) | **P** | Im Impressum: Name/Firma, Unternehmensgegenstand, Sitz |
| 5 | Gewerbe, Behörde, Kammer, Berufsrecht | **P** | Drei Gewerbe, MBA 6/7, WKO Wien LI Fußpfleger/Kosmetiker/Masseure, Link GewO (RIS) |
| 6 | UID | **P** | ATU78223478 (VIES-geprüft am 2026-10-13) |
| 7 | ODR-Link (OS-Plattform) | **N**, Link **entfernen** | Plattform seit 20.07.2025 abgeschaltet; keinen Link setzen |
| 8 | Datenschutzerklärung DSGVO/DSG | **P** | Seite `/datenschutz` mit den Bausteinen aus Abschnitt 2 |
| 9 | Cookie-Banner (§ 165 Abs 3 TKG 2021) | **N** | sessionStorage ist unbedingt erforderlich bzw. vom Nutzer gewünscht: kein Banner, aber Hinweis in der Datenschutzerklärung |
| 10 | Barrierefreiheit (BaFG/EAA) | **E** jetzt, möglicherweise **P*** | WCAG 2.2 AA umsetzen; ob die Kleinstunternehmen-Ausnahme greift, ist offen (Treatwell nennt 13 Teammitglieder) |
| 11 | Preisauszeichnung (PrAG) | **P** | Endpreise in Euro inkl. USt; Formulierung je nach USt-Status |
| 12 | FAGG (Online-Buchung/Zahlung) | **P*** | Informationen nach § 4, Rücktrittsbelehrung, „Zahlungspflichtig buchen“-Button, Zustimmung zum vorzeitigen Beginn |
| 13 | Storno/No-Show | **E** | Faire, transparente Stornoregel vor Vertragsschluss anzeigen; § 1168 ABGB als Basis |
| 14 | AI Act Art 50 | **N** (Werbetexte) | keine Kennzeichnungspflicht; menschliche Endredaktion dokumentieren |
| 15 | Urheberrecht/Bildnisschutz | **P** | Rechte an Fotos und Einwilligungen abgebildeter Personen schriftlich bestätigen lassen |
| 16 | Social-/Karten-Links, Fonts, E-Mail | **E** | nur Links, `rel="noopener noreferrer"`, Fonts lokal lassen, E-Mail mailto ohne Drittdienst |

---

## 1. Impressum / Offenlegung (Österreich)

### 1.1 § 5 ECG – Allgemeine Informationspflichten — **Pflicht**

Die Website ist ein „Dienst der Informationsgesellschaft“, weil sie Werbung für ein Unternehmen macht. Darum gilt § 5 Abs 1 ECG. Die Angaben müssen leicht und unmittelbar erreichbar sein und ständig verfügbar bleiben.

| Ziffer § 5 Abs 1 ECG | Inhalt | Für Hello Beauty | Status |
|---|---|---|---|
| Z 1 | Name oder Firma | ESZTER NAILS e.U. (Geschäftsbezeichnung „Hello Beauty“) | P |
| Z 2 | geografische Anschrift der Niederlassung | Barnabitengasse 7, 1060 Wien, Österreich | P |
| Z 3 | Kontaktangaben für rasche, unmittelbare Kommunikation, inkl. E-Mail | Telefon +43 660 7055 631, info@hellobeautysalon.at | P |
| Z 4 | Firmenbuchnummer und Firmenbuchgericht | FN 475773t, Handelsgericht Wien | P |
| Z 5 | zuständige Aufsichtsbehörde, wenn die Tätigkeit behördlicher Aufsicht unterliegt | Magistratisches Bezirksamt für den 6./7. Bezirk (Gewerbebehörde) | P (Gewerbe) |
| Z 6 | Kammer, Berufsverband o. Ä., Berufsbezeichnung, Mitgliedstaat der Verleihung, Hinweis auf berufsrechtliche Vorschriften samt Zugang | WKO Wien, Landesinnung Fußpfleger, Kosmetiker und Masseure; Berufsbezeichnungen siehe 1.4; Österreich; GewO 1994 mit Link zum RIS | P |
| Z 7 | UID-Nummer, falls vorhanden | ATU78223478 | P |

**Umsetzung:**
- Eigene Seite `/impressum` in allen drei Sprachen, dazu ein Footer-Link „Impressum“ / „Imprint“ / „Impresszum“ auf jeder Seite.
- Als HTML-Text, nicht als Bild, damit Screenreader und Suchmaschinen ihn lesen können.
- Die E-Mail-Adresse als echter `mailto:`-Link. § 5 ECG verlangt eine erreichbare E-Mail-Adresse, deshalb keine Verschleierung, die die Nutzung erschwert (siehe 9.4).

Quellen:
- § 5 ECG (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20001703&Paragraf=5 (abgerufen 2026-10-13)
- WKO Wien, Das korrekte Website-Impressum (e.U.): https://www.wko.at/wien/wirtschaftsrecht-gewerberecht/das-korrekte-website-impressum-eu.pdf (abgerufen 2026-10-13)
- WKO, Impressum und Offenlegung: https://www.wko.at/information-consulting/werbung-marktkommunikation/impressum-und-offenlegung (abgerufen 2026-10-13)

### 1.2 § 14 UGB – Angaben eingetragener Unternehmer — **Pflicht**

ESZTER NAILS e.U. ist im Firmenbuch eingetragen (FN 475773t, Quelle: WKO Firmen A–Z, siehe `impressum-daten.md`). Damit gilt § 14 UGB über § 63 Abs 3 GewO auch für die Website. Anzugeben sind:
- Firma: **ESZTER NAILS e.U.**
- Rechtsform: eingetragenes Einzelunternehmen (e.U.)
- Sitz: Wien
- Firmenbuchnummer: FN 475773t
- Firmenbuchgericht: Handelsgericht Wien

Die Website tritt nach außen als „Hello Beauty“ auf. Das ist als **Geschäftsbezeichnung** zulässig, wenn sie nicht irreführt **und** die Firma daneben im Impressum steht (§ 63 Abs 1 und 3 GewO).

Quellen:
- § 63 GewO (Jusline, Stand der Gesetzgebung 13.10.2026): https://www.jusline.at/gesetz/gewo/paragraf/63 (abgerufen 2026-10-13)
- § 14 UGB (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001702&Paragraf=14 (abgerufen 2026-10-13)

### 1.3 § 63 GewO — **Pflicht**

- Abs 1 verlangt auf einer Website neben dem Namen auch den **Standort der Gewerbeberechtigung**: Barnabitengasse 7, 1060 Wien.
- Abs 3: Für Unternehmer, die im Firmenbuch eingetragen sind, gelten §§ 14 und 17–37 UGB.
- Eine Bezeichnung wie „Hello Beauty“ darf über die geschäftlichen Verhältnisse nicht irreführen.

Quelle: https://www.jusline.at/gesetz/gewo/paragraf/63 (abgerufen 2026-10-13)

### 1.4 Gewerbe, Gewerbebehörde, Kammer, Berufsrecht — **Pflicht** (§ 5 Abs 1 Z 5 und 6 ECG)

**Allgemeine Rechtslage zu den einschlägigen Gewerben:**

| Gewerbe | Art | Rechtsgrundlage |
|---|---|---|
| Kosmetik (Schönheitspflege) | reglementiert | § 94 Z 42 GewO 1994 |
| Fußpflege | reglementiert | § 94 Z 23 GewO 1994 |
| Massage | reglementiert (nur relevant, falls Massagen angeboten werden) | § 94 Z 48 GewO 1994 |
| Modellieren von Fingernägeln (Nagelstudio) | freies Gewerbe seit der GewO-Novelle 2017, kein Befähigungsnachweis | – |

Ein Hinweis zum Nagelstudio: Wer das Kosmetikgewerbe ausübt, darf nach § 162 GewO auch Fingernägel modellieren, ohne das freie Gewerbe eigens anzumelden. Das sagt die WKO Wien.

**Für ESZTER NAILS e.U. belegt** (WKO Firmen A–Z, abgerufen 2026-10-13):

| Gewerbe (Wortlaut) | GISA-Zahl | seit | gewerberechtliche Geschäftsführung |
|---|---|---|---|
| Fußpflege | 35151562 | 18.08.2022 | Marianna Kovacs |
| Kosmetik (Schönheitspflege), ausgenommen Piercen und Tätowieren | 35151609 | 18.08.2022 | Marianna Kovacs |
| Modellieren von Fingernägeln (Nagelstudio) | 29852499 | 01.08.2017 | – |

- **Gewerbebehörde laut WKO:** „Magistratisches Bezirksamt des VI. Bezirkes“. In Wien ist das Magistratische Bezirksamt für den 6. und 7. Bezirk zuständig. Den genauen Behördennamen sollte die Inhaberin am Gewerbeschein bzw. im GISA-Auszug bestätigen: [PLATZHALTER: exakte Behördenbezeichnung laut GISA-Auszug].
- **Kammer:** Wirtschaftskammer Wien, Sparte Gewerbe und Handwerk, Landesinnung Wien der Fußpfleger, Kosmetiker und Masseure.
- **Berufsrecht:** Gewerbeordnung 1994, Link: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10007517 (RIS, GewO 1994, verifiziert 2026-10-13). Dazu die Ausübungsregeln-Verordnung für Kosmetik, Fußpflege und Massage (BGBl. II Nr. 262/2008 laut WKO Tirol) [PLATZHALTER: aktuelle Fundstelle der Ausübungsregeln im RIS verifizieren]
- **GISA-Abfrage:** Eine öffentliche Einzelabfrage gibt es unter https://www.gisa.gv.at/abfrage. Sie wurde nicht ausgeführt, weil keine Webformulare abgesendet werden sollten. Die GISA-Zahlen stammen aus WKO Firmen A–Z. Optional können sie im Impressum stehen, Pflicht ist das nicht.

**Prüfhinweis zum Leistungsangebot** (empfohlen, kein Website-Pflichtpunkt): Treatwell nennt auch „Laser“ und Reviews nennen „Microneedling“. Ob und wie weit das von der Kosmetik-Berechtigung gedeckt ist, muss die Inhaberin bzw. die Innung klären, bevor diese Leistungen auf der Website beworben werden. Sonst droht irreführende Werbung oder ein Konflikt mit ärztlichen Vorbehaltstätigkeiten. [PLATZHALTER: Leistungsliste mit Inhaberin abstimmen]

Quellen:
- § 94 GewO (Jusline): https://www.jusline.at/gesetz/gewo/paragraf/94 (abgerufen 2026-10-13)
- WKO Wien, Modellieren von Fingernägeln im Kosmetikgewerbe: https://www.wko.at/wien/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/modellieren-von-fingernaegeln-im-kosmetikgewerbe (abgerufen 2026-10-13)
- WKO Tirol, Gewerbeinformation Nagelstudio (Ausübungsregeln BGBl. II 262/2008): https://www.wko.at/tirol/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/gewerbeinformation-modellieren-von-fingernaegeln-stand-mai20.pdf (abgerufen 2026-10-13)
- WKO Firmen A–Z, ESZTER NAILS e.U.: https://firmen.wko.at/eszter-nails-eu/wien/?firmaid=f952ce9d-4504-451b-b644-01cc9f77865e (abgerufen 2026-10-13)

### 1.5 Offenlegung § 25 MedienG — **Pflicht** (vereinfachte Form)

Eine Website ist ein „periodisches elektronisches Medium“ (§ 1 Abs 1 Z 5a MedienG). Eine Unternehmenswebsite **ohne meinungsbildenden Informationsgehalt** (sogenannte „kleine Website“) fällt unter **§ 25 Abs 5 MedienG**. Dann genügen:
- Name oder Firma: ESZTER NAILS e.U.
- gegebenenfalls Unternehmensgegenstand: Kosmetik, Fußpflege, Nagelstudio
- Wohnort oder Sitz: Wien

Abs 3 (Angaben zu Eigentumsverhältnissen bei Beteiligungen) und Abs 4 (Blattlinie) gelten nicht.

**Umsetzung:** Im Impressum ein Abschnitt „Offenlegung gemäß § 25 MedienG“ mit den drei Angaben. **Folge für die Inhalte:** Wird später ein Blog mit meinungsbildenden Inhalten ergänzt (z. B. Kommentare zu Gesundheits- oder Gesellschaftsthemen), ist die volle Offenlegung zu prüfen. Reine Pflegetipps und Angebote bleiben „klein“.

Quellen:
- § 25 MedienG (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10000719&Paragraf=25 (abgerufen 2026-10-13)
- WKO, Impressum und Offenlegung (kleine/große Website): https://www.wko.at/information-consulting/werbung-marktkommunikation/impressum-und-offenlegung (abgerufen 2026-10-13)

### 1.6 UID — **Pflicht, weil vorhanden**

**ATU78223478.** Die EU-VIES-Abfrage am 2026-10-13 ergab „gültig“, Name „Szedlacsek Eszter“, Adresse Barnabitengasse 7, AT-1060 Wien.
Quelle: https://ec.europa.eu/taxation_customs/vies/rest-api/ms/AT/vat/U78223478 (abgerufen 2026-10-13)

### 1.7 ODR-Hinweis / OS-Plattform — **nicht relevant, Link entfernen**

Die Verordnung (EU) 2024/3228 hat die ODR-Verordnung (EU) 524/2013 mit Wirkung zum **20.07.2025** aufgehoben. Die OS-Plattform der EU-Kommission wurde eingestellt. Damit ist die Pflicht zum Link auf die Plattform (Art 14 ODR-VO) weggefallen. Die WKO empfiehlt, den Hinweis aus Impressum und AGB zu entfernen und stattdessen eine E-Mail-Adresse für Beschwerden anzugeben. Bleibt ein Streit ungelöst, ist die Kundin über die zuständige AS-Stelle zu informieren und darüber, ob das Unternehmen teilnimmt (AStG). Ein Verweis auf eine nicht mehr existierende Plattform kann irreführend sein.

**Umsetzung:**
- Auf der neuen Website **keinen** OS-/ODR-Link setzen.
- Hinweis an die Inhaberin: Ihr Treatwell-Microsite-Impressum (eszter-nails.mytreatwell.at/impressum.html) verweist am 2026-10-13 noch auf die EU-OS-Plattform. Das sollte sie bei Treatwell korrigieren lassen.
- Optional (E): ein Hinweis auf die Verbraucherschlichtungsstellen nach AStG, z. B. die Schlichtung für Verbrauchergeschäfte (https://www.verbraucherschlichtung.at). Pflicht ist das nur, wenn sich das Unternehmen zur Teilnahme verpflichtet hat (§ 19 AStG): [PLATZHALTER: Teilnahme an Schlichtung ja/nein].

Quellen:
- WKO OÖ, Änderungen im Impressum notwendig: https://www.wko.at/ooe/aenderungen-im-impressum-notwendig (abgerufen 2026-10-13)
- WKO, Alternative Streitbeilegung für Websites und Webshops: https://www.wko.at/internetrecht/alternative-streitbeilegung (abgerufen 2026-10-13)
- Taylor Wessing, Abolition of the ODR platform: https://www.taylorwessing.com/de/insights-and-events/insights/2025/01/abolition-of-the-odr-platform (abgerufen 2026-10-13)
- VO (EU) 2024/3228 (EUR-Lex): https://eur-lex.europa.eu/eli/reg/2024/3228/oj (abgerufen 2026-10-13)

---

## 2. Datenschutz – DSGVO und österreichisches DSG — **Pflicht**

Rechtsgrundlagen: DSGVO (VO (EU) 2016/679) und das österreichische Datenschutzgesetz (DSG).
- DSGVO (EUR-Lex): https://eur-lex.europa.eu/eli/reg/2016/679/oj
- DSG (RIS): https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597

Die Datenschutzerklärung nach Art 13 DSGVO ist eine eigene Seite `/datenschutz` (DE/EN/HU), im Footer verlinkt und zusätzlich direkt beim Kontaktformular und im Buchungsflow.

### 2.1 Bausteine der Datenschutzerklärung (genau für diese Website)

| Baustein | Status | Inhalt / Umsetzung |
|---|---|---|
| Verantwortliche (Art 13 Abs 1 lit a) | P | ESZTER NAILS e.U., Inhaberin Eszter Szedlacsek, Barnabitengasse 7, 1060 Wien, info@hellobeautysalon.at, +43 660 7055 631 |
| Datenschutzbeauftragte:r | N | Für einen Kosmetiksalon nicht vorgeschrieben (Art 37 DSGVO: keine umfangreiche Kerntätigkeit mit Art-9-Daten). Satz: „Ein Datenschutzbeauftragter ist nicht bestellt.“ |
| Hosting und Server-Logfiles | P | Hoster [PLATZHALTER: Hoster, Sitz, Serverstandort EU?]. Daten: IP-Adresse, Zeitpunkt, URL, User-Agent, Referrer. Zweck: Betrieb und Sicherheit. Rechtsgrundlage Art 6 Abs 1 lit f. Speicherdauer [PLATZHALTER: Log-Aufbewahrung laut Hoster, z. B. 7–14 Tage]. Auftragsverarbeitungsvertrag (Art 28) mit dem Hoster abschließen. |
| Kontakt per Telefon/E-Mail | P | Zweck: Bearbeitung der Anfrage. Rechtsgrundlage Art 6 Abs 1 lit b (vorvertraglich) bzw. lit f. Speicherdauer: bis zur Erledigung, danach Löschung, soweit keine Aufbewahrungspflicht besteht. |
| Kontakt per WhatsApp | E/P | Nur aufnehmen, wenn der Salon WhatsApp tatsächlich anbietet: [PLATZHALTER: WhatsApp-Nummer ja/nein]. Auf der aktuellen Website ist WhatsApp nicht genannt. Falls ja: nur als **Link** (`https://wa.me/…`) ohne Widget. Hinweis, dass WhatsApp/Meta eigene Verantwortliche sind und Daten in Drittländer gehen können. |
| Kontaktformular | P (sobald live) / derzeit Demo | Solange es nichts sendet, mit einem Hinweis „Demo – es werden keine Daten übertragen“ oder ganz ausblenden. Live: Pflichtfelder auf ein Minimum beschränken (Name, E-Mail oder Telefon, Nachricht). Rechtsgrundlage Art 6 Abs 1 lit b/f. Datenschutzhinweis direkt am Formular. Kein Einwilligungs-Häkchen als Rechtsgrundlage nötig. |
| Online-Terminbuchung | P* | Rechtsgrundlage Art 6 Abs 1 lit b (Vertrag bzw. vorvertragliche Maßnahme). Empfänger: CRM- bzw. Buchungsanbieter als Auftragsverarbeiter [PLATZHALTER: CRM-Anbieter, Sitz, AVV, Drittlandtransfer?]. Erinnerungs-SMS/E-Mails: lit b. Marketing-Newsletter nur mit gesonderter Einwilligung (lit a, § 174 TKG 2021). Speicherdauer: Kundendaten bis 3 Jahre nach dem letzten Termin (Verjährung § 1486 ABGB), Rechnungen 7 Jahre (§ 132 BAO). |
| Online-Zahlung (später) | P* | Payment-Provider als eigener Verantwortlicher oder Auftragsverarbeiter benennen [PLATZHALTER: Anbieter]. Rechtsgrundlage lit b und lit c (BAO). |
| sessionStorage | P (Information) | Speichert Sprachwahl und Buchungsentwurf nur im Browser für die Dauer der Sitzung, wird beim Schließen des Tabs gelöscht und nicht an den Server übertragen. Rechtsgrundlage § 165 Abs 3 TKG 2021 (unbedingt erforderlich bzw. ausdrücklich gewünscht) bzw. Art 6 Abs 1 lit f. Siehe Abschnitt 3. |
| Keine Cookies, kein Tracking, keine Analyse | P (Transparenz) | Ausdrücklich erwähnen: keine Cookies, kein Webanalyse-Tool, keine Einbindung von Drittanbietern; Schriften werden lokal ausgeliefert. |
| Externe Links | E | Instagram, Facebook, Google Maps und Apple Karten sind nur verlinkt. Daten fließen erst beim Anklicken, dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters. |
| Betroffenenrechte | P | Auskunft (Art 15), Berichtigung (16), Löschung (17), Einschränkung (18), Datenübertragbarkeit (20), Widerspruch (21), Widerruf einer Einwilligung (Art 7 Abs 3). Kontakt: info@hellobeautysalon.at |
| Beschwerderecht | P | **Österreichische Datenschutzbehörde**, Barichgasse 40-42, 1030 Wien, Telefon +43 1 52 152-0, dsb@dsb.gv.at, https://www.dsb.gv.at |
| Pflicht zur Bereitstellung / automatisierte Entscheidungen | P | Ohne Kontaktdaten keine Buchung möglich. Keine automatisierte Entscheidungsfindung und kein Profiling (Art 22). |
| Datensicherheit | E | HTTPS/TLS, Security-Header, keine Speicherung im Frontend außer sessionStorage. |

Quelle DSB-Kontakt: https://www.dsb.gv.at/ (abgerufen 2026-10-13)

### 2.2 Gesundheitsdaten (Art 9 DSGVO) im Buchungs-Notizfeld — **Empfehlung mit hoher Priorität**

Angaben wie „Allergie gegen Acrylat/Latex“, „Diabetes“ oder „Nagelpilz“ sind **Gesundheitsdaten** (Art 4 Z 15, Art 9 Abs 1 DSGVO). Sie dürfen grundsätzlich nur mit **ausdrücklicher Einwilligung** (Art 9 Abs 2 lit a) verarbeitet werden. Ein freies Notizfeld lädt dazu ein, solche Daten einzugeben.

Empfehlung:
1. Das Notizfeld im Buchungsflow so beschriften: „Wünsche zum Termin (bitte **keine** Gesundheitsangaben – diese besprechen wir vor Ort)“.
2. Allergie- und Gesundheitsabfragen nicht online, sondern vor Ort über einen Anamnesebogen mit gesonderter, ausdrücklicher Einwilligung erledigen.
3. Wenn ein Online-Feld doch nötig ist: ein eigenes, optionales Feld mit einer eigenen, nicht vorausgewählten Checkbox für die ausdrückliche Einwilligung nach Art 9 Abs 2 lit a. Dazu ein Widerrufshinweis, Verschlüsselung im CRM, ein Zugriffskonzept und ein Eintrag im Verarbeitungsverzeichnis (Art 30).
4. In der Demo-Phase wird nichts gesendet. Der Entwurf liegt nur im sessionStorage. Trotzdem schon jetzt den Feldhinweis setzen.

---

## 3. TKG 2021 § 165 Abs 3 – Endgeräte-Zugriff / Cookie-Banner — **kein Banner nötig**

**Rechtslage:** Nach § 165 Abs 3 TKG 2021 ist eine Einwilligung des Nutzers erforderlich. Das steht einer technischen Speicherung oder einem Zugriff aber nicht entgegen, „wenn dies unbedingt erforderlich ist, damit der Anbieter eines Dienstes der Informationsgesellschaft, der vom Nutzer oder Benutzer ausdrücklich gewünscht wurde, diesen Dienst zur Verfügung stellen kann“. Die Bestimmung ist technologieneutral und gilt daher auch für `sessionStorage` und `localStorage`, nicht nur für Cookies.

**Einschätzung:**
- **Sprachwahl im sessionStorage:** Die Nutzerin wählt die Sprache aktiv. Dass die Wahl über Seitenwechsel hinweg erhalten bleibt, ist die Funktion, die sie ausdrücklich angefordert hat. Die Speicherung ist sitzungsbezogen, bleibt lokal, enthält keine Kennung, wird nicht übertragen und dient weder Tracking noch Analyse. Die EU-Datenschutzbehörden ordnen „User-Interface-Customization“-Cookies für Sitzungsdauer als ausgenommen ein (Art.-29-Gruppe WP 194, Kriterium „user-input“ und „UI customization“). Ergebnis: **unbedingt erforderlich, keine Einwilligung nötig.**
- **Buchungsentwurf im sessionStorage:** Er speichert die Eingaben, die die Nutzerin im Buchungsflow selbst macht. Das ist ein klassischer „user-input“-Fall, ebenfalls ausgenommen.
- Es werden keine Cookies gesetzt und keine Dritt-Requests ausgelöst.

**Ergebnis:** **Kein Cookie- oder Consent-Banner erforderlich.** Ein Banner ohne Notwendigkeit wäre sogar irreführend und schlechtere UX. **Pflicht** bleibt die **Information** in der Datenschutzerklärung (welcher Speicher, Zweck, Dauer).

**Achtung bei späteren Änderungen:** Das Ergebnis ändert sich, sobald eingesetzt werden: Analyse-Tools (auch „cookielose“, die Fingerprinting nutzen), Embeds (Google Maps iframe, Instagram-Feed, YouTube), ein externes Buchungs-Widget mit eigenen Cookies, Chat-Widgets oder Payment-Skripte von Drittanbietern. Dann neu bewerten.

Quellen:
- § 165 TKG 2021 (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20011678&Paragraf=165 (abgerufen 2026-10-13)
- Art.-29-Datenschutzgruppe, WP 194 „Cookie Consent Exemption“ (2012): https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2012/wp194_en.pdf (abgerufen 2026-10-13)
- EDPB Guidelines 2/2023 zum technischen Anwendungsbereich von Art 5 Abs 3 ePrivacy-RL (erfasst auch Web Storage): https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2023/guidelines-22023-technical-scope-art-53-eprivacy_en (abgerufen 2026-10-13)

---

## 4. Barrierefreiheit – BaFG (seit 28.06.2025) und European Accessibility Act — **empfohlen; bei Online-Buchung möglicherweise Pflicht**

**Anwendungsbereich:** Das BaFG setzt die RL (EU) 2019/882 um. Es erfasst unter anderem **„Dienstleistungen im elektronischen Geschäftsverkehr“**, also Dienstleistungen, die über eine Website auf individuellen Abruf eines Verbrauchers erbracht werden, **um einen Verbrauchervertrag abzuschließen**. Die WKO nennt als Beispiel ausdrücklich Betriebe mit **Online-Terminbuchung über die eigene Website**.

- **Derzeit (Demo-Buchung, kein Vertragsschluss):** Das BaFG greift nicht, weil online kein Vertrag geschlossen wird. Status: **E**.
- **Sobald die Buchung oder Zahlung live geht:** Grundsätzlich im Anwendungsbereich.

**Ausnahme für Kleinstunternehmen (Dienstleister):** Ausgenommen sind Unternehmen mit **weniger als 10 Beschäftigten** **und** einem Jahresumsatz von **höchstens 2 Mio. €** oder einer Jahresbilanzsumme von höchstens 2 Mio. €. Die WKO nennt als Beispiel einen Fußpflegebetrieb mit 3 Beschäftigten und 800.000 € Umsatz: Er fällt nicht unter das BaFG.

**Achtung, offen:** Treatwell listet am 2026-10-13 **13 Teammitglieder** für Hello Beauty. Ob das ≥ 10 „Beschäftigte“ sind (Jahresarbeitseinheiten, Teilzeit anteilig, Selbstständige bzw. Mietplatz-Nutzerinnen zählen eventuell nicht), ist unbekannt. Ist die Grenze erreicht, gilt das BaFG für den Buchungsflow verbindlich. Das bedeutet: Anforderungen nach Anhang I der RL bzw. harmonisierter Norm EN 301 549 (≈ WCAG 2.1 AA), eine Barrierefreiheitsinformation in den AGB bzw. auf der Website und Marktüberwachung durch das Sozialministeriumservice. Laut WKO-FAQ verlangt das Sozialministeriumservice auch die Barrierefreiheit **externer Buchungstools**.
[PLATZHALTER: Anzahl Beschäftigte (Jahresdurchschnitt, VZÄ) und Jahresumsatz der ESZTER NAILS e.U. – von Inhaberin bestätigen]

**Empfehlung unabhängig vom Ergebnis:**
- Die gesamte Website nach **WCAG 2.2 AA** bauen. Das umfasst: Kontraste von mindestens 4.5:1 für Text, vollständige Tastaturbedienbarkeit des Buchungsflows, sichtbarer Fokus, Fokus-Ziele nicht verdeckt (2.4.11), Zielgrößen von mindestens 24×24 px (2.5.8), keine reinen Drag-Interaktionen (2.5.7), Fehlermeldungen als Text mit `aria-live`, Labels an allen Feldern, `lang`-Attribut je Sprache (de/en/hu), Alternativtexte, kein Zeitlimit im Buchungsflow oder ein verlängerbares, reduzierte Bewegung (`prefers-reduced-motion`), konsistente Hilfe (3.2.6), keine redundante Eingabe (3.3.7) und barrierefreie Authentifizierung (3.3.8, falls je ein Login kommt).
- Beim CRM- oder Buchungsanbieter vor Vertragsschluss eine Konformitätsaussage (Accessibility Conformance Report/VPAT) verlangen.
- **Barrierefreiheitserklärung (freiwillig, empfohlen):** Seite `/barrierefreiheit` mit folgendem Inhalt: angestrebter Standard (WCAG 2.2 AA bzw. EN 301 549), Stand der Vereinbarkeit (vollständig oder teilweise), bekannte Einschränkungen samt Alternativen (z. B. telefonische Buchung), Datum der Erstellung und letzten Prüfung, Prüfmethode (Selbstbewertung oder externe Prüfung), Feedback-Kontakt (E-Mail/Telefon) mit Antwortfrist und Hinweis auf die Beschwerdemöglichkeit beim Sozialministeriumservice (falls das BaFG anwendbar ist). Falls das BaFG anwendbar ist, nach Anhang V BaFG/RL zusätzlich beschreiben, wie die Dienstleistung die Barrierefreiheitsanforderungen erfüllt.

Quellen:
- WKO, Informationen zum Barrierefreiheitsgesetz: https://www.wko.at/ce-kennzeichnung-normen/informationen-zum-barrierefreiheitsgesetz (abgerufen 2026-10-13)
- WKO, FAQ Barrierefreiheitsgesetz im E-Commerce: https://www.wko.at/internetrecht/barrierefreiheitsgesetz-im-e-commerce-faq (abgerufen 2026-10-13)
- WKO, FAQs Webinar BaFG: https://www.wko.at/ce-kennzeichnung-normen/faqs-webinar-barrierefreiheitsgesetz (abgerufen 2026-10-13)
- Sozialministerium, Barrierefreiheitsgesetz: https://www.sozialministerium.gv.at/Themen/Soziales/Menschen-mit-Behinderungen/Barrierefreiheitsgesetz.html (abgerufen 2026-10-13)
- BaFG (Jusline): https://www.jusline.at/gesetz/bafg (abgerufen 2026-10-13)
- WCAG 2.2: https://www.w3.org/TR/WCAG22/ (abgerufen 2026-10-13)

---

## 5. Preisauszeichnung (PrAG) und Umsatzsteuer — **Pflicht**

- **§ 9 PrAG:** Wer Dienstleistungen in Werbung oder im Fernabsatz mit Preisen anbietet, muss **Bruttopreise** (Endpreise inkl. USt und sonstiger Abgaben) angeben. Ab-Preise sind zulässig, wenn der Endpreis vom Umfang abhängt („ab 45 €“), sollten aber nachvollziehbar sein (z. B. „je nach Nagellänge“).
- **Kleinunternehmerregelung:** § 6 Abs 1 Z 27 UStG, seit 2025 eine Grenze von **55.000 € brutto** Jahresumsatz (laut WKO und USP). Kleinunternehmer dürfen keine USt ausweisen.
- **USt-Status der ESZTER NAILS e.U.:** **nicht belegt.** Eine gültige UID allein beweist keine Regelbesteuerung, denn auch Kleinunternehmer können eine UID haben. Bei 13 gelisteten Teammitgliedern und über 2.800 Treatwell-Bewertungen ist eine Regelbesteuerung (20 % USt) wahrscheinlich, aber nicht belegt. [PLATZHALTER: USt-Status – Regelbesteuerung 20 % oder Kleinunternehmerin – von Inhaberin/Steuerberatung bestätigen]

**Empfohlene Formulierung:**
- Bei Regelbesteuerung (wahrscheinlich): **„Alle Preise in Euro inkl. 20 % USt.“** Das ist präzise und unmissverständlich.
- Bei Kleinunternehmerin: **„Alle Preise in Euro. Gemäß § 6 Abs 1 Z 27 UStG wird keine Umsatzsteuer berechnet.“**
- **Nicht empfohlen:** „inkl. allfälliger USt.“ Die Formulierung ist zwar gängig, verschleiert aber den Status. Für Endkunden ist sie nur akzeptabel, wenn der angegebene Preis in jedem Fall der Endpreis ist. Als Notlösung zu verwenden, solange der Status nicht bestätigt ist.
- Ergänzend: „Preise gültig ab [PLATZHALTER: Datum]. Änderungen und Irrtümer vorbehalten.“ Kein Ersatz für korrekte Preise, aber üblich. Die Preisliste der Website mit der Preisliste im Salon und auf Treatwell abgleichen.
- Die Preise als **Text** veröffentlichen, nicht nur als Bild oder PDF (Barrierefreiheit). Die bisherige Preisliste ist ein PDF mit eingebettetem Bild: https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf

Quellen:
- § 9 PrAG (Jusline): https://www.jusline.at/gesetz/prag/paragraf/9 (abgerufen 2026-10-13)
- USP, Kleinunternehmen (Regelung seit 1. Jänner 2025): https://www.usp.gv.at/themen/steuern-finanzen/umsatzsteuer-ueberblick/weitere-informationen-zur-umsatzsteuer/weitere-steuertatbestaende-und-befreiungen/kleinunternehmen.html (abgerufen 2026-10-13)
- WKO Vorarlberg, Kleinunternehmerregelung (55.000 € brutto): https://www.wko.at/vlbg/steuern/kleinunternehmerregelung-in-oesterreich-und-der-eu (abgerufen 2026-10-13)

---

## 6. Fernabsatz- und Verbraucherrecht bei Online-Terminbuchung und Online-Zahlung — **Pflicht, sobald live (P*)**

### 6.1 Ist eine Online-Buchung ein Vertrag?

- Eine verbindliche Buchung eines konkreten Termins für eine konkrete Leistung zu einem angegebenen Preis ist ein **Werkvertrag bzw. Dienstleistungsvertrag**. Er entsteht auch **ohne Vorauszahlung**, nämlich mit Angebot und Annahme, z. B. durch eine Buchungsbestätigung. Er ist ein **Fernabsatzvertrag** im Sinn von § 3 Z 2 FAGG, weil er ausschließlich über Fernkommunikationsmittel im Rahmen eines organisierten Fernabsatzsystems geschlossen wird.
- **Unverbindliche Terminanfrage** (der Salon bestätigt erst manuell, und die Kundin kann ohne Folgen absagen): Laut WKO gelten die FAGG-Bestimmungen für **unverbindliche Reservierungen** nicht.
- **Konsequenz für das Design:** Entweder (a) „Terminanfrage, unverbindlich, kostenlos stornierbar“ ohne Stornogebühren. Dann gibt es nur minimale FAGG-Pflichten. Oder (b) eine verbindliche Buchung mit Stornogebühren oder Online-Zahlung. Dann gelten alle Pflichten aus 6.2–6.5.

Quelle: WKO, Rücktrittsrecht bei Dienstleistungen im Internet: https://www.wko.at/internetrecht/ruecktrittsrecht-bei-dienstleistungen-im-internet (abgerufen 2026-10-13)

### 6.2 Rücktrittsrecht – Ausnahme § 18 Abs 1 Z 10 FAGG greift **eher nicht**

- § 18 Abs 1 Z 10 FAGG nimmt Dienstleistungen „im Zusammenhang mit **Freizeitbetätigungen**“ vom Rücktrittsrecht aus, wenn ein spezifischer Termin oder Zeitraum vorgesehen ist (Erwägungsgrund 49 der RL 2011/83/EU: z. B. Konzerte, Sportveranstaltungen).
- Die **WKO** nennt den **„online gebuchten Friseurtermin“** ausdrücklich als Fall, in dem das **Rücktrittsrecht gilt**. Kosmetik-, Nagel- und Fußpflegeleistungen sind damit vergleichbar, also Körperpflege und keine Freizeitbetätigung.
- Österreichische Rechtsprechung (OGH) speziell zu Kosmetik oder Nagelstudio wurde **nicht gefunden**. Deutsche Literatur zur Parallelnorm (§ 312g Abs 2 Nr 9 BGB) ordnet Körperpflege- und Kosmetikdienstleistungen ebenfalls nicht als Freizeitdienstleistung ein. Das ist für Österreich nur ein Indiz.
- **Ergebnis:** Von einem **bestehenden 14-tägigen Rücktrittsrecht** ausgehen (§ 11 FAGG, ab Vertragsschluss).

**Folgen:**
- Eine **Rücktrittsbelehrung** und das **Muster-Widerrufsformular** (Anhang I Teil B FAGG) bereitstellen. Fehlt die Belehrung, verlängert sich die Frist um 12 Monate (§ 12 FAGG).
- Liegt der Termin **innerhalb der 14 Tage**, muss die Kundin **ausdrücklich verlangen**, dass mit der Leistung vor Ablauf der Rücktrittsfrist begonnen wird (§ 10 FAGG), etwa durch eine eigene, nicht vorausgewählte Checkbox: „Ich verlange ausdrücklich, dass die Leistung vor Ablauf der Rücktrittsfrist erbracht wird. Mir ist bekannt, dass ich bei vollständiger Vertragserfüllung mein Rücktrittsrecht verliere.“ Dann gilt: Nach **vollständiger** Erbringung erlischt das Rücktrittsrecht (§ 18 Abs 1 Z 1 FAGG). Bei Rücktritt nach teilweiser Erbringung ist anteiliges Entgelt zu zahlen (§ 16 FAGG). Fehlt einer dieser Schritte, schuldet die Kundin für bereits erbrachte Leistungen nichts.
- Einen Rücktritt vor dem Termin innerhalb der 14 Tage kostenfrei ermöglichen. **Stornogebühren dürfen das gesetzliche Rücktrittsrecht nicht aushebeln.**

Quellen:
- § 18 FAGG (Jusline): https://www.jusline.at/gesetz/fagg/paragraf/18 (abgerufen 2026-10-13)
- FAGG gesamt (RIS): https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20008847 (abgerufen 2026-10-13)
- WKO, Rücktrittsrecht bei Dienstleistungen im Internet: https://www.wko.at/internetrecht/ruecktrittsrecht-bei-dienstleistungen-im-internet (abgerufen 2026-10-13)
- Internet Ombudsstelle, Ausnahmen vom Widerrufsrecht: https://www.ombudsstelle.at/widerruf-und-rueckgabe/in-welchen-faellen-habe-ich-kein-widerrufsrecht/ (abgerufen 2026-10-13)

### 6.3 Informationspflichten § 4 FAGG (vor Vertragsabgabe, im Buchungsflow)

Vor dem Absenden der Buchung klar und verständlich anzeigen:
- wesentliche Eigenschaften der Leistung (Behandlungsname, Dauer, Ausführende falls wählbar)
- Name/Firma, Anschrift und Kontakt des Unternehmers (ESZTER NAILS e.U. …)
- Gesamtpreis inkl. Steuern
- Zahlungsmodalitäten (vor Ort / online, akzeptierte Zahlungsarten) [PLATZHALTER: Zahlungsarten]
- Termin (Leistungszeitpunkt)
- Bestehen oder Nichtbestehen des Rücktrittsrechts, Bedingungen, Fristen, Muster-Widerrufsformular
- Hinweis auf Zahlung eines anteiligen Betrags bei Rücktritt nach Leistungsbeginn (§ 16)
- Stornobedingungen / AGB
- gesetzliche Gewährleistung
- gegebenenfalls Hinweis auf eine Schlichtungsstelle

Nach Vertragsschluss eine **Bestätigung auf dauerhaftem Datenträger** senden (§ 7 Abs 3 FAGG, E-Mail mit allen Informationen und den AGB), spätestens vor Beginn der Leistung.

### 6.4 „Button-Lösung“ § 8 Abs 2 FAGG

Löst die Buchung eine **Zahlungspflicht** aus (das ist bei einer verbindlichen Buchung immer der Fall, auch bei Zahlung vor Ort), muss der Bestell-Button eindeutig sein: **„Zahlungspflichtig buchen“** bzw. „Kostenpflichtig buchen“. Englisch: „Book with obligation to pay“ / „Book and pay“, Ungarisch: „Fizetési kötelezettséggel járó foglalás“ [PLATZHALTER: HU-Übersetzung von Muttersprachlerin prüfen]. Unmittelbar vor dem Button stehen die wesentlichen Eigenschaften, der Gesamtpreis und der Termin (§ 8 Abs 1). Fehlt das, ist die Kundin an den Vertrag nicht gebunden.

Bei einer reinen **unverbindlichen Terminanfrage** stattdessen „Termin unverbindlich anfragen“. Dann aber auch keine Stornogebühren.

### 6.5 Storno- und No-Show-Gebühren

- **Gesetzliche Basis ohne Vereinbarung:** § 1168 ABGB. Unterbleibt das Werk aus Gründen auf Seiten der Bestellerin (z. B. Nichterscheinen), kann das vereinbarte Entgelt verlangt werden, **abzüglich** dessen, was sich der Salon erspart oder durch anderweitige Verwendung erwirbt (z. B. Material, ein nachbesetzter Termin). Die WKO bestätigt das für Friseure.
- **Vereinbarte Stornopauschale:** Möglich als Reugeld (§ 909 ABGB) oder Vertragsstrafe (§ 1336 ABGB, richterliches Mäßigungsrecht). In AGB unterliegt sie der Kontrolle nach **§ 879 Abs 3 ABGB** (gröbliche Benachteiligung) und **§ 6 KSchG** (z. B. Transparenzgebot § 6 Abs 3 KSchG). Österreichische Rechtsprechung zu konkreten Prozentsätzen bei Kosmetikterminen wurde **nicht gefunden**.
- **Empfehlung:**
  - Kostenfreie Stornierung bis [PLATZHALTER: z. B. 24 oder 48] Stunden vor dem Termin.
  - Danach bzw. bei No-Show eine gestaffelte, angemessene Pauschale, etwa [PLATZHALTER: z. B. 50 % des Behandlungspreises, max. X €], mit Abzug, wenn der Termin nachbesetzt wird. Keine 100 % ohne Abzug ersparter Aufwendungen.
  - Die Regel **vor** dem „Zahlungspflichtig buchen“-Button sichtbar anzeigen und mit einer eigenen Checkbox oder einem klaren Hinweis akzeptieren lassen. In der Bestätigungs-E-Mail wiederholen. Der Beweis der wirksamen Vereinbarung ist laut WKO entscheidend.
  - **Keine** Stornogebühr innerhalb der 14-tägigen Rücktrittsfrist, solange noch nicht mit der Leistung begonnen wurde (siehe 6.2).
  - Anzahlungen oder Kartenhinterlegung erst mit dem Payment-Anbieter umsetzen. Dafür PSD2/SCA beim Anbieter klären.

Quellen:
- WKO NÖ, Nichterscheinen von Kund:innen (Friseure): https://www.wko.at/noe/gewerbe-handwerk/friseure/nichterscheinen-von-kund-innen (abgerufen 2026-10-13)
- WKO Tirol, Vorgehen bei Nichterscheinen: https://www.wko.at/tirol/gewerbe-handwerk/friseure/vorgehen-bei-nichterscheinen-von-kund-innen (abgerufen 2026-10-13)
- § 1168 ABGB (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001622&Paragraf=1168 (abgerufen 2026-10-13)
- § 879 ABGB (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001622&Paragraf=879 (abgerufen 2026-10-13)

### 6.6 AGB

Empfohlen ist eine eigene Seite `/agb` mit Vertragsschluss, Preisen, Zahlung, Storno/No-Show, Rücktrittsrecht samt Muster-Widerrufsformular, Gewährleistung, Gutscheinen [PLATZHALTER: Gutscheine – Gültigkeitsdauer, mind. 30 Jahre Verjährung bzw. OGH-Rsp zu Befristungen beachten], Haftung (keine Haftungsausschlüsse für Personenschäden, § 6 Abs 1 Z 9 KSchG) und Gerichtsstand (gegenüber Verbrauchern nur der Wohnsitzgerichtsstand, § 14 KSchG). Die AGB sind vor der Live-Schaltung juristisch zu prüfen.

---

## 7. EU AI Act Art 50 – Kennzeichnung KI-unterstützter Texte — **nicht relevant (Werbetexte), dokumentieren empfohlen**

- Art 50 der VO (EU) 2024/1689 gilt laut Art 113 seit **02.08.2026**. Der „Digital Omnibus“ zum AI Act hat nach übereinstimmenden Sekundärquellen die **Hochrisiko**-Fristen verschoben, **nicht aber** Art 50. Eine Übergangsfrist bis 02.12.2026 betrifft nur die technische Markierung nach Art 50 Abs 2 für Anbieter bereits vermarkteter Systeme. [PLATZHALTER: Veröffentlichung des Omnibus im ABl. auf EUR-Lex verifizieren – Sekundärquellen widersprüchlich]
- **Art 50 Abs 4 UAbs 2:** Betreiber (Deployer) eines KI-Systems, das **Text** erzeugt oder manipuliert, der veröffentlicht wird, **„um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren“**, müssen offenlegen, dass der Text KI-generiert ist. **Ausnahme:** Der Text wurde **menschlich überprüft bzw. redaktionell kontrolliert**, und eine natürliche oder juristische Person trägt die **redaktionelle Verantwortung**.
- **Einschätzung für Hello Beauty:** Leistungsbeschreibungen, Preise, Über-uns- und Werbetexte eines Salons sind **keine Information der Öffentlichkeit über Angelegenheiten von öffentlichem Interesse** (das zielt auf Nachrichten und Journalismus). Zudem werden die Texte von der Agentur und der Inhaberin redigiert und verantwortet. **Ergebnis: keine Kennzeichnungspflicht.**
- **Art 50 Abs 4 UAbs 1 (Deepfakes):** Werden KI-generierte oder KI-veränderte **Bilder** von realen Personen, Orten oder Ergebnissen verwendet (z. B. ein KI-„Vorher/Nachher“), ist eine Kennzeichnung Pflicht. Bei Vorher/Nachher-Bildern wäre eine KI-Bearbeitung zudem **irreführende Werbung** nach UWG. Empfehlung: keine KI-generierten Ergebnisbilder verwenden.
- **Empfehlung:** Intern festhalten, welche Texte KI-unterstützt entstanden sind und wer sie wann freigegeben hat (z. B. in `docs/`). Eine freiwillige Fußnote wie „Texte teilweise mit KI-Unterstützung erstellt und redaktionell geprüft“ ist möglich, aber nicht nötig. Inhalte, insbesondere Wirkversprechen, fachlich durch die Inhaberin prüfen lassen.

Quellen:
- VO (EU) 2024/1689 (AI Act), Art 50 und Art 113: https://eur-lex.europa.eu/eli/reg/2024/1689/oj (abgerufen 2026-10-13)
- usercentrics, Digital Omnibus / Art 50: https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/ (abgerufen 2026-10-13)
- Haufe, AI Act Regelungen verschoben: https://www.haufe.de/personal/arbeitsrecht/ai-act-ki-gesetz-der-eu_76_627800.html (abgerufen 2026-10-13)

---

## 8. Urheber- und Bildrecht (UrhG AT, § 78 Bildnisschutz) — **Pflicht (Rechteklärung)**

- **Urheberrecht bzw. Leistungsschutz an Fotos:** Jedes Foto ist als Lichtbildwerk (§ 3 UrhG) oder zumindest als Lichtbild (§ 73 UrhG) geschützt. Die Rechte liegen beim **Fotografen bzw. der Fotografin**, nicht automatisch beim Salon. Dass die Fotos auf der alten Website verwendet wurden, beweist kein Nutzungsrecht für eine neue Website, für andere Zuschnitte oder für Social Media. Die Herstellerbezeichnung ist nach § 74 Abs 3 UrhG anzugeben, wenn der Hersteller das verlangt.
- **Von wem stammen die Fotos?** Unbekannt: [PLATZHALTER: Urheber:in je Foto – Inhaberin selbst, Mitarbeiterin, beauftragter Fotograf, Stock, Webagentur der alten Seite?]. Wenn die alte Website von einer Agentur oder einem Template stammt, können Bilder **Stockfotos mit seitengebundener Lizenz** sein. Das muss geprüft werden.
- **Bildnisschutz § 78 UrhG:** Bilder, auf denen Personen erkennbar sind (Gesicht, aber auch markante Tattoos oder Schmuck an Händen), dürfen nicht veröffentlicht werden, wenn dadurch **berechtigte Interessen** verletzt würden. Für Werbung mit Kundinnen braucht es nach Rechtsprechung und Praxis eine **Zustimmung**. Zusätzlich gilt die DSGVO, denn ein Foto einer erkennbaren Person ist ein personenbezogenes Datum: Rechtsgrundlage ist eine Einwilligung (Art 6 Abs 1 lit a), widerruflich. Auch bei reinen Hand- oder Nagelfotos ist eine Einwilligung empfehlenswert, wenn die Person z. B. über Social-Media-Verknüpfungen identifizierbar ist.
- **Mitarbeiterinnen-Fotos und Namen** (Team-Seite): eine schriftliche Einwilligung jeder Mitarbeiterin, widerruflich. Bei Widerruf das Bild entfernen.

**Empfehlung:**
1. Eine **schriftliche Bestätigung der Inhaberin** (E-Mail genügt) einholen: „Ich verfüge über die Nutzungsrechte an folgenden Fotos [Liste] für die Website hellobeautysalon.at, zeitlich und räumlich unbeschränkt, inkl. Bearbeitung/Zuschnitt, und habe von allen erkennbar abgebildeten Personen die Einwilligung zur Veröffentlichung.“ Dazu eine Liste mit Dateinamen und Herkunft.
2. Für künftige Fotos eine **Einwilligungsvorlage** für Kundinnen und Mitarbeiterinnen bereitstellen (Zweck, Medien, Dauer, Widerruf).
3. Im Impressum einen Abschnitt „Bildnachweis“: [PLATZHALTER: Fotograf:in / © Hello Beauty].
4. Keine Fotos aus Instagram oder Google-Rezensionen Dritter übernehmen.

Quellen:
- UrhG (RIS), §§ 3, 73, 74, 78: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848 (abgerufen 2026-10-13)
- § 78 UrhG (Jusline): https://www.jusline.at/gesetz/urhg/paragraf/78 (abgerufen 2026-10-13)

---

## 9. Sonstiges (kurz)

### 9.1 Social-Media-Links ohne Embed — **unproblematisch (E: Hinweis in DSE)**
Einfache `<a href>`-Links zu Instagram (`hellobeauty.salon.at`) und Facebook (`hellobeautywien`) lösen erst beim Klick eine Verbindung aus. Es gibt keine gemeinsame Verantwortlichkeit wie bei Like-Buttons oder Plugins (EuGH C-40/17 Fashion ID betraf ein eingebundenes Plugin). Umsetzung: `rel="noopener noreferrer"`, eigene SVG-Icons lokal (keine Icon-CDNs), keine Tracking-Parameter. Ein kurzer Hinweis in der Datenschutzerklärung genügt.

### 9.2 Google Maps / Apple Karten nur als Link — **gute Lösung**
Ein Link zu `https://www.google.com/maps/...` bzw. `https://maps.apple.com/?...` statt eines iframes vermeidet Datenübermittlungen beim Seitenaufruf und damit eine Einwilligungspflicht. Optional eine **statische, selbst gehostete Kartengrafik**, etwa einen OpenStreetMap-Ausschnitt mit Attribution „© OpenStreetMap-Mitwirkende“ (ODbL) oder eine eigene Skizze. Keine Kacheln von Fremdservern nachladen.

### 9.3 Webfonts lokal — **beibehalten**
Das LG München I (Urteil vom 20.01.2022, 3 O 17493/20) hat für dynamisch von Google geladene Schriften 100 € Schadenersatz zugesprochen. In Österreich folgte 2022/23 eine Welle von Abmahnschreiben eines Anwalts aus Groß-Enzersdorf (190 €, laut Medien rund zehntausend Schreiben). Österreichische Gerichte werteten das Vorgehen teils als **rechtsmissbräuchlich** (nicht rechtskräftig zum Berichtszeitpunkt der Quellen). Die Datenschutzbehörde empfiehlt laut futurezone, Schriften lokal zu hosten. **Umsetzung:** Schriften als WOFF2 im Build ausliefern, keine `fonts.googleapis.com`- oder `fonts.gstatic.com`-Requests. Die **Font-Lizenz** prüfen (OFL erlaubt Self-Hosting) und im Repo dokumentieren.

Quellen:
- futurezone, Google Fonts Abmahnung: https://futurezone.at/netzpolitik/google-fonts-google-unternehmen-abmahnung-anwalt-dsgvo-schreiben-auskunft/402121590 (abgerufen 2026-10-13)
- futurezone, Urteil Google Fonts: https://futurezone.at/netzpolitik/abmahnung-google-fonts-urteil-dsgvo/402583064 (abgerufen 2026-10-13)
- WKO Kärnten, Google Fonts Musterverfahren: https://www.wko.at/ktn/handel/google-fonts-musterverfahren-wko-setzt-klares-signal-gegen-a (abgerufen 2026-10-13)

### 9.4 E-Mail-Adresse – Spamschutz — **E**
§ 5 ECG verlangt eine elektronisch erreichbare Adresse. Darum keine Darstellung nur als Bild und keine Captchas vor der Adresse. Vertretbar sind ein `mailto:`-Link mit leichter Obfuskation, die ohne Drittdienste und **ohne JavaScript-Pflicht** lesbar bleibt (z. B. HTML-Entities), sowie ein serverseitiger Spamfilter beim Mailhoster. Im Impressum die Adresse im Klartext lassen. Die Geschäftsadresse `info@hellobeautysalon.at` verwenden, nicht die privaten Gmail-Adressen aus dem Treatwell-Impressum.

### 9.5 Sprachfassungen
Die Pflichttexte (Impressum, Datenschutz, AGB, Rücktrittsbelehrung) sind in **allen angebotenen Vertragssprachen** bereitzustellen, sobald über die Website in EN/HU gebucht werden kann (§ 4 FAGG „klar und verständlich“). Den Vorrang der deutschen Fassung nur für AGB vereinbaren, nicht für Pflichtinformationen.

### 9.6 Bewertungen auf der Website (UWG)
Werden Treatwell- oder Google-Bewertungen zitiert, ist anzugeben, ob und wie geprüft wird, dass sie von echten Kundinnen stammen. Das verlangt Z 23b und 23c Anhang UWG (Omnibus-RL), umgesetzt durch das Modernisierungs-RL-Umsetzungsgesetz 2022. Immer Quelle und Datum nennen („4,8 von 5 auf Treatwell, 2.811 Bewertungen, Stand 13.10.2026“) und keine selektiv geschönten Darstellungen.
Quelle: UWG Anhang (RIS): https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10002665 (abgerufen 2026-10-13)

---

## 10. Offene Punkte / Platzhalter (Sammelliste)

- [PLATZHALTER: Hoster, Sitz, Serverstandort, Log-Speicherdauer, AVV]
- [PLATZHALTER: CRM- bzw. Buchungsanbieter, AVV, Drittlandtransfer, Barrierefreiheit (ACR/VPAT)]
- [PLATZHALTER: Payment-Anbieter]
- [PLATZHALTER: WhatsApp ja/nein + Nummer]
- [PLATZHALTER: USt-Status – Regelbesteuerung 20 % vs. Kleinunternehmerin]
- [PLATZHALTER: Beschäftigtenzahl (VZÄ) und Umsatz → BaFG-Kleinstunternehmen ja/nein]
- [PLATZHALTER: exakte Gewerbebehörde laut GISA-Auszug]
- [PLATZHALTER: Teilnahme an Verbraucherschlichtung ja/nein]
- [PLATZHALTER: Stornofrist und Stornopauschale]
- [PLATZHALTER: akzeptierte Zahlungsarten]
- [PLATZHALTER: Urheber:in je Foto + Einwilligungen abgebildeter Personen]
- [PLATZHALTER: Leistungsangebot Laser/Microneedling – berufsrechtliche Deckung prüfen]
- [PLATZHALTER: Gutschein-Bedingungen]
- [PLATZHALTER: HU-/EN-Übersetzungen der Pflichttexte und des Buttons von Muttersprachler:in prüfen]
- [PLATZHALTER: Digital-Omnibus-Fundstelle im ABl. verifizieren]
