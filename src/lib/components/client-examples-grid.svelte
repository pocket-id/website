<script lang="ts">
  import { onMount } from 'svelte';
  import SelectionCard from './client-example-card.svelte';

  interface ClientExample {
    name: string;
    description: string;
    href: string;
    slug: string;
    icon?: string;
  }

  let examples: ClientExample[] = $state([]);

  onMount(async () => {
    try {
      const modules = import.meta.glob('/docs/client-examples/*.md', { eager: true });
      const loadedExamples: ClientExample[] = [];

      for (const [path, module] of Object.entries(modules)) {
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        if (slug === 'index' || slug === 'client-examples') continue;

        const mod = module as any;
        const metadata = mod.metadata || mod.default?.metadata || {};

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
          icon: `sh-${slug}`,
        });
      }

      examples = loadedExamples.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error loading client examples:', error);
    }
  });
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
  {#each examples as example (example.slug)}
    <SelectionCard name={example.name} description={example.description} href={example.href} icon={example.icon} />
  {/each}
</div>

{#if examples.length === 0}
  <div class="flex items-center justify-center py-12">
    <p class="text-muted-foreground">Loading client examples...</p>
  </div>
{/if}
