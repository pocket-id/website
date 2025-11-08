---
title: Pinepods
description: Configure Pinepods with Pocket ID authentication
---

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Pinepods`).
2. Set the Callback URL to `https://<pinepods-url>/api/auth/callback`, or leave blank to autofill on first login.
3. Copy the **Client ID**, **Client Secret**, **Authorization URL**, **Token URL**, and **Userinfo URL**.
4. _(Optional)_ Find and upload a logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)

## Configure OIDC in PinePods

OIDC configuration can be done through the UI or through environment variables, the latter method requires version 0.8.2+.

### Using the UI

Note: Only Admin users can configure OIDC/SSO settings.

1. Open Pinepods and navigate to: **`Settings > Admin Settings > OIDC/SSO Settings`**
2. Fill in the required fields:
    - **Provider Name**: Set to `Pocket ID`.
    - **Client ID**: Paste the `Client ID` from Pocket ID.
    - **Client Secret**: Paste the `Client Secret` from Pocket ID.
    - **Authorization URL**: Paste the `Authorization URL` from Pocket ID.
    - **Token URL**: Paste the `Token URL` from Pocket ID.
    - **User Info URL**: Paste the `Userinfo URL` from Pocket ID.
3. _(Optional)_ Update button text e.g. _Login with Pocket ID_

### Using environment variables

Note: This method requires PinePods v0.8.2+

Check out [PinePods](https://www.pinepods.online/docs/tutorial-basics/environment-variables#oidc-openid-connect-configuration) documentation for the full list of available environment variables.

Example config using a `.env` file:

```sh
# Basic OIDC Configuration
OIDC_PROVIDER_NAME: "Pocket ID"
OIDC_CLIENT_ID: "your-client-id"
OIDC_CLIENT_SECRET: "your-client-secret"
OIDC_AUTHORIZATION_URL: "https://your.domain/oauth2/authorize"
OIDC_TOKEN_URL: "https://your.domain/oauth2/token"
OIDC_USER_INFO_URL: "https://your.domain/oauth2/userinfo"

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
