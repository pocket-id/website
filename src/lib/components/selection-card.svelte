<script lang="ts">
  interface Props {
    name: string;
    description: string;
    href: string;
    class?: string;
  }

  let { name, description, href, class: className = '', ...restProps }: Props = $props();
</script>

<a
  {href}
  class="bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-center rounded-xl p-6 transition-colors sm:p-10 {className}"
  {...restProps}>
  <p class="font-bold text-white text-center">{name}</p>
  <p class="mt-1 text-xs text-muted-foreground text-center">{description}</p>
</a>
