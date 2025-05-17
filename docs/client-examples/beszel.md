---
id: beszel
---
# Beszel

## Requirements

- [Beszel server](https://www.beszel.dev/guide/oauth)
- HTTPS connection to your Beszel server

## Create OIDC Client in Pocket ID
1. Create a new OIDC Client in Pocket ID (e.g., `beszel`).
2. Set the **Callback URL** to the value below.
    ```
    https://<your-beszel-url>/api/oauth2-redirect
    ```
3. *Optional:* Download a PNG or SVG **logo** from the [Beszel project](https://github.com/henrygd/beszel) and upload.
4. Copy the **Client ID**, **Client Secret**, and **Authorization URL**, **Token URL**, and **Userinfo URL** for use in the next section.

## Configure Beszel

1. Open the Beszel superuser interface (`/_/#settings`) and navigate to: **`Settings > Application`** 
2. Disable the **`Hide collection create and edit controls`** setting.
3. Navigate to **`Collections > Users`**.
4. Modify the `users` collection using the gear icon near the title.
5. Navigate to **`Options > OAuth2`**.
6. Enable the **Active** checkmark, and click **`Add provider`**
7. Fill in the required fields with values from Pocket ID:
   - **Client ID**
   - **Client Secret**
   - **Display Name** of your choice (i.e.: `Pocket`)
   - **Auth URL**
   - **Token URL**
   - Set **Fetch user info from** to **`User info URL`**.
   - Leave **`Support PKCE`** enabled.
8. Save the settings.
9. Re-enable **`Hide collection create and edit controls`** from step 2.
10. Test the OAuth login to ensure it works.

### Disable password login 

To disable password login, set `DISABLE_PASSWORD_AUTH=true` in the hub environment variables. Changing in the UI alone will see the value overwritten on next restart.

### Automatic user creation 

Beszel does not allow automatic user creation by default. To enable it, set `USER_CREATION=true` in the hub environment variables.

## Sources

[Beszel Configuration Guide](https://www.beszel.dev/guide/oauth)
