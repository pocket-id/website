<script lang="ts">
	import { onMount } from 'svelte';
	import * as Code from '$lib/components/ui/code/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type SupportedLang = 'bash' | 'diff' | 'javascript' | 'json' | 'svelte' | 'typescript' | 'yaml';

	let {
		class: className,
		children,
		lang = 'bash', // Default to a supported language
		...restProps
	}: HTMLAttributes<HTMLPreElement> & {
		lang?: SupportedLang;
	} = $props();

	let preNode = $state<HTMLPreElement>();
	let code = $state('');

	onMount(() => {
		if (preNode) {
			code = preNode.innerText.trim().replaceAll('  ', ' ');
		}
	});

	// Filter out HTML attributes that Code.Root doesn't accept
	const { accesskey, autocapitalize, autofocus, ...codeProps } = restProps;
</script>

<pre bind:this={preNode} class="hidden">{@render children?.()}</pre>

{#if code}
	<Code.Root {lang} class={cn('mx-auto w-full', className)} {code}>
		<Code.CopyButton size="sm" variant="ghost" />
	</Code.Root>
{/if}
