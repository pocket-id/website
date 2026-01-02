---
title: Vikunja
description: Configure Vikunja task management with Pocket ID
---

The following example variables are used, and should be replaced with your actual URLs.

    vikunja.example.com (The URL of your Vikunja instance.)
    id.example.com (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it i.e. `Vikunja`
2. Set the callback url to: `https://vikunja.example.com/auth/openid/pocketid`, or leave blank to autofill on first login.
3. Copy the Client ID and Client Secret for use in the next steps.

## Vikunja Setup

You can use either a config.yml file or environment variables to configure vikunja.

### Using config.yml

1. In `Vikunja` ensure to map a config file to your container, see [here](https://vikunja.io/docs/config-options/#using-a-config-file-with-docker-compose)
2. Add or set the following content to the `config.yml` file:

```yml
auth:
  openid:
    enabled: true
    redirecturl: https://vikunja.example.com/auth/openid/pocketid
    providers:
      - name: Pocket-Id
        authurl: https://id.example.com
        clientid: <POCKET_ID_CLIENT_ID>
        clientsecret: <POCKET_ID_SECRET>
```

### Using environment variables

```yml
VIKUNJA_AUTH_OPENID_ENABLED: "true"
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_AUTHURL: https://id.example.net
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_CLIENTID: <POCKET_ID_CLIENT_ID>
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_CLIENTSECRET: <POCKET_ID_SECRET>
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_NAME: PocketID
VIKUNJA_AUTH_OPENID_PROVIDERS_POCKETID_SCOPE: "openid profile email"
```
