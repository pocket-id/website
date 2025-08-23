<script lang="ts">
  import { onMount } from 'svelte';
  import MainNav from './main-nav.svelte';
  import MobileNav from './mobile-nav.svelte';
  import Logo from './logo.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import GithubLink from './github-link.svelte';
  import ModeSwitcher from './modeswitcher.svelte';
  import { mode } from 'mode-watcher';

  import { mainNavItems } from '$lib/config/docs.js';
  import DocsSearch from './docs-search/docs-search.svelte';

  let version: string | undefined = $state('');
  let isDark = $state(false);

  async function readVersionFile(): Promise<string> {
    try {
      const response = await fetch('https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/.version');
      return await response.text();
    } catch (error) {
      console.error('Error reading version file:', error);
      return '';
    }
  }

  onMount(() => {
    readVersionFile().then((v) => {
      if (v.trim()) {
        version = v.trim();
      }
    });

    isDark = mode.current === 'dark';

    const interval = setInterval(() => {
      isDark = mode.current === 'dark';
    }, 100);

    return () => clearInterval(interval);
  });
</script>

<header class="bg-background sticky top-0 z-50 w-full">
  <div class="container-wrapper px-6">
    <div class="h-16 **:data-[slot=separator]:!h-4 flex items-center gap-2">
      <MobileNav class="flex lg:hidden" />
      <Button href="/" variant="ghost" size="icon" class="hidden size-8 lg:flex">
        <Logo {isDark} class="size-5" />
        <span class="sr-only">Pocket ID</span>
      </Button>
      <MainNav items={mainNavItems} class="hidden lg:flex" />
      <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
        <div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
          <DocsSearch />
        </div>
        <Separator orientation="vertical" />
        {#if version}
          <Badge
            variant="default"
            class="bg-background dark:bg-surface shadow-sm dark:shadow-none border border-border/50 dark:border-primary text-foreground text-xs font-bold">
            v{version}
          </Badge>
        {/if}
        <Separator orientation="vertical" />
        <GithubLink />
        <Separator orientation="vertical" />
        <ModeSwitcher />
      </div>
    </div>
  </div>
</header>
