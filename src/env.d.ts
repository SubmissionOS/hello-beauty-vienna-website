interface ImportMetaEnv {
  /** 'mock' (Standard, Demo) oder 'http' (CRM-Backend) */
  readonly PUBLIC_BOOKING_ADAPTER?: 'mock' | 'http';
  /** Basis-URL der Buchungs-API, Standard: gleiche Domain */
  readonly PUBLIC_BOOKING_API_BASE?: string;
  /** 'true' setzt noindex auf alle Seiten (Staging) */
  readonly PUBLIC_NOINDEX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
