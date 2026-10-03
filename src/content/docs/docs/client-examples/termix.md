---
title: Termix
description: Sign in to the Termix server management platform with Pocket ID.
client:
  callbackUrls:
    - https://termix.example.com/users/oidc/callback
  values:
    - clientId
    - clientSecret
    - issuerUrl
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

Replace `termix.example.com` with the URL of your [Termix](https://termix.site/) instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

_(Optional)_ To manage Termix admins from Pocket ID, open **Administration → User Groups**, click **Add Group**, create a group named `termix-admin` and add the users that should become admins in Termix.

## Configure Termix

You can set this up in the GUI or with environment variables.

### GUI

In the GUI, you can configure multiple OIDC clients.

1. Log in to Termix as an administrator.
2. Click your admin username in the bottom-left corner and open the **Admin Settings** interface.
3. Open the **SSO PROVIDERS** tab.
4. Click **Add provider**.
5. Set the following settings:
   - **Display name**: `Pocket ID`
   - **Client ID**: the **Client ID** from Pocket ID
   - **Client Secret**: the **Client secret** from Pocket ID
   - **Issuer URL**: the **Issuer URL** from Pocket ID
   - **Authorization URL**: the **Authorization URL** from Pocket ID
   - **Token URL**: the **Token URL** from Pocket ID
   - _(Optional)_ To configure the admins from Pocket ID:
     - Add `groups` to the **Scopes** field, so that it becomes `openid email profile groups`.
     - **Group claim**: `groups`
     - **Admin group**: `termix-admin`
6. Click **Save Provider**.

### Environment variables

Set the following environment variables in your `.env` file:

```ini
OIDC_CLIENT_ID=<client-id>
OIDC_CLIENT_SECRET=<client-secret>
OIDC_ISSUER_URL=https://id.example.com
OIDC_AUTHORIZATION_URL=https://id.example.com/authorize
OIDC_TOKEN_URL=https://id.example.com/api/oidc/token
OIDC_USERINFO_URL=https://id.example.com/api/oidc/userinfo
```

_(Optional)_ To configure the admins from Pocket ID, also set:

```ini
OIDC_SCOPES=openid email profile groups
OIDC_ADMIN_GROUP=termix-admin
```

## Known issues

Be careful with the option **General - Silent OIDC Login by Default**, because it can send your application into an infinite loop.
