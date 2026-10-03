---
title: BetterShift
description: Sign in to the BetterShift shift planner with Pocket ID.
client:
  callbackUrls:
    - https://bettershift.example.com/api/auth/oauth2/callback/custom-oidc
---

::create-client

## Configure BetterShift

Add or edit the following lines in your BetterShift `.env` file, using the values you copied from Pocket ID:

```ini
CUSTOM_OIDC_ENABLED=true
CUSTOM_OIDC_NAME=Login with Pocket ID # BUTTON_TEXT
CUSTOM_OIDC_CLIENT_ID=<client-id>
CUSTOM_OIDC_CLIENT_SECRET=<client-secret>
CUSTOM_OIDC_ISSUER=https://id.example.com/.well-known/openid-configuration
CUSTOM_OIDC_SCOPES=openid profile email  # Space-separated list
```

Save the file, redeploy BetterShift and sign in with Pocket ID to test it.

## Sources

- https://bettershift.pantelx.com/
- https://github.com/panteLx/BetterShift
