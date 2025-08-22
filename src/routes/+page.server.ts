let cachedInstanceCount: number | null = null;
let lastFetchedAt: number | null = null;

export async function load() {
  const now = Date.now();
  if (lastFetchedAt && cachedInstanceCount !== null) {
    const secondsAgo = (now - lastFetchedAt) / 1000;
    if (secondsAgo < 300) {
      return { instanceCount: cachedInstanceCount };
    }
  }

  try {
    const response = await fetch("https://analytics.pocket-id.org/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch instance count");
    }

    const data = await response.json();
    cachedInstanceCount = data.total;
    lastFetchedAt = now;
  } catch (error) {
    console.error("Error fetching instance count:", error);
  }

  return { instanceCount: cachedInstanceCount };
}
