export async function load() {
  let instanceCount = null;
  try {
    const response = await fetch("https://analytics.pocket-id.org/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch instance count");
    }

    const data = await response.json();
    instanceCount = data.total;
  } catch (error) {
    console.error("Error fetching instance count:", error);
  }

  return { instanceCount };
}
