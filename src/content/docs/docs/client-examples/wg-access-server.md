---
title: wg-access-server
description: Sign in to the wg-access-server WireGuard VPN server with Pocket ID.
client:
  callbackUrls:
    - https://wg.example.com/callback
  values:
    - clientId
    - clientSecret
---

wg-access-server supports OIDC out of the box.

::create-client

## Configure wg-access-server

1. Open the `config.yaml` used by the server.
2. Create an `auth` section with an `oidc` subsection.
3. Enter the values as follows:
   ```yaml
   auth:
     oidc:
       # Can be anything you like
       name: Pocket-ID
       # Should point to the domain you are hosting Pocket-ID on
       issuer: https://id.example.com
       # ID and Secret provided by Pocket-ID
       clientID: <client-id>
       clientSecret: <client-secret>
       # Callback URL you entered in Pocket-ID
       redirectURL: https://wg.example.com/callback
       # List of scopes to request claims for.
       # Must include at least 'openid'.
       scopes:
          - openid
          - profile
          - email
          - groups
   ```

For further reference, consult the [upstream documentation](https://www.freie-netze.org/wg-access-server/4-auth/#configuration).

### Managing privileges

You can map groups of users that are allowed to access wg-access-server and define a group of users with admin privileges.

For example, when using [LLDAP](https://github.com/lldap/lldap) as a backend for Pocket ID, all LLDAP administrators (members of the group `lldap_admin`) can also be granted administrative privileges in wg-access-server with this claim mapping:

```yaml
auth:
  oidc:
    # ...
    claimMapping:
      admin: "'lldap_admin' in groups"
```

Note that you need to enable the `groups` scope in the configuration.

### Restricting email domains

wg-access-server can optionally restrict user access to specific email domains:

```yaml
auth:
  oidc:
    # ...
    emailDomains:
      - example.com
```

Note that you need to enable the `email` scope in the configuration.
