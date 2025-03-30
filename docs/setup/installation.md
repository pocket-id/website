---
id: installation
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

You can now sign in with the admin account on `http://localhost:3000/login/setup`.

### Stand-alone Installation (advanced)

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 22
- [Go](https://golang.org/doc/install) >= 1.23
- [Git](https://git-scm.com/downloads)
- [PM2](https://pm2.keymetrics.io/)
- [Caddy](https://caddyserver.com/docs/install) (optional)

1. Copy the `.env.example` file in the `frontend` and `backend` folder to `.env` and change it so that it fits your needs.

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

2. Run the following commands:

   ```bash
   git clone https://github.com/pocket-id/pocket-id
   cd pocket-id

   # Checkout the latest version
   git fetch --tags && git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

   # Start the backend
   cd backend/cmd
   go build -o ../pocket-id-backend
   cd ..
   pm2 start pocket-id-backend --name pocket-id-backend

   # Start the frontend
   cd ../frontend
   npm install
   npm run build
   pm2 start --name pocket-id-frontend --node-args="--env-file .env" build/index.js

   # Optional: Start Caddy (You can use any other reverse proxy)
   cd ..
   pm2 start --name pocket-id-caddy caddy -- run --config reverse-proxy/Caddyfile
   ```
   
You can now sign in with the admin account on `http://localhost/login/setup`.

## Advanced topics

### Use custom private keys

By default, Pocket ID generates a RSA-2048 private key upon first startup, which is used to sign all tokens.

You can optionally use a key with a different RSA key size (e.g. 3072 or 4096), or even a different algorithm (e.g. ECDSA with P-256, or EdDSA with Ed25519).

The private key is stored in the file `data/keys/jwt_private_key.json` (in the container, this is normally `/app/backend/data/keys/jwt_private_key.json`), in a JSON Web Key (JWK) format. You can override that with another private key.

These examples use the [step CLI](https://smallstep.com/docs/step-cli/installation/) to generate private keys in various formats and encode them as JWK.

<details>
  <summary>RS384 with RSA-3072</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=RSA \
  --alg=RS384 \
  --use=sig \
  --size=3072 \
  --no-password --insecure
```
</details>

<details>
  <summary>ECDSA with NIST curve P-256</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=EC \
  --alg=ES256 \
  --use=sig \
  --no-password --insecure
```
</details>

<details>
  <summary>EdDSA with curve Ed25519</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=OKP \
  --alg=EdDSA \
  --use=sig \
  --crv=Ed25519 \
  --no-password --insecure
```
</details>

> Note that the private key is used for all OAuth2 clients. If choosing an algorithm different than RS256 (RSA), make sure that your clients support that.

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

A Helm chart maintained by @hobit44 is available [here](https://github.com/hobbit44/pocket-id-helm).
