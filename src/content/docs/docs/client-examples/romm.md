---
title: RomM
description: Sign in to the RomM game library with Pocket ID.
client:
  callbackUrls:
    - https://romm.example.com/api/oauth/openid
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure RomM

1. Set the following RomM environment variables:
   - `OIDC_ENABLED`: Set to `true` to enable OIDC authentication.
   - `OIDC_PROVIDER`: The lowercase name of the provider (`pocketid`).
   - `OIDC_CLIENT_ID`: The **Client ID** from Pocket ID.
   - `OIDC_CLIENT_SECRET`: The **Client secret** from Pocket ID.
   - `OIDC_REDIRECT_URI`: The callback URL configured in Pocket ID, in the format `https://romm.example.com/api/oauth/openid`.
   - `OIDC_SERVER_APPLICATION_URL`: The authorization URL for your Pocket ID instance, for example `https://id.example.com`.
2. Set up your email address in RomM.
   This email has to match your user email in Pocket ID.
