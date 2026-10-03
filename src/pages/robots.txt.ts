// Crawlers may read every page, and the sitemap Starlight generates lists them all
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`);
