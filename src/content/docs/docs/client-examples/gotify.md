---
title: Gotify
description: Sign in to the Gotify notification server with Pocket ID.
client:
  callbackUrls:
    - https://gotify.example.com/auth/oidc/callback
    - gotify://oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
---

## Requirements

- Gotify Server version `3.0` or higher

::create-client

The `gotify://oidc/callback` URL is only needed for the Android app.

## Configure Gotify

[OIDC for Gotify is configured with environment variables](https://gotify.net/docs/config).
There is no GUI for managing it.
Depending on the installation method, these variables need to be passed in different ways.
However, the same variables are used in every case, and [they are all referenced in Gotify's docs](https://gotify.net/docs/oidc).

For Docker deployments, use Docker environment variables.

Set the following variables, replacing `gotify.example.com` and `id.example.com` with your own domains:

```ini
GOTIFY_OIDC_ENABLED=true
GOTIFY_OIDC_ISSUER=https://id.example.com
GOTIFY_OIDC_CLIENTID=<client-id>
GOTIFY_OIDC_CLIENTSECRET=<client-secret>
GOTIFY_OIDC_REDIRECTURL=https://gotify.example.com/auth/oidc/callback
GOTIFY_OIDC_AUTOREGISTER=true
GOTIFY_OIDC_USERNAMECLAIM=preferred_username
GOTIFY_OIDC_LINK_BY_USERNAME=false
GOTIFY_OIDC_SCOPES=openid,profile,email
```

Where:

- **`GOTIFY_OIDC_CLIENTID`**: the **Client ID** from Pocket ID.
- **`GOTIFY_OIDC_CLIENTSECRET`**: the **Client secret** from Pocket ID.
- **`GOTIFY_OIDC_AUTOREGISTER`**: can be set to `false` to disable auto-provisioning.
- **`GOTIFY_OIDC_LINK_BY_USERNAME`**: can be set to `true` if you want your Pocket ID user to be mapped to an already existing internal Gotify user with the same username.

### Docker Compose example

```yaml
services:
  gotify:
    container_name: gotify
    restart: unless-stopped
    image: gotify/server
    ports:
      - 8080:80
    volumes:
      - gotify-data:/app/data
    environment:
      - GOTIFY_OIDC_ENABLED=true
      - GOTIFY_OIDC_ISSUER=https://id.example.com
      - GOTIFY_OIDC_CLIENTID=<client-id>
      - GOTIFY_OIDC_CLIENTSECRET=<client-secret>
      - GOTIFY_OIDC_REDIRECTURL=https://gotify.example.com/auth/oidc/callback
      - GOTIFY_OIDC_AUTOREGISTER=true
      - GOTIFY_OIDC_USERNAMECLAIM=preferred_username
      - GOTIFY_OIDC_LINK_BY_USERNAME=false
      - GOTIFY_OIDC_SCOPES=openid,profile,email
```

### Docker run example

```bash
docker run -d --name gotify --restart unless-stopped \
  -p 8080:80 \
  -v gotify-data:/app/data \
  -e GOTIFY_OIDC_ENABLED=true \
  -e GOTIFY_OIDC_ISSUER=https://id.example.com \
  -e GOTIFY_OIDC_CLIENTID=<client-id> \
  -e GOTIFY_OIDC_CLIENTSECRET=<client-secret> \
  -e GOTIFY_OIDC_REDIRECTURL=https://gotify.example.com/auth/oidc/callback \
  -e GOTIFY_OIDC_AUTOREGISTER=true \
  -e GOTIFY_OIDC_USERNAMECLAIM=preferred_username \
  -e GOTIFY_OIDC_LINK_BY_USERNAME=false \
  -e GOTIFY_OIDC_SCOPES="openid,profile,email" \
  gotify/server
```
