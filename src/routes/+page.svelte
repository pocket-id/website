<script lang="ts">
  import ConnectArrow from '$lib/components/connect-arrow.svelte';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { additionalFeatures, mainFeatures } from '$lib/config/features.js';

  import BookOpen from '@lucide/svelte/icons/book-open';
  import Github from '@lucide/svelte/icons/github';
  import TestTube from '@lucide/svelte/icons/test-tube';
  import { onMount } from 'svelte';
  import type { PageProps } from './$types.js';

  let {data} : PageProps = $props();

  let isLoaded = $state(false);

    onMount(() => {
      isLoaded = true
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
  <section class="py-20 px-4">
    <div class="container mx-auto text-center max-w-4xl">
      <h1
        class="text-5xl md:text-7xl font-bold mb-6 text-foreground"
        style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
          0
        )}; transition: all 0.6s ease-out 50ms;">
        Pocket ID
      </h1>
      <p
        class="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
        style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
          0
        )}; transition: all 0.6s ease-out 100ms;">
        A simple and easy-to-use OIDC provider that allows users to authenticate with their passkeys to your services.
      </p>
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center"
        style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
          0
        )}; transition: all 0.6s ease-out 150ms;">
        <Button size="lg" href="/docs">
          <BookOpen class="w-5 h-5 mr-2" />
          Documentation
        </Button>
        <Button size="lg" variant="outline" href="https://demo.pocket-id.org" target="_blank">
          <TestTube class="w-5 h-5 mr-1" />
          Demo
        </Button>
      </div>
      <div style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
          0
        )}; transition: all 0.6s ease-out 150ms;">
      {#if data.instanceCount}
        <Badge
          variant="outline"
          class="mt-6"
       >      
          <div class="bg-green-400 rounded-full w-2 h-2 animate-pulse inline-block mr-1"></div>
          {data.instanceCount} Active Instances
        </Badge>
      {/if}
            </div>
    </div>
  </section>

  <!-- Main Features Section -->
  <section id="features" class="pt-20 pb-10 px-4">
    <div class="container mx-auto">
      <div
        class="text-center mb-16"
        style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
          0
        )}; transition: all 0.6s ease-out 50ms;">
        <h2 class="text-4xl font-bold mb-4">Key Features</h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need for modern authentication in one simple package
        </p>
      </div>

      <div class="grid gap-12 max-w-6xl mx-auto">
        {#each mainFeatures as feature, index}
          {@const imageFirst = index % 2 === 0}
          {@const Icon = feature.icon}
          <div
            class="grid md:grid-cols-2 gap-8 items-center"
            style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
              0
            )}; transition: all 0.6s ease-out {100 + index * 20}ms;">
            <div class={imageFirst ? 'md:order-2' : ''}>
              <div class="flex items-center mb-4">
                <Icon class="size-8 text-foreground mr-3" />
                <h3 class="text-2xl font-bold mb-0">{feature.title}</h3>
              </div>
              <p class="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
            </div>
            <div class="bg-card rounded-lg p-4 border border-border {imageFirst ? 'md:order-1' : ''}">
              <img src="/img/landing/{feature.image}" alt={feature.title} class="rounded-lg w-full" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Additional Features Section -->
  <section class="pb-20 px-4">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {#each additionalFeatures as feature, index}
          {@const Icon = feature.icon}
          <Card
            class="bg-card border-border hover:border-muted-foreground/50 transition-all duration-300"
            style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
              0
            )}; transition: all 0.6s ease-out {100 + index * 15}ms;">
            <CardHeader>
              <div class="flex items-center space-x-2">
                <Icon this={feature.icon} class="size-6 text-foreground" />
                <CardTitle class="text-foreground">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription class="text-muted-foreground">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-8">
    <div class="container mx-auto text-center">
      <ConnectArrow class="h-12 rotate-90 mx-auto mb-8 text-gray-400" />
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-10 px-4">
    <div
      class="container mx-auto text-center max-w-3xl"
      style="transform: {isLoaded ? 'translateY(0)' : 'translateY(30px)'}; opacity: {isLoaded ? 1 : (
        0
      )}; transition: all 0.6s ease-out 150ms;">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
      <p class="text-xl text-muted-foreground mb-8">
        Deploy Pocket ID today and start providing secure, passwordless authentication to your users.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" href="/docs">
          <BookOpen class="w-5 h-5 mr-1" />
          Read Documentation
        </Button>
        <Button size="lg" variant="outline" href="https://github.com/pocket-id/pocket-id" target="_blank">
          <Github class="mr-1 size-5" />
          View on GitHub
        </Button>
      </div>
    </div>
  </section>
</div>
