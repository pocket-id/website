---
title: Gameyfin
description: Configure Gameyfin with Pocket ID authentication
---

## Create an OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Gameyfin`).
2. Set the Client Launch URL to `https://<your-gameyfin-domain>/login`.
3. Set the Callback URL to `https://<your-gameyfin-domain>/login/oauth2/code/oidc`, or leave blank to autofill on first login.
4. _(Optional)_ Find and upload a logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons).

## Create User Groups in Pocket ID

1. Create two user groups in Pocket ID (`User Groups > Add Group`), one for `superadmins` and one for `admins`:

   - **Friendly name**: Fill out to your liking.
   - **Name**: Use the generated one or change it if you want.

2. Click `Save` and then add a custom claim to each group (`Custom Claims > Add custom claim`):

   - **Key**: roles
   - **Value**: For the superadmin group use `["GAMEYFIN_SUPERADMIN"]`, and for the admin group use `["GAMEYFIN_ADMIN"]`.

3. Click `Save` to create the custom claim.
4. Add your users to their respective groups in Pocket ID. Users that are not in either group will automatically be assigned the "User" role.

## Configure Gameyfin

1. Go to Gameyfin's SSO settings page (`Administration > SSO`), enable SSO and fill out the SSO provider configuration with the values from Pocket ID.

   Pocket ID does not display an "Issuer URL" directly, use the domain of your Pocket-ID instance without a trailing slash (/).
   You can use "Auto-populate" to fill most the values automatically or copy them manually from Pocket ID.

   - **Client ID**: Client ID from Pocket ID.
   - **Client secret**: Client secret from Pocket ID.
   - **Issuer URL**: `https://<your-pocket-id-domain>`
   - **Authorize URL**: The Authorization URL from Pocket ID.
   - **Token URL**: The Token URL from Pocket ID.
   - **Userinfo URL**: The Userinfo URL from Pocket ID.
   - **Logout URL**: The Logout URL from Pocket ID.
   - **JWKS URL**: The JWKS URL from Pocket ID.

2. Restart Gameyfin.
