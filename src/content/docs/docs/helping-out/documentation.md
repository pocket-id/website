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

The API endpoints page is generated from the backend's code with [swag](https://github.com/swaggo/swag), and a workflow keeps the generated spec in the repository up to date.
To see endpoint changes before that, run `pnpm openapi` with Go installed and a checkout of [pocket-id/pocket-id](https://github.com/pocket-id/pocket-id) next to the website repository, or point `POCKET_ID_DIR` at a checkout somewhere else.

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

### Screenshots of Pocket ID

Screenshots of Pocket ID itself come in a light and a dark version, and the `Screenshot` component shows the one matching the reader's theme:

```mdx
import Screenshot from '../../../../components/Screenshot.astro';

<Screenshot name="my-apps" alt="The My Apps page with a tile for every app" />
```

`pnpm screenshots` recreates all of them in `src/assets/screens/` from a fresh Pocket ID container with demo data, so they stay consistent when the UI changes.
It needs Docker and Playwright's Chromium, which `pnpm exec playwright install chromium` installs.

### Diagrams

Diagrams are inline SVG components in `src/components/diagrams/`, drawn with the shared classes in `classes.ts` so they follow the theme.
Request flows only need a list of parties and messages for the `Sequence` component, as `SignInFlow.astro` shows.

## Submit your changes

Open a pull request with a title that follows [Conventional Commits](https://www.conventionalcommits.org), such as `docs: add Vikunja example`.
Each pull request gets a preview deployment.
