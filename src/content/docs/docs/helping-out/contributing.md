---
title: Contributing
description: How to report bugs, propose features and set up a development environment for Pocket ID.
---

Contributions are welcome, from bug reports and ideas to translations and code.

## Report a bug or suggest a feature

Open an [issue on GitHub](https://github.com/pocket-id/pocket-id/issues/new/choose), or ask on [Discord](https://discord.gg/8wudU9KaxM) first if you're not sure it's a bug.
Before you start working on a feature, open an issue or comment on an existing one, so the implementation can be agreed on before you spend time on it.

## Contribute code

[CONTRIBUTING.md](https://github.com/pocket-id/pocket-id/blob/main/CONTRIBUTING.md) in the repository describes the development setup, the tests and the rules for pull requests, including how AI tools may be used.
In short:

- The backend is written in Go with [Gin](https://gin-gonic.com), the frontend in TypeScript with [SvelteKit](https://svelte.dev/docs/kit), and you need Node.js 24 or newer and Go 1.27 or newer, or the repository's dev container.
- Start the backend with `go run -tags exclude_frontend ./cmd` in `backend`, and the frontend with `pnpm dev`, which serves both on `localhost:3000`.
- New features need tests: Playwright end-to-end tests in `tests`, and Go unit tests next to the code.
- Name the pull request after [Conventional Commits](https://www.conventionalcommits.org), such as `fix: hide global audit log switch for non admin users`, and run `pnpm format` before opening it.

To improve these docs, see [Documentation](/docs/helping-out/documentation), and to translate Pocket ID, see [Translating](/docs/helping-out/translating).
