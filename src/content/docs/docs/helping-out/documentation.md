---
title: Documentation
description: Contribute to the Pocket ID website and documentation
---

The website is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), and lives in the [pocket-id/website](https://github.com/pocket-id/website) repository.

## Run it locally

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321` and reloads when you save a page.

The API endpoints page is generated from the backend's code with [swag](https://github.com/swaggo/swag).
With a checkout of [pocket-id/pocket-id](https://github.com/pocket-id/pocket-id) next to the website repository and Go installed, `pnpm dev` generates it automatically.
Point `POCKET_ID_DIR` at a checkout somewhere else.
Without one, the rest of the site works and the endpoints page stays empty.

## Add or edit a page

Pages are Markdown files in `src/content/docs/docs/`, and the path of a file is its address: `src/content/docs/docs/setup/installation.md` is served at `/docs/setup/installation`.
Each page starts with a title and a description:

```md
---
title: My feature
description: One sentence about what the page helps with, shown in search results.
---
```

Add a new page to the `sidebar` in `astro.config.mjs`, except client examples, which the sidebar lists automatically.

Use `.mdx` instead of `.md` when a page needs components, such as [tabs](https://starlight.astro.build/components/tabs/) or [steps](https://starlight.astro.build/components/steps/).

## Callouts

```md
:::note
Something worth knowing.
:::

:::caution
Something that can go wrong.
:::
```

The types are `note`, `tip`, `caution` and `danger`.

## Images

Put images under `public/img/` and reference them with an absolute path and alt text:

```md
![The OIDC client form](/img/example/client-form.png)
```

## Submit your changes

Open a pull request with a title that follows [Conventional Commits](https://www.conventionalcommits.org), such as `docs: add Vikunja example`.
Each pull request gets a preview deployment.
