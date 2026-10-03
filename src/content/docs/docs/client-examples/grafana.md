---
title: Grafana
description: Sign in to Grafana with Pocket ID.
client:
  callbackUrls:
    - https://grafana.example.com/login/generic_oauth
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
---

::create-client

## Configure Grafana

1. Log in to Grafana as the admin user.
2. Open **Administration → Authentication** and select **Generic OAuth**.
3. Under **General Settings**, fill in the fields:
   - **Display Name**: `Pocket ID` or something similar.
   - **Client Id**: the **Client ID** from Pocket ID.
   - **Client secret**: the **Client secret** from Pocket ID.
   - **Auth style**: `Auto Detect`
   - **Scopes**: `openid`, `email` and `profile`
   - **Auth URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - Leave **API URL** and **Sign out redirect URL** empty.
   - Leave **Allow sign up** and **Auto login** disabled.
4. Under **User mapping**:
   - Only set **Email attribute name** to `email:primary` and leave all other fields empty.
   - Only enable **Skip organization role sync** and leave the other toggles disabled.
5. Nothing needs to be done under **Extra security measures**.
6. Save the settings.
7. Create a new admin user or update the existing admin user under **Users** so that it has the same email address as your user in Pocket ID.
   Also set the username to the same email address.
8. Log out and sign in with Pocket ID to test it.

## Role mapping

To assign roles automatically based on group membership:

1. Add `groups` to the **Scopes** setting: `openid email profile groups`
2. Set the **role attribute path** according to the [examples](https://grafana.com/docs/grafana/latest/setup-grafana/configure-access/configure-authentication/generic-oauth/).
   For example, `role_attribute_path: contains(groups[*], 'Monitoring Admin') && 'Admin' || contains(groups[*], 'Monitoring') && 'Editor' || 'Viewer'` grants the "Admin" role to anyone in the "Monitoring Admin" group, the "Editor" role to anyone in the "Monitoring" group, and the "Viewer" role to any other signed-in user.
3. Log out and back in to update your role.

## Common problems

- If you get locked out of your account before the OAuth setup is completed and need to reset the password, see [the Grafana CLI documentation](https://grafana.com/docs/grafana/latest/cli/#reset-admin-password).
- If login fails because the callback URL is wrong and you are behind a reverse proxy, you might need to set `root_url` in `grafana.ini` so that it uses `https`, for example `https://grafana.example.com/`.
- If everything is set according to the steps above and you still get `Login failed: Sign up is disabled`, you might need to set `oauth_allow_insecure_email_lookup=true` in the `[auth]` section of `grafana.ini`.
