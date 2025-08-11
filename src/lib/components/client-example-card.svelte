<script lang="ts">
  import { resolveIconUrl, createIconFallbackState, getNextFallbackUrl } from '$lib/utils/icon-util.js';

  interface Props {
    name: string;
    description: string;
    href: string;
    icon?: string;
    class?: string;
  }

  let { name, description, href, icon, class: className = '', ...restProps }: Props = $props();

  const iconUrl = $derived(resolveIconUrl(icon));
  const fallbackState = $state(createIconFallbackState());

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    const nextUrl = getNextFallbackUrl(img.src, icon, fallbackState);
    img.src = nextUrl;
  }

  $effect(() => {
    fallbackState.clear();
  });
</script>

<a
  {href}
  class="bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-center rounded-xl p-6 transition-colors sm:p-10 {className}"
  {...restProps}>
  {#if iconUrl}
    <img
      src={iconUrl}
      alt="{name} icon"
      class="w-12 h-12 mb-3 object-contain"
      loading="lazy"
      onerror={handleImageError} />
  {/if}
  <p class="font-bold text-foreground text-center">{name}</p>
  <p class="mt-1 text-xs text-muted-foreground text-center">{description}</p>
</a>
