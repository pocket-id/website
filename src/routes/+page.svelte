<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { mainFeatures, additionalFeatures } from '$lib/config/features.js';
  import ConnectArrow from '$lib/components/connect-arrow.svelte';

  import BookOpen from '@lucide/svelte/icons/book-open';
  import TestTube from '@lucide/svelte/icons/test-tube';
  import Github from '@lucide/svelte/icons/github';

  let instanceCount = $state<number | undefined>(undefined);
  let isLoaded = $state(false);
  let instanceCountLoaded = $state(false);

  async function getInstanceCount(): Promise<number> {
    const response = await fetch('https://analytics.pocket-id.org/stats');
    if (!response.ok) throw new Error('Failed to fetch instance count');
    const data = await response.json();
    return data.total;
  }

  onMount(() => {
    getInstanceCount()
      .then((c) => {
        instanceCount = c;
        setTimeout(() => (instanceCountLoaded = true), 120);
      })
      .catch((e) => console.error('Failed to fetch instance count:', e));
    requestAnimationFrame(() => (isLoaded = true));
  });
</script>

<svelte:head>
  <title>Pocket ID - Simple OIDC Provider</title>
  <meta
    name="description"
    content="A simple and easy-to-use OIDC provider that allows users to authenticate with their passkeys to your services." />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <!-- Hero Section -->
  <section class="relative px-4 pt-24 pb-16 md:pt-28">
    <div class="mx-auto max-w-5xl text-center">
      <h1
        class="font-bold tracking-tight text-balance text-5xl md:text-7xl leading-[1.05] bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent opacity-0 translate-y-6 transition-all duration-700 ease-out data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
        data-in={isLoaded}>
        Pocket ID
      </h1>
      <p
        class="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 translate-y-6 transition-all duration-700 delay-100 data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
        data-in={isLoaded}>
        A simple, passwordless OIDC provider enabling secure passkey authentication for your services.
      </p>
      <div
        class="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center opacity-0 translate-y-6 transition-all duration-700 delay-150 data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
        data-in={isLoaded}>
        <Button size="lg" href="/docs" class="group">
          <BookOpen class="mr-2 size-5 transition-transform group-hover:-translate-y-0.5" />
          Documentation
        </Button>
        <Button
          size="lg"
          variant="outline"
          href="https://demo.pocket-id.org"
          target="_blank"
          class="group border-primary/25 hover:border-primary/50 hover:bg-primary/5">
          <TestTube class="mr-2 size-5 transition-transform group-hover:rotate-6" />
          Demo
        </Button>
      </div>

      {#if instanceCount}
        <Badge
          variant="outline"
          class="mt-6"
          style="transform: {instanceCountLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {(
            instanceCountLoaded
          ) ?
            1
          : 0}; transition: all 0.6s ease-out 200ms;">
          <div class="bg-green-400 rounded-full w-2 h-2 animate-pulse inline-block mr-1"></div>
          {instanceCount} Active Instances
        </Badge>
      {/if}
    </div>
  </section>

  <!-- Key Features -->
  <section id="features" class="px-4 pb-10 pt-4">
    <div class="mx-auto max-w-6xl">
      <div
        class="mx-auto mb-14 max-w-2xl text-center opacity-0 translate-y-6 transition duration-700 ease-out data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
        data-in={isLoaded}>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight">Key Features</h2>
        <p class="mt-4 text-muted-foreground">Everything you need for modern authentication in one simple package.</p>
      </div>

      <div class="space-y-20">
        {#each mainFeatures as feature, index}
          {@const imageFirst = index % 2 === 0}
          {@const Icon = feature.icon}
          <div
            class="grid gap-10 md:grid-cols-2 items-center opacity-0 translate-y-8 transition duration-700 ease-out data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
            style={`--delay:${100 + index * 80}ms`}
            data-in={isLoaded}>
            <div class={imageFirst ? 'md:order-2' : ''}>
              <div class="mb-5 flex items-center gap-3">
                <div class="flex size-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <Icon class="size-6 text-primary" />
                </div>
                <h3 class="text-2xl font-semibold">{feature.title}</h3>
              </div>
              <p class="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
            </div>
            <div
              class="relative rounded-xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 {(
                imageFirst
              ) ?
                'md:order-1'
              : ''} before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/15 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
              <img
                src={`/img/landing/${feature.image}`}
                alt={feature.title}
                class="rounded-lg w-full ring-1 ring-border/40" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Additional Features -->
  <section class="px-4 pb-24 pt-6">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each additionalFeatures as feature, index}
          {@const Icon = feature.icon}
          <Card
            class="group relative overflow-hidden border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity group-hover:before:opacity-100 opacity-0 translate-y-4 data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
            style={`--delay:${100 + index * 40}ms`}
            data-in={isLoaded}>
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  <Icon this={feature.icon} class="size-5 text-primary" />
                </div>
                <CardTitle class="text-base font-semibold">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="pt-0">
              <CardDescription class="text-sm leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- Divider -->
  <section class="py-4">
    <div class="mx-auto max-w-5xl">
      <ConnectArrow class="mx-auto h-12 rotate-90 text-muted-foreground/40" />
    </div>
  </section>

  <!-- CTA -->
  <section class="px-4 pb-28 pt-8">
    <div
      class="mx-auto max-w-3xl text-center opacity-0 translate-y-8 transition duration-700 ease-out data-[in=true]:opacity-100 data-[in=true]:translate-y-0"
      data-in={isLoaded}>
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight">Ready to get started?</h2>
      <p class="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        Deploy Pocket ID today and offer secure, passwordless authentication to your users.
      </p>
      <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button size="lg" href="/docs" class="group">
          <BookOpen class="mr-2 size-5 transition-transform group-hover:-translate-y-0.5" />
          Read Documentation
        </Button>
        <Button
          size="lg"
          variant="outline"
          href="https://github.com/pocket-id/pocket-id"
          target="_blank"
          class="group border-primary/25 hover:border-primary/50 hover:bg-primary/5">
          <Github class="mr-2 size-5 transition-transform group-hover:scale-110" />
          View on GitHub
        </Button>
      </div>
    </div>
  </section>
</div>

<style>
  /* Respect per-card animation delay via inline style variable */
  [data-in='true'][style*='--delay'] {
    animation: fadeSlide 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--delay);
  }
  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
