// @ts-check
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'mdsx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const mdsxConfig = defineConfig({
  extensions: ['.md'],
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
  blueprints: {
    default: {
      path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte'),
      rehypePlugins: [],
    },
  },
});
