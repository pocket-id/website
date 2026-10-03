---
title: Cloudflare Zero Trust
description: Use Pocket ID as an identity provider for Cloudflare Zero Trust Access.
client:
  callbackUrls:
    - "https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback"
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - certificateUrl
---

:::caution
Cloudflare needs to be able to reach your Pocket ID instance and vice versa for this to work correctly.
:::

::create-client

## Configure Cloudflare Zero Trust

1. Sign in to the Cloudflare Zero Trust [dashboard](https://one.dash.cloudflare.com/).
2. In the left navigation, go to **Integrations → Identity providers**.
3. Under **Identity provider integrations**, click **Add an identity provider**.
4. Choose **OpenID Connect** as the identity provider.
5. Enter a name for the new login method.
6. Fill in the fields:
   - **App ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Auth URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **Certificate URL**: the **Certificate URL** from Pocket ID.
7. Save the new login method and test it in Cloudflare.
