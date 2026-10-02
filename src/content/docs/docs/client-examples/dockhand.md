---
title: Dockhand
description: Configure Dockhand with Pocket ID authentication
---

## Create the Dockhand OIDC Client in PocketID

### Required Settings

- **Callback-URL:** `https://your-dockhand-url/api/auth/oidc/callback`
- **Grant Type:** `Authorization Code`
- **Scopes:** `openid`, `profile`, `email`

The Callback-URL in a local docker installation of Dockhand can also be the local IP address with http and the port of Dockhand, for example 'http://192.168.x.xxx:3866/api/auth/oidc/callback'

### Copy the ID and Client Secret from PocketID

- **Client ID**
- **Client Secret**

---

## Configuration of PocketID in Dockhand

The SSO settings in Dockhand are in the Settings menu of Authentication and then SSO / OIDC and then +Add Provider

### Configuration

| Field              | Description                          | Example                                            |
| ------------------ | ------------------------------------ | -------------------------------------------------- |
| Name               | Display name                         | `"PocketID"`                                       |
| Issuer URL         | The URL of PocketID                  | `https://pocketid.example.com`                     |
| Client ID          | From PocketID                        | `client-id`                                        |
| Client Secret      | From PocketID                        | `secret`                                           |
| Redirect URI       | Dockhand Callback URL from Pocket ID | `https://your-dockhand-url/api/auth/oidc/callback` |
| Scopes             | Scopes from PocketID                 | openid profile email                               |
| Username claim     | Username claim                       | preferred_username                                 |
| Email claim        | Email claim                          | email                                              |
| Display name claim | Display name claim                   | name                                               |

Attention: When accessing a local Dockhand installation, then the Callback URL in the Dockhand SSO / OIDC settings can be 'http://192.168.x.xxx:3866/api/auth/oidc/callback' without https!
