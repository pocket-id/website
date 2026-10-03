# <div align="center"><img  src="https://github.com/user-attachments/assets/4ceb2708-9f29-4694-b797-be833efce17d" width="100"/> </br>Pocket ID Website</div>

Pocket ID is the most user-friendly OpenID Connect Certified™ and OAuth 2.0 provider that lets users sign in to your applications with passkeys.

This repository holds [pocket-id.org](https://pocket-id.org): the landing page and the documentation. It's built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Contributing

1. Install the dependencies:
   ```bash
   pnpm install
   ```
2. Start the development server:
   ```bash
   pnpm dev
   ```

The site runs at `http://localhost:4321` and reloads when you save a file.

### Structure

| Path                     | Contents                                                                   |
| ------------------------ | -------------------------------------------------------------------------- |
| `src/content/docs/docs/` | The documentation pages, one Markdown file per page                        |
| `src/pages/index.astro`  | The landing page                                                           |
| `src/components/`        | Diagrams, screenshots, the API reference and the landing page's components |
| `astro.config.mjs`       | Site settings and the sidebar                                              |

### API reference

The API reference reads the Swagger spec in `src/generated`, which is generated from the backend's code with [swag](https://github.com/swaggo/swag) and committed, so the site builds without Go.
The `Update API spec` workflow regenerates it from the `main` branch of [pocket-id/pocket-id](https://github.com/pocket-id/pocket-id) every hour and commits it when it changed.
To regenerate it yourself, run `pnpm openapi` with Go installed and a checkout of pocket-id next to this repository, or wherever `POCKET_ID_DIR` points.

See [the documentation guide](https://pocket-id.org/docs/helping-out/documentation) for how to write pages.

## Deployment

The site is hosted on [Vercel](https://vercel.com), which builds it from the repository with `pnpm build`, and `vercel.json` holds the redirects and URL settings.

- Pushes to `main` deploy to production
- Pushes to `preview` deploy the docs of the unreleased version, at the domain assigned to the branch in Vercel
- Pull requests get a preview deployment, linked in a comment by Vercel

The optional `GITHUB_TOKEN` environment variable in Vercel raises the GitHub API rate limit for the stats on the landing page.
