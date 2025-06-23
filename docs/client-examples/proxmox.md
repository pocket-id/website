---
id: proxmox
---

# Proxmox

The following example variables are used, and should be replaced with your actual URLs.

- `proxmox.example.com` (The URL of your Proxmox instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it, for example, `Proxmox`.
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URL to: `https://proxmox.example.com`.
4. Copy the `Client ID`, and the `Client Secret` for use in the next steps.

## Proxmox Setup

1. Open the Proxmox console and navigate to: `Datacenter` -> `Permissions` -> `Realms`.
2. Add a new `OpenID Connect Server` Realm.
3. Enter `https://id.example.com` for the `Issuer URL`.
4. Enter a name for the realm of your choice, for example, `PocketID`.
5. Paste the `Client ID` from Pocket ID into the `Client ID` field in Proxmox.
6. Paste the `Client Secret` from Pocket ID into the `Client Key` field in Proxmox.
7. You can check the `Default` box if you want this to be the default realm Proxmox uses when signing in.
8. Check the `Autocreate Users` checkbox. (This will automatically create users in Proxmox if they don't exist).
9. Select `username` for the `Username Claim` dropdown. (This is a personal preference and controls how the username is shown, for example: `username = username@PocketID` or `email = username@example@PocketID`).
10. Leave the rest as defaults and click `OK` to save the new realm.
11. Sign in to Proxmox with a Pocket ID user to autocreate the user account.

### User Permissions

For individual standalone user management (without groups):

- Navigate to `Datacenter` -> `Permissions`.
- Click on `Add` and select `User Permission`.
- Set the `Path` to `/` for the entire datacenter or specify a specific VM or container path.
- Select the newly created `YourPocketUsername@PocketID` account.
- Set the `Role` to `Administrator` for this account.

### Group Permissions

:::warning
This is just an example of how to setup RBAC based on OIDC Groups. You may want to adjust the roles and permissions based on your specific needs.
:::

This part is optional, but if you want to restrict access to specific groups and allow specific roles based on user groups, you can do so by following these steps:

#### Pocket ID Setup

1. In Pocket ID create two new `User Groups` for example: `Proxmox Users` and `Proxmox Admins`.
2. Add the users you want to allow access to Proxmox to these groups.
3. Under the `Proxmox` OIDC Client, select the checkbox for `Proxmox Users` and `Proxmox Admins` groups in the `Allowed User Groups` table and `Save`.

#### Proxmox Setup

1. In Proxmox, Edit the `PocketID` realm you created earlier.
2. Set the `Scope` to `openid profile email groups`.
3. Set the `Group Claim` to `groups` and `Save` the realm.
4. Set the `Autocreate Groups` checkbox to have Proxmox automatically create groups based on the groups in Pocket ID.
5. Sign in to Proxmox with a user that is in the `Proxmox Users` or `Proxmox Admins` group.
6. You should now see the user groups in Proxmox, and you can assign permissions:
   - Navigate to `Datacenter` -> `Permissions`.
   - Click on `Add` and select `Group Permission`.
   - Set the `Path` to `/` for the entire datacenter or specify a specific VM or container path.
   - Select the `Proxmox Users@PocketID` or `Proxmox Admins@PocketID` group.
   - Set the `Role` to `PVEAudit` for `Proxmox Users@PocketID`, and `Administrator` for `Proxmox Admins@PocketID`.
