import { getDoc } from '$lib/docs.js';
import { allDocs } from '$lib/config/content.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const prerender = true;

export const entries: EntryGenerator = () => {
  console.info('Prerendering /docs');

  // Generate entries from the metadata index
  const entries = allDocs.map((doc) => ({ slug: doc.path }));

  // Add empty slug for /docs root (will map to introduction)
  entries.push({ slug: 'introduction' });

  return entries;
};

export const load: PageLoad = async ({ params }) => {
  // Map empty slug to introduction
  const slug = params.slug === '' ? 'introduction' : params.slug;
  const doc = await getDoc(slug);
  return doc;
};
