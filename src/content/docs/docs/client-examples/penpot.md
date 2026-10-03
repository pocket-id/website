---
title: Penpot
description: Configure Penpot with Pocket ID
---

## Requirements

- Self-hosted [Penpot](https://help.penpot.app/technical-guide/configuration/#authentication-providers)
- HTTPS connection to your Penpot instance

## Configure Pocket ID

### Create OIDC Client

1. Go to **Administration > OIDC Clients** and create a new OIDC Client for Penpot.
2. Set the **Callback URL** to the value below.
   ```
   https://pocketid.yourdomain.com/api/auth/oidc/callback
   ```
3. *Optional:* Get a link to the Penpot **logo** from [Dashboard Icons](https://dashboardicons.com/icons/external/penpot)
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

### Configure Users

1. Open the Pocket ID settings page and navigate to **Administration > Users**.
2. Select the user account that you want to allow access. Ensure the email address is marked as Verified. If the icon next to the email is not green, click it to manually toggle the status to verified.

> \[!NOTE\]  
> Penpot refuses to attach an OIDC identity to an **existing** profile (e.g., one created with password login) unless the provider returns a verified email address.  
> If you see an error in the address bar like: `error=auth-provider-not-allowed`
> it means the Pocket ID user's email is not marked as verified, or it does not match the email of the existing Penpot profile. Verify the user's email in Pocket ID and try again.

## Configure Penpot

### Environment variables

The OIDC configuration for Penpot is done with environment variables and Penpot-specific flags.

1. Add the OIDC login flag:
  ```yaml
   x-flags: &penpot-flags
     PENPOT_FLAGS: enable-login-with-oidc
  ```
2. Add OIDC environment variables to the **`penpot-backend`** service, using the values copied from Pocket ID.
  ```yaml
PENPOT_OIDC_BASE_URI: https://pocketid.yourdomain.com
PENPOT_OIDC_CLIENT_ID: client-id
PENPOT_OIDC_CLIENT_SECRET: client-secret
  ```
3. Optional: Allow the Penpot backend to reach Pocket ID through Penpot's SSRF protection. This is required whenever the Pocket ID hostname resolves to a private, loopback or otherwise internal address.
  ```yaml
   PENPOT_SSRF_ALLOWED_HOSTS: "pocketid.yourdomain.com"
  ```
4. Optional: Pin the hostname on the `penpot-backend` service. This is required when the provider is reachable from the browser via a public URL but from the backend via a different internal hostname (this is common if you're running Docker on a Synology NAS).
  ```yaml
   extra_hosts:
     - "pocketid.yourdomain.com:internal-ip-address"
  ```

### Automatic user creation

Penpot does not create new profiles from OIDC logins by default. To allow new users to sign up with their Pocket ID account, add the `enable-oidc-registration` flag to `PENPOT_FLAGS`.

### Disable login with password

To harden the security it's recommended to disable password login, by adding the `disable-login-with-password` flag to `PENPOT_FLAGS`. Keep a working recovery path (e.g., admin access to Pocket ID and the Penpot database) before doing so.

## Troubleshooting


| Error in the address bar after returning from Pocket ID | Cause                                                                                                                                          | Fix                                                                                                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `error=unable-to-auth&hint=uri+target+is+not+allowed`   | Penpot's SSRF protection blocked the backend's request to the Pocket ID token endpoint (the hostname resolves to a private/loopback address)   | Add the Pocket ID hostname to `PENPOT_SSRF_ALLOWED_HOSTS` and restart `penpot-backend`                                                        |
| `error=auth-provider-not-allowed`                       | The email belongs to an existing profile (e.g., created with password login) but the OIDC identity is not linked and the email is not verified | Mark the user's email as verified in Pocket ID. |
| `error=registration-disabled`                           | Logging in with an email that has no Penpot profile while new registrations are disabled                                                       | Add the `enable-oidc-registration` flag to `PENPOT_FLAGS`                                                                                     |


## Sources

- [Penpot Configuration Guide](https://help.penpot.app/technical-guide/configuration/#authentication-providers)