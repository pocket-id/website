---
title: ByteStash
description: Sign in to the ByteStash code snippet manager with Pocket ID.
client:
  callbackUrls:
    - https://bytestash.example.com/api/oauth/openid
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure ByteStash

1. Set the following ByteStash environment variables:
   - `OIDC_ENABLED`: `true` to enable OIDC authentication.
   - `OIDC_DISPLAY_NAME`: the lowercase name of the provider (`pocketid`).
   - `OIDC_ISSUER_URL`: the URL of your Pocket ID instance, such as `https://id.example.com`.
   - `OIDC_CLIENT_ID`: the **Client ID** from Pocket ID.
   - `OIDC_CLIENT_SECRET`: the **Client secret** from Pocket ID.
2. Set up your email address in ByteStash.
   It has to match your email address in Pocket ID.
