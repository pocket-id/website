---
title: Karakeep
description: Sign in to the Karakeep bookmark manager with Pocket ID.
client:
  callbackUrls:
    - https://karakeep.example.com/api/auth/callback/custom
---

::create-client

## Configure Karakeep

1. Open the `.env` file of your Karakeep compose setup and add these lines:

   ```ini
   OAUTH_WELLKNOWN_URL=https://id.example.com/.well-known/openid-configuration
   OAUTH_CLIENT_SECRET=<client-secret>
   OAUTH_CLIENT_ID=<client-id>
   OAUTH_PROVIDER_NAME="Pocket ID"
   NEXTAUTH_URL=https://karakeep.example.com
   ```

2. _(Optional)_ To disable password authentication and link your existing Karakeep account with your Pocket ID identity, also add:

   ```ini
   DISABLE_PASSWORD_AUTH=true
   OAUTH_ALLOW_DANGEROUS_EMAIL_ACCOUNT_LINKING=true
   ```
