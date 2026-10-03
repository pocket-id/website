---
title: Beszel
description: Sign in to the Beszel server monitoring hub with Pocket ID.
client:
  callbackUrls:
    - https://beszel.example.com/api/oauth2-redirect
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

## Requirements

- [Beszel server](https://www.beszel.dev/guide/oauth)
- HTTPS connection to your Beszel server

::create-client

## Verify emails in Pocket ID

1. In Pocket ID, open **Administration → Application Configuration → Email** and turn on **Emails verified by default**.
2. Open **Administration → Users** and select the user account.
   Make sure the email address is marked as verified.
   If the icon next to the email isn't green, click it to mark the email as verified.

:::note
Beszel requires the OAuth provider to return a valid, verified email address to create new users.
If you see an error like `Failed to create record. { "email": "cannot be blank" }`, your OAuth provider isn't returning a usable email.
Make sure **Emails verified by default** is turned on in Pocket ID, or that your identity provider returns a verified email in its `userinfo` response.
:::

## Configure Beszel

1. Open the Beszel superuser interface (`/_/#/settings`) and go to **Settings → Application**.
2. Turn off **Hide collection create and edit controls**.
3. Go to **Collections → Users**.
4. Edit the `users` collection with the gear icon next to the title.
5. Go to **Options → OAuth2**.
6. Select **Active** and click **Add provider**.
7. Select the `oidc` provider.
8. Fill in the fields with the values from Pocket ID:
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Display Name**: a name of your choice, such as `Pocket`.
   - **Auth URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **Fetch user info from**: `User info URL`, then enter the **Userinfo URL** from Pocket ID.
   - Leave **Support PKCE** turned on.
9. Save the settings.
10. Turn **Hide collection create and edit controls** from step 2 back on, then sign in with Pocket ID to test it.

### Disable password login

To disable password login, set `DISABLE_PASSWORD_AUTH=true` in the hub environment variables.
If you only change it in the UI, the value is overwritten on the next restart.

### Automatic user creation

Beszel doesn't allow automatic user creation by default.
To enable it, set `USER_CREATION=true` in the hub environment variables.

## Sources

[Beszel Configuration Guide](https://www.beszel.dev/guide/oauth)
