import { defineConfig } from 'vite-plus';

// Astro owns the dev server and build, Vite+ adds formatting, linting, type checks and the commit hook
export default defineConfig({
	staged: {
		'*': 'vp check --fix'
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		// Markdown is written by hand and by the changelog bot, and the API spec is generated
		ignorePatterns: ['src/content/**', 'src/generated/**', 'pnpm-lock.yaml']
	},
	lint: {
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
		options: { typeAware: true, typeCheck: true }
	}
});
