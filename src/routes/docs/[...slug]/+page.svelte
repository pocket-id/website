<script lang="ts">
  let { data } = $props();
  const Markdown = $derived(data.component);
  const doc = $derived(data.metadata);

  const githubEditUrl = $derived(`https://github.com/pocket-id/website/edit/main/docs/${doc.path}.md`);
</script>

<svelte:head>
  <title>{doc.title}</title>
  <meta name="description" content={doc.description} />
</svelte:head>

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

    <!-- Edit page footer -->
    <div class="border-t pt-6 mt-8">
      <div class="flex items-center justify-between">
        <div class="text-sm text-muted-foreground">Help improve this page</div>
        <a
          href={githubEditUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Edit this page on GitHub
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
