---
title: Memos
description: Enable OIDC authentication for Memos
---

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `Memos` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://< Memos Host >/auth/callback`, or leave blank to autofill on first login.
4. Copy the `Client ID`, `Client Secret`, `Authorization endpoint`, `Token endpoint`, and `User endpoint` for the next steps.

## Memos Setup

1. Log in to Memos as an admin.
2. Go to **Settings → SSO → Create**.
3. Set **Template** to `Custom`.
4. Enter the `Client ID` into the **Client ID** field.
5. Enter the `Client Secret` into the **Client secret** field.
6. Enter the `Authorization URL` into the **Authorization endpoint** field.
7. Enter the `Token URL` into the **Token endpoint** field.
8. Enter the `Userinfo URL` into the **User endpoint** field.
9. Set **Scopes** to `openid email profile`.
10. Set **Identifier** to `preferred_username`
11. Set **Display Name** to `profile`.
12. Set **Email** to `email`.
13. Save the settings and test the OAuth login.
