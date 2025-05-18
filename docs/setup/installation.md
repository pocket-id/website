---
id: installation
sidebar_position: 1
---

# Installation

## Before you start

Pocket ID requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), meaning it must be served over HTTPS. This is necessary because Pocket ID uses the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

### Installation with Docker (recommended)

1. Download the `docker-compose.yml` and `.env` file:

   ```bash
    curl -O https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml

    curl -o .env https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example
   ```

2. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
3. Run `docker compose up -d`

You can now sign in with the admin account on `http://localhost:1411/login/setup`.

### Stand-alone Installation (advanced)

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 22
- [Go](https://golang.org/doc/install) >= 1.24
- [Git](https://git-scm.com/downloads)

1. Copy the `.env.example` file in the `frontend` and `backend` folder to `.env` and change it so that it fits your needs.

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

2. Run the following commands:

   ```bash
   #Clone the official repo
   git clone https://github.com/pocket-id/pocket-id
   cd pocket-id

   #Checkout latest version
   git fetch --tags && git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

   #Build hte frontend
   cd frontend
   npm ci
   npm run build

   #Start the Backend
   cd ../backend/cmd
   go build -o pocket-id
   ./pocket-id
   ```

You can now sign in with the admin account on `http://localhost:1411/login/setup`.

## Unofficial Installation Methods

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
