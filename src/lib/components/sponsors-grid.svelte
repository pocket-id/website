<script lang="ts">
  interface Props {
    users: string[];
  }

  let { users = ['kmendell', 'stonith404'] }: Props = $props();

  type Sponsor = { login: string; name: string | null; url: string; avatarUrl: string };
  let sponsors: Sponsor[] = $state([]);
  let hasToken = $state(false);
  let loading = $state(true);

  async function load() {
    loading = true;
    try {
      const u = encodeURIComponent(users.join(','));
      const res = await fetch(`/api/sponsors?users=${u}`);
      if (res.ok) {
        const json = (await res.json()) as { sponsors: Sponsor[]; hasToken: boolean };
        sponsors = json.sponsors ?? [];
        hasToken = json.hasToken ?? false;
      }
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    if (users.length) void load();
  });
</script>

{#if loading}
  <div class="text-muted-foreground">Loading sponsors…</div>
{:else if hasToken && sponsors.length}
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5">
    {#each sponsors as s (s.login)}
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        class="group flex flex-col items-center gap-2 rounded-md border p-3 hover:bg-accent">
        <img src={s.avatarUrl} alt={s.name ?? s.login} class="size-16 rounded-full border-ghost" loading="lazy" />
        <div class="text-sm font-medium text-center">{s.name ?? s.login}</div>
        <div class="text-xs text-muted-foreground">@{s.login}</div>
      </a>
    {/each}
  </div>
{:else}
  <div class="space-y-3">
    <p class="text-muted-foreground">
      Live sponsor list unavailable. Visit their GitHub Sponsors pages from the links above.
    </p>
  </div>
{/if}
