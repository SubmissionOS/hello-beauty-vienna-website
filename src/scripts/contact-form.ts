/**
 * Kontaktformular (Demo): Inline-Validierung beim Verlassen eines Felds und beim Absenden,
 * Fehlerzusammenfassung mit Fokus, Fehlertexte per aria-describedby. Es wird nichts gesendet.
 */
import { fmtClient } from './fmt';

type Messages = Record<string, string>;
type Rule = (v: string) => string | null;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE = /^\+?[\d\s()/-]{6,20}$/;

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const m: Messages = JSON.parse(form.dataset.messages ?? '{}');
  const success = document.querySelector<HTMLElement>('[data-success]')!;
  const summary = form.querySelector<HTMLElement>('[data-summary-box]')!;
  const summaryText = form.querySelector<HTMLElement>('[data-summary-text]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = submit.textContent ?? '';

  const rules: Record<string, Rule> = {
    name: (v) => (v.trim().length < 2 ? m.nameRequired! : null),
    email: (v) => (!v.trim() ? m.emailRequired! : EMAIL.test(v.trim()) ? null : m.emailInvalid!),
    phone: (v) => (!v.trim() || PHONE.test(v.trim()) ? null : m.phoneInvalid!),
    message: (v) => (!v.trim() ? m.messageRequired! : v.trim().length < 10 ? m.messageShort! : null),
  };

  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;

  function check(name: string): boolean {
    const el = field(name);
    const err = rules[name]!(el.value);
    const out = document.getElementById(`${el.id}-err`)!;
    out.textContent = err ?? '';
    if (err) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
    return !err;
  }

  for (const name of Object.keys(rules)) {
    const el = field(name);
    el.addEventListener('blur', () => {
      if (el.value.trim() || el.hasAttribute('aria-invalid')) check(name);
    });
    el.addEventListener('input', () => {
      if (el.hasAttribute('aria-invalid')) check(name);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = Object.keys(rules).filter((n) => !check(n));
    if (invalid.length) {
      summaryText.textContent = fmtClient(form.dataset.summary ?? '', { n: invalid.length });
      summary.hidden = false;
      field(invalid[0]!).focus();
      return;
    }
    summary.hidden = true;
    // Honeypot gefüllt: still verwerfen
    if ((form.elements.namedItem('website') as HTMLInputElement).value) return;
    submit.disabled = true;
    submit.textContent = form.querySelector<HTMLElement>('[data-submit]')?.dataset.sending ?? submitLabel;
    window.setTimeout(() => {
      // Demo – keine Übertragung
      form.hidden = true;
      success.hidden = false;
      success.focus();
      submit.disabled = false;
      submit.textContent = submitLabel;
    }, 600);
  });

  success.querySelector('[data-again]')?.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    field('name').focus();
  });
}
