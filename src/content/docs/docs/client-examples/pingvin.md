---
title: Pingvin Share
description: Sign in to the Pingvin Share file sharing platform with Pocket ID.
client:
  callbackUrls:
    - https://pingvin.example.com/api/oauth/callback/oidc
---

## Requirements

- [Pingvin Share](https://stonith404.github.io/pingvin-share/setup/oauth2login#openid-connect)
- HTTPS connection to your Pingvin Share server

::create-client

## Configure Pingvin Share

1. Open Pingvin Share and navigate to **Administration → Configuration → Social Login**.
2. Scroll down and fill in the fields:
   - **OpenID Connect**: `Enabled`
   - **OpenID Connect Discovery URI**: the **OIDC Discovery URL** from Pocket ID.
   - **Sign out from OpenID Connect**: `Enabled` (if desired)
   - **OpenID Connect scope**: `openid email profile groups`

## Control access with groups

To control **general** and **admin** access to Pingvin Share using Pocket ID groups:

1. Open Pingvin Share and navigate to **Administration → Configuration → Social Login**.
2. Scroll down and fill in the following:
   - **OpenID Connect scope**: `openid email profile groups`
   - **Path to roles in OpenID Connect token**: `groups`
   - **OpenID Connect role for general access**: `pingvin` (or a similar group name from Pocket ID)
   - **OpenID Connect role for admin access**: `pingvin_admin` (or a similar group name from Pocket ID)
