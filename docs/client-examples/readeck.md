---
title: Readeck
description: Configure Readeck with Pocket ID
---

## PocketID Setup

1. In Pocket-ID, create a new OIDC Client, name it i.e. `Readeck`.
2. Set the callback URL to: `https://<your-readeck-domain>/login/oidc`.

## Readeck configuration

1. Add the following to your docker `compose` or `.env` file for Readeck:

Example directly in `compose.yaml`:
```yaml
environment:
  READECK_AUTH_OIDC_PROVIDERS_1_NAME: PocketID
  READECK_AUTH_OIDC_PROVIDERS_1_URL: https://<your pocket ID domain> # You usually need to give a URL without trailing slash
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_ID: <client id from pocket ID>
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_SECRET: <client secret from pocket ID>
```

Example using an `.env` file:
```ini
  READECK_AUTH_OIDC_PROVIDERS_1_NAME= PocketID
  READECK_AUTH_OIDC_PROVIDERS_1_URL= https://<your pocket ID domain> # You usually need to give a URL without trailing slash
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_ID= <client id from pocket ID>
  READECK_AUTH_OIDC_PROVIDERS_1_CLIENT_SECRET= <client secret from pocket ID>
```

2. Additional Configuration (Optional):

For advanced setups like _Group mapping_ or _Custom claims_, refer to the [official Readeck documentation](https://readeck.org/en/docs/external-auth).

