// How long a response built from failed fetches is kept, so the next visitors get another try without every page view refetching from a service that's down
export const FALLBACK_SECONDS = 15 * 60;

// Server islands render on every request, so they tell Vercel's CDN how long to keep the HTML they return
// Once it's older than that, the CDN still serves it while it renders a fresh copy in the background, the way ISR does for whole pages
export function cacheIsland(response: { headers: Headers }, seconds: number) {
	response.headers.set(
		'Cache-Control',
		`public, max-age=0, s-maxage=${seconds}, stale-while-revalidate=86400`
	);
}
