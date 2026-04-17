---
title: Grist
description: Set up Grist spreadsheet tool with Pocket ID
---

---
id: grist
---

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Grist`
2. Set the callback url to: `https://<Grist Host>/oauth2/callback`, or leave blank to autofill on first login.
3. In Grist (Docker/Docker Compose/etc), set these environment variables:

```ini
GRIST_OIDC_IDP_ISSUER="https://<Pocket ID Host>"
GRIST_OIDC_IDP_CLIENT_ID="<Client ID from the OIDC Client created in Pocket ID>"
GRIST_OIDC_IDP_CLIENT_SECRET="<Client Secret from the OIDC Client created in Pocket ID>"
GRIST_OIDC_SP_HOST="https://<Grist Host>"
GRIST_OIDC_IDP_SCOPES="openid email profile"  # Default
GRIST_OIDC_IDP_END_SESSION_ENDPOINT="https://<Pocket ID Host>/api/oidc/end-session"
GRIST_OIDC_SP_IGNORE_EMAIL_VERIFIED=true # This is needed to be true if you have the default OFF for `Emails Verified` toggle in the `Application Configuration` of your Pocket ID instance
```

4. Also ensure that the `GRIST_DEFAULT_EMAIL` env variable is set to the same email address as your user profile within Pocket ID
5. Start/Restart Grist

