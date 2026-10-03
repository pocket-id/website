---
title: tududi
description: Sign in to the tududi task manager with Pocket ID.
client:
  callbackUrls:
    - https://tududi.example.com/api/oidc/callback/pocketid
  launchUrl: https://tududi.example.com
  values:
    - clientId
    - clientSecret
---

## Requirements

- [tududi](https://github.com/chrisvel/tududi/releases/tag/v1.1.0) `v1.1.0` or later
- Pocket ID on HTTPS, reachable at `https://id.example.com`
- tududi server on HTTPS, reachable at `https://tududi.example.com`

::create-client

## Configure tududi

This is the minimal configuration needed to set up Pocket ID with tududi, taken from [the tududi OIDC SSO docs](https://github.com/chrisvel/tududi/blob/main/docs/10-oidc-sso.md#pocketid).

1. Add the following lines to your environment variables file, replacing `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID:
   ```ini
   OIDC_ENABLED=true
   OIDC_PROVIDER_NAME=PocketID
   OIDC_PROVIDER_SLUG=pocketid
   OIDC_ISSUER_URL=https://id.example.com
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   OIDC_SCOPE=openid profile email
   OIDC_AUTO_PROVISION=true

   # when tududi is behind a reverse proxy:
   TUDUDI_TRUST_PROXY=true # required for proper session handling after OIDC login
   ```
2. Save and restart the tududi Docker Compose stack or app.
