<script>
  import { mode } from 'mode-watcher';

  let { alt = 'JetBrains', className = '' } = $props();
</script>

<div class="flex flex-col items-center text-center">
  <a href="https://jb.gg/OpenSource" target="_blank" rel="noreferrer" class="inline-block">
   {#if mode.current === 'dark'}
    <img src="/img/sponsors/jetbrains-dark.svg" alt={alt} class={className} />
   {:else}
    <img src="/img/sponsors/jetbrains-light.svg" alt={alt} class={className} />
   {/if}
  </a>
</div>
