// Controls for the landing page in the app's style: a filled primary in the text color and a hairline secondary
const base =
	'inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border font-medium text-[0.9375rem] leading-none no-underline transition-colors duration-150 [&_svg]:size-4 [&_svg]:shrink-0';

export const button = {
	primary: `${base} border-fg bg-fg text-page hover:bg-gray-1 hover:border-gray-1`,
	secondary: `${base} border-surface-border bg-surface text-fg [box-shadow:var(--surface-shadow)] hover:bg-gray-7`
};
