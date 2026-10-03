import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { clientSchema } from './lib/client-example';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// A longer title for search results and link previews, for pages whose short heading misses the words people search for, see src/routeData.ts
				seoTitle: z.string().optional(),
				// The OIDC client a client example creates, written out where the page has a ::create-client line, see src/lib/client-example.ts
				client: clientSchema.optional()
			})
		})
	})
};
