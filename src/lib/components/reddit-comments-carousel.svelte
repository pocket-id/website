<script lang="ts">
  import { infiniteCarousel } from "$lib/attachments/infinite-carousel.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import { onMount } from "svelte";

  type RedditComment = {
    id: string;
    author: string;
    excerpt: string;
    url: string;
  };

  const redditComments: RedditComment[] = [
    {
      id: "ox5k1yp",
      author: "huzzyz",
      excerpt:
        "I have been using Pocket ID since 2025 and it has been an excellent experience. It was incredibly easy to set up uses very few resources, and does exactly what I need without any unnecessary complexity.",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox5k1yp/",
    },
    {
      id: "ox4yk42",
      author: "mamwybejane",
      excerpt: "Amazing. Favorite self hosted service by far!",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox4yk42/",
    },
    {
      id: "ox5bnx2",
      author: "Asfalots",
      excerpt:
        "The only Auth application I could install and not even think about it later. You did an amazing job with this application.",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox5bnx2/",
    },
    {
      id: "ox54bsj",
      author: "hometechgeek",
      excerpt:
        "Love PocketID, used for a while now, very nice design and stability, works so well with cloudflare tunnels.",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox54bsj/",
    },
    {
      id: "ox5r4kn",
      author: "ProletariatPat",
      excerpt:
        "I put Pocket ID on a VPS (it's so light) and I've never looked back. Thank you, it's amazing!",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox5r4kn/",
    },
    {
      id: "ox666ua",
      author: "dakoellis",
      excerpt:
        "All praise for pocket ID is warranted. This is a freakin awesome project",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox666ua/",
    },
    {
      id: "ox7ntk1",
      author: "RedditNotFreeSpeech",
      excerpt:
        "It's so stinking simple to integrate and use and I can spend my time working on the subject matter pieces of my application.",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox7ntk1/",
    },
    {
      id: "ox8jve5",
      author: "unlevels",
      excerpt: "Love pocket id, its so simple to setup and visually pleasing!",
      url: "https://www.reddit.com/r/selfhosted/comments/1uunxeq/comment/ox8jve5/",
    },
    {
      id: "nxbo2xm",
      author: "Funny-Satisfaction-1",
      excerpt:
        "I've really appreciated how easy pocket-id has been to setup and administer in my homelab.",
      url: "https://www.reddit.com/r/selfhosted/comments/1q287q1/comment/nxbo2xm/",
    },
    {
      id: "nxc388t",
      author: "mydarb",
      excerpt:
        "I just installed Pocket ID on Wednesday and was very impressed at how simple it was. Two hours from when I started it was running and all of my apps that support oidc were configured.",
      url: "https://www.reddit.com/r/selfhosted/comments/1q287q1/comment/nxc388t/",
    },
  ];

  let comments = $state(redditComments);
  const carouselScroll = infiniteCarousel({
    durationMs: (viewport) => (viewport.clientWidth < 768 ? 75_000 : 120_000),
  });

  function shuffleComments(source: RedditComment[]) {
    const shuffled = [...source];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[index],
      ];
    }

    return shuffled;
  }

  onMount(() => {
    comments = shuffleComments(redditComments);
  });
</script>

{#snippet commentCard(comment: RedditComment)}
  <Card.Root
    class="h-44 sm:h-60 gap-3 border-border/70 py-4 shadow-sm transition-colors hover:border-muted-foreground/50"
  >
    <Card.Header class="px-5">
      <Card.Title class="min-w-0 truncate text-base">
        u/{comment.author}
      </Card.Title>
      <Card.Description>r/selfhosted</Card.Description>
      <Card.Action>
        <ExternalLink class="size-4 text-muted-foreground" />
      </Card.Action>
    </Card.Header>
    <Card.Content class="flex-1 px-5">
      <blockquote
        class="line-clamp-3 sm:line-clamp-5 text-base leading-relaxed text-foreground"
      >
        “{comment.excerpt}”
      </blockquote>
    </Card.Content>
  </Card.Root>
{/snippet}

<section aria-labelledby="community-title" class="overflow-hidden py-16">
  <div class="container mx-auto mb-10 px-4 text-center">
    <h2 id="community-title" class="mb-4 font-gloock text-4xl font-bold">
      Loved by the community
    </h2>
    <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
      What self-hosters are saying about Pocket ID
    </p>
  </div>

  <div
    {@attach carouselScroll}
    role="region"
    aria-label="Community comments carousel"
    class="overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:mask-none [&::-webkit-scrollbar]:hidden"
  >
    <div class="flex w-max">
      <div
        class="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6 motion-reduce:hidden"
        aria-hidden="true"
      >
        {#each comments as comment (comment.id)}
          <div class="w-[min(82vw,24rem)] shrink-0">
            {@render commentCard(comment)}
          </div>
        {/each}
      </div>
      <div data-carousel-page class="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6">
        {#each comments as comment (comment.id)}
          <a
            href={comment.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Read u/${comment.author}'s comment on Reddit`}
            class="block w-[min(82vw,24rem)] shrink-0"
            onclick={(event) => event.currentTarget.blur()}
          >
            {@render commentCard(comment)}
          </a>
        {/each}
      </div>
      <div
        class="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6 motion-reduce:hidden"
        aria-hidden="true"
      >
        {#each comments as comment (comment.id)}
          <div class="w-[min(82vw,24rem)] shrink-0">
            {@render commentCard(comment)}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
