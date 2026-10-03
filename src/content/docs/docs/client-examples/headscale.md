---
title: Headscale
description: Sign in to the Headscale VPN control server with Pocket ID.
client:
  callbackUrls:
    - https://headscale.example.com/oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Headscale

:::note
Refer to the example [`config.yaml`](https://github.com/juanfont/headscale/blob/main/config-example.yaml) for full OIDC configuration options.
:::

Add the following to `config.yaml`:

```yaml
oidc:
  issuer: 'https://id.example.com'
  client_id: '<client-id>'
  client_secret: '<client-secret>'
  pkce:
    enabled: true
    method: S256
```

### Restrict access to certain groups

_(Optional)_ To allow only specific groups, add the following under `oidc:`:

```yaml
oidc:
  scope: ['openid', 'profile', 'email', 'groups']
  allowed_groups:
    - <POCKET-ID-GROUP-NAME> # example: headscale
```
