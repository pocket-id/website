---
title: Excaliself
description: Sign in to the Excaliself whiteboard with Pocket ID.
client:
  callbackUrls:
    - https://excaliself.example.com/api/auth/callback/oidc
  pkce: true
  values:
    - clientId
    - clientSecret
    - issuerUrl
---

## Requirements

- Self-hosted [Excaliself](https://excaliself.com) with `BASE_URL` set to the address you open it at, such as `https://excaliself.example.com`.
  The callback URL is `<BASE_URL>/api/auth/callback/oidc`.

::create-client

## Verify emails in Pocket ID

Open **Administration → Users** and select each user that should have access.
If the icon next to the email isn't green, click it to mark the email as verified, then save.

:::note
Excaliself only links Pocket ID to an existing account, for example one created with a password or an invite, if Pocket ID returns a verified email that matches it.
Otherwise the sign-in page shows "An account with this email already exists. Sign in with your password."
:::

## Configure Excaliself

1. Add the OIDC variables to the `.env` file next to Excaliself's `docker-compose.yaml`, with the values from Pocket ID:
   ```ini
   OIDC_ISSUER=https://id.example.com
   OIDC_CLIENT_ID=<client-id>
   OIDC_CLIENT_SECRET=<client-secret>
   OIDC_NAME=Pocket ID
   ```
   `OIDC_ISSUER` is the **Issuer URL**, the address of Pocket ID.
2. _Optional:_ To let new users get an account on their first sign-in, add their email domains, separated by commas:
   ```ini
   SSO_ALLOWED_DOMAINS=example.com
   ```
   Without it, new users need an invite link from an Excaliself admin.
3. Restart Excaliself with `docker compose up -d`.

The sign-in page now shows a **Continue with Pocket ID** button.

:::caution
The first sign-in with Pocket ID links the existing Excaliself account and removes its password.
An Excaliself admin can give the password back with a reset link.
:::

## Sources

- [Excaliself single sign-on documentation](https://excaliself.com/docs/single-sign-on/)
