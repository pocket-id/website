---
title: Kasm Workspaces
description: Sign in to Kasm Workspaces with Pocket ID.
client:
  callbackUrls:
    - https://kasm.example.com/api/oidc_callback
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

## Get the redirect URL from Kasm

1. In Kasm, sign in with an administrator account.
2. From the navigation pane on the left, select **Access Management → Authentication → OpenID**.
3. Click the **Add Config** button on the right.
   Scroll to the bottom of the page and copy the **Redirect URL**; this will be the callback URL in Pocket ID.
4. Open Pocket ID in a new tab and continue below.

::create-client

Use the **Redirect URL** you copied from Kasm as the callback URL.

:::note
Don't turn on **PKCE**, as Kasm doesn't support it.
:::

## Configure Kasm

1. Back in the Kasm admin view, fill out the fields as follows:
   - **Display name**: the text a Kasm user will see when signing in (example: `Click here to authenticate with Pocket ID`, or similar).
   - **Auto login**: _(Optional)_ Enable this to bypass the Kasm local login and go straight to Pocket ID.
     This can be enabled _after_ setup is complete.
   - **Client ID**: the **Client ID** from Pocket ID.
   - **Client Secret**: the **Client secret** from Pocket ID.
   - **Authorization URL**: the **Authorization URL** from Pocket ID.
   - **Token URL**: the **Token URL** from Pocket ID.
   - **User Info URL**: the **Userinfo URL** from Pocket ID.
   - **Scope**: The following values can be entered: [`openid, email, profile, groups`].
     These values can be found by opening the **OIDC Discovery URL** in a web browser and looking for the `scopes_supported` string.
   - **Username attribute**: `preferred_username`
   - **Groups attribute**: `groups`
   - **Redirect URL**: This value is pre-populated and doesn't need to be changed.
   - **OpenID Connect Issuer**: This URL is optional and is simply the base URL where Pocket ID is accessed (example: `https://id.example.com`).
   - **Logout with OIDC provider**: This is configured in conjunction with the **OpenID Connect Issuer** above.
     If configured, a user who signs out of Kasm is also signed out of Pocket ID for additional security.
2. Save the configuration and sign in to Kasm in a private browser window to test it.
   You should be able to click the Pocket ID button to sign in.
   If auto login was enabled, Kasm redirects to Pocket ID immediately, skipping the Kasm local login.

:::note
If you need to sign in to Kasm using local accounts (for instance, admin access), click **Cancel** in Pocket ID before selecting your passkey.
If auto login is enabled, this has to be done quickly before Pocket ID redirects to Kasm.
:::
