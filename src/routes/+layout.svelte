<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '$lib/components/header.svelte';
  import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
  import Code from '@lucide/svelte/icons/code';

  let { children } = $props();

  let showBanner = $state(false);
  let isDev = $state(false);
  let version: string | undefined = $state();

  async function readVersionFile(): Promise<string> {
    try {
      const res = await fetch('https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/.version');
      return await res.text();
    } catch {
      return '';
    }
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isProd = host === 'pocket-id.org';
    if (!isProd) {
      showBanner = true;
      isDev = host === 'localhost' || host === '127.0.0.1';
      readVersionFile().then((v) => (version = v?.trim() || undefined));
    }
  }
</script>

<ModeWatcher disableTransitions={false} />

<svelte:head>
  <title>Pocket ID</title>
  <meta
    name="description"
    content="Pocket ID - A simple OIDC provider that allows users to authenticate with their passkeys to your services." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if showBanner}
  <div
    class="sticky top-0 z-[60] border-b border-blue-500 text-blue-500 bg-blue-500/10 dark:bg-blue-500/15 backdrop-blur-sm">
    <div class="container-wrapper px-6 py-2">
      <div class="text-[12px] font-medium flex items-center justify-center gap-2 text-center">
        {#if isDev}
          <Code class="size-4" />
          <span>Development environment — documentation may not reflect the production version</span>
        {:else}
          <AlertTriangle class="size-4" />
          <span>
            This documentation is for an unreleased version of Pocket ID. See the
            <a href="https://pocket-id.org/docs" class="underline font-semibold text-blue-500 hover:text-blue-400"
              >latest version</a>
            {#if version}
              (v{version}){/if}
          </span>
        {/if}
      </div>
    </div>
  </div>
{/if}

<div class="bg-background text-foreground flex min-h-screen flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
</div>
