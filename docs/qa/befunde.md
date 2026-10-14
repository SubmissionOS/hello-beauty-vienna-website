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
