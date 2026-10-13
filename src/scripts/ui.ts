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
  const first = dialog.querySelector<HTMLElement>('[aria-current="true"], [aria-current="page"]') ?? dialog.querySelector<HTMLElement>('[data-close]');
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

/* ---------------- Einblenden ---------------- */
const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if (reveals.length && 'IntersectionObserver' in window && !reduced()) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  const vh = window.innerHeight;
  reveals.forEach((el) => {
    // Was schon sichtbar ist, bleibt sichtbar (kein Aufblitzen)
    if (el.getBoundingClientRect().top < vh) return;
    el.classList.add('reveal--pending');
    io.observe(el);
  });
}

/* ---------------- Sprache merken ---------------- */
document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) =>
  a.addEventListener('click', () => store.set('hb-lang', a.dataset.langLink ?? '')),
);

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
