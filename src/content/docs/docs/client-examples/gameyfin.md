---
title: Gameyfin
description: Sign in to the Gameyfin game library manager with Pocket ID.
client:
  callbackUrls:
    - https://gameyfin.example.com/login/oauth2/code/oidc
  launchUrl: https://gameyfin.example.com/login
  values:
    - clientId
    - clientSecret
    - issuerUrl
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
    - certificateUrl
---

::create-client

## Create groups in Pocket ID

1. In Pocket ID, open **Administration → User Groups** and click **Add Group** to create two groups, one for `superadmins` and one for `admins`:
   - **Friendly Name**: fill out to your liking.
   - **Name**: use the generated one or change it if you want.
2. Save each group, then add a custom claim on each group's page under **Custom Claims**:
   - **Key**: `roles`
   - **Value**: `["GAMEYFIN_SUPERADMIN"]` for the superadmin group and `["GAMEYFIN_ADMIN"]` for the admin group.
3. Save the custom claim.
4. Add your users to their respective groups in Pocket ID.
   Users that are in neither group are automatically assigned the "User" role.

## Configure Gameyfin

1. Open Gameyfin's SSO settings page (**Administration → SSO**), enable SSO and fill out the SSO provider configuration with the values from Pocket ID.
   You can use **Auto-populate** to fill most of the values automatically, or copy them manually from Pocket ID.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client secret**: the **Client secret** from Pocket ID.
   - **Issuer URL**: the **Issuer URL** from Pocket ID, for example `https://id.example.com`, without a trailing slash.
   - **Authorize URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **Userinfo URL**: the **Userinfo URL** from Pocket ID.
   - **Logout URL**: the **Logout URL** from Pocket ID.
   - **JWKS URL**: the **Certificate URL** from Pocket ID.
2. Restart Gameyfin.
