// Turns the Swagger 2.0 spec that scripts/openapi.mjs generates into the groups, operations and field trees the API endpoints page renders
import generated from '../../generated/swagger.json';

type Schema = Record<string, any>;

const spec = generated as Schema;

export type Field = {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	notes: string[];
	values?: string[];
	children?: Field[];
};

export type Param = Field & { in: string };

export type Body = { contentType: string; fields?: Field[]; type?: string; description?: string };

export type Response = {
	status: string;
	description: string;
	contentType?: string;
	fields?: Field[];
	type?: string;
};

export type Operation = {
	id: string;
	method: string;
	path: string;
	summary: string;
	description?: string;
	params: Param[];
	body?: Body;
	responses: Response[];
};

export type Group = { id: string; name: string; description?: string; operations: Operation[] };

const schemas: Record<string, Schema> = spec.definitions ?? {};

// Groups follow a reader's path through the product, and a tag the backend adds later lands at the end instead of vanishing
const groupOrder: string[] = (spec.tags ?? []).map((t: Schema) => t.name);
const methodOrder = ['get', 'post', 'put', 'patch', 'delete'];

export const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// swag escapes quotes in descriptions it copies from Go comments, which would show up as backslashes
const clean = (text: string | undefined) => text?.replace(/\\"/g, '"').trim() || undefined;

// Follows a $ref to the definition it names, so callers always see the schema itself
function resolve(schema: Schema | undefined): Schema {
	if (!schema) return {};
	if (schema.$ref) return schemas[schema.$ref.split('/').pop()] ?? {};
	return schema;
}

const isObject = (schema: Schema) =>
	schema.type === 'object' || (!schema.type && schema.properties);
const hasFields = (schema: Schema) =>
	isObject(schema) && Object.keys(schema.properties ?? {}).length > 0;

// The plural of a type label, so an array of objects doesn't read as "array of object"
function plural(label: string): string {
	if (label.startsWith('array of ') || label.startsWith('map of '))
		return label.replace(/^(array|map)/, '$1s');
	if (label === 'any') return 'values';
	if (label === 'binary') return label;
	return `${label}s`;
}

// A short type label in the words a reader would use, such as "array of strings" or "date-time string"
export function typeLabel(input: Schema | undefined): string {
	const schema = resolve(input);
	const base: string | undefined = schema.type;
	let label: string;
	if (base === 'array') label = `array of ${plural(typeLabel(schema.items))}`;
	else if (
		base === 'object' &&
		!schema.properties &&
		schema.additionalProperties &&
		typeof schema.additionalProperties === 'object'
	) {
		label = `map of ${plural(typeLabel(schema.additionalProperties))}`;
	} else if (base === 'file' || (base === 'string' && schema.format === 'binary')) label = 'binary';
	else if (base === 'string' && schema.format === 'date-time') label = 'date-time string';
	else if (base) label = base;
	else if (schema.properties) label = 'object';
	else label = 'any';
	return schema['x-nullable'] ? `${label} or null` : label;
}

// Defaults and limits worth knowing before a call fails validation
function notes(schema: Schema): string[] {
	const out: string[] = [];
	const range = (min: number | undefined, max: number | undefined, unit = '') => {
		if (min !== undefined && max !== undefined) return `${min} to ${max}${unit}`;
		if (min !== undefined) return `at least ${min}${unit}`;
		if (max !== undefined) return `at most ${max}${unit}`;
	};
	const number = range(schema.minimum, schema.maximum);
	if (number) out.push(number);
	const length = range(schema.minLength, schema.maxLength, ' characters');
	if (length) out.push(length);
	const items = range(schema.minItems, schema.maxItems, ' items');
	if (items) out.push(items);
	if (schema.pattern) out.push(`matches \`${schema.pattern}\``);
	// swag writes string defaults with their quotes, such as "\"asc\"", so they are shown as written
	if (schema.default !== undefined) {
		const value =
			typeof schema.default === 'string'
				? schema.default.replace(/^"(.*)"$/, '$1')
				: schema.default;
		out.push(`defaults to \`${typeof value === 'string' ? value : JSON.stringify(value)}\``);
	}
	return out;
}

// The object whose fields a property carries, directly or as the items of an array, or nothing for scalars
function fieldsOf(schema: Schema): Schema | undefined {
	const resolved = resolve(schema);
	if (hasFields(resolved)) return resolved;
	if (resolved.type === 'array') {
		const item = resolve(resolved.items);
		if (hasFields(item)) return item;
	}
}

const enumOf = (schema: Schema) => (schema.enum ?? resolve(schema.items).enum)?.map(String);

// The fields of an object, with nested objects unfolded until a schema repeats inside itself
export function fields(input: Schema | undefined, request = false, seen: string[] = []): Field[] {
	const schema = resolve(input);
	const required = new Set<string>(schema.required ?? []);
	const out: Field[] = [];
	for (const [name, raw] of Object.entries<Schema>(schema.properties ?? {})) {
		const property = resolve(raw);
		if (request && property.readOnly) continue;
		const ref = raw.$ref ?? (property.items?.$ref as string | undefined);
		const nested = fieldsOf(raw);
		out.push({
			name,
			type: typeLabel(raw),
			required: request && required.has(name),
			description: clean(raw.description ?? property.description),
			notes: notes(property),
			values: enumOf(property),
			children:
				nested && !(ref && seen.includes(ref))
					? fields(nested, request, ref ? [...seen, ref] : seen)
					: undefined
		});
	}
	// A caller scans a request for what it must send, while an answer keeps the spec's order, since its fields are all there anyway
	return request ? out.sort((a, b) => Number(b.required) - Number(a.required)) : out;
}

function schemaBody(contentType: string, input: Schema | undefined, request: boolean): Body {
	const schema = resolve(input);
	if (hasFields(schema)) return { contentType, fields: fields(schema, request) };
	const nested = fieldsOf(schema);
	if (nested) return { contentType, type: typeLabel(schema), fields: fields(nested, request) };
	return { contentType, type: typeLabel(schema), description: clean(schema.description) };
}

// Swagger 2.0 describes a parameter's type on the parameter itself, except for the body, which carries a schema
function param(p: Schema): Param {
	return {
		in: p.in,
		name: p.name,
		type: typeLabel(p),
		required: Boolean(p.required),
		description: clean(p.description),
		notes: notes(p),
		values: enumOf(p)
	};
}

function operation(path: string, method: string, op: Schema, id: string): Operation {
	const params: Schema[] = op.parameters ?? [];
	const bodyParam = params.find((p) => p.in === 'body');
	const formParams = params.filter((p) => p.in === 'formData');

	// A JSON body is the schema of the body parameter, and an upload is the form fields of a multipart request
	let body: Body | undefined;
	if (bodyParam) body = schemaBody(op.consumes?.[0] ?? 'application/json', bodyParam.schema, true);
	else if (formParams.length)
		body = {
			contentType: op.consumes?.[0] ?? 'multipart/form-data',
			fields: formParams.map(param)
		};

	// Errors share one shape that the REST API page explains, so each operation lists only its successful answers
	const responses: Response[] = Object.entries<Schema>(op.responses ?? {})
		.filter(([status]) => status !== 'default' && Number(status) < 400)
		.map(([status, response]) => {
			const description = clean(response.description) ?? '';
			if (!response.schema) return { status, description };
			return {
				status,
				description,
				...schemaBody(op.produces?.[0] ?? 'application/json', response.schema, false)
			};
		});

	const summary = clean(op.summary) ?? `${method.toUpperCase()} ${path}`;
	const description = clean(op.description);
	return {
		id,
		method,
		path,
		summary,
		description: description && description !== summary ? description : undefined,
		params: params.filter((p) => p.in !== 'body' && p.in !== 'formData').map(param),
		body,
		responses
	};
}

// Every operation of the spec, grouped by its first tag in the order above, keeping the spec's path order and the method order within a group
export function groups(): Group[] {
	const byName = new Map<string, Operation[]>();
	const used = new Set<string>();
	for (const [path, item] of Object.entries<Schema>(spec.paths ?? {})) {
		for (const method of methodOrder) {
			const op = item[method];
			if (!op) continue;
			const name = op.tags?.[0] ?? 'Other';

			// Anchors come from the summary, which is unique for nearly every route, and a counter settles the rest
			let id = slug(op.summary ?? `${method} ${path}`);
			for (let n = 2; used.has(id); n++) id = `${slug(op.summary ?? `${method} ${path}`)}-${n}`;
			used.add(id);

			byName.set(name, [...(byName.get(name) ?? []), operation(path, method, op, id)]);
		}
	}
	const rank = (name: string) =>
		groupOrder.includes(name) ? groupOrder.indexOf(name) : groupOrder.length;
	const describe = (name: string) => spec.tags?.find((t: Schema) => t.name === name)?.description;
	return [...byName.entries()]
		.sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
		.map(([name, operations]) => ({
			id: slug(name),
			name,
			description: describe(name),
			operations
		}));
}
