import { allDocs, type DocMetadata } from '$lib/config/content.js';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

type DocResolver = () => Promise<{ default: Component; metadata: any }>;

function transformPath(path: string): string {
  return path.replace('/docs/', '').replace('.md', '').replace('/index', '').trim();
}

function getDocMetadata(slug: string): DocMetadata | undefined {
  return allDocs.find((doc) => doc.path === slug);
}

export async function getDoc(_slug: string): Promise<{ component: Component; metadata: DocMetadata }> {
  const modules = import.meta.glob('/docs/**/*.md');
  const slug = _slug === '' ? 'introduction' : _slug;

  let match: { path?: string; resolver?: DocResolver } = {};

  for (const [path, resolver] of Object.entries(modules)) {
    if (transformPath(path) === slug) {
      match = { path, resolver: resolver as unknown as DocResolver };
      break;
    }
  }

  const doc = await match?.resolver?.();
  const fallbackMetadata = getDocMetadata(slug);

  if (!doc || !fallbackMetadata) {
    console.error(`Could not find doc: ${slug}`);
    error(404, 'Could not find the documentation page.');
  }

  // Merge frontmatter with fallback metadata
  const metadata = {
    title: doc.metadata?.title || fallbackMetadata.title,
    description: doc.metadata?.description || fallbackMetadata.description,
    path: fallbackMetadata.path,
    published: fallbackMetadata.published ?? true,
    // Keep any additional frontmatter
    ...doc.metadata,
  };

  return {
    component: doc.default,
    metadata,
  };
}
