---
title: Wallos
description: Set up Pocket ID authentication for wallos
---

Below URLs are used as placeholders for the paperless-ngx and Pocket ID instances. Replace them with the actual URLs.
- wallos.example.com (The url of your wallos instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

## Create OIDC Client in Pocket ID
1. Create a new OIDC Client in Pocket ID (e.g., `Wallos`).
2. Set the **Callback URL** to the value below.
   ```
   https://wallos.example.com
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Wallos](https://github.com/ellite/Wallos) github or somewhere else and upload it to pocket id.
4. Ensure that PKCE is not on.
5. Click save.
6. Copy the **Client ID**, **Client Secret**, and **Authorization URL**, **Token URL**, and **Userinfo URL** for use in the next section.

## Configure Wallos
1. Open the Wallos admin interface (`/admin.php`) and navigate to: **`OIDC Settings`**
2. Fill in the required fields with values from Pocket ID:
   - **Display Name** of your choice (i.e.: `PocketID`)
   - **Client ID**
   - **Client Secret**
   - **Auth URL**
   - **Token URL**
   - **User info URL**.
3. _Optional:_ Enable Create User automatically.   
4. Turn the OIDC toggle on
5. Save the settings.
6. Test the OAuth login to ensure it works.
