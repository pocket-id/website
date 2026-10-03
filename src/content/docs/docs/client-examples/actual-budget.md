---
title: Actual Budget
description: Sign in to the Actual Budget personal finance app with Pocket ID.
client:
  callbackUrls:
    - https://actual.example.com/openid/callback
---

## Requirements

- [Actual Budget](https://actualbudget.org/docs/config/oauth-auth) client and server version `25.1.0` or higher
- HTTPS connection to your Actual server

::create-client

## Configure Actual using the UI

1. Click **Start using OpenID**.
2. Fill in the fields:
   - **OpenID Provider**: choose `Other`.
   - **Provider URL**: the **OIDC Discovery URL** from Pocket ID, or the Pocket ID URL (`https://id.example.com`).
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
3. Click **OK** and you will be redirected to the login page.
4. Enter your existing file password and sign in with OpenID to test it.
   The first user who signs in successfully becomes the administrator.

## Multiple users

After setting up the integration, you can manage users in Actual by following [these instructions](https://actualbudget.org/docs/config/multi-user).

## Configure Actual with other methods

You can also configure OpenID with the following methods.
Check out Actual's documentation for more information.

- [Environment variables](https://actualbudget.org/docs/config/oauth-auth#configuration-using-environment-variables)
- [Configuration file](https://actualbudget.org/docs/config/oauth-auth#configuration-using-a-configuration-file)

**Example with `.env`:**

```ini
ACTUAL_OPENID_DISCOVERY_URL=https://id.example.com
ACTUAL_OPENID_CLIENT_ID=<client-id>
ACTUAL_OPENID_CLIENT_SECRET=<client-secret>
```

**Example with `config.json`:**

```json
"openId": {
        "discoveryURL": "https://id.example.com",
        "client_id": "<client-id>",
        "client_secret": "<client-secret>",
        "server_hostname": "https://actual.example.com",
        "authMethod": "openid" // or "oauth2"
    }
```
