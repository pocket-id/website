<script lang="ts">
  import SeoHead from '$lib/components/seo-head.svelte';
  import { buildBreadcrumbJsonLd, buildSeo } from '$lib/seo.js';
  import type { PageData } from './$types.js';

  let { data }: { data: PageData } = $props();

  const Markdown = $derived(data.component);
  const doc = $derived(data.metadata);

  const seo = $derived(
    buildSeo({
      title: doc.path === 'introduction' ? 'Pocket ID Docs' : `${doc.title} | Pocket ID Docs`,
      description: doc.description,
      type: 'article',
    })
  );
  const breadcrumbJsonLd = $derived(
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Docs', path: '/docs' },
      { name: doc.title, path: data.path },
    ])
  );

  import ExternalLink from '@lucide/svelte/icons/external-link';

  const githubEditUrl = $derived(`https://github.com/pocket-id/website/edit/main/docs/${doc.path}.md`);
</script>

<SeoHead seo={seo} jsonLd={[breadcrumbJsonLd]} />

<div class="flex min-w-0 flex-1 flex-col">
  <div class="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8">
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

    {#if data.neighbors.previous || data.neighbors.next}
      <nav class="grid gap-4 border-t pt-6 sm:grid-cols-2" aria-label="Documentation pagination">
        {#if data.neighbors.previous}
          <a href={data.neighbors.previous.href} class="rounded-lg border p-4 transition-colors hover:bg-accent/40">
            <div class="text-xs uppercase tracking-wide text-muted-foreground">Previous</div>
            <div class="mt-1 font-medium">{data.neighbors.previous.title}</div>
          </a>
        {:else}
          <div></div>
        {/if}

        {#if data.neighbors.next}
          <a
            href={data.neighbors.next.href}
            class="rounded-lg border p-4 text-left transition-colors hover:bg-accent/40 sm:text-right">
            <div class="text-xs uppercase tracking-wide text-muted-foreground">Next</div>
            <div class="mt-1 font-medium">{data.neighbors.next.title}</div>
          </a>
        {/if}
      </nav>
    {/if}

    <div class="border-t pt-6 mt-8">
      <div class="flex items-center justify-between">
        <div class="text-sm text-muted-foreground">Help improve this page</div>
        <a
          href={githubEditUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Edit this page on GitHub
          <ExternalLink class="size-4 text-muted-foreground mb-1 align-text-bottom" />
        </a>
      </div>
    </div>
  </div>
</div>
