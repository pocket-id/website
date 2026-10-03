---
title: Dockhand
description: Sign in to Dockhand with Pocket ID.
client:
  callbackUrls:
    - https://dockhand.example.com/api/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

::create-client

For a local Docker installation of Dockhand, the callback URL can also use the local IP address with `http` and the Dockhand port, for example `http://192.168.x.xxx:3866/api/auth/oidc/callback`.

## Configure Dockhand

1. In Dockhand, open **Settings → Authentication → SSO / OIDC** and click **+Add Provider**.
2. Fill in the fields:

   | Field              | Description                             | Example                                               |
   | ------------------ | --------------------------------------- | ----------------------------------------------------- |
   | Name               | Display name                            | `Pocket ID`                                           |
   | Issuer URL         | The URL of Pocket ID                    | `https://id.example.com`                              |
   | Client ID          | The **Client ID** from Pocket ID        | `<client-id>`                                         |
   | Client Secret      | The **Client secret** from Pocket ID    | `<client-secret>`                                     |
   | Redirect URI       | The callback URL you added in Pocket ID | `https://dockhand.example.com/api/auth/oidc/callback` |
   | Scopes             | Scopes requested from Pocket ID         | `openid profile email`                                |
   | Username claim     | Username claim                          | `preferred_username`                                  |
   | Email claim        | Email claim                             | `email`                                               |
   | Display name claim | Display name claim                      | `name`                                                |

When you access a local Dockhand installation, the **Redirect URI** in the Dockhand SSO / OIDC settings can be `http://192.168.x.xxx:3866/api/auth/oidc/callback` without HTTPS.
