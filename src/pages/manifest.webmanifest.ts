import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: 'Hello Beauty – Nagel- & Kosmetiksalon Wien',
        short_name: 'Hello Beauty',
        lang: 'de-AT',
        start_url: '/',
        scope: '/',
        display: 'browser',
        background_color: '#fbf9f4',
        theme_color: '#fbf9f4',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
