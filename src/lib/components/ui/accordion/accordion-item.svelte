<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'list',
    ...restProps
  }: AccordionPrimitive.ItemProps & { variant?: 'list' | 'card' } = $props();

  const base = variant === 'card' ? 'border rounded-lg bg-background' : 'border-b last:border-b-0';
</script>

<AccordionPrimitive.Item bind:ref data-slot="accordion-item" class={cn(base, className)} {...restProps} />
