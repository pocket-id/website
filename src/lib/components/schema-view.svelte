<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { td as Td, th as Th, tr as Tr } from '$lib/components/mdsx/index.js';
  import { resolveSchema } from '$lib/utils/openapi-util.js';
  import SchemaView from './schema-view.svelte';

  let { spec, schema }: { spec: any; schema: any } = $props();

  let resolved = $derived(resolveSchema(spec, schema));
  let expanded = $state<Record<string, boolean>>({});
</script>

<div class="space-y-2">
  <code class="text-sm">{resolved.label}</code>

  {#if resolved.properties.length > 0}
    <div class="w-full overflow-x-auto">
      <table class="w-full border-none text-sm">
        <thead>
          <Tr>
            <Th>Property</Th>
            <Th>Type</Th>
            <Th>Description</Th>
          </Tr>
        </thead>
        <tbody>
          {#each resolved.properties as property}
            <Tr class="transition-colors {expanded[property.name] ? 'bg-muted/30' : ''}">
              <Td class="whitespace-nowrap align-top">
                <code>{property.name}</code>
                {#if property.required}
                  <span class="text-destructive ml-1 text-xs">required</span>
                {/if}
              </Td>
              <Td class="text-muted-foreground align-top font-mono text-xs">
                {#if property.expandable}
                  <button
                    type="button"
                    class="hover:text-foreground flex cursor-pointer items-center gap-1 transition-colors"
                    aria-expanded={!!expanded[property.name]}
                    onclick={() => (expanded[property.name] = !expanded[property.name])}>
                    {property.label}
                    <ChevronDownIcon
                      class="size-3 shrink-0 transition-transform duration-200 {expanded[property.name] ?
                        'rotate-180'
                      : ''}" />
                  </button>
                {:else}
                  {property.label}
                {/if}
              </Td>
              <Td class="text-muted-foreground align-top">{property.schema.description ?? ''}</Td>
            </Tr>
            {#if expanded[property.name]}
              <Tr>
                <Td colspan={3} class="border-primary/40 bg-muted/30 border-l-2">
                  <SchemaView {spec} schema={property.schema} />
                </Td>
              </Tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
