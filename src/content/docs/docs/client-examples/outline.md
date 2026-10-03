---
title: Outline
description: Sign in to the Outline wiki with Pocket ID.
client:
  callbackUrls:
    - https://outline.example.com/auth/oidc.callback
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
---

Setting up [Outline](https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I) to authenticate with Pocket ID can be done with the configuration below.

## Requirements

- Your Outline and Pocket ID server URLs must both use HTTPS.

::create-client

## Configure Outline

1. Add the following to your Outline container's `docker.env`:

   ```ini
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   OIDC_AUTH_URI=https://id.example.com/authorize
   OIDC_TOKEN_URI=https://id.example.com/api/oidc/token
   OIDC_USERINFO_URI=https://id.example.com/api/oidc/userinfo
   OIDC_LOGOUT_URI=https://id.example.com/api/oidc/end-session

   OIDC_DISPLAY_NAME=Pocket ID
   OIDC_USERNAME_CLAIM=preferred_username
   OIDC_SCOPES=openid profile email groups
   ```

2. Restart your Outline container:

   ```bash
   docker compose down
   docker compose up -d
   ```

3. Sign in to Outline with Pocket ID to test it.
4. Review and update the SSO settings under **Settings → Workspace → Security**.
