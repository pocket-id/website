---
id: pingvin
---

## Requirements

- [Pingvin Share](https://stonith404.github.io/pingvin-share/setup/oauth2login#openid-connect)
- HTTPS connection to your Pingvin server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `pingvin`).
2. Set the **Callback URL** to the value below:
   ```
   https://<your-domain>/api/oauth/callback/oidc
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Pingvin Share project](https://github.com/stonith404/pingvin-share) and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Configure Pingvin using the UI

1. Open Pingvin and navigate to:
   **Administration > Configuration > Social Login**
2. Scroll down and fill in the fields with values from Pocket ID:
   - **OpenID Connect:** `Enabled`
   - **OpenID Connect Discovery URI:** `OIDC Discovery URL`
   - **Sign out from OpenID Connect:** `Enabled` (if desired)
   - **OpenID Connect scope:** `openid email profile groups`

## Controlling access with groups

To control **general** and **admin** access to Pingvin using Pocket ID groups:

1. Open Pingvin and navigate to:
   **Administration > Configuration > Social Login**
2. Scroll down and fill in the following:
   - **OpenID Connect scope:** `openid email profile groups`
   - **Path to roles in OpenID Connect token:** `groups`
   - **OpenID Connect role for general access:** `pingvin` (or similar group name from Pocket ID)
   - **OpenID Connect role for admin access:** `pingvin_admin` (or similar group name from Pocket ID)
