---
title: Penpot
description: Sign in to the Penpot design tool with Pocket ID.
client:
  callbackUrls:
    - https://penpot.example.com/api/auth/oidc/callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- Self-hosted [Penpot](https://help.penpot.app/technical-guide/configuration/#authentication-providers)
- HTTPS connection to your Penpot instance

::create-client

## Verify emails in Pocket ID

Open **Administration → Users** and select each user that should have access.
If the icon next to the email isn't green, click it to mark the email as verified, then save.

:::note
Penpot only links Pocket ID to an existing profile, for example one created with a password, if Pocket ID returns a verified email that matches it.
Otherwise the sign-in ends with `error=auth-provider-not-allowed` in the address bar.
:::

## Configure Penpot

Penpot is configured with environment variables in its `docker-compose.yml`.

1. Add the `enable-login-with-oidc` flag to `PENPOT_FLAGS`, next to the flags already there:
   ```yaml
   x-flags: &penpot-flags
     PENPOT_FLAGS: <existing flags> enable-login-with-oidc
   ```
2. Add the OIDC variables to the `penpot-backend` service, with the values from Pocket ID:
   ```yaml
   PENPOT_OIDC_BASE_URI: https://id.example.com
   PENPOT_OIDC_CLIENT_ID: <client-id>
   PENPOT_OIDC_CLIENT_SECRET: <client-secret>
   ```
3. _Optional:_ If the Pocket ID hostname resolves to a private, loopback or otherwise internal address, allow it through Penpot's SSRF protection:
   ```yaml
   PENPOT_SSRF_ALLOWED_HOSTS: "id.example.com"
   ```
4. _Optional:_ If the browser reaches Pocket ID at a public address but the backend has to use an internal one, which is common when running Docker on a Synology NAS, pin the hostname on the `penpot-backend` service:
   ```yaml
   extra_hosts:
     - "id.example.com:<internal-ip-address>"
   ```

### Automatic user creation

Penpot doesn't create new profiles from OIDC sign-ins by default.
To let new users sign up with their Pocket ID account, add the `enable-oidc-registration` flag to `PENPOT_FLAGS`.

### Disable login with password

To harden security, disable password login by adding the `disable-login-with-password` flag to `PENPOT_FLAGS`.
Keep a working recovery path, such as admin access to Pocket ID and the Penpot database, before you do.

## Troubleshooting

| Error in the address bar after returning from Pocket ID | Cause | Fix |
| --- | --- | --- |
| `error=unable-to-auth&hint=uri+target+is+not+allowed` | Penpot's SSRF protection blocked the backend's request to Pocket ID, because the hostname resolves to a private or loopback address | Add the Pocket ID hostname to `PENPOT_SSRF_ALLOWED_HOSTS` and restart `penpot-backend` |
| `error=auth-provider-not-allowed` | The email belongs to an existing profile, for example one created with a password, but isn't verified in Pocket ID | Mark the user's email as verified in Pocket ID |
| `error=registration-disabled` | No Penpot profile exists for the email and registration is disabled | Add the `enable-oidc-registration` flag to `PENPOT_FLAGS` |

## Sources

- [Penpot configuration guide](https://help.penpot.app/technical-guide/configuration/#authentication-providers)
