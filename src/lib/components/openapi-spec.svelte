<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteSet } from "svelte/reactivity";
  import CheckIcon from "@lucide/svelte/icons/check";
  import SearchIcon from "@lucide/svelte/icons/search";
  import XIcon from "@lucide/svelte/icons/x";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import type { OpenApiSchema, OpenApiSpec } from "$lib/types/openapi.js";
  import {
    createOpenApiExample,
    indexOpenApi,
    filterIndexed,
  } from "$lib/utils/openapi-util.js";

  interface Props {
    src?: string;
  }

  let { src = "/openapi.json" }: Props = $props();

  let spec: OpenApiSpec | null = $state(null);
  let loading = $state(true);
  let error: string | null = $state(null);
  let index = $state<ReturnType<typeof indexOpenApi> | null>(null);
  let search = $state("");
  let selectedTags = new SvelteSet<string>();
  let filtered = $derived(
    index ? filterIndexed(index, search, selectedTags) : null,
  );
  let visibleEndpointCount = $derived(
    filtered
      ? Object.values(filtered).reduce(
          (count, endpoints) => count + endpoints.length,
          0,
        )
      : 0,
  );

  onMount(async () => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      spec = (await response.json()) as OpenApiSpec;
      index = indexOpenApi(spec);
      loading = false;
    } catch (err) {
      error =
        err instanceof Error ? err.message : "Failed to load OpenAPI spec";
      loading = false;
    }
  });

  function getMethodColor(method: string): string {
    const colors: Record<string, string> = {
      get: "bg-blue-500",
      post: "bg-green-500",
      put: "bg-orange-500",
      patch: "bg-purple-500",
      delete: "bg-red-500",
    };
    return colors[method.toLowerCase()] || "bg-gray-500";
  }

  function formatPropertyType(schema: OpenApiSchema): string {
    if (schema.$ref) {
      return schema.$ref.split("/").pop() || "object";
    }
    if (schema.oneOf?.length) {
      return schema.oneOf.map(formatPropertyType).join(" | ");
    }
    const types = Array.isArray(schema.type)
      ? schema.type
      : schema.type
        ? [schema.type]
        : [];
    if (types.length) {
      return types
        .map((type) =>
          type === "array" && schema.items
            ? `array<${formatPropertyType(schema.items)}>`
            : type,
        )
        .join(" | ");
    }
    return "unknown";
  }

  function toggleTag(tag: string) {
    if (selectedTags.has(tag)) selectedTags.delete(tag);
    else selectedTags.add(tag);
  }
  function clearFilters() {
    search = "";
    selectedTags.clear();
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
    <div class="rounded-xl border border-border/70 bg-muted/20 p-4 shadow-xs">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative min-w-0 flex-1 sm:max-w-sm">
          <SearchIcon
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            class="h-10 bg-background/80 pl-9 pr-9 shadow-none"
            aria-label="Search API endpoints"
            placeholder="Search paths, summaries, or parameters"
            bind:value={search}
          />
          {#if search}
            <Button
              variant="ghost"
              size="icon"
              class="absolute right-1 top-1/2 size-8 -translate-y-1/2 rounded-full text-muted-foreground"
              aria-label="Clear endpoint search"
              onclick={() => (search = "")}
            >
              <XIcon />
            </Button>
          {/if}
        </div>

        <div class="flex items-center gap-2 sm:ml-auto">
          <span class="text-xs tabular-nums text-muted-foreground">
            {visibleEndpointCount}
            {visibleEndpointCount === 1 ? "endpoint" : "endpoints"}
          </span>
          {#if search || selectedTags.size}
            <Button
              variant="ghost"
              size="sm"
              class="h-8 rounded-full px-2.5 text-xs text-muted-foreground"
              onclick={clearFilters}
            >
              <XIcon />
              Reset
            </Button>
          {/if}
        </div>
      </div>

      {#if index}
        <div class="mt-4 flex items-start gap-3 border-t border-border/60 pt-3">
          <span
            class="pt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            Tags
          </span>
          <div class="flex flex-wrap gap-1.5">
            {#each index.tagOrder as tagName (tagName)}
              <Button
                variant={selectedTags.has(tagName) ? "default" : "outline"}
                size="sm"
                class={`h-7 rounded-full px-2.5 text-xs shadow-none ${
                  selectedTags.has(tagName)
                    ? "border-primary"
                    : "border-border/70 bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                aria-pressed={selectedTags.has(tagName)}
                onclick={() => toggleTag(tagName)}
                title="Toggle tag filter"
              >
                {#if selectedTags.has(tagName)}
                  <CheckIcon class="size-3" />
                {/if}
                {tagName === "_Untagged" ? "Untagged" : tagName}
              </Button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Endpoints by Tag (filtered) -->
    {#if filtered}
      {#each index!.tagOrder as tagName (tagName)}
        {#if filtered[tagName]}
          <section class="space-y-3 pt-2">
            <div
              class="flex items-end justify-between gap-3 border-b border-border/70 pb-3"
            >
              <h2 class="text-xl font-semibold tracking-tight">
                {tagName === "_Untagged" ? "Untagged" : tagName}
              </h2>
              <span class="text-xs tabular-nums text-muted-foreground">
                {filtered[tagName].length}
                {filtered[tagName].length === 1 ? "endpoint" : "endpoints"}
              </span>
            </div>

            {#if spec.tags}
              {@const tagInfo = spec.tags.find((t) => t.name === tagName)}
              {#if tagInfo?.description}
                <p class="text-sm text-muted-foreground">
                  {tagInfo.description}
                </p>
              {/if}
            {/if}

            <Accordion.Root type="multiple" class="space-y-2">
              {#each filtered[tagName] as ep (ep.operation.operationId ?? `${ep.method}:${ep.path}`)}
                <Accordion.Item
                  variant="card"
                  class="overflow-hidden border-border/70 bg-background/60 shadow-xs transition-colors hover:border-border"
                  value="endpoint-{tagName}-{ep.operation.operationId ??
                    `${ep.method}:${ep.path}`}"
                >
                  <Accordion.Trigger class="px-4 py-3.5 hover:no-underline">
                    <div
                      class="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <Badge
                        class={`${getMethodColor(ep.method)} min-w-14 rounded-md border-transparent px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white shadow-none`}
                      >
                        {ep.method.toUpperCase()}
                      </Badge>
                      <div class="min-w-0 flex-1">
                        <code
                          class="block truncate font-mono text-sm font-medium text-foreground"
                          >{ep.path}</code
                        >
                        {#if ep.operation.summary}
                          <p
                            class="mt-0.5 truncate text-xs text-muted-foreground"
                          >
                            {ep.operation.summary}
                          </p>
                        {/if}
                      </div>
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content
                    class="border-t border-border/60 bg-muted/10 px-5 pb-5 pt-5"
                  >
                    <div class="space-y-6">
                      {#if ep.operation.summary}
                        <div>
                          <h4 class="text-lg font-semibold">
                            {ep.operation.summary}
                          </h4>
                        </div>
                      {/if}

                      {#if ep.operation.description}
                        <div>
                          <h4 class="font-semibold mb-2">Description</h4>
                          <p class="text-muted-foreground">
                            {ep.operation.description}
                          </p>
                        </div>
                      {/if}

                      <!-- Parameters -->
                      {#if ep.operation.parameters && ep.operation.parameters.length > 0}
                        <div>
                          <h4 class="font-semibold mb-3">Parameters</h4>
                          <div class="overflow-x-auto">
                            <table
                              class="w-full border-collapse border border-border"
                            >
                              <thead>
                                <tr class="bg-muted">
                                  <th class="border border-border p-2 text-left"
                                    >Name</th
                                  >
                                  <th class="border border-border p-2 text-left"
                                    >Type</th
                                  >
                                  <th class="border border-border p-2 text-left"
                                    >In</th
                                  >
                                  <th class="border border-border p-2 text-left"
                                    >Required</th
                                  >
                                  <th class="border border-border p-2 text-left"
                                    >Description</th
                                  >
                                </tr>
                              </thead>
                              <tbody>
                                {#each ep.operation.parameters as param (`${param.in}:${param.name}`)}
                                  <tr>
                                    <td class="border border-border p-2">
                                      <code class="text-sm">{param.name}</code>
                                    </td>
                                    <td class="border border-border p-2">
                                      <Badge variant="outline"
                                        >{formatPropertyType(
                                          param.schema ?? {},
                                        )}</Badge
                                      >
                                    </td>
                                    <td class="border border-border p-2">
                                      <Badge variant="secondary"
                                        >{param.in}</Badge
                                      >
                                    </td>
                                    <td class="border border-border p-2">
                                      {#if param.required}
                                        <Badge variant="destructive"
                                          >Required</Badge
                                        >
                                      {:else}
                                        <Badge variant="outline">Optional</Badge
                                        >
                                      {/if}
                                    </td>
                                    <td
                                      class="border border-border p-2 text-sm text-muted-foreground"
                                    >
                                      {param.description || ""}
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
                              <p class="text-sm text-muted-foreground">
                                {ep.operation.requestBody.description}
                              </p>
                            {/if}
                            {#if ep.operation.requestBody.content}
                              {#each Object.entries(ep.operation.requestBody.content) as [contentType, mediaType] (contentType)}
                                <div>
                                  <Badge
                                    variant="outline"
                                    class="mb-2 rounded-full font-mono text-[11px]"
                                    >{contentType}</Badge
                                  >
                                  {#if mediaType.schema}
                                    <pre
                                      class="overflow-x-auto rounded-lg border border-border/60 bg-muted/30 p-4 text-sm"><code
                                        >{JSON.stringify(
                                          createOpenApiExample(
                                            spec,
                                            mediaType.schema,
                                          ),
                                          null,
                                          2,
                                        )}</code
                                      ></pre>
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
                            {#each Object.entries(ep.operation.responses) as [statusCode, response] (statusCode)}
                              <div
                                class="rounded-lg border border-border/70 bg-background/70 p-4"
                              >
                                <div class="mb-2 flex items-center gap-2">
                                  <Badge
                                    class="min-w-10 rounded-full tabular-nums"
                                    variant={statusCode.startsWith("2")
                                      ? "default"
                                      : statusCode.startsWith("4")
                                        ? "destructive"
                                        : "secondary"}
                                  >
                                    {statusCode}
                                  </Badge>
                                  {#if response.description}
                                    <span class="text-sm text-muted-foreground"
                                      >{response.description}</span
                                    >
                                  {/if}
                                </div>

                                {#if response.content}
                                  <div class="mt-2 space-y-3">
                                    {#each Object.entries(response.content) as [contentType, mediaType] (contentType)}
                                      <div>
                                        <Badge
                                          variant="outline"
                                          class="mb-2 rounded-full font-mono text-[11px]"
                                          >{contentType}</Badge
                                        >
                                        {#if mediaType.schema}
                                          <pre
                                            class="overflow-x-auto rounded-lg border border-border/60 bg-muted/30 p-4 text-xs"><code
                                              >{JSON.stringify(
                                                createOpenApiExample(
                                                  spec,
                                                  mediaType.schema,
                                                ),
                                                null,
                                                2,
                                              )}</code
                                            ></pre>
                                        {/if}
                                      </div>
                                    {/each}
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
        <p
          class="rounded-xl border border-dashed border-border/70 bg-muted/10 px-4 py-10 text-center text-sm text-muted-foreground"
        >
          No endpoints match the current filters.
        </p>
      {/if}
    {/if}

    <!-- Data Models -->
    {#if spec.components?.schemas}
      <section class="space-y-3 pt-2">
        <div
          class="flex items-end justify-between gap-3 border-b border-border/70 pb-3"
        >
          <h2 class="text-xl font-semibold tracking-tight">Data Models</h2>
          <span class="text-xs tabular-nums text-muted-foreground">
            {Object.keys(spec.components.schemas).length}
            {Object.keys(spec.components.schemas).length === 1
              ? "model"
              : "models"}
          </span>
        </div>

        <Accordion.Root type="multiple" class="space-y-2">
          {#each Object.entries(spec.components.schemas) as [modelName, model] (modelName)}
            <Accordion.Item
              variant="card"
              class="overflow-hidden border-border/70 bg-background/60 shadow-xs transition-colors hover:border-border"
              value="model-{modelName}"
            >
              <Accordion.Trigger class="px-4 py-3.5 hover:no-underline">
                <div class="flex min-w-0 flex-1 items-center gap-3 text-left">
                  <code class="truncate font-mono text-sm font-medium"
                    >{modelName}</code
                  >
                  {#if model.description}
                    <span class="flex-1 truncate text-xs text-muted-foreground"
                      >{model.description}</span
                    >
                  {/if}
                </div>
              </Accordion.Trigger>

              <Accordion.Content
                class="border-t border-border/60 bg-muted/10 px-5 pb-5 pt-5"
              >
                {#if model.properties}
                  <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-border">
                      <thead>
                        <tr class="bg-muted">
                          <th class="border border-border p-2 text-left"
                            >Property</th
                          >
                          <th class="border border-border p-2 text-left"
                            >Type</th
                          >
                          <th class="border border-border p-2 text-left"
                            >Required</th
                          >
                          <th class="border border-border p-2 text-left"
                            >Description</th
                          >
                        </tr>
                      </thead>
                      <tbody>
                        {#each Object.entries(model.properties) as [propName, propSchema] (propName)}
                          <tr>
                            <td class="border border-border p-2">
                              <code class="text-sm">{propName}</code>
                            </td>
                            <td class="border border-border p-2">
                              <Badge variant="outline"
                                >{formatPropertyType(propSchema)}</Badge
                              >
                            </td>
                            <td class="border border-border p-2">
                              {#if model.required && model.required.includes(propName)}
                                <Badge variant="destructive">Required</Badge>
                              {:else}
                                <Badge variant="outline">Optional</Badge>
                              {/if}
                            </td>
                            <td
                              class="border border-border p-2 text-sm text-muted-foreground"
                            >
                              {propSchema.description || ""}
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
