---
title: Proxmox
description: Sign in to Proxmox VE with Pocket ID.
client:
  callbackUrls:
    - https://proxmox.example.com
  values:
    - clientId
    - clientSecret
---

Replace `proxmox.example.com` with the URL of your Proxmox instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Proxmox

1. Open the Proxmox console and navigate to **Datacenter → Permissions → Realms**.
2. Add a new **OpenID Connect Server** realm.
3. Enter `https://id.example.com` for the **Issuer URL**.
4. Enter a name for the realm of your choice, for example `PocketID`.
5. Paste the **Client ID** from Pocket ID into the **Client ID** field in Proxmox.
6. Paste the **Client secret** from Pocket ID into the **Client Key** field in Proxmox.
7. _(Optional)_ Check the **Default** box if you want this to be the default realm Proxmox uses when signing in.
8. Check the **Autocreate Users** checkbox.
   This automatically creates users in Proxmox if they don't exist.
9. Select `username` for the **Username Claim** dropdown.
   This is a personal preference and controls how the username is shown, for example `username = username@PocketID` or `email = username@example@PocketID`.
10. Leave the rest as defaults and click **OK** to save the new realm.
11. Sign in to Proxmox with a Pocket ID user to autocreate the user account.

### User permissions

For individual standalone user management (without groups):

- Navigate to **Datacenter → Permissions**.
- Click **Add** and select **User Permission**.
- Set **Path** to `/` for the entire datacenter or specify a specific VM or container path.
- Select the newly created `YourPocketUsername@PocketID` account.
- Set **Role** to `Administrator` for this account.

### Group permissions

:::caution
This is just an example of how to set up RBAC based on OIDC groups.
You may want to adjust the roles and permissions based on your specific needs.
:::

This part is optional.
If you want to restrict access to specific groups and allow specific roles based on user groups, follow these steps.

#### In Pocket ID

1. Open **Administration → User Groups** and click **Add Group** to create two groups, for example `Proxmox Users` and `Proxmox Admins`.
2. Add the users you want to allow access to Proxmox to these groups.
3. On the `Proxmox` client's **Access** tab, select the `Proxmox Users` and `Proxmox Admins` groups under **Allowed User Groups** and save.

#### In Proxmox

1. In Proxmox, edit the `PocketID` realm you created earlier.
2. Set **Scope** to `openid profile email groups`.
3. Set **Group Claim** to `groups` and save the realm.
4. Check the **Autocreate Groups** checkbox to have Proxmox automatically create groups based on the groups in Pocket ID.
5. Sign in to Proxmox with a user that is in the `Proxmox Users` or `Proxmox Admins` group.
6. You should now see the user groups in Proxmox, and you can assign permissions:
   - Navigate to **Datacenter → Permissions**.
   - Click **Add** and select **Group Permission**.
   - Set **Path** to `/` for the entire datacenter or specify a specific VM or container path.
   - Select the `Proxmox Users@PocketID` or `Proxmox Admins@PocketID` group.
   - Set **Role** to `PVEAudit` for `Proxmox Users@PocketID`, and `Administrator` for `Proxmox Admins@PocketID`.
