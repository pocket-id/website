// The same spec in YAML, at the address the old site served it from
import type { APIRoute } from 'astro';
import spec from '../generated/swagger.yaml?raw';

export const GET: APIRoute = () => new Response(spec, { headers: { 'Content-Type': 'application/yaml' } });
