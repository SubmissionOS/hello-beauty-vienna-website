/** Ersetzt {name}-Platzhalter (Client-Variante von fmt aus i18n) */
export function fmtClient(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
