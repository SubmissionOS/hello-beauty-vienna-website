import type { Lang } from '../i18n/config';
import { LANG_META } from '../i18n/config';
import { fmt, t } from '../i18n';
import type { Service } from '../data/services';

export function euro(n: number, lang: Lang): string {
  const s = new Intl.NumberFormat(LANG_META[lang].intl, {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
  return `${s}\u00a0€`;
}

export function priceLabel(x: Service, lang: Lang): string {
  const d = t(lang);
  const p = euro(x.price, lang);
  return `${x.from ? fmt(d.units.from, { price: p }) : p}${x.perPiece ? ` ${d.units.perPiece}` : ''}`;
}

export function minutes(n: number, lang: Lang, approx: boolean): string {
  const d = t(lang);
  if (n >= 60) {
    const h = Math.floor(n / 60);
    const m = n % 60;
    const s = m ? fmt(d.units.hoursMinutes, { h, m }) : fmt(d.units.hours, { h });
    return approx ? `${d.units.approx} ${s}` : s;
  }
  return fmt(approx ? d.units.approxMinutes : d.units.minutes, { n });
}

export function durationLabel(x: Service, lang: Lang): string {
  if (!x.bookable || x.min === 0) return '';
  return minutes(x.min, lang, x.minSource === 'estimate');
}
