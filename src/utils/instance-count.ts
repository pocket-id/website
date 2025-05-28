export async function getInstanceCount() {
  const response = await fetch("https://analytics.pocket-id.org/stats");

  if (!response.ok) {
    throw new Error("Failed to fetch instance count");
  }

  const data = await response.json();
  return data.total;
}
