import {
  advanced,
  api,
  clientExamples,
  clientExamplesOverview,
  configuration,
  guides,
  helpingOut,
  introduction,
  setup,
  troubleshooting,
} from "$docs/index.js";
import { findNeighbors } from "$lib/config/docs.js";
import { getDoc } from "$lib/docs.js";
import type { EntryGenerator, PageLoad } from "./$types.js";

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
  console.info("Prerendering /docs");
  return ALL_DOCS.filter((doc) => doc.path !== "introduction").map((doc) => ({
    slug: doc.path,
  }));
};

export const load: PageLoad = async ({ params, url }) => {
  const doc = await getDoc(params.slug);

  return {
    ...doc,
    path: url.pathname,
    neighbors: findNeighbors(url.pathname),
  };
};
