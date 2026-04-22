---
title: Installation
description: Get Pocket ID running quickly with Docker or standalone installation
order: 1
---

## Before you start

Pocket ID requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), meaning it must be served over HTTPS. This is necessary because Pocket ID uses the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

You can use a reverse proxy like [Caddy](https://caddyserver.com/) or [NGINX](https://www.nginx.org/) to serve Pocket ID over HTTPS. Alternatively, you can use a service like [Cloudflare](https://www.cloudflare.com/) to provide HTTPS for your domain.

## Installation Methods

### Installation with Docker (recommended)

1. Download the [`docker-compose.yml`](https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml) and [`.env`](https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example) file:

   ```bash
   curl -o docker-compose.yml https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml
   curl -o .env https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example
   ```

2. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
3. Run `docker compose up -d`

Create an admin account on `https://<your-app-url>/setup`.

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

Create an admin account on `https://<your-app-url>/setup`.

## Offline usage

If you are running Pocket ID in an air-gapped environment or without reliable internet access, you can disable external requests by setting the following environment variables:

- `VERSION_CHECK_DISABLED=true`: Disables the automatic version check against GitHub.
- `ANALYTICS_DISABLED=true`: Disables the daily heartbeat request to the analytics server.

## Community Installation Methods

> [!IMPORTANT]
> These installation methods are not officially supported, and services may not work as expected.

### Podman + Quadlet

For _rootless_ Podman, add the following Quadlet file at `~/.config/containers/systemd/pocket-id.container`.
For _rootful_ Podman, move it into `/etc/containers/systemd/` instead.
Also change the `WantedBy` value `default.target` to `multi-user.target`.
Go through the environment variables and adjust the values as needed.

```systemd
[Container]
Image=ghcr.io/pocket-id/pocket-id:v2
PublishPort=1411:1411
Volume=pocket-id:/app/data:Z

# optional auto-update, requires podman-auto-update.timer
AutoUpdate=registry

# optional healthcheck
HealthCmd=/app/pocket-id healthcheck
HealthInterval=1m30s
HealthTimeout=5s
HealthRetries=2
HealthStartPeriod=10s

# Environment variables
# See the documentation for more information:
# https://pocket-id.org/docs/configuration/environment-variables

# These variables must be configured for your deployment:
Environment=APP_URL=https://your-pocket-id-domain.com
# Encryption key. Generate with: openssl rand -base64 32
# Put the base64 key in a file and point to it here.
Environment=ENCRYPTION_KEY_FILE=/path/to/encryption_key

# These variables are optional but recommended to review:
Environment=TRUST_PROXY=false
Environment=MAXMIND_LICENSE_KEY=

[Service]
Restart=always

[Install]
WantedBy=default.target
```

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

- A Helm chart maintained by @matslarson is available [here](https://github.com/matslarson/pocket-id-helm).
- A Helm chart maintained by anza-labs [here](https://artifacthub.io/packages/helm/anza-labs/pocket-id).

### NixOS

A pocket-id module is available in NixOS Unstable.
It can be enabled by adding the following to your `configuration.nix`:

```nix
    services.pocket-id.enable = true;
```

For further configuration of the module, see the available [settings](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=pocket-id).

### Homebrew

   ```bash
   brew install pocket-id
   ```

## Installation from Source

It's not recommended to install Pocket ID from source unless you know what you're doing. The following instructions are provided for advanced users who want to customize or contribute to the project.

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 22
- [Go](https://golang.org/doc/install) >= 1.26
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

Create an admin account on `https://<your-app-url>/setup`.
