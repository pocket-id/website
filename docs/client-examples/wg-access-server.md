---
title: WG-Access-Server
description: Set up Pocket ID authentication for wg-access-server
---

WG-Access-Server supports OIDC out of the box.

## Pocket ID Setup

1. In Pocket ID create a new OIDC client, name it, for example, `wg-access-server`.
2. (Optionally) Set a logo for this OIDC client.
3. The callback URL can be set to "almost anything." Upstream recommends using `/callback`, with the complete URL being for example `https://wg.example.com/callback`.
4. Leave `Public Client` and `PKCE` unchecked. 
6. Copy the `Client ID` and `Client Secret` values for use in the next steps.

## WG-Access-Server Setup

1. Open the `config.yaml` used by the server.
2. Create an `auth` section with an `oidc` subsection.
3. Enter the values as follows:

```yaml
auth:
  oidc:
    # Can be anything you like
    name: Pocket-ID
    # Should point to the domain you are hosting Pocket-ID on
    issuer: https://auth.example.com
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

### Managing Privileges

It is possible to map groups of users allowed to access wg-access-server as well as define a group of users with admin privileges.

For example, when using [LLDAP](https://github.com/lldap/lldap) as a backend for Pocket-ID, all LLDAP Administrators (members of group `lldap_admin`) can also be granted administrative privileges in wg-access-server using the claim mapping

```yaml
auth:
  oidc:
    # ...
    claimMapping:
      admin: "'lldap_admin' in groups"
```

Note that you will need to enable the `groups` scope in the configuration.

### Restricting E-Mail Domains

WG-Access-Server can optionally restrict user access to specific e-mail domains:

```yaml
auth:
  oidc:
    # ...      
    emailDomains:
      - example.com
```

Note that you will need to enable the `email` scope in the configuration.
