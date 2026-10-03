---
title: Unraid
description: Sign in to your Unraid server with Pocket ID.
client:
  callbackUrls:
    - http://unraid.example.com/graphql/api/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- Unraid 7.2.0 or later

More information about the Unraid OIDC configuration can be found in the [Unraid documentation](https://docs.unraid.net/API/oidc-provider-setup/).

::create-client

## Configure Unraid

1. In Unraid, open **Settings → Management Access → API → OIDC**.
2. Click the plus button on the far right of the **OIDC Providers** section.
3. Fill in the required fields:
   - **Provider ID**: a unique ID for your provider, for example `pocket-id`.
   - **Provider Name**: the display name for the provider, for example `Pocket ID`.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Issuer URL**: `https://id.example.com`, **without a trailing slash**.
4. Set the authorization mode.
   The quickest option is **Simple Authorization**.
5. _(Optional)_ Customize the button style.
6. Click **Apply** at the bottom of the page and sign in with Pocket ID to test it.
