/**
 * Überlappungs-Prüfung und Pseudo-Lokalisierung. Beide laufen im Browser (page.evaluate).
 *
 * overlapAudit: Kein Textstück darf ein Bild oder ein anderes Textstück schneiden. Gemessen werden die
 * tatsächlichen Zeilenboxen des Texts (Range.getClientRects, auf die Zeilenhöhe gekürzt), nicht die Elementboxen –
 * so löst enger Zeilenabstand keinen Fehlalarm aus, ein Text, der über die Spaltengrenze ins Bild läuft, aber sehr wohl.
 * Ausgenommen: Elemente mit [data-overlay] (bewusstes Overlay) samt Nachfahren, position: fixed (Aktionsleiste),
 * versteckte und geschlossene Elemente.
 *
 * pseudoLocalize: verlängert jedes Wort um 40 % ("Hände" → "Hände··") und akzentuiert die Vokale, in eckigen
 * Klammern. Nur Zeichen aus Latin-1, damit die Schrift keinen Fallback braucht und das Ergebnis auf allen
 * Systemen gleich ist. So fallen längenabhängige Layoutfehler auf, bevor eine echte Sprache sie auslöst.
 */
export function overlapAudit(): string[] {
  const issues: string[] = [];
  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION', 'TITLE', 'HEAD']);
  const describe = (el: Element) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' && el.className ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : '';
    return `<${el.tagName.toLowerCase()}${id}${cls}>`;
  };

  const skippedCache = new Map<Element, boolean>();
  const skipped = (el: Element | null): boolean => {
    if (!el) return false;
    const cached = skippedCache.get(el);
    if (cached !== undefined) return cached;
    const cs = getComputedStyle(el);
    let res = false;
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0' || cs.position === 'fixed') res = true;
    // per clip-path / clip unsichtbar gemachte Elemente (Screenreader-only)
    else if (/inset\(\s*50%/.test(cs.clipPath) || /rect\(\s*0(px)?[ ,]+0(px)?[ ,]+0(px)?[ ,]+0(px)?\s*\)/.test(cs.clip)) res = true;
    else if (el.hasAttribute('hidden') || el.hasAttribute('data-overlay') || el.classList.contains('visually-hidden') || el.classList.contains('skip-link')) res = true;
    else if (el.tagName === 'DIALOG' && !(el as HTMLDialogElement).open) res = true;
    // Inhalt geschlossener <details> (außer der Zusammenfassung) ist nicht sichtbar, auch wenn der Browser Boxen meldet
    else if (el.tagName === 'DETAILS' && !(el as HTMLDetailsElement).open) res = false;
    else res = skipped(el.parentElement);
    if (!res && el.parentElement?.tagName === 'DETAILS' && !(el.parentElement as HTMLDetailsElement).open && el.tagName !== 'SUMMARY') res = true;
    skippedCache.set(el, res);
    return res;
  };

  interface Box {
    l: number;
    t: number;
    r: number;
    b: number;
    label: string;
    node?: Node;
  }

  /** schneidet die Box mit den sichtbaren Bereichen aller Scroll-/Clip-Vorfahren */
  const clip = (el: Element, box: Box): Box | null => {
    let { l, t, r, b } = box;
    for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
      const p = n.getBoundingClientRect();
      if (cs.overflowX !== 'visible') {
        l = Math.max(l, p.left);
        r = Math.min(r, p.right);
      }
      if (cs.overflowY !== 'visible') {
        t = Math.max(t, p.top);
        b = Math.min(b, p.bottom);
      }
    }
    return r - l > 1 && b - t > 1 ? { ...box, l, t, r, b } : null;
  };

  // Textzeilen
  const texts: Box[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const s = n.nodeValue ?? '';
    if (!s.trim()) continue;
    const owner = n.parentElement;
    if (!owner || ignoredTags.has(owner.tagName) || skipped(owner)) continue;
    const lh = parseFloat(getComputedStyle(owner).lineHeight);
    const range = document.createRange();
    range.selectNodeContents(n);
    for (const rect of range.getClientRects()) {
      if (rect.width < 1 || rect.height < 1) continue;
      let t = rect.top;
      let b = rect.bottom;
      if (!Number.isNaN(lh) && lh < rect.height) {
        const c = (t + b) / 2;
        t = c - lh / 2;
        b = c + lh / 2;
      }
      const box = clip(owner, { l: rect.left, t, r: rect.right, b, label: `„${s.trim().replace(/\s+/g, ' ').slice(0, 36)}“ in ${describe(owner)}`, node: n });
      if (box) texts.push(box);
    }
  }

  // Bilder (Icons unter 48 px zählen nicht: sie stehen bewusst neben Text)
  const images: Box[] = [];
  for (const el of document.body.querySelectorAll('img, video, canvas, svg')) {
    // Bestandteile innerhalb eines <svg> zählen nicht einzeln
    if (el.tagName === 'svg' ? el.parentElement?.closest('svg') : el.closest('svg')) continue;
    if (skipped(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (el.tagName === 'svg' && r.width < 48) continue;
    const src = el instanceof HTMLImageElement ? (el.currentSrc || el.src).split('/').pop()?.slice(0, 40) : el.tagName.toLowerCase();
    const box = clip(el, { l: r.left, t: r.top, r: r.right, b: r.bottom, label: `Bild ${src} in ${describe(el.parentElement ?? el)}` });
    if (box) images.push(box);
  }

  const cut = (a: Box, b: Box) => Math.min(a.r, b.r) - Math.max(a.l, b.l) > 1.5 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 1.5;
  const seen = new Set<string>();
  const add = (msg: string) => {
    if (!seen.has(msg) && issues.length < 14) {
      seen.add(msg);
      issues.push(msg);
    }
  };
  for (const t of texts) for (const img of images) if (cut(t, img)) add(`Text über Bild: ${t.label} × ${img.label}`);
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i]!;
      const b = texts[j]!;
      if (a.node === b.node) continue;
      if (cut(a, b)) add(`Text über Text: ${a.label} × ${b.label}`);
    }
  }
  return issues;
}

export function pseudoLocalize(): void {
  const accents: Record<string, string> = { a: 'ä', e: 'é', i: 'î', o: 'ö', u: 'ü', A: 'Å', E: 'È', I: 'Ï', O: 'Ô', U: 'Ü', c: 'ç', n: 'ñ' };
  const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION', 'TITLE']);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const p = n.parentElement;
    if (p && !skip.has(p.tagName) && (n.nodeValue ?? '').trim()) nodes.push(n as Text);
  }
  for (const n of nodes) {
    const v = n.nodeValue ?? '';
    const lead = /^\s*/.exec(v)![0];
    const trail = /\s*$/.exec(v)![0];
    const core = v.trim();
    const long = core.replace(/\S+/g, (w) => w.replace(/[aeiouAEIOUcn]/g, (c) => accents[c] ?? c) + '·'.repeat(Math.ceil(w.length * 0.4)));
    n.nodeValue = `${lead}[${long}]${trail}`;
  }
}
