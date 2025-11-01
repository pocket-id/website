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
3. Set the callback URL to: `https://arcane.example.com/auth/oidc/callback`, or leave blank to autofill on first login.
4. Copy the Client ID, Client Secret, Authorization URL, Token URL, and Certificate URL for the next steps.

## Arcane Setup

Arcane has two methods of setting up OIDC, via Environment Variables or via the UI

### UI

1. Go to **Settings → Authentication** in Arcane
2. Enter your OIDC provider details:
   - **Issuer URL**: `https://id.example.com` (No trailing slash)
   - **Client ID**: Your Client ID from Pocket ID
   - **Client Secret**: Your Client Secret from Pocket ID
   - **Redirect URI**: `https://arcane.example.com/auth/oidc/callback`
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
OIDC_ADMIN_CLAIM="groups"
OIDC_ADMIN_VALUE="_example_admin_group"
```

> [!NOTE]
> The example above includes `groups` in the scopes and uses `OIDC_ADMIN_CLAIM` and `OIDC_ADMIN_VALUE` to automatically grant admin permissions based on group membership. These are optional and can be omitted if you don't need automatic admin provisioning.
