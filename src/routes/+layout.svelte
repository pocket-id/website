<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();
</script>

<ModeWatcher />

<svelte:head>
  <title>Pocket ID</title>
  <meta
    name="description"
    content="Pocket ID - A simple OIDC provider that allows users to authenticate with their passkeys to your services." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="bg-background text-foreground flex min-h-screen flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
</div>
