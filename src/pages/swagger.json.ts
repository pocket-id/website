// The spec the API endpoints page renders, served as a file for API clients, code generators and AI assistants
import type { APIRoute } from 'astro';
import spec from '../generated/swagger.json';

export const GET: APIRoute = () =>
	new Response(JSON.stringify(spec, null, 2), { headers: { 'Content-Type': 'application/json' } });
