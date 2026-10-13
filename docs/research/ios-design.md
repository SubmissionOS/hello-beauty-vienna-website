# iOS-Designprinzipien (Apple HIG 2025/2026) fürs Web: Hello Beauty Vienna

Stand: 2026-10-13. Zielgruppe: Frontend-Umsetzung und QA der mobile-first Salon-Website mit Buchungsflow.

**Grundsatz:** Farben, Schriften und Bildsprache bleiben die der Marke Hello Beauty. iOS liefert nur das *Interaktions- und Layoutgefühl*: Touch-Ziele, Sheets, Listen, Bewegung, Safe Areas und Fokus. Wir bauen keine iOS-Kopie (kein SF-Pro-Zwang, keine Systemfarben, keine nachgebauten iOS-Statusleisten).

**Hinweis 1pt ≈ 1 CSS-px:** Auf iPhones entspricht 1 HIG-Punkt (pt) 1 CSS-Pixel, wenn `width=device-width` gesetzt ist. Alle pt-Angaben unten lassen sich deshalb 1:1 als `px` bzw. `/16` als `rem` übernehmen.

---

## Quellen

Alle Quellen am **2026-10-13** abgerufen. Der Text wurde über die JSON-Datenendpunkte der HIG gelesen (`developer.apple.com/tutorials/data/design/human-interface-guidelines/<seite>.json`). Sie liefern denselben Inhalt wie die HTML-Seiten.

| Kürzel | Seite | URL | Letzte Änderung laut Change log |
|---|---|---|---|
| [HIG-A11y] | Accessibility | https://developer.apple.com/design/human-interface-guidelines/accessibility | 7. März 2025 |
| [HIG-Sheets] | Sheets | https://developer.apple.com/design/human-interface-guidelines/sheets | 24. März 2026 |
| [HIG-Materials] | Materials (Liquid Glass) | https://developer.apple.com/design/human-interface-guidelines/materials | 9. Sept. 2025 |
| [HIG-Seg] | Segmented controls | https://developer.apple.com/design/human-interface-guidelines/segmented-controls | – |
| [HIG-Motion] | Motion | https://developer.apple.com/design/human-interface-guidelines/motion | – |
| [HIG-Layout] | Layout | https://developer.apple.com/design/human-interface-guidelines/layout | 9. Sept. 2026 |
| [HIG-Typo] | Typography | https://developer.apple.com/design/human-interface-guidelines/typography | – |
| [HIG-Lists] | Lists and tables | https://developer.apple.com/design/human-interface-guidelines/lists-and-tables | – |
| [HIG-Toolbars] | Toolbars (enthält seit Juni 2025 die Navigation Bars) | https://developer.apple.com/design/human-interface-guidelines/toolbars | 16. Dez. 2025 |
| [HIG-Buttons] | Buttons | https://developer.apple.com/design/human-interface-guidelines/buttons | 16. Dez. 2025 |
| [HIG-Pickers] | Pickers (Date Picker) | https://developer.apple.com/design/human-interface-guidelines/pickers | – |
| [HIG-Haptics] | Playing haptics | https://developer.apple.com/design/human-interface-guidelines/playing-haptics | – |
| [HIG-Dark] | Dark Mode | https://developer.apple.com/design/human-interface-guidelines/dark-mode | – |
| [HIG-Color] | Color | https://developer.apple.com/design/human-interface-guidelines/color | – |

Die Browser-Hinweise beruhen auf dem bekannten WebKit/Safari-Verhalten (Release Notes von WebKit: https://webkit.org/blog/ und Datenbank auf https://caniuse.com, abgerufen am 2026-10-13). Feature-Grenzen werden kurz mit der Safari-Mindestversion genannt. **Alles, was als „prüfen“ markiert ist, muss am echten Gerät mit iOS 26 / Safari 26 getestet werden.**

---

## 0. Basis-Setup (gilt für alle Prinzipien)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">           <!-- oder "light dark", siehe §17 -->
```

```css
:root{
  /* Bewegung */
  --ease-out: cubic-bezier(.2,.8,.2,1);      /* Standard für UI-Übergänge */
  --ease-sheet: cubic-bezier(.32,.72,0,1);   /* Sheet/Drawer, iOS-ähnliches „Einrasten“ */
  --dur-fast: 150ms; --dur-base: 220ms; --dur-sheet: 320ms;
  /* Maße */
  --tap: 44px;                                /* HIG-Mindestgröße */
  --gutter: 16px;                             /* iOS-Standardrand iPhone (kompakt) */
  --radius-cell: 12px; --radius-card: 16px; --radius-sheet: 24px; --radius-pill: 999px;
  /* Safe Areas */
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --header-h: 56px;
  --actionbar-h: 72px;
}
html{ -webkit-text-size-adjust:100%; text-size-adjust:100%; }
```

---

## 1. Touch-Ziele mindestens 44×44 pt

**HIG:** Die Tabelle in [HIG-A11y] („Make controls easy to activate“) nennt für iOS/iPadOS eine Standard-Trefferfläche von **44×44 pt** und als absolutes Minimum **28×28 pt**. [HIG-Buttons] verlangt außerdem: *„include enough space around a button so that people can visually distinguish it from surrounding components“*.

**Web-Umsetzung:**
```css
.btn, .icon-btn, .chip, .seg label, .cell { min-height: var(--tap); }
.icon-btn{ min-width: var(--tap); display:inline-grid; place-items:center; }
/* Kleine sichtbare Icons, große Trefferfläche */
.icon-btn--small{ position:relative; }
.icon-btn--small::after{ content:""; position:absolute; inset:50% auto auto 50%;
  width:var(--tap); height:var(--tap); transform:translate(-50%,-50%); }
.chips{ gap: 8px; }  /* Abstand zwischen Zielen, damit nichts überlappt */
```

**QA:** Alle interaktiven Elemente haben eine Bounding Box von mindestens 44×44 CSS-px (gemessen in den DevTools bei 375px Breite). Zwischen benachbarten Zielen liegen mindestens 8px. Automatisierbar über ein Skript, das bei `a, button, input, [role=radio], label` die `getBoundingClientRect()` prüft. Zusätzlich gilt WCAG 2.5.8 (24px) als harte Untergrenze.

**Browser:** Fließtext-Links sind ausgenommen, sie bekommen aber `padding-block: 2px` und eine ausreichende Zeilenhöhe. Unter iOS sollte man Zielgrößen nicht mit `transform: scale()` verkleinern, weil das die Trefferfläche mitverkleinert.

---

## 2. Klare Hierarchie, Weißraum, Typo-Hierarchie (Large-Title-Muster)

**HIG:**
- [HIG-Layout]: *„Order content by relative importance … place the most important items near the top“*, *„Group related items … use negative space, container shapes, or separator lines“* und *„Differentiate controls from content“*.
- [HIG-Typo]: Standardgröße **17 pt** (Body), Minimum **11 pt**. Skala „Large (default)“: Large Title 34/41, Title 1 28/34, Title 2 22/28, Headline 17/22 semibold, Body 17/22, Footnote 13 (Tabelle: 12/16 in kleineren Stufen), Caption 12/11.
- [HIG-Toolbars]: *„Use a large title to help people stay oriented … a large title transitions to a standard title as people begin scrolling“*. Titel *„under 15 characters“*.

**Web-Umsetzung (Markenschrift, iOS-Proportionen):**
```css
:root{
  --fs-large-title: clamp(2rem, 1.6rem + 2vw, 2.5rem);   /* ≈34pt mobil */
  --fs-title1: clamp(1.625rem, 1.4rem + 1vw, 2rem);       /* ≈28 */
  --fs-title2: 1.375rem;                                  /* 22 */
  --fs-body: 1.0625rem;                                   /* 17 */
  --fs-footnote: .8125rem;                                /* 13 */
}
body{ font-size: var(--fs-body); line-height: 1.45; }
.section{ padding-block: clamp(40px, 8vw, 96px); padding-inline: var(--gutter); }
.page-title{ font-size: var(--fs-large-title); line-height:1.1; margin-block: 8px 24px; }
```
Das Large-Title-Muster: Der große Seitentitel steht im Content. Sobald er aus dem Bild scrollt, blendet der Sticky Header einen kleinen Titel (17px, semibold) ein. Das geht ohne Scroll-Listener per IntersectionObserver:
```js
new IntersectionObserver(([e]) =>
  header.classList.toggle('show-title', !e.isIntersecting),
  { rootMargin: `-${56}px 0px 0px 0px` }).observe(document.querySelector('.page-title'));
```

**QA:** Pro Screen gibt es genau eine H1 und eine primäre Aktion. Body-Text ist mobil mindestens 16px groß, besser 17px. Kein Text ist kleiner als 12px. Die Überschriften-Hierarchie ist lückenlos (axe-Regel `heading-order`). Der Seitenrand beträgt mobil mindestens 16px.

**Browser:** `clamp()` wird ab Safari 13.1 unterstützt. Schriftgrößen nie nur in `vw` angeben (siehe §15, Zoom).

---

## 3. Sticky Header mit dezentem Blur

**HIG:**
- [HIG-Materials]: Liquid Glass bildet *„a distinct functional layer for controls and navigation … that floats above the content layer“*. Die Variante „regular“ *„blurs and adjusts the luminosity of background content to maintain legibility“*.
- [HIG-Toolbars]: *„Reduce the use of toolbar backgrounds and tinted controls … use a ScrollEdgeEffectStyle when necessary to distinguish the toolbar area from the content area.“*
- [HIG-A11y]: Mindestkontrast **4.5:1** für Text bis 17 pt.

**Web-Umsetzung:**
```css
.site-header{
  position: sticky; top: 0; z-index: 50;
  padding-top: var(--sat);                       /* Notch/Dynamic Island bei viewport-fit=cover */
  min-height: calc(var(--header-h) + var(--sat));
  background: var(--brand-bg);                   /* opaker Fallback */
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-out);
}
@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))){
  .site-header{
    background: color-mix(in srgb, var(--brand-bg) 78%, transparent);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
            backdrop-filter: saturate(180%) blur(20px);
  }
}
.site-header.is-scrolled{ border-bottom-color: color-mix(in srgb, var(--brand-ink) 10%, transparent); }
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more){
  .site-header{ background: var(--brand-bg); -webkit-backdrop-filter:none; backdrop-filter:none; }
}
```

**QA:** Der Text im Header erreicht ≥ 4.5:1 gegen den *schlimmsten* Hintergrund darunter. Zum Testen über ein dunkles Hero-Foto und über weiße Fläche scrollen. Die Deckkraft der Fläche liegt bei mindestens 72 %. Die Haarlinie bzw. der Schatten erscheint erst nach dem Scrollen (wie der Scroll-Edge-Effekt). Mit deaktiviertem `backdrop-filter` (DevTools) bleibt der Header lesbar.

**Browser (Safari/WebKit):**
- Safari braucht bis Version 17 das Präfix `-webkit-backdrop-filter`, ab Safari 18 geht es auch ohne. **Beide Zeilen behalten.**
- Ein `backdrop-filter` auf einem Element mit `overflow:hidden` und `border-radius` kann in älterem WebKit Kanten-Artefakte erzeugen. Den Blur deshalb auf das Header-Element selbst legen, nicht auf ein Kind.
- Header-Elemente sollten nicht gleichzeitig `backdrop-filter` und `will-change: transform` haben, sonst flackert der Blur beim Scrollen auf iOS.
- **Safari 26 (iOS 26)** tönt seine kompakte, schwebende Browserleiste nach den Farben der Seite bzw. fixierter Elemente am Rand. Auf `<meta name="theme-color">` ist kein Verlass mehr. Den Header-Hintergrund deshalb als echte Farbe setzen (nicht als Bild) und am Gerät prüfen.
- `prefers-reduced-transparency` unterstützen vor allem Chromium-Browser. In Safari greift ersatzweise `prefers-contrast: more` (ab Safari 14.1).

---

## 4. Untere Aktionsleiste mobil („Termin buchen“)

**HIG:** [HIG-Layout] sagt: *„Respecting the safe area is essential to make sure system UI and hardware features … don't obstruct content and controls.“* [HIG-Buttons] empfiehlt: *„use a button that has a prominent visual style for the most likely action in a view.“* Im Daumenbereich unten liegt die primäre Aktion, so wie bei Toolbar und Tab Bar in iOS.

**Web-Umsetzung:**
```css
.action-bar{
  position: fixed; inset: auto 0 0 0; z-index: 40;
  padding: 12px var(--gutter) calc(12px + var(--sab));
  background: var(--brand-bg);              /* gleiches Blur-Muster wie §3 möglich */
  box-shadow: 0 -1px 0 color-mix(in srgb, var(--brand-ink) 8%, transparent);
  transition: transform var(--dur-base) var(--ease-out);
}
.action-bar .btn-primary{ width:100%; min-height: 50px; border-radius: var(--radius-pill); }
main{ padding-bottom: calc(var(--actionbar-h) + var(--sab) + 16px); }   /* Footer nicht verdecken */
.action-bar[data-hidden]{ transform: translateY(110%); }
@media (min-width: 768px){ .action-bar{ display:none; } main{ padding-bottom:0; } }
```
```js
// Leiste bei offener Tastatur ausblenden (iOS skaliert das Layout-Viewport nicht)
const bar = document.querySelector('.action-bar');
const isField = el => el.matches('input:not([type=radio]):not([type=checkbox]), textarea, select');
addEventListener('focusin', e => { if (isField(e.target)) bar.dataset.hidden = ''; });
addEventListener('focusout', () => setTimeout(() => {
  if (!isField(document.activeElement)) delete bar.dataset.hidden; }, 100));
```
Außerdem kann die Leiste auf der Kontaktsektion oder im Footer ausgeblendet werden, wenn dort schon ein „Termin buchen“-Button steht. Das geht per IntersectionObserver. Auf den Buchungs-Screens ersetzt die Schritt-Aktionsleiste (§13) diese Leiste.

**QA:** Auf einem iPhone mit Home-Indicator liegt der Button komplett über dem Indicator. Der letzte Footer-Link lässt sich vollständig scrollen und antippen. Beim Tippen in ein Formularfeld verschwindet die Leiste und schwebt nicht mitten über der Tastatur. Desktop zeigt keine Leiste.

**Browser:**
- `env(safe-area-inset-*)` ist nur mit `viewport-fit=cover` größer als 0 (seit iOS 11).
- iOS Safari verkleinert bei geöffneter Tastatur nur das *Visual Viewport*. `position:fixed; bottom:0` hängt am Layout-Viewport und springt oder liegt hinter der Tastatur. Deshalb wird die Leiste ausgeblendet. Die Viewport-Option `interactive-widget=resizes-content` kennt Safari nicht.
- **Safari 26:** Die Browserleiste schwebt unten über dem Inhalt. Fixierte Leisten mit Safe-Area-Padding werden von Safari korrekt darüber angeordnet. Trotzdem am Gerät prüfen, dass der Button nicht mit der Safari-Leiste kollidiert, im kompakten wie im ausgefahrenen Zustand.
- Hintergrund und Leiste verwenden die gleiche Farbe, damit Safari 26 die Toolbar passend tönt.

---

## 5. Bottom-Sheets statt zentrierter Modals auf dem Handy

**HIG [HIG-Sheets]:**
- Ein Sheet dient *„requesting specific information … or presenting a simple task that they can complete before returning to the parent view“*.
- *„Display only one sheet at a time.“*
- Zu Detents: *„large is the height of a fully expanded sheet and medium is about half“*. *„Include a grabber in a resizable sheet … they can also tap it to cycle through the detents.“*
- *„Support swiping to dismiss a sheet … If people have unsaved changes … let them confirm.“*
- Buttons: Cancel/Close vorne links, Done hinten rechts (aktualisiert am 24. März 2026). *„Avoid showing all three buttons — Cancel, Done, and Back — together.“*
- *„For complex or prolonged user flows, consider alternatives to sheets“*, also einen Vollbild-Flow. **Darum gehört der eigentliche Buchungsflow auf eigene Seiten oder Schritte (§13). Sheets nutzen wir für Leistungsdetails, Filter, die Auswahl der Mitarbeiterin und Infos zu Stornobedingungen.**

**Web-Umsetzung:**
```html
<dialog class="sheet" id="svc-sheet" aria-labelledby="svc-title">
  <div class="sheet__grabber" role="button" tabindex="0" aria-label="Größe ändern"></div>
  <header class="sheet__bar">
    <button class="icon-btn" data-close aria-label="Schließen">✕</button>
    <h2 id="svc-title">Balayage</h2>
  </header>
  <div class="sheet__body">…</div>
</dialog>
```
```css
.sheet{
  position: fixed; inset: auto 0 0 0; margin: 0; width: 100%; max-width: 100%;
  max-height: calc(100dvh - var(--sat) - 12px);
  padding: 0 0 var(--sab); border: 0;
  border-radius: var(--radius-sheet) var(--radius-sheet) 0 0;
  background: var(--brand-bg); color: var(--brand-ink);
  display: flex; flex-direction: column;
  transform: translateY(0); transition: transform var(--dur-sheet) var(--ease-sheet);
}
.sheet:not([open]){ display:none; }
.sheet[data-detent="medium"]{ height: 50dvh; }
.sheet[data-detent="large"] { height: calc(100dvh - var(--sat) - 12px); }
.sheet.is-entering, .sheet.is-leaving{ transform: translateY(100%); }
.sheet::backdrop{ background: rgb(0 0 0 / .35); transition: opacity var(--dur-sheet) var(--ease-out); }
.sheet__body{ overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; flex:1; }
.sheet__grabber{ width: 36px; height: 5px; border-radius: 3px; margin: 6px auto;
  background: color-mix(in srgb, var(--brand-ink) 25%, transparent);
  /* Trefferfläche 44px trotz kleiner Optik: */ padding-block: 20px; background-clip: content-box;
  touch-action: none; cursor: grab; }
:root:has(dialog[open]){ overflow: hidden; }          /* Scroll-Lock */
html{ scrollbar-gutter: stable; }                       /* kein Layout-Sprung am Desktop */
@media (min-width: 768px){                              /* Desktop/Tablet: zentriertes Modal */
  .sheet{ inset: 0; margin: auto; width: min(560px, 92vw); height: auto; border-radius: var(--radius-card); }
}
@media (prefers-reduced-motion: reduce){ .sheet, .sheet::backdrop{ transition: none; } }
```
```js
function openSheet(dlg, detent = 'medium'){
  dlg._opener = document.activeElement;
  dlg.dataset.detent = detent;
  dlg.classList.add('is-entering');
  dlg.showModal();                       // Fokus-Falle, ESC, inert-Hintergrund nativ
  requestAnimationFrame(() => requestAnimationFrame(() => dlg.classList.remove('is-entering')));
}
function closeSheet(dlg){
  dlg.classList.add('is-leaving');
  const done = () => { dlg.classList.remove('is-leaving'); dlg.close(); };
  matchMedia('(prefers-reduced-motion: reduce)').matches ? done()
    : dlg.addEventListener('transitionend', done, { once: true });
}
document.addEventListener('click', e => {
  const dlg = e.target.closest('dialog.sheet');
  if (e.target.matches('[data-close]')) closeSheet(dlg);
  else if (e.target.matches('dialog.sheet')) closeSheet(e.target);      // Klick auf Backdrop
});
for (const dlg of document.querySelectorAll('dialog.sheet')){
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeSheet(dlg); });  // ESC animiert
  dlg.addEventListener('close', () => dlg._opener?.focus());                       // Fokusrückgabe
}
// Optional: Swipe-to-dismiss am Grabber/Header
function enableSwipe(dlg){
  const handle = dlg.querySelector('.sheet__grabber'); let y0 = null, dy = 0;
  handle.addEventListener('pointerdown', e => { y0 = e.clientY; dlg.style.transition = 'none'; handle.setPointerCapture(e.pointerId); });
  handle.addEventListener('pointermove', e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); dlg.style.transform = `translateY(${dy}px)`; });
  handle.addEventListener('pointerup', () => { dlg.style.transition = ''; dlg.style.transform = '';
    if (dy > dlg.offsetHeight * .25) closeSheet(dlg); y0 = null; dy = 0; });
  handle.addEventListener('click', () => dlg.dataset.detent = dlg.dataset.detent === 'medium' ? 'large' : 'medium');
}
```

**QA:**
- Das Sheet öffnet von unten, hat einen Grabber und einen Schließen-Button oben links (Cancel-Position laut HIG).
- **ESC** schließt das Sheet. Ein Tippen auf den Backdrop schließt es ebenfalls.
- Der Fokus geht beim Öffnen ins Sheet und kehrt beim Schließen zum auslösenden Button zurück.
- Tab bleibt im Sheet (natives `showModal`). VoiceOver liest den Hintergrund nicht vor.
- Scrollen im Sheet scrollt die Seite dahinter nicht mit (kein Scroll-Chaining). Die Seite springt beim Öffnen nicht horizontal.
- Auf Desktop ist das Sheet zentriert. Es ist immer nur ein Sheet offen.
- Hat das Formular im Sheet ungespeicherte Eingaben, fragt Swipe bzw. ESC nach.

**Browser:**
- `<dialog>` und `showModal()` gibt es ab Safari 15.4, `inert` ab Safari 15.5, `:has()` ab 15.4, `overscroll-behavior` ab Safari 16. `showModal()` macht den Hintergrund automatisch inert. Ein manuelles `inert` ist nur für Nicht-Dialog-Overlays nötig.
- **Scroll-Lock auf iOS:** `overflow:hidden` auf `html` greift in aktuellen iOS-Versionen (ab 16) weitgehend. Ein Gummiband-Scrollen des Hintergrunds kann trotzdem auftreten. `overscroll-behavior: contain` am Sheet-Body und ein Backdrop, das Touch-Events schluckt, genügen meist. **Nicht** auf das alte `position:fixed`-Body-Hack zurückfallen, außer QA findet echte Probleme: Es setzt die Scrollposition zurück und erzeugt Sprünge.
- Die Ausblend-Animation des Top-Layers (`overlay`, `transition-behavior: allow-discrete`) ist in Safari nicht vollständig zuverlässig. Deshalb wird oben per Klasse animiert und `close()` erst nach `transitionend` aufgerufen. `@starting-style` (Safari 17.5) wäre die rein deklarative Alternative fürs Einblenden.
- Das Attribut `closedby="any"` (Light Dismiss) ist noch nicht überall verfügbar. Deshalb gibt es den JS-Backdrop-Klick.
- Auf iOS ist `100dvh` im Sheet besser als `100vh`, das sonst unter die Safari-Leiste ragt.
- Liegt ein Input im Sheet, schiebt iOS das Visual Viewport. Inputs im Sheet sollten deshalb weit oben liegen oder das Sheet sollte bei Fokus auf `large` gehen.

---

## 6. Segmented Controls statt Dropdowns

**HIG [HIG-Seg]:** *„all segments are usually equal in width“*. *„no more than about five segments on iPhone“*. *„Use nouns or noun phrases for segment labels.“* *„Consider a segmented control to switch between closely related subviews.“* Text und Icons nicht mischen.

**Einsatz:** Kategorien wie „Haare · Nägel · Kosmetik“, Vormittag/Nachmittag, „Beliebige Mitarbeiterin · Wunsch“. Ab 6 Optionen nehmen wir eine Liste oder Chips (§11).

**Web-Umsetzung (echte Radiogruppe, ohne ARIA-Nachbau):**
```html
<fieldset class="seg" aria-label="Kategorie">
  <input type="radio" name="cat" id="c1" value="hair" checked><label for="c1">Haare</label>
  <input type="radio" name="cat" id="c2" value="nails"><label for="c2">Nägel</label>
  <input type="radio" name="cat" id="c3" value="face"><label for="c3">Kosmetik</label>
</fieldset>
```
```css
.seg{ display:grid; grid-auto-flow:column; grid-auto-columns:1fr; gap:2px; padding:2px; border:0;
  border-radius: var(--radius-pill); background: color-mix(in srgb, var(--brand-ink) 7%, transparent); }
.seg input{ position:absolute; opacity:0; pointer-events:none; }
.seg label{ min-height: var(--tap); display:grid; place-items:center; border-radius: var(--radius-pill);
  font-weight:600; transition: background-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.seg input:checked + label{ background: var(--brand-bg); box-shadow: 0 1px 3px rgb(0 0 0 / .12); }
.seg input:focus-visible + label{ outline: 2px solid var(--brand-accent); outline-offset: 2px; }
```

**QA:** Pfeiltasten wechseln die Auswahl, denn das ist natives Radio-Verhalten. VoiceOver sagt z. B. „Haare, Optionsfeld, ausgewählt, 1 von 3“. Alle Segmente sind gleich breit. Es gibt höchstens 5 Segmente. Die Labels passen bei 320px Breite ohne Umbruch.

**Browser:** Inputs nie mit `display:none` verstecken, sonst sind sie nicht mehr fokussierbar und VoiceOver überspringt sie. Wird ein „gleitender“ Indikator (Pill, die verschoben wird) per JS ergänzt, muss er unter `prefers-reduced-motion` springen statt gleiten.

---

## 7. iOS-artige Listen-Zellen (inset grouped) mit Chevron

**HIG [HIG-Lists]:** *„the grouped style uses headers, footers, and additional space to separate groups of data“*. *„If you need to let people drill into a list or table row's subviews, use a disclosure indicator.“* *„Provide appropriate feedback when people select a list item.“* *„Keep item text succinct.“*

**Einsatz:** Leistungsübersicht und Preisliste (Leistung, Dauer, Preis, Chevron), Kontakt/Öffnungszeiten, Zusammenfassung im Buchungsschritt.

**Web-Umsetzung:**
```html
<section class="group" aria-labelledby="g-hair">
  <h3 id="g-hair" class="group__header">Haare</h3>
  <ul class="group__list" role="list">
    <li><a class="cell" href="/leistungen/balayage">
      <span class="cell__main"><span class="cell__title">Balayage</span><span class="cell__sub">120 min</span></span>
      <span class="cell__value">ab € 180</span><svg class="cell__chevron" aria-hidden="true">…</svg></a></li>
  </ul>
</section>
```
```css
.group{ margin: 0 var(--gutter) 32px; }
.group__header{ font-size: var(--fs-footnote); text-transform: uppercase; letter-spacing:.04em; opacity:.65; margin: 0 16px 8px; }
.group__list{ list-style:none; margin:0; padding:0; border-radius: var(--radius-cell); overflow:hidden; background: var(--brand-surface); }
.cell{ display:flex; align-items:center; gap:12px; min-height: 52px; padding: 10px 16px; color:inherit; text-decoration:none; }
.group__list li{ position:relative; }
.group__list li + li::before{ content:""; position:absolute; top:0; left:16px; right:0; height:1px;
  background: color-mix(in srgb, var(--brand-ink) 10%, transparent); }   /* eingerückte Trennlinie */
.cell__main{ flex:1; display:grid; } .cell__sub{ font-size: var(--fs-footnote); opacity:.65; }
.cell__chevron{ width:8px; height:14px; opacity:.35; flex:none; }
.cell:active{ background: color-mix(in srgb, var(--brand-ink) 6%, transparent); }
```

**QA:** Jede Zelle ist mindestens 44px hoch (Ziel 52px bei zweizeiligen Zellen). Ein Chevron steht nur bei Navigation (Link), nicht bei Auswahl (dort ein Häkchen). Die Trennlinien sind eingerückt und fehlen an der ersten Zelle. Beim Tippen gibt es sichtbares Feedback. Bei 200 % Textgröße bricht der Titel um, ohne abgeschnitten zu werden.

**Browser:** `overflow:hidden` mit `border-radius` am Listen-Container funktioniert in Safari. Bei verschachteltem `backdrop-filter` kann es aber zu Clipping-Fehlern kommen, deshalb in Zellen keinen Blur verwenden.

---

## 8. Weiche, kurze Übergänge (150–300 ms, ease-out)

**HIG [HIG-Motion]:**
- *„Add motion purposefully … Don't add motion for the sake of adding motion.“*
- *„Aim for brevity and precision in feedback animations.“*
- *„generally avoid adding motion to UI interactions that occur frequently.“*
- *„Let people cancel motion … don't make people wait for an animation to complete.“*
- *„Make motion optional“*.

[HIG-A11y] fordert bei Reduce Motion: *„reducing automatic and repetitive animations, including zooming, scaling, and peripheral motion.“*

**Web-Umsetzung:**
```css
/* Tokens siehe §0 */
.btn{ transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out); }
.fade-in{ animation: fade-up var(--dur-base) var(--ease-out) both; }
@keyframes fade-up{ from{ opacity:0; transform: translateY(8px); } }
@media (prefers-reduced-motion: reduce){
  *, *::before, *::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important;
    transition-duration:.01ms !important; scroll-behavior:auto !important; }
}
```
**Dauern:** 150ms für Tap-Feedback und Hover, 200–250ms für Ein- und Ausblenden und Segment-Wechsel, 300–350ms für Sheet-Einfahrt. Das Ausfahren ist rund 20 % kürzer. Das Easing ist `cubic-bezier(.2,.8,.2,1)` (ease-out) bzw. `cubic-bezier(.32,.72,0,1)` für Sheets. Animiert werden nur `transform` und `opacity`.

**QA:** Keine Animation dauert länger als 400ms (ausgenommen Hero-Media). Mit aktivierter Einstellung „Bewegung reduzieren“ (iOS) bzw. der Emulation in den DevTools gibt es keine Slide- oder Scale-Bewegung mehr, nur sofortige Wechsel. Es gibt keine Autoplay-Karussells ohne Pause-Button. Interaktionen sind auch während einer laufenden Animation möglich.

**Browser:** `prefers-reduced-motion` gibt es ab Safari 10.1. iOS-Safari ruckelt bei animiertem `box-shadow` und `filter`, besser die `opacity` eines Pseudo-Elements animieren.

---

## 9. 100dvh/svh statt 100vh

**HIG:** [HIG-Layout] verlangt, Safe Areas und System-UI zu respektieren, siehe §4. Das Web-Äquivalent sind die dynamischen Viewport-Einheiten.

**Web-Umsetzung:**
```css
.hero{ min-height: 100vh; min-height: 100svh; }      /* Hero: kleinste Höhe, kein Springen beim Scrollen */
.fullscreen-step{ min-height: 100dvh; }               /* Buchungsschritt: folgt der Safari-Leiste */
```
Für die meisten Layouts eignet sich **`svh`**, denn `dvh` ändert sich beim Ein- und Ausfahren der Safari-Leiste und kann Layout-Neuberechnungen und Sprünge auslösen. `dvh` nur bei Fullscreen-Containern und Sheets verwenden.

**QA:** Kein Element mit `100vh` ohne `svh`/`dvh`-Override (per grep prüfbar). Auf dem iPhone ist der Hero-CTA beim ersten Laden sichtbar und wird nicht von der Safari-Leiste verdeckt.

**Browser:** `svh`/`lvh`/`dvh` gibt es ab Safari 15.4, daher `100vh` als Fallback davor. Das Verhalten mit der schwebenden Leiste in Safari 26 am Gerät prüfen.

---

## 10. Formularfelder ≥ 16px, inputmode/autocomplete/enterkeyhint

**HIG:** [HIG-Typo] nennt 17 pt als Standardgröße. Allgemein gilt: Eingaben minimieren und passende Tastaturen anbieten. Speziell für Pickers bei Datum/Zeit siehe §14.

**Web-Umsetzung:**
```html
<label for="n">Name</label>
<input id="n" name="name" autocomplete="name" autocapitalize="words" enterkeyhint="next" required>
<label for="t">Telefon</label>
<input id="t" name="tel" type="tel" inputmode="tel" autocomplete="tel" enterkeyhint="next" required>
<label for="e">E-Mail</label>
<input id="e" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" enterkeyhint="next">
<label for="m">Anmerkung</label>
<textarea id="m" name="note" enterkeyhint="done"></textarea>
```
```css
input, select, textarea{ font-size: max(16px, 1rem); min-height: var(--tap); padding: 12px 14px;
  border-radius: var(--radius-cell); }
```

**QA:** Die berechnete `font-size` jedes Feldes ist ≥ 16px. Beim Tippen auf ein Feld zoomt iOS nicht. Telefon öffnet die Ziffern-Tastatur, E-Mail die Tastatur mit „@“. Autofill bietet Name, Telefon und E-Mail aus dem iOS-Kontakt an. Die Enter-Taste heißt „Weiter“ bzw. im letzten Feld „Fertig“. Jedes Feld hat ein sichtbares `<label>` (keine Placeholder-only-Felder). Fehlermeldungen sind per `aria-describedby` verbunden.

**Browser:**
- iOS Safari zoomt automatisch, wenn ein Feld < 16px ist. **Keinesfalls** mit `maximum-scale=1` im Viewport „lösen“, das bricht den Pinch-Zoom (WCAG 1.4.4).
- `enterkeyhint` gibt es ab Safari 13.1.
- Telefonnummern aus Österreich: Placeholder „+43 …“. Der Server sollte locker validieren und Leerzeichen erlauben.

---

## 11. -webkit-tap-highlight-color: transparent + eigener :active-Zustand

**HIG:** [HIG-Lists] sagt *„Provide appropriate feedback when people select“*. [HIG-Motion] empfiehlt kurzes, präzises Feedback.

**Web-Umsetzung:**
```css
a, button, label, [role="button"], .cell, .chip{ -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
.btn:active{ transform: scale(.97); filter: brightness(.95); }
.cell:active, .chip:active{ background-color: color-mix(in srgb, var(--brand-ink) 6%, transparent); }
@media (hover:hover){ .btn:hover{ filter: brightness(1.04); } }   /* Hover nur auf echten Hover-Geräten */
```
```js
document.addEventListener('touchstart', () => {}, { passive: true }); // aktiviert :active in älterem iOS-Safari
```

**QA:** Beim Tippen erscheint kein graues oder blaues iOS-Highlight-Rechteck, stattdessen das eigene Feedback innerhalb von etwa 100ms. Auf dem Handy „klebt“ kein Hover-Zustand nach dem Tippen. Ein Doppeltipp zoomt nicht (wegen `touch-action: manipulation`).

**Browser:** `-webkit-tap-highlight-color` ist WebKit-spezifisch und wird von anderen Browsern ignoriert. Ohne Touch-Listener zeigt iOS `:active` teilweise nicht an. Unter `prefers-reduced-motion` das `scale` weglassen, Farbänderung reicht.

---

## 12. Natives Scrollen, scroll-padding-top, scroll-behavior

**HIG:** [HIG-Motion] fordert *„realistic feedback motion that follows people's gestures“*. [HIG-Toolbars] beschreibt den Inhalt, der unter der Leiste durchscrollt. Daraus folgt: kein Scroll-Hijacking, das Momentum-Scrollen von iOS bleibt unangetastet.

**Web-Umsetzung:**
```css
html{ scroll-padding-top: calc(var(--header-h) + var(--sat) + 8px); }
@media (prefers-reduced-motion: no-preference){ html{ scroll-behavior: smooth; } }
.carousel{ display:flex; overflow-x:auto; scroll-snap-type: x mandatory; gap:12px;
  scroll-padding-inline: var(--gutter); padding-inline: var(--gutter); overscroll-behavior-x: contain; scrollbar-width: none; }
.carousel > *{ scroll-snap-align: start; flex: 0 0 82%; }
```

**QA:** Anker-Links (z. B. `#preise`) landen mit der Überschrift sichtbar *unter* dem Sticky Header. Es gibt keine Bibliotheken, die `wheel`/`touchmove` abfangen (z. B. Smooth-Scroll-Libs, Fullpage-Scroller). Mit Reduce Motion springen Anker sofort. Ein horizontales Karussell lässt die nächste Karte sichtbar „anschneiden“, damit klar ist, dass es weitergeht.

**Browser:** `scroll-behavior: smooth` gibt es ab Safari 15.4. Wird per JS gescrollt, `scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'})` verwenden. Das respektiert `scroll-padding`. Keine `touchmove`-Listener mit `passive:false` auf `document` setzen, das blockiert das Scrollen auf iOS.

---

## 13. Schrittflows für die Buchung (Navigation Stack + Progress)

**HIG:**
- [HIG-Toolbars]: *„Use the standard Back and Close buttons … Prefer the standard symbols … don't use a text label that says Back or Close.“* Back sitzt an der *leading edge*, also oben links. Der Titel ist kurz (unter 15 Zeichen).
- [HIG-Sheets]: Komplexe Flows gehören in einen Vollbild-Flow statt in ein Sheet. Back ist zum Zurückgehen da, nicht zum Schließen.
- [HIG-Buttons]: eine prominente primäre Aktion pro View.

**Flow-Vorschlag:** 1 Leistung → 2 Mitarbeiterin (optional) → 3 Datum & Uhrzeit → 4 Kontaktdaten → 5 Prüfen & Bestätigen → Erfolgsseite.

**Web-Umsetzung:**
```html
<header class="flow-bar">
  <a class="icon-btn" href="?step=2" aria-label="Zurück zu Mitarbeiterin">‹</a>
  <h1 class="flow-bar__title">Termin wählen</h1>
  <a class="icon-btn" href="/" aria-label="Buchung abbrechen">✕</a>
</header>
<div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3"
     aria-valuetext="Schritt 3 von 5: Datum und Uhrzeit"><span style="--p:.6"></span></div>
<main>…</main>
<footer class="action-bar"><button class="btn-primary" type="submit" disabled>Weiter</button></footer>
```
```css
.flow-bar{ position:sticky; top:0; display:grid; grid-template-columns: var(--tap) 1fr var(--tap);
  align-items:center; padding: var(--sat) 8px 0; min-height: calc(var(--header-h) + var(--sat)); }
.flow-bar__title{ font-size: 1.0625rem; font-weight: 600; text-align:center; margin:0; }
.progress{ height:3px; background: color-mix(in srgb, var(--brand-ink) 10%, transparent); }
.progress span{ display:block; height:100%; width: calc(var(--p) * 100%); background: var(--brand-accent);
  transition: width var(--dur-base) var(--ease-out); }
```
**Verhalten:** Jeder Schritt hat eine eigene URL bzw. einen History-Eintrag (`?step=3` oder `history.pushState`). Dadurch funktionieren die Back-Wischgeste von iOS-Safari und der Browser-Back-Button wie erwartet. Beim Schrittwechsel wandert der Fokus auf die H1 des neuen Schritts (`tabindex="-1"`). Eingaben bleiben bei Zurück erhalten (sessionStorage). Optional gibt es einen Slide-Übergang (Push von rechts, ca. 300ms) über die View Transitions API (Safari 18+), bei reduced-motion nur Crossfade oder nichts.

**QA:**
- Oben links steht ein Zurück-Button mit dem Ziel als `aria-label`. Abbrechen ist erreichbar, aber nie gleichzeitig mit „Fertig“ und „Zurück“ als drei Buttons.
- Der Fortschritt ist sichtbar und wird angesagt („Schritt 3 von 5“).
- Die primäre Aktion steht unten im Daumenbereich und ist deaktiviert, bis eine gültige Auswahl getroffen ist. Es wird angezeigt, *warum* sie deaktiviert ist.
- Browser-Back führt zum vorherigen Schritt, nicht aus dem Flow heraus. Ein Reload verliert keine Eingaben.
- Der Flow lässt sich komplett mit der Tastatur bedienen.

**Browser:** Die Edge-Swipe-Back-Geste von iOS-Safari wird *nicht* abgefangen (keine horizontalen Wisch-Handler am linken Rand). View Transitions über mehrere Dokumente (`@view-transition { navigation: auto; }`) gibt es ab Safari 18.2. Ohne Unterstützung wird einfach ohne Animation geladen.

---

## 14. Date Picker / Kalender und Time-Slots als Chips

**HIG [HIG-Pickers]:** Es gibt die Stile *„Inline — … for dates and times, an inline calendar view.“* und *„Compact“*. *„The exact values shown in a date picker, and their order, depend on the device location.“* *„Consider providing less granularity when specifying minutes … quarter-hour intervals.“*

**Konventionen für AT:** Die Woche beginnt am **Montag**. Wochentage werden abgekürzt („Mo Di Mi Do Fr Sa So“). Datumsformat „Di., 14. Okt.“, Uhrzeit 24h („14:30“). Vergangene und geschlossene Tage (z. B. So/Mo, Feiertage) sind ausgegraut und nicht wählbar. „Heute“ ist markiert. Slots gibt es im 15- oder 30-Minuten-Raster, nur verfügbare werden angezeigt.

**Web-Umsetzung:** Wir verwenden einen eigenen Inline-Kalender, weil `<input type="date">` keine Verfügbarkeit zeigen kann. Die Slots sind eine Radiogruppe als Chips.
```html
<div class="cal" role="grid" aria-label="Oktober 2026">
  <div role="row" class="cal__dow"><span role="columnheader" aria-label="Montag">Mo</span>…</div>
  <div role="row">
    <button role="gridcell" aria-selected="false" aria-disabled="true" disabled>12</button>
    <button role="gridcell" aria-selected="true" aria-current="date">13</button>…
  </div>
</div>
<fieldset class="slots"><legend>Vormittag</legend>
  <input type="radio" name="slot" id="s0930" value="09:30"><label for="s0930">09:30</label> …
</fieldset>
```
```css
.cal{ display:grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal [role=row]{ display: contents; }
.cal button{ aspect-ratio:1; min-height: var(--tap); border-radius: 50%; font-variant-numeric: tabular-nums; }
.cal [aria-selected=true]{ background: var(--brand-accent); color: var(--brand-on-accent); }
.cal [aria-current=date]{ font-weight:700; }
.slots{ display:flex; flex-wrap:wrap; gap:8px; border:0; padding:0; }
.slots input{ position:absolute; opacity:0; }
.slots label{ min-height: var(--tap); min-width: 76px; display:grid; place-items:center; padding: 0 14px;
  border-radius: var(--radius-pill); border:1px solid color-mix(in srgb, var(--brand-ink) 18%, transparent); font-variant-numeric: tabular-nums; }
.slots input:checked + label{ background: var(--brand-accent); color: var(--brand-on-accent); border-color: transparent; }
.slots input:focus-visible + label{ outline: 2px solid var(--brand-accent); outline-offset: 2px; }
```
```js
const fmt = new Intl.DateTimeFormat('de-AT', { weekday:'short', day:'numeric', month:'short' });
// Wochenstart: fest Montag (AT). Intl.Locale('de-AT').getWeekInfo?.().firstDay === 1 als Kontrolle.
const offset = (new Date(y, m, 1).getDay() + 6) % 7;   // Mo=0 … So=6
```
Tastatur im Kalender: Pfeile bewegen um ±1 Tag bzw. ±7 Tage, Bild↑/↓ wechselt den Monat, Home/End springen an Wochenanfang bzw. -ende (Roving-Tabindex-Muster aus den WAI-ARIA APG „Date Picker Dialog“). Die Monatsnavigation erfolgt über die Buttons „‹ ›“ mit `aria-label="Nächster Monat"`.

**QA:** Montag steht in der ersten Spalte. Vergangene und geschlossene Tage sind deaktiviert und als solche angesagt. Jeder Tag ist mindestens 44×44px groß (bei 320px Breite: 7 × 44 + 6 × 4 = 332px, deshalb Gap 2px oder Rand 8px). Bei 320px prüfen. Uhrzeiten stehen im 24h-Format mit tabellarischen Ziffern. Nach der Datumswahl rücken die Slots in Sicht (`scrollIntoView`). Gibt es keine Slots, erscheint eine klare Meldung mit dem Vorschlag „Nächster freier Termin: …“.

**Browser:** `Intl.Locale.prototype.getWeekInfo` gibt es ab Safari 17 (davor als Property `weekInfo`). Deshalb wird Montag fest verdrahtet. `aspect-ratio` gibt es ab Safari 15. Native `<input type="date">` öffnet auf iOS ein Rad bzw. Popover ohne Verfügbarkeiten und eignet sich höchstens als No-JS-Fallback.

---

## 15. Fokus-Sichtbarkeit, Dynamic Type, Kontrast

**HIG [HIG-A11y]:**
- *„give people the option to enlarge text by at least 200 percent“*.
- Kontrast: Text bis 17 pt mindestens **4.5:1**, größerer bzw. fetter Text 3:1.
- Bei Increase Contrast soll eine kontrastreichere Variante angeboten werden.
- [HIG-Layout]: *„Be prepared for text-size changes.“*
- [HIG-Typo]: *„Keep text truncation to a minimum as font size increases.“*

**Web-Umsetzung:**
```css
:focus-visible{ outline: 2px solid var(--brand-focus, currentColor); outline-offset: 3px; border-radius: inherit; }
:focus:not(:focus-visible){ outline: none; }
/* Dynamic Type von iOS ans Web durchreichen (nur iOS/iPadOS Safari, Markenschrift bleibt) */
@supports (font: -apple-system-body) and (-webkit-touch-callout: default){
  html{ font: -apple-system-body; font-family: var(--brand-font); }   /* 1rem folgt dann der iOS-Textgröße */
}
@media (prefers-contrast: more){ :root{ --brand-ink: #000; --hairline-alpha: 30%; } }
```
Alle Größen werden in `rem` bzw. `clamp(rem, …)` angegeben, damit Browser-Zoom und Dynamic Type mitskalieren. Container wachsen in der Höhe (`min-height` statt `height`). Text wird nicht mit `white-space:nowrap` abgeschnitten.

**QA:**
- Bei Tab-Navigation hat jedes fokussierbare Element einen sichtbaren Rahmen mit ≥ 3:1 Kontrast zum Hintergrund. Beim Tippen bzw. Klicken erscheint kein Fokusrahmen.
- Bei 200 % Browser-Zoom und bei iOS-Textgröße „XXXL“ ist nichts abgeschnitten und es gibt kein horizontales Scrollen.
- axe/Lighthouse meldet keine `color-contrast`-Fehler. Die Markenfarben auf Buttons sind geprüft, ggf. wird für Text eine dunklere Akzentvariante definiert.

**Browser:** `-apple-system-body` gibt es nur in WebKit. Auf macOS-Safari ergibt es 13px, deshalb ist es per `-webkit-touch-callout` auf Touch-iOS begrenzt. **Im Team entscheiden und am Gerät prüfen.** Ohne diesen Trick skaliert iOS-Safari Webseiten *nicht* mit Dynamic Type, nur über „Seitenzoom“ (aA-Menü). `:focus-visible` gibt es ab Safari 15.4.

---

## 16. Haptik / Feedback-Ersatz im Web

**HIG [HIG-Haptics]:** *„Use system-provided haptic patterns according to their documented meanings“*. *„Use haptics consistently.“* [HIG-Motion]: *„avoid using [motion] as the only way to communicate important information … supplement visual feedback by also using alternatives like haptics and audio.“*

**Web-Umsetzung:** iOS-Safari unterstützt **kein** `navigator.vibrate()`. Ersatz:
1. sofortiges visuelles Feedback (`:active`, §11),
2. ein kurzer Zustandswechsel mit Bestätigung, z. B. ein Häkchen-Icon bei Slot-Auswahl und eine Erfolgsseite mit Zusammenfassung,
3. Live-Regionen für Screenreader: `<p role="status" aria-live="polite">Termin 09:30 ausgewählt</p>`,
4. progressiv auf Android: `navigator.vibrate?.(10)` nur bei wichtigen Bestätigungen (Buchung abgeschickt) und nie bei reduced-motion-Kontext oder Fehlern im Dauerfeuer.

Optional: Ein natives `<input type="checkbox" switch>` (Safari 17.4+) löst auf iOS 18+ eine System-Haptik aus. Das bieten wir **nicht** als Haptik-Hack für andere Controls an, weil es fragil ist.

**QA:** Jede Auswahl hat eine sichtbare und eine per Screenreader angesagte Bestätigung. Keine Information wird nur über Bewegung oder Vibration vermittelt.

---

## 17. Dark Mode

**HIG [HIG-Dark]:** *„people … generally expect all apps … to respect their preference.“* *„Avoid offering an app-specific appearance setting.“* *„Ensure that your app looks good in both appearance modes.“* Dark-Mode-Farben sind *„not necessarily inversions“*.

**Empfehlung für Hello Beauty:** Für eine Marken-Website ist Dark Mode **optional**. Die Markenwirkung (helle, warme Salonästhetik) hat Vorrang. Sauber minimal:
```html
<meta name="color-scheme" content="light">
```
```css
:root{ color-scheme: light; }  /* verhindert, dass iOS Formularelemente/Scrollbars dunkel rendert */
```
Wird Dark Mode umgesetzt, dann ohne eigenen Umschalter (laut HIG), über `@media (prefers-color-scheme: dark)` mit eigens gewählten dunklen Markentönen (keine Inversion), `color-scheme: light dark` und geprüften Fotos (keine weißen Kästen um Logos/PNG).

**QA:** Ist Dark Mode nicht geplant, sehen Formularelemente, Datums-Inputs und Scrollbars bei aktivem iOS-Dark-Mode trotzdem hell und konsistent aus, es gibt keine schwarzen Inputs auf heller Seite. Ist er geplant, wird der Kontrast in beiden Modi geprüft.

**Browser:** Ohne `color-scheme` rendert Safari Standard-Controls bei Dark Mode teils dunkel. Safari 26 nutzt die Seitenfarben für die Tönung der Browserleiste, deshalb `body{ background: … }` immer explizit setzen.

---

## 18. Liquid Glass (iOS 26, 2025): was sich ins Web übertragen lässt und was nicht

**HIG [HIG-Materials], aktualisiert am 9. Juni und 9. September 2025:**
- Liquid Glass ist *„a distinct functional layer for controls and navigation“*.
- *„Don't use Liquid Glass in the content layer.“*
- *„Use Liquid Glass effects sparingly … Limit these effects to the most important functional elements.“*
- „Regular“-Variante für Elemente mit Text, „clear“ nur über medienreichen Hintergründen, *„If the underlying content is bright, consider adding a dark dimming layer of 35% opacity.“*
- [HIG-Layout] (2025/2026): *„Instead of applying a solid or semi-opaque background color beneath controls, use a scroll edge effect.“*
- [HIG-Toolbars]: *„Reduce the use of toolbar backgrounds and tinted controls.“*

| Übertragbar ins Web (sinnvoll) | Nicht übertragen (bzw. bewusst weglassen) |
|---|---|
| **Ebenen-Logik:** Glas/Blur *nur* für Steuerungsebene (Sticky Header, untere Aktionsleiste, ggf. Sheet-Kopf), nie für Content-Karten | Lichtbrechung/Linsen-Verzerrung, spekulare Glanzkanten, „Flüssig“-Morphing (nur mit SVG-Filtern/WebGL, teuer, schlechte Lesbarkeit, Akku) |
| Dezenter Blur `saturate(180%) blur(20px)` auf 72–80 % deckender Markenfläche | Klare (clear) Glasflächen mit Text über Fotos |
| Scroll-Edge-Effekt: Haarlinie/weicher Verlauf erst beim Scrollen | Bewegungsreaktive Spiegelungen (DeviceMotion), Parallax |
| Abgerundete, „konzentrische“ Formen: Pill-Buttons, Sheet-Radius ≥ Inhaltsradius | Schwebende Tab-Bar-Kapseln, die beim Scrollen schrumpfen (Website hat keine Tab-Bar-Navigation) |
| Dimming-Layer 35 % hinter Text auf hellen Fotos (Hero-Overlay) | Eigene Nachbauten von iOS-Systemleisten |
| Fallback: opake Fläche bei `prefers-reduced-transparency`/`prefers-contrast: more` oder ohne `backdrop-filter` | Glas auf vielen Elementen gleichzeitig (Performance auf älteren iPhones, HIG „sparingly“) |

**Web-Umsetzung (Scroll-Edge statt harter Balken):**
```css
.site-header::after{ content:""; position:absolute; inset:100% 0 auto; height:12px; pointer-events:none;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--brand-bg) 60%, transparent), transparent);
  opacity:0; transition: opacity var(--dur-base) var(--ease-out); }
.site-header.is-scrolled::after{ opacity:1; }
```

**QA:** Höchstens 2–3 Elemente pro Screen haben `backdrop-filter` (Header, Aktionsleiste, ggf. Sheet-Kopf). Content-Karten haben keinen Blur. Scrollen auf einem älteren iPhone (z. B. iPhone 11/SE) ist flüssig (Safari-Web-Inspector → Timeline: keine langen Frames). Mit Reduce Transparency bzw. Increase Contrast bleibt alles lesbar.

**Browser:** Jeder `backdrop-filter` erzeugt in WebKit eine eigene Compositing-Ebene, viele davon führen auf iOS zu Ruckeln und Akkuverbrauch. Große Blur-Radien (> 30px) sind teuer.

---

## 19. Abschluss-Checkliste für QA (28 Punkte)

Legende: **[A]** = automatisierbar (Skript/axe/Lighthouse/grep), **[S]** = Sichtprüfung am Gerät (iPhone mit Safari 26 plus ein älteres iPhone mit iOS 17/18).

1. [A] Viewport-Meta enthält `width=device-width, initial-scale=1, viewport-fit=cover`, aber **kein** `maximum-scale`/`user-scalable=no`.
2. [A] Alle interaktiven Elemente sind ≥ 44×44 CSS-px groß (Skript über `getBoundingClientRect` bei 375px Breite).
3. [A] Alle `input`/`select`/`textarea` haben eine berechnete `font-size` ≥ 16px.
4. [A] Name/Telefon/E-Mail haben die korrekten `type`, `inputmode`, `autocomplete` (`name`, `tel`, `email`) und `enterkeyhint`.
5. [A] Jedes Formularfeld hat ein verknüpftes sichtbares `<label>`.
6. [A] Kein `100vh` ohne nachfolgendes `svh`/`dvh` (grep im CSS).
7. [A] `backdrop-filter` steht immer zusammen mit `-webkit-backdrop-filter` und hat einen opaken Fallback (`@supports`).
8. [A] Höchstens 3 Elemente pro Seite haben `backdrop-filter`.
9. [A] Es gibt eine globale Regel `@media (prefers-reduced-motion: reduce)`. `scroll-behavior: smooth` steht nur unter `no-preference`.
10. [A] Alle `transition`/`animation`-Dauern liegen bei ≤ 400ms und verwenden die Tokens `--ease-out`/`--ease-sheet`.
11. [A] Axe/Lighthouse Accessibility meldet 0 Fehler (Kontrast ≥ 4.5:1, Labels, Heading-Reihenfolge, ARIA).
12. [A] Bei `:focus-visible` gibt es auf allen fokussierbaren Elementen einen sichtbaren Rahmen (Tab-Durchlauf per Playwright-Screenshot).
13. [A] Segmented Controls und Slots sind native Radio-Inputs (`input[type=radio]`) und nicht mit `display:none` versteckt.
14. [A] Sheets sind `<dialog>`, geöffnet per `showModal()`. ESC schließt, der Fokus kehrt zum Auslöser zurück (Playwright-Test).
15. [A] `html { scroll-padding-top }` ist gesetzt. Anker-Ziele erscheinen unterhalb des Sticky Headers (Playwright: `getBoundingClientRect().top ≥ header-Höhe`).
16. [A] Der Buchungsflow hat pro Schritt eine eigene URL bzw. einen History-Eintrag. Browser-Back führt zum vorherigen Schritt.
17. [A] Die Fortschrittsanzeige hat `role="progressbar"` mit `aria-valuenow`/`aria-valuetext`.
18. [A] Im Kalender ist Montag die erste Spalte. Vergangene und geschlossene Tage sind `disabled`. Uhrzeiten stehen im 24h-Format.
19. [S] Der Sticky Header ist über hellem *und* dunklem Content lesbar. Die Haarlinie erscheint erst nach dem Scrollen.
20. [S] Die untere Aktionsleiste liegt über dem Home-Indicator bzw. der Safari-26-Leiste und verdeckt den Seitenfuß nicht. Bei offener Tastatur ist sie ausgeblendet.
21. [S] Kein Auto-Zoom beim Fokussieren von Feldern. Die passende Tastatur erscheint (Ziffern, @), Autofill wird angeboten.
22. [S] Das Sheet fährt von unten ein und hat einen Grabber. Das Tippen auf den Grabber wechselt die Detents. Der Hintergrund scrollt nicht mit, die Seite springt nicht.
23. [S] Bei Tap-Feedback erscheint kein graues iOS-Highlight, stattdessen sichtbarer eigener `:active`-Zustand. Kein klebender Hover auf Touch.
24. [S] Mit iOS „Bewegung reduzieren“ gibt es keine Slide- oder Scale-Animationen. Mit „Transparenz reduzieren“ bzw. „Kontrast erhöhen“ sind die Leisten opak.
25. [S] Bei iOS-Textgröße XXXL bzw. 200 % Zoom gibt es kein abgeschnittenes Element und kein horizontales Scrollen bei 320px Breite.
26. [S] Das native Scrollen ist unverändert (Momentum, Gummiband). Die Edge-Swipe-Back-Geste funktioniert im Buchungsflow.
27. [S] Der Hero-CTA ist beim ersten Laden ohne Scrollen sichtbar (svh). Das Layout springt beim Ein- und Ausfahren der Safari-Leiste nicht.
28. [S] Markenfarben und -schriften sind unverändert. Es gibt keinen „iOS-Look“ mit Systemblau oder SF-Pro-Zwang. Bei aktivem iOS-Dark-Mode sind Inputs nicht ungewollt dunkel (`color-scheme`).
