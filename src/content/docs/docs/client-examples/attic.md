---
title: Attic
description: Sign in to Attic with Pocket ID.
client:
  callbackUrls:
    - https://attic.example.com/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- [Attic](https://getattic.dev/guides/authentication) version `1.4.0` or higher
- HTTPS connection to your Attic server

::create-client

## Configure Attic with environment variables

Add these environment variables to [enable basic](https://getattic.dev/guides/authentication/#basic-oidc-setup) OIDC support:

```ini
ATTIC_OIDC_ENABLED=true
ATTIC_OIDC_ISSUER_URL=https://id.example.com
ATTIC_OIDC_CLIENT_ID=<client-id>
ATTIC_OIDC_CLIENT_SECRET=<client-secret>
```

:::caution
The `ATTIC_OIDC_ISSUER_URL` must contain only the Pocket ID URL and must not include the `/.well-known/openid-configuration` path.

Example: `https://id.example.com`
:::
