---
id: documentation-contributing
---

This guide explains how to add or edit documentation for this website (SvelteKit + MDSX).

## 1. Where docs live

All markdown pages are under the `docs/` directory (nested folders become URL segments):

```
docs/
  introduction.md              → /docs/introduction
  setup/installation.md        → /docs/setup/installation
  client-examples/grafana.md   → /docs/client-examples/grafana
  helping-out/documentation.md → /docs/helping-out/documentation
```

- The loader that discovers files: [`getDoc`](src/lib/docs.ts).
- Navigation + metadata comes from the array [`allDocs`](src/lib/config/content.ts).
- Sidebar Configuration comes from array [`SidebarNavItems`](src/lib/config/docs.ts).
- Navbar Configuration comes from array [`mainNavItems`](src/lib/config/docs.ts).

## 2. Adding a new page

1. Pick (or create) a folder inside `docs/` matching the section.
2. Add a markdown file: `docs/<section>/<slug>.md`
3. (Optional) Add minimal frontmatter:

```md
---
title: Human Title # optional – fallback comes from allDocs
description: Short summary # optional – fallback comes from allDocs
---
```

4. Update the [`allDocs`](src/lib/config/content.ts) and/or the Sidebar [`SidebarNavItems`](src/lib/config/docs.ts) or Navbar [`mainNavItems`](src/lib/config/docs.ts) arrays:

```ts
// ...existing code...
export const allDocs = [
  // ...existing entries...
  {
    title: 'My Feature', // Shown in heading / nav
    description: 'Short summary', // Used in lists / meta
    path: 'my-section/my-feature', // Matches folder + filename (no .md, *no* leading slash)
  },
];
// ...existing code...
```

Path rules:

- No leading slash
- No `.md`
- For `docs/my-section/my-feature.md` use `my-section/my-feature`
- For `docs/introduction.md` use `introduction`

5. Start dev server: `pnpm dev` – visit `/docs/<path>`.

If `title/description` are missing in the file frontmatter, the fallback comes from the metadata object you added to `allDocs`.

## 3. Frontmatter vs metadata

| Source                                 | Preferred         | Purpose               |
| -------------------------------------- | ----------------- | --------------------- |
| [`allDocs`](src/lib/config/content.ts) | Canonical         | Global nav / fallback |
| File frontmatter                       | Optional override | Per-page tweaks       |

Merge logic is in [`getDoc`](src/lib/docs.ts).

## 4. ABlockquotes (callouts)

Use markers at the start of a blockquote:

```
> [!NOTE] This is a note
> Body text continues.

> [!WARNING]
> First line after the marker becomes the body.
```

Supported types: NOTE, TIP, IMPORTANT, WARNING, CAUTION (case‑insensitive). They are rendered by [`blockquote.svelte`](src/lib/components/mdsx/blockquote.svelte).

## 5. Code blocks

Standard fenced blocks:

    ```bash
    docker compose up -d
    ```

## 6. Images

Place image assets in `static/img/...` and reference with an absolute path:

```md
<img src="/img/example/flow.png" width="600" alt="High level authentication flow" />
```

Always include `alt`.

## 7. Tables

Use GitHub-Flavored Markdown (remark-gfm is enabled). Example:

```md
| Variable | Description                               |
| -------- | ----------------------------------------- |
| APP_URL  | Public base URL of the Pocket ID instance |
```

## 8. Linking

Internal docs: `/docs/setup/installation`  
Environment variables or code: `` `VAR_NAME` ``  
External links will automatically get `rel="noopener noreferrer"` through MDSX sanitization.

## 10. Ordering

Order = the order in the `allDocs` array for lists / generated navigation. Place new entry where it makes logical sense.

## 11. Common mistakes

| Issue                              | Fix                                                       |
| ---------------------------------- | --------------------------------------------------------- |
| 404 page                           | Path mismatch between file and `allDocs.path`             |
| Missing title                      | Add `title` to `allDocs` or frontmatter                   |
| Bad URL casing                     | Use lowercase slugs (preferred)                           |
| Admonition text still shows marker | Ensure `[!TYPE]` is the first text in the blockquote line |

## 12. Regenerating LLM summary file

A build plugin generates `static/llms.txt` aggregating docs. Just run `pnpm build` (or `pnpm dev` to refresh during development). Commit changes if content updates.

## 13. Checklist for a new page

- [ ] Markdown file added under `docs/`
- [ ] Added entry to [`allDocs`](src/lib/config/content.ts)
- [ ] Added entry to Sidebar [`SidebarNavItems`](src/lib/config/docs.ts) or Navbar [`mainNavItems`](src/lib/config/docs.ts) if applicable
- [ ] Images in `static/img/...` with alt text
- [ ] Admonitions use `[!TYPE]` markers
- [ ] Build succeeds (`pnpm build`)

## 14. Submit your changes

Create a branch, commit, open a PR. The preview workflows will build and deploy a temporary docs preview.
