// Captures the screenshots in src/assets/screens from a fresh Pocket ID container filled with demo data, once in the light and once in the dark theme
// Needs Docker and Playwright's Chromium (pnpm exec playwright install chromium), and runs with `node scripts/screenshots.mjs`
// POCKET_ID_IMAGE picks the image to capture, by default the latest v2 release
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(docs, 'src/assets/screens');
const image = process.env.POCKET_ID_IMAGE ?? 'ghcr.io/pocket-id/pocket-id:v2';
const port = 14110;
const base = `http://localhost:${port}`;
const container = 'pocket-id-docs-screenshots';
const volume = 'pocket-id-docs-screenshots-data';
const apiKey = 'docs-screenshots-static-api-key';
const themes = ['light', 'dark'];
const viewport = { width: 1180, height: 740 };

// The container ---------------------------------------------------------------

function docker(...args) {
	return execFileSync('docker', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

// The static API key seeds the demo data, and the second start drops it again, which also deletes the user it created from the users list
async function start({ withApiKey }) {
	// A graceful stop releases the instance lock on the database, which a killed container would hold until it expires
	try {
		docker('stop', container);
		docker('rm', container);
	} catch {}
	const env = {
		APP_URL: base,
		ENCRYPTION_KEY: 'docs-screenshots-encryption-key',
		VERSION_CHECK_DISABLED: 'true',
		ANALYTICS_DISABLED: 'true',
		...(withApiKey ? { STATIC_API_KEY: apiKey } : {})
	};
	docker('run', '-d', '--name', container, '-p', `${port}:1411`, '-v', `${volume}:/app/data`, ...Object.entries(env).flatMap(([k, v]) => ['-e', `${k}=${v}`]), image);
	for (let i = 0; i < 180; i++) {
		try {
			if ((await fetch(`${base}/healthz`)).ok) return;
		} catch {}
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error(`Pocket ID did not become healthy:\n${docker('logs', '--tail', '30', container)}`);
}

function stop() {
	try {
		docker('rm', '-f', container);
	} catch {}
	try {
		docker('volume', 'rm', '-f', volume);
	} catch {}
}

// The demo data ---------------------------------------------------------------

async function api(method, route, body, { form } = {}) {
	const res = await fetch(`${base}${route}`, {
		method,
		headers: { 'X-API-Key': apiKey, ...(form ? {} : { 'Content-Type': 'application/json' }) },
		body: form ?? (body === undefined ? undefined : JSON.stringify(body))
	});
	if (!res.ok) throw new Error(`${method} ${route}: ${res.status} ${await res.text()}`);
	return res.status === 204 ? undefined : res.json().catch(() => undefined);
}

// App icons from the selfh.st collection, the same ones the client examples page shows
async function icon(name) {
	const res = await fetch(`https://cdn.jsdelivr.net/gh/selfhst/icons@main/png/${name}.png`);
	if (!res.ok) throw new Error(`Icon ${name}: ${res.status}`);
	return new Blob([await res.arrayBuffer()], { type: 'image/png' });
}

const users = [
	{ username: 'taylor', firstName: 'Taylor', lastName: 'Morgan', isAdmin: true, groups: ['admins', 'family', 'developers', 'media'] },
	{ username: 'alex', firstName: 'Alex', lastName: 'Rivera', groups: ['family', 'media'] },
	{ username: 'sam', firstName: 'Sam', lastName: 'Lee', groups: ['developers'] },
	{ username: 'jordan', firstName: 'Jordan', lastName: 'Patel', groups: ['family'] },
	{ username: 'casey', firstName: 'Casey', lastName: 'Nguyen', groups: ['developers', 'media'] },
	{ username: 'riley', firstName: 'Riley', lastName: 'Chen', groups: ['media'] }
];
const groups = [
	{ name: 'admins', friendlyName: 'Admins' },
	{ name: 'family', friendlyName: 'Family' },
	{ name: 'developers', friendlyName: 'Developers' },
	{ name: 'media', friendlyName: 'Media' }
];
const clients = [
	{ name: 'Nextcloud', icon: 'nextcloud', host: 'cloud', groups: ['family', 'admins'], callback: '/apps/user_oidc/code' },
	{ name: 'Jellyfin', icon: 'jellyfin', host: 'jellyfin', groups: ['media'], callback: '/sso/OID/redirect/pocket-id' },
	{ name: 'Grafana', icon: 'grafana', host: 'grafana', groups: ['developers', 'admins'], callback: '/login/generic_oauth' },
	{ name: 'Paperless-ngx', icon: 'paperless-ngx', host: 'paperless', groups: ['family'], callback: '/accounts/oidc/pocket-id/login/callback/' },
	{ name: 'Gitea', icon: 'gitea', host: 'git', groups: ['developers'], callback: '/user/oauth2/PocketID/callback' },
	{ name: 'Home Assistant', icon: 'home-assistant', host: 'home', groups: ['family', 'admins'], callback: '/auth/oidc/callback' },
	{ name: 'Proxmox', icon: 'proxmox', host: 'proxmox', groups: ['admins'], callback: '' },
	{ name: 'Audiobookshelf', icon: 'audiobookshelf', host: 'audiobooks', groups: ['media'], callback: '/auth/openid/callback' }
];

async function seed() {
	const groupIds = {};
	for (const g of groups) groupIds[g.name] = (await api('POST', '/api/user-groups', g)).id;

	const userIds = {};
	for (const u of users) {
		const { groups: memberOf, ...fields } = u;
		const created = await api('POST', '/api/users', { ...fields, email: `${u.username}@example.com`, emailVerified: true, displayName: `${u.firstName} ${u.lastName}` });
		userIds[u.username] = created.id;
		await api('PUT', `/api/users/${created.id}/user-groups`, { userGroupIds: memberOf.map((name) => groupIds[name]) });
	}

	const clientIds = {};
	for (const c of clients) {
		const url = `https://${c.host}.example.com`;
		const created = await api('POST', '/api/oidc/clients', {
			name: c.name,
			callbackURLs: [`${url}${c.callback}`],
			launchURL: url,
			isGroupRestricted: true
		});
		clientIds[c.name] = created.id;
		await api('PUT', `/api/oidc/clients/${created.id}/allowed-user-groups`, { userGroupIds: c.groups.map((name) => groupIds[name]) });
		const form = new FormData();
		form.append('file', await icon(c.icon), `${c.icon}.png`);
		await api('POST', `/api/oidc/clients/${created.id}/logo?light=true`, undefined, { form });
	}

	// An API with two permissions, which a client of its own may request on behalf of its users
	const ordersApi = await api('POST', '/api/apis', { name: 'Orders API', resource: 'https://api.orders.example.com' });
	const withPermissions = await api('PUT', `/api/apis/${ordersApi.id}/permissions`, {
		permissions: [
			{ key: 'read:orders', name: 'Read orders', description: 'View orders and their status' },
			{ key: 'write:orders', name: 'Write orders', description: 'Create, change and cancel orders' }
		]
	});
	const ordersApp = await api('POST', '/api/oidc/clients', { name: 'Orders App', callbackURLs: ['https://orders.example.com/callback'] });
	const permissionIds = (withPermissions?.permissions ?? (await api('GET', `/api/apis/${ordersApi.id}`)).permissions).map((p) => p.id);
	await api('PUT', `/api/apis/${ordersApi.id}/clients/${ordersApp.id}`, {
		userDelegatedAccess: true,
		userDelegatedPermissionIds: permissionIds,
		clientAccess: false,
		clientPermissionIds: []
	});

	// Animations off for steady captures, and example LDAP settings so the LDAP form isn't empty
	const config = Object.fromEntries((await api('GET', '/api/application-configuration/all')).map((c) => [c.key, c.value]));
	await api('PUT', '/api/application-configuration', {
		...config,
		disableAnimations: 'true',
		ldapUrl: 'ldaps://ldap.example.com:636',
		ldapBindDn: 'cn=pocket-id,ou=services,dc=example,dc=com',
		ldapBase: 'dc=example,dc=com',
		ldapAttributeUserUniqueIdentifier: 'entryUUID',
		ldapAttributeUserUsername: 'uid',
		ldapAttributeUserEmail: 'mail',
		ldapAttributeUserFirstName: 'givenName',
		ldapAttributeUserLastName: 'sn',
		ldapAttributeGroupUniqueIdentifier: 'entryUUID',
		ldapAttributeGroupName: 'cn',
		ldapAdminGroupName: 'pocket-id-admins'
	});

	const { token } = await api('POST', `/api/users/${userIds.taylor}/one-time-access-token`, { ttl: '1h' });
	return { token, groupIds, ordersApiId: ordersApi.id };
}

// The captures ----------------------------------------------------------------

async function context(browser, theme, storageState) {
	return browser.newContext({ viewport, deviceScaleFactor: 2, colorScheme: theme, reducedMotion: 'reduce', storageState });
}

// Pages settle once the network is idle and fonts are in, and a short pause lets late layout shifts end
async function settle(page) {
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(400);
}

// The captures show the instance at the example domain the docs use, and toasts from earlier steps stay out of the picture
async function tidy(page) {
	await page.evaluate((from) => {
		const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		for (let node = walker.nextNode(); node; node = walker.nextNode()) {
			if (node.nodeValue?.includes(from)) node.nodeValue = node.nodeValue.replaceAll(from, 'https://id.example.com');
		}
		for (const input of document.querySelectorAll('input')) {
			if (input.value.includes(from)) input.value = input.value.replaceAll(from, 'https://id.example.com');
		}
		if (!document.getElementById('docs-capture')) {
			const style = document.createElement('style');
			style.id = 'docs-capture';
			// Dialogs sit on the plain page color instead of the dimmed page, so a dialog capture shows nothing half-hidden around it
			style.textContent = [
				'[data-sonner-toaster], [data-slot="tooltip-content"] { display: none !important; }',
				'[data-slot="dialog-overlay"], [data-dialog-overlay] { background: var(--background) !important; backdrop-filter: none !important; }'
			].join('\n');
			document.head.append(style);
		}
		document.activeElement?.blur?.();
	}, base);
	await page.mouse.move(0, 0);
}

// Full pages carry the background photo and are saved as JPEG to stay small, while element captures are mostly text and stay PNG
async function shoot(page, name, theme, target, { until } = {}) {
	await settle(page);
	await tidy(page);
	if (!target) {
		const file = path.join(outDir, `${name}-${theme}.jpg`);
		await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
		console.log(`screenshots: ${path.relative(docs, file)}`);
		return;
	}
	// Element captures keep a margin of the page around the element, so its edge doesn't touch the frame
	const file = path.join(outDir, `${name}-${theme}.png`);
	// `until` cuts a long element off above another element inside it
	// Bounding boxes are relative to the viewport, while a full-page clip is relative to the page, so everything moves by the scroll offset first
	const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
	const box = await target.boundingBox();
	const pad = 20;
	const left = Math.max(box.x + scroll.x - pad, 0);
	const top = Math.max(box.y + scroll.y - pad, 0);
	const bottom = until ? (await until.boundingBox()).y + scroll.y - 8 : box.y + scroll.y + box.height + pad;
	const clip = { x: left, y: top, width: box.width + pad * 2, height: bottom - top };
	await page.screenshot({ path: file, clip, fullPage: true });
	console.log(`screenshots: ${path.relative(docs, file)}`);
}

async function main() {
	fs.mkdirSync(outDir, { recursive: true });
	for (const file of fs.readdirSync(outDir)) fs.rmSync(path.join(outDir, file));
	stop();
	await start({ withApiKey: true });
	const browser = await chromium.launch();

	try {
		// The setup page only exists until the first user signs up, so it's captured before the demo data arrives
		for (const theme of themes) {
			const ctx = await context(browser, theme);
			const page = await ctx.newPage();
			await page.goto(`${base}/setup`);
			await page.getByRole('heading', { name: /Sign Up/ }).waitFor();
			await shoot(page, 'setup', theme);
			await ctx.close();
		}

		const { token, ordersApiId } = await seed();
		await start({ withApiKey: false });

		// Signing in with the login code and adding a passkey through a virtual authenticator gives a regular admin session
		const ctx = await context(browser, 'light');
		const page = await ctx.newPage();
		const cdp = await ctx.newCDPSession(page);
		await cdp.send('WebAuthn.enable');
		await cdp.send('WebAuthn.addVirtualAuthenticator', {
			options: { protocol: 'ctap2', transport: 'internal', hasResidentKey: true, hasUserVerification: true, isUserVerified: true }
		});
		await page.goto(`${base}/lc/${token}`);
		await page.waitForURL(/\/settings\/account/);
		await page.getByRole('button', { name: 'Add Passkey' }).first().click();
		await page.waitForTimeout(1500);
		await page.evaluate(() => localStorage.setItem('dismissed-alerts', JSON.stringify(['single-passkey'])));
		const session = await ctx.storageState();
		await ctx.close();

		for (const theme of themes) {
			// Signed out: the sign-in page and the other ways to sign in
			const anon = await context(browser, theme);
			const out = await anon.newPage();
			await out.goto(`${base}/login`);
			await shoot(out, 'sign-in', theme);
			await out.goto(`${base}/login/alternative`);
			await shoot(out, 'sign-in-alternatives', theme);
			await anon.close();

			const admin = await context(browser, theme, session);
			const p = await admin.newPage();

			// The create form, filled in for an app, and the connection details the new client shows once
			await p.goto(`${base}/settings/admin/oidc-clients`);
			await p.getByRole('button', { name: 'Add OIDC Client' }).click();
			await p.getByLabel('Name', { exact: true }).fill('Immich');
			await p.getByRole('button', { name: 'Add callback URL' }).click();
			await p.getByTestId('callback-url-1').fill('https://photos.example.com/auth/login');
			const createCard = p.locator('[data-slot="card"]').filter({ hasText: 'Create OIDC Client' }).first();
			await shoot(p, 'oidc-client-create', theme, createCard);
			await p.getByRole('button', { name: 'Create', exact: true }).click();
			await p.waitForURL(/oidc-clients\/[^/]+$/);
			await settle(p);

			const details = p.locator('[data-slot="card"]').first();
			await p.getByText('Show more details').click();
			await shoot(p, 'oidc-client-details', theme, details);

			// The logo comes through the API with the admin's session once the details are captured, since reloading hides the secret the page shows once
			const createdId = new URL(p.url()).pathname.split('/').pop();
			await p.request.post(`${base}/api/oidc/clients/${createdId}/logo?light=true`, {
				multipart: { file: { name: 'immich.png', mimeType: 'image/png', buffer: Buffer.from(await (await icon('immich')).arrayBuffer()) } }
			});
			await p.reload();
			await settle(p);

			// The access tab with the allowed groups, after picking two of them
			await p.getByRole('tab', { name: 'Access' }).click();
			const groupsCard = p.locator('[data-slot="card"]').filter({ hasText: 'Allowed User Groups' }).first();
			for (const group of ['Family', 'Media']) {
				await groupsCard.getByRole('row').filter({ hasText: group }).getByRole('checkbox').click();
			}
			// Changes collect in the unsaved-changes bar until they're saved
			await p.getByRole('button', { name: 'Save', exact: true }).click();
			await p.getByText('You have unsaved changes').waitFor({ state: 'hidden' });
			await shoot(p, 'oidc-client-allowed-groups', theme, groupsCard);

			// The consent screen users see the first time they sign in to a client
			const clientId = new URL(p.url()).pathname.split('/').pop();
			await p.goto(
				`${base}/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent('https://photos.example.com/auth/login')}&response_type=code&scope=openid%20profile%20email%20groups&state=docs-screenshots`
			);
			await p.getByText('wants to access the following information').waitFor();
			await shoot(p, 'consent', theme);

			// The login code dialog an admin opens from a user's menu
			await p.goto(`${base}/settings/admin/users`);
			await settle(p);
			const row = p.getByRole('row').filter({ hasText: 'Alex Rivera' });
			await row.getByRole('button').last().click();
			await p.getByRole('menuitem', { name: 'Login Code' }).click();
			const dialog = p.getByRole('dialog');
			await dialog.getByRole('button', { name: 'Show Code' }).click();
			await dialog.getByTestId('login-code-link').waitFor();
			await shoot(p, 'login-code', theme, dialog);

			await p.goto(`${base}/settings/apps`);
			await shoot(p, 'my-apps', theme);

			await p.goto(`${base}/settings/admin/apis/${ordersApiId}`);
			await shoot(p, 'api-permissions', theme);

			await p.goto(`${base}/settings/admin/application-configuration#ldap`);
			await settle(p);
			const ldapCard = p.locator('[data-slot="card"]').filter({ hasText: 'LDAP' }).first();
			await shoot(p, 'ldap', theme, ldapCard, { until: ldapCard.getByText('Attribute Mapping') });

			await admin.close();
		}
	} finally {
		await browser.close();
		// KEEP=1 leaves the seeded instance running, to look around when a capture fails
		if (!process.env.KEEP) stop();
	}
}

await main();
