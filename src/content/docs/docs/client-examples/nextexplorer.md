---
title: nextExplorer
description: Configure nextExplorer file manager with PocketID.
---
The following example variables are used, and should be replaced with your actual URLs.

    id.example.com (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it i.e. `nextExplorer`
2. Copy the Client ID and Client Secret for use in the next steps.

## nextExplorer Setup

Set the following environment variables:

    OIDC_ENABLED: true
    OIDC_ISSUER: https://id.example.com
    OIDC_CLIENT_ID: <POCKET_ID_CLIENT_ID>
    OIDC_CLIENT_SECRET: <POCKET_ID_SECRET>
    OIDC_SCOPES: "openid profile email"
    OIDC_ADMIN_GROUPS: <Admin group in PocketID>
    OIDC_REQUIRE_EMAIL_VERIFIED: true/false
    OIDC_AUTO_CREATE_USERS: true/false
    AUTH_MODE: oidc/local/both/disabled
    
Setting AUTH_MODE will configure the authentication flow:
  - oidc sets it to OIDC only and disables local passwords.
  - local sets it to username/password and disables OIDC from showing.
  - both allows choice between OIDC and local login.
  - disabled turns off the login page entirely.

Start the instance and test to see if login now works via OIDC.

More details can be found in nextExplorer's documentation [here](https://explorer.nxz.ai/integrations/oidc.html).
