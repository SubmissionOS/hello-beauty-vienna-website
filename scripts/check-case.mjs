// Prüft, ob alle relativen Imports und alle Root-Pfade auf public/ exakt (Groß-/Kleinschreibung) zu den
// Dateien passen. Windows und macOS verzeihen Abweichungen, Vercel (Linux) nicht.
import fs from 'node:fs';
import path from 'node:path';

const exists = (p) => {
  // Jeden Pfadbestandteil gegen den echten Verzeichnisinhalt prüfen
  const parts = path.resolve(p).split(path.sep);
  let cur = parts.shift() + path.sep;
  for (const part of parts) {
    if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(part)) return false;
    cur = path.join(cur, part);
  }
  return true;
};
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = [...walk('src'), ...walk('tests'), ...walk('scripts')].filter((f) => /\.(astro|ts|mjs|js|css)$/.test(f));
const problems = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(?:from\s+|import\s*\(\s*|import\s+|url\()\s*['"]?(\.{1,2}\/[^'")\s]+)/g)) {
    const spec = m[1].split('?')[0];
    const base = path.join(path.dirname(f), spec);
    const ok = ['', '.ts', '.mjs', '.js', '/index.ts'].some((ext) => exists(base + ext));
    if (!ok) problems.push(`${f}: ${spec}`);
  }
  for (const m of src.matchAll(/['"`(]\/((?:flags|icons|downloads|fonts)\/[^'"`)\s?#]+)/g)) {
    if (!m[1].includes('${') && !exists(path.join('public', m[1]))) problems.push(`${f}: /${m[1]} (public)`);
  }
}
if (problems.length) {
  console.error(`Pfade passen nicht exakt zu den Dateien:\n${problems.join('\n')}`);
  process.exit(1);
}
console.log(`Groß-/Kleinschreibung ok (${files.length} Dateien geprüft)`);
