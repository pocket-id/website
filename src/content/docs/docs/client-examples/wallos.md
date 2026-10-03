---
title: Wallos
description: Sign in to the Wallos subscription tracker with Pocket ID.
client:
  callbackUrls:
    - https://wallos.example.com
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

Replace `wallos.example.com` with the URL of your [Wallos] instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Wallos

1. Open the Wallos admin interface (`/admin.php`) and go to **OIDC Settings**.
2. Fill in the required fields with values from Pocket ID:
   - **Display Name** of your choice (for example `PocketID`)
   - **Client ID**: the **Client ID** from Pocket ID
   - **Client Secret**: the **Client secret** from Pocket ID
   - **Auth URL**: the **Authorization URL** from Pocket ID
   - **Token URL**: the **Token URL** from Pocket ID
   - **User info URL**: the **Userinfo URL** from Pocket ID
3. _(Optional)_ Enable automatic user creation.
4. Set **Redirect URL** to `wallos.example.com/index.php`.
5. Turn the OIDC toggle on.
6. Save the settings and sign in with Pocket ID to test it.

[Wallos]: https://github.com/ellite/Wallos#readme
