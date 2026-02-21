---
title: BetterShift
description: Configure OIDC authentication for BetterShift
---

The following example variables are used, and should be replaced with your actual URLs.

- `bettershift.example.com` (The URL of your bettershift instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket-ID Setup

1. In Pocket-ID create a new OIDC Client, name it, for example `bettershift`
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URLs to: `https://bettershift.example.com/api/auth/oauth2/callback/custom-oidc`, or leave blank to autofill on first login.
4. Copy the `Client ID`, `Client Secret` and `OIDC-Discovery-URL` for use in the next steps.

## BetterShift Setup

Add/edit the following lines to your bettershift `.env` file replacing the values with the ones you copied above:

```env
CUSTOM_OIDC_ENABLED=true
CUSTOM_OIDC_NAME=Login with PocketID # BUTTON_TEXT
CUSTOM_OIDC_CLIENT_ID=<your OIDC-Discovery-URL from above>
CUSTOM_OIDC_CLIENT_SECRET=<your client secret from above>
CUSTOM_OIDC_ISSUER=<your OIDC-Discovery-URL from above>
CUSTOM_OIDC_SCOPES=openid profile email  # Space-separated list
```

Save and redeploy bettershift and you should be able to login using OIDC with Pocket ID.

## Sources

- https://bettershift.pantelx.com/
- https://github.com/panteLx/BetterShift
