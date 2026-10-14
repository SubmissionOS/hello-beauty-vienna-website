/**
 * Mega-Menü „Leistungen“ (Desktop ab 1024 px). Kein Framework.
 *
 * Zustände: closed · hover (per Maus geöffnet, nicht fixiert) · pinned (per Klick/Tipp/Tastatur fixiert).
 *
 * Maus (nur pointer: fine):
 *  - öffnet nach 120 ms Verweilen auf „Leistungen“
 *  - bleibt offen, solange der Zeiger auf dem Auslöser (samt unsichtbarer Brücke), im Panel oder dazwischen ist
 *  - schließt erst 300 ms nach dem Verlassen von Auslöser und Panel; kommt der Zeiger vorher zurück, bleibt es offen
 * Klick/Tipp:
 *  - öffnet und fixiert; ein fixiertes Menü schließt nicht beim Verlassen mit der Maus, sondern nur durch Klick
 *    außerhalb von Leiste und Panel, erneuten Klick auf den Auslöser oder ESC. Klick im Panel auf freie Fläche: bleibt offen.
 * Tastatur:
 *  - Enter/Leertaste öffnet, Fokus springt auf den ersten Link, Tab läuft durch das Panel, ESC schließt und gibt den Fokus an den
 *    Auslöser zurück, verlässt der Fokus das Panel, schließt es
 * Andere Navigationspunkte schließen ein offenes Menü beim Hovern bzw. Fokussieren.
 */
const trigger = document.querySelector<HTMLButtonElement>('[data-mega-trigger]');
const panel = trigger ? document.getElementById(trigger.getAttribute('aria-controls') ?? '') : null;
const header = document.querySelector<HTMLElement>('[data-header]');
const scrim = document.querySelector<HTMLElement>('[data-mega-scrim]');

if (trigger && panel && header) {
  type State = 'closed' | 'hover' | 'pinned';
  const OPEN_DELAY = 120;
  const CLOSE_DELAY = 300;
  const item = trigger.parentElement as HTMLElement;
  const desktop = window.matchMedia('(min-width: 1024px)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  let state: State = 'closed';
  let openTimer = 0;
  let closeTimer = 0;

  const clearTimers = () => {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);
  };
  const set = (next: State) => {
    state = next;
    const open = next !== 'closed';
    trigger.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-mega-open', open);
    scrim?.classList.toggle('is-open', open);
  };
  const close = () => {
    clearTimers();
    if (state !== 'closed') set('closed');
  };
  const mouse = (e: PointerEvent) => e.pointerType === 'mouse' && fine.matches && desktop.matches;

  // Hover: Auslöser samt Brücke und Panel gehören zum selben Listenelement
  item.addEventListener('pointerenter', (e) => {
    if (!mouse(e)) return;
    window.clearTimeout(closeTimer);
    if (state === 'closed') {
      window.clearTimeout(openTimer);
      openTimer = window.setTimeout(() => set('hover'), OPEN_DELAY);
    }
  });
  item.addEventListener('pointerleave', (e) => {
    if (!mouse(e)) return;
    window.clearTimeout(openTimer);
    if (state === 'hover') {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        if (state === 'hover') set('closed');
      }, CLOSE_DELAY);
    }
  });

  // Klick/Tipp/Tastatur: fixieren bzw. wieder schließen
  trigger.addEventListener('click', (e) => {
    clearTimers();
    if (state === 'pinned') {
      set('closed');
      return;
    }
    set('pinned');
    // Tastatur (detail 0): Fokus auf den ersten Link im Panel
    if (e.detail === 0) panel.querySelector<HTMLElement>('a[href]')?.focus();
  });

  // Klick außerhalb von Leiste und Panel schließt (auch auf die Abdunkelung); Klick auf einen Link im Panel schließt
  document.addEventListener('click', (e) => {
    if (state === 'closed') return;
    const target = e.target as Node;
    if (!header.contains(target)) close();
    else if (panel.contains(target) && (target as HTMLElement).closest('a[href]')) close();
  });

  // Abdunkelung: eigener Handler. iOS-Safari liefert auf Elementen ohne eigenen Klick-Handler kein click an einen
  // dokumentweiten Listener – ohne diesen Handler ließe sich das Menü per Tippen daneben nicht schließen.
  scrim?.addEventListener('click', close);

  // ESC (dokumentweit: Safari fokussiert Buttons beim Klick nicht): schließen, Fokus zurück zum Auslöser
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || state === 'closed') return;
    close();
    trigger.focus();
  });

  // Fokus landet außerhalb von Auslöser und Panel (Tab, anderer Navigationspunkt): schließen.
  // focusin statt focusout: Safari fokussiert Buttons beim Klick nicht, dann gäbe es kein focusout.
  document.addEventListener('focusin', (e) => {
    if (state !== 'closed' && !item.contains(e.target as Node)) close();
  });

  // Andere Navigationspunkte: beim Hovern schließen (Fokus siehe focusout)
  document.querySelectorAll<HTMLElement>('.desk-nav__item:not(.desk-nav__item--has-sub)').forEach((other) => {
    other.addEventListener('pointerenter', (e) => {
      if (mouse(e as PointerEvent)) close();
    });
  });

  // Fenster wird schmal (Menü-Sheet übernimmt) oder Seite kommt aus dem Cache zurück: geschlossen starten
  desktop.addEventListener('change', () => close());
  window.addEventListener('pageshow', () => close());
}
