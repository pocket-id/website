<script lang="ts">
  import { onMount } from 'svelte';
  import MainNav from './main-nav.svelte';
  import MobileNav from './mobile-nav.svelte';
  import Logo from './logo.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import GithubLink from './github-link.svelte';
  import ModeSwitcher from './modeswitcher.svelte';
  import { mode } from 'mode-watcher';

  import { mainNavItems } from '$lib/config/docs.js';

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

    // Set initial theme state
    isDark = mode.current === 'dark';

    // Watch for theme changes
    const interval = setInterval(() => {
      isDark = mode.current === 'dark';
    }, 100);

    return () => clearInterval(interval);
  });
</script>

<header class="bg-background border-border sticky top-0 z-50 w-full border-b">
  <div class="container-wrapper px-6">
    <div class="flex h-16 items-center justify-between">
      <!-- Left side: Logo and Main Navigation -->
      <div class="flex items-center gap-6">
        <a href="/" class="flex items-center gap-2 no-underline transition hover:opacity-80">
          <Logo {isDark} class="size-6" />
          <span class="text-xl font-bold text-foreground">Pocket ID</span>
        </a>
        <MainNav items={mainNavItems} class="hidden lg:flex" />
      </div>

      <MobileNav class="flex lg:hidden" />

      <div class="hidden lg:flex items-center gap-3">
        {#if version}
          <Badge variant="default" class="bg-surface text-foreground text-xs">
            v{version}
          </Badge>
          <Separator orientation="vertical" class="h-4" />
        {/if}
        <GithubLink />
        <Separator orientation="vertical" class="h-4" />
        <ModeSwitcher />
      </div>
    </div>
  </div>
</header>
