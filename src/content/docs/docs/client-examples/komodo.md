---
title: Komodo
description: Sign in to Komodo with Pocket ID.
client:
  callbackUrls:
    - https://komodo.example.com/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Komodo

**This example uses the docker-compose deployment type of Komodo.**
See the [official docs](https://komo.do/docs/intro) for more information.

Add the following lines to your Komodo `.env` file, replacing the values with the ones you copied above:

```ini
KOMODO_OIDC_ENABLED=true
KOMODO_OIDC_PROVIDER=https://id.example.com
KOMODO_OIDC_CLIENT_ID=<client-id>
KOMODO_OIDC_CLIENT_SECRET=<client-secret>
## Make usernames the full email.
KOMODO_OIDC_USE_FULL_EMAIL=true
```

Save and redeploy Komodo, and you should be able to sign in using OIDC with Pocket ID.
