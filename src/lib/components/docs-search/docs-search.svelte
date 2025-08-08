<script lang="ts">
  import { useIsMac } from '$lib/hooks/is-mac.svelte.js';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';
  import { SidebarNavItems } from '$lib/config/docs.js';
  import type { Component } from 'svelte';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import CommandMenuItem from './docs-search-item.svelte';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';

  const isMac = useIsMac();
  let open = $state(false);

  type SearchDoc = {
    id: string;
    title: string;
    description: string;
    section: string;
    href: string;
    headings: string[];
    content: string;
  };

  let query = $state('');
  let allDocs = $state<SearchDoc[]>([]);
  let results = $state<SearchDoc[]>([]);
  let loading = $state(false);

  async function ensureIndex() {
    if (allDocs.length) return;
    loading = true;
    try {
      const res = await fetch('/api/search');
      const json = (await res.json()) as { docs: SearchDoc[] };
      allDocs = json.docs;
    } finally {
      loading = false;
    }
  }

  function score(doc: SearchDoc, q: string) {
    const ql = q.toLowerCase();
    let s = 0;
    if (doc.title.toLowerCase().includes(ql)) s += 5;
    if (doc.section.toLowerCase().includes(ql)) s += 3;
    if (doc.description.toLowerCase().includes(ql)) s += 2;
    if (doc.headings.join(' ').toLowerCase().includes(ql)) s += 2;
    if (doc.content.toLowerCase().includes(ql)) s += 1;
    return s;
  }

  async function onQueryChange() {
    const q = query.trim();
    if (!q) {
      results = [];
      return;
    }
    await ensureIndex();
    results = allDocs
      .map((d) => ({ d, s: score(d, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 50)
      .map((x) => x.d);
  }

  async function runCommand(command: () => unknown) {
    open = false;
    await tick();
    command();
  }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.key === 'l' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      e.preventDefault();
      open = !open;
      if (open) ensureIndex();
    }
  }
</script>

<svelte:document onkeydown={handleKeydown} />

{#snippet CommandMenuKbd({
  class: className,
  content,
  ...restProps
}: HTMLAttributes<HTMLElement> & { content: string | Component })}
  {@const Content = content}
  <kbd
    class={cn(
      "bg-background text-muted-foreground pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium [&_svg:not([class*='size-'])]:size-3",
      className
    )}
    {...restProps}>
    {#if typeof Content === 'string'}
      {Content}
    {:else}
      <Content />
    {/if}
  </kbd>
{/snippet}

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="secondary"
        class={cn(
          'bg-surface text-surface-foreground/60 dark:bg-card relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64'
        )}
        onclick={() => (open = true)}>
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <div class="absolute right-1.5 top-1.5 hidden gap-1 sm:flex">
          {@render CommandMenuKbd({ content: isMac.current ? '⌘' : 'Ctrl' })}
          {@render CommandMenuKbd({ content: 'L', class: 'aspect-square' })}
        </div>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content
    showCloseButton={false}
    class="rounded-xl border-none bg-clip-padding p-2 pb-2 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800">
    <Dialog.Header class="sr-only">
      <Dialog.Title>Search documentation...</Dialog.Title>
      <Dialog.Description>Search docs</Dialog.Description>
    </Dialog.Header>

    <Command.Root
      class="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border rounded-none bg-transparent">
      <Command.Input placeholder="Search documentation..." bind:value={query} oninput={onQueryChange} />
      <Command.List class="no-scrollbar min-h-28 overflow-auto scroll-pb-1.5 scroll-pt-2">
        <Command.Empty class="text-muted-foreground py-12 text-center text-sm">
          {#if loading}Building search index…{/if}
          {#if !loading}Type to search documentation.{/if}
        </Command.Empty>

        {#if query}
          <Command.Group
            heading="Search results"
            class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1">
            {#each results as r (r.id)}
              <CommandMenuItem
                value={`${r.title} ${r.section}`}
                keywords={[r.description, ...r.headings]}
                onSelect={() => runCommand(() => goto(r.href))}>
                <ArrowRightIcon />
                {r.title}
                <span class="text-muted-foreground ml-auto font-mono text-xs font-normal tabular-nums">
                  {r.section}
                </span>
              </CommandMenuItem>
            {/each}
          </Command.Group>
        {:else}
          {#each SidebarNavItems as group (group.title)}
            <Command.Group
              heading={group.title}
              class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1">
              {#each group.items as item, i (i)}
                <CommandMenuItem
                  value={item.title?.toString() ? `${group.title} ${item.title}` : ''}
                  onSelect={() => runCommand(() => item.href && goto(item.href))}>
                  <ArrowRightIcon />
                  {item.title}
                </CommandMenuItem>
              {/each}
            </Command.Group>
          {/each}
        {/if}
      </Command.List>
    </Command.Root>
  </Dialog.Content>
</Dialog.Root>
