// Class sets for the parts every diagram shares, themed through the dg colors in src/styles/global.css so one drawing works in both themes
// Each variant is a full set rather than a modifier, because two utilities for the same property would be settled by stylesheet order instead of class order

// Regions such as "your server", or a span of messages in a sequence
const zone = 'fill-dg-zone stroke-1';
const box = 'stroke-1';
const title = 'text-[13px] font-semibold';
const sub = 'text-[11.5px]';
const edge = 'fill-none';

// Edge labels get a halo in the card color so they stay readable where they cross a line
const edgeLabel = 'text-[11px] [paint-order:stroke] stroke-dg-card stroke-4 [stroke-linejoin:round]';

export const dg = {
	zone: `${zone} stroke-dg-edge`,
	zoneLabel: 'fill-dg-muted text-[12px] font-semibold',

	// Boxes for components, with the inverted key box reserved for the one element a drawing is about
	box: `${box} fill-dg-card stroke-dg-edge`,
	boxKey: 'fill-dg-key stroke-none',
	boxMuted: `${box} fill-transparent stroke-dg-line [stroke-dasharray:4_3]`,
	boxDanger: `${box} fill-dg-card stroke-dg-danger`,
	title: `${title} fill-dg-ink`,
	titleOnKey: `${title} fill-dg-on-key`,
	sub: `${sub} fill-dg-muted`,
	subOnKey: `${sub} fill-dg-on-key opacity-75`,
	mono: 'font-mono text-[10.5px] fill-dg-muted',

	// Edges and their arrowheads, in the key color for the path a drawing is about
	edge: `${edge} stroke-dg-line stroke-[1.5]`,
	edgeDashed: `${edge} stroke-dg-line stroke-[1.5] [stroke-dasharray:5_4]`,
	edgeKey: `${edge} stroke-dg-key-line stroke-2`,
	arrowhead: 'fill-dg-line',
	arrowheadKey: 'fill-dg-key-line',
	edgeLabel: `${edgeLabel} fill-dg-muted`,
	edgeLabelKey: `${edgeLabel} fill-dg-ink font-semibold`,

	// The dashed line below each party of a sequence diagram
	lifeline: `${edge} stroke-dg-line stroke-1 opacity-50 [stroke-dasharray:3_4]`
};

// The shared box, title and subtitle sets for a box that may be the key one or a muted one
export const dgBox = (tone?: 'key' | 'muted' | 'danger') =>
	tone === 'key' ? dg.boxKey : tone === 'muted' ? dg.boxMuted : tone === 'danger' ? dg.boxDanger : dg.box;
export const dgTitle = (key?: boolean) => (key ? dg.titleOnKey : dg.title);
export const dgSub = (key?: boolean) => (key ? dg.subOnKey : dg.sub);
