// Pill controls like the app's buttons: a filled primary in the text color and a muted secondary
const base =
	'inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full font-medium text-[0.9375rem] leading-none no-underline transition-all duration-200 [&_svg]:size-4 [&_svg]:shrink-0';

export const button = {
	primary: `${base} bg-fg text-page hover:opacity-85 active:scale-[0.98]`,
	secondary: `${base} bg-surface-muted text-fg hover:bg-gray-6 active:scale-[0.98]`
};
