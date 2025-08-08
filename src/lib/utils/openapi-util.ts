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
