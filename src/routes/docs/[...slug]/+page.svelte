<script lang="ts">
  let { data } = $props();
  const Markdown = $derived(data.component);
  const doc = $derived(data.metadata);
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
  </div>
</div>
