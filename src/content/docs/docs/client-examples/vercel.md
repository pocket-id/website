---
title: Vercel
description: Configure Vercel with Pocket ID using SSO and Directory Sync
---

This guide covers connecting a [Vercel](https://vercel.com/) team to Pocket ID for both **Single Sign-On (SSO)** via OIDC and **Directory Sync (SCIM)**. Once configured, users authenticate to Vercel through Pocket ID and are automatically provisioned into your Vercel team based on their Pocket ID group membership.

:::note
These features are only available on certain Vercel plans:

- **Single Sign-On** requires the **Pro** plan (as a paid add-on) or the **Enterprise** plan.
- **Directory Sync** is available on the **Enterprise** plan only.
:::

The following placeholders are used below — replace them with your own values:

| Placeholder | Replace with |
| --- | --- |
| `pocket-id.example.com` | The URL of your Pocket ID instance |
| `<team_slug>` | Your Vercel team slug, found in your team settings |

:::note
Your Pocket ID instance must be publicly reachable over HTTPS. Vercel connects to it for OIDC discovery and token exchange, and Pocket ID connects out to Vercel for SCIM provisioning.
:::

## Create User Groups in Pocket ID

These groups control who can sign in and which Vercel role each user receives. Create two groups in the Pocket ID admin:

1. **Vercel Users** — grants standard access to the Vercel team
   - Friendly name: `Vercel Users`
   - Name: `vercel-user`
   - Later, when configuring Directory Sync, you will map this group to a Member or Developer role on Vercel
2. **Vercel Admins** — grants admin access to the Vercel team
   - Friendly name: `Vercel Admins`
   - Name: `vercel-admin`
   - Later, when configuring Directory Sync, you will map this group to an Owner role on Vercel

Add your own Pocket ID account to both groups so you can test the connection.

## Configure Single Sign-On (OIDC)

### In Vercel

1. Open your Vercel team's settings and start configuring **Single Sign-On (SAML)**.
2. Select **Custom OIDC** as the provider type.
3. Set the provider name to `Pocket ID`.
4. Copy the **Login redirect URL** shown by Vercel — it looks like `https://auth.vercel.com/sso/oidc/<random-string>/callback`. You'll need it in the next step.

### In Pocket ID

1. Create a new OIDC client named `Vercel`.
2. Set the **Callback URL** to the **Login redirect URL** you copied from Vercel.
3. Set the **Client launch URL** to `https://vercel.com/login?saml=<team_slug>`. This makes the Vercel tile in Pocket ID's *My apps* open Vercel with your team slug pre-filled.
4. Enable **PKCE**.
5. Save the client, then copy the generated **Client ID** and **Client Secret**.
6. Open the client's **Allowed User Groups**, add the **Vercel Users** group, and save again so only members of that group can sign in.

### Back in Vercel

1. Set the **Discovery endpoint** to `https://pocket-id.example.com/.well-known/openid-configuration`.
2. Enter the **Client ID** and **Client Secret** copied from Pocket ID.
3. Save the SSO configuration.

### Test SSO

Sign out of Vercel and sign back in through Pocket ID (or use a private browser window). In Pocket ID's *My apps* view, the **Vercel** tile takes you straight to Vercel with the team slug pre-populated.

## Configure Directory Sync (SCIM)

### In Vercel

1. In your Vercel team's settings, open **Directory Sync** and select **Custom SCIM**.
2. Set the directory provider to **Pocket ID**.
3. Choose **Bearer Token** authentication, then copy the **SCIM endpoint** (looks like `https://auth.vercel.com/scim/v2.0/<random-string>`) and the **Bearer token** (looks like `se_xxx`).

### Back in Pocket ID

1. Edit the `Vercel` OIDC client and enable **SCIM provisioning**.
2. Set the **SCIM endpoint** to the endpoint from Vercel.
3. Set the **SCIM token** to the bearer token from Vercel.
4. Save, then use **Test connection** to confirm Pocket ID can reach Vercel.

### Back in Vercel

1. Save the Directory Sync configuration.
2. Configure the mapping between your Pocket ID groups (**Vercel Users** and **Vercel Admins**) and the corresponding Vercel team roles or Access Groups.  
   For example, map Vercel Users to the Members or Developer role on Vercel, and Vercel Admins to the Owner role on Vercel.

Users who belong to the mapped groups are now provisioned into your Vercel team automatically.

:::note
Directory Sync runs periodically (roughly once an hour). To provision users immediately, open the **Vercel** OIDC client in the Pocket ID admin and trigger a manual SCIM sync — users should appear in Vercel within a few minutes.
:::
