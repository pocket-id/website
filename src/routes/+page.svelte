<script lang="ts">
  import ConnectArrow from "$lib/components/connect-arrow.svelte";
  import RedditCommentsCarousel from "$lib/components/reddit-comments-carousel.svelte";
  import SeoHead from "$lib/components/seo-head.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { additionalFeatures, mainFeatures } from "$lib/config/features.js";

  import Github from "$lib/icons/github.svelte";
  import { buildSeo, buildWebSiteJsonLd } from "$lib/seo.js";
  import { formatCompactNumber } from "$lib/utils.js";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import BookOpen from "@lucide/svelte/icons/book-open";
  import Bot from "@lucide/svelte/icons/bot";
  import HousePlug from "@lucide/svelte/icons/house-plug";
  import PlayIcon from "@lucide/svelte/icons/play";
  import ShieldCheck from "@lucide/svelte/icons/shield-check";

  import { onMount } from "svelte";
  import type { PageProps } from "./$types.js";

  let { data }: PageProps = $props();

  const stats = $derived(
    [
      { value: data.instances, label: "Active Instances", suffix: "+" },
      { value: data.dockerPulls, label: "Docker Pulls", suffix: "" },
      { value: data.stars, label: "GitHub Stars", suffix: "" },
      { value: data.contributors, label: "Contributors", suffix: "" },
    ].filter((stat) => stat.value),
  );

  const seo = buildSeo({
    title: "Pocket ID | Easy-to-use OIDC Provider",
    description:
      "An easy-to-use OpenID Connect Certified™ and OAuth 2.0 provider that lets users sign in to your applications with passkeys.",
    type: "website",
  });

  let isLoaded = $state(false);

  onMount(() => {
    requestAnimationFrame(() => (isLoaded = true));
  });
</script>

<SeoHead {seo} jsonLd={[buildWebSiteJsonLd()]} />

<div class="min-h-screen bg-background text-foreground">
  <!-- Hero Section -->
  <section class="py-10 sm:py-40 px-10 flex justify-center">
    <div class="flex w-450 justify-between items-end">
      <div class="mx-auto max-w-3xl">
        <h1
          class="text-5xl md:text-7xl font-gloock font-bold mb-6 text-foreground"
          style="transform: {isLoaded
            ? 'translateY(0)'
            : 'translateY(30px)'}; opacity: {isLoaded
            ? 1
            : 0}; transition: all 0.6s ease-out 50ms;"
        >
          Pocket ID
        </h1>
        <p
          class="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          style="transform: {isLoaded
            ? 'translateY(0)'
            : 'translateY(30px)'}; opacity: {isLoaded
            ? 1
            : 0}; transition: all 0.6s ease-out 100ms;"
        >
          The most user-friendly OpenID Connect Certified™ and OAuth 2.0
          provider that lets users sign in to your applications with passkeys.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4"
          style="transform: {isLoaded
            ? 'translateY(0)'
            : 'translateY(30px)'}; opacity: {isLoaded
            ? 1
            : 0}; transition: all 0.6s ease-out 150ms;"
        >
          <Button size="lg" href="/docs/introduction">
            <BookOpen class="w-5 h-5 mr-2" />
            Documentation
          </Button>
          <Button
            size="lg"
            variant="outline"
            href="https://demo.pocket-id.org"
            target="_blank"
          >
            <PlayIcon class="w-5 h-5 mr-1" />
            Demo
          </Button>
        </div>
        {#if stats.length}
          <div
            class="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:flex"
            style="transform: {isLoaded
              ? 'translateY(0)'
              : 'translateY(30px)'}; opacity: {isLoaded
              ? 1
              : 0}; transition: all 0.6s ease-out 150ms;"
          >
            {#each stats as stat, i}
              {#if i > 0}
                <div class="hidden h-10 w-px bg-border sm:block"></div>
              {/if}
              <div class="text-center">
                <div class="text-3xl font-bold text-foreground">
                  {formatCompactNumber(stat.value)}{stat.suffix}
                </div>
                <div class="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            {/each}
            <div class="hidden h-10 w-px bg-border sm:block"></div>
            <img
              src="/img/landing/oidc-certified.jpg"
              alt="OIDC Certified Badge"
              class="h-10 mx-auto sm:mx-0"
            />
          </div>
        {/if}
      </div>
      <img
        class="h-[300px] 3xl:h-[400px] hidden 2xl:block rounded-3xl"
        src="/img/landing/login-screenshot.png"
      />
    </div>
  </section>

  <div class="mt-20">
    <RedditCommentsCarousel />
  </div>

  <!-- Use Cases Section -->
  <section id="use-cases" class="px-4 py-20">
    <div class="container mx-auto max-w-7xl">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <h2 class="font-gloock mb-4 text-4xl font-bold">
          Built for more than login
        </h2>
        <p class="text-muted-foreground text-lg">
          Secure AI tools, your homelab, and custom applications with one simple
          identity provider.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-12">
        <Card class="md:col-span-7 md:row-span-2">
          <CardHeader>
            <Bot class="mb-3 size-8" />
            <CardTitle class="text-2xl">AI agents and MCP servers</CardTitle>
            <CardDescription class="text-base leading-relaxed">
              Use Pocket ID as the OAuth provider for AI applications and remote
              MCP servers. Users approve access with their passkey, while scoped
              tokens limit which tools and data each client can reach.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-1 flex-col gap-6">
            <img
              src="/img/landing/mcp-auth-screenshot.png"
              alt="MCP OAuth Demo"
              class="rounded-lg w-full"
            />
          </CardContent>
          <CardFooter>
            <Button
              href="https://github.com/pocket-id/mcp-oauth-demo"
              variant="outline"
              target="_blank"
            >
              See an example
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>

        <Card class="md:col-span-5">
          <CardHeader>
            <HousePlug class="mb-3 size-8" />
            <CardTitle>One login for your homelab</CardTitle>
            <CardDescription class="text-base leading-relaxed">
              Connect dashboards, media servers, admin tools, and everything
              else you self-host to one passwordless sign-in. Use groups to
              decide who can access each service.
            </CardDescription>
          </CardHeader>
          <CardFooter class="mt-auto">
            <Button href="/docs/client-examples" variant="link" class="px-0">
              Browse integrations
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>

        <Card class="md:col-span-5">
          <CardHeader>
            <ShieldCheck class="mb-3 size-8" />
            <CardTitle>Protect applications and APIs</CardTitle>
            <CardDescription class="text-base leading-relaxed">
              Add passkey sign-in to OIDC applications and issue scoped access
              tokens for your own APIs. Each token is limited to the intended
              API and allowed actions.
            </CardDescription>
          </CardHeader>
          <CardFooter class="mt-auto">
            <Button href="/docs/guides/apis" variant="link" class="px-0">
              Learn about API access
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>

  <!-- Main Features Section -->
  <section id="features" class="pt-15 pb-10 px-4">
    <div class="container mx-auto">
      <div
        class="text-center mb-16"
        style="transform: {isLoaded
          ? 'translateY(0)'
          : 'translateY(30px)'}; opacity: {isLoaded
          ? 1
          : 0}; transition: all 0.6s ease-out 50ms;"
      >
        <h2 class="font-gloock text-4xl font-bold mb-4">Key Features</h2>
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
            style="transform: {isLoaded
              ? 'translateY(0)'
              : 'translateY(30px)'}; opacity: {isLoaded
              ? 1
              : 0}; transition: all 0.6s ease-out {100 + index * 20}ms;"
          >
            <div class={imageFirst ? "md:order-2" : ""}>
              <div class="flex items-center mb-4">
                <Icon class="size-8 text-foreground mr-3" />
                <h3 class="text-2xl font-bold mb-0">{feature.title}</h3>
              </div>
              <p class="text-muted-foreground text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div
              class="bg-card rounded-lg p-4 border border-border {imageFirst
                ? 'md:order-1'
                : ''}"
            >
              <img
                src="/img/landing/{feature.image}"
                alt={feature.title}
                class="rounded-lg w-full"
              />
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
            style="transform: {isLoaded
              ? 'translateY(0)'
              : 'translateY(30px)'}; opacity: {isLoaded
              ? 1
              : 0}; transition: all 0.6s ease-out {100 + index * 15}ms;"
          >
            <CardHeader>
              <div class="flex items-center space-x-2">
                <Icon class="size-6 text-foreground" />
                <CardTitle class="text-foreground">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription class="text-muted-foreground"
                >{feature.description}</CardDescription
              >
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
      style="transform: {isLoaded
        ? 'translateY(0)'
        : 'translateY(30px)'}; opacity: {isLoaded
        ? 1
        : 0}; transition: all 0.6s ease-out 150ms;"
    >
      <h2 class="font-gloock text-3xl md:text-4xl font-bold mb-6">
        Ready to get started?
      </h2>
      <p class="text-xl text-muted-foreground mb-8">
        Deploy Pocket ID today and start providing secure, passwordless
        authentication to your users.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" href="/docs/introduction">
          <BookOpen class="w-5 h-5 mr-1" />
          Read Documentation
        </Button>
        <Button
          size="lg"
          variant="outline"
          href="https://github.com/pocket-id/pocket-id"
          target="_blank"
        >
          <Github class="mr-1 size-5" />
          View on GitHub
        </Button>
      </div>
    </div>
  </section>
</div>
