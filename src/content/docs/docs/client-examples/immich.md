---
title: Immich
description: Sign in to the Immich photo library with Pocket ID.
client:
  callbackUrls:
    - https://immich.example.com/auth/login
    - https://immich.example.com/user-settings
    - app.immich:///oauth-callback
---

::create-client

## Configure Immich

1. In Immich, open **Administration → Settings → Authentication Settings → OAuth**.
2. Enable **Login with OAuth**.
3. Fill in the fields:
   - **Issuer URL**: the **OIDC Discovery URL** from Pocket ID.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
4. _(Optional)_ Change **Button Text** to `Login with Pocket ID`.
5. Save the settings and sign in with the OAuth button to test it.
