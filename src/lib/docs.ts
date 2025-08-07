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
  // Import from the docs folder where your actual markdown files are
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
  const metadata = getDocMetadata(slug);

  if (!doc || !metadata) {
    console.error(`Could not find doc: ${slug}`);
    console.log(
      'Available paths:',
      allDocs.map((d) => d.path)
    );
    error(404, 'Could not find the documentation page.');
  }

  return {
    component: doc.default,
    metadata,
  };
}
