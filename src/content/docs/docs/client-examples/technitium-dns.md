---
title: Technitium DNS
description: Sign in to Technitium DNS Server with Pocket ID.
client:
  callbackUrls:
    - https://dns.example.com/sso/callback
  values:
    - clientId
    - clientSecret
  allowedGroups:
    - technitium_admins
    - technitium_dns_admins
    - technitium_dhcp_admins
---

Technitium DNS Server supports external OIDC-based single sign-on.
This guide configures Pocket ID as the SSO provider for Technitium DNS.

Replace `dns.example.com` with the URL of your Technitium DNS web interface and `id.example.com` with the URL of your Pocket ID instance.

## Requirements

- Technitium DNS Server 15.2 or later

Technitium DNS SSO has the following characteristics:

- It uses a **confidential client** (Authorization Code flow with client secret).
  The Pocket ID client must **not** be a public client.
- **PKCE is not required**, because Technitium handles the code exchange server-side.
- SSO login is per-server, not per-user.
  Once configured, a "Login with SSO" button appears on the login page.
- Group membership in Pocket ID is mapped to **local Technitium groups** (`Administrators`, `DNS Administrators`, `DHCP Administrators`).
  Users in no mapped group can't log in.
- New users can be **auto-provisioned** on first SSO login if they belong to a mapped group.
- The `groups` scope must be included so Technitium receives group membership in the token.

## Create groups in Pocket ID

In Pocket ID, open **Administration → User Groups** and click **Add Group** to create the following groups.
Use these exact values for **Name**, because they're referenced in the Technitium group map.

| Group name | Maps to Technitium group |
|---|---|
| `technitium_admins` | `Administrators` (full access) |
| `technitium_dns_admins` | `DNS Administrators` (DNS management only) |
| `technitium_dhcp_admins` | `DHCP Administrators` (DHCP management only) |

Add users to whichever group reflects their role.
Users not in any of these groups are denied access.

> No custom claims are needed on these groups.
> Technitium reads group names from the standard `groups` claim.

::create-client

## Configure Technitium DNS

Technitium SSO is server-wide, so there is no per-user setup.

1. Log in to Technitium as an administrator.
2. Go to **Administration → SSO Providers**.
3. Enable SSO and fill in the following fields:

   | Field | Value |
   |---|---|
   | Authority | `https://id.example.com` |
   | Client ID | The **Client ID** from Pocket ID |
   | Client Secret | The **Client secret** from Pocket ID |
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

5. Save.
   Technitium restarts its web service to apply the OIDC middleware.

## Troubleshooting

### SSO button does not appear on the login page

SSO is not enabled or the web service did not restart after configuration.
Re-open **Administration → SSO Providers** and confirm SSO is enabled and saved.
If the setting is correct but the button is still missing, reload the page or clear the browser cache.

### "Access denied" after authenticating with Pocket ID

The user is not a member of any mapped group in Pocket ID.
Add the user to one of the three Technitium groups (`technitium_admins`, `technitium_dns_admins`, or `technitium_dhcp_admins`).

Also verify that **Allowed User Groups** on the client's **Access** tab in Pocket ID contains those three groups.

### Authentication fails silently after redirect

The client secret in Pocket ID does not match the one configured in Technitium.
Add a new secret on the client's **Credentials** tab in Pocket ID with **Add client secret**, then update the Technitium SSO config with the new value.

### Group mapping has no effect (user logs in but gets wrong permissions)

The `groups` scope is missing from the Technitium SSO configuration.
Verify that the scopes include `groups`.
Also check that the remote group names in the Technitium group map **exactly match** the group names in Pocket ID (case-sensitive).

### Existing local admin account is locked out after enabling SSO

SSO does not replace local authentication, so both methods remain active.
Local accounts can still log in with username and password (plus TOTP if enabled).
The SSO button is an additional option, not a replacement.
