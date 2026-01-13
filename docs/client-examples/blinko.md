---
title: Blinko
description: Configure OAuth2 SSO for Blinko with Pocket ID
---

## Requirements

*   A self-hosted [Blinko](https://github.com/blinkospace/blinko) instance.
*   Administrator access to both Blinko and Pocket ID.

## Pocket ID Setup

1.  Log in to Pocket ID.
2.  Create a new OIDC client named `Blinko` (or a name of your choice).
3.  (Optional) Upload a [Blinko logo](https://github.com/blinkospace/blinko/tree/main/app/public/icons) for the client icon.
4.  Set the **Callback URL** (Redirect URI) to:
    `https://<YOUR_BLINKO_DOMAIN>/api/auth/callback/pocket-id`
5.  You will need the following values:
    *   **Client ID**
    *   **Client Secret**
    *   **OIDC Discovery URL** (usually ends in `/.well-known/openid-configuration`)

## Blinko Setup

1.  Log in to Blinko as an admin.
2.  Navigate to **Settings** → **SSO Settings** → **Add Provider**.
3.  Set **Provider** to `Custom Provider`.
4.  Configure the provider details:
    *   **Provider ID**: Enter `pocket-id`.
        *   *Note: This must match the suffix of the Callback URL you set in Pocket ID.*
    *   **Provider Name**: Enter `Pocket ID` (or your preferred display name).
    *   **Provider Icon**: (Optional) Set an icon string, such as `streamline-ultimate:touch-id-bold`.
5.  Paste the **OIDC Discovery URL** into the **WellKnown URL** field.
    *   Example: `https://<YOUR_POCKET_ID_DOMAIN>/.well-known/openid-configuration`
    *   *The Authorization, Token, and Userinfo URLs will be automatically fetched. If not, fill them from the Pocket ID Blinko OIDC client page. The scopes are: 'openid email profile groups'*
6.  Enter the **Client ID** and **Client Secret** obtained from Pocket ID.
7.  Save the settings and test the OAuth login.

> **Note:** To link an existing Blinko account to your SSO account, follow the [official instructions](https://docs.blinko.space/en/settings/link-account).
