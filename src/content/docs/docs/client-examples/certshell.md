---
title: CertShell
description: Sign in to the CertShell browser SSH terminal with Pocket ID, and use Pocket ID groups to decide who can reach which hosts.
client:
  callbackUrls:
    - https://ssh.example.com/auth/callback
  pkce: true
  values:
    - issuerUrl
    - clientId
    - clientSecret
---

## Requirements

- [CertShell](https://github.com/maca134/certshell) reachable over HTTPS, e.g. `https://ssh.example.com`
- A user group in Pocket ID for CertShell admins, `certshell-admins` by default

::create-client

## Configure CertShell

1. Add the values to CertShell's `.env`:

   ```ini
   APP_URL=https://ssh.example.com
   OIDC_ISSUER=https://id.example.com
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   ```

2. Restart CertShell and sign in.
   Members of `certshell-admins` (set another name with `OIDC_ADMIN_GROUP`) see the **Admin** section.
3. In CertShell, open **Admin → Hosts** and allow your Pocket ID groups on each host's logins.

:::note
CertShell matches a group's **name**, not its friendly name.
Group changes apply at the user's next CertShell sign-in.
:::
