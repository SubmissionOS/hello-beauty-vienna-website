# Abhängigkeiten

Stand: 2026-10-13. Regel: minimal, Cooldown 14 Tage, keine Install-Skripte, exakte Versionen.

## Schutzmaßnahmen
- `.npmrc`: `ignore-scripts=true`, `save-exact=true`, `before=2026-09-29T00:00:00.000Z` → npm löst **den gesamten Baum** (auch transitive Pakete) nur aus Versionen auf, die mindestens 14 Tage alt sind.
- `package-lock.json` ist committet; Installation nur per `npm ci`.
- Kein `npx` mit Remote-Code: nur `npx --no-install …` (lokal installierte Binaries).
- Prüfung vor der Installation (2026-10-13):
  1. Websuche nach Kompromittierungen der direkten Pakete (astro, sharp, playwright, axe-core, lighthouse, typescript): keine Meldungen.
     Quellen: https://www.huntress.com/blog/supply-chain-compromise-axios-npm-package, https://www.zscaler.com/blogs/security-research/supply-chain-attacks-surge-march-2026, https://www.stepsecurity.io/blog/binding-gyp-npm-supply-chain-attack-spreads-like-worm, https://www.stepsecurity.io/blog/node-ipc-npm-supply-chain-attack, https://tanstack.com/blog/npm-supply-chain-compromise-postmortem, https://blog.gridinsoft.com/keyv-npm-worm-poisoned-packages/
  2. Alle 422 aufgelösten Paketversionen gegen die Registry geprüft (Skript im Scratchpad, Ergebnis hier):
     - Veröffentlichungsdatum gegen die Vorfallsfenster 2026: axios (31.03.), TanStack/Mini Shai-Hulud (11./12.05.), node-ipc (14.05.), Miasma-Wurm (01./03.06.), keyv-Wurm (04.08.). Einziger Treffer: `property-information@7.2.0` (01.06.2026, Abhängigkeit von Astros Markdown-Kette) – steht nicht auf der Liste der Miasma-Pakete, keine Indikatoren → unbedenklich.
     - Keine Version jünger als der Cooldown.
     - Keine Pakete aus den Familien keyv/cacheable/flat-cache/file-entry-cache/@tanstack/node-ipc/plain-crypto-js im Baum.
     - Install-Skripte im Baum: nur `esbuild` (postinstall prüft das Binary – nicht nötig, das plattformspezifische Paket `@esbuild/win32-x64` wird als optionale Abhängigkeit installiert) und `fsevents` (nur macOS). Beide werden durch `ignore-scripts` nicht ausgeführt.
  3. Nach `npm ci` lokal inspiziert: keine `binding.gyp` außer der legitimen `sharp/src/binding.gyp` (10,8 KB, nur für Quell-Builds, wird mit `ignore-scripts` und vorhandenem Prebuild `@img/sharp-win32-x64` nie ausgeführt); keine übergroßen `index.js` (> 1 MB); keine `.claude/`, `.cursor/`, `.gemini/`, `setup.mjs`, `router_init.js` in `node_modules`.

## Laufzeit-/Build-Abhängigkeiten
| Paket | Version | Veröffentlicht | Begründung |
|---|---|---|---|
| astro | 7.3.5 | 2026-09-24 | Static-Site-Generator, i18n-Routing, Bildpipeline. Agentur-Standard (GuddiWeb-new nutzt 7.3.5). 7.3.8 ist erst 5 Tage alt → Cooldown. |
| sharp | 0.35.5 | 2026-09-27 | Bildoptimierung (AVIF/WebP, srcset) für `astro:assets`. Nutzt vorkompilierte Binaries (`@img/sharp-win32-x64`), funktioniert ohne Install-Skripte (getestet). |

Bewusst **nicht** installiert: `@astrojs/sitemap` (eigene Sitemap mit hreflang als Astro-Endpoint, ~40 Zeilen), Tailwind, React/UI-Frameworks, Schrift-Pakete (`@fontsource/*` – Schriften stattdessen einmalig als woff2 abgelegt, siehe `src/assets/fonts/LICENSE.md`), Prettier/ESLint (zusätzliche ~150 Pakete ohne Nutzen für das Ergebnis).

## Entwicklungs-/QA-Abhängigkeiten
| Paket | Version | Veröffentlicht | Begründung |
|---|---|---|---|
| typescript | 7.0.2 | 2026-07-08 | Typprüfung `tsc --noEmit` (strict) |
| @playwright/test | 1.63.0 | 2026-09-04 | QA-Suite in Chromium und WebKit (Geräte-Matrix). 1.64.0 zu jung. |
| @axe-core/playwright | 4.13.0 | 2026-08-11 | Barrierefreiheitsprüfung (axe-core 4.13) |
| lighthouse | 13.5.0 | 2026-09-18 | Lighthouse-Messung lokal gegen `astro preview` |

Playwright-Browser: Chromium und WebKit über `npx --no-install playwright install chromium webkit` (Download von Microsofts Playwright-CDN, ausdrücklich erlaubt).

## Offene Audit-Hinweise (bewusst nicht behoben)
| Paket | Advisory | Fix-Version | Bewertung |
|---|---|---|---|
| http-cache-semantics 4.2.0 | GHSA-ch52-4w7c-c8xp (high) | 4.3.0 vom 2026-10-04 (9 Tage, Cooldown) | Nur von Astro für das Cachen **entfernter** Bilder genutzt; die Seite verwendet ausschließlich lokale Bilder. Nicht ausnutzbar. |
| source-map-js 1.2.1 | GHSA-68fv-2mgg-jv7q (high, DoS) | 1.2.2 vom 2026-09-30 (13 Tage, Cooldown) | Betrifft nur das Verarbeiten fremder Source-Maps zur Build-Zeit; hier nur eigener Code. Kein Laufzeit-Code im Browser. |

Empfehlung: nach Ablauf des Cooldowns (ab 2026-10-18) `before` in `.npmrc` anheben, `npm install` und `npm audit` erneut ausführen.
