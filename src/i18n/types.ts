/**
 * Rich-Text-Bausteine für längere Texte (Rechtliches, FAQ, Leistungsseiten).
 * In Strings werden automatisch verlinkt: E-Mail-Adressen, https-URLs und interne Links der Form [[Text|routeKey]]
 * bzw. [[Text|routeKey#anker]]. [PLATZHALTER: …] / [PLACEHOLDER: …] / [HELYŐRZŐ: …] werden markiert.
 */
export type Block = string | { list: readonly string[] } | { dl: readonly (readonly [string, string])[] } | { note: string };

export interface Section {
  readonly h: string;
  readonly body: readonly Block[];
}

export interface QA {
  readonly q: string;
  readonly a: string;
}

/** Literal-Typen des deutschen Wörterbuchs zu string verbreitern, Struktur behalten */
export type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends readonly [infer A, infer B]
      ? readonly [Widen<A>, Widen<B>]
      : T extends object
        ? { readonly [K in keyof T]: Widen<T[K]> }
        : T;
