export const mainNavItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/client-examples', label: 'Client Examples' },
  { href: '/docs/api', label: 'API Reference' },
];

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

export const SidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Getting Started',
    items: [{ title: 'Introduction', href: '/docs/introduction', items: [] }],
  },
  {
    title: 'Setup',
    items: [
      { title: 'Installation', href: '/docs/setup/installation', items: [] },
      { title: 'User Management', href: '/docs/setup/user-management', items: [] },
      { title: 'Migrate to v1.0', href: '/docs/setup/migrate-v1', items: [] },
      { title: 'Upgrading', href: '/docs/setup/upgrading', items: [] },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { title: 'Environment Variables', href: '/docs/configuration/environment-variables', items: [] },
      { title: 'LDAP Integration', href: '/docs/configuration/ldap', items: [] },
      { title: 'Allowed Groups', href: '/docs/configuration/allowed-groups', items: [] },
      { title: 'Analytics', href: '/docs/configuration/analytics', items: [] },
    ],
  },
  {
    title: 'Guides',
    items: [{ title: 'Proxy Services', href: '/docs/guides/proxy-services', items: [] }],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Custom Keys', href: '/docs/advanced/custom-keys', items: [] },
      { title: 'Container Security Hardening', href: '/docs/advanced/hardening', items: [] },
      { title: 'Nginx Reverse Proxy', href: '/docs/advanced/nginx-reverse-proxy', items: [] },
    ],
  },
  {
    title: 'Troubleshooting',
    items: [{ title: 'Common Issues', href: '/docs/troubleshooting/common-issues', items: [] }],
  },
  {
    title: 'Helping Out',
    items: [
      { title: 'Contributing', href: '/docs/helping-out/contributing', items: [] },
      { title: 'Documentation', href: '/docs/helping-out/documentation', items: [] },
      { title: 'Translating', href: '/docs/helping-out/translating', items: [] },
    ],
  },
  {
    title: 'Community',
    items: [
      { title: 'Demo', href: 'https://demo.pocket-id.org', external: true, items: [] },
      { title: 'Discord', href: 'https://discord.gg/Pwctrasts5', external: true, items: [] },
    ],
  },
];
