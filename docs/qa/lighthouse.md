# Lighthouse

Gemessen am 2026-10-14 02:18 gegen `npm run preview` (lokal), Lighthouse  mit Playwright-Chromium.
Mobil: Standard-Emulation (Moto G Power, simuliertes langsames 4G, 4× CPU). Desktop: 1350 × 940, ohne CPU-Drosselung.

**Minimum über alle 102 Messungen:** Performance 98 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 · max. LCP 2.20 s · max. CLS 0.037

| Gerät | Seite | Perf | A11y | BP | SEO | LCP | CLS | TBT | Long Tasks (eigenes JS) | Audits < 90 |
|---|---|---|---|---|---|---|---|---|---|---|
| mobil | `/` | 98 | 100 | 100 | 100 | 2.19 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/` | 99 | 100 | 100 | 100 | 2.19 s | 0.000 | 33 ms | 0 | mainthread-work-breakdown, bootup-time, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/` | 99 | 100 | 100 | 100 | 2.20 s | 0.000 | 49 ms | 1 | forced-reflow-insight, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 5 ms | 0 | image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| mobil | `/en/services/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 2 ms | 0 | image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/` | 99 | 100 | 100 | 100 | 2.13 s | 0.000 | 9 ms | 0 | image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/nagelmodellage/` | 99 | 100 | 100 | 100 | 2.04 s | 0.017 | 23 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/nail-extensions/` | 100 | 100 | 100 | 100 | 1.89 s | 0.000 | 15 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/mukorom/` | 100 | 100 | 100 | 100 | 1.44 s | 0.017 | 19 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/manikuere/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 20 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/manicure/` | 100 | 100 | 100 | 100 | 1.37 s | 0.000 | 11 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/manikur/` | 99 | 100 | 100 | 100 | 1.97 s | 0.000 | 20 ms | 1 | forced-reflow-insight, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/pedikuere/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 21 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/pedicure/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 14 ms | 0 | max-potential-fid, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/pedikur/` | 100 | 100 | 100 | 100 | 1.60 s | 0.027 | 20 ms | 1 | forced-reflow-insight, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/kosmetik/` | 100 | 100 | 100 | 100 | 1.59 s | 0.000 | 18 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/facials/` | 100 | 100 | 100 | 100 | 1.59 s | 0.000 | 13 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/kozmetika/` | 99 | 100 | 100 | 100 | 2.04 s | 0.000 | 33 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/wimpern-augenbrauen/` | 100 | 100 | 100 | 100 | 1.59 s | 0.016 | 23 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/lashes-brows/` | 100 | 100 | 100 | 100 | 1.74 s | 0.000 | 16 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/szempilla-szemoldok/` | 99 | 100 | 100 | 100 | 2.12 s | 0.000 | 23 ms | 1 | forced-reflow-insight, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/haarentfernung/` | 99 | 100 | 100 | 100 | 2.12 s | 0.000 | 28 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/hair-removal/` | 99 | 100 | 100 | 100 | 2.19 s | 0.000 | 14 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/szortelenites/` | 99 | 100 | 100 | 100 | 2.12 s | 0.000 | 23 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/preise/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/prices/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/arak/` | 100 | 100 | 100 | 100 | 0.93 s | 0.000 | 16 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/galerie/` | 98 | 100 | 100 | 100 | 2.20 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/gallery/` | 100 | 100 | 100 | 100 | 1.76 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/galeria/` | 100 | 100 | 100 | 100 | 1.45 s | 0.022 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/ueber-uns/` | 100 | 100 | 100 | 100 | 1.36 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/about/` | 99 | 100 | 100 | 100 | 1.96 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/rolunk/` | 99 | 100 | 100 | 100 | 1.97 s | 0.028 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/kontakt/` | 100 | 100 | 100 | 100 | 1.14 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/contact/` | 100 | 100 | 100 | 100 | 1.14 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/kapcsolat/` | 99 | 100 | 100 | 100 | 1.89 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/termin-buchen/` | 100 | 100 | 100 | 100 | 1.22 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/book/` | 100 | 100 | 100 | 100 | 1.22 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/idopontfoglalas/` | 99 | 100 | 100 | 100 | 1.74 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/faq/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/faq/` | 99 | 100 | 100 | 100 | 1.66 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/gyik/` | 100 | 100 | 100 | 100 | 1.14 s | 0.000 | 1 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/impressum/` | 99 | 100 | 100 | 100 | 1.73 s | 0.001 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/imprint/` | 99 | 100 | 100 | 100 | 1.73 s | 0.011 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/impresszum/` | 99 | 100 | 100 | 100 | 1.74 s | 0.012 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/datenschutz/` | 99 | 100 | 100 | 100 | 1.73 s | 0.037 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/privacy/` | 100 | 100 | 100 | 100 | 0.91 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/adatvedelem/` | 99 | 100 | 100 | 100 | 1.67 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/barrierefreiheit/` | 100 | 100 | 100 | 100 | 1.58 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/accessibility/` | 99 | 100 | 100 | 100 | 1.74 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/akadalymentesseg/` | 100 | 100 | 100 | 100 | 1.43 s | 0.003 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/` | 100 | 100 | 100 | 100 | 0.32 s | 0.003 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| desktop | `/en/` | 100 | 100 | 100 | 100 | 0.32 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| desktop | `/hu/` | 100 | 100 | 100 | 100 | 0.32 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| desktop | `/leistungen/` | 100 | 100 | 100 | 100 | 0.44 s | 0.000 | 0 ms | 0 | image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| desktop | `/en/services/` | 100 | 100 | 100 | 100 | 0.44 s | 0.012 | 0 ms | 0 | image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/` | 100 | 100 | 100 | 100 | 0.46 s | 0.000 | 0 ms | 0 | forced-reflow-insight, image-delivery-insight, lcp-discovery-insight, network-dependency-tree-insight |
| desktop | `/leistungen/nagelmodellage/` | 100 | 100 | 100 | 100 | 0.45 s | 0.003 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/nail-extensions/` | 100 | 100 | 100 | 100 | 0.46 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/mukorom/` | 100 | 100 | 100 | 100 | 0.41 s | 0.009 | 0 ms | 0 | forced-reflow-insight, network-dependency-tree-insight |
| desktop | `/leistungen/manikuere/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/manicure/` | 100 | 100 | 100 | 100 | 0.31 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/manikur/` | 100 | 100 | 100 | 100 | 0.41 s | 0.002 | 0 ms | 0 | forced-reflow-insight, network-dependency-tree-insight |
| desktop | `/leistungen/pedikuere/` | 100 | 100 | 100 | 100 | 0.45 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/pedicure/` | 100 | 100 | 100 | 100 | 0.45 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/pedikur/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | forced-reflow-insight, network-dependency-tree-insight |
| desktop | `/leistungen/kosmetik/` | 100 | 100 | 100 | 100 | 0.45 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/facials/` | 100 | 100 | 100 | 100 | 0.41 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/kozmetika/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/wimpern-augenbrauen/` | 100 | 100 | 100 | 100 | 0.45 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/lashes-brows/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szempilla-szemoldok/` | 100 | 100 | 100 | 100 | 0.46 s | 0.000 | 0 ms | 0 | forced-reflow-insight, network-dependency-tree-insight |
| desktop | `/leistungen/haarentfernung/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/hair-removal/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szortelenites/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | forced-reflow-insight, network-dependency-tree-insight |
| desktop | `/preise/` | 100 | 100 | 100 | 100 | 0.39 s | 0.001 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/prices/` | 100 | 100 | 100 | 100 | 0.39 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/arak/` | 100 | 100 | 100 | 100 | 0.43 s | 0.014 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/galerie/` | 100 | 100 | 100 | 100 | 0.47 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/gallery/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/galeria/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/ueber-uns/` | 100 | 100 | 100 | 100 | 0.51 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| desktop | `/en/about/` | 100 | 100 | 100 | 100 | 0.47 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| desktop | `/hu/rolunk/` | 100 | 100 | 100 | 100 | 0.48 s | 0.015 | 0 ms | 0 | forced-reflow-insight, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/kontakt/` | 100 | 100 | 100 | 100 | 0.29 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/contact/` | 100 | 100 | 100 | 100 | 0.29 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/kapcsolat/` | 100 | 100 | 100 | 100 | 0.29 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/termin-buchen/` | 100 | 100 | 100 | 100 | 0.32 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/book/` | 100 | 100 | 100 | 100 | 0.32 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/idopontfoglalas/` | 100 | 100 | 100 | 100 | 0.37 s | 0.001 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/faq/` | 100 | 100 | 100 | 100 | 0.25 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/faq/` | 100 | 100 | 100 | 100 | 0.41 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/gyik/` | 100 | 100 | 100 | 100 | 0.25 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/impressum/` | 100 | 100 | 100 | 100 | 0.39 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/imprint/` | 100 | 100 | 100 | 100 | 0.41 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/impresszum/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/datenschutz/` | 100 | 100 | 100 | 100 | 0.41 s | 0.014 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/privacy/` | 100 | 100 | 100 | 100 | 0.41 s | 0.015 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/adatvedelem/` | 100 | 100 | 100 | 100 | 0.44 s | 0.019 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/barrierefreiheit/` | 100 | 100 | 100 | 100 | 0.41 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/accessibility/` | 100 | 100 | 100 | 100 | 0.35 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/akadalymentesseg/` | 100 | 100 | 100 | 100 | 0.43 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
