---
title: Proxmox Backup Server
description: Sign in to Proxmox Backup Server with Pocket ID.
client:
  callbackUrls:
    - https://pbs.example.com
  values:
    - clientId
    - clientSecret
---

Replace `pbs.example.com` with the URL of your Proxmox Backup Server instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Proxmox Backup Server

1. Open the PBS console and navigate to **Configuration → Access Control → Realms**.
2. Add a new **OpenID Connect Server** realm.
3. Enter `https://id.example.com` for the **Issuer URL**.
4. Enter a name for the realm of your choice, for example `PocketID`.
5. Paste the **Client ID** from Pocket ID into the **Client ID** field in PBS.
6. Paste the **Client secret** from Pocket ID into the **Client Key** field in PBS.
7. _(Optional)_ Check the **Default** box if you want this to be the default realm PBS uses when signing in.
8. Check the **Autocreate Users** checkbox.
   This automatically creates users in PBS if they don't exist.
9. Select `username` for the **Username Claim** dropdown.
   This is a personal preference and controls how the username is shown, for example `username = username@PocketID` or `email = username@example@PocketID`.
10. Leave the rest as defaults and click **OK** to save the new realm.
11. Sign in with the Pocket ID account to create the user.

Once the user has been created in PBS, finish the setup:

1. Sign back in as a local administrator to grant permissions.
2. In PBS, edit the `PocketID` realm you created earlier.
3. Set **Scope** to `openid profile email groups`.
4. You should now see the user groups in PBS, and you can assign permissions:
   - Navigate to **Configuration → Access Control → Permissions**.
   - Click **Add** and select **User Permission**.
   - Set **Path** to `/` for the entire datacenter or specify a specific VM or container path.
   - Select the `YourUsername@PocketID` user.
   - Set **Role** to `Administrator`.
