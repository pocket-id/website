<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="bg-background text-foreground flex max-w-[100vw] flex-col">
  <div class="flex min-h-screen w-full justify-center">
    <main class="flex w-full justify-center">
      <div class="w-full px-2 py-4 sm:max-w-3xl sm:px-4 sm:py-8 md:max-w-4xl md:px-8 lg:max-w-6xl">
        {@render children?.()}
      </div>
    </main>
  </div>
</div>
