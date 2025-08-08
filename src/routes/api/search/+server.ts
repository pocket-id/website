import { json } from '@sveltejs/kit';
import {
  introduction,
  setup,
  configuration,
  guides,
  advanced,
  troubleshooting,
  helpingOut,
  api,
  clientExamples,
  clientExamplesOverview,
} from '$docs/index.js';

export const prerender = true;

type Doc = (typeof introduction)[number];

const rawDocs = import.meta.glob('/docs/**/*.md', { as: 'raw', eager: true }) as Record<string, string>;

function stripFrontmatter(md: string) {
  return md.replace(/^---[\s\S]*?---\s*/m, '');
}
function stripCodeBlocks(md: string) {
  return md.replace(/```[\s\S]*?```/g, '');
}
function mdToText(md: string) {
  return md
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`+/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function headingsFromToc(toc: any): string[] {
  const out: string[] = [];
  function walk(items?: any[]) {
    if (!items) return;
    for (const it of items) {
      if (it.title) out.push(it.title);
      walk(it.items);
    }
  }
  walk((toc as any)?.items);
  return out;
}

const allDocs: Doc[] = [
  ...introduction,
  ...setup,
  ...configuration,
  ...guides,
  ...advanced,
  ...troubleshooting,
  ...helpingOut,
  ...api,
  ...clientExamplesOverview,
  ...clientExamples,
];

export function GET() {
  const docs = allDocs
    .filter((d) => (d as any).published !== false)
    .map((d) => {
      const filePath = `/docs/${d.path}.md`;
      const raw = rawDocs[filePath] || '';
      const text = mdToText(stripCodeBlocks(stripFrontmatter(raw)));
      const headings = headingsFromToc((d as any).toc);

      return {
        id: d.slug ?? d.path,
        title: d.title,
        description: d.description,
        section: (d as any).section,
        href: `/docs/${d.slug ?? d.path}`,
        headings,
        content: text.slice(0, 10_000),
      };
    });

  return json({ docs });
}
