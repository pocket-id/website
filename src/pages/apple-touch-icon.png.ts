// The icon iOS shows for a bookmark on the home screen, the mark on the page color since iOS rounds the corners itself
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { markPath, markViewBox } from '../lib/og';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="#0a0a0a"/><svg x="56" y="45" width="68" height="90" viewBox="${markViewBox}"><path fill="#fafafa" d="${markPath}"/></svg></svg>`;

export const GET: APIRoute = async () =>
	new Response(new Uint8Array(await sharp(Buffer.from(svg)).png().toBuffer()), {
		headers: { 'Content-Type': 'image/png' }
	});
