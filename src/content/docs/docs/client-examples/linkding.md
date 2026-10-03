---
title: Linkding
description: Sign in to the Linkding bookmark manager with Pocket ID.
client:
  callbackUrls:
    - https://linkding.example.com/oidc/callback/
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Linkding

This example assumes you are using a docker-compose deployment for Linkding.
For more details, see the [Linkding documentation](https://linkding.link/installation) or, more specifically, [the OIDC section](https://linkding.link/options/#ld_enable_oidc).

1. Add the following environment variables to your Linkding `.env` file.
   Replace `<client-id>` and `<client-secret>` with the **Client ID** and **Client secret** from Pocket ID.
   The endpoints are listed in Pocket ID under **Show more details** (**Authorization URL**, **Token URL**, **Userinfo URL** and **Certificate URL**).

   ```ini
   # Enable OIDC in Linkding
   LD_ENABLE_OIDC=True

   # Client credentials from Pocket ID
   OIDC_RP_CLIENT_ID=<client-id>
   OIDC_RP_CLIENT_SECRET=<client-secret>

   # OIDC endpoints
   OIDC_OP_AUTHORIZATION_ENDPOINT=https://id.example.com/authorize
   OIDC_OP_TOKEN_ENDPOINT=https://id.example.com/api/oidc/token
   OIDC_OP_USER_ENDPOINT=https://id.example.com/api/oidc/userinfo
   OIDC_OP_JWKS_ENDPOINT=https://id.example.com/.well-known/jwks.json

   # Use PKCE if required (adjust based on your setup, True by default)
   OIDC_USE_PKCE=False

   # Verify SSL certificate (set to False if using self-signed certificates)
   OIDC_VERIFY_SSL=True

   # Optional: Customize the username claim (defaults to email if not set)
   # OIDC_USERNAME_CLAIM=preferred_username
   ```

2. Save the changes to your `.env` file and redeploy your Linkding instance using docker-compose.

Once redeployed, you should be able to sign in using OIDC with Pocket ID.
