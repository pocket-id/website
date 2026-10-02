// The current Pocket ID release and the project's public numbers, fetched once per build so every page shows the same values
// The site rebuilds whenever a release lands in the changelog, so build time is fresh enough, and a failed fetch only hides the value

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

// Active instances come from the opt-out heartbeat described on the analytics page, the rest from GitHub and the container registry
export function projectStats() {
	stats ??= fetch('https://analytics.pocket-id.org/stats')
		.then((res) => (res.ok ? res.json() : {}))
		.then((data: Record<string, number>) => ({
			instances: data.instances,
			stars: data.stars,
			contributors: data.contributors,
			dockerPulls: data.docker_pulls
		}))
		.catch(() => ({}));
	return stats;
}
