---
title: Yuvomi
description: Configure Yuvomi with Pocket ID authentication
---

The following variables are used in this example. Replace them with your actual URLs:

- `YUVOMI_URL` (The URL of your Yuvomi instance.)
- `POCKET_ID_URL` (The URL of your Pocket ID instance.)

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Yuvomi`).
2. Set the **Callback URL** to `${YUVOMI_URL}/api/v1/auth/oidc/callback`.
3. Enable **PKCE** for the OIDC Client. Yuvomi uses the Authorization Code flow with PKCE (S256) and a nonce.
4. Copy the **Client ID** and **Client Secret** for the next steps.

## Configure email verification in Pocket ID

1. Open **Administration → Application Configuration** in Pocket ID.
2. Enable **Emails Verified**.
3. Open each user's account under **Users** and verify their email address. Pocket ID then sends `email_verified: true` for that user.

## Configure Yuvomi

Set the following environment variables in Yuvomi:

```env
OIDC_ISSUER=${POCKET_ID_URL}
OIDC_CLIENT_ID=$clientid
OIDC_CLIENT_SECRET=$clientsecret
OIDC_REDIRECT_URI=${YUVOMI_URL}/api/v1/auth/oidc/callback
```

Replace `$clientid` and `$clientsecret` with the values from the OIDC Client in Pocket ID. Then restart Yuvomi and test the OIDC login.

## Secure default for email verification

Keep Yuvomi's fallback for a missing verification claim disabled:

```env
OIDC_TRUST_EMAIL_WITHOUT_VERIFIED_CLAIM=false
```

This is the secure default. Yuvomi links an existing local account by email only when Pocket ID sends `email_verified: true` and exactly one local account has that email address. Do not set this option to `true` when Pocket ID can provide the claim.

The redirect URL must match the callback URL registered in Pocket ID exactly.

For the remaining OIDC options, account linking behavior, signup restrictions, and passwordless SSO, see Yuvomi's [SSO / OpenID Connect documentation](https://github.com/ulsklyc/yuvomi/blob/main/docs/installation.md#sso--openid-connect-optional).
