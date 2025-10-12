---
title: Outline
description: Set up Outline wiki with Pocket ID OIDC
---

Setting up [Outline](https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I) to authenticate with Pocket ID can be accomplished with the configuration below.

Your Outline and Pocket ID server URLs must both use HTTPS.

## Create OIDC Client

1. Login to your **Pocket ID** server as an admin
1. Go to **OIDC Clients** and click **Add OIDC Client**
1. Set an app **Name** like `Outline`
1. Set the **Callback URL** to the following, or leave blank to autofill on first login.
   `https://outline.yourdomain.com/*`
1. Upload a **Logo** if desired
1. Click **Save**. Then copy these values for later:
   - Client ID
   - Client Secret
   - Authorization URL
   - Token URL
   - Userinfo URL
   - Logout URL

## Configure Outline for OIDC

To configure Outline, use the following variables to utilize OpenID Connect.

1. Add the following to your **Outline** container `docker.env`:

   ```
   OIDC_CLIENT_ID=Client ID
   OIDC_CLIENT_SECRET=Client Secret
   OIDC_AUTH_URI=Authorization URL
   OIDC_TOKEN_URI=Token URL
   OIDC_USERINFO_URI=Userinfo URL
   OIDC_LOGOUT_URI=Logout URL

   OIDC_DISPLAY_NAME=Pocket ID
   OIDC_USERNAME_CLAIM=preferred_username
   OIDC_SCOPES=openid profile email groups
   ```

1. Restart your **Outline** container:

   ```bash
   docker compose down
   docker compose up -d
   ```

1. Login to **Outline** with your Pocket ID
1. Review and update SSO settings at:
   **Settings > Workspace > Security**
