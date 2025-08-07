<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { page } from '$app/state';
  import { cn } from '$lib/utils.js';

  let { items, class: className = '' } = $props<{
    items: { href: string; label: string }[];
    class?: string;
  }>();
</script>

<nav class="{className} text-sm">
  {#each items as item}
    <Button href={item.href} variant="ghost" size="sm" class={cn(page.url.pathname === item.href && 'text-primary')}>
      {item.label}
    </Button>
  {/each}
</nav>
