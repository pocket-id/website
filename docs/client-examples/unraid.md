---
title: Unraid
description: Configure your Unraid server with Pocket ID
---

> [!WARNING]
> This requires Unraid version > 7.2.0
>
> More information for the Unraid OIDC configuration can be found in their [documentation](https://docs.unraid.net/API/oidc-provider-setup/).

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `unraid`).
2. _(Optional)_ Set the callback URL(s):
   ```
   http://<UNRAID_DOMAIN>/graphql/api/auth/oidc/callback
   ```
3. Copy the **Client ID** and **Client Secret**.

## Configure Unraid

1. Open Unraid and navigate to:
   **`Settings → Management Access → API → OIDC`**
2. Click the plus button on the far right of the **OIDC Providers** section.
3. Fill in the required fields:
   - **Provider ID**: The unique ID for your provider (e.g., `pocket-id`).
   - **Provider Name**: The display name for the provider (e.g., `Pocket ID`).
   - **Client ID**: Paste the `Client ID` from Pocket ID.
   - **Client Secret**: Paste the `Client Secret` from Pocket ID.
   - **Issuer URL**: Paste your base `Pocket URL` **without a trailing slash**.
4. Set the authorization mode. The quickest option is to use **Simple Authorization**.
5. _(Optional)_ Customize the button style.
6. Click **`Apply`** at the bottom of the page.
7. Test the OAuth login to ensure it works.
