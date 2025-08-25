---
title: Sponsors
description: GitHub Sponsors supporting the project maintainers
---

<script>
  import SponsorsGrid from '$lib/components/sponsors-grid.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  const users = ['stonith404', 'kmendell'];
</script>

#### Thanks to everyone who supports Pocket ID by becoming a sponsor!

You truly do not know how much that means to us and how much it helps support the behind the scenes functions for the project. If you would like to sponsor us you can do so via the links below:

<div class="flex flex-wrap items-center justify-center gap-2 my-5">
  {#each users as u}
    <Button
      href={`https://github.com/sponsors/${u}`}
      target="_blank"
      rel="noreferrer"
      variant="outline"
      class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5">
      <img class="size-5 rounded-full" src={`https://github.com/${u}.png`} alt={u} />
      <span>Sponsor @{u}</span>
    </Button>
  {/each}
</div>

<SponsorsGrid users={users} />
