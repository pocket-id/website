---
title: Dozzle
description: Sign in to the Dozzle log viewer with Pocket ID.
client:
  callbackUrls:
    - https://dozzle.example.com/api/auth/callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- [Dozzle](https://github.com/amir20/dozzle)
- HTTPS connection to your Pocket ID server

Dozzle supports OIDC natively, so there is no need for a middleware proxy anymore.

::create-client

## Configure Dozzle

1. Add the following to your existing Dozzle compose or `.env` file:
   ```yaml
   environment:
       DOZZLE_AUTH_PROVIDER: oidc # do not change.
       DOZZLE_AUTH_OIDC_NAME: pocket-id # this is just a visual control to set the label in the login button, It is not necessary.
       DOZZLE_AUTH_OIDC_ISSUER: https://id.example.com # base domain only, dozzle will automatically fetch the well-known endpoint.
       DOZZLE_AUTH_OIDC_CLIENT_IDL: <client-id>
       DOZZLE_AUTH_OIDC_CLIENT_SECRET: <client-secret>
   ```
2. Dozzle requires a custom claim to allow login.
   For each user you want to grant access to Dozzle:
   - In Pocket ID, open **Administration → Users** and click the user.
   - Under **Custom Claims**, add the key `dozzle_roles` with a value such as `all,^shell`.
     This grants full access to the user, minus the ability to attach a shell to containers, for security reasons.
     For the possible values of `dozzle_roles`, see the [Dozzle docs](https://dozzle.dev/guide/authentication/oidc#roles).
3. Restart your Docker Compose stack, and make sure the container is recreated to pick up the environment changes.
