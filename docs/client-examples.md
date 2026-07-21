---
title: Gotify
description: Integrate Pocket ID with Gotify
---
## Requirements

- Gotify Server version `3.0` or higher

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Gotify`).
2. Set the **Callback URL** to the value below (replacing `example.com` with your actual domain).
```
https://gotify.example/auth/oidc/callback
```
3. _Optional:_ If using the Android app, add a second Callback URL:
```
gotify://oidc/callback
```
4. **Enable PKCE.**
5. _Optional:_ Download a PNG or SVG logo from the [Gotify project](https://github.com/gotify) and upload.
6. Copy the **Client ID** and **Client Secret** for use in the next section.

## Configure Gotify

[OIDC for Gotify is configured via environment variables](https://gotify.net/docs/config). There is no GUI for managing it. Therefore, depending on the installation method used, these variables would need to be passed in different ways. However, the same variables are used for every case, and [they are all referenced in Gotify's docs](https://gotify.net/docs/oidc).

For Docker deployments, Docker environment variables can be used. 

Either way, set the variables as the following:

```
GOTIFY_OIDC_ENABLED=true
GOTIFY_OIDC_ISSUER=https://auth.example.org
GOTIFY_OIDC_CLIENTID=YOUR_CLIENT_ID
GOTIFY_OIDC_CLIENTSECRET=YOUR_CLIENT_SECRET
GOTIFY_OIDC_REDIRECTURL=https://gotify.example.org/auth/oidc/callback
GOTIFY_OIDC_AUTOREGISTER=true
GOTIFY_OIDC_USERNAMECLAIM=preferred_username
GOTIFY_OIDC_LINK_BY_USERNAME=false
GOTIFY_OIDC_SCOPES=openid,profile,email
```

Where:

- **`GOTIFY_OIDC_CLIENTID`:** Is the Client ID you saved in the first step.
- **`GOTIFY_OIDC_CLIENTSECRET`:** Is the Client Secret you saved in the first step.
- **`GOTIFY_OIDC_AUTOREGISTER`:** Can be set to `false` to disable auto-provisioning.
- **`GOTIFY_OIDC_LINK_BY_USERNAME`:** Can be set to `true` if you want your Pocket ID to be mapped with an already existing internal Gotify user (asuming they have the same username).

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
      - GOTIFY_OIDC_ISSUER=https://auth.example.org
      - GOTIFY_OIDC_CLIENTID=YOUR_CLIENT_ID
      - GOTIFY_OIDC_CLIENTSECRET=YOUR_CLIENT_SECRET
      - GOTIFY_OIDC_REDIRECTURL=https://gotify.example.org/auth/oidc/callback
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
  -e GOTIFY_OIDC_ISSUER=https://auth.example.org \
  -e GOTIFY_OIDC_CLIENTID=YOUR_CLIENT_ID \
  -e GOTIFY_OIDC_CLIENTSECRET=YOUR_CLIENT_SECRET \
  -e GOTIFY_OIDC_REDIRECTURL=https://gotify.example.org/auth/oidc/callback \
  -e GOTIFY_OIDC_AUTOREGISTER=true \
  -e GOTIFY_OIDC_USERNAMECLAIM=preferred_username \
  -e GOTIFY_OIDC_LINK_BY_USERNAME=false \
  -e GOTIFY_OIDC_SCOPES="openid,profile,email" \
  gotify/server
```

