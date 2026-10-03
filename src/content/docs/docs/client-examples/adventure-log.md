---
title: AdventureLog
description: Sign in to the AdventureLog travel tracker with Pocket ID.
client:
  callbackUrls:
    - "https://adventurelog.example.com/accounts/oidc/<client-id>/login/callback/"
  values:
    - clientId
    - clientSecret
---

## Requirements

- [AdventureLog](https://adventurelog.app/docs/configuration/social_auth.html)
- HTTPS connection to your AdventureLog server

::create-client

## Configure AdventureLog

1. In AdventureLog, open **User Icon → Admin Settings → Social Accounts → Social applications**.
2. Click **Add Social Application**.
3. Fill in the fields:
   - **Provider**: choose `OpenID Connect`.
   - **Provider ID**: the **Client ID** from Pocket ID.
   - **Name**: `Pocket ID`.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Secret Key**: the **Client secret** from Pocket ID.
   - **Settings**: `{"server_url": "https://id.example.com/"`.
4. Click the green plus button under **Sites** and add the following:
   - **Domain Name**: `example.com` (yes, `example.com`, not your domain)
   - **Display Name**: `example.com` (yes, `example.com`, not your domain)
5. Click `example.com` in the **Available Sites** column and move it to **Chosen sites**.
6. Click **Save**.
7. Open your AdventureLog URL and sign in with Pocket ID to test it.

## Link existing accounts

Users can link their existing accounts manually:

1. Click the profile picture.
2. Click **Settings**.
3. Click **Security**.
4. Select **Launch Account Connections**.
5. Add the account you want to link.
