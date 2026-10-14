// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hellobeautysalon.at',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  // Keine Bilder von fremden Servern: astro:assets verarbeitet nur lokale Dateien.
  image: { domains: [] },
  vite: { build: { assetsInlineLimit: 0 } },
});
