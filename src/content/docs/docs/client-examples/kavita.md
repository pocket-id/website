---
title: Kavita
description: Sign in to the Kavita reading server with Pocket ID.
client:
  callbackUrls:
    - https://kavita.example.com/signin-oidc
  logoutCallbackUrls:
    - https://kavita.example.com/signout-callback-oidc
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Kavita

1. In Kavita, go to **Settings → Server → OpenID Connect**.
2. Enter your OIDC provider details:
   - **Authority**: `https://id.example.com` (no trailing slash)
   - **Client ID**: the **Client ID** from Pocket ID
   - **Client Secret**: the **Client secret** from Pocket ID
   - _(Optional)_ **Provider name**: Change to `Pocket ID` if you wish.
3. Save and restart the Kavita server for the settings to take effect.
   If **Require verified emails** is enabled in Kavita, turn on **Emails verified by default** in Pocket ID under **Administration → Application Configuration → Email** to ensure users can sign in.
4. Sign in with the newly added button to test it.

## Sync user permissions

Kavita allows for configuration of user access via synced roles as a custom claim.

1. In Pocket ID, open the user (**Administration → Users**) or the group (**Administration → User Groups**) that should have access to Kavita.
2. Under **Custom Claims**, add a key-value pair:
   - Use a key name that will be unique to Kavita, like `kavita-roles`.
   - Set the value to the roles you wish to give that user.
     For multiple roles, format it like this: `[ "Login", "Download", "library-Comics" ]`
     - `Login` is required to fully sign in to Kavita.
       Other roles can be found in Kavita's [documentation](https://wiki.kavitareader.com/guides/admin-settings/users/#roles).
     - Access to libraries must be granted with `library-<LibraryName>`.
3. Save the custom claim in Pocket ID, then sign in to Kavita separately with an admin account.
4. In Kavita, go to **Settings → Server → OpenID Connect**.
5. Enable **Sync user settings with OIDC roles**.
6. Scroll down to **Advanced Settings** and change the **Roles claim** to the key name you set earlier (`kavita-roles` for example).
7. Scroll up and click **Save**, then restart the Kavita server.
8. Sign in to Kavita with a user that has the custom claims applied.
   It should map the roles on sign-in.

:::note
Role changes in the claim will not take effect until the user signs in again.
:::

For more information on OIDC settings in Kavita, refer to their [documentation](https://wiki.kavitareader.com/guides/admin-settings/open-id-connect/).
