---
title: PatchMon
description: Sign in to PatchMon with Pocket ID.
client:
  callbackUrls:
    - https://patchmon.example.com/api/v1/auth/oidc/callback
  pkce: true
---

Replace `patchmon.example.com` with the domain of your PatchMon frontend and `id.example.com` with the domain of your Pocket ID instance.

## Requirements

- PatchMon 1.4.0 or later (PatchMon added OIDC SSO in version 1.4.0)

::create-client

## Configure PatchMon

This example uses the Docker Compose deployment of PatchMon.
See the [official docs](https://docs.patchmon.net/books/patchmon-application-documentation/page/setting-up-oidc-sso-single-sign-on-integration) for more information.

1. Add or edit the following lines in your PatchMon `.env` file, with the **OIDC Discovery URL**, **Client ID** and **Client secret** from Pocket ID:

   ```ini
   OIDC_ENABLED=true
   OIDC_ISSUER_URL=<your OIDC-Discovery-URL from above>
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   OIDC_REDIRECT_URI=https://patchmon.example.com/api/v1/auth/oidc/callback
   OIDC_SCOPES=openid email profile
   OIDC_AUTO_CREATE_USERS=true
   OIDC_DEFAULT_ROLE=user
   OIDC_DISABLE_LOCAL_AUTH=false
   OIDC_BUTTON_TEXT=Login with PocketID
   OIDC_SYNC_ROLES=false
   ```

2. Save and redeploy PatchMon, then sign in with Pocket ID to test it.

## Group claim

You can automatically assign permissions based on group membership.
Group matching is case-insensitive, so `patchmon admins` matches `PatchMon Admins`.

### Create groups in Pocket ID

1. In Pocket ID, open **Administration → User Groups** and click **Add Group** to create a group for every role you want to use.
2. Add users to the groups depending on the permissions you want them to have.

You only need to define the groups you intend to use.
Any variables left unset are ignored.

### PatchMon group environment variables

Change these values in your `.env` file:

- `OIDC_SCOPES` → `OIDC_SCOPES=openid email profile groups`
- `OIDC_SYNC_ROLES` → `OIDC_SYNC_ROLES=true`

Then add the groups for the roles you want to manage with Pocket ID:

```ini
OIDC_ADMIN_GROUP=PatchMon Admins
OIDC_USER_GROUP=PatchMon Users
OIDC_SUPERADMIN_GROUP=PatchMon SuperAdmins
OIDC_HOST_MANAGER_GROUP=PatchMon Host Managers
OIDC_READONLY_GROUP=PatchMon Readonly
```

## Sources

- https://github.com/PatchMon/PatchMon/releases/tag/v1.4.0
- https://docs.patchmon.net/books/patchmon-application-documentation/page/setting-up-oidc-sso-single-sign-on-integration
