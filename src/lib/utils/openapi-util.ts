const refKey = (ref: string) => ref.split('/').pop() ?? ref;

/** Shortens the generics swag emits: `..._dto.Paginated-dto_UserDto` -> `Paginated[UserDto]`. */
export function definitionLabel(key: string): string {
  const generic = key.match(/\.(\w+)-\w+_(\w+)$/);
  return generic ? `${generic[1]}[${generic[2]}]` : key;
}

/** Human readable type, e.g. `array<dto.UserDto>`, `map<string, string>` or `approve | deny`. */
function schemaLabel(schema: any): string {
  if (schema.$ref) return definitionLabel(refKey(schema.$ref));
  if (schema.enum) return schema.enum.join(' | ');
  if (schema.items) return `array<${schemaLabel(schema.items)}>`;
  const values = schema.additionalProperties;
  return typeof values === 'object' ? `map<string, ${schemaLabel(values)}>` : (schema.type ?? 'object');
}

/** Follows a `$ref` and unwraps arrays down to the schema being described. */
function unwrap(spec: any, schema: any): any {
  if (schema?.items) return unwrap(spec, schema.items);
  return schema?.$ref ? unwrap(spec, spec.definitions?.[refKey(schema.$ref)]) : (schema ?? {});
}

/**
 * Resolves a schema to its display type plus the properties of the definition behind it.
 * Arrays are unwrapped, so `array<dto.UserDto>` lists a user's fields.
 */
export function resolveSchema(spec: any, schema: any) {
  const base = unwrap(spec, schema);
  const required: string[] = base.required ?? [];

  return {
    label: schemaLabel(schema),
    properties: Object.entries<any>(base.properties ?? {}).map(([name, property]) => ({
      name,
      schema: property,
      label: schemaLabel(property),
      expandable: !!unwrap(spec, property).properties,
      required: required.includes(name),
    })),
  };
}

export interface IndexedEndpoint {
  tag: string;
  path: string;
  method: string;
  operation: any;
  searchable: string;
}

export interface OpenApiIndex {
  tags: { name: string; description?: string }[];
  endpointsByTag: Record<string, IndexedEndpoint[]>;
  allEndpoints: IndexedEndpoint[];
  tagOrder: string[];
}

export function indexOpenApi(spec: any): OpenApiIndex {
  const tags: { name: string; description?: string }[] = spec.tags ?? [];
  const tagMetaMap = new Map(tags.map((t) => [t.name, t]));
  const endpointsByTag: Record<string, IndexedEndpoint[]> = {};
  const allEndpoints: IndexedEndpoint[] = [];

  if (spec.paths) {
    for (const [path, methods] of Object.entries<any>(spec.paths)) {
      for (const [method, operation] of Object.entries<any>(methods)) {
        if (!operation || typeof operation !== 'object') continue;
        const opTags: string[] = operation.tags && operation.tags.length ? operation.tags : ['_Untagged'];
        for (const tag of opTags) {
          const entry: IndexedEndpoint = {
            tag,
            path,
            method,
            operation,
            searchable: [
              tag,
              path,
              method,
              operation.summary || '',
              operation.description || '',
              (operation.parameters || []).map((p: any) => p.name).join(' '),
            ]
              .join(' ')
              .toLowerCase(),
          };
          (endpointsByTag[tag] ||= []).push(entry);
          allEndpoints.push(entry);
        }
      }
    }
  }

  // Preserve declared tag order first, then untagged, then any others
  const declared = tags.map((t) => t.name);
  const dynamic = Object.keys(endpointsByTag).filter((t) => !declared.includes(t));
  const tagOrder = [...declared, ...dynamic];
  if (endpointsByTag['_Untagged'] && !tagOrder.includes('_Untagged')) {
    tagOrder.push('_Untagged');
  }

  // Sort endpoints inside each tag (path then method)
  for (const list of Object.values(endpointsByTag)) {
    list.sort((a, b) => (a.path === b.path ? a.method.localeCompare(b.method) : a.path.localeCompare(b.path)));
  }

  return {
    tags,
    endpointsByTag,
    allEndpoints,
    tagOrder,
  };
}

export function filterIndexed(
  index: OpenApiIndex,
  query: string,
  selectedTags: Set<string>
): OpenApiIndex['endpointsByTag'] {
  if (!query && selectedTags.size === 0) return index.endpointsByTag;

  const q = query.toLowerCase().trim();
  const predicate = (e: IndexedEndpoint) =>
    (q ? e.searchable.includes(q) : true) && (selectedTags.size ? selectedTags.has(e.tag) : true);

  const filtered: Record<string, IndexedEndpoint[]> = {};
  for (const [tag, list] of Object.entries(index.endpointsByTag)) {
    const pruned = list.filter(predicate);
    if (pruned.length) filtered[tag] = pruned;
  }
  return filtered;
}
