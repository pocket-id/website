<script lang="ts">
  import { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
  import { cn } from "$lib/utils.js";
  import CheckIcon from "@lucide/svelte/icons/check";
  import LinkIcon from "@lucide/svelte/icons/link";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    level,
    id,
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLHeadingElement> & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  } = $props();

  const clipboard = new UseClipboard();

  function copyLink() {
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    clipboard.copy(url);
    history.replaceState(null, "", `#${id}`);
  }
</script>

<svelte:element
  this={`h${level}`}
  {id}
  class={cn("group/heading scroll-m-28", className)}
  {...restProps}
>
  {@render children?.()}
  {#if id}
    <button
      type="button"
      onclick={copyLink}
      aria-label="Copy link to section"
      title="Copy link to section"
      class="text-muted-foreground hover:text-foreground ml-2 inline-flex align-middle opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100"
    >
      {#if clipboard.copied}
        <CheckIcon class="size-4" />
      {:else}
        <LinkIcon class="size-4" />
      {/if}
    </button>
  {/if}
</svelte:element>
