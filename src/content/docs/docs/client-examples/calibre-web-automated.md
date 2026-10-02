---
title: Calibre-Web Automated
description: Configure Calibre-Web Automated with Pocket ID authentication
---

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Calibre-Web Automated`).
2. Set the Callback URL to `https://<calibre-web-automated.tld>/login/generic/authorized`
3. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL**.

## Configure Calibre-Web Automated through the UI

1. Open Calibre-Web Automated and navigate to: **`Admin Settings > Edit Basic Configuration`**
2. Under **`Feature Configuration > Login type`**, select `Use OAuth (requires HTTPS)`.
3. Fill in the required fields:
   - **OAuth Metadata URL**: Paste the `OIDC Discovery URL` from Pocket ID.
   - **OAuth Client ID**: Paste the `Client ID` from Pocket ID.
   - **OAuth Client Secret**: Paste the `Client Secret` from Pocket ID.
4. Save the settings.
5. Test the OAuth login to ensure it works.
