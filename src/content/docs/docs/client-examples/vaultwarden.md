---
title: Vaultwarden
description: Sign in to the Vaultwarden password manager with Pocket ID.
client:
  callbackUrls:
    - https://vaultwarden.example.com/identity/connect/oidc-signin
  pkce: true
  values:
    - clientId
    - clientSecret
---

Replace `vaultwarden.example.com` and `id.example.com` with your own server names.

::create-client

## Configure Vaultwarden

Set the following variables in your Vaultwarden environment file.
Replace `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID.

```ini
SSO_ENABLED=true
SSO_SIGNUPS_MATCH_EMAIL=true
SSO_ALLOW_UNKNOWN_EMAIL_VERIFICATION=true #Only keep this on true if you are willing to accept the risks: https://github.com/dani-garcia/vaultwarden/wiki/Enabling-SSO-support-using-OpenId-Connect#on-sso_allow_unknown_email_verification
SSO_PKCE=true #Only set this to true if you enabled PKCE (recommended) in Pocket ID otherwise set it to false
SSO_SCOPES=email profile groups offline_access
SSO_CLIENT_ID=<client-id>
SSO_CLIENT_SECRET=<client-secret>
SSO_AUTHORITY=https://id.example.com #Replace with your pocket-id server.
```

## Notes

If you store your passkey in Vaultwarden, you need a secondary passkey outside of Vaultwarden (iCloud, browser, etc.) to sign in with SSO.
This is recommended anyway in case you ever get locked out of Vaultwarden.
