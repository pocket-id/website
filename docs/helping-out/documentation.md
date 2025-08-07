---
title: Documentation
description: Contribute to improving the Pocket ID website or documentation
---

This guide explains how to add or edit documentation (SvelteKit + Velite + MDSX).

## 1. Where docs live

All markdown pages are under `docs/`. Velite (see [`velite.config.js`](https://github.com/pocket-id/website/blob/main/velite.config.js)) defines collections:

- `introduction.md`
- `setup/**/*.md`
- `configuration/**/*.md`
- `guides/**/*.md`
- `advanced/**/*.md`
- `helping-out/**/*.md`
- `troubleshooting/**/*.md`
- `api.md`
- `client-examples.md` (overview)
- `client-examples/**/*.md`

Each file is parsed and exported via `$docs/index.js`. The dynamic loader: [`getDoc`](https://github.com/pocket-id/website/blob/main/src/lib/docs.ts).

URL = `/docs/` + file path without `.md` (e.g. `setup/installation.md` → `/docs/setup/installation`).

## 2. Adding a new page

1. Pick the correct folder that matches a collection pattern (e.g. `guides/`).
2. Create `docs/<section>/<slug>.md`.
3. Add frontmatter:

```md
---
title: My Feature
description: Short summary
order: 30 # (optional) sort within its section (lower first)
published: true # (optional, default true)
---
```

4. Run `pnpm dev` – Velite auto-detects the file. No manual array updates needed.

## 3. Frontmatter & generated metadata

Velite schema (see config):

| Field       | Source      | Notes                       |
| ----------- | ----------- | --------------------------- |
| title       | frontmatter | required                    |
| description | frontmatter | required                    |
| path        | derived     | relative path without `.md` |
| slug        | derived     | joins segments (`path`)     |
| section     | derived     | first segment               |
| segments    | derived     | path split on `/`           |
| order       | frontmatter | optional numeric sort hint  |
| published   | frontmatter | default `true`              |
| toc         | generated   | auto table of contents      |

`toc` is injected automatically (used for page outline).

## 4. Navigation

Sidebar & neighbor links are generated from the Velite collections (see [`docs.ts`](https://github.com/pocket-id/website/blob/main/src/lib/config/docs.ts)). Ordering inside a section:

1. `order` (ascending) if present
2. `title` alphabetical

Client examples are excluded from the sidebar but have their own overview page and grid.

External static links (Demo / Discord) are appended as a Resources group (see same config file).

## 5. Hiding a page (draft)

Set `published: false`. The file remains buildable but can be filtered from listings (logic may hide unpublished).

## 6. Callouts (Admonitions)

```
> [!NOTE] One-line note

> [!WARNING]
> Multi‑line body starts here.
```

Supported: NOTE, TIP, IMPORTANT, WARNING, CAUTION.

## 7. Code blocks

<pre><code>```bash
docker compose up -d
```</code></pre>

## 8. Images

Place under `static/img/...`:

```md
<img src="/img/example/flow.png" alt="High level authentication flow" width="600" />
```

Always provide `alt`.

## 9. Tables

GitHub‑Flavored Markdown is enabled; just write pipe tables.

## 10. Search / TOC

TOC is auto; search features (where implemented) index headings & content—no manual config.

## 11. Common issues

| Issue               | Fix                                                         |
| ------------------- | ----------------------------------------------------------- |
| 404                 | File path mismatch; confirm filename and collection pattern |
| Missing title       | Add `title` frontmatter                                     |
| Wrong sidebar order | Add / adjust `order`                                        |
| TOC empty           | Add at least one level-2 `## Heading`                       |
| Hidden page         | Remove or set `published: true`                             |

## 12. Checklist for a new page

- [ ] File created in correct folder
- [ ] Frontmatter with title & description
- [ ] Optional `order` set (if ordering matters)
- [ ] Page builds (`pnpm dev`)
- [ ] Headings structured (`##`, `###`) for TOC
- [ ] Images (if any) in `static/img/...` with alt text

## 13. Submitting changes

1. Branch & make your changes.
2. Commit using Conventional Commits (`doc: update guides`).
3. Open PR.

The preview workflow will build docs automatically.

Happy documenting!
