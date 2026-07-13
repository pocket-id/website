export const OPENAPI_HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
] as const;

export type OpenApiHttpMethod = (typeof OPENAPI_HTTP_METHODS)[number];

export interface OpenApiSchema {
  $ref?: string;
  type?: string | string[];
  format?: string;
  description?: string;
  items?: OpenApiSchema;
  properties?: Record<string, OpenApiSchema>;
  required?: string[];
  oneOf?: OpenApiSchema[];
}

export interface OpenApiMediaType {
  schema?: OpenApiSchema;
}

export interface OpenApiParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: OpenApiSchema;
}

export interface OpenApiRequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, OpenApiMediaType>;
}

export interface OpenApiResponse {
  description?: string;
  content?: Record<string, OpenApiMediaType>;
}

export interface OpenApiOperation {
  operationId?: string;
  tags?: string[];
  summary?: string;
  description?: string;
  parameters?: OpenApiParameter[];
  requestBody?: OpenApiRequestBody;
  responses?: Record<string, OpenApiResponse>;
}

export type OpenApiPathItem = Partial<
  Record<OpenApiHttpMethod, OpenApiOperation>
>;

export interface OpenApiSpec {
  openapi: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
  };
  paths?: Record<string, OpenApiPathItem>;
  components?: {
    schemas?: Record<string, OpenApiSchema>;
  };
  tags?: Array<{ name: string; description?: string }>;
}

export interface IndexedEndpoint {
  tag: string;
  path: string;
  method: OpenApiHttpMethod;
  operation: OpenApiOperation;
  searchable: string;
}

export interface OpenApiIndex {
  tags: { name: string; description?: string }[];
  endpointsByTag: Record<string, IndexedEndpoint[]>;
  allEndpoints: IndexedEndpoint[];
  tagOrder: string[];
}
