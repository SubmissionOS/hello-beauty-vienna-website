/**
 * Preisliste Hello Beauty – exakt aus https://hellobeautysalon.at/wp-content/uploads/2026/06/Preisliste.pdf
 * (Upload 23.06.2026). Preise in Euro, unverändert übernommen.
 *
 * Dauer: `minSource: 'list'` = Angabe aus der Preisliste. `'estimate'` = Richtwert für die Demo-Terminberechnung,
 * vom Salon zu bestätigen ([PLATZHALTER] im Bericht). Die Oberfläche kennzeichnet Richtwerte mit „ca.“.
 */
import type { Lang } from '../i18n/config';

type T = Record<Lang, string>;

export type CategoryId = 'nails' | 'manicure' | 'pedicure' | 'facial' | 'lashes' | 'hair';

export interface Service {
  id: string;
  name: T;
  price: number;
  /** „ab“-Preis */
  from?: boolean;
  /** Dauer in Minuten */
  min: number;
  minSource: 'list' | 'estimate';
  /** false = nur als Zusatz zu einer Hauptleistung buchbar (z. B. French) */
  bookable: boolean;
  /** Preis pro Stück */
  perPiece?: boolean;
  /** Kleiner Zusatz (z. B. Paraffin, Peeling): zählt nicht als Einstiegspreis einer Kategorie */
  minor?: boolean;
}

export interface Group {
  id: string;
  title: T;
  note?: T;
  items: Service[];
}

export interface Category {
  id: CategoryId;
  title: T;
  groups: Group[];
}

interface Opt {
  from?: boolean;
  list?: boolean;
  addon?: boolean;
  perPiece?: boolean;
  minor?: boolean;
}

function s(id: string, de: string, en: string, hu: string, price: number, min: number, o: Opt = {}): Service {
  return {
    id,
    name: { de, en, hu },
    price,
    min,
    minSource: o.list ? 'list' : 'estimate',
    bookable: !o.addon,
    ...(o.from ? { from: true } : {}),
    ...(o.perPiece ? { perPiece: true } : {}),
    ...(o.minor ? { minor: true } : {}),
  };
}

const t = (de: string, en: string, hu: string): T => ({ de, en, hu });

export const categories: Category[] = [
  {
    id: 'nails',
    title: t('Nagelmodellage', 'Nail extensions', 'Műköröm'),
    groups: [
      {
        id: 'nails-new',
        title: t(
          'Neues Set mit Schablonentechnik / mit Farbe (Gel oder Acryl-Gel)',
          'New set with nail forms / with colour (gel or acrylic gel)',
          'Új szett sablonos technikával / színnel (zselé vagy akril zselé)',
        ),
        items: [
          s('nails-new-s', 'Neues Set – Länge S', 'New set – length S', 'Új szett – S hossz', 85, 120),
          s('nails-new-m', 'Neues Set – Länge M', 'New set – length M', 'Új szett – M hossz', 90, 120),
          s('nails-new-l', 'Neues Set – Länge L', 'New set – length L', 'Új szett – L hossz', 95, 135),
          s('nails-new-xl', 'Neues Set – Länge XL', 'New set – length XL', 'Új szett – XL hossz', 100, 150),
        ],
      },
      {
        id: 'nails-refill',
        title: t(
          'Auffüllen mit Farbe (Gel oder Acryl-Gel)',
          'Refill with colour (gel or acrylic gel)',
          'Töltés színnel (zselé vagy akril zselé)',
        ),
        items: [
          s('nails-refill-sm', 'Auffüllen – Länge S–M', 'Refill – length S–M', 'Töltés – S–M hossz', 56, 90),
          s('nails-refill-l', 'Auffüllen – Länge L', 'Refill – length L', 'Töltés – L hossz', 63, 105),
          s('nails-refill-xl', 'Auffüllen – Länge XL', 'Refill – length XL', 'Töltés – XL hossz', 75, 120),
        ],
      },
      {
        id: 'nails-removal',
        title: t('Ablösen', 'Removal', 'Eltávolítás'),
        items: [
          s(
            'nails-remove',
            'Nagelmodellage entfernen inkl. Maniküre',
            'Nail extension removal incl. manicure',
            'Műköröm eltávolítása manikűrrel',
            45,
            60,
            { minor: true },
          ),
        ],
      },
    ],
  },
  {
    id: 'manicure',
    title: t('Maniküre, Gellack & Shellac', 'Manicure, gel polish & Shellac', 'Manikűr, gél lakk és shellac'),
    groups: [
      {
        id: 'manicure-basic',
        title: t('Maniküre', 'Manicure', 'Manikűr'),
        items: [
          s('mani-plain', 'Maniküre ohne Lack', 'Manicure without polish', 'Manikűr lakkozás nélkül', 35, 45),
          s('mani-japanese', 'Japanische Maniküre', 'Japanese manicure', 'Japán manikűr', 38, 45),
          s(
            'paraffin',
            'Paraffinbehandlung für Füße oder Hände',
            'Paraffin treatment for hands or feet',
            'Paraffinos kezelés kézre vagy lábra',
            15,
            20,
            { minor: true },
          ),
        ],
      },
      {
        id: 'manicure-gel',
        title: t(
          'Fingernägel lackieren mit Gellack oder Shellac',
          'Gel polish or Shellac on fingernails',
          'Kézköröm lakkozása gél lakkal vagy shellackel',
        ),
        items: [
          s('gel-polish', 'Gellack / Shellac', 'Gel polish / Shellac', 'Gél lakk / shellac', 49, 60),
          s('gel-polish-long', 'Gellack / Shellac – lange Nägel', 'Gel polish / Shellac – long nails', 'Gél lakk / shellac – hosszú köröm', 51, 75),
        ],
      },
      {
        id: 'manicure-removal',
        title: t('Ablösen', 'Removal', 'Eltávolítás'),
        items: [
          s('shellac-remove', 'Shellac entfernen mit Maniküre', 'Shellac removal with manicure', 'Shellac eltávolítása manikűrrel', 40, 45),
          s('gel-remove', 'Gellack entfernen mit Maniküre', 'Gel polish removal with manicure', 'Gél lakk eltávolítása manikűrrel', 40, 45),
        ],
      },
      {
        id: 'manicure-extras',
        title: t('Extras', 'Extras', 'Extrák'),
        note: t(
          'Zusätzlich zu Gellack, Shellac oder Nagelmodellage.',
          'Added to gel polish, Shellac or nail extensions.',
          'Gél lakk, shellac vagy műköröm mellé kérhető.',
        ),
        items: [
          s('extra-french', 'Baby-Boomer oder French', 'Baby boomer or French', 'Baby boomer vagy francia', 5, 15, { addon: true }),
          s(
            'extra-deco',
            'Strasssteine / Muster / Chrome-Pulver',
            'Rhinestones / nail art / chrome powder',
            'Strasszkő / minta / krómpor',
            0.5,
            0,
            { addon: true, from: true, perPiece: true },
          ),
        ],
      },
    ],
  },
  {
    id: 'pedicure',
    title: t('Pediküre & Fußpflege', 'Pedicure & foot care', 'Pedikűr és lábápolás'),
    groups: [
      {
        id: 'pedicure-main',
        title: t('Pediküre', 'Pedicure', 'Pedikűr'),
        items: [
          s('pedi-scalpel', 'Fußpflege / Pediküre mit Skalpell', 'Foot care / pedicure with scalpel', 'Lábápolás / pedikűr szikével', 44, 60),
          s('pedi-intensive', 'Intensive Pediküre', 'Intensive pedicure', 'Intenzív pedikűr', 47, 75),
          s('pedi-gel', 'Pediküre mit Gellack / Shellac', 'Pedicure with gel polish / Shellac', 'Pedikűr gél lakkal / shellackel', 58, 75),
          s('pedi-paraffin', 'Pediküre inkl. Paraffinbad', 'Pedicure incl. paraffin bath', 'Pedikűr paraffinos fürdővel', 59, 75),
          s(
            'pedi-intensive-gel',
            'Intensive Pediküre mit Gellack oder Shellac',
            'Intensive pedicure with gel polish or Shellac',
            'Intenzív pedikűr gél lakkal vagy shellackel',
            62,
            90,
          ),
          s('toes-gel', 'Fußnägel lackieren mit Gellack / Shellac', 'Gel polish / Shellac on toenails', 'Lábköröm lakkozása gél lakkal / shellackel', 42, 45),
        ],
      },
      {
        id: 'pedicure-extras',
        title: t('Zusatzbehandlungen', 'Add-ons', 'Kiegészítő kezelések'),
        items: [
          s('foot-scrub', 'Fußpeeling', 'Foot scrub', 'Lábradír', 10, 15, { minor: true }),
          s(
            'toe-remove',
            'Zehennagelmodellage – entfernen inkl. Maniküre',
            'Toenail extension removal incl. manicure',
            'Lábköröm-építés eltávolítása manikűrrel',
            30,
            30,
            { minor: true },
          ),
          s('titan-brace', 'Titan-Spange für Zehennagel', 'Titanium brace for toenail', 'Titán körömszabályzó lábkörömre', 40, 30, { perPiece: true, minor: true }),
        ],
      },
    ],
  },
  {
    id: 'facial',
    title: t('Kosmetik & Gesichtsbehandlungen', 'Facials & skin care', 'Kozmetika és arckezelések'),
    groups: [
      {
        id: 'facial-main',
        title: t('Gesichtsbehandlungen', 'Facial treatments', 'Arckezelések'),
        items: [
          s('facial-fascia', 'Faszien-Gesichtsmassage', 'Fascia facial massage', 'Fascia arcmasszázs', 49, 45, { list: true }),
          s(
            'facial-germaine',
            'Germaine de Capuccini Luxus-Gesichtsbehandlung',
            'Germaine de Capuccini luxury facial',
            'Germaine de Capuccini luxus arckezelés',
            99,
            90,
          ),
          s('facial-deep', 'Tiefenreinigung Gesichtsbehandlung', 'Deep-cleansing facial', 'Mélytisztító arckezelés', 89, 90, { list: true }),
          s('facial-microneedling', 'Microneedling mit Ultraschall', 'Microneedling with ultrasound', 'Microneedling ultrahanggal', 79, 60, { list: true }),
          s('facial-massage', 'Gesichtsmassage', 'Facial massage', 'Arcmasszázs', 49, 40, { list: true }),
          s('facial-led', 'LED-Therapie', 'LED therapy', 'LED-terápia', 79, 60, { list: true }),
          s('facial-aqua', 'AquaFacial-Therapie', 'AquaFacial therapy', 'AquaFacial-kezelés', 89, 45, { list: true }),
          s('facial-small', 'Kleine Behandlung', 'Express treatment', 'Kis kezelés', 79, 60, { list: true }),
        ],
      },
    ],
  },
  {
    id: 'lashes',
    title: t('Wimpern & Augenbrauen', 'Lashes & brows', 'Szempilla és szemöldök'),
    groups: [
      {
        id: 'lashes-tint',
        title: t('Färben & Zupfen', 'Tinting & shaping', 'Festés és szedés'),
        items: [
          s('brow-tint', 'Augenbrauen färben', 'Brow tint', 'Szemöldökfestés', 15, 15),
          s('brow-shape', 'Augenbrauen zupfen', 'Brow shaping', 'Szemöldökszedés', 15, 15),
          s('brow-lash-tint', 'Augenbrauen und Wimpern färben', 'Brow and lash tint', 'Szemöldök- és szempillafestés', 15, 25),
          s('lash-tint', 'Wimpern färben', 'Lash tint', 'Szempillafestés', 20, 20),
          s('brow-tint-shape', 'Augenbrauen färben und zupfen', 'Brow tint and shaping', 'Szemöldökfestés és -szedés', 28, 30),
          s(
            'brow-full',
            'Augenbrauen färben & zupfen, Wimpern färben',
            'Brow tint & shaping, lash tint',
            'Szemöldökfestés és -szedés, szempillafestés',
            40,
            40,
          ),
          s('henna-brows', 'Henna Brows & Zupfen', 'Henna brows & shaping', 'Henna szemöldök és szedés', 40, 45),
        ],
      },
      {
        id: 'lashes-lift',
        title: t('Wimpernlifting & Brauenlaminierung', 'Lash lift & brow lamination', 'Szempilla-lifting és szemöldöklaminálás'),
        items: [
          s('lift-tint', 'Wimpernlifting mit Färben', 'Lash lift with tint', 'Szempilla-lifting festéssel', 65, 60),
          s('lift', 'Wimpernlifting ohne Färben', 'Lash lift without tint', 'Szempilla-lifting festés nélkül', 60, 50),
          s('lift-korean-tint', 'Koreanisches Wimpernlifting mit Färben', 'Korean lash lift with tint', 'Koreai szempilla-lifting festéssel', 60, 60),
          s('lift-korean', 'Koreanisches Wimpernlifting ohne Färben', 'Korean lash lift without tint', 'Koreai szempilla-lifting festés nélkül', 55, 50),
          s('brow-lam', 'Augenbrauenlaminierung ohne Färben', 'Brow lamination without tint', 'Szemöldöklaminálás festés nélkül', 55, 45),
          s('brow-lam-tint', 'Augenbrauenlaminierung mit Färben', 'Brow lamination with tint', 'Szemöldöklaminálás festéssel', 60, 50),
          s(
            'lam-lift',
            'Augenbrauenlaminierung und Wimpernlifting ohne Färben',
            'Brow lamination and lash lift without tint',
            'Szemöldöklaminálás és szempilla-lifting festés nélkül',
            95,
            90,
          ),
          s(
            'lam-lift-tint',
            'Augenbrauenlaminierung und Wimpernlifting mit Färben',
            'Brow lamination and lash lift with tint',
            'Szemöldöklaminálás és szempilla-lifting festéssel',
            105,
            100,
          ),
        ],
      },
      {
        id: 'lashes-ext-new',
        title: t('Wimpernverlängerung (mit UV) – Neuanlage', 'Lash extensions (UV) – full set', 'Műszempilla (UV) – új szett'),
        items: [
          s('ext-1d', 'Neuanlage 1D-Technik', 'Full set, 1D (classic)', 'Új szett, 1D technika', 85, 120),
          s('ext-light', 'Neuanlage Light Volumen 2–3D', 'Full set, light volume 2–3D', 'Új szett, light volume 2–3D', 95, 135),
          s('ext-volume', 'Neuanlage Volumen 4–5D', 'Full set, volume 4–5D', 'Új szett, volume 4–5D', 100, 150),
          s('ext-mega', 'Neuanlage Megavolumen ab 6D', 'Full set, mega volume 6D+', 'Új szett, mega volume 6D-től', 115, 165),
        ],
      },
      {
        id: 'lashes-ext-refill',
        title: t('Wimpernverlängerung – Auffüllen', 'Lash extensions – refill', 'Műszempilla – töltés'),
        note: t(
          'Preis richtet sich nach dem Abstand zum letzten Termin.',
          'Price depends on the time since your last appointment.',
          'Az ár az előző kezelés óta eltelt időtől függ.',
        ),
        items: [
          s('refill-1d-2', 'Auffüllen 1D – bis 2 Wochen', 'Refill 1D – within 2 weeks', 'Töltés 1D – 2 héten belül', 70, 60),
          s('refill-1d-3', 'Auffüllen 1D – bis 3 Wochen', 'Refill 1D – within 3 weeks', 'Töltés 1D – 3 héten belül', 75, 75),
          s('refill-1d-4', 'Auffüllen 1D – bis 4 Wochen', 'Refill 1D – within 4 weeks', 'Töltés 1D – 4 héten belül', 85, 90),
          s('refill-light-2', 'Auffüllen Light Volumen – bis 2 Wochen', 'Refill light volume – within 2 weeks', 'Töltés light volume – 2 héten belül', 70, 60),
          s('refill-light-3', 'Auffüllen Light Volumen – bis 3 Wochen', 'Refill light volume – within 3 weeks', 'Töltés light volume – 3 héten belül', 75, 75),
          s('refill-light-4', 'Auffüllen Light Volumen – bis 4 Wochen', 'Refill light volume – within 4 weeks', 'Töltés light volume – 4 héten belül', 90, 90),
          s('refill-volume-2', 'Auffüllen Volumen 4–6D – bis 2 Wochen', 'Refill volume 4–6D – within 2 weeks', 'Töltés volume 4–6D – 2 héten belül', 75, 75),
          s('refill-volume-3', 'Auffüllen Volumen 4–6D – bis 3 Wochen', 'Refill volume 4–6D – within 3 weeks', 'Töltés volume 4–6D – 3 héten belül', 85, 90),
          s('refill-volume-4', 'Auffüllen Volumen 4–6D – bis 4 Wochen', 'Refill volume 4–6D – within 4 weeks', 'Töltés volume 4–6D – 4 héten belül', 95, 105),
          s('refill-mega-2', 'Auffüllen Megavolumen – bis 2 Wochen', 'Refill mega volume – within 2 weeks', 'Töltés mega volume – 2 héten belül', 80, 75),
          s('refill-mega-3', 'Auffüllen Megavolumen – bis 3 Wochen', 'Refill mega volume – within 3 weeks', 'Töltés mega volume – 3 héten belül', 95, 90),
          s('refill-mega-4', 'Auffüllen Megavolumen – bis 4 Wochen', 'Refill mega volume – within 4 weeks', 'Töltés mega volume – 4 héten belül', 105, 120),
        ],
      },
    ],
  },
  {
    id: 'hair',
    title: t('Haarentfernung', 'Hair removal', 'Szőrtelenítés'),
    groups: [
      {
        id: 'hair-sugaring',
        title: t('Sugaring', 'Sugaring', 'Cukorpasztás szőrtelenítés'),
        items: [
          s('sugar-brazilian', 'Brazilian Sugaring', 'Brazilian sugaring', 'Brazil cukorpasztás', 42, 45),
          s('sugar-bikini', 'Bikinizone', 'Bikini line', 'Bikinivonal', 22, 30),
          s('sugar-armpits', 'Achseln', 'Underarms', 'Hónalj', 22, 20),
        ],
      },
      {
        id: 'hair-waxing',
        title: t('Waxing', 'Waxing', 'Gyantázás'),
        items: [
          s('wax-bikini', 'Bikinizone', 'Bikini line', 'Bikinivonal', 22, 20),
          s('wax-brazilian', 'Brazilian', 'Brazilian', 'Brazil gyantázás', 42, 40),
          s('wax-lower-legs', 'Unterschenkel', 'Lower legs', 'Lábszár', 30, 30),
          s('wax-thighs', 'Oberschenkel', 'Thighs', 'Comb', 33, 30),
          s('wax-legs', 'Beine komplett', 'Full legs', 'Teljes láb', 50, 50),
          s('wax-armpits', 'Achseln', 'Underarms', 'Hónalj', 22, 15),
          s('wax-forearms', 'Unterarme', 'Forearms', 'Alkar', 25, 20),
          s('wax-upper-arms', 'Oberarme', 'Upper arms', 'Felkar', 20, 20),
          s('wax-arms', 'Arme komplett', 'Full arms', 'Teljes kar', 40, 35),
          s('wax-lip', 'Oberlippe', 'Upper lip', 'Bajusz', 15, 10),
          s('wax-cheeks', 'Wangen', 'Cheeks', 'Orca', 15, 10),
          s('wax-chin', 'Kinn', 'Chin', 'Áll', 15, 10),
          s('wax-back', 'Rücken', 'Back', 'Hát', 35, 30, { from: true }),
          s('wax-chest', 'Brust', 'Chest', 'Mellkas', 25, 20),
          s('wax-belly', 'Bauch', 'Stomach', 'Has', 20, 20),
          s('wax-lower-belly', 'Unterbauch', 'Lower stomach', 'Alhas', 15, 15, { from: true }),
        ],
      },
      {
        id: 'hair-laser',
        title: t(
          'Dauerhafte Haarentfernung – Diodenlaser / SHR',
          'Permanent hair removal – diode laser / SHR',
          'Tartós szőrtelenítés – diódalézer / SHR',
        ),
        note: t(
          'Preis pro Behandlung. Für ein dauerhaftes Ergebnis sind mehrere Sitzungen nötig.',
          'Price per session. Lasting results need several sessions.',
          'Az ár alkalmanként értendő. Tartós eredményhez több kezelés szükséges.',
        ),
        items: [
          s('laser-intim', 'Intimbereich Damen ohne Pofalte', 'Intimate area, women, excluding buttock crease', 'Női intim terület, farvágat nélkül', 45, 30),
          s('laser-intim-full', 'Intimbereich Damen mit Pofalte', 'Intimate area, women, including buttock crease', 'Női intim terület, farvágattal', 55, 40),
          s('laser-bikini', 'Bikinizone Damen', 'Bikini line, women', 'Női bikinivonal', 40, 30),
          s('laser-lower-legs', 'Unterschenkel', 'Lower legs', 'Lábszár', 55, 40),
          s('laser-thighs', 'Oberschenkel', 'Thighs', 'Comb', 55, 40),
          s('laser-legs', 'Beine komplett', 'Full legs', 'Teljes láb', 85, 60),
          s('laser-forearms-w', 'Unterarme – Damen', 'Forearms – women', 'Alkar – női', 55, 30),
          s('laser-forearms-m', 'Unterarme – Herren', 'Forearms – men', 'Alkar – férfi', 65, 30),
          s('laser-upper-arms-w', 'Oberarme – Damen', 'Upper arms – women', 'Felkar – női', 40, 30),
          s('laser-upper-arms-m', 'Oberarme – Herren', 'Upper arms – men', 'Felkar – férfi', 55, 30),
          s('laser-arms-w', 'Arme komplett – Damen', 'Full arms – women', 'Teljes kar – női', 75, 45),
          s('laser-arms-m', 'Arme komplett – Herren', 'Full arms – men', 'Teljes kar – férfi', 85, 45),
          s('laser-armpits', 'Achseln', 'Underarms', 'Hónalj', 45, 20),
          s('laser-lower-back', 'Unterer Rücken', 'Lower back', 'Derék', 29, 20),
          s('laser-back-m', 'Rücken komplett – Herren', 'Full back – men', 'Teljes hát – férfi', 99, 45),
          s('laser-shoulders', 'Schultern – Damen / Herren', 'Shoulders – women / men', 'Váll – női / férfi', 39, 20),
          s('laser-lip', 'Oberlippe', 'Upper lip', 'Bajusz', 29, 15),
          s('laser-cheeks', 'Wangen', 'Cheeks', 'Orca', 29, 15),
          s('laser-chest-m', 'Brust – Herren', 'Chest – men', 'Mellkas – férfi', 25, 20),
          s('laser-chest-belly-m', 'Brust und Bauch – Herren', 'Chest and stomach – men', 'Mellkas és has – férfi', 45, 30),
          s('laser-belly-w', 'Bauch – Damen', 'Stomach – women', 'Has – női', 35, 20),
          s('laser-belly-m', 'Bauch – Herren', 'Stomach – men', 'Has – férfi', 55, 25),
        ],
      },
    ],
  },
];

export const allServices: Service[] = categories.flatMap((c) => c.groups.flatMap((g) => g.items));

const byId = new Map(allServices.map((x) => [x.id, x]));
const categoryOf = new Map(categories.flatMap((c) => c.groups.flatMap((g) => g.items.map((x) => [x.id, c.id] as const))));

export function service(id: string): Service {
  const x = byId.get(id);
  if (!x) throw new Error(`Unbekannte Leistung: ${id}`);
  return x;
}

export function category(id: CategoryId): Category {
  const c = categories.find((x) => x.id === id);
  if (!c) throw new Error(`Unbekannte Kategorie: ${id}`);
  return c;
}

export function categoryOfService(id: string): CategoryId | undefined {
  return categoryOf.get(id);
}

/** Kleinster und größter Preis einer Kategorie (nur buchbare Hauptleistungen) */
export function priceRange(id: CategoryId): { min: number; max: number } {
  const prices = category(id)
    .groups.flatMap((g) => g.items)
    .filter((x) => x.bookable && !x.minor)
    .map((x) => x.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// Plausibilitätsprüfung beim Build: eindeutige IDs
if (byId.size !== allServices.length) throw new Error('Doppelte Leistungs-IDs in src/data/services.ts');
