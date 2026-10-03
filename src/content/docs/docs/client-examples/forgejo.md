---
title: Forgejo
description: Sign in to the Forgejo Git service with Pocket ID.
client:
  callbackUrls:
    - https://forgejo.example.com/user/oauth2/PocketID/callback
---

::create-client

## Configure Forgejo

1. Log in to Forgejo as an admin.
2. Open **Site Administration → Identity & Access → Authentication Sources**.
3. Click **Add Authentication Source**.
4. Set **Authentication Type** to `OAuth2`.
5. Set **Authentication Name** to `PocketID`.
   :::caution
   If you change this name, update the callback URL in Pocket ID to match.
   :::
6. Set **OAuth2 Provider** to `OpenID Connect`.
7. Enter the **Client ID** from Pocket ID into the **Client ID (Key)** field.
8. Enter the **Client secret** from Pocket ID into the **Client Secret** field.
9. Enter the **OIDC Discovery URL** from Pocket ID into the **OpenID Connect Auto Discovery URL** field.
10. Enable **Skip local 2FA**.
11. Set **Additional Scopes** to `openid email profile`.
12. Save the settings and sign in with Pocket ID to test it.
