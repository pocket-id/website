---
title: Vikunja
description: Sign in to the Vikunja task manager with Pocket ID.
client:
  callbackUrls:
    - https://vikunja.example.com/auth/openid/pocketid
  values:
    - clientId
    - clientSecret
---

Replace `vikunja.example.com` with the URL of your Vikunja instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Vikunja

You can use either a `config.yml` file or environment variables to configure Vikunja.
In both cases, replace `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID.

### Using config.yml

This uses the Vikunja 1.0+ syntax.
For the deprecated pre-1.0 syntax, see the [Vikunja OpenID documentation](https://vikunja.io/docs/openid/).

1. Map a config file to your Vikunja container, see [Using a config file with Docker Compose](https://vikunja.io/docs/config-options/#using-a-config-file-with-docker-compose).
2. Add or set the following content in the `config.yml` file:
   ```yaml
   auth:
     openid:
       enabled: true
       redirecturl: https://vikunja.example.com/auth/openid/pocketid
       providers:
         PocketID:
           name: PocketID
           authurl: https://id.example.com
           clientid: <client-id>
           clientsecret: <client-secret>
           scope: openid profile email
           forceuserinfo: false # Optional: Set to true to always use UserInfo endpoint instead of ID token claims, defaults to false
   ```

### Using environment variables

```yaml
VIKUNJA_AUTH_OPENID_ENABLED: "true"
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_AUTHURL: https://id.example.com
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_CLIENTID: <client-id>
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_CLIENTSECRET: <client-secret>
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_NAME: PocketID
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_SCOPE: "openid profile email"
```

## Link existing local accounts

Vikunja 1.0+ allows users with existing local accounts to log in with OpenID.
This feature links OpenID providers to local user accounts based on matching `email` and `username` attributes.

:::caution[Important security note from the Vikunja documentation]
When using SSO authentication, Vikunja creates a new SSO user if no matching local user is found.
If you misconfigure the matching parameters, this could result in duplicate accounts that prevent logging into the intended local account via SSO until the duplicate SSO user is deleted.
Additionally, this feature introduces potential security risks, as it allows third-party providers to authenticate as local users if they can control the username or email claims.
Only enable this feature with trusted identity providers.
:::

An example `config.yml` could look like this:

```yaml
auth:
  openid:
    enabled: true
    redirecturl: https://vikunja.example.com/auth/openid/pocketid
    providers:
      PocketID:
        name: PocketID
        usernamefallback: true
        emailfallback: true
        authurl: https://id.example.com
        clientid: <client-id>
        clientsecret: <client-secret>
        scope: openid profile email
        forceuserinfo: false # Optional: Set to true to always use UserInfo endpoint instead of ID token claims, defaults to false
```
