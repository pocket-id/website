---
id: installation
sidebar_position: 1
---

# Installation

## Before you start

Pocket ID requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), meaning it must be served over HTTPS. This is necessary because Pocket ID uses the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

You can use a reverse proxy like [Caddy](https://caddyserver.com/) or [NGINX](https://www.nginx.com/) to serve Pocket ID over HTTPS. Alternatively, you can use a service like [Cloudflare](https://www.cloudflare.com/) to provide HTTPS for your domain.

## Installation Methods

### Installation with Docker (recommended)

1. Download the [`docker-compose.yml`](https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml) and [`.env`](https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example) file:

   ```bash
    curl -O https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml

    curl -o .env https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example
   ```

2. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
3. Run `docker compose up -d`

You can now sign in with the admin account on `https://<your-app-url>/setup`.

### Stand-alone Installation

1. Download the latest binary from the [releases page](https://github.com/pocket-id/pocket-id/releases/latest).

   Make sure to download the correct version for your operating system. The binary names follow this pattern:

   - `pocket-id-<operating-system>-<architecture>`
   - Example: `pocket-id-linux-amd64`

   You can use curl to download the binary directly. For example, for Linux on AMD64 architecture:

   ```bash
   curl -L -o pocket-id-linux-amd64 https://github.com/pocket-id/pocket-id/releases/latest/download/pocket-id-linux-amd64
   ```

2. Rename the binary and make it executable:

   ```bash
   mv pocket-id-<operating-system>-<architecture> pocket-id
   chmod +x pocket-id
   ```

3. Download the `.env` file:

   ```bash
   curl -o .env https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example
   ```

4. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
5. Run the binary:

   ```bash
   ./pocket-id
   ```

You can now sign in with the admin account on `https://<your-app-url>/setup`.

## Community Installation Methods

:::important
These installation methods are not officially supported, and services may not work as expected.
:::

### Proxmox

Run the [helper script](https://community-scripts.github.io/ProxmoxVE/scripts?id=pocketid) as root in your Proxmox shell.

**Configuration Paths**

- /opt/pocket-id/backend/.env
- /opt/pocket-id/frontend/.env

```bash
bash -c "$(wget -qLO - https://github.com/community-scripts/ProxmoxVE/raw/main/ct/pocketid.sh)"
```

### Unraid

Pocket ID is available as a template on the Community Apps store.

### Kubernetes Helm Chart

- A Helm chart maintained by @hobit44 is available [here](https://github.com/hobbit44/pocket-id-helm).
- A Helm chart maintained by anza-labs:

<div class="artifacthub-widget" data-url="https://artifacthub.io/packages/helm/anza-labs/pocket-id" data-theme="light" data-header="true" data-stars="true" data-responsive="false"><blockquote><p lang="en" dir="ltr"><b>pocket-id</b>: _pocket-id_ is a simple and easy-to-use OIDC provider that allows users to authenticate with their passkeys to your services. </p>&mdash; Open in <a href="https://artifacthub.io/packages/helm/anza-labs/pocket-id">Artifact Hub</a></blockquote></div><script async src="https://artifacthub.io/artifacthub-widget.js"></script>

### NixOS

A pocket-id module is available in NixOS Unstable.
It can be enabled by adding the following to your `configuration.nix`:

```nix
    services.pocket-id.enable = true;
```

For further configuration of the module, see the available [settings](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=pocket-id).

## Installation from Source

It's not recommended to install Pocket ID from source unless you know what you're doing. The following instructions are provided for advanced users who want to customize or contribute to the project.

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 22
- [Go](https://golang.org/doc/install) >= 1.24
- [Git](https://git-scm.com/downloads)

1. Run the following commands:

   ```bash
   # Clone the repo
   git clone https://github.com/pocket-id/pocket-id
   cd pocket-id

   # Checkout latest version
   git fetch --tags && git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

   # Build the frontend
   pnpm --filter pocket-id-frontend install
   pnpm --filter pocket-id-frontend build

   # Build the backend
   cd ../backend/cmd
   go build -o ../../pocket-id

   # Create the .env file
   cd ../../
   cp .env.example .env
   ```

2. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
3. Run the binary:

```bash
./pocket-id
```

You can now sign in with the admin account on `https://<your-app-url>/setup`.
