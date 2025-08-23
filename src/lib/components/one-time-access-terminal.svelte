<script lang="ts">
  import * as Terminal from '$lib/components/ui/terminal/index.js';

  interface Props {
    user?: string;
    url?: string;
    speed?: number;
  }

  let { user = 'test', url = 'http://localhost:3000/lc/YCvmQgrJbX0zEZbh', speed = 1 }: Props = $props();

  let cmd = $state(`❯ pocket-id one-time-access-token ${user}`);

  const charMs = 35;
  let typingDuration = $derived(Math.ceil((cmd.length * charMs) / speed));
  let firstDelay = $derived(typingDuration + 200);
  let secondDelay = $derived(firstDelay + 1000);
</script>

<Terminal.Root class="my-5 w-full min-w-0 will-change-transform custom-terminal-style" delay={250} {speed}>
  <Terminal.TypingAnimation>{cmd}</Terminal.TypingAnimation>

  <Terminal.Loading delay={firstDelay}>
    {#snippet loadingMessage()}Generating one-time access token...{/snippet}
    {#snippet completeMessage()}
      <span class="text-green-500">
        ✔ A one-time access token valid for 1 hour has been created for "{user}".
      </span>
    {/snippet}
  </Terminal.Loading>

  <Terminal.Loading delay={secondDelay}>
    {#snippet loadingMessage()}Waiting for URL...{/snippet}
    {#snippet completeMessage()}
      Use the following URL to sign in once:
      <a class="underline" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    {/snippet}
  </Terminal.Loading>
</Terminal.Root>
