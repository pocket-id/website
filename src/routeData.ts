// Starlight route middleware that fills in what search engines read from a docs page's head, see routeMiddleware in astro.config.mjs
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

// Replaces the content of a title or meta tag Starlight already set, or adds the tag when it is missing
function setTag(
	head: StarlightRouteData['head'],
	tag: 'title' | 'meta',
	key: { name?: string; property?: string },
	content: string
) {
	const existing = head.find(
		(h) =>
			h.tag === tag &&
			(tag === 'title' ||
				(key.name ? h.attrs?.name === key.name : h.attrs?.property === key.property))
	);
	if (tag === 'title') {
		if (existing) existing.content = content;
		else head.push({ tag, content });
		return;
	}
	if (existing) existing.attrs = { ...existing.attrs, content };
	else head.push({ tag, attrs: { ...key, content } });
}

const examplePrefix = 'docs/client-examples/';

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { head, entry, siteTitle } = route;
	const isExample = route.id.startsWith(examplePrefix);

	// A page's short heading stays its h1, and its seoTitle replaces it in the tab title, search results and link previews
	// Client examples are headed by the app's name alone, while people search for the app with "OIDC" or "SSO", so their title adds both
	// Titles that already name the product skip the site name, which would only repeat it
	const seoTitle =
		entry.data.seoTitle ??
		(isExample ? `${entry.data.title} OIDC and SSO setup with ${siteTitle}` : undefined);
	if (seoTitle) {
		const title = seoTitle.includes(siteTitle) ? seoTitle : `${seoTitle} | ${siteTitle}`;
		setTag(head, 'title', {}, title);
		setTag(head, 'meta', { property: 'og:title' }, seoTitle);
	}

	// Most client examples have a one-line description that fits under the heading but is too short for a search result, so the result says what the guide covers
	if (isExample && entry.data.description && entry.data.description.length < 100) {
		const description = `${entry.data.description.replace(/\.?$/, '.')} A step-by-step guide to single sign-on with OpenID Connect and passkeys.`;
		setTag(head, 'meta', { name: 'description' }, description);
		setTag(head, 'meta', { property: 'og:description' }, description);
	}

	// Each page's link preview shows its own title, drawn by src/pages/og/[...slug].jpg.ts, while the not-found page keeps the shared one
	if (route.id !== '404') {
		setTag(
			head,
			'meta',
			{ property: 'og:image' },
			new URL(`/og/${route.id}.jpg`, context.site).href
		);
		setTag(head, 'meta', { property: 'og:image:alt' }, seoTitle ?? entry.data.title);
	}

	// Breadcrumbs let search results show where a page sits instead of its bare address
	if (route.id.startsWith('docs/')) {
		const crumbs = [
			{ name: siteTitle, url: '/' },
			{ name: 'Docs', url: '/docs/introduction' },
			...(isExample ? [{ name: 'Client examples', url: '/docs/client-examples' }] : []),
			{ name: entry.data.title, url: `/${route.id}` }
		];
		const breadcrumbs = {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: crumbs.map((crumb, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: crumb.name,
				item: new URL(crumb.url, context.site).href
			}))
		};
		head.push({
			tag: 'script',
			attrs: { type: 'application/ld+json' },
			content: JSON.stringify(breadcrumbs)
		});
	}

	// Pages are built as .html files but served without the extension, which the canonical address has to match
	for (const tag of head) {
		if (tag.tag === 'link' && tag.attrs?.rel === 'canonical' && typeof tag.attrs.href === 'string')
			tag.attrs.href = tag.attrs.href.replace(/\.html$/, '');
		if (
			tag.tag === 'meta' &&
			tag.attrs?.property === 'og:url' &&
			typeof tag.attrs.content === 'string'
		)
			tag.attrs.content = tag.attrs.content.replace(/\.html$/, '');
	}

	// Client example pages aren't in the sidebar, so its link to the overview marks where they belong
	if (route.id.startsWith('docs/client-examples/')) {
		for (const item of route.sidebar) {
			if (item.type === 'link' && item.href === '/docs/client-examples') item.isCurrent = true;
		}
	}

	// The not-found page answers every unknown address, so it must never show up in search results
	if (route.id === '404') setTag(head, 'meta', { name: 'robots' }, 'noindex');
});
