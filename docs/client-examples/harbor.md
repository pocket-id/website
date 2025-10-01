---
title: Harbor
description: Configure Harbor open source registry with Pocket ID
---

Below URLs are used as placeholders for the [Harbor](https://goharbor.io/) and Pocket ID instances. Replace them with the actual URLs.

- harbor.example.com (The url of your Harbor instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `Harbor` (or any name you prefer).
2. Set the callback URL to: `https://harbor.example.com/c/oidc/callback`
3. Set the launch URL to: `https://harbor.example.com`
4. Check `PKCE`
5. (Optional) Set a logo for the OIDC client.
6. Copy the `Client ID` and `Client Secret` for the next steps.

## Harbor Setup

1. Login to Harbor as the admin user.
2. Go to **Administration** -> **Configuration** and select **Authentication**.
3. Enter the values for the fields as given below:
   - `Auth Mode` as `OIDC`
   - `Primary Auth Mode` checked if Pocket ID should be the primary authentication
   - `OIDC Provider Name` as `Pocket ID` or something similar.
   - `OIDC Endpoint` as `pocketid.example.com`
   - `OIDC Client ID` as the `Client ID` from above.
   - `OIDC Client Secret` as the `Client Secret` from above.
   - `OIDC Group Filter` leave blank
   - `Group Claim Name` as `groups`
   - `OIDC Admin Group` set to a Pocket ID group for administrators (e.g. `admin`) or leave blank
   - `OIDC Scope` set as `openid,offline_access,email,profile,groups`
   - `Verify Certificate` checked.
   - `Automatic onboarding` checked (or unchecked if you want user to change username).
   - `OIDC Session Logout` checked.
   - `Username Claim` as `email`
4. Save the settings.
5. Test OIDC server
6. Logout and test the OAuth based login.

## Hints

- `Username Claim` can be any other value (e.g. leave empty for `name` or set `sub`, `email`, ...) in the claim, depends how your user should be named.
- Use `OIDC Group Filter` if not all of your Pocket ID user should access the registry.
- See [Configure OIDC Provider Authentication](https://goharbor.io/docs/2.13.0/administration/configure-authentication/oidc-auth/) for further help

## Common problems

- In case you enabled primary authentication mode as `OIDC` and can't login, avoid the redirect by using `https://harbor.example.com/account/sign-in to login as local system administrator
- See warning in the Harbor documentation: _You can change the authentication mode from database to OIDC only if no local users have been added to the database. If there is at least one user other than admin in the Harbor database, you cannot change the authentication mode._
