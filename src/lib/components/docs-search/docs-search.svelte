<script lang="ts">
  import { goto } from "$app/navigation";
  import CommandMenuItem from "$lib/components/docs-search/docs-search-item.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { SidebarNavItems } from "$lib/config/docs.js";
  import { useIsMac } from "$lib/hooks/is-mac.svelte.js";
  import { cn } from "$lib/utils.js";
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import type { Component } from "svelte";
  import { tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const isMac = useIsMac();

  type PagefindSearchModule = {
    init: () => Promise<void>;
    options: (options: { excerptLength?: number }) => Promise<void>;
    debouncedSearch: (term: string, options?: unknown, debounceTimeoutMs?: number) => Promise<PagefindSearch | null>;
  };

  type PagefindSearch = {
    results: PagefindSearchResult[];
  };

  type PagefindSearchResult = {
    id: string;
    data: () => Promise<PagefindResultData>;
  };

  type PagefindResultData = {
    url: string;
    excerpt?: string;
    meta?: {
      title?: string;
    };
  };

  let open = $state(false);
  let query = $state("");
  let results = $state<PagefindResultData[]>([]);
  let initializing = $state(false);
  let searching = $state(false);
  let error = $state("");

  let pagefind = $state<PagefindSearchModule | null>(null);

  const MAX_PAGE_RESULTS = 10;
  const pagefindModulePath = "/pagefind/pagefind.js";

  async function ensurePagefind() {
    if (pagefind || typeof window === "undefined") return pagefind;

    initializing = true;
    error = "";

    try {
      const mod = (await import(/* @vite-ignore */ pagefindModulePath)) as PagefindSearchModule;
      await mod.options({ excerptLength: 30 });
      await mod.init();
      pagefind = mod;
    } catch {
      error =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
          ? "Search index unavailable in dev mode until a production build has generated Pagefind assets."
          : "Search is temporarily unavailable.";
    } finally {
      initializing = false;
    }

    return pagefind;
  }

  async function onQueryChange() {
    const q = query.trim();

    if (!q) {
      results = [];
      searching = false;
      error = "";
      return;
    }

    const pf = await ensurePagefind();
    if (!pf) {
      results = [];
      return;
    }

    searching = true;

    try {
      const search = await pf.debouncedSearch(q, undefined, 150);
      results = await Promise.all(
        (search?.results ?? []).slice(0, MAX_PAGE_RESULTS).map(async (result) => {
          const data = await result.data();
          data.url = data.url.replace(/\.html$/, "");
          data.excerpt = data.excerpt?.trim() || "";

          return data;
        }),
      );

      error = "";
    } catch {
      results = [];
      error = "Search failed. Please try again.";
    } finally {
      searching = false;
    }
  }

  async function runCommand(command: () => unknown) {
    open = false;
    await tick();
    command();
  }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
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
    }
  }

  $effect(() => {
    if (open) {
      void ensurePagefind();
      return;
    }

    query = "";
    results = [];
    error = "";
    searching = false;
  });
</script>

<svelte:document onkeydown={handleKeydown} />

{#snippet CommandMenuKbd({ class: className, content, ...restProps }: HTMLAttributes & { content: string | Component })}
  {@const Content = content}
  <kbd
    class={cn(
      "bg-background dark:bg-background text-muted-foreground pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border border-border/50 dark:border px-1 font-sans text-[0.7rem] font-medium shadow-sm dark:shadow-none [&_svg:not([class*='size-'])]:size-3",
      className,
    )}
    {...restProps}>
    {#if typeof Content === "string"}
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
          "bg-background dark:bg-surface text-muted-foreground dark:text-surface-foreground/60 shadow-sm dark:shadow-none border border-border/50 dark:border-transparent relative h-8 w-full justify-start pl-2.5 font-normal sm:pr-12 md:w-40 lg:w-56 xl:w-64",
        )}
        onclick={() => (open = true)}>
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <div class="absolute right-1.5 top-1.5 hidden gap-1 sm:flex">
          {@render CommandMenuKbd({ content: isMac.current ? "⌘" : "Ctrl" })}
          {@render CommandMenuKbd({ content: "K", class: "aspect-square" })}
        </div>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content
    showCloseButton={false}
    class="rounded-xl border-none bg-background dark:bg-neutral-900 bg-clip-padding p-2 pb-2 shadow-2xl dark:shadow-2xl ring-4 ring-neutral-200/80 dark:ring-neutral-800 sm:max-w-2xl">
    <Dialog.Header class="sr-only">
      <Dialog.Title>Search documentation...</Dialog.Title>
      <Dialog.Description>Search docs</Dialog.Description>
    </Dialog.Header>

    <Command.Root
      shouldFilter={false}
      class="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border rounded-none bg-transparent">
      <Command.Input placeholder="Search documentation..." bind:value={query} oninput={onQueryChange} />
      <Command.List class="no-scrollbar h-[26rem] max-h-[70vh] overflow-auto scroll-pb-1.5 scroll-pt-2">
        {#if query}
          {#if error}
            <div class="text-muted-foreground px-3 py-12 text-center text-sm">{error}</div>
          {:else if initializing || searching}
            <div class="text-muted-foreground px-3 py-12 text-center text-sm">Searching documentation…</div>
          {:else if results.length}
            <Command.Group
              heading="Search results"
              class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1">
              {#each results as result (result.url)}
                <CommandMenuItem
                  value={result.url}
                  class="h-auto items-start gap-3 py-3"
                  onSelect={() => runCommand(() => goto(result.url))}>
                  <div class="flex min-w-0 flex-1 flex-col gap-1">
                    <div class="flex min-w-0 items-center gap-2">
                      <span class="truncate font-medium">{result.meta?.title}</span>
                    </div>
                    {#if result.excerpt}
                      <p
                        class="text-muted-foreground line-clamp-2 text-xs font-normal [&_mark]:bg-primary/15 [&_mark]:text-foreground">
                        {@html result.excerpt}
                      </p>
                    {/if}
                  </div>
                  <ArrowRightIcon class="mt-0.5 shrink-0" />
                </CommandMenuItem>
              {/each}
            </Command.Group>
          {:else}
            <div class="text-muted-foreground px-3 py-12 text-center text-sm">No matching documentation found.</div>
          {/if}
        {:else}
          {#each SidebarNavItems as group (group.title)}
            <Command.Group
              heading={group.title}
              class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1">
              {#each group.items as item, i (i)}
                <CommandMenuItem
                  value={item.title?.toString() ? `${group.title} ${item.title}` : ""}
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
