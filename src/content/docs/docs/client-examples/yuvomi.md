---
title: Yuvomi
description: Sign in to Yuvomi with Pocket ID.
client:
  callbackUrls:
    - https://yuvomi.example.com/api/v1/auth/oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
---

Replace `yuvomi.example.com` with the URL of your Yuvomi instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure email verification in Pocket ID

1. In Pocket ID, open **Administration → Application Configuration → Email**.
2. Enable **Emails verified by default**.
3. Open each user under **Administration → Users** and verify their email address.
   Pocket ID then sends `email_verified: true` for that user.

## Configure Yuvomi

Set the following environment variables in Yuvomi:

```ini
OIDC_ISSUER=https://id.example.com
OIDC_CLIENT_ID=<client-id>
OIDC_CLIENT_SECRET=<client-secret>
OIDC_REDIRECT_URI=https://yuvomi.example.com/api/v1/auth/oidc/callback
```

Replace `<client-id>` and `<client-secret>` with the **Client ID** and the **Client secret** from Pocket ID.
Then restart Yuvomi and sign in with Pocket ID to test it.

## Secure default for email verification

Keep Yuvomi's fallback for a missing verification claim disabled:

```ini
OIDC_TRUST_EMAIL_WITHOUT_VERIFIED_CLAIM=false
```

This is the secure default.
Yuvomi links an existing local account by email only when Pocket ID sends `email_verified: true` and exactly one local account has that email address.
Do not set this option to `true` when Pocket ID can provide the claim.

The redirect URL must match the callback URL registered in Pocket ID exactly.

For the remaining OIDC options, account linking behavior, signup restrictions, and passwordless SSO, see Yuvomi's [SSO / OpenID Connect documentation](https://github.com/ulsklyc/yuvomi/blob/main/docs/installation.md#sso--openid-connect-optional).
