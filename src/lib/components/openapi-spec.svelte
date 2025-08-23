<script lang="ts">
  import { onMount } from 'svelte';
  import yaml from 'js-yaml';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import { indexOpenApi, filterIndexed } from '$lib/utils/openapi-util.js';

  interface Props {
    src?: string;
  }

  let { src = '/swagger.yaml' }: Props = $props();

  interface OpenAPISpec {
    info?: {
      title?: string;
      version?: string;
      description?: string;
    };
    paths?: Record<string, Record<string, any>>;
    definitions?: Record<string, any>;
    tags?: Array<{ name: string; description?: string }>;
  }

  let spec: OpenAPISpec | null = $state(null);
  let loading = $state(true);
  let error: string | null = $state(null);
  let index = $state<ReturnType<typeof indexOpenApi> | null>(null);
  let search = $state('');
  let selectedTags = $state<Set<string>>(new Set());
  let filtered = $derived(index ? filterIndexed(index, search, selectedTags) : null);

  onMount(async () => {
    try {
      const response = await fetch(src);
      const specText = await response.text();
      spec = yaml.load(specText) as OpenAPISpec;
      index = indexOpenApi(spec);
      loading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load OpenAPI spec';
      loading = false;
    }
  });

  function getMethodColor(method: string): string {
    const colors: Record<string, string> = {
      get: 'bg-blue-500',
      post: 'bg-green-500',
      put: 'bg-orange-500',
      patch: 'bg-purple-500',
      delete: 'bg-red-500',
    };
    return colors[method.toLowerCase()] || 'bg-gray-500';
  }

  function formatPropertyType(property: any): string {
    if (property.type) {
      if (property.type === 'array' && property.items) {
        return `${property.type}<${formatPropertyType(property.items)}>`;
      }
      return property.type;
    }
    if (property.$ref) {
      return property.$ref.split('/').pop() || 'object';
    }
    return 'unknown';
  }

  function getEndpointsByTag(paths: Record<string, Record<string, any>>) {
    const endpointsByTag: Record<string, Array<{ path: string; method: string; operation: any }>> = {};

    Object.entries(paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, operation]) => {
        if (typeof operation === 'object' && operation.tags) {
          operation.tags.forEach((tag: string) => {
            if (!endpointsByTag[tag]) {
              endpointsByTag[tag] = [];
            }
            endpointsByTag[tag].push({ path, method, operation });
          });
        }
      });
    });

    return endpointsByTag;
  }

  function toggleTag(tag: string) {
    if (selectedTags.has(tag)) selectedTags.delete(tag);
    else selectedTags.add(tag);
    // force reactivity
    selectedTags = new Set(selectedTags);
  }
  function clearFilters() {
    search = '';
    selectedTags = new Set();
  }
</script>

{#if loading}
  <div class="flex items-center justify-center py-8">
    <div class="text-muted-foreground">Loading API documentation...</div>
  </div>
{:else if error}
  <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
    <strong>Error loading API spec:</strong>
    {error}
  </div>
{:else if spec}
  <div class="space-y-6">
    <!-- Filters -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-2 flex-1">
        <input
          class="w-full md:w-80 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Search endpoints (path, summary, param)..."
          bind:value={search} />
        {#if search || selectedTags.size}
          <button class="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/70" onclick={clearFilters}>Clear</button>
        {/if}
      </div>
      {#if index}
        <div class="flex flex-wrap gap-2">
          {#each index.tagOrder as tagName}
            <button
              type="button"
              class={`text-xs px-2 py-1 rounded border transition ${
                selectedTags.has(tagName) ?
                  'bg-primary text-primary-foreground border-primary'
                : 'bg-muted hover:bg-muted/70'
              }`}
              onclick={() => toggleTag(tagName)}
              title="Toggle tag filter">
              {tagName === '_Untagged' ? 'Untagged' : tagName}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Endpoints by Tag (filtered) -->
    {#if filtered}
      {#each index!.tagOrder as tagName}
        {#if filtered[tagName]}
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold border-b pb-2">
              {tagName === '_Untagged' ? 'Untagged' : tagName}
            </h2>

            {#if spec.tags}
              {@const tagInfo = spec.tags.find((t) => t.name === tagName)}
              {#if tagInfo?.description}
                <p class="text-muted-foreground mb-4">{tagInfo.description}</p>
              {/if}
            {/if}

            <Accordion.Root type="multiple" class="space-y-2">
              {#each filtered[tagName] as ep, index}
                <Accordion.Item variant="card" value="endpoint-{tagName}-{index}">
                  <Accordion.Trigger class="px-4 py-3 hover:no-underline">
                    <div class="flex items-center gap-3 w-full text-left">
                      <Badge class={`${getMethodColor(ep.method)} text-white font-mono text-xs px-2 py-1`}>
                        {ep.method.toUpperCase()}
                      </Badge>
                      <code class="text-sm font-mono flex-1">{ep.path}</code>
                      {#if ep.operation.summary}
                        <span class="text-sm text-muted-foreground truncate max-w-md">{ep.operation.summary}</span>
                      {/if}
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content class="px-4 pb-4">
                    <div class="space-y-6 pt-2">
                      {#if ep.operation.summary}
                        <div>
                          <h4 class="text-lg font-semibold">{ep.operation.summary}</h4>
                        </div>
                      {/if}

                      {#if ep.operation.description}
                        <div>
                          <h4 class="font-semibold mb-2">Description</h4>
                          <p class="text-muted-foreground">{ep.operation.description}</p>
                        </div>
                      {/if}

                      <!-- Parameters -->
                      {#if ep.operation.parameters && ep.operation.parameters.length > 0}
                        <div>
                          <h4 class="font-semibold mb-3">Parameters</h4>
                          <div class="overflow-x-auto">
                            <table class="w-full border-collapse border border-border">
                              <thead>
                                <tr class="bg-muted">
                                  <th class="border border-border p-2 text-left">Name</th>
                                  <th class="border border-border p-2 text-left">Type</th>
                                  <th class="border border-border p-2 text-left">In</th>
                                  <th class="border border-border p-2 text-left">Required</th>
                                  <th class="border border-border p-2 text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {#each ep.operation.parameters as param}
                                  <tr>
                                    <td class="border border-border p-2">
                                      <code class="text-sm">{param.name}</code>
                                    </td>
                                    <td class="border border-border p-2">
                                      <Badge variant="outline">{param.type || 'string'}</Badge>
                                    </td>
                                    <td class="border border-border p-2">
                                      <Badge variant="secondary">{param.in}</Badge>
                                    </td>
                                    <td class="border border-border p-2">
                                      {#if param.required}
                                        <Badge variant="destructive">Required</Badge>
                                      {:else}
                                        <Badge variant="outline">Optional</Badge>
                                      {/if}
                                    </td>
                                    <td class="border border-border p-2 text-sm text-muted-foreground">
                                      {param.description || ''}
                                    </td>
                                  </tr>
                                {/each}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      {/if}

                      <!-- Request Body -->
                      {#if ep.operation.requestBody}
                        <div>
                          <h4 class="font-semibold mb-3">Request Body</h4>
                          <div class="space-y-2">
                            {#if ep.operation.requestBody.description}
                              <p class="text-sm text-muted-foreground">{ep.operation.requestBody.description}</p>
                            {/if}
                            {#if ep.operation.requestBody.content}
                              {#each Object.entries(ep.operation.requestBody.content) as [contentType, content]}
                                <div>
                                  <Badge variant="outline" class="mb-2">{contentType}</Badge>
                                  {#if (content as any).schema}
                                    <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code
                                        >{JSON.stringify((content as any).schema, null, 2)}</code></pre>
                                  {/if}
                                </div>
                              {/each}
                            {/if}
                          </div>
                        </div>
                      {/if}

                      <!-- Responses -->
                      {#if ep.operation.responses}
                        <div>
                          <h4 class="font-semibold mb-3">Responses</h4>
                          <div class="space-y-4">
                            {#each Object.entries(ep.operation.responses) as [statusCode, responseObj]}
                              {@const response = responseObj as any}
                              <div class="border rounded p-3">
                                <div class="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant={statusCode.startsWith('2') ? 'default'
                                    : statusCode.startsWith('4') ? 'destructive'
                                    : 'secondary'}>
                                    {statusCode}
                                  </Badge>
                                  {#if response.description}
                                    <span class="text-sm text-muted-foreground">{response.description}</span>
                                  {/if}
                                </div>

                                {#if response.schema}
                                  <div class="mt-2">
                                    <h5 class="text-sm font-medium mb-1">Schema:</h5>
                                    <pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code
                                        >{JSON.stringify(response.schema, null, 2)}</code></pre>
                                  </div>
                                {/if}
                              </div>
                            {/each}
                          </div>
                        </div>
                      {/if}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              {/each}
            </Accordion.Root>
          </section>
        {/if}
      {/each}

      {#if Object.keys(filtered).length === 0}
        <p class="text-sm text-muted-foreground pt-4">No endpoints match filters.</p>
      {/if}
    {/if}

    <!-- Data Models -->
    {#if spec.definitions}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold border-b pb-2">Data Models</h2>

        <Accordion.Root type="multiple" class="space-y-2">
          {#each Object.entries(spec.definitions) as [modelName, model], index}
            <Accordion.Item variant="card" value="model-{index}">
              <Accordion.Trigger class="px-4 py-3 hover:no-underline">
                <div class="flex items-center gap-3 w-full text-left">
                  <code class="font-mono text-sm">{modelName}</code>
                  {#if model.description}
                    <span class="text-sm text-muted-foreground truncate flex-1">{model.description}</span>
                  {/if}
                </div>
              </Accordion.Trigger>

              <Accordion.Content class="px-4 pb-4">
                {#if model.properties}
                  <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-border">
                      <thead>
                        <tr class="bg-muted">
                          <th class="border border-border p-2 text-left">Property</th>
                          <th class="border border-border p-2 text-left">Type</th>
                          <th class="border border-border p-2 text-left">Required</th>
                          <th class="border border-border p-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {#each Object.entries(model.properties) as [propName, propSchema]}
                          {@const schema = propSchema as { description?: string }}
                          <tr>
                            <td class="border border-border p-2">
                              <code class="text-sm">{propName}</code>
                            </td>
                            <td class="border border-border p-2">
                              <Badge variant="outline">{formatPropertyType(schema)}</Badge>
                            </td>
                            <td class="border border-border p-2">
                              {#if model.required && model.required.includes(propName)}
                                <Badge variant="destructive">Required</Badge>
                              {:else}
                                <Badge variant="outline">Optional</Badge>
                              {/if}
                            </td>
                            <td class="border border-border p-2 text-sm text-muted-foreground">
                              {schema.description || ''}
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                {/if}
              </Accordion.Content>
            </Accordion.Item>
          {/each}
        </Accordion.Root>
      </section>
    {/if}
  </div>
{/if}

<style>
  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
