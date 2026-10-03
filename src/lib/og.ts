// The link preview image of a page, drawn at build time like the app's sign-in screen: the title on the left, the mountain photo on the right
// Satori lays out the elements and draws the text as paths, so sharp can turn the SVG into an image without the fonts installed
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import { ogSize } from '../sharedHead';

// The mark of the Logo component, in the page's text color
export const markPath =
	'M-250.368,-706.48C-166.912,-706.48 -83.456,-706.48 0,-706.48C149.377,-706.48 270.906,-584.953 270.906,-435.576C270.906,-376.876 252.438,-321.028 217.506,-274.062C183.258,-228.019 136.385,-194.563 81.955,-177.305C76.939,-175.715 71.924,-174.124 66.908,-172.534C54.955,-231.481 43.003,-290.429 31.05,-349.376C34.355,-350.974 37.661,-352.571 40.966,-354.169C73.345,-369.822 94.269,-403.156 94.269,-439.094C94.269,-491.073 51.982,-533.36 0,-533.36C-51.978,-533.36 -94.267,-491.073 -94.267,-439.094C-94.267,-403.156 -73.344,-369.822 -40.963,-354.169C-37.718,-352.6 -34.473,-351.032 -31.228,-349.463C-50.48,-230.815 -69.733,-112.167 -88.985,6.48C-142.779,6.48 -196.574,6.48 -250.368,6.48Z';
export const markViewBox = '-250.368 -706.48 521.274 712.96';

const colors = { page: '#0a0a0a', fg: '#fafafa', muted: '#a1a1a1', tile: '#1f1f1f' };

// Paths are relative to the project root, where the build runs
const file = (path: string) => readFile(new URL(path, `file://${process.cwd()}/`));

let assets:
	| Promise<{ fonts: Parameters<typeof satori>[1]['fonts']; photo: string; mark: string }>
	| undefined;
function loadAssets() {
	assets ??= (async () => {
		const [display, regular, semibold, photo] = await Promise.all([
			file('public/fonts/Gloock-Regular.woff'),
			file('src/assets/fonts/geist-sans-latin-400-normal.woff'),
			file('src/assets/fonts/geist-sans-latin-600-normal.woff'),
			// Satori can't read WebP, so the photo is cropped to the panel and embedded as a JPEG
			sharp(await file('src/assets/brand/mountain.webp'))
				.resize(396, 582)
				.jpeg({ quality: 80 })
				.toBuffer()
		]);
		const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${markViewBox}"><path fill="${colors.fg}" d="${markPath}"/></svg>`;
		return {
			fonts: [
				{ name: 'Gloock', data: display, weight: 400, style: 'normal' },
				{ name: 'Geist', data: regular, weight: 400, style: 'normal' },
				{ name: 'Geist', data: semibold, weight: 600, style: 'normal' }
			],
			photo: `data:image/jpeg;base64,${photo.toString('base64')}`,
			mark: `data:image/svg+xml;base64,${Buffer.from(mark).toString('base64')}`
		};
	})();
	return assets;
}

// Satori takes React-like elements, which plain objects describe without JSX
type Node = { type: string; props: Record<string, unknown> };
const el = (
	type: string,
	style: Record<string, unknown>,
	children?: (Node | string)[] | Node | string,
	props: Record<string, unknown> = {}
): Node => ({
	type,
	props: { style, children, ...props }
});

export async function renderOgImage({
	title,
	description,
	eyebrow
}: {
	title: string;
	description?: string;
	eyebrow?: string;
}) {
	const { fonts, photo, mark } = await loadAssets();
	// Long titles get a smaller face so they still fit in three lines
	const titleSize = title.length > 48 ? 56 : title.length > 26 ? 66 : 80;

	const text = el(
		'div',
		{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 56px 64px 72px' },
		[
			el('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
				el(
					'div',
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 56,
						height: 56,
						borderRadius: 16,
						backgroundColor: colors.tile
					},
					[el('img', { width: 24, height: 33 }, undefined, { src: mark, width: 24, height: 33 })]
				),
				el(
					'div',
					{ fontFamily: 'Geist', fontWeight: 600, fontSize: 28, color: colors.fg },
					'Pocket ID'
				)
			]),
			el('div', { display: 'flex', flexDirection: 'column', marginTop: 'auto' }, [
				...(eyebrow
					? [
							el(
								'div',
								{ fontFamily: 'Geist', fontSize: 24, color: colors.muted, marginBottom: 16 },
								eyebrow
							)
						]
					: []),
				el(
					'div',
					{
						fontFamily: 'Gloock',
						fontSize: titleSize,
						lineHeight: 1.08,
						letterSpacing: '-0.015em',
						color: colors.fg,
						lineClamp: 3
					},
					title
				),
				...(description
					? [
							el(
								'div',
								{
									fontFamily: 'Geist',
									fontSize: 26,
									lineHeight: 1.45,
									color: colors.muted,
									marginTop: 24,
									lineClamp: 3
								},
								description
							)
						]
					: [])
			])
		]
	);
	const image = el('div', { display: 'flex', width: 420, padding: 24, paddingLeft: 0 }, [
		el('img', { width: 396, height: 582, borderRadius: 32, objectFit: 'cover' }, undefined, {
			src: photo,
			width: 396,
			height: 582
		})
	]);

	const svg = await satori(
		el('div', { display: 'flex', width: '100%', height: '100%', backgroundColor: colors.page }, [
			text,
			image
		]) as never,
		{ ...ogSize, fonts }
	);
	// A JPEG keeps the photo a fraction of a PNG's size, and full color resolution keeps the text's edges sharp
	return sharp(Buffer.from(svg))
		.jpeg({ quality: 85, chromaSubsampling: '4:4:4', mozjpeg: true })
		.toBuffer();
}
