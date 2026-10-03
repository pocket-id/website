// The link preview image of every docs page and of the landing page, see src/lib/og.ts and src/routeData.ts
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../lib/og';

type Props = { title: string; description?: string; eyebrow?: string };

export const getStaticPaths = (async () => {
	const entries = await getCollection('docs', (entry) => entry.id !== '404');
	return [
		{
			params: { slug: 'index' },
			props: {
				title: 'Easy Self-Hosted OIDC Provider with Passkeys',
				description:
					'Pocket ID is an easy-to-use, self-hosted OpenID Connect Certified™ and OAuth 2.0 provider. Users sign in to your apps with passkeys instead of passwords.'
			}
		},
		...entries.map((entry) => ({
			params: { slug: entry.id },
			props: {
				title: entry.data.title,
				description: entry.data.description,
				eyebrow: entry.id.startsWith('docs/client-examples/')
					? 'OIDC and SSO setup guide'
					: entry.id.startsWith('docs/')
						? 'Documentation'
						: undefined
			}
		}))
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) =>
	new Response(new Uint8Array(await renderOgImage(props)), {
		headers: { 'Content-Type': 'image/jpeg' }
	});
