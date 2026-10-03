---
title: nextExplorer
description: Sign in to the nextExplorer file manager with Pocket ID.
---

Replace `id.example.com` with the domain of your Pocket ID instance.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `nextExplorer`.
3. Click **Create** and copy the **Client ID** and the **Client secret**.
   The client secret is only shown once.
4. On the client's **Access** tab, select the groups that may sign in under **Allowed User Groups**, or choose **All Users**.

## Configure nextExplorer

1. Set the following environment variables:

   ```yaml
   OIDC_ENABLED: true
   OIDC_ISSUER: https://id.example.com
   OIDC_CLIENT_ID: <client-id>
   OIDC_CLIENT_SECRET: <client-secret>
   OIDC_SCOPES: "openid profile email"
   OIDC_ADMIN_GROUPS: <admin group in Pocket ID>
   OIDC_REQUIRE_EMAIL_VERIFIED: true/false
   OIDC_AUTO_CREATE_USERS: true/false
   AUTH_MODE: oidc/local/both/disabled
   ```

   `AUTH_MODE` sets the authentication flow:
   - `oidc` allows OIDC only and disables local passwords.
   - `local` allows username and password only and hides OIDC.
   - `both` allows a choice between OIDC and local login.
   - `disabled` turns off the login page entirely.

2. Start the instance and sign in with Pocket ID to test it.

See the [nextExplorer documentation](https://explorer.nxz.ai/integrations/oidc.html) for more details.
