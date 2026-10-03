---
title: Dolibarr
description: Sign in to the Dolibarr ERP and CRM with Pocket ID.
client:
  callbackUrls:
    - https://dolibarr.example.com/core/modules/openid_connect/callback.php
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
---

::create-client

## Configure Dolibarr

:::caution
The email addresses of the Pocket ID and Dolibarr accounts must match.
:::

1. Log in to Dolibarr as the admin user.
2. Open **Home → Setup → Security** and select **OpenID authentication parameters**.
3. Fill in the fields:
   - **Display Name**: `Pocket ID` or something similar.
   - **Client Id**: the **Client ID** from Pocket ID.
   - **Client secret**: the **Client secret** from Pocket ID.
   - **Scopes**: `openid profile email`
   - **Authorize URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **User info URL**: the **Userinfo URL** from Pocket ID.
   - **Logout URL**: the **Logout URL** from Pocket ID.
4. In the file `conf.php`, replace the current value of `dolibarr_main_authentication` with `openid_connect,dolibarr`.
5. Log out and sign in with Pocket ID to test it.
