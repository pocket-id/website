---
title: LinkAce
description: Configure LinkAce bookmark archive with PocketID.
---
The following example variables are used, and should be replaced with your actual URLs.

    id.example.com (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it i.e. `LinkAce`
2. Copy the Client ID and Client Secret for use in the next steps.

## LinkAce Setup

Set the following environment variables:

    SSO_ENABLED: true
    SSO_OIDC_ENABLED: true
    SSO_OIDC_BASE_URL: https://id.example.com
    SSO_OIDC_CLIENT_ID: <POCKET_ID_CLIENT_ID>
    SSO_OIDC_CLIENT_SECRET: <POCKET_ID_SECRET>
    SSO_OIDC_SCOPES: "openid profile email"