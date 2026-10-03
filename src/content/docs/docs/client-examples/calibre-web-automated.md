---
title: Calibre-Web Automated
description: Sign in to the Calibre-Web Automated e-book library with Pocket ID.
client:
  callbackUrls:
    - https://calibre-web-automated.example.com/login/generic/authorized
---

::create-client

## Configure Calibre-Web Automated through the UI

1. In Calibre-Web Automated, open **Admin Settings → Edit Basic Configuration**.
2. Under **Feature Configuration → Login type**, select `Use OAuth (requires HTTPS)`.
3. Fill in the fields:
   - **OAuth Metadata URL**: the **OIDC Discovery URL** from Pocket ID.
   - **OAuth Client ID**: the **Client ID** from Pocket ID.
   - **OAuth Client Secret**: the **Client secret** from Pocket ID.
4. Save the settings and sign in with OAuth to test it.
