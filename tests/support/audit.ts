/**
 * Layout-Prüfungen im Browser. Wird per page.evaluate(layoutAudit, { mobile }) ausgeführt
 * und liefert eine Liste lesbarer Befunde (leer = alles in Ordnung).
 */
export function layoutAudit({ mobile }: { mobile: boolean }): string[] {
  const issues: string[] = [];
  const vw = document.documentElement.clientWidth;
  const describe = (el: Element) => {
    const id = el.id ? `#${el.id}` : '';
    const cls = typeof el.className === 'string' && el.className ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : '';
    const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return `<${el.tagName.toLowerCase()}${id}${cls}> „${text}“`;
  };
  const hidden = (el: Element): boolean => {
    for (let n: Element | null = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
      // per clip-path / clip unsichtbar gemachte Screenreader-Texte
      if (/inset\(\s*50%/.test(cs.clipPath) || /rect\(\s*0(px)?[ ,]+0(px)?[ ,]+0(px)?[ ,]+0(px)?\s*\)/.test(cs.clip)) return true;
      if (n.classList.contains('visually-hidden') || n.classList.contains('hp') || n.classList.contains('skip-link')) return true;
      if (n.tagName === 'DIALOG' && !(n as HTMLDialogElement).open) return true;
      if (n.hasAttribute('hidden')) return true;
      if (n.tagName === 'DETAILS' && !(n as HTMLDetailsElement).open && n !== el && !n.querySelector(':scope > summary')?.contains(el)) return true;
    }
    return false;
  };
  const clippedByAncestor = (el: Element): boolean => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.overflowX !== 'visible' || cs.overflow === 'hidden' || cs.overflow === 'clip') return true;
    }
    return false;
  };

  // 0. hidden-Attribut wird respektiert
  for (const el of document.querySelectorAll<HTMLElement>('[hidden]')) {
    if (getComputedStyle(el).display !== 'none') issues.push(`Element mit hidden ist sichtbar: ${describe(el)}`);
  }

  // 1. Kein horizontales Scrollen
  const de = document.documentElement;
  if (de.scrollWidth > de.clientWidth + 1) issues.push(`Horizontaler Scroll: html.scrollWidth ${de.scrollWidth} > ${de.clientWidth}`);
  if (document.body.scrollWidth > document.body.clientWidth + 1) issues.push(`Horizontaler Scroll: body.scrollWidth ${document.body.scrollWidth} > ${document.body.clientWidth}`);

  const all = [...document.body.querySelectorAll<HTMLElement>('*')].filter((el) => !hidden(el));

  // 2. Nichts ragt aus dem Viewport (außer in Scroll-/Clip-Containern)
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if ((r.right > vw + 1 || r.left < -1) && !clippedByAncestor(el) && getComputedStyle(el).position !== 'fixed') {
      issues.push(`Ragt aus dem Viewport (${Math.round(r.left)}–${Math.round(r.right)} bei ${vw}): ${describe(el)}`);
    }
  }

  // 3. Abgeschnittener / überlaufender Text
  const textTags = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'LI', 'A', 'BUTTON', 'LABEL', 'DT', 'DD', 'TD', 'TH', 'SUMMARY', 'LEGEND', 'SPAN', 'STRONG']);
  for (const el of all) {
    if (!textTags.has(el.tagName)) continue;
    if (!el.textContent?.trim()) continue;
    if (el.closest('svg')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'inline') continue;
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      // horizontal scrollbare Container (Chips) sind gewollt
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') continue;
      issues.push(`Text läuft über (${el.scrollWidth} > ${el.clientWidth}): ${describe(el)}`);
    }
  }

  // 4. Interaktive Elemente: nicht verdeckt, Touch-Ziel ≥ 44×44 (mobil)
  const interactive = all.filter((el) =>
    el.matches('a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=radio], [role=checkbox], [role=switch], [tabindex]:not([tabindex="-1"])'),
  );
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    // Eingebettete Textlinks (inline im Fließtext) sind von 2.5.8 ausgenommen
    const inlineText = getComputedStyle(el).display === 'inline' && el.closest('p, li, dd, .prose, .field__hint, .check, .cell__sub');
    const target = el.matches('input[type=checkbox], input[type=radio]') ? el.closest('label') ?? el : el;
    const tr = target.getBoundingClientRect();
    if (mobile && !inlineText && el.matches(':not(input[type=checkbox]):not(input[type=radio])') && (tr.width < 43.5 || tr.height < 43.5)) {
      issues.push(`Touch-Ziel ${Math.round(tr.width)}×${Math.round(tr.height)} < 44: ${describe(el)}`);
    }
    if (mobile && el.matches('input[type=checkbox], input[type=radio]') && (tr.width < 43.5 || tr.height < 43.5)) {
      issues.push(`Touch-Ziel (Label) ${Math.round(tr.width)}×${Math.round(tr.height)} < 44: ${describe(el)}`);
    }
  }

  // 5. Bilder: geladen und mit alt-Attribut
  for (const img of document.images) {
    if (hidden(img)) continue;
    if (!img.hasAttribute('alt')) issues.push(`Bild ohne alt: ${img.currentSrc || img.src}`);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) issues.push(`Bild nicht geladen: ${img.currentSrc || img.src}`);
  }

  // 6. Sichtbare Platzhalter-Syntax / Schlüsselnamen / Variablen
  const text = document.body.innerText;
  const keyLike = text.match(/\b(?:svc|booking|home|nav|cta|a11y|units|facts)\.[a-z]+(?:\.[a-zA-Z]+)?\b/g);
  if (keyLike) issues.push(`Schlüsselnamen im UI: ${[...new Set(keyLike)].join(', ')}`);
  const vars = text.match(/\{[a-z]+\}/gi);
  if (vars) issues.push(`Unersetzte Variablen: ${[...new Set(vars)].join(', ')}`);
  if (/\[\[/.test(text)) issues.push('Unaufgelöste interne Link-Syntax [[…]]');
  if (/undefined|NaN|\[object Object\]/.test(text)) issues.push('undefined/NaN/[object Object] im Text');

  // 7. Genau eine h1, logische Überschriften
  const h1 = document.querySelectorAll('h1');
  if (h1.length !== 1) issues.push(`Anzahl h1: ${h1.length}`);
  let last = 1;
  for (const h of document.querySelectorAll('main h1, main h2, main h3, main h4')) {
    if (hidden(h)) continue;
    const lvl = Number(h.tagName[1]);
    if (lvl > last + 1) issues.push(`Überschriftensprung h${last} → h${lvl}: ${describe(h)}`);
    last = lvl;
  }
  return issues;
}

/** Prüft, ob Fokusziele nach dem Fokussieren (Browser scrollt mit scroll-padding) vom Sticky-Header oder der Aktionsleiste verdeckt werden. */
export async function coveredTargets(): Promise<string[]> {
  const issues: string[] = [];
  document.documentElement.style.scrollBehavior = 'auto';
  const els = [...document.querySelectorAll<HTMLElement>('main a[href], main button, main input:not([type=hidden]), main summary, main textarea')].filter((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !el.closest('[hidden], dialog:not([open]), .visually-hidden, details:not([open]) > :not(summary)');
  });
  for (const el of els.slice(0, 120)) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    el.focus();
    if (document.activeElement !== el) el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
    // Headless-WebKit scrollt bei focus() nicht: Browser-Verhalten (nearest) nachbilden, danach greift der Fokus-Wächter
    const vr = el.getBoundingClientRect();
    if (vr.bottom > innerHeight || vr.top < 0) el.scrollIntoView({ block: 'nearest', behavior: 'instant' as ScrollBehavior });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))));
    const target = el.matches('input[type=checkbox], input[type=radio]') ? (el.closest('label') ?? el) : el;
    const r = target.getBoundingClientRect();
    const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
    const y = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1);
    const hit = document.elementFromPoint(x, y);
    if (hit && !target.contains(hit) && !hit.contains(target) && !(el.matches('input') && hit.closest('label')?.contains(el))) {
      const by = hit.closest('header, [data-bottom-bar], .flow__bar, .flow__footer, .jump') ?? hit;
      issues.push(`Verdeckt: <${el.tagName.toLowerCase()}> „${(el.textContent ?? el.getAttribute('aria-label') ?? '').trim().slice(0, 30)}“ durch <${by.tagName.toLowerCase()} class="${by.className}">`);
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  return issues;
}
