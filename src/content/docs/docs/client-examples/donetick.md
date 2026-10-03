---
title: Donetick
description: Sign in to the Donetick task manager with Pocket ID.
client:
  callbackUrls:
    - https://donetick.example.com/auth/oauth2
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

::create-client

## Configure Donetick

1. In the Donetick configuration file `selfhosted.yaml`, fill in the `oauth2` fields:
   ```yaml
   oauth2:
     client_id: <client-id>
     client_secret: <client-secret>
     auth_url: https://id.example.com/authorize
     token_url: https://id.example.com/api/oidc/token
     user_info_url: https://id.example.com/api/oidc/userinfo
     redirect_url: https://donetick.example.com/auth/oauth2
     name: Pocket ID
   ```
2. Restart your Donetick container and you're good to go.
