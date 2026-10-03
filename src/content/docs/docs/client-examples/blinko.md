---
title: Blinko
description: Sign in to the Blinko note-taking app with Pocket ID.
client:
  callbackUrls:
    - https://blinko.example.com/api/auth/callback/pocket-id
---

## Requirements

- A self-hosted [Blinko](https://github.com/blinkospace/blinko) instance.
- Administrator access to both Blinko and Pocket ID.

::create-client

## Configure Blinko

1. Sign in to Blinko as an admin.
2. Open **Settings → SSO Settings** and click **Add Provider**.
3. Set **Provider** to `Custom Provider`.
4. Configure the provider details:
   - **Provider ID**: `pocket-id`.
     This must match the end of the callback URL you added in Pocket ID.
   - **Provider Name**: `Pocket ID` (or your preferred display name).
   - **Provider Icon**: _(Optional)_ an icon string, such as `streamline-ultimate:touch-id-bold`.
5. Paste the **OIDC Discovery URL** from Pocket ID into the **WellKnown URL** field, for example `https://id.example.com/.well-known/openid-configuration`.
   The authorization, token and userinfo URLs are fetched automatically.
   If they aren't, copy them from the client's page in Pocket ID under **Show more details**.
   The scopes are `openid email profile groups`.
6. Enter the **Client ID** and the **Client secret** from Pocket ID.
7. Save the settings and sign in with Pocket ID to test it.

:::note
To link an existing Blinko account to your SSO account, follow the [official instructions](https://docs.blinko.space/en/settings/link-account).
:::
