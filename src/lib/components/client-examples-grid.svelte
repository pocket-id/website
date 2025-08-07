<script lang="ts">
  import SelectionCard from './client-example-card.svelte';
  import { CLIENT_EXAMPLES_GRID } from '$lib/config/client-examples.js';

  const examples = CLIENT_EXAMPLES_GRID;
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
  {#each examples as example (example.slug)}
    <SelectionCard name={example.name} description={example.description} href={example.href} icon={example.icon} />
  {/each}
</div>

{#if examples.length === 0}
  <div class="flex items-center justify-center py-12">
    <p class="text-muted-foreground">Loading client examples...</p>
  </div>
{/if}
