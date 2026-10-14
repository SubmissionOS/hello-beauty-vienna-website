# Lighthouse

Gemessen am 2026-10-14 18:34 gegen die **Livegang-Fassung** (`PUBLIC_DEMO_MODE=false`, also ohne noindex; lokal ausgeliefert mit Brotli und Langzeit-Cache wie auf Vercel; UTC), Lighthouse mit Playwright-Chromium. Ohne Demo-Schutz erreicht SEO überall 100.
Mobil: Standard-Emulation (Moto G Power, simuliertes langsames 4G, 4× CPU). Desktop: 1350 × 940, ohne CPU-Drosselung.

**Minimum über alle 102 Messungen:** Performance 98 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 · max. LCP 2.25 s · max. CLS 0.041

| Gerät | Seite | Perf | A11y | BP | SEO | LCP | CLS | TBT | Long Tasks (eigenes JS) | Audits < 90 |
|---|---|---|---|---|---|---|---|---|---|---|
| mobil | `/` | 99 | 100 | 100 | 100 | 1.88 s | 0.006 | 26 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/` | 99 | 100 | 100 | 100 | 1.88 s | 0.001 | 61 ms | 1 | max-potential-fid, mainthread-work-breakdown, bootup-time, label-content-name-mismatch, image-delivery-insight |
| mobil | `/hu/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 0 ms | 1 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 63 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/` | 99 | 100 | 100 | 100 | 1.80 s | 0.001 | 70 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/nagelmodellage/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 81 ms | 1 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/nail-extensions/` | 99 | 100 | 100 | 100 | 1.88 s | 0.001 | 60 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/mukorom/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/manikuere/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 67 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/manicure/` | 99 | 100 | 100 | 100 | 1.88 s | 0.001 | 62 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/manikur/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/pedikuere/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 64 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/pedicure/` | 99 | 100 | 100 | 100 | 1.88 s | 0.001 | 65 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/pedikur/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 0 ms | 1 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/kosmetik/` | 98 | 100 | 100 | 100 | 2.25 s | 0.000 | 64 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/facials/` | 98 | 100 | 100 | 100 | 2.18 s | 0.001 | 68 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/kozmetika/` | 98 | 100 | 100 | 100 | 2.18 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/wimpern-augenbrauen/` | 98 | 100 | 100 | 100 | 2.18 s | 0.016 | 64 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/lashes-brows/` | 98 | 100 | 100 | 100 | 2.18 s | 0.001 | 63 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/szempilla-szemoldok/` | 98 | 100 | 100 | 100 | 2.18 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/leistungen/haarentfernung/` | 98 | 100 | 100 | 100 | 2.18 s | 0.000 | 65 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/services/hair-removal/` | 98 | 100 | 100 | 100 | 2.18 s | 0.001 | 68 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/szolgaltatasok/szortelenites/` | 98 | 100 | 100 | 100 | 2.18 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/preise/` | 99 | 100 | 100 | 100 | 1.73 s | 0.001 | 64 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/prices/` | 99 | 100 | 100 | 100 | 1.73 s | 0.001 | 69 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/arak/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/galerie/` | 98 | 100 | 100 | 100 | 1.96 s | 0.000 | 107 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/gallery/` | 98 | 100 | 100 | 100 | 1.95 s | 0.001 | 113 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/galeria/` | 98 | 100 | 100 | 100 | 1.95 s | 0.022 | 72 ms | 0 | max-potential-fid, label-content-name-mismatch, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/ueber-uns/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 69 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/about/` | 99 | 100 | 100 | 100 | 1.88 s | 0.001 | 84 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/rolunk/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 11 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/kontakt/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/contact/` | 99 | 100 | 100 | 100 | 1.80 s | 0.001 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/kapcsolat/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/termin-buchen/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 0 ms | 1 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/book/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 6 ms | 1 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/idopontfoglalas/` | 99 | 100 | 100 | 100 | 1.88 s | 0.000 | 0 ms | 0 | image-delivery-insight, network-dependency-tree-insight |
| mobil | `/faq/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 70 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/faq/` | 99 | 100 | 100 | 100 | 1.80 s | 0.001 | 64 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/gyik/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/impressum/` | 99 | 100 | 100 | 100 | 1.73 s | 0.002 | 66 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/imprint/` | 99 | 100 | 100 | 100 | 1.73 s | 0.012 | 74 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/impresszum/` | 99 | 100 | 100 | 100 | 1.73 s | 0.002 | 1 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/datenschutz/` | 99 | 100 | 100 | 100 | 1.73 s | 0.041 | 73 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/privacy/` | 99 | 100 | 100 | 100 | 1.73 s | 0.001 | 63 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/adatvedelem/` | 99 | 100 | 100 | 100 | 1.80 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/barrierefreiheit/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 69 ms | 0 | max-potential-fid, label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/en/accessibility/` | 99 | 100 | 100 | 100 | 1.73 s | 0.001 | 65 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| mobil | `/hu/akadalymentesseg/` | 99 | 100 | 100 | 100 | 1.73 s | 0.000 | 6 ms | 0 | label-content-name-mismatch, unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, network-dependency-tree-insight |
| desktop | `/en/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | label-content-name-mismatch, network-dependency-tree-insight |
| desktop | `/hu/` | 100 | 100 | 100 | 100 | 0.40 s | 0.002 | 0 ms | 0 | label-content-name-mismatch, network-dependency-tree-insight |
| desktop | `/leistungen/` | 100 | 100 | 100 | 100 | 0.36 s | 0.000 | 2 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/services/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/` | 100 | 100 | 100 | 100 | 0.28 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/leistungen/nagelmodellage/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/nail-extensions/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/mukorom/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/manikuere/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/manicure/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/manikur/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/pedikuere/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/pedicure/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/pedikur/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/kosmetik/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/facials/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/kozmetika/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/wimpern-augenbrauen/` | 100 | 100 | 100 | 100 | 0.42 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/lashes-brows/` | 100 | 100 | 100 | 100 | 0.42 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szempilla-szemoldok/` | 100 | 100 | 100 | 100 | 0.42 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/leistungen/haarentfernung/` | 100 | 100 | 100 | 100 | 0.42 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/services/hair-removal/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/szolgaltatasok/szortelenites/` | 100 | 100 | 100 | 100 | 0.42 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/preise/` | 100 | 100 | 100 | 100 | 0.38 s | 0.001 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/prices/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/arak/` | 100 | 100 | 100 | 100 | 0.40 s | 0.016 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/galerie/` | 100 | 100 | 100 | 100 | 0.30 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/gallery/` | 100 | 100 | 100 | 100 | 0.30 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/galeria/` | 100 | 100 | 100 | 100 | 0.30 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/ueber-uns/` | 100 | 100 | 100 | 100 | 0.48 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/en/about/` | 100 | 100 | 100 | 100 | 0.48 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/hu/rolunk/` | 100 | 100 | 100 | 100 | 0.50 s | 0.000 | 0 ms | 0 | unused-css-rules, image-delivery-insight, network-dependency-tree-insight |
| desktop | `/kontakt/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/contact/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/kapcsolat/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/termin-buchen/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/en/book/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/hu/idopontfoglalas/` | 100 | 100 | 100 | 100 | 0.40 s | 0.001 | 0 ms | 0 | network-dependency-tree-insight |
| desktop | `/faq/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/faq/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/gyik/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/impressum/` | 100 | 100 | 100 | 100 | 0.38 s | 0.001 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/imprint/` | 100 | 100 | 100 | 100 | 0.38 s | 0.001 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/impresszum/` | 100 | 100 | 100 | 100 | 0.40 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/datenschutz/` | 100 | 100 | 100 | 100 | 0.38 s | 0.015 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/privacy/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/adatvedelem/` | 100 | 100 | 100 | 100 | 0.40 s | 0.021 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/barrierefreiheit/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/en/accessibility/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
| desktop | `/hu/akadalymentesseg/` | 100 | 100 | 100 | 100 | 0.38 s | 0.000 | 0 ms | 0 | unused-css-rules, network-dependency-tree-insight |
