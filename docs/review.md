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
