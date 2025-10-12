<script lang="ts" module>
  // Velite TocEntry type structure
  type TocEntry = {
    title: string;
    url: string;
    items: TocEntry[];
  };

  function flattenToc(items: TocEntry[] = [], depth = 0) {
    const out: Array<{ title: string; url: string; depth: number }> = [];
    for (const item of items) {
      out.push({ title: item.title, url: item.url, depth });
      if (item.items && item.items.length) {
        out.push(...flattenToc(item.items, depth + 1));
      }
    }
    return out;
  }

  function useActiveItem(getItemIds: () => string[]) {
    let activeId = $state<string | null>(null);
    const itemIds = $derived(getItemIds().map((id) => id.replace('#', '')));

    $effect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeId = entry.target.id;
            }
          }
        },
        { rootMargin: '0px 0px -70% 0px', threshold: 0 }
      );

      for (const id of itemIds ?? []) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }

      return () => {
        for (const id of itemIds ?? []) {
          const el = document.getElementById(id);
          if (el) observer.unobserve(el);
        }
      };
    });

    return {
      get current() {
        return activeId;
      },
    };
  }
</script>

<script lang="ts">
  import { cn } from '$lib/utils.js';

  let { toc, class: className }: { toc: TocEntry[]; class?: string } = $props();

  const flattened = $derived(flattenToc(toc ?? []));
  const itemUrls = $derived(flattened.map((i) => i.url));
  const active = useActiveItem(() => itemUrls);

  const versions = $derived(flattened.filter((item) => item.depth === 0 && /^v?\d/.test(item.title)));
</script>

{#if versions.length}
  <aside class={cn('hidden w-48 shrink-0 lg:block', className)}>
    <div class="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pb-4">
      <div class="flex flex-col gap-2">
        <p class="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">Versions</p>
        <nav class="flex flex-col gap-0.5">
          {#each versions as item (item.url)}
            {@const isActive = item.url === `#${active.current}`}
            <a
              href={item.url}
              class={cn(
                'group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-all',
                'hover:bg-muted/50 hover:text-foreground',
                isActive ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'
              )}
              data-active={isActive}>
              <span
                class={cn(
                  'flex h-1 w-1 shrink-0 rounded-full transition-all',
                  isActive ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-muted-foreground'
                )}></span>
              <span class="truncate">{item.title}</span>
            </a>
          {/each}
        </nav>
      </div>
    </div>
  </aside>
{/if}
