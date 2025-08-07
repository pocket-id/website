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
    title: 'Proxy Services',
    description: 'Reverse Proxy Setup Guide for Pocket ID',
    path: 'guides/proxy-services',
  },
];

export const troubleshooting: DocMetadata[] = [
  {
    title: 'Common Issues',
    description: 'Solutions to frequently encountered problems',
    path: 'troubleshooting/common-issues',
  },
];

export const clientExamples: DocMetadata[] = [
  {
    title: 'Client Examples',
    description:
      'Step-by-step guides for integrating Pocket ID with various applications and services using OIDC authentication',
    path: 'client-examples',
  },
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
  {
    title: 'NetBox',
    description: 'Configure NetBox IPAM with Pocket ID OIDC',
    path: 'client-examples/netbox',
  },
  {
    title: 'oCIS',
    description: 'Set up ownCloud Infinite Scale with Pocket ID',
    path: 'client-examples/oCIS',
  },
  {
    title: 'Open WebUI',
    description: 'Configure Open WebUI with Pocket ID authentication',
    path: 'client-examples/open-webui',
  },
  {
    title: 'Outline',
    description: 'Set up Outline wiki with Pocket ID OIDC',
    path: 'client-examples/outline',
  },
  {
    title: 'Pangolin',
    description: 'Configure Pangolin with Pocket ID authentication',
    path: 'client-examples/pangolin',
  },
  {
    title: 'Paperless-ngx',
    description: 'Set up Paperless-ngx with Pocket ID OIDC',
    path: 'client-examples/paperless-ngx',
  },
  {
    title: 'pgAdmin',
    description: 'Configure pgAdmin with Pocket ID authentication',
    path: 'client-examples/pgadmin',
  },
  {
    title: 'Pingvin Share',
    description: 'Set up Pingvin Share with Pocket ID OIDC',
    path: 'client-examples/pingvin',
  },
  {
    title: 'Planka',
    description: 'Configure Planka project management with Pocket ID',
    path: 'client-examples/planka',
  },
  {
    title: 'Portainer',
    description: 'Set up Portainer container management with OIDC',
    path: 'client-examples/portainer',
  },
  {
    title: 'Proxmox',
    description: 'Configure Proxmox VE with Pocket ID OIDC',
    path: 'client-examples/proxmox',
  },
  {
    title: 'Proxmox Backup Server',
    description: 'Set up Proxmox Backup Server with Pocket ID',
    path: 'client-examples/proxmox-backup',
  },
  {
    title: 'Rallly',
    description: 'Configure Rallly scheduling with Pocket ID',
    path: 'client-examples/rallly',
  },
  {
    title: 'RDP Gateway',
    description: 'Set up RDP Gateway with Pocket ID authentication',
    path: 'client-examples/rdpgw',
  },
  {
    title: 'Semaphore UI',
    description: 'Configure Semaphore UI with Pocket ID OIDC',
    path: 'client-examples/semaphore-ui',
  },
  {
    title: 'SonarQube',
    description: 'Set up SonarQube code analysis with Pocket ID',
    path: 'client-examples/sonarqube',
  },
  {
    title: 'Synology',
    description: 'Configure Synology NAS with Pocket ID OIDC',
    path: 'client-examples/synology',
  },
  {
    title: 'Talos',
    description: 'Set up Talos Linux with Pocket ID authentication',
    path: 'client-examples/talos',
  },
  {
    title: 'Vikunja',
    description: 'Configure Vikunja task management with Pocket ID',
    path: 'client-examples/vikunja',
  },
  {
    title: 'Wekan',
    description: 'Set up Wekan kanban board with Pocket ID OIDC',
    path: 'client-examples/wekan',
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
  // {
  //   title: 'Documentation',
  //   description: 'Contribute to improving the documentation',
  //   path: 'helping-out/documentation',
  // },
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
