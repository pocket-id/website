// Generates the OpenAPI spec of the Pocket ID backend into src/generated, so the API reference matches the code it documents
// The spec is committed, so builds need neither Go nor the backend, and the update-api-spec workflow keeps it current
// The backend comes from a pocket-id checkout at POCKET_ID_DIR, by default a sibling folder named pocket-id
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(docs, process.env.POCKET_ID_DIR ?? '../pocket-id');
const backend = path.join(repo, 'backend');
const outDir = path.join(docs, 'src/generated');
const out = path.join(outDir, 'openapi.json');

// The committed spec stays as it is when generating fails, so a broken run never replaces it
function fail(reason) {
	console.error(`openapi: ${reason}`);
	process.exit(1);
}

if (!fs.existsSync(path.join(backend, 'cmd/openapi')))
	fail(`no pocket-id checkout with cmd/openapi at ${repo}, set POCKET_ID_DIR to one`);

// The backend prints its spec, and the exclude_frontend tag lets it build without the embedded frontend
let spec;
try {
	spec = execFileSync('go', ['run', '-tags', 'exclude_frontend', './cmd/openapi'], {
		cwd: backend,
		stdio: ['ignore', 'pipe', 'pipe'],
		maxBuffer: 64 * 1024 * 1024
	});
	JSON.parse(spec);
} catch (err) {
	fail(`couldn't generate the spec: ${err.stderr?.toString().trim() || err.message}`);
}

// Writing to a temporary file first keeps a half-written spec from ever reaching the build
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(`${out}.tmp`, spec);
fs.renameSync(`${out}.tmp`, out);
console.log(`openapi: wrote ${path.relative(docs, out)} from ${path.relative(docs, repo) || '.'}`);
