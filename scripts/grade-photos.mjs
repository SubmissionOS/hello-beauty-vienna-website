// Einheitliche Bildregie für alle Salonfotos (einmalig vorab, nicht im Build).
// Aufruf: node scripts/grade-photos.mjs [--dry]
// - Helligkeit: halber Weg zum Zielwert (Mittelwert 145), Faktor auf 0,92–1,15 begrenzt;
//   bewusst dunkle Stimmungsbilder (Mittelwert < 90) bleiben unverändert.
// - Weißabgleich nur für Raum-/Arbeitsaufnahmen (neutrale Szenen): kühle Bilder Richtung r−b ≈ 14 wärmen.
//   Nahaufnahmen von Nägeln/Wimpern nicht – deren „Farbstich“ ist Haut und Lack.
// - Gemeinsamer warmer Grundton für alle (R +2 %, B −2,5 %).
// Bereits bearbeitete Bilder tragen in EXIF ImageDescription „hb-graded-v1“ und werden übersprungen.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'src/assets/salon';
const MARK = 'hb-graded-v1';
const dry = process.argv.includes('--dry');
const neutral = /^(salon-|naegel-behandlung|naegel-nageldesignerin|naegel-feilen|naegel-lackieren|naegel-uv|pedikuere-behandlung|pedikuere-fusspflegerin|pedikuere-geraet|pedikuere-skalpell|kosmetik-gesichtsmaske|wimpern-verlaengerung|wimpern-brauen-behandlung|haarentfernung-)/;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.jpg'))) {
  const file = path.join(DIR, f);
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();
  if (meta.exif?.toString('latin1').includes(MARK)) {
    console.log(`${f}: schon bearbeitet`);
    continue;
  }
  const { channels } = await sharp(input).stats();
  const [r, g, b] = channels.map((c) => c.mean);
  const mean = (r + g + b) / 3;
  const brightness = mean < 90 ? 1 : Math.min(1.15, Math.max(0.92, 1 + (145 / mean - 1) * 0.5));
  let wr = 1.02;
  let wb = 0.975;
  if (neutral.test(f) && r - b < 14) {
    // fehlende Wärme zur Hälfte ausgleichen
    const k = ((14 - (r - b)) / 2 / mean) * 0.5;
    wr += k;
    wb -= k;
  }
  console.log(`${f}: Helligkeit ×${brightness.toFixed(3)}, R ×${wr.toFixed(3)}, B ×${wb.toFixed(3)}`);
  if (dry) continue;
  const out = await sharp(input)
    .recomb([
      [wr, 0, 0],
      [0, 1, 0],
      [0, 0, wb],
    ])
    .modulate({ brightness })
    .withExif({ IFD0: { ImageDescription: MARK } })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(file, out);
}
