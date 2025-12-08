---
title: Blinko
description: Configure OAuth2 SSO for Blinko with Pocket ID
---

## Requirements

A self-hosted [Blinko](https://github.com/blinkospace/blinko) app.

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `Blinko` (or any name you prefer).
2. (Optional) Upload [a logo of Blinko](https://github.com/blinkospace/blinko/tree/main/app/public/icons) for the OIDC client.
3. Set the callback URL to: `https://< Blinko >/api/auth/callback/pocket-id`.
4. Copy the  `OIDC Discovery URL`, `Authorization URL`, `Token URL`, `Userinfo URL`, `Client ID` and `Client secret` for the next steps.

## Blinko Setup

1. Log in to Blinko as an admin.
2. Go to **Settings → SSO Settings → Add Provider**.
3. Set **Provider** to `Custom Provider`.
4. Enter the `pocket-id` into the **Provider ID** field.
5. Enter the `Pocket ID` into the **Provider Name** field(or any name you prefer).
6. (Optional) Set a logo for your **Provider Icon**.
7. Enter the `OIDC Discovery URL` into the **WellKnown URL** field.
8. Enter the `Authorization URL` into the **Authorization URL** field.
9. Enter the `Token URL` into the **Token URL** field.
10. Enter the `Userinfo URL` into the **User Info URL** field.
11. Set **Scopes** to `email profile groups`.
12. Enter the `Client ID` into the **Client ID** field.
13. Enter the `Client secret` into the **Client Secret** field.
14. Save the settings and test the OAuth login.
