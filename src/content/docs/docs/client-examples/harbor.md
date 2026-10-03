---
title: Harbor
description: Sign in to the Harbor container registry with Pocket ID.
client:
  callbackUrls:
    - https://harbor.example.com/c/oidc/callback
  pkce: true
  launchUrl: https://harbor.example.com
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Harbor

1. Log in to [Harbor](https://goharbor.io/) as the admin user.
2. Open **Administration → Configuration** and select **Authentication**.
3. Fill in the fields:
   - **Auth Mode**: `OIDC`
   - **Primary Auth Mode**: checked if Pocket ID should be the primary authentication.
   - **OIDC Provider Name**: `Pocket ID` or something similar.
   - **OIDC Endpoint**: `https://id.example.com`
   - **OIDC Client ID**: the **Client ID** from Pocket ID.
   - **OIDC Client Secret**: the **Client secret** from Pocket ID.
   - **OIDC Group Filter**: leave blank.
   - **Group Claim Name**: `groups`
   - **OIDC Admin Group**: a Pocket ID group for administrators (e.g. `admin`), or leave blank.
   - **OIDC Scope**: `openid,offline_access,email,profile,groups`
   - **Verify Certificate**: checked.
   - **Automatic onboarding**: checked (or unchecked if you want users to change their username).
   - **OIDC Session Logout**: checked.
   - **Username Claim**: `email`
4. Save the settings.
5. Test the OIDC server.
6. Log out and sign in with Pocket ID to test it.

## Hints

- **Username Claim** can be any other claim (e.g. leave it empty for `name`, or set `sub`, `email`, ...), depending on how your users should be named.
- Use **OIDC Group Filter** if not all of your Pocket ID users should access the registry.
- See [Configure OIDC Provider Authentication](https://goharbor.io/docs/2.13.0/administration/configure-authentication/oidc-auth/) for further help.

## Common problems

- If you set the primary authentication mode to `OIDC` and can't log in, avoid the redirect by using `https://harbor.example.com/account/sign-in` to log in as the local system administrator.
- See the warning in the Harbor documentation: _You can change the authentication mode from database to OIDC only if no local users have been added to the database. If there is at least one user other than admin in the Harbor database, you cannot change the authentication mode._
