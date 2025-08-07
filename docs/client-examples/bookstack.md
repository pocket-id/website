---
id: bookstack
---

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client (example: `bookstack`).
2. Set the Callback URL to `https://<bookstack-url>/oidc/callback`
3. Enable **PKCE** for improved security.
4. Copy the generated **Client ID** and **Client Secret** values for next steps.

## BookStack Docker Setup

Refer to the BookStack [documentation](https://www.bookstackapp.com/docs/admin/oidc-auth/) for more information if needed.

Add the following variables to your BookStack container `.env` file and restart:

```
AUTH_METHOD=oidc
AUTH_AUTO_INITIATE=true
OIDC_NAME="Pocket ID"
OIDC_DISPLAY_NAME_CLAIMS=name
OIDC_CLIENT_ID=<Client ID from Pocket ID>
OIDC_CLIENT_SECRET=<Client Secret from Pocket ID>
OIDC_ISSUER=https://<pocket-id-domain>
OIDC_END_SESSION_ENDPOINT=true
OIDC_ISSUER_DISCOVER=true
```

### Group synchronization

BookStack also has the ability to sync OIDC user groups with BookStack roles. By default BookStack will match OIDC groups (Pocket ID groups), with the BookStack role display names, with casing ignored.

This feature requires the OIDC server to provide a claim in the ID token with an array of group names.

1. Setup new **Roles** (or rename existing ones) in BookStack. Example:
   - BookStack_Admin
   - BookStack_Editor
   - BookStack_Viewer

2. Create matching groups in Pocket ID:
   - BookStack Admin (`bookstack_admin`)
   - BookStack Editor (`bookstack_editor`)
   - BookStack Viewer (`bookstack_viewer`)

3. Add the following lines to your BookStack container `.env` and restart:

   ```
   OIDC_USER_TO_GROUPS=true
   OIDC_GROUPS_CLAIM=groups
   OIDC_ADDITIONAL_SCOPES=groups
   OIDC_REMOVE_FROM_GROUPS=true
   ```
