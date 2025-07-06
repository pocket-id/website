import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export function readVersionFile(): Promise<string> {
  return fetch(
    "https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/.version"
  )
    .then((response) => response.text())
    .catch((error) => `Error reading version file: ${error}`);
}

if (ExecutionEnvironment.canUseDOM) {
  function getVersion() {
    readVersionFile()
      .then((version) => {
        const versionLabels = document.querySelectorAll('[href="#version"]');
        versionLabels.forEach((label) => {
          (label as HTMLElement).innerText = `v${version}`;
        });
      })
      .catch((error) => console.error("Error fetching version:", error));
  }
  window.addEventListener("load", getVersion);
}
