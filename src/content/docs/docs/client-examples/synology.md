---
title: Synology
description: Sign in to Synology DSM with Pocket ID.
client:
  callbackUrls:
    - https://synology.example.com/
---

Replace `synology.example.com` with the URL of your Synology instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Synology

1. Open the Synology DSM web interface and open **Control Panel**.
2. Choose **Domain/LDAP** on the left side, then choose the **SSO Client** tab at the top.
3. Below the **Services** heading, check **Enable OpenID Connect SSO service**.
4. Click **OpenID Connect SSO Settings** to open the configuration dialog.
5. Set **Profile** to `OIDC`.
6. Set **Account type** to `Domain/LDAP/local`.
7. Set **Name** to `PocketID`.
8. Paste the **OIDC Discovery URL** from Pocket ID into the **Well-known URL** field.
9. Paste the **Client ID** from Pocket ID into the **Application ID** field.
10. Paste the **Client secret** from Pocket ID into the **Application secret** field.
11. Set **Redirect URL** to `https://synology.example.com`.
12. Set **Authorization scope** to `openid email profile`.
13. Set **Username claim** to `preferred_username`.
    This uses the user's username instead of the email.
    If the Pocket ID username matches the local Synology DSM account name, the user signs in as the existing user.
14. Click **Save**.
15. Click **Apply** on the **Control Panel** page.
16. Sign out and sign back in to test it.
    The login page now has an **SSO Authentication** tab that lets you **Continue with PocketID**.
