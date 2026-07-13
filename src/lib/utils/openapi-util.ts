import {
  OPENAPI_HTTP_METHODS,
  type IndexedEndpoint,
  type OpenApiHttpMethod,
  type OpenApiIndex,
  type OpenApiOperation,
  type OpenApiSchema,
  type OpenApiSpec,
} from "$lib/types/openapi.js";

const httpMethods = new Set<string>(OPENAPI_HTTP_METHODS);
const schemaReferencePrefix = "#/components/schemas/";

export function createOpenApiExample(
  spec: OpenApiSpec,
  schema: OpenApiSchema,
): unknown {
  return createOpenApiExampleValue(spec, schema, new Set());
}

function createOpenApiExampleValue(
  spec: OpenApiSpec,
  schema: OpenApiSchema,
  resolvedReferences: Set<string>,
): unknown {
  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (schema.const !== undefined) return schema.const;
  if (schema.enum?.length) return schema.enum[0];

  if (schema.$ref) {
    const schemaName = getSchemaNameFromReference(schema.$ref);
    if (!schemaName) return schema.$ref;
    if (resolvedReferences.has(schemaName)) return `<recursive ${schemaName}>`;

    const referencedSchema = spec.components?.schemas?.[schemaName];
    if (!referencedSchema) return `<unresolved ${schemaName}>`;

    const nextResolvedReferences = new Set(resolvedReferences);
    nextResolvedReferences.add(schemaName);
    return createOpenApiExampleValue(
      spec,
      referencedSchema,
      nextResolvedReferences,
    );
  }

  if (schema.oneOf?.length) {
    const exampleSchema =
      schema.oneOf.find((candidate) => {
        const candidateTypes = Array.isArray(candidate.type)
          ? candidate.type
          : candidate.type
            ? [candidate.type]
            : [];
        return !candidateTypes.includes("null");
      }) ?? schema.oneOf[0];
    return createOpenApiExampleValue(spec, exampleSchema, resolvedReferences);
  }

  const schemaTypes = Array.isArray(schema.type)
    ? schema.type
    : schema.type
      ? [schema.type]
      : [];
  const schemaType =
    schemaTypes.find((candidate) => candidate !== "null") ?? schemaTypes[0];

  if (schemaType === "object" || schema.properties) {
    return Object.fromEntries(
      Object.entries(schema.properties ?? {}).map(([name, propertySchema]) => [
        name,
        createOpenApiExampleValue(spec, propertySchema, resolvedReferences),
      ]),
    );
  }
  if (schemaType === "array") {
    return [
      schema.items
        ? createOpenApiExampleValue(spec, schema.items, resolvedReferences)
        : null,
    ];
  }
  if (schemaType === "boolean") return false;
  if (schemaType === "integer" || schemaType === "number") return 0;
  if (schemaType === "null") return null;
  if (schemaType === "string") return createStringExample(schema.format);

  return null;
}

function getSchemaNameFromReference(reference: string): string | null {
  if (!reference.startsWith(schemaReferencePrefix)) return null;
  return reference
    .slice(schemaReferencePrefix.length)
    .replaceAll("~1", "/")
    .replaceAll("~0", "~");
}

function createStringExample(format?: string): string {
  switch (format) {
    case "binary":
      return "<binary>";
    case "date-time":
      return "2026-01-01T00:00:00Z";
    case "email":
      return "user@example.com";
    case "uri":
      return "https://example.com";
    default:
      return "string";
  }
}

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
