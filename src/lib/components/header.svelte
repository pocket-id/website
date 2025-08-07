<script lang="ts">
  import { onMount } from 'svelte';
  import MainNav from './main-nav.svelte';
  import MobileNav from './mobile-nav.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import GithubLink from './github-link.svelte';
  import ModeSwitcher from './modeswitcher.svelte';

  import { mainNavItems } from '$lib/config/docs.js';

  let version: string | undefined = undefined;

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
  });
</script>

<header class="bg-background border-border sticky top-0 z-50 w-full border-b">
  <div class="container-wrapper 3xl:fixed:px-0 px-6">
    <div class="flex items-center gap-4 py-4">
      <a href="/" class="hidden items-center gap-2 no-underline transition hover:opacity-80 sm:flex">
        <img src="/img/logo.png" alt="Pocket ID Logo" class="size-6" />
        <span class="text-xl font-bold text-foreground">Pocket ID</span>
      </a>
      <MainNav items={mainNavItems} class="hidden lg:flex" />

      <MobileNav class="flex sm:hidden" />

      <div class="ml-auto hidden items-center gap-2 sm:flex md:flex-1 md:justify-end">
        <div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
          <!-- <DocsCommandMenu /> -->
        </div>
        {#if version}
          <Badge variant="default" class="bg-surface text-foreground">
            v{version}
          </Badge>
          <Separator orientation="vertical" />
        {/if}
        <GithubLink />
        <Separator orientation="vertical" />
        <ModeSwitcher />
      </div>
    </div>
  </div>
</header>
