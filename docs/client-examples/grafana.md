---
title: Grafana
description: Configure Grafana OIDC with Pocket ID
---

Below URLs are used as placeholders for the Grafana and Pocket ID instances. Replace them with the actual URLs.

- grafana.example.com (The url of your Grafana instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `grafana` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://grafana.example.com/login/generic_oauth`, or leave blank to autofill on first login.
4. Copy the `Client ID`, `Client Secret`, `Authorization URL` and `Token URL` for the next steps.

## Grafana App Setup

1. Login to Grafana as the admin user.
2. Go to **Administration** -> **Authentication** and select **Generic OAuth**.
3. Enter the values for the fields as given below in the **General Settings**:
   - `Display Name` as 'Pocket ID' or something similar.
   - `Client Id` as the `Client ID` from above.
   - `Client secret` as the `Client Secret` from above.
   - `Auth style` as 'Auto Detect'.
   - `Scopes` as 'openid', 'email' and 'profile'.
   - `Auth URL` as `Authorization URL` from above.
   - `Token URL` as `Token URL` from above.
   - Leave `API URL` and `Sign out redirect URL` as empty.
   - Leave `Allow sign up` and `Auto login` as disabled.
4. Under **User mapping**:
   - Only set `Email attribute name` as 'email:primary' and leave all other fields as empty.
   - Only enable `Skip organization role sync` and other toggles as disabled.
5. Nothing to be done under **Extra security measures**.
6. Save the settings.
7. Next create a new admin user or update the existing admin user under the **Users** settings to have the same email address as your user in **Pocket-ID**. Also set the username to the same email id.
8. Logout and test the OAuth based login.

## Common problems

- In case you get locked out of your account before the OAuth setup is completed successfully and need to reset the password refer this [link](https://grafana.com/docs/grafana/latest/cli/#reset-admin-password).
- In case login fails with information that the callback url is wrong and you are behind reverse-proxy, you might need to set `root_url` in the grafana.ini to use properly set `https`, for example: `https://grafana.example.com/`.
- In case everything is set as according to the steps described above and you are still getting `Login failed: Sign up is disabled`, you might need to set `oauth_allow_insecure_email_lookup=true` in the `[auth]` section in the grafana.ini file.
