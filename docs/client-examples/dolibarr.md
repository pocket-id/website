---
title: Dolibarr
description: Configure Dolibarr authentication with Pocket ID
---

> The following example uses `dolibarr.example.com` and `id.example.com`, make sure to update these to your server names.

1. In Pocket-ID create a new OIDC Client, name it i.e. `Dolibarr`
2. Set the callback url to: `https://dolibarr.example.com/core/modules/openid_connect/callback.php`, or leave blank to autofill on first login.
3. Copy the `Client ID`, `Client Secret`, `Authorization URL`, `Token URL`, `Userinfo URL` and `Logout URL` for the next steps.

## Dolibarr Setup

> [!WARNING]
> The email address between the Pocket ID and Dolibarr account have to match.

1. Login to Dolibarr as the admin user.
2. Go to **Home** -> **Setup** -> **Security** and select **OpenID authentication parameters**.
3. Enter the values for the fields as given below:
   - `Display Name` as 'Pocket ID' or something similar.
   - `Client Id` as the `Client ID` from above.
   - `Client secret` as the `Client Secret` from above.
   - `Scopes` as 'openid profile email'.
   - `Authorize URL` as `Authorization URL` from above.
   - `Token URL` as `Token URL` from above.
   - `User info URL` as `Userinfo URL` from above.
   - `Token URL` as `Token URL` from above.
   - `Logout URL` as `Logout URL` from above.
4. Edit the file `conf.php` to replace the current value of `dolibarr_main_authentication` with `openid_connect,dolibarr`.
5. Logout and test the OAuth based login.
