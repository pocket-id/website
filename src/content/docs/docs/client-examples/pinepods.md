---
title: Pinepods
description: Sign in to the Pinepods podcast manager with Pocket ID.
client:
  callbackUrls:
    - https://pinepods.example.com/api/auth/callback
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

::create-client

## Configure Pinepods

OIDC can be configured through the UI or through environment variables.
Environment variables require version 0.8.2+.

### Using the UI

Only admin users can configure OIDC/SSO settings.

1. Open Pinepods and navigate to **Settings → Admin Settings → OIDC/SSO Settings**.
2. Fill in the required fields:
   - **Provider Name**: `Pocket ID`
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Authorization URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **User Info URL**: the **Userinfo URL** from Pocket ID.
3. _(Optional)_ Change the button text, for example to `Login with Pocket ID`.

### Using environment variables

This method requires Pinepods v0.8.2+.

Check out the [Pinepods documentation](https://www.pinepods.online/docs/tutorial-basics/environment-variables#oidc-openid-connect-configuration) for the full list of available environment variables.

Example config using a `.env` file:

```sh
# Basic OIDC Configuration
OIDC_PROVIDER_NAME: "Pocket ID"
OIDC_CLIENT_ID: "<client-id>"
OIDC_CLIENT_SECRET: "<client-secret>"
OIDC_AUTHORIZATION_URL: "https://id.example.com/oauth2/authorize"
OIDC_TOKEN_URL: "https://id.example.com/oauth2/token"
OIDC_USER_INFO_URL: "https://id.example.com/oauth2/userinfo"

# Optional OIDC Customization
OIDC_BUTTON_TEXT: "Login with Pocket ID"
OIDC_SCOPE: "openid email profile groups"
OIDC_BUTTON_COLOR: "#1a365d"
OIDC_BUTTON_TEXT_COLOR: "#ffffff"

# Role Mapping
OIDC_ROLES_CLAIM: "groups"
OIDC_USER_ROLE: "pinepods-users"
OIDC_ADMIN_ROLE: "pinepods-admins"

# Disable standard login (optional)
OIDC_DISABLE_STANDARD_LOGIN: true
```
