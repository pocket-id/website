// Generates the Swagger spec of the Pocket ID backend into src/generated, so the API reference matches the code it documents
// The spec is committed, so builds need neither Go nor the backend, and the update-api-spec workflow keeps it current
// The backend comes from a pocket-id checkout at POCKET_ID_DIR, by default a sibling folder named pocket-id
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(docs, process.env.POCKET_ID_DIR ?? '../pocket-id');
const backend = path.join(repo, 'backend');
const outDir = path.join(docs, 'src/generated');
const out = path.join(outDir, 'swagger.json');

// The descriptions the endpoints page shows under each group, since swag only knows the tag names
const tags = [
	{ name: 'Users', description: 'Users, their passkeys and profile pictures, login codes and signup tokens.' },
	{ name: 'User Groups', description: 'Groups and their members.' },
	{ name: 'OIDC', description: 'OIDC clients with their secrets, logos and allowed groups, plus the clients each user has authorized.' },
	{ name: 'APIs', description: 'Your own APIs, their permissions and the clients that may request them.' },
	{ name: 'Custom Claims', description: 'Extra claims that Pocket ID adds to the tokens of a user or of every member of a group.' },
	{ name: 'API Keys', description: 'Keys for this REST API.' },
	{ name: 'Application Configuration', description: 'The settings of the Application Configuration page, the LDAP sync and the test email.' },
	{ name: 'Application Images', description: 'The logo, favicon, background, email logo and default profile picture.' },
	{ name: 'Audit Logs', description: 'Sign-ins and other security events, of the current user or of everyone.' },
	{ name: 'SCIM', description: 'SCIM provisioning of an OIDC client.' },
	{ name: 'Device Login', description: 'The requests behind sign-in with another device.' },
	{ name: 'Well Known', description: 'Discovery documents and signing keys, which OIDC clients read without authentication.' },
	{ name: 'Version', description: 'The running version and the latest release.' },
	{ name: 'Health', description: 'A health check for container orchestrators and load balancers.' },
	{ name: 'Storage', description: 'Storage warnings for the admin UI.' }
];

// swag lives in the Go bin directory after `go install`, and `go run` fetches it when it isn't installed
function swag(args) {
	const run = (cmd, cmdArgs) => execFileSync(cmd, cmdArgs, { cwd: backend, stdio: ['ignore', 'ignore', 'pipe'] });
	try {
		run('swag', args);
	} catch (err) {
		if (err.code !== 'ENOENT') throw err;
		run('go', ['run', 'github.com/swaggo/swag/cmd/swag@latest', ...args]);
	}
}

// The committed spec stays as it is when generating fails, so a broken run never replaces it
function fail(reason) {
	console.error(`openapi: ${reason}`);
	process.exit(1);
}

if (!fs.existsSync(path.join(backend, 'go.mod'))) fail(`no pocket-id checkout at ${repo}, set POCKET_ID_DIR to one`);

// main.go reads the API description from a Markdown file in the -md folder, so a temporary folder holds both it and swag's output
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pocket-id-swagger-'));
try {
	fs.writeFileSync(path.join(tmp, 'api.md'), 'Pocket ID API Reference\n');
	swag(['init', '-q', '-d', './internal,./internal/dto', '-g', '../cmd/main.go', '--outputTypes', 'json,yaml', '-o', tmp, '-md', tmp]);

	const spec = JSON.parse(fs.readFileSync(path.join(tmp, 'swagger.json'), 'utf8'));
	spec.tags = tags;

	// Writing to a temporary file first keeps a half-written spec from ever reaching the build
	fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(`${out}.tmp`, JSON.stringify(spec, null, 2));
	fs.renameSync(`${out}.tmp`, out);
	fs.copyFileSync(path.join(tmp, 'swagger.yaml'), path.join(outDir, 'swagger.yaml'));
	console.log(`openapi: wrote ${path.relative(docs, out)} from ${path.relative(docs, repo) || '.'}`);
	fs.rmSync(tmp, { recursive: true, force: true });
} catch (err) {
	fs.rmSync(tmp, { recursive: true, force: true });
	fail(`couldn't generate the spec: ${err.stderr?.toString().trim() || err.message}`);
}
