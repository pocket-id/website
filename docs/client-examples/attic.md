---
title: Attic
description: Integrate Pocket ID with Attic
---

## Requirements

- [Attic](https://getattic.dev/guides/authentication) version `1.4.0` or higher
- HTTPS connection to your Attic server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `attic`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
   ```
   https://<attic-domain.tld>/auth/oidc/callback
   ```
3. Copy the **Client ID**, **Client Secret**, and **OIDC Issuer URL** for use in the next section.

## Configure Attic with environment variables

Add these environment variables to [enable basic](https://getattic.dev/guides/authentication/#basic-oidc-setup) OIDC support

```yaml
ATTIC_OIDC_ENABLED=true
ATTIC_OIDC_ISSUER_URL=https://<pocket-id-domain.tld>
ATTIC_OIDC_CLIENT_ID=xxxxx-xxxxx-xxxxx
ATTIC_OIDC_CLIENT_SECRET=xxxxx-xxxxx-xxxxx
```

> [!WARNING]
> The `ATTIC_OIDC_ISSUER_URL` must contain only the Pocket ID domain and must not include the `/.well-known/openid-configuration` path.
>
> Example: `https://pocket-id.example.org`
