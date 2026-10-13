export const LOCALES = ['de', 'en', 'hu'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'de';

export const LANG_META: Record<Lang, { label: string; short: string; htmlLang: string; ogLocale: string; hreflang: string; intl: string }> = {
  de: { label: 'Deutsch', short: 'DE', htmlLang: 'de-AT', ogLocale: 'de_AT', hreflang: 'de-AT', intl: 'de-AT' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_GB', hreflang: 'en', intl: 'en-GB' },
  hu: { label: 'Magyar', short: 'HU', htmlLang: 'hu', ogLocale: 'hu_HU', hreflang: 'hu', intl: 'hu-HU' },
};

export function isLang(x: string | undefined): x is Lang {
  return !!x && (LOCALES as readonly string[]).includes(x);
}
