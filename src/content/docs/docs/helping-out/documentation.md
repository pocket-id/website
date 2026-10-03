---
title: Documentation
description: Run the Pocket ID website locally, write or edit a docs page, and add a setup guide for an app.
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

## Add a client example

A client example is a file in `src/content/docs/docs/client-examples/`, named like the app's icon in [selfh.st icons](https://selfh.st/icons), such as `immich.md`.
It appears on the overview with that icon automatically.

Describe the OIDC client in the frontmatter, and the `::create-client` line turns it into the steps for Pocket ID, so you only write how to configure the app:

```md
---
title: Immich
description: Sign in to the Immich photo library with Pocket ID.
client:
  callbackUrls:
    - https://immich.example.com/auth/login
---

::create-client

## Configure Immich

1. In Immich, open **Administration → Settings → Authentication Settings → OAuth**.
```

| Field | What it does |
| --- | --- |
| `callbackUrls` | The app's callback URLs, required |
| `logoutCallbackUrls` | Where the app sends users after signing out |
| `public` | `true` for apps that can't keep a client secret, such as single-page and mobile apps |
| `pkce` | `true` to turn on PKCE for a confidential client |
| `customClientId` | A fixed client ID the app expects |
| `launchUrl` | The address the app opens from **My Apps** |
| `allowedGroups` | The groups the guide created for the app, which then may sign in instead of groups the reader chooses |
| `values` | What the app asks for, from `clientId`, `clientSecret`, `discoveryUrl`, `issuerUrl`, `authorizationUrl`, `tokenUrl`, `userinfoUrl`, `logoutUrl` and `certificateUrl`, the client ID, secret and discovery URL if left out |

Use `https://id.example.com` for Pocket ID and `https://<app>.example.com` for the app, and the app's exact field names in bold.

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
