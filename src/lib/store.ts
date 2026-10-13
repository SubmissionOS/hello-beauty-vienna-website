/** sessionStorage mit try/catch: privater Modus, blockierter Speicher oder fehlendes Storage brechen nichts. */
export const store = {
  get(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* Speicher nicht verfügbar – Funktion bleibt ohne Merken nutzbar */
    }
  },
  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* ignorieren */
    }
  },
};
