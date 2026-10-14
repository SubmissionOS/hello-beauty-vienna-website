/**
 * Gemeinsame Interaktionen aller Seiten. Kein Framework, keine Abhängigkeiten.
 * - Sheets (<dialog>): öffnen/schließen mit Animation, Wischen nach unten, Klick auf Hintergrund, Fokus-Rückgabe
 * - Disclosure-Popover (Desktop-Navigation)
 * - Header-Haarlinie beim Scrollen, Aktionsleiste bei offener Tastatur ausblenden
 * - Einblenden beim Scrollen (nur Elemente außerhalb des ersten Viewports)
 * - Sprachwahl für die Sitzung merken, Adresse kopieren
 */
import { store } from '../lib/store';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Sheets ---------------- */
const openers = new WeakMap<HTMLDialogElement, HTMLElement | null>();

function waitTransition(el: HTMLElement, ms: number): Promise<void> {
  if (reduced()) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.target === el) finish();
    };
    el.addEventListener('transitionend', onEnd);
    window.setTimeout(finish, ms + 60);
  });
}

export function openSheet(dialog: HTMLDialogElement, opener?: HTMLElement | null): void {
  if (dialog.open) return;
  openers.set(dialog, opener ?? (document.activeElement as HTMLElement | null));
  dialog.showModal();
  dialog.style.transform = '';
  // nächster Frame: Klasse setzen, damit die Transition läuft
  requestAnimationFrame(() => requestAnimationFrame(() => dialog.classList.add('is-open')));
  const first = dialog.querySelector<HTMLElement>('[data-autofocus]') ?? dialog.querySelector<HTMLElement>('[data-close]');
  first?.focus({ preventScroll: true });
}

export async function closeSheet(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open || dialog.dataset.closing) return;
  dialog.dataset.closing = '1';
  dialog.classList.remove('is-open');
  dialog.style.transform = '';
  await waitTransition(dialog, 320);
  dialog.close();
  delete dialog.dataset.closing;
}

function setupSheet(dialog: HTMLDialogElement): void {
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    void closeSheet(dialog);
  });
  dialog.addEventListener('close', () => {
    dialog.classList.remove('is-open');
    const back = openers.get(dialog);
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-close]')) {
      void closeSheet(dialog);
      return;
    }
    // Klick auf den Hintergrund (außerhalb der Dialogfläche)
    if (target === dialog) {
      const r = dialog.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) void closeSheet(dialog);
    }
  });

  // Wischen nach unten (nur Bottom-Sheet auf schmalen Bildschirmen)
  const handles = dialog.querySelectorAll<HTMLElement>('[data-sheet-grab], .sheet__head');
  let startY = 0;
  let dy = 0;
  let dragging = false;
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    dy = Math.max(0, e.clientY - startY);
    dialog.style.transform = `translateY(${dy}px)`;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    dialog.style.transition = '';
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (dy > dialog.getBoundingClientRect().height * 0.25) {
      void closeSheet(dialog);
    } else {
      dialog.style.transform = '';
    }
  };
  handles.forEach((h) =>
    h.addEventListener('pointerdown', (e) => {
      if (window.matchMedia('(min-width: 768px)').matches) return;
      if ((e.target as HTMLElement).closest('button')) return;
      dragging = true;
      startY = e.clientY;
      dy = 0;
      dialog.style.transition = 'none';
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    }),
  );
}

document.querySelectorAll<HTMLDialogElement>('dialog[data-sheet]').forEach(setupSheet);

document.addEventListener('click', (e) => {
  const opener = (e.target as HTMLElement).closest<HTMLElement>('[data-open]');
  if (!opener) return;
  const dialog = document.getElementById(opener.dataset.open ?? '');
  if (dialog instanceof HTMLDialogElement) {
    e.preventDefault();
    openSheet(dialog, opener);
  }
});

/* ---------------- Disclosure-Popover ---------------- */
document.querySelectorAll<HTMLButtonElement>('[data-disclosure]').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls') ?? '');
  if (!panel) return;
  const item = btn.parentElement!;
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      set(false);
      btn.focus();
    }
  });
  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget as Node | null)) set(false);
  });
  document.addEventListener('click', (e) => {
    if (!item.contains(e.target as Node)) set(false);
  });
  // Safari fokussiert Buttons beim Klick nicht – ESC deshalb dokumentweit abfangen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      set(false);
      btn.focus();
    }
  });
});

/* ---------------- Header & Aktionsleiste ---------------- */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry!.isIntersecting)).observe(sentinel);
}

const bar = document.querySelector<HTMLElement>('[data-bottom-bar]');
if (bar) {
  const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches('input:not([type=checkbox]):not([type=radio]), textarea, select');
  document.addEventListener('focusin', (e) => bar.classList.toggle('is-hidden', isField(e.target)));
  document.addEventListener('focusout', () => {
    window.setTimeout(() => bar.classList.toggle('is-hidden', isField(document.activeElement)), 50);
  });
}

/* ---------------- Fokus nie verdeckt (WCAG 2.4.11) ---------------- */
// Browser berücksichtigen scroll-padding beim Fokussieren nicht einheitlich (Safari). Darum: fokussiertes Element
// bei Bedarf so nachscrollen, dass es weder unter dem Header noch unter Aktionsleiste oder Sticky-Leisten liegt.
function unobscure(el: HTMLElement): void {
  if (el.closest('dialog, [data-header], [data-bottom-bar], .flow__bar, .flow__footer')) return;
  const r = el.getBoundingClientRect();
  if (!r.height) return;
  let top = header?.getBoundingClientRect().bottom ?? 0;
  let bottom = window.innerHeight;
  const flow = el.closest('.flow');
  const fb = flow?.querySelector<HTMLElement>('.flow__bar');
  const ff = flow?.querySelector<HTMLElement>('.flow__footer:not([hidden])');
  if (fb) top = Math.max(top, fb.getBoundingClientRect().bottom);
  if (ff) bottom = Math.min(bottom, ff.getBoundingClientRect().top);
  if (bar && getComputedStyle(bar).display !== 'none' && !bar.classList.contains('is-hidden')) bottom = Math.min(bottom, bar.getBoundingClientRect().top);
  const jump = document.querySelector<HTMLElement>('.jump');
  if (jump && getComputedStyle(jump).position === 'sticky' && jump.getBoundingClientRect().top <= top + 1) top = Math.max(top, jump.getBoundingClientRect().bottom);
  if (r.bottom < 0 || r.top > window.innerHeight) return;
  if (r.bottom > bottom - 8) window.scrollBy({ top: r.bottom - bottom + 16, behavior: 'instant' as ScrollBehavior });
  else if (r.top < top + 8) window.scrollBy({ top: r.top - top - 16, behavior: 'instant' as ScrollBehavior });
}
document.addEventListener('focusin', (e) => {
  const el = e.target;
  if (!(el instanceof HTMLElement) || el === document.body) return;
  // nur bei Tastaturfokus – Klicks (z. B. auf Ankerlinks) nicht beeinflussen
  if (!el.matches(':focus-visible') && !el.matches('input, textarea, select')) return;
  requestAnimationFrame(() => requestAnimationFrame(() => unobscure(el)));
});

/* ---------------- Sprache merken ---------------- */
// Die Wahl gilt für die Sitzung; keine automatische Umleitung. Genutzt dort, wo die Seite die Sprache nicht
// aus der Adresse kennt (Fehlerseite unter /404.html): der Rückweg führt zur Startseite der gewählten Sprache.
document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) =>
  a.addEventListener('click', () => store.set('hb-lang', a.dataset.langLink ?? '')),
);
const remembered = store.get('hb-lang');
const homeLink = document.querySelector<HTMLAnchorElement>('[data-home-link]');
if (homeLink && (remembered === 'en' || remembered === 'hu') && document.documentElement.lang.startsWith('de')) {
  homeLink.href = `/${remembered}/`;
  homeLink.lang = remembered;
}

/* ---------------- Adresse kopieren ---------------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  const status = document.getElementById(btn.dataset.status ?? '');
  const original = label?.textContent ?? '';
  btn.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      ok = true;
    } catch {
      ok = false;
    }
    const msg = ok ? btn.dataset.copied : btn.dataset.failed;
    if (label && msg) label.textContent = msg;
    if (status && msg) status.textContent = msg;
    btn.classList.toggle('is-done', ok);
    window.setTimeout(() => {
      if (label) label.textContent = original;
      btn.classList.remove('is-done');
    }, 2400);
  });
});
