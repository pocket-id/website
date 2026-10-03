---
title: Rallly
description: Sign in to the Rallly scheduling tool with Pocket ID.
client:
  callbackUrls:
    - https://rallly.example.com/api/auth/callback/oidc
  values:
    - clientId
    - clientSecret
---

Replace `rallly.example.com` with the URL of your Rallly instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Rallly

If you follow the [Rallly Docker setup](https://support.rallly.co/self-hosting/installation/docker#setup-instructions), you are encouraged to create a `config.env` file in the root of your Rallly project directory.
This file sets the environment variables for the Rallly web server container.

The `config.env` file should look like this:

```ini
# other environment variables...

OIDC_DISCOVERY_URL=https://id.example.com/.well-known/openid-configuration
OIDC_CLIENT_ID=<client-id>
OIDC_CLIENT_SECRET=<client-secret>
OIDC_ISSUER_URL=https://id.example.com
```

Restart your Docker containers and sign in to Rallly with Pocket ID to test it.
