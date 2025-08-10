---
title: Proxmox Backup Server
description: Set up Proxmox Backup Server with Pocket ID
---

The following example variables are used, and should be replaced with your actual URLs.

- `pbs.example.com` (The URL of your Proxmox instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it, for example, `Proxmox Backup Server`.
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URL to: `https://pbs.example.com`.
4. Copy the `Client ID`, and the `Client Secret` for use in the next steps.

## Proxmox Backup Server Setup

1. Open the PBS console and navigate to: `Configuration` -> `Access Control` -> `Realms`.
2. Add a new `OpenID Connect Server` Realm.
3. Enter `https://id.example.com` for the `Issuer URL`.
4. Enter a name for the realm of your choice, for example, `PocketID`.
5. Paste the `Client ID` from Pocket ID into the `Client ID` field in PBS.
6. Paste the `Client Secret` from Pocket ID into the `Client Key` field in PBS.
7. You can check the `Default` box if you want this to be the default realm PBS uses when signing in.
8. Check the `Autocreate Users` checkbox. (This will automatically create users in PBS if they don't exist).
9. Select `username` for the `Username Claim` dropdown. (This is a personal preference and controls how the username is shown, for example: `username = username@PocketID` or `email = username@example@PocketID`).
10. Leave the rest as defaults and click `OK` to save the new realm.
11. Sign in with the Pocket ID account to create the user.

Once the user has been created in PBS, then finish the setup:

1. Sign back in as a local administrator to grant permissions per below.
2. In PBS, Edit the `PocketID` realm you created earlier.
3. Set the `Scope` to `openid profile email groups`.
4. You should now see the user groups in PBS, and you can assign permissions:
   - Navigate to `Configuration` -> `Access Control` -> `Permissions`.
   - Click on `Add` and select `User Permission`.
   - Set the `Path` to `/` for the entire datacenter or specify a specific VM or container path.
   - Select the `YourUsername@PocketID` user.
   - Set the `Role` to `Administrator`.
