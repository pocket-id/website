---
title: Technitium DNS
description: Set up Pocket ID authentication for Technitium DNS Server
---

Technitium DNS Server supports external OIDC-based Single Sign-On. This guide walks through configuring Pocket ID as the SSO provider for Technitium DNS.

> **Minimum required version: Technitium DNS Server 15.2**

The following example variables are used and should be replaced with your actual URLs:

- `dns.example.com` — URL of your Technitium DNS web interface
- `id.example.com` — URL of your Pocket ID instance

## Key requirements

Technitium DNS SSO has the following characteristics:

- Uses a **confidential client** (Authorization Code flow with client secret). Pocket ID must **not** be set to Public Client.
- **PKCE is not required** — Technitium handles the code exchange server-side.
- SSO login is per-server, not per-user. Once configured, a "Login with SSO" button appears on the login page.
- Group membership in Pocket ID is mapped to **local Technitium groups** (`Administrators`, `DNS Administrators`, `DHCP Administrators`). Users in no mapped group cannot log in.
- New users can be **auto-provisioned** on first SSO login if they belong to a mapped group.
- The `groups` scope must be included so Technitium receives group membership in the token.

---

## Step 1 — Create groups in Pocket ID

Create the following groups in Pocket ID under **Groups → Create group**. Use these exact names — they are referenced in the Technitium group map.

| Group name | Maps to Technitium group |
|---|---|
| `technitium_admins` | `Administrators` — full access |
| `technitium_dns_admins` | `DNS Administrators` — DNS management only |
| `technitium_dhcp_admins` | `DHCP Administrators` — DHCP management only |

Add users to whichever group reflects their role. Users not in any of these groups will be denied access.

> No custom claims are needed on these groups. Technitium reads group names from the standard `groups` claim.

---

## Step 2 — Create the OIDC client in Pocket ID

1. In Pocket ID go to **OIDC Clients → Create client**. Name it, for example, `TechnitiumDNS`.
2. Set a logo if you like.
3. Add the following **Callback URL**:
   ```
   https://dns.example.com/sso/callback
   ```
4. Leave **Logout Callback URL** empty (Technitium does not use a post-logout redirect).
5. Leave **Public Client** disabled — Technitium uses a confidential client with a secret.
6. Leave **PKCE** disabled.
7. Under **Allowed Groups**, restrict access to the three groups created in Step 1.
8. Save and copy the **Client ID** (a UUID) and generate a **Client Secret** — both are needed in Step 3.

> **Generate the client secret immediately after creating the client.** Once you leave the page, the secret is no longer shown. Store it securely.

---

## Step 3 — Configure Technitium SSO

Technitium SSO is server-wide — there is no per-user setup.

1. Log in to Technitium as an administrator.
2. Go to **Administration → SSO Providers**.
3. Enable SSO and fill in the following fields:

| Field | Value |
|---|---|
| Authority | `https://id.example.com` |
| Client ID | UUID copied from Step 2 |
| Client Secret | Secret generated in Step 2 |
| Metadata Address | `https://id.example.com/.well-known/openid-configuration` |
| Scopes | `openid profile email groups` |
| Allow Signup | Enabled |
| Allow Signup Only for Mapped Users | Enabled |

4. Under **Group Map**, add the following entries:

| Remote Group (Pocket ID) | Local Group (Technitium) |
|---|---|
| `technitium_admins` | `Administrators` |
| `technitium_dns_admins` | `DNS Administrators` |
| `technitium_dhcp_admins` | `DHCP Administrators` |

5. Save. Technitium will restart its web service to apply the OIDC middleware.

---

## Troubleshooting

### SSO button does not appear on the login page

SSO is not enabled or the web service did not restart after configuration. Re-open **Administration → SSO Providers** and confirm SSO is enabled and saved. If the setting is correct but the button is still missing, reload the page or clear the browser cache.

### "Access denied" after authenticating with Pocket ID

The user is not a member of any mapped group in Pocket ID. Add the user to one of the three Technitium groups (`technitium_admins`, `technitium_dns_admins`, or `technitium_dhcp_admins`).

Also verify that the Pocket ID client has **Allowed Groups** set to those three groups and that **Restrict to allowed groups** is enabled.

### Authentication fails silently after redirect

The client secret in Pocket ID does not match the one configured in Technitium. Generate a new secret in Pocket ID (**OIDC Clients → TechnitiumDNS → Generate Secret**), then update the Technitium SSO config with the new value.

### Group mapping has no effect (user logs in but gets wrong permissions)

The `groups` scope is missing from the Technitium SSO configuration. Verify the scopes include `groups`. Also check that the remote group names in the Technitium group map **exactly match** the group names in Pocket ID (case-sensitive).

### Existing local admin account is locked out after enabling SSO

SSO does not replace local authentication — both methods remain active. Local accounts can still log in with username and password (plus TOTP if enabled). The SSO button is an additional option, not a replacement.
