---
title: TelltaleDNS
description: Set up Pocket ID authentication for your TelltaleDNS instance
client:
  callbackUrls:
    - https://<app>.example.com/api/v1/auth/oidc/pocketid/callback
  pkce: true
  launchUrl: https://<app>.example.com
  allowedGroups:
    - telltale-admins
    - telltale-operators
    - telltale-viewers
  values:
    - clientId
    - clientSecret
    - issuerUrl
---

The following example variables are used and should be replaced with your actual URLs.

- dns.example.com (the URL of your [TellTaleDNS](https://paimonsoror.github.io/telltaledns/index.html) instance)
- id.example.com (the URL of your Pocket ID instance)

## Create groups in Pocket ID

In Pocket ID, open **Administration → User Groups** and click **Add Group** to create the following groups.
Use these exact values for **Name**, because they're referenced in the TelltaleDNS group map.

| Group name | Maps to TelltaleDNS group | What it does |
|---|---|---|
| `telltale-viewers` | `viewer` | Sees dashboards and the query log, such as on wall displays |
| `telltale-operators` | `operator` | Everything a viewer can, plus pause blocking, flush the cache, and manage lists, clients, and groups |
| `telltale-admins` | `admin` | Everything, including users, the audit log, and security settings |

Add users to whichever group reflects their role. Users not in any of these groups are denied access.

:::note
No custom claims are needed on these groups. TelltaleDNS reads group names from the standard `groups` claim.

Usernames come from `preferred_username`. A provider account is never attached to an existing local user: if the name is taken, the new account is called `name@provider`.
:::

::create-client

## TelltaleDNS setup
Paste this into your `telltale.toml` file, change the required values and restart TelltaleDNS. The full auth settings can be found [here](https://paimonsoror.github.io/telltaledns/config.html#cfg-auth).

```toml
[auth.oidc]
public_url = "https://dns.example.com"

[[auth.oidc.provider]]
id = "pocketid"
name = "Pocket-ID"
issuer = "https://id.example.com"
client_id = "<<Client ID copied from Pocket ID>>"
client_secret = "<<Client Secret copied from Pocket ID>>"
scopes=["openid", "profile", "email", "groups"]
groups_claim = "groups"

[[auth.oidc.provider.role]]
group = "telltale-admins"
role = "admin"

[[auth.oidc.provider.role]]
group = "telltale-operators"
role = "operator"

[[auth.oidc.provider.role]]
group = "telltale-viewers"
role = "viewer"
```

:::caution
**Break-glass admin**
`disable_local_login = true` in `[auth.oidc]` turns off password sign-in and HTTP Basic, except for admins signing in from `allowed_admin_networks` (private networks by default). Keep a local admin account: it's your way in when the provider is down.
:::