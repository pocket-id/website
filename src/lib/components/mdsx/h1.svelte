<script lang="ts">
	import Heading from './heading.svelte';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<Heading level={1} class={cn('scroll-m-20 text-4xl font-bold tracking-tight', className)} {...restProps}>
	{@render children?.()}
</Heading>
