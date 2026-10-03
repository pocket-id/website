---
title: MinIO
description: Sign in to the MinIO object storage console with Pocket ID.
client:
  callbackUrls:
    - https://minio-console.example.com/oauth_callback
  values:
    - clientId
    - clientSecret
---

## Create groups in Pocket ID

1. In Pocket ID, open **Administration → User Groups** and click **Add Group**.
2. Create a group with the **Name** `consoleAdmin` (case-sensitive).
3. Add your user to the `consoleAdmin` group to sign in to MinIO as an administrator.
   You can also add groups for the other built-in policies; see the [MinIO documentation](https://min.io/docs/minio/linux/administration/identity-access-management/policy-based-access-control.html#built-in-policies) for details.

::create-client

## Configure MinIO

1. Sign in to MinIO with an admin (or root) account.
2. Under **Administrator**, select **Identity**, then **OpenID**.
3. Click **Create Configuration** and fill in the fields:
   - **Config URL**: `https://id.example.com/.well-known/openid-configuration`
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Claim Name**: `groups`
   - **Display Name**: `Pocket ID` (or anything you want)
   - **Scopes**: `openid,profile,email,groups`
   - **Redirect URI**: `https://minio-console.example.com/oauth_callback`

## Notes

- You need to enter the client secret every time you edit the OpenID configuration.
  Instead of managing the secret, you can add a new one on the client's **Credentials** tab in Pocket ID with **Add client secret** and enter that.
- If you use `MINIO_BROWSER_REDIRECT_URL=https://minio.example.com/minio-console/` in your MinIO configuration, use `https://minio.example.com/minio-console/oauth_callback` as the callback URL in Pocket ID and as the **Redirect URI** in the MinIO OpenID configuration.
