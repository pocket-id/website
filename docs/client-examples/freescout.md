---
id: freescout
---
# FreeScout

## Requirements

- [FreeScout OAuth Social Login Module](https://freescout.net/module/oauth-login/) (one-time fee)
- HTTPS connection to your FreeScout server

## Create OIDC Client in Pocket ID
1. Create a new OIDC Client in Pocket ID (e.g., `freescout`).
2. Set the **Callback URL** to the value below. After creating the OAuth provider (in the next section), update this to the generated **Redirect URI** from FreeScout:
    ```
    https://<FREESCOUT-DOMAIN>/oauth-login/callback/*
    ```
3. *Optional:* Download a PNG or SVG **logo** from the [FreeScout project](https://github.com/freescout-help-desk/freescout/tree/dist/public/img) and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Configure FreeScout
1. Open FreeScout and navigate to:
   **`Manage > Settings > OAuth`**
2. Enable the **Active** checkmark.
3. Fill in the required fields:
   - **Provider**: Choose `Custom Oauth Provider`
   - **Name**: Type in `Pocket ID` or similar.
   - **Redirect URI**: Copy and paste this to the **Callback URLs** field in Pocket ID (from first section).
   - **Logout URI**: Leave the generated value provided by FreeScout.
   - **Client ID**: Paste the `Client ID` from Pocket ID.
   - **Client Secret**: Paste the `Client Secret` from Pocket ID.
   - **Authorization URL**: Paste the `Authorization URL` from Pocket ID.
   - **Token URL**: Paste the `Token URL` from Pocket ID.
   - **User Info URL**: Paste the `Userinfo URL` from Pocket ID.
   - **User Info Method**: Choose `POST`.
   - **Proxy URL, Field Mappings, Scopes**: Leave blank (unless otherwise necessary for your environment).
5. Save the settings.
6. Test the OAuth login to ensure it works.

### Optional Config

- If desired, enable the **Auto-Create Users** option, to auto create non-existing users in FreeScout from Pocket ID.

- If desired, enable the **Force OAuth Login** option, to force using Pocket ID. Do not enable this until fully tested. To disable review the [module documentation](https://freescout.net/module/oauth-login/).

- Enabling **Debug Mode** is useful for examining the OAuth transaction in the FreeScout logs. You can disable when tested.