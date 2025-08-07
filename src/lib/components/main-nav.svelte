<script lang="ts">
  let { items, class: className = '' } = $props<{
    items: { href: string; label: string }[];
    class?: string;
  }>();
</script>

<nav class="{className} text-sm">
  {#each items as item}
    <a
      href={item.href}
      class="hover:bg-accent hover:text-accent-foreground 3xl:fixed:w-full 3xl:fixed:max-w-48 relative block h-[30px] w-fit overflow-visible rounded border border-transparent px-2 py-1 text-[0.8rem] font-medium transition-colors after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md">
      {item.label}
    </a>
  {/each}
</nav>
