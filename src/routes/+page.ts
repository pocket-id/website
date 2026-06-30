export const prerender = true;

export async function load() {
  let instances = null;
  let stars = null;
  let contributors = null;
  let dockerPulls = null;
  try {
    const response = await fetch("https://analytics.pocket-id.org/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    const data = await response.json();
    instances = data.instances;
    stars = data.stars;
    contributors = data.contributors;
    dockerPulls = data.docker_pulls;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  return { instances, stars, contributors, dockerPulls };
}
