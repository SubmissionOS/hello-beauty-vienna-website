/** Galerie: alle tauglichen Salonfotos (Auswahl und Begründung: docs/research/assets.md). Alt-Texte je Sprache im Wörterbuch (gallery.*). */
import type { CategoryId } from './services';

export type GalleryTag = 'nails' | 'pedicure' | 'lashes' | 'salon';

export interface GalleryItem {
  name: string;
  tag: GalleryTag;
  /** Bezug zu einer Leistungsseite (für Bildstreifen) */
  cat?: CategoryId;
}

export const gallery: GalleryItem[] = [
  { name: 'salon-empfang-hb-monogramm', tag: 'salon' },
  { name: 'naegel-behandlung-arbeitsplatz', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-behandlung-salon', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-verlaengerung-arbeit', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-rot-blumendesign', tag: 'nails', cat: 'nails' },
  { name: 'salon-innenraum-ueberblick', tag: 'salon' },
  { name: 'naegel-bordeaux-gold-akzent', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-french-haende-fuesse', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-volumen-ergebnis-blau', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-nude-goldornament', tag: 'nails', cat: 'nails' },
  { name: 'naegel-anthrazit-mandelform', tag: 'nails', cat: 'manicure' },
  { name: 'salon-empfang-theke', tag: 'salon' },
  { name: 'naegel-french-weiss-strick', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-milchweiss', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-lifting-ergebnis', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-gruen-winterdesign', tag: 'nails', cat: 'manicure' },
  { name: 'naegel-lackieren-nahaufnahme', tag: 'nails', cat: 'manicure' },
  { name: 'kosmetik-gesichtsmaske', tag: 'salon', cat: 'facial' },
  { name: 'naegel-blau-glitzer', tag: 'nails', cat: 'manicure' },
  { name: 'pedikuere-dunkelrot', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-volumen-ergebnis-gruen', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-nude-goldpunkte', tag: 'nails', cat: 'nails' },
  { name: 'salon-kosmetikraum-liege', tag: 'salon', cat: 'facial' },
  { name: 'naegel-bordeaux-klassisch', tag: 'nails', cat: 'manicure' },
  { name: 'pedikuere-braun-passend', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-classic-ergebnis', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-milchweiss-mandel', tag: 'nails', cat: 'nails' },
  { name: 'haarentfernung-laser-arm', tag: 'salon', cat: 'hair' },
  { name: 'naegel-pink-kupferglitzer', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-french-glitzer', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-mega-volumen', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-rosa-natuerlich', tag: 'nails', cat: 'manicure' },
  { name: 'salon-innenraum-nageltische', tag: 'salon' },
  { name: 'naegel-weiss-goldglitzer', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-orange-design', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-brauen-gruene-augen', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-gelb-ornament', tag: 'nails', cat: 'nails' },
  { name: 'salon-behandlungsraum-geraete', tag: 'salon', cat: 'hair' },
  { name: 'naegel-mint-grafisch', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-schoko-braun', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-natuerlich-blau', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-nude-schneeflocke', tag: 'nails', cat: 'manicure' },
  { name: 'kosmetik-goldmaske-entspannung', tag: 'salon', cat: 'facial' },
  { name: 'naegel-pink-muster', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-dunkel-glitzer', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-volumen-seitlich', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-uv-lampe-aushaertung', tag: 'nails', cat: 'manicure' },
  { name: 'salon-pflegeprodukte-vitrine', tag: 'salon', cat: 'facial' },
  { name: 'pedikuere-fusspflege-detail', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-verlaengerung-pinzette', tag: 'lashes', cat: 'lashes' },
  { name: 'naegel-feilen-praezision', tag: 'nails', cat: 'manicure' },
  { name: 'haarentfernung-laser-behandlung', tag: 'salon', cat: 'hair' },
  { name: 'pedikuere-skalpell-praezision', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-spiegel-kontrolle', tag: 'lashes', cat: 'lashes' },
  { name: 'salon-willkommenskaffee', tag: 'salon' },
  { name: 'naegel-behandlung-uv-lampe', tag: 'nails', cat: 'nails' },
  { name: 'pedikuere-geraet-behandlung', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-behandlung-werkzeug', tag: 'lashes', cat: 'lashes' },
  { name: 'haarentfernung-waxing', tag: 'salon', cat: 'hair' },
  { name: 'salon-innenraum-arbeitsplaetze', tag: 'salon' },
  { name: 'naegel-nageldesignerin-arbeit', tag: 'nails', cat: 'manicure' },
  { name: 'pedikuere-behandlungsstuhl', tag: 'pedicure', cat: 'pedicure' },
  { name: 'wimpern-brauen-behandlung', tag: 'lashes', cat: 'lashes' },
  { name: 'haarentfernung-laser-liege', tag: 'salon', cat: 'hair' },
  { name: 'salon-pflegeprodukte-detail', tag: 'salon', cat: 'facial' },
  { name: 'pedikuere-fusspflegerin', tag: 'pedicure', cat: 'pedicure' },
  { name: 'haarentfernung-laser-beine', tag: 'salon', cat: 'hair' },
  { name: 'salon-schaufenster-barnabitengasse', tag: 'salon' },
];

/** Hauptbild der Leistungsseite und vorausgewählte Leistung für „Diese Leistung buchen“ */
export const servicePageMedia: Record<CategoryId, { hero: string; pos?: string; book: string }> = {
  nails: { hero: 'naegel-behandlung-arbeitsplatz', pos: '62% 50%', book: 'nails-new-m' },
  manicure: { hero: 'naegel-lackieren-nahaufnahme', pos: '55% 45%', book: 'gel-polish' },
  pedicure: { hero: 'pedikuere-behandlung-salon', pos: '64% 50%', book: 'pedi-scalpel' },
  facial: { hero: 'kosmetik-gesichtsmaske', pos: '45% 50%', book: 'facial-deep' },
  lashes: { hero: 'wimpern-verlaengerung-arbeit', pos: '50% 35%', book: 'lift-tint' },
  hair: { hero: 'haarentfernung-laser-beine', pos: '50% 40%', book: 'laser-legs' },
};

export function stripFor(cat: CategoryId, n = 4): string[] {
  return gallery
    .filter((g) => g.cat === cat && g.name !== servicePageMedia[cat].hero)
    .slice(0, n)
    .map((g) => g.name);
}
