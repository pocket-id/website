import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { changelog as changelogMeta } from '$docs/index.js';

type DocModule = { default: Component; metadata?: Record<string, any> };

const modules = import.meta.glob<DocModule>('/docs/**/*.md');

function transformPath(p: string): string {
  return p
    .replace(/\\/g, '/')
    .replace(/^.*\/docs\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .trim();
}

export const prerender = true;

export const load = async () => {
  const meta = changelogMeta?.[0];
  if (!meta) throw error(404, 'Changelog not found');

  const key = Object.keys(modules).find((k) => transformPath(k) === 'changelog');
  if (!key) throw error(404, 'Changelog module not found');

  const mod = await modules[key]();
  const fm = mod.metadata ?? {};

  return {
    component: mod.default,
    metadata: {
      ...meta,
      ...fm,
      path: 'changelog',
      title: fm.title ?? meta.title,
      description: fm.description ?? meta.description,
      toc: fm.toc ?? meta.toc ?? [],
    },
  };
};
