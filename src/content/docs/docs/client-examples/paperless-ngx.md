---
title: Paperless-ngx
description: Sign in to the Paperless-ngx document manager with Pocket ID.
client:
  callbackUrls:
    - https://paperless-ngx.example.com/accounts/oidc/pocket-id/login/callback/
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Paperless-ngx

1. Add the following environment variables to the Paperless-ngx webserver container.
   See the [Paperless-ngx documentation](https://docs.paperless-ngx.com/configuration/#PAPERLESS_SOCIALACCOUNT_PROVIDERS) for more information.

   ```ini
   PAPERLESS_APPS=allauth.socialaccount.providers.openid_connect
   PAPERLESS_SOCIALACCOUNT_PROVIDERS={"openid_connect":{"SCOPE":["openid","profile","email"],"OAUTH_PKCE_ENABLED":true,"APPS":[{"provider_id":"pocket-id","name":"Pocket ID","client_id":"<client-id>","secret":"<client-secret>","settings":{"server_url":"https://id.example.com"}}]}}
   ```

   The `provider_id` value (here `pocket-id`) must match the one in the callback URL in Pocket ID.

2. Restart your Docker containers.
3. Sign in to Paperless-ngx with Pocket ID to test it.

## Link an existing account

To link your existing Paperless-ngx user to the user in Pocket ID:

1. Sign in to Paperless-ngx with password authentication.
2. Click your user name in the top right corner and click **My Profile**.
3. Link the account to Pocket ID with the **Connect new social account** option.
