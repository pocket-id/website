---
title: Memos
description: Sign in to the Memos note-taking app with Pocket ID.
client:
  callbackUrls:
    - https://memos.example.com/auth/callback
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

::create-client

## Configure Memos

1. Sign in to Memos as an admin.
2. Go to **Settings → SSO → Create**.
3. Set **Template** to `Custom`.
4. Enter the **Client ID** from Pocket ID into the **Client ID** field.
5. Enter the **Client secret** from Pocket ID into the **Client secret** field.
6. Enter the **Authorization URL** from Pocket ID into the **Authorization endpoint** field.
7. Enter the **Token URL** from Pocket ID into the **Token endpoint** field.
8. Enter the **Userinfo URL** from Pocket ID into the **User endpoint** field.
9. Set **Scopes** to `openid email profile`.
10. Set **Identifier** to `preferred_username`.
11. Set **Display Name** to `name`.
12. Set **Email** to `email`.
13. Save the settings and sign in with Pocket ID to test it.
