---
title: Grist
description: Sign in to the Grist spreadsheet tool with Pocket ID.
client:
  callbackUrls:
    - https://grist.example.com/oauth2/callback
  values:
    - clientId
    - clientSecret
---

---
id: grist
---

::create-client

## Configure Grist

1. In Grist (Docker, Docker Compose, etc.), set these environment variables:
   ```ini
   GRIST_OIDC_IDP_ISSUER="https://id.example.com"
   GRIST_OIDC_IDP_CLIENT_ID="<client-id>"
   GRIST_OIDC_IDP_CLIENT_SECRET="<client-secret>"
   GRIST_OIDC_SP_HOST="https://grist.example.com"
   GRIST_OIDC_IDP_SCOPES="openid email profile"  # Default
   GRIST_OIDC_IDP_END_SESSION_ENDPOINT="https://id.example.com/api/oidc/end-session"
   GRIST_OIDC_SP_IGNORE_EMAIL_VERIFIED=true # Needed if "Emails verified by default" is off (the default) in Administration → Application Configuration → Email in Pocket ID
   ```
2. Make sure that the `GRIST_DEFAULT_EMAIL` environment variable is set to the same email address as your user profile in Pocket ID.
3. Start or restart Grist.
