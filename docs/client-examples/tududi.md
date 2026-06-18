---
title: tududi
description: Configure Pocket ID with tududi
---

## Requirements

- [tududi](https://github.com/chrisvel/tududi/releases/tag/v1.1.0) version `v1.1.0` or higher
- Pocket ID on https, reachable at `https://<pocketid-domain.tld>`
- tududi server on https, reachable at `https://<tududi-domain.tld>`

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Tududi`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
    ```
    https://<tududi-domain.tld>/api/oidc/callback/pocketid
    ```
3. _Optional:_ Download or link a PNG or SVG **logo** from [selfh.st/icons/](https://selfh.st/icons/) to match the style of your setup.
4. Client Launch URL:
    ```bash
    https://<tududi-domain.tld>
    ```
5. PKCE: Keep it disabled.
6. Copy the **Client ID**, **Client Secret** for configuring with tududi environment variables.

## Configure tududi

This is the minimal configuration needed to setup Pocket ID OIDC with tududi.

from [the Tududi OIDC-SSO docs](https://github.com/chrisvel/tududi/blob/main/docs/10-oidc-sso.md#pocketid).

1. Add the following lines environment variables file, filling in the secrets from Step 6:

```bash
OIDC_ENABLED=true
OIDC_PROVIDER_NAME=PocketID
OIDC_PROVIDER_SLUG=pocketid
OIDC_ISSUER_URL=https://<pocketid-domain.tld>
OIDC_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
OIDC_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
OIDC_SCOPE=openid profile email
OIDC_AUTO_PROVISION=true

# when tududi is behind a reverse proxy:
TUDUDI_TRUST_PROXY=true # required for proper session handling after OIDC login
```

2. Save and restart the tududi docker-compose stack/app.
