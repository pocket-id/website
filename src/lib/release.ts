// The current Pocket ID release and the project's public numbers, fetched once per build so every page shows the same values
// The site rebuilds whenever a release lands in the changelog, so build time is fresh enough, and a failed fetch only hides the value
import { GITHUB_TOKEN } from 'astro:env/server';

let version: Promise<string | undefined> | undefined;

// The version file on the main branch holds the version of the latest release, such as 2.17.0
export function latestVersion() {
	version ??= fetch('https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/.version')
		.then((res) => (res.ok ? res.text() : undefined))
		.then((text) => text?.trim() || undefined)
		.catch(() => undefined);
	return version;
}

export type Stats = { instances?: number; stars?: number; contributors?: number; dockerPulls?: number };

let stats: Promise<Stats> | undefined;

// Active instances come from the opt-out heartbeat described on the analytics page, the rest from GitHub and the container registries
export function projectStats() {
	stats ??= Promise.all([activeInstances(), githubStars(), githubContributors(), dockerHubPulls(), ghcrPulls()]).then(
		([instances, stars, contributors, hub, ghcr]) => ({
			instances,
			stars,
			contributors,
			// The image is published to both registries, and a count from only one of them would undersell the total
			dockerPulls: hub !== undefined && ghcr !== undefined ? hub + ghcr : undefined
		})
	);
	return stats;
}

// Fetches a URL and reads a number from the response, giving up after ten seconds so a slow service can't stall the build
async function count(url: string, read: (res: Response) => Promise<number | undefined>, headers: Record<string, string> = {}) {
	try {
		const res = await fetch(url, { headers: { 'User-Agent': 'pocket-id-website', ...headers }, signal: AbortSignal.timeout(10_000) });
		if (!res.ok) return undefined;
		const n = await read(res);
		return Number.isFinite(n) ? n : undefined;
	} catch {
		return undefined;
	}
}

const activeInstances = () => count('https://analytics.pocket-id.org/stats', async (res) => (await res.json()).total);

// A token raises GitHub's limit from 60 to 5000 requests an hour, which matters on shared CI runners
const githubHeaders = { Accept: 'application/vnd.github+json', ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }) };

const githubStars = () => count('https://api.github.com/repos/pocket-id/pocket-id', async (res) => (await res.json()).stargazers_count, githubHeaders);

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

const dockerHubPulls = () => count('https://hub.docker.com/v2/repositories/pocketid/pocket-id/', async (res) => (await res.json()).pull_count);

// GitHub has no API for container downloads, so the exact count is read from the title of the "Total downloads" heading on the package page
const ghcrPulls = () =>
	count('https://github.com/pocket-id/pocket-id/pkgs/container/pocket-id', async (res) => {
		const match = (await res.text()).match(/Total downloads[\s\S]*?<h3[^>]*title="(\d+)"/);
		return match ? Number(match[1]) : undefined;
	});
