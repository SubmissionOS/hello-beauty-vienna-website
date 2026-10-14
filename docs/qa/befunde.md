# QA-Befunde

Erfasst während Phase 8 (automatisierte Suite + Sichtprüfung) und Phase 9 (Experten-Review). Status: ✅ behoben · ⏳ offen · ➖ bewusst so (begründet).

| # | Seite | Sprache | Gerät/Browser | Problem | Fix | Status |
|---|---|---|---|---|---|---|
| 1 | Start, Leistungen | alle | alle | „ab“-Preis der Pediküre-Karte war 10 € (Fußpeeling), Nagelmodellage 45 € (Ablösen) – irreführend | Kleinst-Zusätze (`minor`) zählen nicht als Einstiegspreis | ✅ |
| 2 | Termin buchen, Schritt 6/7 | DE | iPhone 15 | „Buchungsnummer“ brach mitten im Wort um, Werte unnötig schmal | Zusammenfassung als gestapelte iOS-Zellen (Label oben, Wert darunter, „Ändern“ rechts) | ✅ |
| 3 | alle (Footer, Brotkrumen) | alle | mobil | Touch-Ziele „FAQ“ 27 × 44 px, „Preise“ 42 × 44 px | `min-width: 44px` für Footer- und Brotkrumen-Links | ✅ |
| 4 | Preise | alle | alle | axe `landmark-unique`: zwei Preisgruppen „Ablösen“ als gleichnamige Landmarks | Preisgruppen als normale Container statt `section` | ✅ |
| 5 | Impressum, Barrierefreiheit, Über uns, Kontakt | alle | 360–430 px | Platzhalter-Markierung ragte 3–4 px aus der Zeile (Innenabstand) | Abstand über `box-shadow` statt `padding` | ✅ |
| 6 | lange Seiten (Preise, Galerie) | alle | WebKit | Konsole: vorgeladene Schriften „nicht genutzt“ – WebKit lud beide Schriften doppelt (~80 KB) | Font-Preloads entfernt; Schriften werden aus dem inline ausgelieferten CSS sofort gefunden, Fallback-Metriken verhindern Layout-Sprünge | ✅ |
| 7 | alle | alle | WebKit, mobil | Tastaturfokus konnte unter der Aktionsleiste/dem Header landen (Safari ignoriert `scroll-padding` beim Fokussieren) – WCAG 2.4.11 | Fokus-Wächter in `ui.ts` scrollt bei Tastaturfokus nach; `scroll-padding-bottom` ergänzt | ✅ |
| 8 | Termin buchen | alle | alle | Demo-Belegung ließ für 2-Stunden-Leistungen (Neues Set) keinen einzigen freien Tag | Mock mit realistischen Lücken, Teilzeit und späteren Arbeitsbeginnen | ✅ |
| 9 | Galerie | alle | Desktop | Wischen in der Lightbox startete natives Bild-Drag | `draggable="false"`, `-webkit-user-drag: none` | ✅ |
| 10 | Impressum, Datenschutz | alle | alle | E-Mail am Satzende wurde als `mailto:info@hellobeautysalon.at.` verlinkt (kaputt) | Muster im Rich-Text-Renderer korrigiert | ✅ |
| 11 | Wimpern & Brauen, Kosmetik | DE | 320 px | „Wimpernverlängerung,“ (34 px) breiter als die Spalte → horizontales Scrollen | Silbentrennung in Überschriften, alle Layout-Grids `minmax(0, 1fr)` | ✅ |
| 12 | Preise | HU, EN | 320–390 px | „0,50 €-tól darabonként“ und PDF-Button ohne Umbruch → Seite zu breit | Preiswert in Zellen darf umbrechen, Buttons brechen ausgewogen um | ✅ |
| 13 | Galerie | alle | iPad | Filter (Segmented Control) nur 40 px hoch | 44 px auf allen Breiten | ✅ |
| 14 | Über uns | HU | – | Meta-Description 162 Zeichen | gekürzt auf 152 | ✅ |
| 15 | Projekt | – | – | `npm run build` verwies auf nicht existierendes Prüfskript | Build-Skript bereinigt; Übersetzungsprüfung läuft im Astro-Build | ✅ |
| 16 | Termin buchen | alle | Desktop | Klick auf einen Ankerlink scrollte durch den neuen Fokus-Wächter zurück | Wächter greift nur bei `:focus-visible` und nur bei echter Überdeckung | ✅ |
| 17 | Termin buchen | alle | mobil | Nach „Weiter“ landete der Schritt-Titel unter der Fortschrittsleiste bzw. mitten in der Seite | Schritt-Überschrift wird 12 px unter die Leiste gescrollt und fokussiert | ✅ |
| 18 | alle (Footer) | alle | < 1024 px | Unterster Footer-Streifen von der Aktionsleiste verdeckt | Abstand für die Aktionsleiste am Footer statt am Body | ✅ |
| 19 | Unterseiten | alle | Desktop | H1 auf großen Bildschirmen zu wuchtig gegenüber dem Fließtext | Skala `--fs-h1`/`--fs-h2` reduziert (52/40 px max.) | ✅ |
| 20 | Galerie | HU | 360 px | Filterleiste brach zweizeilig um bzw. lief über (`fieldset`-Mindestbreite) | `min-width: 0`, einzeiliges Segmented Control mit Scroll | ✅ |
| 21 | Über uns | alle | Tablet/Desktop | Letztes Salonbild stand allein in halber Breite | letztes Bild über volle Breite | ✅ |
| 22 | Start | alle | iPad | Hochformat-Bilder füllten auf Tablet fast den ganzen Bildschirm | Tablet-Bildausschnitt 16 : 9 | ✅ |
| 23 | FAQ, Preise | alle | Desktop | Inhalte liefen über 1200 px Breite, Zeilen schwer lesbar | Lesebreite 48 rem (FAQ) bzw. 52 rem (Preise) | ✅ |
| 24 | alle (Footer) | alle | alle | Öffnungszeiten in einer Zeile, auf schmalen Spalten unglücklich umbrochen | Tage und Uhrzeit gestapelt | ✅ |
| 25 | Impressum, Kontakt | alle | alle | Telefon mit Durchwahl (+43 1 52 152-0) wurde nur teilweise verlinkt | Muster für Durchwahl ergänzt | ✅ |
| 26 | alle | EN | alle | Englische Preise als „85 €“ statt „€85“ | Englisches Format mit vorangestelltem € | ✅ |
| 27 | Leistungsseiten, Impressum | DE, HU | iPhone 390–430 px | Überschriften unnötig getrennt („Wimpernverlängerung, Lif-ting“) | Silbentrennung nur noch unter 360 px, darüber nur Notumbruch | ✅ |
| 28 | Start | DE, EN | ≥ 1024 px | Headline ragt mit „Wien.“ ins Hero-Foto, ein heller Kasten dahinter verdeckte das Bild (Notlösung); auf HU nicht sichtbar | **Ursache:** Foto absolut positioniert, Überschrift mit `max-width` in `ch` (bezogen auf die eigene 108-px-Schrift) im Container – kein gemeinsames Raster, das Layout hing von der Textlänge ab. Jetzt zweispaltiges Grid mit fester Spaltengrenze, Schrift per `cqi` an die Spaltenbreite gebunden, Kasten und Überlappung entfernt | ✅ |
| 29 | alle | alle | alle | Test-Lücke: Überlappung Text/Bild wurde nie geprüft, der Hero-Fehler blieb unentdeckt | `tests/overlap.spec.ts` (alle Seiten × 3 Sprachen × 14 Profile) und Pseudo-Lokalisierung (+40 % je Wort). Dabei zeigte eine Messung am Hero, dass mein erster Testentwurf keine Bilder einsammelte – korrigiert, bevor der Test „grün“ gemeldet wurde | ✅ |
| 30 | Sprachumschalter | DE | alle | „Deutsch“ zeigte die österreichische Flagge | `de.svg` Schwarz-Rot-Gold, `at.svg` entfernt, Pixelfarben im Test geprüft | ✅ |
| 31 | Sprachumschalter | EN | alle | Union Jack nicht in korrekten Proportionen, Flagge im Kopf auf 10:7 gestaucht | nach offiziellen Kreuzbreiten neu gezeichnet (mittig auf 3:2 beschnitten), überall 3:2 ohne Verzerrung | ✅ |
| 32 | Kopfbereich | alle | 1024–1179 px | Mit Login-Button brachen „Über uns“ und „Termin buchen“ um, Chevrons schrumpften | kein Umbruch, kompaktere Abstände in diesem Bereich | ✅ |
| 33 | Kopfbereich | alle | Desktop, +40 % | Bei zu voller Leiste wurde das Logo auf 79 px gequetscht, der Sprachknopf schrumpfte unter seinen Inhalt | Logo und Knöpfe schrumpfen nie; reicht der Platz nicht, bricht der Aktionsblock in eine zweite Zeile um | ✅ |
| 34 | Mega-Menü | alle | Desktop | Unterpunkte leer bzw. nur „)“: Regex der Titelkürzung war durch verlorene Backslashes kaputt, die Tests prüften nur Anzahl und Ziel | gemeinsame Funktion `src/lib/menu.ts`, Tests prüfen jetzt den Text jedes Unterpunkts (Menü und Akkordeon). Bei der Sichtprüfung vor dem Commit entdeckt | ✅ |
| 35 | Mega-Menü | alle | iPad (Touch), WebKit | Tippen auf die Abdunkelung schloss das Menü nicht (iOS liefert auf Elementen ohne eigenen Handler kein `click` an einen `document`-Listener) | eigener Klick-Handler und `cursor: pointer` an der Abdunkelung | ✅ |
| 36 | Mega-Menü | alle | Safari | Fokus auf einen anderen Navigationspunkt schloss nicht (Safari fokussiert Buttons beim Klick nicht, daher kein `focusout`) | dokumentweites `focusin` statt `focusout` am Eintrag | ✅ |
| 37 | Mega-Menü | alle | Desktop | Die unsichtbare Brücke am Auslöser ragte seitlich über den Button hinaus (Overflow-Fehlalarm) | vollbreiter Streifen am Panel-Rand plus senkrechte Brücke ohne Überstand | ✅ |
| 38 | Mobiles Menü | alle | < 1024 px | Akkordeon „Leistungen“ zeigte schwarze Listenmarker | `list-style: none` | ✅ |
| 39 | Start | alle | alle | Beschriftung der Nagelform-Auswahl lief bei +40 % über | `overflow-wrap: anywhere` | ✅ |
| 40 | Leistungsseiten | alle | ≥ 1024 px | Bildbreite hing von der Sprache ab (DE 482 px, EN 568 px bei 1440 px), bei 360 px brach „Wimpernverlängerung,“ mitten im Wort um (gleiche Fehlerklasse wie Befund 28) | alle nackten `fr`-Spalten → `minmax(0, …fr)` (30 Stellen in 7 Dateien), h1 nie breiter als das längste Wort (Fenster-/Spaltenbreite / 10,6); gefunden vom neuen Sprachparitäts-Test | ✅ |
| 41 | Tests | – | WebKit | Link-Test der Galerie überschritt 90 s (rund 70 Knöpfe, je Neuladen und Warten) | Zeitgrenze für Galerieseiten 360 s – Testdauer, kein Produktfehler | ✅ |
| 42 | Tests | – | iPad hoch | Login-Popover wurde noch während der Einblend-Animation vermessen | Animation abwarten | ✅ |
| 43 | Tests | – | alle | Layout-Audit hielt per `clip-path` versteckten Text (Login-Beschriftung unter 1280 px) für sichtbar | Audit erkennt `clip-path: inset(50%)` und `clip: rect(0 0 0 0)` | ✅ |
