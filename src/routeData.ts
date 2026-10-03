// Starlight route middleware that fills in what search engines read from a docs page's head, see routeMiddleware in astro.config.mjs
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

// Replaces the content of a title or meta tag Starlight already set, or adds the tag when it is missing
function setTag(head: StarlightRouteData['head'], tag: 'title' | 'meta', key: { name?: string; property?: string }, content: string) {
	const existing = head.find((h) => h.tag === tag && (tag === 'title' || (key.name ? h.attrs?.name === key.name : h.attrs?.property === key.property)));
	if (tag === 'title') {
		if (existing) existing.content = content;
		else head.push({ tag, content });
		return;
	}
	if (existing) existing.attrs = { ...existing.attrs, content };
	else head.push({ tag, attrs: { ...key, content } });
}

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { head, entry, siteTitle } = route;

	// A page's short heading stays its h1, and its seoTitle replaces it in the tab title, search results and link previews
	// Titles that already name the product skip the site name, which would only repeat it
	if (entry.data.seoTitle) {
		const title = entry.data.seoTitle.includes(siteTitle) ? entry.data.seoTitle : `${entry.data.seoTitle} | ${siteTitle}`;
		setTag(head, 'title', {}, title);
		setTag(head, 'meta', { property: 'og:title' }, entry.data.seoTitle);
	}

	// Pages are built as .html files but served without the extension, which the canonical address has to match
	for (const tag of head) {
		if (tag.tag === 'link' && tag.attrs?.rel === 'canonical' && typeof tag.attrs.href === 'string') tag.attrs.href = tag.attrs.href.replace(/\.html$/, '');
		if (tag.tag === 'meta' && tag.attrs?.property === 'og:url' && typeof tag.attrs.content === 'string') tag.attrs.content = tag.attrs.content.replace(/\.html$/, '');
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
