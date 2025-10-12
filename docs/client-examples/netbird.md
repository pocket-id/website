---
title: NetBird
description: Configure NetBird (using ZITADEL) with Pocket ID OIDC
---

## Requirements 

- NetBird self-hosted configured using HTTPS
- Pocket ID configured with HTTPS

## Overview

The NetBird self-hosted [quick start guide](https://docs.netbird.io/selfhosted/selfhosted-quickstart) configures NetBird with the default ZITADEL identity provider (IdP).

This guide will show you how to configure **pass-through OpenID authentication** via ZITADEL, back to Pocket ID. 

*Note:* Changing the NetBird IDP *directly* to Pocket ID from ZITADEL is **not** covered in this guide because of the complexity.

## Configure OIDC Client

Create a regular application in Pocket ID.

- Navigate to **Administration** > **OIDC Clients**
- Click **Add OIDC Client** 
- Set the **Name** to `NetBird` or other
- Leave **Callback URL** blank to autofill
- Set a **Logo** if desired 
- Click **Save**
- Save the **Client ID**, **Client Secret** for the following steps
- **Optional:** Set necessary group restrictions. Only these users will be able to login to NetBird.

## Connect ZITADEL / NetBird to Pocket ID

Next we will connect ZITADEL IdP to Pocket ID for pass through:

- Confirm that the **NetBird** management console loads at: `https://netbird.example.com`
- Login to the **ZITADEL** management console at: `https://netbird.example.com/ui/console`
- Navigate to **Organization** > **Login and Access** > **Modify**
- Navigate to **Login and Access** > **Identity Providers**
- Under the **Add Provider** section, click **Generic OIDC**
- Set the **Name** to `PocketID` or other
- Set the **Issuer** to your main Pocket ID URL (i.e.: `https://id.example.com`)
- Set the **Client ID** to the value you saved earlier
- Set the **Client Secret** to the value you saved earlier
- Expand the **Optional** settings 
- Add `groups` to the **Scopes** list 
- Enable the **Automatic creation** option
- **Optional:** Enable the **Automatic update** option
- **Optional:** Enable the **Account creation allowed (manually)** option
- **Optional:** Enable the **Account linking allowed (manually)** option
- **Optional:** Set the identity prompt dropdown to **Check for existing email** or your choice
- Click **Save** 
- Click **Activate** 
- Test to confirm that you can successfully login to ZITADEL with your Pocket ID

## Recommended: Auto-approve NetBird users

This will auto-approve NetBird users (via IdP from ZITADEL) to avoid manual work:

- Login to **NetBird** as an existing admin account 
- Navigate to **Settings** > **Authentication**
- Disable the **User Approval Required** option
- Click **Save Changes**

## Optional: Set ZITADEL login preferences

Return to the ZITADEL management console and set preferences

- Navigate back to **Organization** > **Login and Access** > **Modify**
- On the **Login Behaviour and Security** section, scroll down 
- Under **Login Form**
  - Disable **Username and Password allowed**
  - Disable **User Registration allowed** 
  - Enable **External Login allowed** 
  - Enable **Password Reset hidden**
