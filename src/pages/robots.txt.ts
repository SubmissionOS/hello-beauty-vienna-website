import type { APIRoute } from 'astro';
import { demoMode } from '../lib/env';

export const GET: APIRoute = () => {
  const body = demoMode
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: https://hellobeautysalon.at/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
