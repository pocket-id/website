---
title: Vaultwarden
description: Configure Vaultwarden authentication with Pocket ID
---

> The following example uses `vaultwarden.example.com` and `id.example.com`, make sure to update these to your server names.

1. In Pocket-ID create a new OIDC Client, name it i.e. `Vaultwarden`
2. Set the callback url to: `https://vaultwarden.example.com/identity/connect/oidc-signin`, or leave blank to autofill on first login.
3. Copy the `Client ID` and `Client Secret` for use in the following steps.

### Vaultwarden Docker Environment Variables

Set the following variables in your vaultwarden environment file, replace `<client_id_from_above>` and `<client_secret_from_above>` with the copied valued from the earlier steps:

```bash
SSO_ENABLED=true
SSO_SIGNUPS_MATCH_EMAIL=true
SSO_ALLOW_UNKNOWN_EMAIL_VERIFICATION=true
SSO_PKCE=true #Only set this to true if you enabled PKCE (recommended) in Pocket ID otherwise set it to false
SSO_SCOPES=email profile groups offline_access
SSO_CLIENT_ID=<client_id_from_above>
SSO_CLIENT_SECRET=<client_secret_from_above>
SSO_AUTHORITY=https://id.example.com #Replace with your pocket-id server.
```

## Notes

If you store you passkey in Vaultwarden, you will need to have a secondary passkey outside of vaultwarden (iCloud, Browser, Etc) in order to sign in with SSO. This is recommended anyways incase you were to get locked out of vaultwarden in anyway.
