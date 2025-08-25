import { json } from '@sveltejs/kit';
import { GITHUB_TOKEN } from '$env/static/private';
//token needs user:read user:email and org:read and public_repo

export const prerender = false; // dynamic (requires token at runtime/build)

type Sponsor = {
  login: string;
  name: string | null;
  url: string;
  avatarUrl: string;
};

const Q = `
query Sponsors($login: String!) {
  user(login: $login) {
    sponsorshipsAsMaintainer(first: 100) {
      nodes {
        sponsorEntity {
          ... on User { login name url avatarUrl }
          ... on Organization { login name url avatarUrl }
        }
      }
    }
  }
  organization(login: $login) {
    sponsorshipsAsMaintainer(first: 100) {
      nodes {
        sponsorEntity {
          ... on User { login name url avatarUrl }
          ... on Organization { login name url avatarUrl }
        }
      }
    }
  }
}
`;

async function sponsorsFor(login: string): Promise<Sponsor[]> {
  if (!GITHUB_TOKEN) return [];
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: Q, variables: { login } }),
  });
  if (!res.ok) return [];
  const data = await res.json();
  const u = data?.data?.user?.sponsorshipsAsMaintainer?.nodes ?? [];
  const o = data?.data?.organization?.sponsorshipsAsMaintainer?.nodes ?? [];
  const nodes = [...u, ...o] as { sponsorEntity?: Sponsor }[];
  const list = nodes.map((n) => n.sponsorEntity).filter(Boolean) as Sponsor[];

  // de-dupe by login
  const seen = new Set<string>();
  return list.filter((s) => (seen.has(s.login) ? false : (seen.add(s.login), true)));
}

export async function GET({ url }) {
  const users = (url.searchParams.get('users') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!users.length) return json({ sponsors: [], users: [] });

  const all: Sponsor[] = [];
  for (const u of users) {
    const list = await sponsorsFor(u);
    all.push(...list);
  }
  const seen = new Set<string>();
  const sponsors = all.filter((s) => (seen.has(s.login) ? false : (seen.add(s.login), true)));

  return json({ users, sponsors, ok: true, hasToken: Boolean(GITHUB_TOKEN) });
}
