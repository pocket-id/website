---
title: Pangolin
description: Sign in to Pangolin with Pocket ID.
client:
  callbackUrls:
    - "https://pangolin.example.com/auth/idp/<identity-provider-id>/oidc/callback"
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
---

::create-client

Pangolin shows the ID for `<identity-provider-id>` only after you create the identity provider, so you update the callback URL later.

## Configure Pangolin

1. Sign in to Pangolin with your superuser account.
2. Under **Server Admin**, select **Identity Providers**, then **Add Identity Provider**.
3. Fill in the fields:
   - **Identity Provider**
     - **Name**: `Pocket ID` (or anything you want)
     - Enable **Auto Provision Users** (only if you want auto provisioning)
   - **Provider Type**: select **OAuth2/OIDC**.
   - **OAuth2/OIDC Configuration**
     - **Client ID**: the **Client ID** from Pocket ID.
     - **Client Secret**: the **Client secret** from Pocket ID.
     - **Authorization URL**: the **Authorization URL** from Pocket ID.
     - **Token URL**: the **Token URL** from Pocket ID.
   - **Token Configuration**
     - **Identifier Path**: one of `email`, `preferred_username` or `sub` (Advanced)
     - **Email Path**: `email`
     - **Name Path**: `name`
     - **Scopes**: `openid profile email` (include `groups` for auto provisioning)
4. Save the new identity provider.
5. Copy the **Redirect URL** shown by Pangolin and update the callback URL of the client in Pocket ID so that the two values match exactly.

## Create users

Create users either with auto provisioning or manually.
Once you have created a user, sign out of Pangolin and sign in with Pocket ID to test it.

### Auto provisioning

See [Pangolin's docs on auto provisioning](https://docs.pangolin.net/manage/identity-providers/auto-provisioning) for more advanced setups.

1. In Pocket ID, open **Administration → User Groups**, click **Add Group** and create a group:
   - **Friendly Name**: `Admin` (or anything you want)
   - **Name**: `admin` (or anything you want)
2. Add the desired admin users to the group.
3. In Pangolin, under **Server Admin → Identity Providers**, edit the Pocket ID provider and make sure **Auto Provision Users** is enabled and the **Scopes** include `groups`.
4. Open **Organization Policies**.
5. Under **Default Mappings**, set:
   - **Default Role Mapping**: `contains(groups, 'admin') && 'Admin' || 'Member'` (replace `admin` with the name of your user group)
   - **Default Organization Mapping**: `'YOUR PANGOLIN ORGANIZATION ID'` (see the examples of [advanced mappings in Pangolin's docs](https://docs.pangolin.net/manage/identity-providers/auto-provisioning#selecting-organizations))
6. Click **Save Default Mappings**.

### Manually

1. In Pangolin, go to your organization, select **Users**, then **Create User**.
2. Select **External User**, select your Pocket ID identity provider and fill in the relevant details.
   Enter the value that matches your **Identifier Path** in the **Username** field:
   - `email` is your Pocket ID email.
   - `preferred_username` is your Pocket ID username.

## Troubleshooting

### User not provisioned (Manual) in the system

Make sure you have created a user in Pangolin and that its **Username** matches the **Identifier Path** used.

### After signing in with OIDC (auto provisioned): `There was a problem connecting to Pocket ID. Please contact your administrator.`

In Pangolin, under **Server Admin → Identity Providers**, edit the Pocket ID provider and make sure the **Scopes** include `groups`.

### Invalid callback URL, it might be necessary for an admin to fix this

The callback URL isn't set correctly in Pocket ID.
Make sure it matches the **Redirect URL** in your Pangolin OIDC configuration, for example `https://pangolin.example.com/auth/idp/1/oidc/callback`.
