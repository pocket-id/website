---
title: OpenCloud
description: Sign in to OpenCloud with Pocket ID.
---

OpenCloud ships with a built-in identity provider (IDP), but it can be replaced with an external OIDC provider.
This guide walks through replacing the internal IDP with Pocket ID.

Replace `opencloud.example.com` with the domain of your OpenCloud instance and `id.example.com` with the domain of your Pocket ID instance.

## Key requirements

OpenCloud enforces a few constraints on external OIDC providers:

- All clients **must** be **public clients** using **PKCE** (Authorization Code + PKCE flow).
  There are no confidential clients.
- Desktop and mobile clients use **predefined, hardcoded `client_id` values** (`OpenCloudDesktop`, `OpenCloudAndroid`, `OpenCloudIOS`).
  These must be registered in Pocket ID with those exact IDs; see [Create the desktop and mobile clients](#create-the-desktop-and-mobile-clients).
- The provider must include a **role claim** in the access token.
  OpenCloud maps claim values to its internal roles (`opencloudAdmin`, `opencloudSpaceAdmin`, `opencloudUser`, `opencloudGuest`).

## Create groups in Pocket ID

In Pocket ID, open **Administration → User Groups** and click **Add Group** to create the following four groups.
They are used both for access control and role assignment.

| Name | Purpose |
|---|---|
| `opencloud_admins` | Maps to the `opencloudAdmin` role |
| `opencloud_spaceadmins` | Maps to the `opencloudSpaceAdmin` role |
| `opencloud_users` | Maps to the `opencloudUser` role |
| `opencloud_guests` | Maps to the `opencloudGuest` role |

After creating each group, open it and go to **Custom Claims**.
Add a claim with the key `opencloud_role` and the value from the table below:

| Group | Claim key | Claim value |
|---|---|---|
| `opencloud_admins` | `opencloud_role` | `opencloudAdmin` |
| `opencloud_spaceadmins` | `opencloud_role` | `opencloudSpaceAdmin` |
| `opencloud_users` | `opencloud_role` | `opencloudUser` |
| `opencloud_guests` | `opencloud_role` | `opencloudGuest` |

Every user must belong to at least one of these groups.
Users without a group can authenticate but receive an error inside OpenCloud.

## Create the client in Pocket ID

This is the client for the OpenCloud web frontend.

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `OpenCloud`, choose **Public Client** as the client type and add the callback URLs:
   ```
   https://opencloud.example.com/
   https://opencloud.example.com/oidc-callback.html
   https://opencloud.example.com/oidc-silent-redirect.html
   ```
3. Click **Create** and copy the **Client ID** (a UUID).
   You need it to [configure OpenCloud](#configure-opencloud).
4. On the client's **General** tab, add `https://opencloud.example.com` under **Logout Callback URLs**, turn on **PKCE** and save.
5. On the client's **Access** tab, select the four OpenCloud groups under **Allowed User Groups**.

**No client secret is needed.**
OpenCloud's web frontend is a public SPA and never sends a `client_secret`.

## Create the desktop and mobile clients

OpenCloud's desktop and mobile clients send hardcoded `client_id` values that can't be changed in the application.
You must register clients in Pocket ID with those exact IDs instead of the auto-generated UUID.

### Desktop

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `OpenCloud Desktop`, choose **Public Client** as the client type and add the callback URLs:
   ```
   http://127.0.0.1
   http://localhost
   ```
3. Click **Set custom client ID** and enter `OpenCloudDesktop`.
4. Click **Create**.
5. On the client's **General** tab, turn on **PKCE** and save.
6. On the client's **Access** tab, select the four OpenCloud groups under **Allowed User Groups**.

### Android

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `OpenCloud Android`, choose **Public Client** as the client type and add the callback URL `oc://android.opencloud.eu`.
3. Click **Set custom client ID** and enter `OpenCloudAndroid`.
4. Click **Create**.
5. On the client's **General** tab, turn on **PKCE** and save.
6. On the client's **Access** tab, select the four OpenCloud groups under **Allowed User Groups**.

### iOS

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `OpenCloud iOS`, choose **Public Client** as the client type and add the callback URL `oc://ios.opencloud.eu`.
3. Click **Set custom client ID** and enter `OpenCloudIOS`.
4. Click **Create**.
5. On the client's **General** tab, turn on **PKCE** and save.
6. On the client's **Access** tab, select the four OpenCloud groups under **Allowed User Groups**.

## Configure OpenCloud

Set the following environment variables on your OpenCloud deployment.
Replace `id.example.com` with your Pocket ID domain and `<client-id>` with the **Client ID** of the web frontend client.

```bash
# Disable the built-in IDP
OC_EXCLUDE_RUN_SERVICES=idp

# External OIDC issuer
OC_OIDC_ISSUER=https://id.example.com
PROXY_OIDC_ISSUER=https://id.example.com

# Web frontend client (Client ID of the web frontend client)
WEB_OIDC_CLIENT_ID=<client-id>
WEB_OIDC_AUTHORITY=https://id.example.com
WEB_OIDC_METADATA_URL=https://id.example.com/.well-known/openid-configuration
WEB_OIDC_RESPONSE_TYPE=code
WEB_OIDC_SCOPE=openid profile email groups

# Proxy OIDC settings
PROXY_OIDC_CLIENT_ID=<client-id>
PROXY_OIDC_REWRITE_WELLKNOWN=true
PROXY_OIDC_ACCESS_TOKEN_VERIFY_METHOD=none

# User auto-provisioning
PROXY_AUTOPROVISION_ACCOUNTS=true
PROXY_AUTOPROVISION_CLAIM_USERNAME=preferred_username
PROXY_AUTOPROVISION_CLAIM_EMAIL=email
PROXY_AUTOPROVISION_CLAIM_DISPLAYNAME=name
PROXY_AUTOPROVISION_CLAIM_GROUPS=groups

# User identity mapping
PROXY_USER_OIDC_CLAIM=preferred_username
PROXY_USER_CS3_CLAIM=username

# Role assignment — reads the opencloud_role custom claim set on Pocket ID groups
PROXY_ROLE_ASSIGNMENT_DRIVER=oidc
PROXY_ROLE_ASSIGNMENT_OIDC_CLAIM=opencloud_role

# Graph
GRAPH_ASSIGN_DEFAULT_USER_ROLE=false
GRAPH_USERNAME_MATCH=none
```

### Content Security Policy

If you use a CSP config file, allow connections to your Pocket ID instance:

```yaml
directives:
  connect-src:
    - "'self'"
    - 'https://id.example.com'
    - 'wss://id.example.com'
```

> The WebSocket entry must use `wss://id.example.com`, with no trailing slash and no embedded `https://` prefix.

## Troubleshooting

### "Logging you in — Please wait, you are being redirected" (stuck)

The OIDC callback is reached, but the token exchange fails silently.
**Verify that the Pocket ID client has both Public Client and PKCE turned on.**
A confidential client without PKCE causes the redirect to complete but the code exchange to fail, because the browser never sends a `client_secret`.

### "This could be because of a routine safety log out, or because your account is either inactive or not yet authorized for use"

The user authenticated successfully, but OpenCloud couldn't assign a role.
Check:

1. **The user isn't in any OpenCloud group**: add the user to one of the four groups in Pocket ID.
2. **The `opencloud_role` custom claim is missing**: verify each group has the claim configured as described in [Create groups in Pocket ID](#create-groups-in-pocket-id).
3. **The claim name doesn't match**: confirm `PROXY_ROLE_ASSIGNMENT_OIDC_CLAIM` equals `opencloud_role`.

### Desktop or mobile client receives "unauthorized_client"

The predefined client ID (`OpenCloudDesktop`, `OpenCloudAndroid` or `OpenCloudIOS`) doesn't exist in Pocket ID.
Follow [Create the desktop and mobile clients](#create-the-desktop-and-mobile-clients) to register it.

### Users can sign in but see an empty file list or permission errors

`PROXY_USER_OIDC_CLAIM` must identify users uniquely and consistently across logins.
`preferred_username` works well with Pocket ID.
Avoid `email` if users are allowed to change their email address in Pocket ID.
