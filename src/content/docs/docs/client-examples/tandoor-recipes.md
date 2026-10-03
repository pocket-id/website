---
title: Tandoor Recipes
description: Sign in to the Tandoor Recipes manager with Pocket ID.
client:
  callbackUrls:
    - https://tandoor.example.com/accounts/oidc/pocket-id/login/callback/
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Tandoor Recipes

1. Add the following environment variables to your Tandoor setup, for example in the `.env` file.
   In `SOCIALACCOUNT_PROVIDERS`, replace `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID, and `id.example.com` with your Pocket ID domain.
   ```ini
   SOCIAL_PROVIDERS=allauth.socialaccount.providers.openid_connect
   SOCIALACCOUNT_PROVIDERS='{"openid_connect":{"APPS":[{"provider_id":"pocket-id","name":"Pocket ID","client_id":"<client-id>","secret":"<client-secret>","settings":{"server_url":"https://id.example.com/.well-known/openid-configuration"}}]}}'
   ```
2. Restart Tandoor.
   The login page now has an option to sign in with Pocket ID.
   You can also link existing accounts with Pocket ID in your Tandoor profile settings.
