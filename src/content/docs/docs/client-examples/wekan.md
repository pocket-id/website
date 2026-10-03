---
title: Wekan
description: Sign in to the Wekan kanban board with Pocket ID.
client:
  callbackUrls:
    - https://wekan.example.com/_oauth/oidc
  values:
    - clientId
    - clientSecret
---

## Requirements

- [Wekan](https://github.com/wekan/wekan)
- HTTPS connection to your Wekan server

::create-client

## Configure Wekan

Use the following environment variables to configure OpenID (Docker shown).
Replace `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID.

```yaml
services:
...
  wekan:
    ...
    environment:
      - OAUTH2_ENABLED=true
      - OIDC_REDIRECTION_ENABLED=true # for mandatory
      - OAUTH2_LOGIN_STYLE=popup # or redirect
      - OAUTH2_CLIENT_ID=<client-id>
      - OAUTH2_SECRET=<client-secret>
      - OAUTH2_SERVER_URL=https://id.example.com
      - OAUTH2_AUTH_ENDPOINT=/authorize
      - OAUTH2_USERINFO_ENDPOINT=/api/oidc/userinfo
      - OAUTH2_TOKEN_ENDPOINT=/api/oidc/token
      - OAUTH2_ID_MAP=preferred_username
      - OAUTH2_FULLNAME_MAP=name
      - OAUTH2_USERNAME_MAP=preferred_username
      - OAUTH2_EMAIL_MAP=email
...
```

## Notes

Configuration adapted from the [Authentik guide for Wekan](https://docs.goauthentik.io/integrations/services/wekan/#wekan-configuration).
Tested and working in Wekan `v7.90`.
