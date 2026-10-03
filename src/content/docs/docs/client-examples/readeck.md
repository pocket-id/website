---
title: Readeck
description: Sign in to the Readeck read-it-later app with Pocket ID.
client:
  callbackUrls:
    - https://readeck.example.com/login/oidc
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Readeck

Add the following to your Docker Compose file or `.env` file for Readeck.
You usually need to give the Pocket ID URL without a trailing slash.

Example directly in `compose.yaml`:

```yaml
environment:
  READECK_AUTH_OIDC_PROVIDERS_1_NAME: PocketID
  READECK_AUTH_OIDC_PROVIDERS_1_URL: https://id.example.com
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_ID: <client-id>
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_SECRET: <client-secret>
```

Example using an `.env` file:

```ini
READECK_AUTH_OIDC_PROVIDERS_1_NAME=PocketID
READECK_AUTH_OIDC_PROVIDERS_1_URL=https://id.example.com
READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_ID=<client-id>
READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_SECRET=<client-secret>
```

For advanced setups like group mapping or custom claims, refer to the [official Readeck documentation](https://readeck.org/en/docs/external-auth).
