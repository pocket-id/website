---
title: Wekan
description: Set up Wekan kanban board with Pocket ID OIDC
---

## Requirements

- [Wekan](https://github.com/wekan/wekan)
- HTTPS connection to your Wekan server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `wekan`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
   ```
   https://<wekan-url>/_oauth/oidc
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Wekan project](https://github.com/wekan/wekan) and upload.
4. Copy the **Client ID**, and **Client Secret** for use in the next section.

## Configure Wekan env variables

Use the following `environment` variables to configure OpenID (Docker shown):

```yaml
services:
...
  wekan:
    ...
    environment:
      - OAUTH2_ENABLED=true
      - OIDC_REDIRECTION_ENABLED=true # for mandatory
      - OAUTH2_LOGIN_STYLE=popup # or redirect
      - OAUTH2_CLIENT_ID=xxxxx-xxxxx-xxxxx
      - OAUTH2_SECRET=xxxxx-xxxxx-xxxxx
      - OAUTH2_SERVER_URL=https://pocket-id.tld
      - OAUTH2_AUTH_ENDPOINT=/authorize
      - OAUTH2_USERINFO_ENDPOINT=/api/oidc/userinfo
      - OAUTH2_TOKEN_ENDPOINT=/api/oidc/token
      - OAUTH2_ID_MAP=preferred_username
      - OAUTH2_FULLNAME_MAP=name
      - OAUTH2_USERNAME_MAP=preferred_username
      - OAUTH2_EMAIL_MAP=email
...
```

After configuration is tested and working, you can adjust a few other OpenID settings in the gui at **Admin Panel > Settings Layout**:

## Notes

Configuration adapted from the [Authentik guide for Wekan](https://docs.goauthentik.io/integrations/services/wekan/#wekan-configuration). Tested and working in Wekan `v7.90`.
