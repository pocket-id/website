<script>
  import { mode } from 'mode-watcher';

  let { alt = 'JetBrains', className = '' } = $props();

  let logo = $derived(mode && mode.current === 'dark' ? '/img/sponsors/jetbrains-dark.svg' : '/img/sponsors/jetbrains-light.svg');
</script>

<div class="flex flex-col items-center text-center">
  <a href="https://jb.gg/OpenSource" target="_blank" rel="noreferrer" class="inline-block">
    <img src={logo} {alt} class={className} loading="lazy" />
  </a>
</div>
