---
title: OpenCloud
description: Set up Pocket ID authentication for OpenCloud
---

OpenCloud ships with a built-in identity provider (IDP), but it can be replaced with an external OIDC provider. This guide walks through replacing the internal IDP with Pocket ID.

The following example variables are used and should be replaced with your actual URLs:

- `cloud.example.com` — URL of your OpenCloud instance
- `id.example.com` — URL of your Pocket ID instance

## Key requirements

OpenCloud enforces a few constraints on external OIDC providers:

- All clients **must** be **public clients** using **PKCE** (Authorization Code + PKCE flow). There are no confidential clients.
- Desktop and mobile clients use **predefined, hardcoded `client_id` values** (`OpenCloudDesktop`, `OpenCloudAndroid`, `OpenCloudIOS`). These must be registered in Pocket ID with those exact IDs — see [Desktop and Mobile Clients](#step-3--desktop-and-mobile-clients).
- The provider must include a **role claim** in the access token. OpenCloud maps claim values to its internal roles (`opencloudAdmin`, `opencloudSpaceAdmin`, `opencloudUser`, `opencloudGuest`).

---

## Step 1 — Create groups in Pocket ID

Create the following four groups in Pocket ID under **Groups → Create group**. These are used both for access control and role assignment.

| Group name | Purpose |
|---|---|
| `opencloud_admins` | Maps to the `opencloudAdmin` role |
| `opencloud_spaceadmins` | Maps to the `opencloudSpaceAdmin` role |
| `opencloud_users` | Maps to the `opencloudUser` role |
| `opencloud_guests` | Maps to the `opencloudGuest` role |

After creating each group, open it and go to **Custom Claims**. Add a claim with the key `opencloud_role` and the value from the table below:

| Group | Claim key | Claim value |
|---|---|---|
| `opencloud_admins` | `opencloud_role` | `opencloudAdmin` |
| `opencloud_spaceadmins` | `opencloud_role` | `opencloudSpaceAdmin` |
| `opencloud_users` | `opencloud_role` | `opencloudUser` |
| `opencloud_guests` | `opencloud_role` | `opencloudGuest` |

Every user must belong to at least one of these groups. Users without a group will authenticate but receive an error inside OpenCloud.

---

## Step 2 — Web client

1. In Pocket ID go to **OIDC Clients → Create client**. Name it, for example, `Opencloud`.
2. Set a logo if you like.
3. Add the following **Callback URLs**:
   ```
   https://cloud.example.com/
   https://cloud.example.com/oidc-callback.html
   https://cloud.example.com/oidc-silent-redirect.html
   ```
4. Add the following **Logout Callback URL**:
   ```
   https://cloud.example.com
   ```
5. Enable **Public Client**.
6. Enable **PKCE**.
7. Optionally restrict access under **Allowed Groups** to the four opencloud groups created in Step 1.
8. Save and copy the **Client ID** (a UUID) — you will need it in Step 4.

> **No client secret is needed.** OpenCloud's web frontend is a public SPA and will never send a `client_secret`.

---

## Step 3 — Desktop and Mobile Clients

OpenCloud's desktop and mobile clients send hardcoded `client_id` values that cannot be changed in the application. You must register clients in Pocket ID with those exact IDs.

Pocket ID's standard **Create client** form auto-generates a UUID as the client ID. To register clients with custom IDs, insert them directly into the Pocket ID PostgreSQL database. Once created, they appear normally in the Pocket ID web UI and can be managed from there like any other client.

**Get the admin user UUID first:**

```sql
SELECT id FROM users WHERE username = 'admin';
```

**Insert the three clients:**

```sql
-- Desktop (http://127.0.0.1 matches any port — no wildcard needed)
INSERT INTO oidc_clients (
  id, created_at, name, secret, callback_urls,
  created_by_id, is_public, pkce_enabled,
  logout_callback_urls, credentials, launch_url,
  requires_reauthentication, is_group_restricted
) VALUES (
  'OpenCloudDesktop', NOW(), 'OpenCloud Desktop', NULL,
  '["http://127.0.0.1", "http://localhost"]',
  '<ADMIN_USER_UUID>',
  true, true, '[]', '{}', NULL, false, false
);

-- Android
INSERT INTO oidc_clients (
  id, created_at, name, secret, callback_urls,
  created_by_id, is_public, pkce_enabled,
  logout_callback_urls, credentials, launch_url,
  requires_reauthentication, is_group_restricted
) VALUES (
  'OpenCloudAndroid', NOW(), 'OpenCloud Android', NULL,
  '["oc://android.opencloud.eu"]',
  '<ADMIN_USER_UUID>',
  true, true, '[]', '{}', NULL, false, false
);

-- iOS
INSERT INTO oidc_clients (
  id, created_at, name, secret, callback_urls,
  created_by_id, is_public, pkce_enabled,
  logout_callback_urls, credentials, launch_url,
  requires_reauthentication, is_group_restricted
) VALUES (
  'OpenCloudIOS', NOW(), 'OpenCloud iOS', NULL,
  '["oc://ios.opencloud.eu"]',
  '<ADMIN_USER_UUID>',
  true, true, '[]', '{}', NULL, false, false
);
```

After inserting, the three clients appear in **Pocket ID → OIDC Clients**. From the web UI you can now:

- Update callback URLs
- Add a logo
- Set **Allowed Groups** to restrict access to the four opencloud groups

To restrict access via SQL instead:

```sql
INSERT INTO oidc_clients_allowed_user_groups (oidc_client_id, user_group_id)
SELECT client_id, id FROM
  (VALUES ('OpenCloudDesktop'), ('OpenCloudAndroid'), ('OpenCloudIOS')) AS c(client_id),
  user_groups
WHERE user_groups.name IN (
  'opencloud_admins', 'opencloud_spaceadmins',
  'opencloud_users', 'opencloud_guests'
);

UPDATE oidc_clients SET is_group_restricted = true
WHERE id IN ('OpenCloudDesktop', 'OpenCloudAndroid', 'OpenCloudIOS');
```

---

## Step 4 — Configure OpenCloud

Set the following environment variables on your OpenCloud deployment. Replace `id.example.com` with your Pocket ID URL and `<CLIENT_ID>` with the UUID copied from Step 2.

```bash
# Disable the built-in IDP
OC_EXCLUDE_RUN_SERVICES=idp

# External OIDC issuer
OC_OIDC_ISSUER=https://id.example.com
PROXY_OIDC_ISSUER=https://id.example.com

# Web frontend client (UUID from Step 2)
WEB_OIDC_CLIENT_ID=<CLIENT_ID>
WEB_OIDC_AUTHORITY=https://id.example.com
WEB_OIDC_METADATA_URL=https://id.example.com/.well-known/openid-configuration
WEB_OIDC_RESPONSE_TYPE=code
WEB_OIDC_SCOPE=openid profile email groups

# Proxy OIDC settings
PROXY_OIDC_CLIENT_ID=<CLIENT_ID>
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

> The WebSocket entry must use `wss://id.example.com` — no trailing slash, and no embedded `https://` prefix.

---

## Troubleshooting

### "Logging you in — Please wait, you are being redirected" (stuck)

The OIDC callback is reached but the token exchange fails silently. **Verify that the Pocket ID client has both `Public Client` and `PKCE` enabled.** A confidential client without PKCE causes the redirect to complete but the code exchange to fail because the browser never sends a `client_secret`.

### "This could be because of a routine safety log out, or because your account is either inactive or not yet authorized for use"

The user authenticated successfully but OpenCloud could not assign a role. Check:

1. **User is not in any opencloud group** — add the user to one of the four groups in Pocket ID.
2. **`opencloud_role` custom claim is missing** — verify each group has the claim configured as described in Step 1.
3. **Claim name mismatch** — confirm `PROXY_ROLE_ASSIGNMENT_OIDC_CLAIM` equals `opencloud_role`.

### Desktop or mobile client receives "unauthorized_client"

The predefined client ID (`OpenCloudDesktop`, `OpenCloudAndroid`, or `OpenCloudIOS`) does not exist in Pocket ID. Follow [Step 3](#step-3--desktop-and-mobile-clients) to register it.

### Users can log in but see an empty file list or permission errors

`PROXY_USER_OIDC_CLAIM` must identify users uniquely and consistently across logins. `preferred_username` works well with Pocket ID. Avoid `email` if users are allowed to change their email address in Pocket ID.
