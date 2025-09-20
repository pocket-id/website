---
title: Beszel
description: Set up Pocket ID authentication for Beszel
---

## Requirements

- [Beszel server](https://www.beszel.dev/guide/oauth)
- HTTPS connection to your Beszel server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `beszel`).
2. Set the **Callback URL** to the value below.
   ```
   https://<your-beszel-url>/api/oauth2-redirect
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Beszel project](https://github.com/henrygd/beszel) and upload it now.
4. Copy the **Client ID**, **Client Secret**, **Authorization URL**, **Token URL**, and **Userinfo URL** for use in the next section.

## Configure Pocket ID

1. Open the Pocket ID settings page and navigate to **`Application Configuration`**.
2. Enable **Emails Verified**.

> [!NOTE]
> Beszel requires the OAuth provider to return a valid, verified email address to create new users.  
> If you see an error like:  
> `Failed to create record. { "email": "cannot be blank" }`  
> It means your OAuth provider is not returning a usable email.  
> Make sure **"Emails Verified"** is enabled in Pocket ID or that your identity provider returns a verified email in its `userinfo` response.

## Configure Beszel

1. Open the Beszel superuser interface (`/_/#/settings`) then navigate to: **`Settings > Application`**.
2. Disable the **`Hide collection create and edit controls`** setting.
3. Navigate to **`Collections > Users`**.
4. Modify the `users` collection using the gear icon near the title.
5. Navigate to **`Options > OAuth2`**.
6. Enable the **Active** checkmark then click **`Add provider`**.
7. Select the `oidc` provider.
8. Fill in the required fields with values from Pocket ID:
   - **Client ID**
   - **Client Secret**
   - **Display Name** of your choice (i.e.: `Pocket`)
   - **Auth URL**
   - **Token URL**
   - Set **Fetch user info from** to **`User info URL`**
   - Leave **`Support PKCE`** enabled
9. Save the settings.
10. Re-enable **`Hide collection create and edit controls`** from step 2.
11. Test the OAuth login to ensure it works.

### Disable password login

To disable password login, set `DISABLE_PASSWORD_AUTH=true` in the hub environment variables. Changing in the UI alone will see the value overwritten on next restart.

### Automatic user creation

Beszel does not allow automatic user creation by default. To enable it, set `USER_CREATION=true` in the hub environment variables.

## Sources

[Beszel Configuration Guide](https://www.beszel.dev/guide/oauth)
