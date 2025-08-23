import { clientExamples } from '$docs/index.js';

export interface ClientExampleEntry {
  title: string;
  description: string;
  slug: string; // e.g. "client-examples/gitea"
  path: string; // same as slug (Velite path)
  href: string; // routed URL (/docs/client-examples/gitea)
  icon?: string; // convenience (sh-<last-segment>)
  section?: string;
}

export interface NavItem {
  title: string;
  href: string;
  items: NavItem[];
  external?: boolean;
  disabled?: boolean;
  label?: string;
}

function normalizeSlug(slug: string) {
  // Velite slug is "client-examples/xyz"
  return slug.replace(/^\/+/, '');
}

function toEntry(doc: (typeof clientExamples)[number]): ClientExampleEntry {
  const slugNorm = normalizeSlug(doc.slug);
  const last = slugNorm.split('/').pop() || slugNorm;
  return {
    title: doc.title,
    description: doc.description ?? `Configure ${doc.title} with Pocket ID`,
    slug: slugNorm,
    path: doc.path,
    href: `/docs/${slugNorm}`,
    icon: `sh-${last}`,
    section: doc.section,
  };
}

export const CLIENT_EXAMPLES: ClientExampleEntry[] = clientExamples
  .map(toEntry)
  .sort((a, b) => a.title.localeCompare(b.title));

export const CLIENT_EXAMPLES_INDEX: Record<string, ClientExampleEntry> = {};
for (const ex of CLIENT_EXAMPLES) {
  CLIENT_EXAMPLES_INDEX[ex.slug] = ex;
  const short = ex.slug.split('/').pop()!;
  CLIENT_EXAMPLES_INDEX[short] = ex;
}

export function buildClientExamplesNav(): NavItem {
  return {
    title: 'Client Examples',
    href: '/docs/client-examples',
    items: CLIENT_EXAMPLES.map((ex) => ({
      title: ex.title,
      href: ex.href,
      items: [],
    })),
  };
}

export interface GridItem {
  name: string;
  description: string;
  href: string;
  slug: string;
  icon?: string;
}

export const CLIENT_EXAMPLES_GRID: GridItem[] = CLIENT_EXAMPLES.map((ex) => ({
  name: ex.title,
  description: ex.description,
  href: ex.href,
  slug: ex.slug.split('/').pop()!,
  icon: ex.icon,
}));

export function filterClientExamples(query: string): ClientExampleEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return CLIENT_EXAMPLES;
  return CLIENT_EXAMPLES.filter(
    (ex) =>
      ex.title.toLowerCase().includes(q) ||
      ex.description.toLowerCase().includes(q) ||
      ex.slug.toLowerCase().includes(q)
  );
}
