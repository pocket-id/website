<script lang="ts">
  import ChangelogToc from '$lib/components/changelog-toc.svelte';
  import SeoHead from '$lib/components/seo-head.svelte';
  import { buildBreadcrumbJsonLd, buildSeo } from '$lib/seo.js';
  import ExternalLink from '@lucide/svelte/icons/external-link';
  import type { PageData } from './$types.js';

  let { data }: { data: PageData } = $props();

  const Markdown = data.component;
  const doc = data.metadata
  const toc = doc.toc ?? [];

  const seo = buildSeo({
      title: 'Changelog | Pocket ID',
      description: doc.description,
      type: 'article',
    });
  
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Changelog', path: '/changelog' },
  ]);

  const githubEditUrl = `https://github.com/pocket-id/website/edit/main/docs/${doc.path}.md`;
</script>

<SeoHead seo={seo} jsonLd={[breadcrumbJsonLd]} />

<div class="container mx-auto flex min-w-0 flex-1 px-4 py-6 lg:py-8">
  <div class="mx-auto flex w-full max-w-6xl gap-8">
    <div class="flex w-full min-w-0 flex-1 flex-col gap-8">
      <div class="flex flex-col gap-2">
        <h1 class="scroll-m-20 text-4xl font-semibold tracking-tight">
          {doc.title}
        </h1>
        {#if doc.description}
          <p class="text-muted-foreground text-lg text-balance">
            {doc.description}
          </p>
        {/if}
      </div>

      <div class="w-full flex-1">
        <Markdown />
      </div>
    </div>

    <ChangelogToc {toc} />
  </div>
</div>
