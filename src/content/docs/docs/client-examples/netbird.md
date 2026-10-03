---
title: NetBird
description: Sign in to NetBird (through ZITADEL) with Pocket ID.
client:
  callbackUrls:
    - https://netbird.example.com/ui/login/login/externalidp/callback
    - https://netbird.example.com/idps/callback
  values:
    - clientId
    - clientSecret
---

## Requirements

- NetBird self-hosted, configured with HTTPS
- Pocket ID, configured with HTTPS

## Overview

The NetBird self-hosted [quick start guide](https://docs.netbird.io/selfhosted/selfhosted-quickstart) configures NetBird with the default ZITADEL identity provider (IdP).
This guide shows how to configure **pass-through OpenID authentication** via ZITADEL, back to Pocket ID.

Changing the NetBird IdP _directly_ from ZITADEL to Pocket ID is **not** covered in this guide because of its complexity.

::create-client

The first callback URL is for ZITADEL Login V1 and the second for Login V2, so you only need the one your ZITADEL uses.

## Connect ZITADEL to Pocket ID

Connect the ZITADEL IdP to Pocket ID for pass-through:

1. Confirm that the **NetBird** management console loads at `https://netbird.example.com`.
2. Sign in to the **ZITADEL** management console at `https://netbird.example.com/ui/console`.
3. Open **Organization → Login and Access → Modify**.
4. Open **Login and Access → Identity Providers**.
5. Under **Add Provider**, click **Generic OIDC**.
6. Confirm that the **ZITADEL Callback URL** shown by the provider matches the callback URL in Pocket ID.
7. Set the **Name** to `Pocket ID` or anything you want.
8. Set the **Issuer** to your Pocket ID URL, for example `https://id.example.com`.
9. Set the **Client ID** to the **Client ID** from Pocket ID.
10. Set the **Client Secret** to the **Client secret** from Pocket ID.
11. Expand the **Optional** settings.
12. Add `groups` to the **Scopes** list.
13. Enable **Automatic creation**.
14. _(Optional)_ Enable **Automatic update**.
15. _(Optional)_ Enable **Account creation allowed (manually)**.
16. _(Optional)_ Enable **Account linking allowed (manually)**.
17. _(Optional)_ Set the identity prompt dropdown to **Check for existing email** or your choice.
18. Click **Save**.
19. Click **Activate**.
20. Sign in to ZITADEL with Pocket ID to test it.

## Auto-approve NetBird users

We recommend auto-approving NetBird users (via IdP from ZITADEL) to avoid manual work:

1. Sign in to **NetBird** with an existing admin account.
2. Open **Settings → Authentication**.
3. Disable **User Approval Required**.
4. Click **Save Changes**.

## Set ZITADEL login preferences

_(Optional)_ Return to the ZITADEL management console and set your preferences:

1. Open **Organization → Login and Access → Modify** again.
2. In the **Login Behaviour and Security** section, scroll down.
3. Under **Login Form**:
   - Disable **Username and Password allowed**.
   - Disable **User Registration allowed**.
   - Enable **External Login allowed**.
   - Enable **Password Reset hidden**.
