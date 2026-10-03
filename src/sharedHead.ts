// Head tags every page shares, used by the Starlight config for the docs and by the landing page, which renders its own head
// Docs pages replace the image with their own, see src/routeData.ts
export const ogImage = '/og/index.jpg';

// The size of the link preview images that src/lib/og.ts draws
export const ogSize = { width: 1200, height: 630 };

type HeadTag = { tag: 'meta' | 'link'; attrs: Record<string, string> };

export const sharedHead = (site: URL | string): HeadTag[] => [
	// Link previews on chat apps and social sites show the page's title next to the photo of the sign-in screen, see src/lib/og.ts
	{ tag: 'meta', attrs: { property: 'og:image', content: new URL(ogImage, site).href } },
	{
		tag: 'meta',
		attrs: {
			property: 'og:image:alt',
			content: 'Pocket ID: passkey sign-in for your self-hosted apps'
		}
	},
	// The size lets sites lay out the preview before the image loaded
	{ tag: 'meta', attrs: { property: 'og:image:width', content: String(ogSize.width) } },
	{ tag: 'meta', attrs: { property: 'og:image:height', content: String(ogSize.height) } },
	{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
	// iOS uses this for bookmarks on the home screen, and would otherwise take a screenshot of the page
	{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
	// Every page sets its text in Geist, so fetching it with the HTML keeps the fallback font from swapping in late and shifting the layout
	{
		tag: 'link',
		attrs: {
			rel: 'preload',
			href: '/fonts/Geist/geist.woff2',
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		}
	}
];
