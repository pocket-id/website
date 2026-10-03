---
title: Portainer
description: Sign in to the Portainer container management platform with Pocket ID.
client:
  callbackUrls:
    - https://portainer.example.com/
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
---

Replace `portainer.example.com` with the URL of your Portainer instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Portainer

- While initially setting up OAuth in Portainer, it's recommended to keep **Hide internal authentication prompt** set to `Off` in case you need a fallback login.
- This guide does **not** cover how to set up group claims in Portainer.

:::tip
Make sure to enable the **Automatic user provisioning** option so users are auto-created in Portainer.
:::

1. Open the Portainer web interface and navigate to **Settings → Authentication**.
2. Select **Custom OAuth Provider**.
3. Paste the **Client ID** from Pocket ID into the **Client ID** field in Portainer.
4. Paste the **Client secret** from Pocket ID into the **Client Secret** field in Portainer.
5. Paste the **Authorization URL** from Pocket ID into the **Authorization URL** field in Portainer.
6. Paste the **Token URL** from Pocket ID into the **Access token URL** field in Portainer.
7. Paste the **Userinfo URL** from Pocket ID into the **Resource URL** field in Portainer.
8. Set **Redirect URL** to `https://portainer.example.com/`.
9. Paste the **Logout URL** from Pocket ID into the **Logout URL** field in Portainer.
10. Set **User identifier** to `preferred_username`.
    This uses the user's username instead of the email.
11. Set **Scopes** to `email openid profile`.
12. Set **Auth Style** to `Auto detect`.
13. Save the settings and sign in with the OAuth button to test it.
