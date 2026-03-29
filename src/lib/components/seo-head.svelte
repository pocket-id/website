<script lang="ts">
  import type { SeoMetadata } from '$lib/seo.js';

  let { seo, jsonLd = [] }: { seo: SeoMetadata; jsonLd?: string[] } = $props();
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />

  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:type" content={seo.type} />
  <meta property="og:site_name" content={seo.siteName} />
  <meta property="og:image" content={seo.imageUrl} />

  {@html jsonLd.map((schema) => `<script type="application/ld+json">${schema}</script>`).join('')}
</svelte:head>
