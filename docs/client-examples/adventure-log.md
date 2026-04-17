---
title: AdventureLog
description: Integrate Pocket ID with AdventureLog
---

## Requirements

- [AdventureLog](https://adventurelog.app/docs/configuration/social_auth.html)
- HTTPS connection to your AdventureLog server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `AdventureLog`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login (recommended).
   ```
   https://<adventurelogbackend.example.com>/accounts/oidc/<client id>/login/callback/
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [AdventureLog project](https://github.com/seanmorley15/AdventureLog/tree/main/documentation/static/img) and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Configure AdventureLog using the UI

1. Open AdventureLog and navigate to:
   **`User Icon > Admin Settings > Social Accounts > Social applications`**
2. Click **Add Social Application**.
3. Fill in the required fields:
   - **Provider**: Choose `OpenID Connect`
   - **Provider ID**: Paste the `Client ID` from Pocket ID.
   - **Name**: Pocket-ID.
   - **Client ID**: Paste the `Client ID` from Pocket ID.
   - **Secret Key**: Paste the `Client Secret` from Pocket ID.
   - **Settings**: Enter `{"server_url": "https://<pocket-id_url>/"`.
4. Click the green plus button under "Sites:" and add the following:
   - **Domain Name:**: 'example.com' (yes, 'example.com' not your domain)
   - **Display Name:**: 'example.com' (yes, 'example.com' not your domain)
5. Click on the 'example.com' in the 'Available Sites' column and move it over to 'Chosen sites'.
6. Click **Save**.
7. Navigate to your AdventureLog URL and test OpenID login.

## Linking Existing Accounts

Users can manually link their accounts by:

1. Clicking their profile picture.
2. Clicking Settings.
3. Clicking Security.
4. Select 'Launch Account Connections'.
5. Add the account you want to link.
