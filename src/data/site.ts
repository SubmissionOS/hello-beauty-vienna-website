/**
 * Stammdaten des Salons – einzige Quelle für Name, Adresse, Telefon (NAP) und Öffnungszeiten.
 * Belege: docs/research/bestand.md, docs/research/impressum-daten.md, docs/research/seo-geo.md
 */
export const site = {
  name: 'Hello Beauty',
  /** Zusatz aus Logo und Preisliste */
  descriptor: 'Schönheitssalon',
  url: 'https://hellobeautysalon.at',
  phone: '+43 660 7055 631',
  phoneE164: '+436607055631',
  email: 'info@hellobeautysalon.at',
  address: {
    street: 'Barnabitengasse 7',
    postalCode: '1060',
    city: 'Wien',
    district: 'Mariahilf',
    country: 'AT',
  },
  /** OpenStreetMap Nominatim, OSM-Knoten 5204041868 „Hello Beauty“ (shop=beauty), abgerufen 2026-10-13 */
  geo: { lat: 48.1986658, lng: 16.353555 },
  /** Montag–Samstag 09:00–19:00, Sonntag geschlossen (hellobeautysalon.at, Kontaktsektion) */
  hours: {
    days: [1, 2, 3, 4, 5, 6] as const,
    open: '09:00',
    close: '19:00',
  },
  social: {
    instagram: 'https://www.instagram.com/hellobeauty.salon.at/',
    instagramHandle: 'hellobeauty.salon.at',
    facebook: 'https://www.facebook.com/hellobeautywien',
    facebookHandle: 'hellobeautywien',
  },
  /** Bewertungen nur mit Quelle und Datum (Treatwell-Profil, abgerufen 2026-10-13) */
  rating: {
    value: '4,8',
    valueEn: '4.8',
    count: '2.811',
    countEn: '2,811',
    source: 'Treatwell',
    url: 'https://www.treatwell.at/salon/hello-beauty-salon/',
    asOf: '2026-10-13',
  },
  maps: {
    google: 'https://www.google.com/maps/search/?api=1&query=Hello+Beauty%2C+Barnabitengasse+7%2C+1060+Wien',
    apple: 'https://maps.apple.com/?q=Hello+Beauty&address=Barnabitengasse+7,+1060+Wien,+%C3%96sterreich&ll=48.1986658,16.353555',
  },
  priceListPdf: '/downloads/hello-beauty-preisliste.pdf',
} as const;

export const addressLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
