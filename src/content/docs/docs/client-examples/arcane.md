---
title: Arcane
description: Sign in to the Arcane Docker manager with Pocket ID.
client:
  callbackUrls:
    - https://arcane.example.com/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

::create-client

If you use the Arcane iOS app, also add the callback URL `arcane-mobile://oidc-callback`.

## Configure Arcane

You can set up OIDC in Arcane through the UI or with environment variables.

### UI

1. In Arcane, open **Settings → Authentication**.
2. Enter the OIDC provider details:
   - **Issuer URL**: `https://id.example.com` (no trailing slash).
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
3. Save the settings and test the connection.
   The UI guides you through any missing or invalid fields.

### Environment variables

You can also configure OIDC with environment variables in your Arcane compose file:

```ini
OIDC_ENABLED=true
APP_URL=https://arcane.example.com
OIDC_CLIENT_ID="<client-id>"
OIDC_CLIENT_SECRET="<client-secret>"
OIDC_ISSUER_URL="https://id.example.com"
OIDC_SCOPES="openid email profile groups"
OIDC_GROUPS_CLAIM=groups
OIDC_ROLE_MAPPINGS=[{"claimValue":"_example_admin_group","roleId":"role_admin"}]
```

:::note
The example above includes `groups` in the scopes and uses `OIDC_GROUPS_CLAIM` and `OIDC_ROLE_MAPPINGS` to assign roles based on group membership automatically.
`OIDC_ROLE_MAPPINGS` takes a JSON array that maps a `claimValue` (the **Name** of a Pocket ID group) to a `roleId` (such as `role_admin`).
These variables are optional, and you can omit them if you don't need automatic role provisioning.
:::
