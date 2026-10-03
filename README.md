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

`pnpm dev` and `pnpm build` generate the API reference from the backend's code with [swag](https://github.com/swaggo/swag), which needs Go and a checkout of [pocket-id/pocket-id](https://github.com/pocket-id/pocket-id).
The checkout is expected next to this repository, or wherever `POCKET_ID_DIR` points.
Without one, the rest of the site builds and the endpoints page stays empty.

See [the documentation guide](https://pocket-id.org/docs/helping-out/documentation) for how to write pages.
