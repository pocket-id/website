---
title: Miniflux
description: Sign in to the Miniflux RSS reader with Pocket ID.
client:
  callbackUrls:
    - https://miniflux.example.com/oauth2/oidc/callback
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Miniflux

1. Set the following environment variables in your Miniflux instance:

   ```ini
   OAUTH2_PROVIDER=oidc
   OAUTH2_CLIENT_ID=<client-id>
   OAUTH2_CLIENT_SECRET=<client-secret>
   OAUTH2_REDIRECT_URL=https://miniflux.example.com/oauth2/oidc/callback
   OAUTH2_OIDC_DISCOVERY_ENDPOINT=https://id.example.com # no trailing slashes or ".well-known/openid-configuration"
   OAUTH2_OIDC_PROVIDER_NAME=PocketID
   OAUTH2_USER_CREATION=1 # optional, if you want new users to be created automatically
   DISABLE_LOCAL_AUTH=1 # optional, if you want to disable local authentication
   ```

2. Restart Miniflux and sign in with Pocket ID to test it.
