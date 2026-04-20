import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

function listDocRoutes(dir: string, baseDir = dir): string[] {
  const routes: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      routes.push(...listDocRoutes(filePath, baseDir));
      continue;
    }

    if (!file.endsWith(".md")) continue;

    const relativePath = path.relative(baseDir, filePath).replace(/\\/g, "/");
    const docPath = relativePath.replace(/\.md$/, "").replace(/\/index$/, "");

    if (docPath === "changelog") continue;

    routes.push(`/docs/${docPath}`);
  }

  return routes;
}

function generateLLMsTxt() {
  const docsDir = "docs";
  let content = "# Pocket ID Documentation\n\n";

  interface ReadMarkdownFiles {
    (dir: string): void;
  }

  interface FileStat {
    isDirectory(): boolean;
  }

  function readMarkdownFiles(dir: string): void {
    const files: string[] = fs.readdirSync(dir);

    for (const file of files) {
      const filePath: string = path.join(dir, file);
      const stat: FileStat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readMarkdownFiles(filePath);
      } else if (file.endsWith(".md")) {
        const relativePath: string = path.relative("docs", filePath);
        const fileContent: string = fs.readFileSync(filePath, "utf-8");

        content += `## ${relativePath}\n\n`;
        content += fileContent;
        content += "\n\n---\n\n";
      }
    }
  }

  if (fs.existsSync(docsDir)) {
    readMarkdownFiles(docsDir);

    // Write to static directory
    if (!fs.existsSync("static")) {
      fs.mkdirSync("static");
    }

    fs.writeFileSync("static/llms.txt", content);
  }
}

function generateSitemap(siteUrl: string) {
  const docsDir = "docs";

  if (fs.existsSync(docsDir)) {
    const routes = ["/", "/changelog", ...listDocRoutes(docsDir)];
    const uniqueRoutes = [...new Set(routes)];
    const routeTags = uniqueRoutes.map((route) => `  <url><loc>${new URL(route, siteUrl).toString()}</loc></url>`).join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeTags}\n</urlset>\n`;

    if (!fs.existsSync("static")) {
      fs.mkdirSync("static");
    }

    fs.writeFileSync("static/sitemap.xml", sitemap);
  }
}

function generateStaticAssets(siteUrl: string) {
  return {
    name: "generate-static-assets",
    buildStart() {
      generateLLMsTxt();
      console.log("Generated llms.txt");
      generateSitemap(siteUrl);
      console.log("Generated sitemap.xml");
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const siteUrl = env.VITE_SITE_URL || "https://pocket-id.org";
  return {
    plugins: [tailwindcss(), generateStaticAssets(siteUrl), sveltekit()],
    server: {
      fs: {
        allow: ["..", "./docs"],
      },
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "icons",
                test: /@lucide\/svelte/,
              },
            ],
          },
        },
      },
    },
  };
});
