---
title: Vercel
description: Sign in to Vercel with Pocket ID and provision users with Directory Sync.
---

This guide connects a [Vercel](https://vercel.com/) team to Pocket ID for both **Single Sign-On (SSO)** via OIDC and **Directory Sync (SCIM)**.
Once configured, users sign in to Vercel through Pocket ID and are automatically provisioned into your Vercel team based on their Pocket ID group membership.

:::note
These features are only available on certain Vercel plans:

- **Single Sign-On** requires the **Pro** plan (as a paid add-on) or the **Enterprise** plan.
- **Directory Sync** is available on the **Enterprise** plan only.
:::

The following placeholders are used below.
Replace them with your own values:

| Placeholder | Replace with |
| --- | --- |
| `id.example.com` | The URL of your Pocket ID instance |
| `<team_slug>` | Your Vercel team slug, found in your team settings |

:::note
Your Pocket ID instance must be publicly reachable over HTTPS.
Vercel connects to it for OIDC discovery and token exchange, and Pocket ID connects to Vercel for SCIM provisioning.
:::

## Create groups in Pocket ID

These groups control who can sign in and which Vercel role each user receives.
In Pocket ID, open **Administration → User Groups** and click **Add Group** to create two groups:

1. **Vercel Users** grants standard access to the Vercel team.
   - **Friendly Name**: `Vercel Users`
   - **Name**: `vercel-user`
   - Later, when configuring Directory Sync, you map this group to a Member or Developer role on Vercel.
2. **Vercel Admins** grants admin access to the Vercel team.
   - **Friendly Name**: `Vercel Admins`
   - **Name**: `vercel-admin`
   - Later, when configuring Directory Sync, you map this group to an Owner role on Vercel.

Add your own Pocket ID account to both groups so you can test the connection.

## Start the SSO setup in Vercel

1. Open your Vercel team's settings and start configuring **Single Sign-On (SAML)**.
2. Select **Custom OIDC** as the provider type.
3. Set the provider name to `Pocket ID`.
4. Copy the **Login redirect URL** shown by Vercel.
   It looks like `https://auth.vercel.com/sso/oidc/<random-string>/callback`.
   You need it in the next step.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `Vercel` and add the **Login redirect URL** you copied from Vercel as the callback URL.
3. Click **Create** and copy the **Client ID** and the **Client secret**.
   The client secret is only shown once.
4. On the client's **General** tab, set **Client Launch URL** to `https://vercel.com/login?saml=<team_slug>`, turn on **PKCE** and save.
   The launch URL makes the Vercel tile in Pocket ID's **My Apps** open Vercel with your team slug pre-filled.
5. On the client's **Access** tab, select the **Vercel Users** group under **Allowed User Groups** so that only members of that group can sign in.

## Finish the SSO setup in Vercel

1. Set the **Discovery endpoint** to `https://id.example.com/.well-known/openid-configuration`.
2. Enter the **Client ID** and the **Client secret** from Pocket ID.
3. Save the SSO configuration.

### Test SSO

Sign out of Vercel and sign back in through Pocket ID (or use a private browser window).
In Pocket ID's **My Apps** view, the **Vercel** tile takes you straight to Vercel with the team slug pre-filled.

## Configure Directory Sync (SCIM)

### In Vercel

1. In your Vercel team's settings, open **Directory Sync** and select **Custom SCIM**.
2. Set the directory provider to **Pocket ID**.
3. Choose **Bearer Token** authentication, then copy the **SCIM endpoint** (looks like `https://auth.vercel.com/scim/v2.0/<random-string>`) and the **Bearer token** (looks like `se_xxx`).

### In Pocket ID

1. Open the `Vercel` OIDC client and go to its **SCIM Provisioning** tab.
2. Set **SCIM Endpoint** to the SCIM endpoint from Vercel.
3. Set **SCIM Token** to the bearer token from Vercel.
4. Click **Enable**.

### Back in Vercel

1. Save the Directory Sync configuration.
2. Configure the mapping between your Pocket ID groups (**Vercel Users** and **Vercel Admins**) and the corresponding Vercel team roles or Access Groups.
   For example, map Vercel Users to the Member or Developer role on Vercel, and Vercel Admins to the Owner role on Vercel.

Users who belong to the mapped groups are now provisioned into your Vercel team automatically.

:::note
Directory Sync runs periodically (roughly once an hour).
To provision users immediately, click **Sync now** on the **SCIM Provisioning** tab of the `Vercel` client in Pocket ID.
Users should appear in Vercel within a few minutes.
:::
