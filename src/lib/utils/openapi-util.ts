import {
  OPENAPI_HTTP_METHODS,
  type IndexedEndpoint,
  type OpenApiHttpMethod,
  type OpenApiIndex,
  type OpenApiOperation,
  type OpenApiSpec,
} from "$lib/types/openapi.js";

const httpMethods = new Set<string>(OPENAPI_HTTP_METHODS);

export function indexOpenApi(spec: OpenApiSpec): OpenApiIndex {
  const tags: { name: string; description?: string }[] = spec.tags ?? [];
  const endpointsByTag: Record<string, IndexedEndpoint[]> = {};
  const allEndpoints: IndexedEndpoint[] = [];

  if (spec.paths) {
    for (const [path, pathItem] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        if (!httpMethods.has(method) || !operation) continue;
        const typedMethod = method as OpenApiHttpMethod;
        const typedOperation = operation as OpenApiOperation;
        const opTags = typedOperation.tags?.length
          ? typedOperation.tags
          : ["_Untagged"];
        for (const tag of opTags) {
          const entry: IndexedEndpoint = {
            tag,
            path,
            method: typedMethod,
            operation: typedOperation,
            searchable: [
              tag,
              path,
              typedMethod,
              typedOperation.operationId ?? "",
              typedOperation.summary ?? "",
              typedOperation.description ?? "",
              (typedOperation.parameters ?? [])
                .map((parameter) => parameter.name)
                .join(" "),
            ]
              .join(" ")
              .toLowerCase(),
          };
          (endpointsByTag[tag] ||= []).push(entry);
          allEndpoints.push(entry);
        }
      }
    }
  }

  const declared = tags.map((t) => t.name);
  const dynamic = Object.keys(endpointsByTag).filter(
    (t) => !declared.includes(t),
  );
  const tagOrder = [...declared, ...dynamic];
  if (endpointsByTag["_Untagged"] && !tagOrder.includes("_Untagged")) {
    tagOrder.push("_Untagged");
  }

  for (const list of Object.values(endpointsByTag)) {
    list.sort((a, b) =>
      a.path === b.path
        ? a.method.localeCompare(b.method)
        : a.path.localeCompare(b.path),
    );
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
  selectedTags: Set<string>,
): OpenApiIndex["endpointsByTag"] {
  if (!query && selectedTags.size === 0) return index.endpointsByTag;

  const q = query.toLowerCase().trim();
  const predicate = (e: IndexedEndpoint) =>
    (q ? e.searchable.includes(q) : true) &&
    (selectedTags.size ? selectedTags.has(e.tag) : true);

  const filtered: Record<string, IndexedEndpoint[]> = {};
  for (const [tag, list] of Object.entries(index.endpointsByTag)) {
    const pruned = list.filter(predicate);
    if (pruned.length) filtered[tag] = pruned;
  }
  return filtered;
}
