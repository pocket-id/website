---
title: Forgejo
description: Configure Forgejo Git service with Pocket ID
---

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `Forgejo` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://<Forgejo Host>/user/oauth2/PocketID/callback` or leave blank to autofill on first login.
4. Copy the `Client ID`, `Client Secret`, and `OIDC Discovery URL` for the next steps.

## Forgejo Setup

1. Log in to Forgejo as an admin.
2. Go to **Site Administration → Identity & Access → Authentication Sources**.
3. Click **Add Authentication Source**.
4. Set **Authentication Type** to `OAuth2`.
5. Set **Authentication Name** to `PocketID`.
   > [!IMPORTANT]
   > If you change this name, update the callback URL in Pocket ID to match.
6. Set **OAuth2 Provider** to `OpenID Connect`.
7. Enter the `Client ID` into the **Client ID (Key)** field.
8. Enter the `Client Secret` into the **Client Secret** field.
9. Enter the `OIDC Discovery URL` into the **OpenID Connect Auto Discovery URL** field.
10. Enable **Skip local 2FA**.
11. Set **Additional Scopes** to `openid email profile`.
12. Save the settings and test the OAuth login.
