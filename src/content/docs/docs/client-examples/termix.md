---
title: Termix
description: Configure Termix with Pocket ID authentication
---

The following example variables are used, and should be replaced with your actual URLS.

- termix.example.com (The url of your [Termix](https://termix.site/) instance)
- id.example.com (The url of your Pocket ID instance)

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Termix`.
2. Set the callback URL to: `https://termix.example.com/users/oidc/callback` as recommended by Termix' documentation.
3. _(Optional)_ Upload a logo for your website or download the termix logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)
4. Copy the `Client ID`, `Client Secret`, `Issuer URL`, `Authorization URL`, `Token URL` and `Userinfo URL` for use in the next steps.
5. _(Optional)_ Create a user group `termix-admin` and add the users that should become admins in Termix

## Termix Setup

You can set this up in the GUI, or you can use environment variables.

### GUI

In the GUI, you can configure multiple OIDC clients.

1. Login to Termix as an Administrator
2. Click your admin username in the bottom-left corner and open the Admin Settings interface.
3. Navigate to the _SSO PROVIDERS_ tab.
4. Click _Add provider_
5. Set the following settings:
   - `Display name`: `Pocket ID`
   - `Client ID`: Client ID from Pocket ID
   - `Client Secret`: Client secret from Pocket ID
   - `Issuer URL`: Issuer URL from Pocket ID
   - `Authorization URL`: Authorization URL from Pocket ID
   - `Token URL`: Token URL from Pocket ID
   - _(Optional)_ If you would like to configure the admins from Pocket ID:
     - Add `groups` to the `Scopes` field. It should become `openid email profile groups`
     - `Group claim`: `groups`
     - `Admin group`: `termix-admin`
6. Click _Save Provider_.

### Environment variables

Set the following environment variables in your `.env`

```
OIDC_CLIENT_ID=xxxxxxxxxxx
OIDC_CLIENT_SECRET=yyyyyyyyyyy
OIDC_ISSUER_URL=https://id.example.com
OIDC_AUTHORIZATION_URL=https://id.example.com/authorize
OIDC_TOKEN_URL=https://id.example.com/api/oidc/token
OIDC_USERINFO_URL=https://id.example.com/api/oidc/userinfo
```

_(Optional)_ If you would like to configure the admins from Pocket ID

```
OIDC_SCOPES=openid email profile groups
OIDC_ADMIN_GROUP=termix-admin
```

## Known issues
_**NOTE**  be careful with the option `General - Silent OIDC Login by Default` because it could sent your application in a infinite loop_