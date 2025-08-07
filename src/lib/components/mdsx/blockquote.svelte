<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<blockquote class={cn('bg-muted border-l-primary mt-6 rounded-sm border-l-2 p-5 italic', className)} {...restProps}>
	{@render children?.()}
</blockquote>
