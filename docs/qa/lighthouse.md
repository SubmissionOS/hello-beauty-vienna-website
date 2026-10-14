# Lighthouse

Gemessen am 2026-10-14 18:47 gegen `npm run preview` (lokal, Demo-Modus: noindex, daher SEO 69 durch „Seite ist für die Indexierung gesperrt“) (UTC), Lighthouse mit Playwright-Chromium.
Mobil: Standard-Emulation (Moto G Power, simuliertes langsames 4G, 4× CPU). Desktop: 1350 × 940, ohne CPU-Drosselung.

**Minimum über alle 102 Messungen:** Performance 97 · Barrierefreiheit 100 · Best Practices 100 · SEO 69 · max. LCP 2.19 s · max. CLS 0.039

| Gerät | Seite | Perf | A11y | BP | SEO | LCP | CLS | TBT | Long Tasks (eigenes JS) | Audits < 90 |
|---|---|---|---|---|---|---|---|---|---|---|
| mobil | `/` | 99 | 100 | 100 | 69 | 1.89 s | 0.006 | 23 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/` | 99 | 100 | 100 | 69 | 1.89 s | 0.001 | 84 ms | 0 | max-potential-fid, mainthread-work-breakdown, bootup-time, label-content-name-mismatch, unused-css-rules |
| mobil | `/hu/` | 100 | 100 | 100 | 69 | 1.67 s | 0.000 | 34 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/` | 100 | 100 | 100 | 69 | 1.14 s | 0.000 | 83 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/services/` | 100 | 100 | 100 | 69 | 1.14 s | 0.001 | 83 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/szolgaltatasok/` | 100 | 100 | 100 | 69 | 1.14 s | 0.000 | 50 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/leistungen/nagelmodellage/` | 100 | 100 | 100 | 69 | 1.59 s | 0.000 | 62 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/nail-extensions/` | 100 | 100 | 100 | 69 | 1.81 s | 0.001 | 62 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/mukorom/` | 99 | 100 | 100 | 69 | 1.82 s | 0.000 | 71 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/manikuere/` | 100 | 100 | 100 | 69 | 1.44 s | 0.000 | 69 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/manicure/` | 99 | 100 | 100 | 69 | 1.81 s | 0.001 | 72 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/manikur/` | 100 | 100 | 100 | 69 | 1.44 s | 0.000 | 31 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/pedikuere/` | 99 | 100 | 100 | 69 | 1.81 s | 0.000 | 74 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/pedicure/` | 98 | 100 | 100 | 69 | 1.66 s | 0.001 | 142 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/szolgaltatasok/pedikur/` | 100 | 100 | 100 | 69 | 1.52 s | 0.000 | 29 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/kosmetik/` | 99 | 100 | 100 | 69 | 2.04 s | 0.000 | 80 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/facials/` | 98 | 100 | 100 | 69 | 2.04 s | 0.001 | 114 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/szolgaltatasok/kozmetika/` | 99 | 100 | 100 | 69 | 1.61 s | 0.000 | 69 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/leistungen/wimpern-augenbrauen/` | 98 | 100 | 100 | 69 | 2.19 s | 0.016 | 93 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/services/lashes-brows/` | 98 | 100 | 100 | 69 | 1.60 s | 0.001 | 150 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/szolgaltatasok/szempilla-szemoldok/` | 97 | 100 | 100 | 69 | 2.05 s | 0.000 | 144 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/leistungen/haarentfernung/` | 98 | 100 | 100 | 69 | 1.60 s | 0.000 | 166 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/services/hair-removal/` | 98 | 100 | 100 | 69 | 1.60 s | 0.001 | 141 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/szolgaltatasok/szortelenites/` | 99 | 100 | 100 | 69 | 1.60 s | 0.000 | 70 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/preise/` | 99 | 100 | 100 | 69 | 1.74 s | 0.000 | 65 ms | 0 | max-potential-fid, label-content-name-mismatch, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/prices/` | 99 | 100 | 100 | 69 | 1.07 s | 0.001 | 131 ms | 0 | max-potential-fid, label-content-name-mismatch, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/arak/` | 100 | 100 | 100 | 69 | 1.15 s | 0.000 | 72 ms | 1 | max-potential-fid, label-content-name-mismatch, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/galerie/` | 99 | 100 | 100 | 69 | 1.60 s | 0.000 | 66 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/gallery/` | 99 | 100 | 100 | 69 | 1.60 s | 0.000 | 65 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/galeria/` | 99 | 100 | 100 | 69 | 1.60 s | 0.022 | 68 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/ueber-uns/` | 99 | 100 | 100 | 69 | 1.37 s | 0.000 | 126 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/about/` | 98 | 100 | 100 | 69 | 1.37 s | 0.001 | 152 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/rolunk/` | 100 | 100 | 100 | 69 | 1.38 s | 0.000 | 71 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/kontakt/` | 99 | 100 | 100 | 69 | 1.15 s | 0.000 | 133 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/contact/` | 99 | 100 | 100 | 69 | 1.14 s | 0.000 | 131 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/kapcsolat/` | 99 | 100 | 100 | 69 | 1.14 s | 0.000 | 137 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/termin-buchen/` | 99 | 100 | 100 | 69 | 1.59 s | 0.000 | 0 ms | 0 | is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/book/` | 100 | 100 | 100 | 69 | 1.22 s | 0.000 | 0 ms | 0 | is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/idopontfoglalas/` | 100 | 100 | 100 | 69 | 1.14 s | 0.000 | 0 ms | 0 | is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/faq/` | 98 | 100 | 100 | 69 | 1.07 s | 0.000 | 156 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/faq/` | 99 | 100 | 100 | 69 | 1.07 s | 0.001 | 141 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/gyik/` | 100 | 100 | 100 | 69 | 1.14 s | 0.000 | 68 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/impressum/` | 99 | 100 | 100 | 69 | 1.06 s | 0.002 | 129 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/imprint/` | 99 | 100 | 100 | 69 | 1.74 s | 0.012 | 69 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/impresszum/` | 99 | 100 | 100 | 69 | 1.14 s | 0.002 | 133 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/datenschutz/` | 99 | 100 | 100 | 69 | 1.14 s | 0.039 | 126 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/privacy/` | 99 | 100 | 100 | 69 | 1.06 s | 0.001 | 142 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/adatvedelem/` | 100 | 100 | 100 | 69 | 1.14 s | 0.000 | 67 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/barrierefreiheit/` | 99 | 100 | 100 | 69 | 1.06 s | 0.000 | 133 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/en/accessibility/` | 99 | 100 | 100 | 69 | 1.14 s | 0.001 | 124 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| mobil | `/hu/akadalymentesseg/` | 98 | 100 | 100 | 69 | 1.14 s | 0.000 | 138 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, is-crawlable, image-delivery-insight |
| desktop | `/` | 100 | 100 | 100 | 69 | 0.45 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/` | 100 | 100 | 100 | 69 | 0.41 s | 0.002 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/` | 100 | 100 | 100 | 69 | 0.31 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/` | 100 | 100 | 100 | 69 | 0.42 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/` | 100 | 100 | 100 | 69 | 0.31 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/nagelmodellage/` | 100 | 100 | 100 | 69 | 0.36 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/nail-extensions/` | 100 | 100 | 100 | 69 | 0.37 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/mukorom/` | 100 | 100 | 100 | 69 | 0.42 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/manikuere/` | 100 | 100 | 100 | 69 | 0.34 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/manicure/` | 100 | 100 | 100 | 69 | 0.33 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/manikur/` | 100 | 100 | 100 | 69 | 0.35 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/pedikuere/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/pedicure/` | 100 | 100 | 100 | 69 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/pedikur/` | 100 | 100 | 100 | 69 | 0.39 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/kosmetik/` | 100 | 100 | 100 | 69 | 0.39 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/facials/` | 100 | 100 | 100 | 69 | 0.39 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/kozmetika/` | 100 | 100 | 100 | 69 | 0.39 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/wimpern-augenbrauen/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 1 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/lashes-brows/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szempilla-szemoldok/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/leistungen/haarentfernung/` | 100 | 100 | 100 | 69 | 0.41 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/services/hair-removal/` | 100 | 100 | 100 | 69 | 0.45 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szortelenites/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/preise/` | 100 | 100 | 100 | 69 | 0.30 s | 0.001 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/en/prices/` | 100 | 100 | 100 | 69 | 0.35 s | 0.000 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/arak/` | 100 | 100 | 100 | 69 | 0.30 s | 0.016 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/galerie/` | 100 | 100 | 100 | 69 | 0.35 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/gallery/` | 100 | 100 | 100 | 69 | 0.35 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/galeria/` | 100 | 100 | 100 | 69 | 0.35 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/ueber-uns/` | 100 | 100 | 100 | 69 | 0.48 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/en/about/` | 100 | 100 | 100 | 69 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/hu/rolunk/` | 100 | 100 | 100 | 69 | 0.44 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/kontakt/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/contact/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/kapcsolat/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/termin-buchen/` | 100 | 100 | 100 | 69 | 0.41 s | 0.000 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/en/book/` | 100 | 100 | 100 | 69 | 0.32 s | 0.000 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/idopontfoglalas/` | 100 | 100 | 100 | 69 | 0.33 s | 0.000 | 0 ms | 0 | is-crawlable, network-dependency-tree-insight |
| desktop | `/faq/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/faq/` | 100 | 100 | 100 | 69 | 0.29 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/gyik/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/impressum/` | 100 | 100 | 100 | 69 | 0.29 s | 0.001 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/imprint/` | 100 | 100 | 100 | 69 | 0.29 s | 0.001 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/impresszum/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/datenschutz/` | 100 | 100 | 100 | 69 | 0.29 s | 0.015 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/privacy/` | 100 | 100 | 100 | 69 | 0.29 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/adatvedelem/` | 100 | 100 | 100 | 69 | 0.29 s | 0.021 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/barrierefreiheit/` | 100 | 100 | 100 | 69 | 0.29 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/en/accessibility/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
| desktop | `/hu/akadalymentesseg/` | 100 | 100 | 100 | 69 | 0.30 s | 0.000 | 0 ms | 0 | unused-css-rules, is-crawlable, network-dependency-tree-insight |
