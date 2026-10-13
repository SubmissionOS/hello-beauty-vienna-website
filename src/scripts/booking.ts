/**
 * Buchungsflow (7 Schritte). Kennt nur die Schnittstelle `api` aus lib/booking – nie den Adapter.
 * Zustand liegt im sessionStorage (Eingaben bleiben beim Zurückgehen, Neuladen und Sprachwechsel erhalten).
 */
import { api, isDemo, demoControls as mockControls, BookingError, type Booking, type DayStatus, type Slot } from '../lib/booking';
import { addDays, compareDates, daysInMonth, hhmm, parseIsoDate, splitDateTime, toIsoDate, viennaNow, weekdayMon0 } from '../lib/booking/time';
import { store } from '../lib/store';
import { fmtClient as fmt } from './fmt';
import { EMAIL, PHONE } from './contact-form';

type Dict = {
  lang: 'de' | 'en' | 'hu';
  intl: string;
  b: Record<string, any>;
  days: { short: string[]; long: string[] };
  months: string[];
  units: Record<string, string>;
  homeHref: string;
  address: string;
  phone: string;
};

interface Draft {
  v: 2;
  step: number;
  maxStep: number;
  services: string[];
  staff: string;
  month: string;
  date: string | null;
  slot: Slot | null;
  name: string;
  phone: string;
  email: string;
  note: string;
  terms: boolean;
  earlyStart: boolean;
  payment: 'onsite';
  idem: string;
  done: Booking | null;
}

const KEY = 'hb-booking';
const TOTAL = 7;
const MAX_MIN = 300;
const HORIZON_DAYS = 120;

export function initBooking(): void {
  const rootEl = document.querySelector<HTMLElement>('[data-booking]');
  const dataEl = document.getElementById('booking-data');
  if (!rootEl || !dataEl) return;
  const root: HTMLElement = rootEl;
  const D = JSON.parse(dataEl.textContent ?? '{}') as Dict;
  const B = D.b;
  const $ = <T extends HTMLElement = HTMLElement>(sel: string, el: ParentNode = root) => el.querySelector<T>(sel)!;
  const $$ = <T extends HTMLElement = HTMLElement>(sel: string, el: ParentNode = root) => [...el.querySelectorAll<T>(sel)];

  root.hidden = false;
  const live = $('[data-live]');
  const announce = (msg: string) => {
    live.textContent = '';
    window.setTimeout(() => (live.textContent = msg), 30);
  };

  const today = viennaNow().date;
  const newKey = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const blank = (): Draft => ({
    v: 2,
    step: 1,
    maxStep: 1,
    services: [],
    staff: '',
    month: today.slice(0, 7),
    date: null,
    slot: null,
    name: '',
    phone: '',
    email: '',
    note: '',
    terms: false,
    earlyStart: false,
    payment: 'onsite',
    idem: newKey(),
    done: null,
  });

  let s: Draft = (() => {
    try {
      const raw = store.get(KEY);
      const x = raw ? (JSON.parse(raw) as Draft) : null;
      return x && x.v === 2 ? x : blank();
    } catch {
      return blank();
    }
  })();
  const save = () => store.set(KEY, JSON.stringify(s));

  // Deep-Link ?leistung=… (auch ?service=)
  const params = new URLSearchParams(location.search);
  const pre = params.get('leistung') ?? params.get('service');
  const preInput = pre ? $$<HTMLInputElement>('input[name="svc"]').find((i) => i.value === pre) : undefined;
  if (pre && preInput) {
    s = { ...blank(), services: [pre] };
    params.delete('leistung');
    params.delete('service');
    const q = params.toString();
    history.replaceState(null, '', `${location.pathname}${q ? `?${q}` : ''}`);
  }
  const demo = params.get('demo');
  if (isDemo && demo === 'network') mockControls.set({ failNext: true });
  if (isDemo && demo === 'conflict') mockControls.set({ conflictNext: true });

  /* ---------------- Formatierung ---------------- */
  const euro = (n: number) =>
    `${new Intl.NumberFormat(D.intl, { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)}\u00a0€`;
  const dur = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return fmt(D.units.hoursMinutes!, { h, m });
    if (h) return fmt(D.units.hours!, { h });
    return fmt(D.units.minutes!, { n: m });
  };
  const dateLong = (iso: string) => {
    const { d, m, y } = parseIsoDate(iso);
    const wd = D.days.long[weekdayMon0(iso)]!;
    if (D.lang === 'hu') return `${y}. ${D.months[m - 1]} ${d}., ${wd.toLowerCase()}`;
    if (D.lang === 'en') return `${wd}, ${d} ${D.months[m - 1]} ${y}`;
    return `${wd}, ${d}. ${D.months[m - 1]} ${y}`;
  };
  const time = (iso: string) => hhmm(splitDateTime(iso).minutes);

  /* ---------------- Leistungen ---------------- */
  const svcInputs = $$<HTMLInputElement>('input[name="svc"]');
  const selected = () => svcInputs.filter((i) => s.services.includes(i.value));
  const totals = () => {
    const sel = selected();
    const min = sel.reduce((a, i) => a + Number(i.dataset.min), 0);
    const price = sel.reduce((a, i) => a + Number(i.dataset.price), 0);
    const from = sel.some((i) => i.dataset.from);
    const main = sel.filter((i) => !i.dataset.addon).length;
    return { sel, min, price, from, main };
  };

  for (const inp of svcInputs) {
    inp.checked = s.services.includes(inp.value);
    inp.addEventListener('change', () => {
      s.services = svcInputs.filter((i) => i.checked).map((i) => i.value);
      s.slot = null;
      s.maxStep = Math.min(s.maxStep, 2);
      monthCache.clear();
      save();
      updateCounts();
      updateTotals();
      clearError();
    });
  }

  function updateCounts() {
    for (const cat of $$('[data-cat]').filter((x) => x.tagName === 'DETAILS')) {
      const n = $$<HTMLInputElement>('input[name="svc"]', cat).filter((i) => i.checked).length;
      $('[data-cat-count]', cat).textContent = n ? fmt(B.service.selected, { n }) : '';
    }
  }

  if (s.services.length) {
    const first = svcInputs.find((i) => i.value === s.services[0]);
    const det = first?.closest('details');
    if (det) det.open = true;
    if (preInput) {
      const box = $('[data-preselected]');
      box.hidden = false;
      $('span', box).textContent = fmt(B.service.preselected, { service: preInput.dataset.name ?? '' });
    }
  } else {
    const firstCat = $<HTMLDetailsElement>('details.svc-cat');
    firstCat.open = true;
  }

  /* ---------------- Mitarbeiterin ---------------- */
  const staffInputs = $$<HTMLInputElement>('input[name="staff"]');
  for (const r of staffInputs) {
    r.checked = r.value === s.staff;
    r.addEventListener('change', () => {
      s.staff = r.value;
      s.slot = null;
      s.maxStep = Math.min(s.maxStep, 3);
      monthCache.clear();
      save();
      updateTotals();
    });
  }
  const staffLabel = () => {
    const r = staffInputs.find((x) => x.value === s.staff);
    return r?.closest('label')?.querySelector('.cell__title')?.textContent ?? B.staff.any;
  };

  /* ---------------- Zusammenfassung ---------------- */
  const footer = $('[data-footer]');
  const totalEl = $('[data-total]');
  const side = document.querySelector<HTMLElement>('[data-side-summary]');

  function updateTotals() {
    const t = totals();
    const price = t.from ? fmt(D.units.from!, { price: euro(t.price) }) : euro(t.price);
    if (!t.sel.length) {
      totalEl.textContent = B.service.none;
    } else {
      totalEl.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = price;
      totalEl.append(strong, `${fmt(B.service.selected, { n: t.sel.length })} · ${dur(t.min)}`);
    }
    if (side) {
      side.innerHTML = '';
      if (!t.sel.length) {
        const p = document.createElement('p');
        p.className = 'muted';
        p.textContent = B.service.none;
        side.append(p);
        return;
      }
      const ul = document.createElement('ul');
      for (const i of t.sel) {
        const li = document.createElement('li');
        const a = document.createElement('span');
        a.textContent = i.dataset.name ?? '';
        const v = document.createElement('span');
        v.className = 'muted';
        v.textContent = i.dataset.from ? fmt(D.units.from!, { price: euro(Number(i.dataset.price)) }) : euro(Number(i.dataset.price));
        li.append(a, v);
        ul.append(li);
      }
      side.append(ul);
      const meta = document.createElement('p');
      meta.className = 'muted';
      meta.textContent = [s.staff ? staffLabel() : null, s.date ? dateLong(s.date) : null, s.slot ? `${time(s.slot.start)}–${time(s.slot.end)}` : null, dur(t.min)]
        .filter(Boolean)
        .join(' · ');
      side.append(meta);
      const tot = document.createElement('p');
      tot.className = 'side__total';
      const l = document.createElement('span');
      l.textContent = B.payment.total;
      const r = document.createElement('span');
      r.textContent = price;
      tot.append(l, r);
      side.append(tot);
    }
  }

  /* ---------------- Schritte ---------------- */
  const steps = $$('[data-step]').filter((x) => x.tagName === 'SECTION');
  const back = $<HTMLButtonElement>('[data-back]');
  const next = $<HTMLButtonElement>('[data-next]');
  const stepError = $('[data-step-error]');
  const progressLabel = $('[data-progress-label]');
  const progressBar = $('[data-progress-bar]');
  const clearError = () => (stepError.textContent = '');
  const showError = (msg: string) => {
    stepError.textContent = msg;
  };

  function show(n: number, opts: { focus?: boolean; push?: boolean } = {}) {
    const { focus = true, push = true } = opts;
    s.step = n;
    s.maxStep = Math.max(s.maxStep, n);
    save();
    for (const sec of steps) sec.hidden = Number(sec.dataset.step) !== n;
    back.hidden = n === 1 || n === TOTAL;
    footer.hidden = n >= 6;
    progressLabel.textContent = fmt(B.progress, { current: n, total: TOTAL });
    progressBar.style.width = `${(n / TOTAL) * 100}%`;
    clearError();
    if (push && location.hash !== `#step-${n}`) history.pushState({ step: n }, '', `#step-${n}`);
    if (n === 3) void renderCalendar();
    if (n === 4) void loadSlots();
    if (n === 5) updateEarly();
    if (n === 6) renderSummary($('[data-summary]'), true);
    if (n === 7) renderDone();
    const h = $<HTMLElement>(`#st${n}`);
    announce(`${fmt(B.progress, { current: n, total: TOTAL })}: ${B.steps[n - 1]}`);
    if (focus) {
      h.focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top + window.scrollY - 80;
      if (window.scrollY > top) window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }

  function validate(n: number): boolean {
    if (n === 1) {
      const t = totals();
      if (!t.sel.length) return showError(B.service.none), false;
      if (!t.main) return showError(B.service.addonOnly), false;
      if (t.min > MAX_MIN) return showError(fmt(B.service.tooLong, { h: MAX_MIN / 60 })), false;
    }
    if (n === 3 && !s.date) return showError(B.date.title), false;
    if (n === 4 && !s.slot) return showError(B.time.title), false;
    if (n === 5) return validateDetails();
    return true;
  }

  next.addEventListener('click', () => {
    if (!validate(s.step)) {
      stepError.setAttribute('role', 'alert');
      return;
    }
    show(s.step + 1);
  });
  back.addEventListener('click', () => {
    if (history.state && typeof history.state.step === 'number' && history.state.step > 1) history.back();
    else show(Math.max(1, s.step - 1));
  });
  window.addEventListener('popstate', (e) => {
    const target = (e.state && typeof e.state.step === 'number' ? e.state.step : Number(location.hash.replace('#step-', ''))) || 1;
    if (s.done && target < TOTAL) {
      show(TOTAL, { push: false });
      return;
    }
    show(Math.min(Math.max(1, target), s.maxStep, TOTAL - 1), { push: false });
  });

  /* ---------------- Kalender (WAI-ARIA APG Date Picker Grid) ---------------- */
  const calBody = $('[data-cal-body]');
  const calTitle = $('[data-cal-title]');
  const calGrid = $('[data-cal-grid]');
  const prevBtn = $<HTMLButtonElement>('[data-cal-prev]');
  const nextBtn = $<HTMLButtonElement>('[data-cal-next]');
  const monthCache = new Map<string, Record<string, DayStatus>>();
  const lastDay = addDays(today, HORIZON_DAYS);
  let focusDate = s.date ?? today;
  let calToken = 0;

  const monthOf = (iso: string) => iso.slice(0, 7);
  const statusLabel: Record<DayStatus, string> = { available: B.date.available, full: B.date.full, closed: B.date.closed, past: B.date.past };

  async function fetchMonth(month: string): Promise<Record<string, DayStatus>> {
    const key = `${month}|${s.staff}|${s.services.join(',')}`;
    const hit = monthCache.get(key);
    if (hit) return hit;
    const [y, m] = month.split('-').map(Number) as [number, number];
    const res = await api.getAvailability({
      serviceIds: s.services,
      from: toIsoDate(y, m, 1),
      to: toIsoDate(y, m, daysInMonth(y, m)),
      staffId: s.staff || null,
    });
    const map: Record<string, DayStatus> = {};
    for (const d of res.days) map[d.date] = d.status;
    monthCache.set(key, map);
    return map;
  }

  async function renderCalendar(focusCell = false) {
    const month = s.month;
    const [y, m] = month.split('-').map(Number) as [number, number];
    calTitle.textContent = `${D.months[m - 1]} ${y}`;
    calGrid.setAttribute('aria-label', fmt(B.date.gridLabel, { month: `${D.months[m - 1]} ${y}` }));
    prevBtn.setAttribute('aria-disabled', String(month <= monthOf(today)));
    nextBtn.setAttribute('aria-disabled', String(month >= monthOf(lastDay)));
    if (monthOf(focusDate) !== month) focusDate = month === monthOf(today) ? today : `${month}-01`;
    draw(null, focusCell);
    const token = ++calToken;
    calGrid.setAttribute('aria-busy', 'true');
    announce(B.date.loading);
    try {
      const map = await fetchMonth(month);
      if (token !== calToken) return;
      draw(map, focusCell || calBody.contains(document.activeElement));
      calGrid.setAttribute('aria-busy', 'false');
      announce(`${D.months[m - 1]} ${y}`);
    } catch {
      if (token !== calToken) return;
      calGrid.setAttribute('aria-busy', 'false');
      draw({}, false);
      showError(B.time.error);
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'btn btn--secondary btn--sm';
      retry.textContent = B.time.retry;
      retry.addEventListener('click', () => {
        clearError();
        retry.remove();
        void renderCalendar(true);
      });
      $('[data-calendar]').append(retry);
    }
  }

  function draw(map: Record<string, DayStatus> | null, focusCell: boolean) {
    const [y, m] = s.month.split('-').map(Number) as [number, number];
    const first = toIsoDate(y, m, 1);
    const lead = weekdayMon0(first);
    const n = daysInMonth(y, m);
    calBody.innerHTML = '';
    let row = document.createElement('tr');
    for (let i = 0; i < lead; i++) row.append(document.createElement('td'));
    for (let d = 1; d <= n; d++) {
      const iso = toIsoDate(y, m, d);
      const td = document.createElement('td');
      td.setAttribute('role', 'gridcell');
      const cell = document.createElement('div');
      cell.className = 'day';
      cell.dataset.date = iso;
      cell.textContent = String(d);
      let st: DayStatus | 'loading' = 'loading';
      if (weekdayMon0(iso) === 6) st = 'closed';
      else if (compareDates(iso, today) < 0) st = 'past';
      else if (compareDates(iso, lastDay) > 0) st = 'closed';
      else if (map) st = map[iso] ?? 'closed';
      cell.classList.add(`is-${st}`);
      if (iso === today) cell.classList.add('is-today');
      const enabled = st === 'available';
      if (!enabled) cell.setAttribute('aria-disabled', 'true');
      cell.setAttribute('aria-selected', String(iso === s.date));
      const extra = st === 'loading' ? B.date.loading : statusLabel[st];
      cell.setAttribute('aria-label', `${dateLong(iso)}${iso === today ? `, ${B.date.today}` : ''}, ${extra}`);
      cell.tabIndex = iso === focusDate ? 0 : -1;
      td.append(cell);
      row.append(td);
      if ((lead + d) % 7 === 0) {
        calBody.append(row);
        row = document.createElement('tr');
      }
    }
    if (row.children.length) {
      while (row.children.length < 7) row.append(document.createElement('td'));
      calBody.append(row);
    }
    if (!calBody.querySelector('[tabindex="0"]')) calBody.querySelector<HTMLElement>('.day')?.setAttribute('tabindex', '0');
    if (focusCell) calBody.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  }

  function selectDate(iso: string) {
    const cell = calBody.querySelector<HTMLElement>(`[data-date="${iso}"]`);
    if (!cell || cell.getAttribute('aria-disabled') === 'true') return;
    if (s.date !== iso) s.slot = null;
    s.date = iso;
    s.maxStep = Math.min(s.maxStep, 4);
    focusDate = iso;
    save();
    for (const c of calBody.querySelectorAll<HTMLElement>('.day')) c.setAttribute('aria-selected', String(c.dataset.date === iso));
    announce(`${dateLong(iso)}, ${B.date.selected}`);
    clearError();
    updateTotals();
  }

  function moveFocus(iso: string) {
    if (compareDates(iso, `${monthOf(today)}-01`) < 0) iso = today;
    if (compareDates(iso, lastDay) > 0) iso = lastDay;
    focusDate = iso;
    if (monthOf(iso) !== s.month) {
      s.month = monthOf(iso);
      save();
      void renderCalendar(true);
      return;
    }
    for (const c of calBody.querySelectorAll<HTMLElement>('.day')) c.tabIndex = c.dataset.date === iso ? 0 : -1;
    calBody.querySelector<HTMLElement>(`[data-date="${iso}"]`)?.focus();
  }

  const shiftMonth = (iso: string, delta: number) => {
    const { y, m, d } = parseIsoDate(iso);
    const t = new Date(Date.UTC(y, m - 1 + delta, 1));
    const ny = t.getUTCFullYear();
    const nm = t.getUTCMonth() + 1;
    return toIsoDate(ny, nm, Math.min(d, daysInMonth(ny, nm)));
  };

  calBody.addEventListener('click', (e) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>('.day');
    if (cell?.dataset.date) {
      focusDate = cell.dataset.date;
      for (const c of calBody.querySelectorAll<HTMLElement>('.day')) c.tabIndex = c === cell ? 0 : -1;
      selectDate(cell.dataset.date);
    }
  });
  calBody.addEventListener('keydown', (e) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>('.day');
    if (!cell?.dataset.date) return;
    const iso = cell.dataset.date;
    const wd = weekdayMon0(iso);
    const map: Record<string, () => string> = {
      ArrowRight: () => addDays(iso, 1),
      ArrowLeft: () => addDays(iso, -1),
      ArrowDown: () => addDays(iso, 7),
      ArrowUp: () => addDays(iso, -7),
      Home: () => addDays(iso, -wd),
      End: () => addDays(iso, 6 - wd),
      PageUp: () => shiftMonth(iso, e.shiftKey ? -12 : -1),
      PageDown: () => shiftMonth(iso, e.shiftKey ? 12 : 1),
    };
    if (map[e.key]) {
      e.preventDefault();
      moveFocus(map[e.key]!());
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectDate(iso);
    }
  });
  prevBtn.addEventListener('click', () => {
    if (prevBtn.getAttribute('aria-disabled') === 'true') return;
    s.month = monthOf(shiftMonth(`${s.month}-01`, -1));
    save();
    void renderCalendar();
  });
  nextBtn.addEventListener('click', () => {
    if (nextBtn.getAttribute('aria-disabled') === 'true') return;
    s.month = monthOf(shiftMonth(`${s.month}-01`, 1));
    save();
    void renderCalendar();
  });

  /* ---------------- Uhrzeiten ---------------- */
  const slotsBox = $('[data-slots]');
  const timeFor = $('[data-time-for]');
  let slotToken = 0;

  async function loadSlots() {
    if (!s.date) return;
    timeFor.textContent = fmt(B.time.for, { date: dateLong(s.date) });
    const token = ++slotToken;
    slotsBox.setAttribute('aria-busy', 'true');
    slotsBox.innerHTML = '';
    const sk = document.createElement('div');
    sk.className = 'skeleton';
    sk.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 12; i++) sk.append(document.createElement('span'));
    const loading = document.createElement('p');
    loading.className = 'visually-hidden';
    loading.textContent = B.time.loading;
    slotsBox.append(loading, sk);
    announce(B.time.loading);
    try {
      const res = await api.getAvailability({ serviceIds: s.services, date: s.date, staffId: s.staff || null });
      if (token !== slotToken) return;
      const day = res.days[0];
      slotsBox.setAttribute('aria-busy', 'false');
      if (!day || !day.slots.length) return renderEmpty(res.nextAvailable);
      renderSlots(day.slots);
    } catch (err) {
      if (token !== slotToken) return;
      slotsBox.setAttribute('aria-busy', 'false');
      renderSlotError(err);
    }
  }

  function renderSlots(list: Slot[]) {
    slotsBox.innerHTML = '';
    if (s.slot && !list.some((x) => x.start === s.slot!.start)) s.slot = null;
    const groups: [string, Slot[]][] = [
      [B.time.morning, list.filter((x) => splitDateTime(x.start).minutes < 12 * 60)],
      [B.time.afternoon, list.filter((x) => splitDateTime(x.start).minutes >= 12 * 60 && splitDateTime(x.start).minutes < 17 * 60)],
      [B.time.evening, list.filter((x) => splitDateTime(x.start).minutes >= 17 * 60)],
    ];
    const fs = document.createElement('fieldset');
    fs.className = 'slot-fieldset';
    fs.style.cssText = 'border:0;margin:0;padding:0;min-width:0';
    const lg = document.createElement('legend');
    lg.className = 'visually-hidden';
    lg.textContent = fmt(B.time.for, { date: s.date ? dateLong(s.date) : '' });
    fs.append(lg);
    groups.forEach(([title, items], gi) => {
      if (!items.length) return;
      const g = document.createElement('div');
      g.className = 'slot-group';
      const h = document.createElement('p');
      h.className = 'slot-group__title';
      h.id = `slot-g${gi}`;
      h.textContent = title;
      const wrap = document.createElement('div');
      wrap.className = 'slots';
      wrap.setAttribute('role', 'radiogroup');
      wrap.setAttribute('aria-labelledby', `slot-g${gi}`);
      for (const x of items) {
        const label = document.createElement('label');
        label.className = 'slot';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'slot';
        input.value = x.start;
        input.checked = s.slot?.start === x.start;
        input.setAttribute('aria-label', `${time(x.start)} – ${fmt(B.time.until, { time: time(x.end) })}`);
        input.addEventListener('change', () => {
          s.slot = x;
          s.maxStep = Math.min(s.maxStep, 5);
          save();
          clearError();
          updateTotals();
        });
        const span = document.createElement('span');
        span.textContent = time(x.start);
        span.setAttribute('aria-hidden', 'true');
        label.append(input, span);
        wrap.append(label);
      }
      g.append(h, wrap);
      fs.append(g);
    });
    slotsBox.append(fs);
    announce(fmt(B.time.count, { n: list.length }));
  }

  function renderEmpty(nextFree: Slot | null) {
    slotsBox.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'empty';
    box.setAttribute('role', 'status');
    const p = document.createElement('p');
    p.textContent = B.time.empty;
    box.append(p);
    const row = document.createElement('div');
    row.className = 'btn-row';
    if (nextFree) {
      const { date } = splitDateTime(nextFree.start);
      const hint = document.createElement('p');
      hint.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = fmt(B.time.nextFree, { date: dateLong(date), time: time(nextFree.start) });
      hint.append(strong);
      box.append(hint);
      const take = document.createElement('button');
      take.type = 'button';
      take.className = 'btn btn--sm';
      take.textContent = B.time.takeNext;
      take.addEventListener('click', () => {
        s.date = date;
        s.month = date.slice(0, 7);
        s.slot = nextFree;
        s.maxStep = Math.max(s.maxStep, 5);
        save();
        updateTotals();
        void loadSlots();
      });
      row.append(take);
    }
    const other = document.createElement('button');
    other.type = 'button';
    other.className = 'btn btn--secondary btn--sm';
    other.textContent = B.time.otherDay;
    other.addEventListener('click', () => show(3));
    row.append(other);
    box.append(row);
    slotsBox.append(box);
    announce(B.time.empty);
  }

  function renderSlotError(err: unknown) {
    slotsBox.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'notice notice--error';
    box.setAttribute('role', 'alert');
    const p = document.createElement('p');
    p.textContent = err instanceof BookingError && err.code === 'network' ? B.time.error : B.time.error;
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'btn btn--secondary btn--sm';
    retry.style.marginTop = '12px';
    retry.textContent = B.time.retry;
    retry.addEventListener('click', () => {
      void loadSlots().then(() => slotsBox.querySelector<HTMLElement>('input, button')?.focus());
    });
    const div = document.createElement('div');
    div.append(p, retry);
    box.append(div);
    slotsBox.append(box);
  }

  /* ---------------- Kontaktdaten ---------------- */
  const form = $<HTMLFormElement>('[data-details]');
  const f = (n: string) => form.elements.namedItem(n) as HTMLInputElement;
  const fields: [keyof Draft, string][] = [
    ['name', 'name'],
    ['phone', 'phone'],
    ['email', 'email'],
    ['note', 'note'],
  ];
  for (const [k, n] of fields) {
    const el = f(n);
    el.value = String(s[k] ?? '');
    el.addEventListener('input', () => {
      (s as unknown as Record<string, unknown>)[k] = el.value;
      save();
      if (el.hasAttribute('aria-invalid')) checkField(n);
    });
    el.addEventListener('blur', () => {
      if (el.value.trim()) checkField(n);
    });
  }
  f('terms').checked = s.terms;
  f('earlyStart').checked = s.earlyStart;
  f('terms').addEventListener('change', () => {
    s.terms = f('terms').checked;
    save();
    if (s.terms) setErr('bk-terms-err', f('terms'), '');
  });
  f('earlyStart').addEventListener('change', () => {
    s.earlyStart = f('earlyStart').checked;
    save();
    if (s.earlyStart) setErr('bk-early-err', f('earlyStart'), '');
  });

  const needsEarly = () => !!s.date && compareDates(s.date, addDays(today, 14)) <= 0;
  function updateEarly() {
    $('[data-early]').hidden = !needsEarly();
  }

  function setErr(id: string, el: HTMLInputElement, msg: string) {
    document.getElementById(id)!.textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }

  const fe = D.b.errors as Record<string, string>;
  function checkField(n: string): boolean {
    const el = f(n);
    const v = el.value.trim();
    let msg = '';
    if (n === 'name' && v.length < 2) msg = fe.name!;
    if (n === 'phone' && !PHONE.test(v)) msg = fe.phone!;
    if (n === 'email') msg = !v ? fe.email! : EMAIL.test(v) ? '' : fe.emailInvalid!;
    if (n === 'note') return true;
    setErr(`bk-${n}-err`, el, msg);
    return !msg;
  }

  function validateDetails(): boolean {
    const bad: HTMLElement[] = [];
    for (const n of ['name', 'phone', 'email']) if (!checkField(n)) bad.push(f(n));
    if (!f('terms').checked) {
      setErr('bk-terms-err', f('terms'), B.details.termsError);
      bad.push(f('terms'));
    }
    if (needsEarly() && !f('earlyStart').checked) {
      setErr('bk-early-err', f('earlyStart'), B.details.earlyStartError);
      bad.push(f('earlyStart'));
    }
    const sum = $('[data-details-summary]');
    if (bad.length) {
      sum.hidden = false;
      $('span', sum).textContent = fmt(fe.summary!, { n: bad.length });
      bad[0]!.focus();
      return false;
    }
    sum.hidden = true;
    return true;
  }

  /* ---------------- Zusammenfassung & Buchen ---------------- */
  function row(dl: HTMLElement, label: string, value: Node | string, edit?: number, cls?: string) {
    const div = document.createElement('div');
    div.className = `cell${cls ? ` ${cls}` : ''}`;
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.append(value);
    div.append(dt, dd);
    if (edit) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'edit';
      btn.textContent = B.payment.edit;
      btn.setAttribute('aria-label', `${label} ${B.payment.edit.toLowerCase()}`);
      btn.addEventListener('click', () => show(edit));
      div.append(btn);
    }
    dl.append(div);
  }

  function renderSummary(dl: HTMLElement, editable: boolean, booking?: Booking) {
    dl.innerHTML = '';
    const t = totals();
    const ul = document.createElement('ul');
    for (const i of t.sel) {
      const li = document.createElement('li');
      li.textContent = i.dataset.name ?? '';
      ul.append(li);
    }
    if (booking) row(dl, B.done.reference, booking.reference);
    row(dl, B.payment.services, ul, editable ? 1 : undefined);
    row(dl, B.payment.staff, staffLabel(), editable ? 2 : undefined);
    const start = booking?.start ?? s.slot?.start;
    const end = booking?.end ?? s.slot?.end;
    if (s.date && start && end) row(dl, B.payment.when, `${dateLong(splitDateTime(start).date)}, ${time(start)}–${time(end)}`, editable ? 3 : undefined);
    row(dl, B.payment.duration, dur(t.min));
    row(dl, B.payment.total, t.from ? fmt(D.units.from!, { price: euro(t.price) }) : euro(t.price), undefined, 'total');
  }

  const submit = $<HTMLButtonElement>('[data-submit]');
  const submitErr = $('[data-submit-error]');
  submit.addEventListener('click', async () => {
    if (!s.slot || !s.date) return show(4);
    submit.disabled = true;
    submit.textContent = B.payment.submitting;
    submitErr.hidden = true;
    try {
      const booking = await api.createBooking({
        serviceIds: s.services,
        staffId: s.staff || null,
        start: s.slot.start,
        customer: { name: s.name.trim(), phone: s.phone.trim(), email: s.email.trim(), note: s.note.trim() },
        paymentMethod: 'onsite',
        locale: D.lang,
        consents: { terms: s.terms, earlyStart: s.earlyStart },
        idempotencyKey: s.idem,
      });
      s.done = booking;
      save();
      show(7);
    } catch (err) {
      if (err instanceof BookingError && err.code === 'conflict') {
        s.slot = null;
        s.maxStep = 4;
        save();
        show(4);
        const note = document.createElement('div');
        note.className = 'notice notice--error';
        note.setAttribute('role', 'alert');
        note.style.marginBottom = '16px';
        note.textContent = B.payment.conflict;
        slotsBox.before(note);
        window.setTimeout(() => note.remove(), 15000);
        announce(B.payment.conflict);
      } else {
        submitErr.hidden = false;
        $('span', submitErr).textContent = B.payment.error;
        submitErr.focus();
      }
    } finally {
      submit.disabled = false;
      submit.textContent = B.payment.submit;
    }
  });

  /* ---------------- Bestätigung & Kalenderdatei ---------------- */
  function renderDone() {
    if (!s.done) return show(1);
    renderSummary($('[data-done-summary]'), false, s.done);
  }

  const icsEsc = (x: string) => x.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  function fold(line: string): string {
    const out: string[] = [];
    let rest = line;
    while (rest.length > 74) {
      out.push(rest.slice(0, 74));
      rest = ` ${rest.slice(74)}`;
    }
    out.push(rest);
    return out.join('\r\n');
  }

  $('[data-ics]').addEventListener('click', () => {
    if (!s.done) return;
    const names = totals().sel.map((i) => i.dataset.name ?? '');
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hello Beauty//Online-Buchung Demo//DE',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${s.done.id}@hellobeautysalon.at`,
      `DTSTAMP:${icsDate(new Date().toISOString())}`,
      `DTSTART:${icsDate(s.done.start)}`,
      `DTEND:${icsDate(s.done.end)}`,
      `SUMMARY:${icsEsc(B.done.icsTitle)}`,
      `LOCATION:${icsEsc(D.address)}`,
      `DESCRIPTION:${icsEsc(fmt(B.done.icsDescription, { services: names.join(', ') }))}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${icsEsc(B.done.icsTitle)}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    const blob = new Blob([lines.map(fold).join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hello-beauty-${s.done.reference}.ics`;
    document.body.append(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  $('[data-again]').addEventListener('click', () => {
    s = blank();
    save();
    for (const i of svcInputs) i.checked = false;
    for (const r of staffInputs) r.checked = r.value === '';
    form.reset();
    monthCache.clear();
    updateCounts();
    updateTotals();
    show(1);
  });

  /* ---------------- Demo-Werkzeuge ---------------- */
  const dev = document.querySelector<HTMLDetailsElement>('[data-devtools]');
  if (dev) {
    if (!isDemo) dev.hidden = true;
    for (const cb of dev.querySelectorAll<HTMLInputElement>('[data-dev]')) {
      const k = cb.dataset.dev as 'failNext' | 'conflictNext';
      cb.checked = mockControls.get()[k];
      cb.addEventListener('change', () => mockControls.set({ [k]: cb.checked }));
    }
  }

  /* ---------------- Start ---------------- */
  updateCounts();
  updateTotals();
  const fromHash = Number(location.hash.replace('#step-', ''));
  let start = s.done ? TOTAL : Math.min(Math.max(1, fromHash || s.step), s.maxStep);
  if (start >= 3 && !s.services.length) start = 1;
  if (start >= 5 && !s.slot) start = 4;
  if (start >= 4 && !s.date) start = 3;
  history.replaceState({ step: start }, '', `${location.pathname}${location.search}#step-${start}`);
  show(start, { focus: false, push: false });
}
