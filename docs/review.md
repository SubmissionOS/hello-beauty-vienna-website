# Experten-Review (Phase 9)

Grundlage: Screenshots aller Seiten × Sprachen × Geräte (`docs/qa/screenshots/`), Zustands-Aufnahmen, Code, durchgespielte Workflows und fünf Personas. Schweregrade: kritisch · hoch · mittel · niedrig. Kritisch, hoch und mittel werden behoben, niedrig nach Aufwand.

## Runde 1

### A) Senior UI/UX (Apple-HIG-geprägt)

| # | Befund | Schwere | Maßnahme | Status |
|---|---|---|---|---|
| A1 | Leere Fehler- und Erfolgsmeldungen (Kontaktformular, Buchung) waren dauerhaft sichtbar – wirkt kaputt | kritisch | `[hidden]` gewinnt global; Regressionstest | ✅ |
| A2 | Nach „Weiter“ blieb die Scrollposition stehen: Auf Android landete man in Schritt 3 im Fußbereich, die Überschrift von Schritt 2 lag auf dem Laptop unter der Fortschrittsleiste | hoch | Schrittüberschrift wird wie ein iOS-Seitenwechsel direkt unter die Fortschrittsleiste gescrollt | ✅ |
| A3 | Für 2-Stunden-Leistungen gab es in der Demo keinen einzigen freien Tag – die wichtigste Demo-Strecke („Neues Set buchen“) wäre gescheitert | kritisch | realistische Belegung im Mock | ✅ |
| A4 | Zusammenfassung: Label-Spalte zu schmal („Buchungsnumme-r“) | mittel | iOS-Zellen mit Label über Wert | ✅ |
| A5 | Sprachumschalter zeigte mobil nur „DE“ – Vorgabe ist Flagge + Sprachname | mittel | „Deutsch / English / Magyar“ auf allen Breiten (passt auf 360 px) | ✅ |
| A6 | Einstiegspreise der Leistungskarten konnten aus Kleinst-Zusätzen stammen („Pediküre ab 10 €“) | hoch | Zusätze zählen nicht als Einstiegspreis | ✅ |
| A7 | Kalender-Fehlerzustand nutzte den Text der Uhrzeiten und konnte mehrere „Erneut versuchen“-Buttons stapeln | mittel | eigene Meldung, genau ein Button | ✅ |
| A8 | Schritt 2 (Mitarbeiterin) zeigt drei sichtbare Platzhalter – wirkt in der Demo unfertig | niedrig | bewusst so: Vorgabe „Namen [PLATZHALTER]“; verschwindet mit echten Namen | ➖ |
| A9 | Preistabellen: Spalten „Dauer/Preis“ sprangen zwischen Gruppen | niedrig | einheitliche Spaltenbreiten | ✅ |

### B) IT-Consultant (Architektur, Wartbarkeit, Compliance)

| # | Befund | Schwere | Maßnahme | Status |
|---|---|---|---|---|
| B1 | `npm run build` verwies auf ein nicht existierendes Skript – Übergabe wäre am ersten Befehl gescheitert | kritisch | Build-Skript bereinigt, Prüfung im Astro-Build | ✅ |
| B2 | Nach Buchungsabschluss blieben Name/Telefon/E-Mail bis zum Tab-Schließen im sessionStorage | mittel | nach Bestätigung gelöscht (Datenminimierung) | ✅ |
| B3 | E-Mail-Links am Satzende kaputt (`…at.`) | hoch | Rich-Text-Renderer korrigiert, Linkprüfung in der Suite | ✅ |
| B4 | WebKit lud Schriften doppelt (Preload nicht genutzt) | mittel | Preloads entfernt | ✅ |
| B5 | `.astro`-Dateien werden nicht typgeprüft (kein `@astrojs/check`, bewusst wegen ~100 zusätzlicher Pakete) | niedrig | Laufzeit über 1 500+ Browser-Tests abgesichert; Empfehlung im Bericht | ➖ |
| B6 | Mock-Adapter ist auch im HTTP-Betrieb im Bundle (Demo-Schalter-Import, ~10 KB) | niedrig | Empfehlung: bei Umstellung auf das CRM dynamisch importieren | ➖ |
| B7 | Architektur: Schnittstelle + Adapter, UI kennt nur `api`; CRM-Anbindung ohne Umbau per Umgebungsvariable; Vertrag mit Idempotenz, 409/422, Zeitzone | – | passt | – |
| B8 | Abhängigkeiten: 2 Laufzeit-Pakete (astro, sharp), Cooldown, ignore-scripts, Vorfallsprüfung dokumentiert | – | passt | – |
| B9 | Compliance: keine Cookies, keine Fremd-Requests (getestet auf allen Seiten), Rechtstexte AT-konform als Entwurf, FAGG-Button und -Hinweise im Flow | – | passt; offene Punkte = Platzhalter der Inhaberin | – |
| B10 | i18n: typisierte Wörterbücher, Paritätsprüfung bricht den Build, übersetzte Slugs aus einer Tabelle – vierte Sprache = eine Datei + Slugs | – | passt | – |

### C) Personas (durchgespielt auf den Zielgeräten, mit den Aufnahmen unter `docs/qa/screenshots/`)

| # | Persona | Weg | Befund | Schwere | Maßnahme | Status |
|---|---|---|---|---|---|---|
| C1 | **Anna, 34**, Stammkundin, iPhone 15, Safari – will „Auffüllen L“ buchen | Start → „Termin buchen“ (Aktionsleiste) → Nagelmodellage → Auffüllen → Tag → Uhrzeit → Daten → zahlungspflichtig buchen | Weg in 7 Schritten ohne Sackgasse; Zwischenstand bleibt beim Zurück-Wischen erhalten. Nach „Weiter“ lag der neue Schritt anfangs nicht im Blick | hoch | Schrittüberschrift unter die Fortschrittsleiste (A2) | ✅ |
| C2 | **Zsófia, 27**, Ungarin in Wien, Android 360 px, wählt HU | Sprachwahl → Szempilla → Preise → Buchung | Sprache bleibt beim Seitenwechsel, Slugs und Datumsformat ungarisch, Preise „15 €-tól“. Galerie-Filter auf 360 px zweizeilig/überlaufend | mittel | einzeiliges Segmented Control (Befund 20) | ✅ |
| C3 | **Sarah, 29**, Expat, Laptop, Englisch – vergleicht Wimpernpreise | /en/ → Lashes & brows → full price list → „Book this treatment“ | Preise im englischen Format nötig (€85), Hinweis „Diese Leistung buchen“ versprach „nur noch Tag und Uhrzeit“, obwohl nur eine Variante (z. B. Lifting mit Färben) vorausgewählt ist und weitere Schritte folgen | mittel | €-Präfix (Befund 26); Hinweis ehrlich formuliert: „passende Behandlung vorausgewählt – änderbar“ (DE/EN/HU) | ✅ |
| C4 | **Helga, 68**, Pediküre, große Schrift (200 % Zoom), telefoniert lieber | Start → Pediküre → Telefon | Telefonnummer auf jeder Seite in der Aktionsleiste und im Footer, `tel:` mit Ländervorwahl; 200 % Zoom und Textabstände ohne Überlauf (automatisiert geprüft); Öffnungszeiten gestapelt besser lesbar | mittel | Öffnungszeiten gestapelt (Befund 24) | ✅ |
| C5 | **Lena, 38**, blind, VoiceOver/Tastatur – bucht Kosmetik | Tastatur: Skip-Link → Navigation → Buchung; Kalender (Pfeiltasten), Uhrzeiten als Radiogruppen, Fehler per `aria-live` | Fokus konnte in Safari unter Header/Aktionsleiste verschwinden; Menü-Sheet fokussierte nicht das erste Element | hoch | Fokus-Wächter (Befund 7), `data-autofocus` im Sheet | ✅ |
| C6 | alle Personas | Gutscheine, Team, Barrierefreiheit des Salons | Antworten stehen als sichtbare Platzhalter – Inhaberin muss liefern | niedrig | bewusst: Regel „nichts erfinden“ | ➖ |

## Runde 2

Nach allen Fixes: Screenshots neu erzeugt (456 Aufnahmen, 8 Geräteprofile × 3 Sprachen × 18 Seiten + Zustände) und erneut gesichtet. Neuer Befund nur: unnötige Silbentrennung in Überschriften auf 390–430 px (Befund 27, mittel) → behoben. Keine weiteren kritischen, hohen oder mittleren Befunde – Runde 3 nicht nötig.
