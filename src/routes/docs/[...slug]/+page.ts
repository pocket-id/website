import { getDoc } from '$lib/docs.js';
import {
  introduction,
  setup,
  configuration,
  guides,
  advanced,
  troubleshooting,
  helpingOut,
  api,
  clientExamplesOverview,
  clientExamples,
} from '$docs/index.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const prerender = true;

const ALL_DOCS = [
  ...introduction,
  ...setup,
  ...configuration,
  ...guides,
  ...advanced,
  ...troubleshooting,
  ...helpingOut,
  ...api,
  ...clientExamplesOverview,
  ...clientExamples,
];

export const entries: EntryGenerator = () => {
  console.info('Prerendering /docs');
  const list = ALL_DOCS.map((doc) => ({ slug: doc.path }));
  if (!list.find((e) => e.slug === 'introduction')) {
    list.push({ slug: 'introduction' });
  }
  return list;
};

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug === '' ? 'introduction' : params.slug;
  const doc = await getDoc(slug);
  return doc;
};
