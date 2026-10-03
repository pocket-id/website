// The current Pocket ID release, fetched once per build, and the project's public numbers, fetched whenever the stats island renders
// The site rebuilds whenever a release lands in the changelog, so build time is fresh enough for the version, and a failed fetch only hides the value
import { GITHUB_TOKEN } from 'astro:env/server';

let version: Promise<string | undefined> | undefined;

// The version file on the main branch holds the version of the latest release, such as 2.17.0
export function latestVersion() {
	version ??= fetch(
		'https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/.version'
	)
		.then((res) => (res.ok ? res.text() : undefined))
		.then((text) => text?.trim() || undefined)
		.catch(() => undefined);
	return version;
}

export type Stats = {
	instances?: number;
	stars?: number;
	contributors?: number;
	dockerPulls?: number;
};

// Active instances come from the opt-out heartbeat described on the analytics page, the rest from GitHub and the container registries
// Not memoized, since a warm function would otherwise keep the first numbers it fetched; the CDN caches the rendered island instead
export async function projectStats(): Promise<Stats> {
	const [instances, stars, contributors, hub, ghcr] = await Promise.all([
		activeInstances(),
		githubStars(),
		githubContributors(),
		dockerHubPulls(),
		ghcrPulls()
	]);
	return {
		instances,
		stars,
		contributors,
		// The image is published to both registries, and a count from only one of them would undersell the total
		dockerPulls: hub !== undefined && ghcr !== undefined ? hub + ghcr : undefined
	};
}

// Fetches a URL and reads a number from the response, giving up after five seconds so a slow service can't stall the build
// GitHub's API now and then hangs and answers 504, so a timeout or server error gets one more try
// A failure only hides the number, so it's logged to show up in the build and function logs
async function count(
	url: string,
	read: (res: Response) => Promise<number | undefined>,
	headers: Record<string, string> = {},
	attempt = 1
): Promise<number | undefined> {
	const retry = attempt < 2;
	try {
		const res = await fetch(url, {
			headers: { 'User-Agent': 'pocket-id-website', ...headers },
			signal: AbortSignal.timeout(5_000)
		});
		if (!res.ok) {
			const body = (await res.text()).slice(0, 300);
			if (res.status >= 500 && retry) return count(url, read, headers, attempt + 1);
			console.warn(`Fetching ${url} failed with ${res.status}: ${body}`);
			return undefined;
		}
		const n = await read(res);
		// A body that's never read keeps its connection busy, and later requests to the same host then hang in a warm function
		if (!res.bodyUsed) await res.body?.cancel();
		if (!Number.isFinite(n)) console.warn(`No number found in the response of ${url}`);
		return Number.isFinite(n) ? n : undefined;
	} catch (err) {
		if (retry) return count(url, read, headers, attempt + 1);
		console.warn(`Fetching ${url} failed: ${err}`);
		return undefined;
	}
}

const activeInstances = () =>
	count('https://analytics.pocket-id.org/stats', async (res) => (await res.json()).total);

// A token raises GitHub's limit from 60 to 5000 requests an hour, which matters on shared CI runners and Vercel's functions
// The pocket-id organization rejects classic tokens that live longer than 366 days, even for public data
const githubHeaders = {
	Accept: 'application/vnd.github+json',
	...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` })
};

export const githubStars = () =>
	count(
		'https://api.github.com/repos/pocket-id/pocket-id',
		async (res) => (await res.json()).stargazers_count,
		githubHeaders
	);

// With one contributor per page, the number of the last page is the number of contributors
const githubContributors = () =>
	count(
		'https://api.github.com/repos/pocket-id/pocket-id/contributors?per_page=1',
		async (res) => {
			const last = res.headers.get('link')?.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/)?.[1];
			return last ? Number(last) : (await res.json()).length;
		},
		githubHeaders
	);

const dockerHubPulls = () =>
	count(
		'https://hub.docker.com/v2/repositories/pocketid/pocket-id/',
		async (res) => (await res.json()).pull_count
	);

// GitHub has no API for container downloads, so the exact count is read from the title of the "Total downloads" heading on the package page
const ghcrPulls = () =>
	count('https://github.com/pocket-id/pocket-id/pkgs/container/pocket-id', async (res) => {
		const match = (await res.text()).match(/Total downloads[\s\S]*?<h3[^>]*title="(\d+)"/);
		return match ? Number(match[1]) : undefined;
	});
