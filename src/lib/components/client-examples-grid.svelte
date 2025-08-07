<script lang="ts">
  import { onMount } from 'svelte';
  import SelectionCard from './selection-card.svelte';

  interface ClientExample {
    name: string;
    description: string;
    href: string;
    slug: string;
  }

  let examples: ClientExample[] = $state([]);

  onMount(async () => {
    try {
      // Import all client example modules dynamically
      const modules = import.meta.glob('/docs/client-examples/*.md', { eager: true });

      const loadedExamples: ClientExample[] = [];

      for (const [path, module] of Object.entries(modules)) {
        // Extract slug from path (e.g., '/docs/client-examples/gitea.md' -> 'gitea')
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        // Skip if it's the index file
        if (slug === 'index' || slug === 'client-examples') continue;

        const mod = module as any;
        const metadata = mod.metadata || mod.default?.metadata || {};

        // Generate a nice name from the slug if title not available
        const name =
          metadata.title ||
          slug
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const description = metadata.description || `Configure ${name} with Pocket ID OIDC authentication`;

        loadedExamples.push({
          name,
          description,
          href: `/docs/client-examples/${slug}`,
          slug,
        });
      }

      // Sort examples alphabetically by name
      examples = loadedExamples.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error loading client examples:', error);
    }
  });
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
  {#each examples as example (example.slug)}
    <SelectionCard name={example.name} description={example.description} href={example.href} />
  {/each}
</div>

{#if examples.length === 0}
  <div class="flex items-center justify-center py-12">
    <p class="text-muted-foreground">Loading client examples...</p>
  </div>
{/if}
