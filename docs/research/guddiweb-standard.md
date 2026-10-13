# GuddiWeb-Qualitätsstandard (Maßstab für hellobeautyvienna-website)

Abrufdatum: **2026-10-13**. Alle Quellen wurden nur gelesen (kein Build, kein npm, keine Änderungen).
Quellen: https://guddiweb.com/ (WebFetch, Zusammenfassung durch ein kleines Modell, daher sinngemäß) sowie lokale Projekte unter `C:\Users\Guddi\Documents\`.

> Übernommen wird der **Standard** (Technik, Struktur, Prüfbarkeit), **nicht** das GuddiWeb-Branding (Inter, Grün #1f3d2e, Pill-Buttons mit Icon-Disc, Eyebrow „/ LABEL", Device-Frames).

---

## 1. Referenzen auf guddiweb.com

| Name | Domain | Branche | Auf guddiweb.com als |
|---|---|---|---|
| Goldenkey Sportcars | goldenkey-sportcars.de | Luxus-Autovermietung | Case Study `/projekte/goldenkey` |
| Selyvi | selyvi.de, selyvi.com | EdTech, Plattform für Lehrkräfte | Case Study `/projekte/selyvi` |
| Carlofy (eigenes Produkt) | carlofy.com (noch nicht öffentlich) | SaaS für Autovermietungen | Case Study `/projekte/carlofy` |
| Optik in Waldstetten | – | Lokales Fachgeschäft (Optiker) | Case Study `/projekte/optiker-waldstetten` |
| Moto-Point Waldstetten | – | Kfz-Werkstatt | Referenzliste |
| Praxis Dr. Ladenburger-Strauß | – | Gynäkologische Praxis | Referenzliste |
| Laungery | – (keine Live-Site) | Dessous, Luxus | Referenzliste |
| Kanzlei Thomas Schmid & Kollegen | – | Recht | Nur Kachel in der Hero-Work-Wall |
| Immobilien-Website (ohne Namen) | – | Immobilien | Nur Kachel in der Hero-Work-Wall |
| Vantaro Automobile (Name geändert) | – | Gebrauchtwagenhandel | Designentwurf `/designs#autohaus` |
| The Salted Harp (Name geändert) | – | Irish Pub | Designentwurf `/designs#pub` |
| Foodcourt47 | – | Gastronomie (Foodcourt) | Designentwurf `/designs#foodcourt47` |

Quelle lokal: `GuddiWeb-new/src/data/projects.ts` (`caseStudies`, `references`, `clientLogos`), `src/data/designs.ts`, `src/data/wall.ts`.
Hinweis aus `designs.ts`: Zwei Designs laufen unter erfundenem Namen; die echten Namen dürfen auf der Agentur-Site nie erscheinen.

## 2. Zuordnung Referenz → lokaler Ordner

| Referenz | Lokaler Ordner | Stack (package-lock) | Beleg |
|---|---|---|---|
| guddiweb.com | `GuddiWeb-new` | Astro 7.3.5, sharp 0.35.5, Tailwind 4.3.3, 1 React-Insel | `astro.config.mjs`: `const SITE = 'https://guddiweb.com'` |
| Foodcourt47 (Entwurf) | `foodcourt47` | Astro 7.3.8, sharp 0.35.5, kein Framework | `astro.config.mjs`: `site: 'https://foodcourt47.de'` |
| The Salted Harp = Irish Pub Fleetenkieker (Entwurf, DE/EN) | `irishpub` | Astro 7.3.8, sharp 0.35.5, kein Framework | `site: 'https://www.irishpub-fleetenkieker.de'` |
| Vantaro Automobile (anonymisiert) | `hh-motors-vantaro` | Astro 7.3.3, sharp 0.35.4 | `site: 'https://www.vantaro.example'`, `docs/vantaro-image-credits.md` in GuddiWeb-new |
| (Original zu Vantaro) Hamburg Motors | `Hamburg-motors` | Astro 7.3.3, sharp 0.35.4 | `site: 'https://www.hh-motors.de'`, CLAUDE.md |
| Carlofy (Marketing, DE/EN) | `Carlofy-Website` | Astro 7.2.4, sharp 0.35.4, Tailwind 4.3.3 | `src/config/routes.ts`: `SITE = 'https://carlofy.com'` |
| Selyvi (selyvi.de Marketing) | `Mira-marketingwebsite/produkt-website` (Arbeitsname Mira, Produktname Platzhalter) | Next.js 16.3.0 | 31 Verweise auf `selyvi.de` in `src/` |
| Selyvi (Plattform/App) | `Selyvi-Main` (frontend Vite/React 19), `mira` (Next 16.2.9), `Elternportal-Selyvi` | Vite/Next | Ordnernamen, package.json |
| Goldenkey Sportcars | kein Website-Code lokal (nur `GuddiWeb Agency/Klienten/Goldenkey-Sportcars GmbH/Rechtliches, Verträge`) | – | – |
| Optik, Moto-Point, Praxis, Kanzlei, Laungery | kein lokaler Ordner gefunden | – | – |
| Sonstige | `guddidev.ai` (Astro 6.4.8, guddidev.com), `mina-shop` (Astro 7.2.0, DE/TR/AR), `kundenportal-gutmannholding` (Vite/React), `Barres` (Carlofy-Präsentation, Vite), `Rafael-Gutmann-Projektportfolio`, `GitHub/lessizguddi` (statisches HTML) | – | `gutmann-cars`, `GuddiWeb-HUB` sind leer |

## 3. GuddiWeb-new (Referenzimplementierung der Agentur)

**Aufbau** (`README.md`): `src/data` (alle Texte/Fakten), `src/components`, `src/layouts/BaseLayout.astro`, `src/pages` (eine Datei je Route), `src/assets` (alle Bild-Originale), `src/styles/global.css` (Tokens via Tailwind v4 `@theme`), `public/images/og` (OG-Bilder mit stabiler URL), `public/llms.txt`, `public/robots.txt`.
Deployment: Vercel liefert committetes `dist/` aus (`vercel.json`: `buildCommand: ""`, `cleanUrls: true`, Redirects alter URLs 301).

**Astro-Konfiguration** (`astro.config.mjs`): `trailingSlash: 'never'`, `build.format: 'file'`, Sitemap mit Filter (kein 404/noindex) und **`lastmod` aus `git log` der Quelldateien** je Route (nicht Build-Datum).

**Bildpipeline** (`src/components/Img.astro`, `src/assets/index.ts`):
```astro
<Picture src={image} formats={['avif']} fallbackFormat="webp" widths={widths}
  sizes={fixed ? `${fixed}px` : sizes} quality={quality /* 70 */}
  loading={eager ? 'eager' : 'lazy'} decoding="async"
  fetchpriority={eager ? 'high' : low ? 'low' : undefined} />
```
Breitenstufen 360…1920, nie breiter als Original; `fixed` → 1x/2x/3x. `assets/index.ts` lädt per `import.meta.glob` und liest Maße aus einem Klon (sonst kopiert Astro das Original mit in `dist`).

**Fonts**: self-hosted via `@fontsource-variable/inter`, Preload nur der Latin-woff2:
```astro
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
<link rel="preload" href={interLatin} as="font" type="font/woff2" crossorigin />
```
Datenschutzerklärung Abschnitt 4 sagt ausdrücklich: kein Font-CDN.

**Designsystem** (`src/styles/global.css`): Farb-Tokens (paper/surface/subtle/fg/muted/faint/line/brand), Kontrast im Kommentar belegt („#6e6e6e: 4.5:1 auf Weiß"). Typo-Skala:
```css
--text-display-xl: clamp(3rem, 7vw, 6rem);              /* lh .95, -0.04em, 800 */
--text-display-lg: clamp(2.5rem, 1.4rem + 3.8vw, 4.5rem);
--text-display-md: clamp(2rem, 1.3rem + 2.5vw, 3.5rem);
--text-display-sm: clamp(1.5rem, 1.2rem + 1.1vw, 2.125rem);
--text-lead: clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem);
```
Layout-Utilities: `wrap` (max 96rem, Padding 1.25rem → 4rem ab 48rem → 5.5rem ab 80rem), `section-y` (7.5rem, 9rem ab 80rem), `card`, `plate`. Basis: `h1–h4 { text-wrap: balance }`, `p { text-wrap: pretty }`, Silbentrennung für Headlines < 40rem, `:focus-visible` Outline 2px, `.grid { grid-template-columns: minmax(0,1fr) }` gegen Overflow.

**Motion**: Kein Animations-Framework. Nur `transform/translate/scale/opacity`, alles in `@media (prefers-reduced-motion: no-preference)`, plus Catch-all:
```css
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; } }
```
Ein Script in `BaseLayout.astro` setzt nur Klassen per IntersectionObserver (`watch(selector, options, once, cls)`), dekorative Bilder erst nach `load` + `requestIdleCallback`. `<html class="js">` per `is:inline`-Einzeiler.

**SEO/JSON-LD** (`BaseLayout.astro`): ein `@graph` je Seite: Organization (voll nur auf `/` und `/ueber-uns`, sonst nur `@id`-Verweis), WebSite, BreadcrumbList (nur ab 2 Ebenen), seitenspezifisches `schema`-Prop. Escaping `.replace(/</g, '\\u003c')`. Canonical, hreflang de + x-default, OG 1200×630 mit Alt, Twitter-Card, `noindex`-Prop, Skip-Link „Zum Inhalt springen".

**Rechtliches**: `src/pages/impressum.astro` (§ 5 DDG, Kontakt, USt-ID, § 18 Abs. 2 MStV, Haftung Inhalte/Links, Urheberrecht; Daten aus `src/data/site.ts`). `datenschutz.astro` mit nummerierten Ankern: Verantwortlicher, Allgemein/Rechtsgrundlagen, Hosting (Frontend, Quellcode, DNS), **Schriftarten**, Kontaktformular, E-Mail, Cookies, Logfiles, Rechte, Widerspruch, Speicherdauer, Drittland, Sicherheit, Änderungen. Gemeinsame `.legal`-Typo in `global.css`, `LegalHeader.astro`.

**i18n**: GuddiWeb-new ist **nur Deutsch**; alte `/en/*`-URLs leiten per `vercel.json` um. Für Mehrsprachigkeit sind `Carlofy-Website` und `irishpub` maßgeblich (siehe 4).

**Kontaktformular**: `ContactForm.tsx` (React-Insel) baut einen `mailto:`-Link, Honeypot, Pflicht-Checkbox Datenschutz, nichts geht über das Netz. Nachteil: `dist/_astro/client.*.js` ≈ 213 KB nur für das Formular. **Nicht übernehmen**, sondern Vanilla-Muster aus Hamburg-motors.

## 4. Vergleichsprojekte (relevanteste)

### 4.1 foodcourt47 (Gastro/Dienstleister, Astro, Fotografie führt) – wichtigste Vorlage
- `astro.config.mjs`: Astro-7-**Fonts-API** mit `fontProviders.local()`, nur Latin-woff2, `display: 'swap'`, Fallback-Metriken; `<Font cssVariable="--font-jost" preload />` in `src/layouts/Basis.astro`. `build.inlineStylesheets: 'always'`, `vite.build.assetsInlineLimit: 0` („damit die CSP ohne Inline-Skripte auskommt").
- `vercel.json`: strenge Header – `Content-Security-Policy: default-src 'self'; script-src 'self'; … frame-ancestors 'none'`, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP; `/_astro/*` `Cache-Control: public, max-age=31536000, immutable`. Entwurf: `X-Robots-Tag: noindex`.
- Tokens (`src/styles/global.css`): `--rand: clamp(1.25rem, 5vw, 4.5rem); --breite: 84rem; --luft: clamp(5rem, 12vw, 10rem);` H1 `clamp(2.6rem, 8vw, 6.5rem)`, H2 `clamp(2rem, 4.6vw, 3.75rem)`, H3 `clamp(1.3rem, 2vw, 1.7rem)`. Body 1.0625rem/1.7.
- Bilder: `src/components/Foto.astro` (eigenes `<picture>` AVIF/WebP/JPEG, feste `width/height`, `eager` → `fetchpriority="high"`, `decoding="sync"`), `Bild.astro` (fester `aspect-ratio`-Rahmen, `object-fit: cover`, Stockfotos mit `data-placeholder-photo="PLACEHOLDER_PHOTO"`), Bildmetadaten in `src/content/fotos.json`.
- Reveal (`Basis.astro` + CSS): IO mit `rootMargin: '0px 0px -8% 0px'`, einmalig `ist-sichtbar`; CSS nur unter `@media (scripting: enabled)` → ohne JS alles sichtbar; Bilder `scale(1.12)` → `none` über 1600 ms. Header transparent/gescrollt per IO auf Marker statt Scroll-Handler; Parallax per rAF, nur ohne reduced-motion. Mobilmenü mit Fokusfalle, Escape, `aria-expanded`.
- Buchung (`src/pages/reservieren.astro`): externer Anbieter (aleno) **nur als Link**, kein Embed: „Erst mit dem Klick auf den Button werden Daten an aleno übertragen." `target="_blank" rel="noopener"` + `<span class="nur-sr"> (öffnet neues Fenster)</span>`. Telefon/Adresse/Zeiten als `<dl>`.
- Schema (`src/lib/schema.ts`): `Restaurant` mit `@id`, `PostalAddress`, internationaler Telefonnummer, `acceptsReservations`, `potentialAction: ReserveAction`, `hasMenu`.
- Weitere: `src/pages/llms.txt.ts`, `robots.txt.ts`, Inhalte als JSON/MD in `src/content` (Collections), Datenschutz als Markdown (`src/content/seiten/datenschutz.md`: Verantwortliche Stelle, Aufruf der Website, Bilder und Schriften, Online-Reservierung über Drittanbieter, Rechte).

### 4.2 irishpub (Gastro, zweisprachig DE/EN, Lighthouse dokumentiert)
- `astro.config.mjs`: `i18n: { defaultLocale: 'de', locales: ['de','en'], routing: { prefixDefaultLocale: false } }`, `trailingSlash: 'always'`, Sitemap mit `i18n`-Option (`de-DE`, `en-GB`).
- `src/lib/i18n.ts` + `src/pages/[...path].astro`: eine Catch-all-Route erzeugt alle Seiten je Sprache aus `pageKeys`; Texte in `src/content/de.json` / `en.json`. **Slugs nicht übersetzt** (`/en/getraenke/`).
- `scripts/check-parity.mjs` (läuft vor `build`): gleiche Schlüssel, Array-Längen und Platzhalterzahl in DE/EN. `scripts/pruefe-platzhalter.mjs` (postbuild): Build bricht ab, wenn sichtbarer Text `[Platzhalter]` enthält.
- `src/layouts/Layout.astro`: `<html lang={lang === 'de' ? 'de' : 'en-GB'}>`, hreflang de/en/x-default, `og:locale`, Draft-Flag → `noindex, nofollow` (abschaltbar per `PUBLIC_DRAFT=false`), Preload von zwei woff2. Sprachumschalter:
  ```astro
  <li><a href={href('de', page)} hreflang="de" lang="de" aria-current={lang === 'de' ? 'true' : undefined}>DE</a></li>
  ```
- `LIGHTHOUSE.md`: 98–100 / 100 / 100 / (SEO 100 ohne Draft-Flag) mobil+desktop; Gewinne durch lokale Fotos statt Hotlinks (AVIF/WebP, nie breiter als Quelle), erstes Galeriebild `fetchpriority="high"`, nur Latin-Fonts, `inlineStylesheets: 'auto'`, Kontrasttabelle aller Farbpaare.

### 4.3 Carlofy-Website (zweisprachig mit übersetzten Slugs) – i18n-Vorlage
- `src/config/routes.ts`: zentrale Routentabelle, **echte übersetzte Slugs** (`/ueber-uns/` ↔ `/en/about/`, `/datenschutz/` ↔ `/en/privacy/`, `/impressum/` ↔ `/en/imprint/`); Sprachumschalter, hreflang, Sitemap, Breadcrumbs lesen nur hier. `pairForPath()`, `localeFromPath()`.
- `astro.config.mjs`: Sitemap-`serialize` setzt hreflang-Links (de, en, x-default→de) und `lastmod` aus `git log`; `redirects: { '/de': '/' }`; `compressHTML: true`.
- Texte in Content Collections `src/content/{de,en}/…json` mit zod-Schema (`src/content.config.ts`), Fakten zentral in `src/config/facts.ts`.
- `src/components/Header.astro`: Umschalter als `<a href={altHref} hreflang={altLang} lang={altLang}>`, Mobilmenü als `<details>` (ohne JS).

### 4.4 Hamburg-motors (Dienstleister, Formulare, Tokens) – Token-/Formular-Vorlage
- `src/styles/tokens.css`: alle Werte als Custom Properties, Kontrast je Paar im Kommentar (WCAG 2.2), fluide Skala „min @360 → max @1440":
  ```css
  --fs-display: clamp(2.5rem, 1.5rem + 4.444vw, 5.5rem);  --fs-h1: clamp(2.125rem, 1.667rem + 2.037vw, 3.5rem);
  --fs-h2: clamp(1.75rem, 1.417rem + 1.481vw, 2.75rem);    --fs-h3: clamp(1.3125rem, 1.167rem + 0.648vw, 1.75rem);
  --fs-body: 1.0625rem; --fs-input: 1.0625rem; /* ≥16px – kein iOS-Zoom */
  --section-y: clamp(4rem, 2.667rem + 5.926vw, 8rem); --gutter: clamp(1rem, 0.5rem + 2.222vw, 2.5rem);
  --container: 1240px; --container-text: 720px; --touch: 44px; --dur-reveal: 560ms;
  ```
  Spacing-Skala `--space-1…12` (4–112 px), Radien, Schatten, z-Index-Layer, Safe-Area-Insets.
- `src/lib/ui/reveal.ts`: Reveal nur unter `html.reveal-ready`; Elemente im Viewport werden **vor** dem Aktivieren sichtbar gesetzt (kein Aufblitzen above the fold); reduced-motion → sofort sichtbar.
- `src/lib/forms/form-controller.ts`: Vanilla-Formular ohne Abhängigkeiten: `required`/`data-validate`, Fehlertext in `#<id>-error` + `aria-invalid`/`aria-describedby`, Validierung on blur, Fokus auf erstes Fehlerfeld, Honeypot `name="website"`, `aria-busy` beim Senden, Erfolgsansicht fokussiert.
- UI-Bausteine `src/components/ui/` (Button, Field, Input, Textarea, Checkbox, Accordion, Breadcrumbs, Container, Section, OpeningStatus …), `layout/SkipLink.astro`, `ConsentBanner` (nur wo nötig).
- Paket-Sicherheit (CLAUDE.md, ebenso Carlofy): `.npmrc` `ignore-scripts=true`, `save-exact=true`, ≥14 Tage Cooldown, kein `npx` mit Remote-Download, Lockfile committen.

### 4.5 Agentur-Skill `guddiweb-restaurant-sites` (gilt für Hospitality, sinngemäß auch für Beauty)
Fotografie führt (Vollbild-Hero), elegante Display-Serif + ruhige Sans, viel Weißraum, Buchungs-Button wiederkehrend, Sticky-Header (transparent auf Hero), dezente Bewegung mit reduced-motion, Multi-Page, Inhalte in `src/content`, Schema.org, Sitemap, WCAG, unbelegte Fakten als `[Platzhalter]`. Verboten: Monospace, Dashboard-Optik, identische Karten-Raster, Großbuchstaben-Labels über jeder Überschrift, Neonfarben.
**Konflikt:** Der Skill erlaubt Stockfoto-Hotlinks; irishpub/LIGHTHOUSE.md und foodcourt47-CSP (`img-src 'self'`) zeigen, dass der gelebte Standard **lokale Fotos über astro:assets** ist. Lokale Variante hat Vorrang.

## 5. Prüfbare Qualitätskriterien

| # | Kriterium | Prüfmethode |
|---|---|---|
| 1 | Astro 7 statisch (`output: 'static'`), kein UI-Framework (kein React/Vue), Inhalte in `src/content` (Collections mit Schema) | `package.json` ohne react/vue; `src/content.config.ts` vorhanden |
| 2 | Keine Drittanbieter-Requests beim Seitenaufruf (Fonts, Bilder, Skripte, Maps, Analytics) | DevTools Network/`grep -rE '(src\|srcset)="https?://' dist` → 0 Treffer; nur `href`-Links nach außen |
| 3 | CSP ohne Inline-Skripte: `default-src 'self'; script-src 'self'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none'` + HSTS, nosniff, Referrer-, Permissions-Policy, COOP | `vercel.json` lesen; `curl -I` nach Deploy; Konsole ohne CSP-Fehler |
| 4 | `/_astro/*` mit `Cache-Control: public, max-age=31536000, immutable` | `vercel.json`, `curl -I` |
| 5 | Fonts self-hosted, nur Latin-woff2, `font-display: swap`, max. 2 Familien, Preload der Hauptschrift(en), Fallback-Metriken | `dist` enthält nur `.woff2` aus `_astro`; `<link rel="preload" as="font">` im `<head>`; Astro-Fonts-API `fontProviders.local()` |
| 6 | Alle Rasterbilder über `astro:assets` (`<Picture>`/`getImage`), AVIF + WebP, `srcset` nie breiter als Original | `grep -r '<img' src` nur in Img-Komponente; `dist/_astro/*.avif` vorhanden; kein Original-JPG/PNG > 300 KB in `dist` |
| 7 | Jedes `<img>` hat `width`/`height` (bzw. `aspect-ratio`-Rahmen) und `alt` (dekorativ: `alt=""`) | HTML-Validierung / Lighthouse „Image elements have explicit width and height", axe |
| 8 | Genau ein LCP-Bild je Seite `loading="eager" fetchpriority="high"`, alle anderen `lazy` + `decoding="async"` | `grep -c 'fetchpriority="high"'` je HTML = 1 (bzw. 0 ohne Bild-Hero) |
| 9 | Lighthouse mobil und desktop ≥ 98 Performance, 100 Accessibility, 100 Best Practices, 100 SEO (SEO ggf. mit `PUBLIC_DRAFT=false` gemessen) | `node scripts/lighthouse.mjs` gegen `astro preview`, Ergebnis in `docs/qa/LIGHTHOUSE.md` |
| 10 | CLS < 0.05, LCP < 2.0 s (Lighthouse mobil) | Lighthouse-Report |
| 11 | JS gesamt je Seite ≤ 10 KB (gzip), nur gebündelte Module (`<script>` in Astro), keine Inline-Skripte außer ggf. dem `js`-Klassen-Einzeiler (bei strenger CSP auch der nicht) | `ls -la dist/_astro/*.js`; `grep -c '<script>' dist/**/*.html` |
| 12 | Animation CSS-only, nur `transform`/`opacity`; Reveal per IntersectionObserver, einmalig, ohne JS bzw. mit `scripting: none` alles sichtbar | Code-Review; Seite mit deaktiviertem JS ansehen |
| 13 | `prefers-reduced-motion: reduce` schaltet alle Animationen/Transitions/Parallax/Smooth-Scroll ab | DevTools „Emulate prefers-reduced-motion"; Catch-all-Regel in CSS vorhanden |
| 14 | Kein Aufblitzen above the fold: Elemente im Viewport sind vor dem Reveal-Start sichtbar | Muster `Hamburg-motors/src/lib/ui/reveal.ts`; Reload-Test |
| 15 | Design-Tokens zentral (Farben, Typo-Skala, Spacing, Radien, Motion) – keine Hex-Werte in Komponenten | `grep -rE '#[0-9a-fA-F]{3,6}' src/components src/pages` → 0 (außer Ausnahmen) |
| 16 | Fluide Typo per `clamp(rem + vw)` (min @360 px, max @1440 px), Body ≥ 1rem, Inputs ≥ 16 px | `tokens.css` lesen; DevTools bei 360/1440 px |
| 17 | Container max. ~1200–1350 px (`--container: 1240px` bzw. `84rem`), Seitenrand `clamp(1rem…1.25rem, …, 2.5rem…4.5rem)`, keine horizontale Scrollleiste bei 320 px | DevTools 320 px: `document.documentElement.scrollWidth === innerWidth` |
| 18 | Kontrast WCAG 2.2 AA für alle Text/Hintergrund-Paare, Tabelle in Doku/Token-Kommentar | Kontrastrechner; axe 0 Verstöße |
| 19 | Sichtbarer Fokus (`:focus-visible`, ≥ 2 px), Skip-Link als erstes Element, Touch-Ziele ≥ 44 px | Tastatur-Durchlauf; Lighthouse/axe |
| 20 | Mobilmenü: `aria-expanded`, `aria-controls`, Escape schließt, Fokus kehrt zurück (oder `<details>` ohne JS) | Tastaturtest |
| 21 | Mehrsprachigkeit: zentrale Routentabelle mit **übersetzten Slugs** (`/de/…` ↔ `/en/…` o. ä.), Umschalter verlinkt auf die Entsprechung derselben Seite, `hreflang` + `lang` am Link, `aria-current` | `routes.ts` lesen; jede Seite: Umschalter-Ziel = Paar aus Tabelle |
| 22 | `<html lang>` korrekt je Sprache (`de-AT` bzw. `de`, `en`), `og:locale` passend | `grep '<html lang' dist/**/*.html` |
| 23 | hreflang-Paare inkl. `x-default` im `<head>` und in der Sitemap, Canonical selbstreferenzierend | HTML + `sitemap-0.xml` prüfen |
| 24 | Sprach-Parität: identische Schlüssel/Platzhalter in allen Sprachdateien, Prüfskript läuft vor dem Build | `scripts/check-parity.mjs` (Muster irishpub) → exit 0 |
| 25 | Build bricht ab bei sichtbaren `[Platzhaltern]` (sobald live) | `scripts/pruefe-platzhalter.mjs` als `postbuild` |
| 26 | JSON-LD je Seite als `@graph`: Unternehmen (hier `BeautySalon`/`NailSalon` mit `PostalAddress`, `telephone` international, `openingHoursSpecification`, `geo`, `@id`) voll auf Start/Kontakt, sonst Verweis; `BreadcrumbList` ab Ebene 2; `<` escaped | Google Rich Results Test; Schema-Validator |
| 27 | Meta: eindeutiger `<title>` ≤ 60 Zeichen, `description` ≤ 160, OG 1200×630 mit `og:image:alt`, Twitter-Card | Skript über `dist/**/*.html` |
| 28 | Sitemap ohne 404/noindex-Seiten, `lastmod` aus Git statt Build-Datum; `robots.txt` mit Sitemap-Verweis; optional `llms.txt` | `dist/sitemap-*.xml`, `robots.txt` |
| 29 | Entwurfsschutz: `noindex, nofollow` (Meta + `X-Robots-Tag`) bis zur Freigabe, per Env abschaltbar | HTML-Head / `curl -I` |
| 30 | Buchung über Drittanbieter nur als Link (kein iframe/Widget beim Laden), Hinweis „Daten werden erst beim Klick übertragen", neues Fenster angekündigt | Network-Tab ohne Requests zum Buchungsanbieter; Datenschutz-Abschnitt vorhanden |
| 31 | Formulare ohne Framework: Labels, `autocomplete`, Fehlertext per `aria-describedby`, Honeypot, Datenschutz-Checkbox, Fokus auf erstes Fehlerfeld | Muster `Hamburg-motors/src/lib/forms/form-controller.ts`; axe; Tastaturtest |
| 32 | Kein Cookie-Banner nötig, weil keine Cookies/Tracking (sonst Consent vor jedem Request) | DevTools Application → Cookies leer |
| 33 | Impressum und Datenschutz in jeder Sprache, im Footer jeder Seite verlinkt; **für Wien österreichisches Recht**: § 5 ECG, § 25 MedienG (Offenlegung), ggf. § 14 UGB, WKO-Mitgliedschaft/Gewerbebehörde – nicht das deutsche DDG/MStV-Muster aus GuddiWeb-new kopieren | Inhaltliche Prüfung; Link-Check Footer |
| 34 | Datenschutz-Gliederung wie Agenturstandard: Verantwortlicher, Rechtsgrundlagen, Hosting, Schriftarten (lokal), Kontakt/E-Mail, Buchungsanbieter, Cookies, Logfiles, Rechte, Beschwerde (DSB Österreich), Speicherdauer, Drittland, Stand | Abgleich mit `GuddiWeb-new/src/pages/datenschutz.astro` |
| 35 | Nichts erfinden: keine Bewertungen/`aggregateRating`, Preise/Zeiten/Fakten nur belegt, sonst `[Platzhalter]`; Paket-Sicherheit (`ignore-scripts`, `save-exact`, 14-Tage-Cooldown, Lockfile committet) | Review; `.npmrc` lesen |

## 6. Versionen aus den package-lock.json

| Projekt | astro | sharp | @astrojs/sitemap | tailwindcss |
|---|---|---|---|---|
| GuddiWeb-new | 7.3.5 | 0.35.5 | 3.7.4 | 4.3.3 |
| foodcourt47 | 7.3.8 | 0.35.5 | 3.7.4 | – |
| irishpub | 7.3.8 | 0.35.5 | 3.7.4 | – |
| Carlofy-Website | 7.2.4 | 0.35.4 | 3.7.3 | 4.3.3 |
| Hamburg-motors / hh-motors-vantaro | 7.3.3 | 0.35.4 | – | – |
| guddidev.ai | 6.4.8 | 0.34.5 | 3.7.3 | – |

Neuester eingesetzter Stand: **astro 7.3.8 + sharp 0.35.5 + @astrojs/sitemap 3.7.4** (foodcourt47, irishpub).
