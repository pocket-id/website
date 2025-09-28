---
title: Sponsors
description: GitHub Sponsors supporting the project maintainers
---

<script>
  import SponsorsGrid from '$lib/components/sponsors-grid.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import JetbrainsLogo from '$lib/components/jetbrains-logo.svelte';
  const users = ['stonith404', 'kmendell'];
</script>

## GitHub Sponsors

#### Thanks to everyone who supports Pocket ID by becoming a sponsor!

You truly do not know how much that means to us and how much it helps support the behind the scenes functions for the project. If you would like to sponsor us you can do so via the links below:

<div class="flex flex-wrap items-center justify-center gap-2 my-5">
  {#each users as u}
    <Button
      href={`https://github.com/sponsors/${u}`}
      target="_blank"
      rel="noreferrer"
      variant="outline"
      class="flex items-center gap-2 rounded-md border px-3 py-1.5 w-auto">
      <img class="size-5 rounded-full" src={`https://github.com/${u}.png`} alt={u} />
      <span>Sponsor @{u}</span>
    </Button>
  {/each}
</div>

<SponsorsGrid />

## Tools

Thanks to JetBrains for giving free All Products Pack subscriptions to open source maintainers.

<div class="mt-8 mb-6 flex justify-center">
  <div class="max-w-3xl w-full flex justify-center">
    <JetbrainsLogo alt="JetBrains" className="h-20 w-auto rounded-md bg-background p-2 border border-border shadow" />
  </div>
</div>
