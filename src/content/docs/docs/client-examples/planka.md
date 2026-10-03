---
title: Planka
description: Sign in to the Planka project board with Pocket ID.
client:
  callbackUrls:
    - https://planka.example.com/oidc-callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- [Planka](https://docs.planka.cloud/)
- HTTPS connection to your Planka instance

::create-client

## Configure Planka

1. Set the following environment variables in your Planka instance:

   ```ini
   OIDC_ISSUER=https://id.example.com
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   ```

2. Restart Planka and sign in with Pocket ID to test it.

## Control admin access with groups

To control **admin** access to Planka using Pocket ID groups:

1. Set the following additional environment variables in your Planka instance:

   ```ini
   OIDC_SCOPES=openid profile email groups
   OIDC_ROLES_ATTRIBUTE=groups
   OIDC_ADMIN_ROLES=<your Planka admin group name on Pocket ID>
   ```

2. Restart Planka.

## Additional information

See the [Planka OIDC documentation](https://docs.planka.cloud/docs/configuration/oidc) for more information.
