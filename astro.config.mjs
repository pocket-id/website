// @ts-check
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';
import starlightLlmsTxt from 'starlight-llms-txt';
import { clientExamples } from './src/lib/client-example.ts';
import { sharedHead } from './src/sharedHead.ts';

const site = 'https://pocket-id.org';

export default defineConfig({
	site,
	trailingSlash: 'never',
	build: { format: 'preserve' },
	env: {
		schema: {
			// Optional, raises the GitHub API rate limit for the stats on the landing page
			GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true })
		}
	},
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [
		// Writes the "Create the client in Pocket ID" section of client examples from their frontmatter
		clientExamples(),
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
			description: 'Pocket ID is the most user-friendly OpenID Connect Certified™ and OAuth 2.0 provider that lets users sign in to your applications with passkeys.',
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
				// Puts the main sections next to the title and search on the right
				Header: './src/components/overrides/Header.astro',
				// Adds the current release next to the social links
				SocialIcons: './src/components/overrides/SocialIcons.astro',
				// Shows the title in the brand's display face and the description below it
				PageTitle: './src/components/overrides/PageTitle.astro',
				// A single button that switches between light and dark, like the app's
				ThemeSelect: './src/components/overrides/ThemeSelect.astro'
			},
			expressiveCode: {
				// Names the pages use for languages Shiki knows under another name
				shiki: { langAlias: { env: 'dotenv', conf: 'nginx', cfg: 'ini', Yaml: 'yaml' } },
				styleOverrides: {
					borderRadius: '0.75rem',
					borderColor: 'var(--sl-color-hairline)',
					codeBackground: 'var(--code-bg)',
					codeFontSize: '0.8125rem',
					codeLineHeight: '1.65',
					frames: {
						shadowColor: 'transparent',
						editorBackground: 'var(--code-bg)',
						terminalBackground: 'var(--code-bg)',
						editorTabBarBackground: 'var(--code-chrome)',
						editorActiveTabBackground: 'var(--code-bg)',
						editorTabBarBorderBottomColor: 'var(--sl-color-hairline)',
						terminalTitlebarBackground: 'var(--code-chrome)',
						terminalTitlebarDotsForeground: 'transparent',
						terminalTitlebarDotsOpacity: '0',
						terminalTitlebarBorderBottomColor: 'var(--sl-color-hairline)',
						editorActiveTabIndicatorTopColor: 'transparent',
						editorActiveTabIndicatorBottomColor: 'var(--sl-color-white)'
					}
				}
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pocket-id/pocket-id' }],
			editLink: { baseUrl: 'https://github.com/pocket-id/website/edit/main/' },
			lastUpdated: false,
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
				// The guides for each app are reached from the overview and the header, since listing nearly a hundred of them would bury the rest of the sidebar
				{ label: 'Client examples', link: '/docs/client-examples' },
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
