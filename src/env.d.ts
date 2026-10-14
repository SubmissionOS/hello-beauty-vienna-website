interface ImportMetaEnv {
  /** 'mock' (Standard, Demo) oder 'http' (CRM-Backend) */
  readonly PUBLIC_BOOKING_ADAPTER?: 'mock' | 'http';
  /** Basis-URL der Buchungs-API, Standard: gleiche Domain */
  readonly PUBLIC_BOOKING_API_BASE?: string;
  /** Standard 'true': noindex, nofollow + robots.txt Disallow. 'false' für den Livegang */
  readonly PUBLIC_DEMO_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
