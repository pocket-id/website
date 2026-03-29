import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "$lib/config/site.js";

export type SeoType = "website" | "article";

export interface SeoInput {
  title: string;
  description?: string;
  type?: SeoType;
  imagePath?: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  imageUrl: string;
  type: SeoType;
  siteName: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";

  const clean = path.startsWith("/") ? path : `/${path}`;
  if (/\.[a-z0-9]+$/i.test(clean)) return clean;
  return clean.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function buildSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  type = "website",
  imagePath = DEFAULT_OG_IMAGE,
}: SeoInput): SeoMetadata {
  return {
    title,
    description,
    imageUrl: absoluteUrl(imagePath),
    type,
    siteName: SITE_NAME,
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}

export function buildWebSiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  });
}
