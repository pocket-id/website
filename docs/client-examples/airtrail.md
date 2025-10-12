---
title: AirTrail
description: Configure AirTrail with Pocket ID authentication
---

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `AirTrail`).
2. Set the Callback URL to `https://<airtrail-url>/login`, or leave blank to autofill on first login.
3. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL**.
4. _(Optional)_ Find and upload a logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)

## Configure AirTrail through the UI

1. Open AirTrail and navigate to: **`Settings > OAuth`**
2. Toggle **Enable OAuth**.
3. Fill in the required fields:
   - **Issuer URL**: Paste the `OIDC Discovery URL` from Pocket ID.
   - **Client ID**: Paste the `Client ID` from Pocket ID.
   - **Client Secret**: Paste the `Client Secret` from Pocket ID.
4. Save the settings.
5. Test the OAuth login to ensure it works.

## Configure AirTrail with an `.env` file

Check out AirTrail's [documentation](https://airtrail.johan.ohly.dk/docs/features/oauth#configuration) for more details.

Example with `.env`:

```text
OAUTH_ENABLED=true
OAUTH_ISSUER_URL=https://<pocket-id-domain.tld>/.well-known/openid-configuration
OAUTH_CLIENT_ID=xxxxx-xxxxx-xxxxx 
OAUTH_CLIENT_SECRET=xxxxx-xxxxx-xxxxx 
```
