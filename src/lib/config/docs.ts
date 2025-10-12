import { introduction, setup, configuration, guides, advanced, troubleshooting, helpingOut, api } from '$docs/index.js';

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
};

export type SidebarNavItem = NavItem & {
  items: SidebarNavItem[];
};

export interface MainNavItem extends Omit<NavItem, 'href' | 'label'> {
  href: string;
  label: string;
}

function toHref(path: string) {
  return `/docs/${path}`;
}

function sortDocs<T extends { title: string; order?: number }>(arr: T[]) {
  return [...arr].sort((a, b) => {
    const ao = a.order ?? 1e9;
    const bo = b.order ?? 1e9;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
}

function mapLeafDocs(docs: Array<{ title: string; path: string; order?: number }>): SidebarNavItem[] {
  return sortDocs(docs).map((d) => ({
    title: d.title,
    href: toHref(d.path),
    items: [],
  }));
}

const SECTION_BUILDERS: Array<{
  key: string;
  title: string;
  source: any[];
}> = [
  { key: 'introduction', title: 'Getting Started', source: introduction },
  { key: 'setup', title: 'Setup', source: setup },
  { key: 'configuration', title: 'Configuration', source: configuration },
  { key: 'guides', title: 'Guides', source: guides },
  { key: 'advanced', title: 'Advanced', source: advanced },
  { key: 'troubleshooting', title: 'Troubleshooting', source: troubleshooting },
  { key: 'helpingOut', title: 'Helping Out', source: helpingOut },
];

export const SidebarNavItems: SidebarNavItem[] = SECTION_BUILDERS.map(({ title, source }) => ({
  title,
  items: mapLeafDocs(source),
}));

const COMMUNITY_GROUP: SidebarNavItem = {
  title: 'Community',
  items: [
    {
      title: 'Demo',
      href: 'https://demo.pocket-id.org',
      external: true,
      items: [],
    },
    {
      title: 'Discord',
      href: 'https://discord.gg/8wudU9KaxM',
      external: true,
      items: [],
    },
  ],
};

SidebarNavItems.push(COMMUNITY_GROUP);

const flat: SidebarNavItem[] = [...SECTION_BUILDERS.flatMap((s) => mapLeafDocs(s.source)), ...mapLeafDocs(api)];

export function findNeighbors(pathName: string): {
  previous: SidebarNavItem | null;
  next: SidebarNavItem | null;
} {
  const clean = pathName.split('?')[0].split('#')[0];
  const idx = flat.findIndex((i) => i.href === clean);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: flat[idx - 1] ?? null,
    next: flat[idx + 1] ?? null,
  };
}

export const mainNavItems: MainNavItem[] = [
  { href: '/docs', label: 'Docs', title: 'Docs' },
  { href: '/docs/client-examples', label: 'Client Examples', title: 'Client Examples' },
  { href: '/docs/api', label: 'API Reference', title: 'API Reference' },
  { href: '/changelog', label: 'Changelog', title: 'Changelog' },
];
