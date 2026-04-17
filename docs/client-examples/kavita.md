---
title: Kavita
description: Setup OIDC Auth with Kavita
---

The following example variables are used, and should be replaced with your actual URLS.

- kavita.example.com (The url of your Kavita instance.)
- id.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Kavita`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://kavita.example.com/signin-oidc`, or leave blank to autofill on first login.
4. Set the Logout Callback URL to: `https://kavita.example.com/signout-callback-oidc`

## Kavita Setup

1. Go to **Settings → Server → OpenID Connect** in Kavita.
2. Enter your OIDC provider details:
   - **Authority**: `https://id.example.com` (No trailing slash)
   - **Client ID**: Your Client ID from Pocket ID
   - **Client Secret**: Your Client Secret from Pocket ID
   - Optional: **Provider name**: Change to `Pocket ID` if you wish.
3. Save and restart the Kavita server for the settings to take effect.
> Note: If Require verified emails is enabled, you will need to enable the Emails Verified configuration in Pocket ID -> Administration -> Application Configuration to ensure the user can login.
4. Test logging in with the newly added button.

## Syncing User Permissions

Kavita allows for configuration of user access via synced roles as a custom claim.

1. In Pocket ID, open the User or Group with permission to access Kavita.
2. Open the Custom Claims dropdown and add a key value pair.
    - Use a key name that will be unique to Kavita, like `kavita-roles`.
    - Set the value to the roles you wish to give that user.  For multiple roles, you will need to format it like this: `[ "Login", "Download", "library-Comics" ]`
      - Login is required to fully log into Kavita.  Other roles can be found in Kavita's [documentation](https://wiki.kavitareader.com/guides/admin-settings/users/#roles).
      - Granting access to libraries must be done with `library-<LibraryName>`
3. Save the Custom Claim in Pocket ID, then log into Kavita separately with an Admin account.
4. In Kavita, go to **Settings → Server → OpenID Connect**.
5. Enable `Sync user settings with OIDC roles`.
6. Scroll down to Advanced Settings and change the Roles claim to the key name you set earlier (`kavita-roles` for example).
7. Scroll up and click Save, then restart the Kavita server.
8. Try logging into Kavita with a user that has the custom claims applied.  It should map the roles on login.

> Note: Role changes in the claim will not take effect until the user re-logs in.

For more information on OIDC settings in Kavita, please refer to their documentation [here](https://wiki.kavitareader.com/guides/admin-settings/open-id-connect/).
