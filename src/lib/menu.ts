/**
 * Kürzt den Titel einer Preislisten-Gruppe für die Navigation: Klammerzusätze entfallen,
 * z. B. „Auffüllen mit Farbe (Gel oder Acryl-Gel)“ → „Auffüllen mit Farbe“.
 */
export function shortTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)/g, '').trim();
}
