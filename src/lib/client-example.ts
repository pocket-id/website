// The "Create the client in Pocket ID" section of a client example, written from the `client` frontmatter where the page has a `::create-client` line
// Every guide then uses the same steps and the current labels of Pocket ID, and a label that changes in the app only needs changing here
import type { AstroIntegration } from 'astro';
import { z } from 'astro/zod';

// The values the client's page shows, in the order and with the labels of Pocket ID, see oidc-client-connection-details-card.svelte
const values = {
	clientId: 'Client ID',
	clientSecret: 'Client secret',
	discoveryUrl: 'OIDC Discovery URL',
	issuerUrl: 'Issuer URL',
	authorizationUrl: 'Authorization URL',
	tokenUrl: 'Token URL',
	userinfoUrl: 'Userinfo URL',
	logoutUrl: 'Logout URL',
	certificateUrl: 'Certificate URL'
} as const;

// Only these three are shown right away, the others are behind "Show more details"
const shownByDefault: ValueKey[] = ['clientId', 'clientSecret', 'discoveryUrl'];

type ValueKey = keyof typeof values;

export const clientSchema = z.object({
	// Where Pocket ID may send users back to after they signed in
	callbackUrls: z.array(z.string()).min(1),
	// Where Pocket ID may send users back to after they signed out
	logoutCallbackUrls: z.array(z.string()).optional(),
	// Single-page, mobile and desktop apps that can't keep a secret
	public: z.boolean().default(false),
	pkce: z.boolean().default(false),
	// For apps that expect a fixed client ID
	customClientId: z.string().optional(),
	launchUrl: z.string().optional(),
	// The groups the guide created for the app, instead of letting the reader choose
	allowedGroups: z.array(z.string()).optional(),
	// The values the app asks for, the client ID, secret and discovery URL when left out
	values: z.array(z.enum(Object.keys(values) as [ValueKey, ...ValueKey[]])).optional()
});

export type ClientExample = z.infer<typeof clientSchema>;

const bold = (label: string) => `**${label}**`;
const code = (value: string) => `\`${value}\``;

// "a", "a and b", "a, b and c"
function list(items: string[]) {
	return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

// A single URL fits on the line, several go in a block below it
function urls(intro: string, items: string[]) {
	if (items.length === 1) return [`${intro} ${code(items[0])}.`];
	return [`${intro}:`, '```', ...items, '```'];
}

export function createClientMarkdown(title: string, client: ClientExample) {
	const wanted = client.values ?? (client.public ? ['clientId', 'discoveryUrl'] : shownByDefault);
	const copied = wanted.filter((key) => !(client.public && key === 'clientSecret'));
	const visible = copied
		.filter((key) => shownByDefault.includes(key))
		.map((key) => `the ${bold(values[key])}`);
	const hidden = copied
		.filter((key) => !shownByDefault.includes(key))
		.map((key) => `the ${bold(values[key])}`);

	const name = [`Enter a name such as ${code(title)}`];
	if (client.public) name.push(`choose ${bold('Public Client')} as the client type`);
	name.push(`add the callback ${client.callbackUrls.length > 1 ? 'URLs' : 'URL'}`);
	const create = urls(list(name), client.callbackUrls);
	if (client.customClientId)
		create.push(
			`Click ${bold('Set custom client ID')} and enter ${code(client.customClientId)}, which the app expects.`
		);

	const copy = [
		visible.length
			? `Click ${bold('Create')} and copy ${list(visible)}.`
			: `Click ${bold('Create')}.`
	];
	if (hidden.length)
		copy.push(
			`Under ${bold('Show more details')}, ${visible.length ? 'also ' : ''}copy ${list(hidden)}.`
		);
	if (copied.includes('clientSecret')) copy.push('The client secret is only shown once.');

	const general: string[] = [];
	if (client.launchUrl)
		general.push(`set ${bold('Client Launch URL')} to ${code(client.launchUrl)}`);
	if (client.logoutCallbackUrls?.length)
		general.push(
			`add ${list(client.logoutCallbackUrls.map(code))} to ${bold('Logout Callback URLs')}`
		);
	if (client.pkce && !client.public) general.push(`turn on ${bold('PKCE')}`);

	const steps: string[][] = [
		[
			`In Pocket ID, open ${bold('Administration → OIDC Clients')} and click ${bold('Add OIDC Client')}.`
		],
		create,
		copy,
		...(general.length
			? [[`On the client's ${bold('General')} tab, ${list(general)}, then click ${bold('Save')}.`]]
			: []),
		client.allowedGroups?.length
			? [
					`On the client's ${bold('Access')} tab, select ${list(client.allowedGroups.map(code))} under ${bold('Allowed User Groups')}.`
				]
			: [
					`On the client's ${bold('Access')} tab, select the groups that may sign in under ${bold('Allowed User Groups')}, or choose ${bold('All Users')}.`
				]
	];

	// Lines after the first of a step are indented to stay inside its list item, and no blank lines keep the list as tight as a written one
	const items = steps.map((lines, i) =>
		[`${i + 1}. ${lines[0]}`, ...lines.slice(1).map((line) => `   ${line}`)].join('\n')
	);
	return `## Create the client in Pocket ID\n\n${items.join('\n')}`;
}

// Markdown plugin for the Satteri processor that replaces the `::create-client` line with the section
const createClientPlugin = {
	name: 'pocket-id-create-client',
	leafDirective(
		node: { name: string },
		ctx: { data: Record<string, any>; fileURL: URL | undefined }
	) {
		if (node.name !== 'create-client') return;
		const frontmatter = ctx.data.astro?.frontmatter ?? {};
		const parsed = clientSchema.safeParse(frontmatter.client);
		if (!parsed.success)
			throw new Error(
				`${ctx.fileURL?.pathname}: ::create-client needs a valid \`client\` in the frontmatter: ${parsed.error.message}`
			);
		return { raw: createClientMarkdown(frontmatter.title, parsed.data) };
	}
};

// Registers the plugin before Starlight's, which turns directives no plugin handled back into text
export const clientExamples = (): AstroIntegration => ({
	name: 'pocket-id-client-examples',
	hooks: {
		'astro:config:setup': ({ config }) => {
			const options = config.markdown.processor?.options as
				| { mdastPlugins?: unknown[] }
				| undefined;
			if (!options?.mdastPlugins)
				throw new Error('The client examples need the Satteri Markdown processor');
			options.mdastPlugins.push(createClientPlugin);
		}
	}
});
