---
title: AirTrail
description: Sign in to the AirTrail flight tracker with Pocket ID.
client:
  callbackUrls:
    - https://airtrail.example.com/login
---

::create-client

## Configure AirTrail through the UI

1. In AirTrail, open **Settings → OAuth**.
2. Turn on **Enable OAuth**.
3. Fill in the fields:
   - **Issuer URL**: the **OIDC Discovery URL** from Pocket ID.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
4. Save the settings and sign in with OAuth to test it.

## Configure AirTrail with an `.env` file

Check out AirTrail's [documentation](https://airtrail.johan.ohly.dk/docs/features/oauth#configuration) for more details.

Example with `.env`:

```ini
OAUTH_ENABLED=true
OAUTH_ISSUER_URL=https://id.example.com/.well-known/openid-configuration
OAUTH_CLIENT_ID=<client-id>
OAUTH_CLIENT_SECRET=<client-secret>
```
