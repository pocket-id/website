<script>
  import { mode } from "mode-watcher";

  let { alt = "JetBrains", className = "" } = $props();
</script>

<div class="flex flex-col items-center text-center">
  <a
    href="https://depot.dev"
    target="_blank"
    rel="noreferrer"
    class="inline-block"
  >
    {#if mode.current === "dark"}
      <img src="/img/sponsors/depot-dark.svg" {alt} class={className} />
    {:else}
      <img src="/img/sponsors/depot-light.svg" {alt} class={className} />
    {/if}
  </a>
</div>
