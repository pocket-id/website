---
title: Patchmon
description: Configure OIDC authentication for Patchmon
---

The following example variables are used, and should be replaced with your actual URLs.

- `patchmon.example.com` (The URL of your patchmon frontend instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket-ID Setup

1. In Pocket-ID create a new OIDC Client, name it, for example `patchmon`
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URLs to: `https://patchmon.example.com/api/v1/auth/oidc/callback`, or leave blank to autofill on first login.
4. Enable **PKCE** for improved security.
5. Copy the `Client ID`, `Client Secret` and `OIDC-Discovery-URL` for use in the next steps.

## Patchmon Setup

Patchmon added OIDC SSO in Version 1.4.0

**This example uses the docker-compose deployment type of patchmon** See the [Official Docs](https://docs.patchmon.net/books/patchmon-application-documentation/page/setting-up-oidc-sso-single-sign-on-integration) for more information.

Add/edit the following lines to your patchmon `.env` file replacing the values with the ones you copied above:

```env
OIDC_ENABLED=true
OIDC_ISSUER_URL=<your OIDC-Discovery-URL from above>
OIDC_CLIENT_ID=<your client id from above>
OIDC_CLIENT_SECRET=<your client secret from above>
OIDC_REDIRECT_URI=https://patchmon.example.com/api/v1/auth/oidc/callback
OIDC_SCOPES=openid email profile
OIDC_AUTO_CREATE_USERS=true
OIDC_DEFAULT_ROLE=user
OIDC_DISABLE_LOCAL_AUTH=false
OIDC_BUTTON_TEXT=Login with PocketID
OIDC_SYNC_ROLES=false
```

Save and redeploy patchmon and you should be able to login using OIDC with Pocket ID.

### Group Claim

If you want to automatically assign permissions based on group membership.
Group matching is case-insensitive, so patchmon admins matches PatchMon Admins

#### Pocket-ID Groups

Create groups for everey role, which you want to use, via **User Groups → Add Group**. Add the users depending on what permissions you want them to have to the groups.
You only need to define the groups you intend to use. Any variables left unset are simply ignored.

#### Patchmon Group Environment Variables

Change the values of and add the roles you want to manage by pocketid.

- `OIDC_SCOPES` → `OIDC_SCOPES=openid email profile groups`
- `OIDC_SYNC_ROLES` → `OIDC_SYNC_ROLES=true`

```env
OIDC_ADMIN_GROUP=PatchMon Admins
OIDC_USER_GROUP=PatchMon Users
OIDC_SUPERADMIN_GROUP=PatchMon SuperAdmins
OIDC_HOST_MANAGER_GROUP=PatchMon Host Managers
OIDC_READONLY_GROUP=PatchMon Readonly
```

## Sources

- https://github.com/PatchMon/PatchMon/releases/tag/v1.4.0
- https://docs.patchmon.net/books/patchmon-application-documentation/page/setting-up-oidc-sso-single-sign-on-integration
