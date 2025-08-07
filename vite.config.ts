import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function generateLlmsTxt() {
  return {
    name: 'generate-llms-txt',
    buildStart() {
      const docsDir = 'docs';
      let content = '# Pocket ID Documentation\n\n';

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
          } else if (file.endsWith('.md')) {
            const relativePath: string = path.relative('docs', filePath);
            const fileContent: string = fs.readFileSync(filePath, 'utf-8');

            content += `## ${relativePath}\n\n`;
            content += fileContent;
            content += '\n\n---\n\n';
          }
        }
      }

      if (fs.existsSync(docsDir)) {
        readMarkdownFiles(docsDir);

        // Write to static directory
        if (!fs.existsSync('static')) {
          fs.mkdirSync('static');
        }

        fs.writeFileSync('static/llms.txt', content);
        console.log('✅ Generated llms.txt with all documentation');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    generateLlmsTxt(), // Our simple generator
    sveltekit(),
  ],
  server: {
    fs: {
      allow: ['..', './docs'],
    },
  },
});
