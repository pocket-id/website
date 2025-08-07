export type DocMetadata = {
  title: string;
  description: string;
  path: string;
  published?: boolean;
};

export const introduction: DocMetadata[] = [
  {
    title: 'Introduction',
    description: 'Welcome to Pocket ID - A simple OIDC provider for passwordless authentication',
    path: 'introduction',
  },
];

export const gettingStarted: DocMetadata[] = [
  {
    title: 'Installation',
    description: 'Get Pocket ID running quickly with Docker or standalone installation',
    path: 'setup/installation',
  },
  {
    title: 'User Management',
    description: 'Learn how to manage users and set up passkeys in Pocket ID',
    path: 'setup/user-management',
  },
  {
    title: 'Migrate to v1.0',
    description: 'Migrate from previous versions to Pocket ID v1.0',
    path: 'setup/migrate-v1',
  },
  {
    title: 'Upgrading',
    description: 'Keep your Pocket ID installation up to date',
    path: 'setup/upgrading',
  },
];

export const advanced: DocMetadata[] = [
  {
    title: 'Custom Keys',
    description: 'Configure custom signing keys for enhanced security',
    path: 'advanced/custom-keys',
  },
  {
    title: 'Container Security Hardening',
    description: 'Secure your Pocket ID deployment with distroless containers and hardening',
    path: 'advanced/hardening',
  },
  {
    title: 'Nginx Reverse Proxy',
    description: 'Set up Nginx as a reverse proxy for Pocket ID',
    path: 'advanced/nginx-reverse-proxy',
  },
];

export const api: DocMetadata[] = [
  {
    title: 'API Reference',
    description: 'Complete reference for all Pocket ID API endpoints',
    path: 'api',
  },
];

export const configuration: DocMetadata[] = [
  {
    title: 'Environment Variables',
    description: 'Complete reference for all Pocket ID configuration options',
    path: 'configuration/environment-variables',
  },
  {
    title: 'LDAP Integration',
    description: 'Connect Pocket ID to your LDAP server for user synchronization',
    path: 'configuration/ldap',
  },
  {
    title: 'Allowed User Groups',
    description: 'Configure allowed user groups for authentication',
    path: 'configuration/allowed-groups',
  },
  {
    title: 'Analytics',
    description: 'Analytics notice for Pocket ID',
    path: 'configuration/analytics',
  },
];

export const guides: DocMetadata[] = [
  {
    title: 'Getting Started',
    description: 'Step-by-step guide to get started with Pocket ID',
    path: 'guides/getting-started',
  },
  {
    title: 'Best Practices',
    description: 'Security and deployment best practices for Pocket ID',
    path: 'guides/best-practices',
  },
];

export const troubleshooting: DocMetadata[] = [
  {
    title: 'Common Issues',
    description: 'Solutions to frequently encountered problems',
    path: 'troubleshooting/common-issues',
  },
  {
    title: 'Debugging',
    description: 'How to debug and diagnose issues with Pocket ID',
    path: 'troubleshooting/debugging',
  },
];

export const clientExamples: DocMetadata[] = [
  {
    title: 'Actual Budget',
    description: 'Integrate Pocket ID with Actual Budget',
    path: 'client-examples/actual',
  },
  {
    title: 'Audiobookshelf',
    description: 'Configure OIDC authentication for Audiobookshelf',
    path: 'client-examples/audiobookshelf',
  },
  {
    title: 'Beszel',
    description: 'Set up Pocket ID authentication for Beszel',
    path: 'client-examples/beszel',
  },
  {
    title: 'BookStack',
    description: 'Enable OIDC login for BookStack wiki',
    path: 'client-examples/bookstack',
  },
  {
    title: 'Cloudflare Zero Trust',
    description: 'Integrate with Cloudflare Zero Trust Access',
    path: 'client-examples/cloudflare-zero-trust',
  },
  {
    title: 'Donetick',
    description: 'Configure Donetick with Pocket ID authentication',
    path: 'client-examples/donetick',
  },
  {
    title: 'FileBrowser Quantum',
    description: 'Set up OIDC for FileBrowser Quantum',
    path: 'client-examples/filebrowser-quantum',
  },
  {
    title: 'Forgejo',
    description: 'Configure Forgejo Git service with Pocket ID',
    path: 'client-examples/forgejo',
  },
  {
    title: 'FreeScout',
    description: 'Enable OIDC authentication for FreeScout helpdesk',
    path: 'client-examples/freescout',
  },
  {
    title: 'FreshRSS',
    description: 'Set up Pocket ID authentication for FreshRSS',
    path: 'client-examples/freshrss',
  },
  {
    title: 'Gitea',
    description: 'Configure Gitea with Pocket ID OIDC',
    path: 'client-examples/gitea',
  },
  {
    title: 'GitLab',
    description: 'Integrate GitLab with Pocket ID authentication',
    path: 'client-examples/gitlab',
  },
  {
    title: 'Grafana',
    description: 'Configure Grafana OIDC with Pocket ID',
    path: 'client-examples/grafana',
  },
  {
    title: 'Grist',
    description: 'Set up Grist spreadsheet tool with Pocket ID',
    path: 'client-examples/grist',
  },
  {
    title: 'Headscale',
    description: 'Configure Headscale VPN with Pocket ID OIDC',
    path: 'client-examples/headscale',
  },
  {
    title: 'Healthchecks',
    description: 'Enable OIDC for Healthchecks monitoring',
    path: 'client-examples/healthchecks',
  },
  {
    title: 'Immich',
    description: 'Configure Immich photo management with Pocket ID',
    path: 'client-examples/immich',
  },
  {
    title: 'Jellyfin',
    description: 'Set up Jellyfin media server with OIDC authentication',
    path: 'client-examples/jellyfin',
  },
  {
    title: 'KaraKeep',
    description: 'Configure KaraKeep with Pocket ID authentication',
    path: 'client-examples/karakeep',
  },
  {
    title: 'Kasm Workspaces',
    description: 'Integrate Kasm with Pocket ID OIDC',
    path: 'client-examples/kasm',
  },
  {
    title: 'Komodo',
    description: 'Configure Komodo with Pocket ID authentication',
    path: 'client-examples/komodo',
  },
  {
    title: 'Linkding',
    description: 'Set up Linkding bookmark manager with OIDC',
    path: 'client-examples/linkding',
  },
  {
    title: 'Mealie',
    description: 'Configure Mealie recipe manager with Pocket ID',
    path: 'client-examples/mealie',
  },
  {
    title: 'Memos',
    description: 'Enable OIDC authentication for Memos',
    path: 'client-examples/memos',
  },
  {
    title: 'Miniflux',
    description: 'Configure Miniflux RSS reader with Pocket ID',
    path: 'client-examples/miniflux',
  },
];

export const helpingOut: DocMetadata[] = [
  {
    title: 'Contributing',
    description: 'Learn how to contribute to the Pocket ID project',
    path: 'helping-out/contributing',
  },
  {
    title: 'Translating',
    description: 'Help translate Pocket ID into your language',
    path: 'helping-out/translating',
  },
  {
    title: 'Documentation',
    description: 'Contribute to improving the documentation',
    path: 'helping-out/documentation',
  },
];

export const externalLinks: DocMetadata[] = [
  {
    title: 'Demo',
    description: 'Try Pocket ID with our live demo',
    path: 'https://demo.pocket-id.org',
  },
  {
    title: 'Discord',
    description: 'Join our Discord community for support',
    path: 'https://discord.gg/Pwctrasts5',
  },
];

export const allDocs = [
  ...introduction,
  ...gettingStarted,
  ...advanced,
  ...api,
  ...configuration,
  ...guides,
  ...troubleshooting,
  ...clientExamples,
  ...helpingOut,
];
