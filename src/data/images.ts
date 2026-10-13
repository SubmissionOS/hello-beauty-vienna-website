import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/salon/*.{jpg,png}', { eager: true, import: 'default' });

/** Alle Salonbilder nach Dateiname ohne Endung, z. B. `salon-empfang-hb-monogramm` */
export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, meta]) => [path.split('/').pop()!.replace(/\.(jpg|png)$/, ''), meta]),
);

export function image(name: string): ImageMetadata {
  const m = images[name];
  if (!m) throw new Error(`Bild nicht gefunden: src/assets/salon/${name}`);
  return m;
}
