---
title: LinkAce
description: Sign in to the LinkAce bookmark archive with Pocket ID.
---

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `LinkAce`.
3. Click **Create** and copy the **Client ID** and the **Client secret**.
   The client secret is only shown once.
4. On the client's **Access** tab, select the groups that may sign in under **Allowed User Groups**, or choose **All Users**.

## Configure LinkAce

Set the following environment variables:

```yaml
SSO_ENABLED: true
SSO_OIDC_ENABLED: true
SSO_OIDC_BASE_URL: https://id.example.com
SSO_OIDC_CLIENT_ID: <client-id>
SSO_OIDC_CLIENT_SECRET: <client-secret>
SSO_OIDC_SCOPES: "openid profile email"
```
