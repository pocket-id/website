---
title: Arcane
description: Setup OIDC Auth with Arcane
---

The following example variables are used, and should be replaced with your actual URLS.

- arcane.example.com (The url of your Arcane instance.)
- id.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Arcane`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://arcane.example.com/auth/oidc/callback`

> [!NOTE]
> If using the Arcane iOS app also add `arcane-mobile://oidc-callback` as a callback url.

## Arcane Setup

Arcane has two methods of setting up OIDC, via Environment Variables or via the UI

### UI

1. Go to **Settings → Authentication** in Arcane
2. Enter your OIDC provider details:
   - **Issuer URL**: `https://id.example.com` (No trailing slash)
   - **Client ID**: Your Client ID from Pocket ID
   - **Client Secret**: Your Client Secret from Pocket ID
3. Save and test the connection
4. The UI will guide you through any missing or invalid fields

### Environment Variables

You can also configure OIDC using environment variables in your Arcane compose file:

```env
OIDC_ENABLED=true
APP_URL=https://arcane.example.com
OIDC_CLIENT_ID="your_arcane_client_id_from_provider"
OIDC_CLIENT_SECRET="your_super_secret_client_secret_from_provider"
OIDC_ISSUER_URL="https://id.example.com"
OIDC_SCOPES="openid email profile groups"
OIDC_GROUPS_CLAIM=groups
OIDC_ROLE_MAPPINGS=[{"claimValue":"_example_admin_group","roleId":"role_admin"}]
```

> [!NOTE]
> The example above includes `groups` in the scopes and uses `OIDC_GROUPS_CLAIM` and `OIDC_ROLE_MAPPINGS` to automatically assign roles based on group membership. `OIDC_ROLE_MAPPINGS` takes a JSON array mapping a `claimValue` (the group name from your Pocket ID) to a `roleId` (such as `role_admin`). These are optional and can be omitted if you don't need automatic role provisioning.
