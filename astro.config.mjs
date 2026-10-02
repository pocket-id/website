// @ts-check
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import starlightLlmsTxt from 'starlight-llms-txt';
import { sharedHead } from './src/sharedHead.ts';

const site = 'https://pocket-id.org';

export default defineConfig({
	site,
	// Pages build to docs/setup/installation.html and link without the extension, so every address the old site used keeps working
	trailingSlash: 'never',
	build: { format: 'preserve' },
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [
		starlight({
			title: 'Pocket ID',
			plugins: [
				// AI assistants read the docs as plain Markdown from /llms.txt and the files it links to
				starlightLlmsTxt({
					promote: ['docs/introduction', 'docs/setup/**', 'docs/configuration/**'],
					demote: ['docs/client-examples/**', 'changelog'],
					optionalLinks: [{ label: 'OpenAPI spec', url: `${site}/swagger.json`, description: 'every route of the Pocket ID REST API with its parameters and schemas' }]
				})
			],
			description: 'Pocket ID is a simple OpenID Connect provider that lets users sign in to your services with passkeys.',
			favicon: '/favicon.svg',
			head: sharedHead(site),
			routeMiddleware: './src/routeData.ts',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg'
			},
			customCss: ['./src/styles/global.css'],
			components: {
				// Adds the notice for preview deployments of unreleased versions
				Banner: './src/components/overrides/Banner.astro',
				// Adds the current release next to the social links
				SocialIcons: './src/components/overrides/SocialIcons.astro'
			},
			expressiveCode: {
				// Names the pages use for languages Shiki knows under another name
				shiki: { langAlias: { env: 'dotenv', conf: 'nginx', cfg: 'ini', Yaml: 'yaml' } },
				styleOverrides: {
					borderRadius: '0.5rem',
					borderColor: 'var(--sl-color-hairline)',
					codeFontSize: '0.8125rem',
					codeLineHeight: '1.6',
					frames: {
						shadowColor: 'transparent',
						terminalTitlebarDotsForeground: 'transparent',
						terminalTitlebarDotsOpacity: '0',
						terminalTitlebarBorderBottomColor: 'var(--sl-color-hairline)',
						editorActiveTabIndicatorTopColor: 'var(--sl-color-white)',
						editorActiveTabIndicatorBottomColor: 'transparent'
					}
				}
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/pocket-id/pocket-id' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/8wudU9KaxM' }
			],
			editLink: { baseUrl: 'https://github.com/pocket-id/website/edit/main/' },
			lastUpdated: true,
			sidebar: [
				// The sidebar follows a reader's path: get it running, manage who gets in, connect apps, run it in production, look things up
				{
					label: 'Getting started',
					items: ['docs/introduction', 'docs/setup/installation', 'docs/setup/reverse-proxy', 'docs/setup/connect-an-app']
				},
				{
					label: 'Users and access',
					items: [
						'docs/setup/user-management',
						'docs/guides/sign-in-methods',
						'docs/configuration/allowed-groups',
						'docs/configuration/appdashboard',
						'docs/configuration/ldap',
						'docs/configuration/scim'
					]
				},
				{
					label: 'Apps and APIs',
					items: [
						'docs/guides/scopes-and-claims',
						'docs/advanced/callback-url-wildcards',
						'docs/guides/oidc-client-authentication',
						'docs/guides/client-id-metadata-documents',
						'docs/guides/apis',
						'docs/guides/proxy-services'
					]
				},
				{
					label: 'Self-hosting',
					items: [
						'docs/configuration/environment-variables',
						'docs/setup/upgrading',
						'docs/setup/major-releases/migrate-v2',
						'docs/setup/data-export-import',
						'docs/advanced/hardening',
						'docs/advanced/custom-keys',
						'docs/configuration/analytics'
					]
				},
				{
					label: 'Troubleshooting',
					items: ['docs/troubleshooting/common-issues', 'docs/troubleshooting/account-recovery']
				},
				{
					label: 'Client examples',
					collapsed: true,
					items: [{ autogenerate: { directory: 'docs/client-examples' } }]
				},
				{
					label: 'Reference',
					items: ['docs/api', { label: 'API endpoints', link: '/docs/api/endpoints' }, 'changelog']
				},
				{
					label: 'Helping out',
					items: ['docs/helping-out/contributing', 'docs/helping-out/documentation', 'docs/helping-out/translating', 'docs/helping-out/sponsors']
				},
				{
					label: 'Community',
					items: [
						{ label: 'Demo', link: 'https://demo.pocket-id.org', attrs: { target: '_blank' } },
						{ label: 'Discord', link: 'https://discord.gg/8wudU9KaxM', attrs: { target: '_blank' } }
					]
				}
			]
		})
	]
});
