// Head tags every page shares, used by the Starlight config for the docs and by the landing page, which renders its own head
export const ogImage = '/img/landing/auth_screenshot.webp';

type HeadTag = { tag: 'meta' | 'link'; attrs: Record<string, string> };

export const sharedHead = (site: URL | string): HeadTag[] => [
	// Link previews on chat apps and social sites show a screenshot of the sign-in
	{ tag: 'meta', attrs: { property: 'og:image', content: new URL(ogImage, site).href } },
	{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Pocket ID: sign in to your services with passkeys' } },
	{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
	// Every page sets its text in Geist, so fetching it with the HTML keeps the fallback font from swapping in late and shifting the layout
	{ tag: 'link', attrs: { rel: 'preload', href: '/fonts/Geist/geist.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' } }
];
