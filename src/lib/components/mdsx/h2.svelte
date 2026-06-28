<script lang="ts">
	import Heading from './heading.svelte';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<Heading
	level={2}
	class={cn(
		'font-heading mt-5 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-10 [&+p]:!mt-4',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Heading>
