<script lang="ts">
  import { onMount } from 'svelte';
  import * as Code from '$lib/components/ui/code/index.js';
  import { cn } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  type SupportedLang = 'bash' | 'diff' | 'javascript' | 'json' | 'svelte' | 'typescript' | 'yaml';

  let {
    class: className,
    children,
    lang = 'bash',
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    lang?: SupportedLang;
  } = $props();

  let preNode = $state<HTMLDivElement>();
  let code = $state('');

  onMount(() => {
    if (preNode) {
      code = preNode.textContent?.trim() || '';
    }
  });
</script>

<div bind:this={preNode} style="display: none;">{@render children?.()}</div>

{#if code}
  <Code.Root {lang} class={cn('w-full max-w-none mt-3', className)} {...restProps} {code}>
    <Code.CopyButton size="sm" variant="ghost" />
  </Code.Root>
{/if}
