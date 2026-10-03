// Server islands render on every request, so they tell Vercel's CDN how long to keep the HTML they return
// Once it's older than that, the CDN still serves it while it renders a fresh copy in the background, the way ISR does for whole pages
// A response built from failed fetches passes a short time, so the next visitors soon get another try
export function cacheIsland(response: { headers: Headers }, seconds: number) {
	response.headers.set('Cache-Control', `public, max-age=0, s-maxage=${seconds}, stale-while-revalidate=86400`);
}
