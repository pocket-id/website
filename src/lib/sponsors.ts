// The GitHub sponsors of both maintainers, fetched whenever the sponsors island renders
// Each maintainer's sponsorships need their own classic token with the read:user scope, since only they can see the tiers
// Amounts never leave this file, only the tier they fall into
import { SPONSORS_GITHUB_TOKEN_KMENDELL, SPONSORS_GITHUB_TOKEN_STONITH404 } from 'astro:env/server';

export type Tier = 'gold' | 'silver' | 'sponsor' | 'past';
export type Sponsor = {
	name: string | null;
	login: string;
	avatar: string;
	link: string;
	tier: Tier;
};

const maintainers = [
	{ login: 'stonith404', token: SPONSORS_GITHUB_TOKEN_STONITH404 },
	{ login: 'kmendell', token: SPONSORS_GITHUB_TOKEN_KMENDELL }
];
// Monthly dollars from which a sponsor counts as gold or silver, summed over both maintainers
const tiers: { name: Tier; from: number }[] = [
	{ name: 'gold', from: 10 },
	{ name: 'silver', from: 5 },
	{ name: 'sponsor', from: 0 }
];

const query = `query ($login: String!, $cursor: String) {
	user(login: $login) {
		sponsorshipsAsMaintainer(first: 100, after: $cursor, activeOnly: false, includePrivate: false) {
			pageInfo { hasNextPage endCursor }
			nodes {
				createdAt
				tierSelectedAt
				isActive
				isOneTimePayment
				privacyLevel
				tier { monthlyPriceInDollars }
				sponsorEntity {
					__typename
					... on User { login name avatarUrl }
					... on Organization { login name avatarUrl websiteUrl }
				}
			}
		}
	}
}`;

type Sponsorship = {
	createdAt: string;
	tierSelectedAt: string | null;
	isActive: boolean;
	isOneTimePayment: boolean;
	privacyLevel: 'PUBLIC' | 'PRIVATE';
	tier: { monthlyPriceInDollars: number } | null;
	sponsorEntity: {
		__typename: 'User' | 'Organization';
		login: string;
		name: string | null;
		avatarUrl: string;
		websiteUrl?: string | null;
	} | null;
};

type SponsorshipPage = {
	pageInfo: { hasNextPage: boolean; endCursor: string | null };
	nodes: Sponsorship[];
};

async function fetchSponsorships(login: string, token: string) {
	const sponsorships: Sponsorship[] = [];
	let cursor: string | null = null;
	do {
		const res: Response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `bearer ${token}`,
				'Content-Type': 'application/json',
				'User-Agent': 'pocket-id-website'
			},
			body: JSON.stringify({ query, variables: { login, cursor } }),
			signal: AbortSignal.timeout(10_000)
		});
		const body: {
			data?: { user: { sponsorshipsAsMaintainer: SponsorshipPage } };
			errors?: unknown;
		} = await res.json();
		if (!res.ok || body.errors || !body.data)
			throw new Error(
				`Fetching the sponsors of ${login} failed: ${JSON.stringify(body.errors ?? body)}`
			);

		const page = body.data.user.sponsorshipsAsMaintainer;
		sponsorships.push(...page.nodes);
		cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
	} while (cursor);
	return sponsorships;
}

const month = 30 * 24 * 60 * 60 * 1000;

// Like on GitHub, a one-time payment counts as a current sponsorship for a month, with its amount as the monthly one
const isCurrent = (s: Sponsorship) =>
	s.isActive ||
	(s.isOneTimePayment && Date.now() - Date.parse(s.tierSelectedAt ?? s.createdAt) < month);

// A maintainer whose token is missing or whose request fails is left out, so the others' sponsors still show
// Undefined only when no maintainer's sponsors could be fetched, and complete tells whether everyone's were
export async function fetchSponsors(): Promise<
	{ sponsors: Sponsor[]; complete: boolean } | undefined
> {
	const results = await Promise.all(
		maintainers.map(async (m) => {
			if (!m.token) {
				console.warn(
					`SPONSORS_GITHUB_TOKEN_${m.login.toUpperCase()} is not set, so the sponsors of ${m.login} are left out`
				);
				return undefined;
			}
			try {
				return await fetchSponsorships(m.login, m.token);
			} catch (err) {
				console.error(err);
				return undefined;
			}
		})
	);
	const fetched = results.filter((r) => r !== undefined);
	if (fetched.length === 0) return undefined;

	// Someone sponsoring both maintainers appears once, with their monthly amounts added up
	const byLogin = new Map<string, Omit<Sponsor, 'tier'> & { monthly: number; since: string }>();
	for (const s of fetched.flat()) {
		const entity = s.sponsorEntity;
		if (!entity || s.privacyLevel !== 'PUBLIC') continue;

		const isOrg = entity.__typename === 'Organization';
		const sponsor = byLogin.get(entity.login) ?? {
			name: entity.name || null,
			login: entity.login,
			avatar: entity.avatarUrl,
			link: isOrg && entity.websiteUrl ? entity.websiteUrl : `https://github.com/${entity.login}`,
			monthly: 0,
			since: s.createdAt
		};
		if (isCurrent(s)) sponsor.monthly += s.tier?.monthlyPriceInDollars ?? 0;
		if (s.createdAt < sponsor.since) sponsor.since = s.createdAt;
		byLogin.set(entity.login, sponsor);
	}

	const sponsors = [...byLogin.values()]
		// Current sponsors by amount, then everyone by how long they've supported the project
		.sort(
			(a, b) =>
				Number(b.monthly > 0) - Number(a.monthly > 0) ||
				b.monthly - a.monthly ||
				a.since.localeCompare(b.since)
		)
		.map(({ monthly, since, ...s }): Sponsor => ({
			...s,
			tier: monthly > 0 ? tiers.find((t) => monthly >= t.from)!.name : 'past'
		}));
	return { sponsors, complete: fetched.length === maintainers.length };
}
