---
title: Dawarich
description: Sign in to the Dawarich location history tracker with Pocket ID.
client:
  callbackUrls:
    - https://dawarich.example.com/users/auth/openid_connect/callback
  launchUrl: https://dawarich.example.com
  values:
    - clientId
    - clientSecret
---

## Requirements

- [Dawarich](https://github.com/Freika/dawarich/releases/tag/0.36.0) version `0.36.0` or higher
- Pocket ID on HTTPS, reachable at `https://id.example.com`
- Dawarich server on HTTPS, reachable at `https://dawarich.example.com`

::create-client

Keep **PKCE** turned off if you get errors.

## Configure Dawarich

This is the minimal configuration needed to set up Pocket ID with Dawarich.

1. Add the following lines to your Dawarich `.env`/`docker-compose.yml` file, replacing the values with the ones you copied in step 3 above:
   ```ini
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   OIDC_ISSUER=https://id.example.com/.well-known/openid-configuration
   OIDC_REDIRECT_URI=https://dawarich.example.com/users/auth/openid_connect/callback
   ```
2. Save the file and restart the Dawarich Docker Compose stack.
