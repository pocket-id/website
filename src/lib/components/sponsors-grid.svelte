<script lang="ts">
  type RawSponsor = {
    name: string | null;
    login: string;
    avatar: string;
    link: string;
    org: boolean;
  };

  type Sponsor = { login: string; name: string | null; url: string; avatarUrl: string };

  let sponsors: Sponsor[] = $state([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  async function load() {
    loading = true;
    error = null;
    try {
      const res = await fetch('https://raw.githubusercontent.com/pocket-id/resources/refs/heads/main/sponsors.json', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = (await res.json()) as RawSponsor[] | { sponsors: RawSponsor[] };

      const items = Array.isArray(list) ? list : (list?.sponsors ?? []);
      sponsors = items.map((s) => ({
        login: s.login,
        name: s.name,
        url: s.link,
        avatarUrl: s.avatar,
      }));
    } catch (e) {
      console.error('Failed to load sponsors.json', e);
      error = 'unavailable';
      sponsors = [];
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    void load();
  });
</script>

{#if loading}
  <div class="text-muted-foreground">Loading sponsors…</div>
{:else if sponsors.length}
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
    <p class="text-muted-foreground">Live sponsor list unavailable. Visit their GitHub Sponsors pages from the links above.</p>
  </div>
{/if}
