---
title: Dawarich
description: Configure Pocket ID with Dawarich
---

## Requirements

- [Dawarich](https://github.com/Freika/dawarich/releases/tag/0.36.0) version `0.36.0` or higher
- Pocket ID on https, reachable at `https://<pocketid-domain.tld>`
- Dawarich server on https, reachable at `https://<dawarich-domain.tld>`

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `dawarich`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
   ```
   https://<dawarich-domain.tld>/users/auth/openid_connect/callback
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Dawarich](https://github.com/Freika/dawarich/blob/master/app/assets/images/favicon.jpeg?raw=true) and upload.
4. Client Launch URL: `https://<dawarich-domain.tld>`.
5. Enable PKCE.
6. Copy the **Client ID**, **Client Secret** for configuring with Dawarich environment variables.

## Configure Dawarich

This is the minimal configuration needed to setup Pocket ID OIDC with Dawarich
1. Add the following lines to your Dawarich app `.env`/`docker-compose.yml` file replacing the values from Step 6:
  ```bash
  OIDC_CLIENT_ID=<your_client_id_from_above>
  OIDC_CLIENT_SECRET=<your_client_secret_from_above>
  OIDC_ISSUER=https://<pocketid-domain.tld>
  OIDC_REDIRECT_URI=https://<dawarich-domain.tld>/users/auth/openid_connect/callback  
  ```
2. Save and restart the dawarich docker-compose stack.
