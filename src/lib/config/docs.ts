export const mainNavItems = [
  { href: '/docs', label: 'Docs' },
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
    items: [
      { title: 'Introduction', href: '/docs/introduction', items: [] },
      {
        title: 'Setup',
        items: [
          { title: 'Installation', href: '/docs/setup/installation', items: [] },
          { title: 'User Management', href: '/docs/setup/user-management', items: [] },
          { title: 'Migrate to v1.0', href: '/docs/setup/migrate-v1', items: [] },
          { title: 'Upgrading', href: '/docs/setup/upgrading', items: [] },
        ],
      },
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
    title: 'Client Examples',
    items: [
      { title: 'Actual Budget', href: '/docs/client-examples/actual', items: [] },
      { title: 'Audiobookshelf', href: '/docs/client-examples/audiobookshelf', items: [] },
      { title: 'Beszel', href: '/docs/client-examples/beszel', items: [] },
      { title: 'BookStack', href: '/docs/client-examples/bookstack', items: [] },
      { title: 'Cloudflare Zero Trust', href: '/docs/client-examples/cloudflare-zero-trust', items: [] },
      { title: 'Donetick', href: '/docs/client-examples/donetick', items: [] },
      { title: 'FileBrowser Quantum', href: '/docs/client-examples/filebrowser-quantum', items: [] },
      { title: 'Forgejo', href: '/docs/client-examples/forgejo', items: [] },
      { title: 'FreeScout', href: '/docs/client-examples/freescout', items: [] },
      { title: 'FreshRSS', href: '/docs/client-examples/freshrss', items: [] },
      { title: 'Gitea', href: '/docs/client-examples/gitea', items: [] },
      { title: 'GitLab', href: '/docs/client-examples/gitlab', items: [] },
      { title: 'Grafana', href: '/docs/client-examples/grafana', items: [] },
      { title: 'Grist', href: '/docs/client-examples/grist', items: [] },
      { title: 'Headscale', href: '/docs/client-examples/headscale', items: [] },
      { title: 'Healthchecks', href: '/docs/client-examples/healthchecks', items: [] },
      { title: 'Immich', href: '/docs/client-examples/immich', items: [] },
      { title: 'Jellyfin', href: '/docs/client-examples/jellyfin', items: [] },
      { title: 'KaraKeep', href: '/docs/client-examples/karakeep', items: [] },
      { title: 'Kasm Workspaces', href: '/docs/client-examples/kasm', items: [] },
      { title: 'Komodo', href: '/docs/client-examples/komodo', items: [] },
      { title: 'Linkding', href: '/docs/client-examples/linkding', items: [] },
      { title: 'Mealie', href: '/docs/client-examples/mealie', items: [] },
      { title: 'Memos', href: '/docs/client-examples/memos', items: [] },
      { title: 'Miniflux', href: '/docs/client-examples/miniflux', items: [] },
      { title: 'oCIS', href: '/docs/client-examples/oCIS', items: [] },
      { title: 'Portainer', href: '/docs/client-examples/portainer', items: [] },
      { title: 'Semaphore UI', href: '/docs/client-examples/semaphore-ui', items: [] },
      { title: 'Synology', href: '/docs/client-examples/synology', items: [] },
      { title: 'Talos', href: '/docs/client-examples/talos', items: [] },
      { title: 'Wekan', href: '/docs/client-examples/wekan', items: [] },
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
      { title: 'Translating', href: '/docs/helping-out/translating', items: [] },
    ],
  },
];
