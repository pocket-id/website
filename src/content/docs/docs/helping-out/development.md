---
title: Development
description: Set up the Pocket ID development environment, format the code, and run tests.
---

Follow the [shared contribution guidelines](https://github.com/pocket-id/.github/blob/main/CONTRIBUTING.md) before submitting a pull request.

## Formatting

Run `pnpm format` from the repository root before submitting a pull request.

## Development Environment

Pocket ID consists of a frontend and backend. In production the frontend gets statically served by the backend, but in development they run as separate processes to enable hot reloading.

There are two ways to get the development environment setup:

### 1. Install required tools

#### With Dev Containers

If you use [Dev Containers](https://code.visualstudio.com/docs/remote/containers) in VS Code, you don't need to install anything manually, just follow the steps below.

1. Make sure you have [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed
2. Clone and open the repo in VS Code
3. VS Code will detect .devcontainer and will prompt you to open the folder in devcontainer
4. If the auto prompt does not work, hit `F1` and select `Dev Containers: Open Folder in Container.`, then select the pocket-id repo root folder and it'll open in container.

#### Without Dev Containers

If you don't use Dev Containers, you need to install the following tools manually:

- [Node.js](https://nodejs.org/en/download/) >= 24
- [Go](https://golang.org/doc/install) >= 1.27
- [Git](https://git-scm.com/downloads)

### 2. Setup

#### Backend

The backend is built with [Gin](https://gin-gonic.com) and written in Go. To set it up, follow these steps:

1. Open the `backend` folder
2. Copy the `.env.development-example` file to `.env` and edit the variables as needed
3. Start the backend with `go run -tags exclude_frontend ./cmd`

#### Frontend

The frontend is built with [SvelteKit](https://kit.svelte.dev) and written in TypeScript. To set it up, follow these steps:

1. Open the `pocket-id` project folder
2. Copy the `frontend/.env.development-example` file to `frontend/.env` and edit the variables as needed
3. Install the dependencies with `pnpm install`
4. Start the frontend with `pnpm dev`

You're all set! The application is now listening on `localhost:3000`. The backend gets proxied trough the frontend in development mode.

## Testing

If you are contributing to a new feature please ensure that you add tests for it.

### End-to-end tests

We are using [Playwright](https://playwright.dev) for end-to-end testing.

The tests are located in the `tests` folder at the root of the project.

The tests can be run like this:

1. Install the dependencies from the root of the project `pnpm install`

2. Visit the setup folder by running `cd tests/setup`

3. Start the test environment by running `docker compose up -d --build`

4. Go back to the test folder by running `cd ..`
5. Run the tests with `pnpm dlx playwright test` or from the root project folder `pnpm test`

If you make any changes to the application, you have to rebuild the test environment by running `docker compose up -d --build` again.

### Unit tests

In the backend we are using unit tests with the built-in Go testing framework. The tests are located in the same folder as the code they are testing and have the `_test.go` suffix.

To run the tests, simply run `go test -tags=exclude_frontend,unit ./...` from the root of the `backend` folder.
