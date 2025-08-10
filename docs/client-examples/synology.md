---
title: Synology
description: Configure Synology NAS with Pocket ID OIDC
---

The following example variables are used, and should be replaced with your actual URLS.

- synology.example.com (The url of your Synology instance.)
- id.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Synology`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://synology.example.com/`.
4. Copy the `Client ID`, `Client Secret`, `OIDC Discovery URL` for use in the next steps.

# Synology Setup

1. Open the Synology DSM web interface and open `Control Panel`.
2. Choose `Domain/LDAP` in the left side, then choose the `SSO Client` tab at the top.
3. Below the `Services` heading, check the box for `Enable OpenID Connect SSO service`
4. Press the `OpenID Connect SSO Settings` button to open the configuration dialog.
5. Choose `Profile:` as `OIDC`.
6. Choose `Account type:` as `Domain/LDAP/local`.
7. Set `Name:` to `PocketID`.
8. Paste the `OIDC Discovery URL` from Pocket ID into the `Well-known URL` field.
9. Paste the `Client ID` from Pocket ID into the `Application ID` field.
10. Paste the `Client Secret` from Pocket ID into the `Application secret` field.
11. Set the `Redirect URL` to `https://synology.example.com`
12. Set the `Authorization scope` field to: `openid email profile`
13. Set the `Username claim` field to `preferred_username`. (This will use the users username vs the email. If the Pocket ID username matches the local Synology DSM account name, it will log in as the existing user.)
14. Press the `Save` button.
15. Press the `Apply` button on the `Control Panel` page.
16. Test the new OAuth login by logging out and logging back in again. The login page should now have a `SSO Authentication` tab that lets you `Continue with PocketID`.
