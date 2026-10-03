---
title: BookStack
description: Sign in to the BookStack wiki with Pocket ID.
client:
  callbackUrls:
    - https://bookstack.example.com/oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure BookStack

Refer to the BookStack [documentation](https://www.bookstackapp.com/docs/admin/oidc-auth/) for more information if needed.

Add the following variables to the `.env` file of your BookStack container and restart it:

```ini
AUTH_METHOD=oidc
AUTH_AUTO_INITIATE=true
OIDC_NAME="Pocket ID"
OIDC_DISPLAY_NAME_CLAIMS=name
OIDC_CLIENT_ID=<client-id>
OIDC_CLIENT_SECRET=<client-secret>
OIDC_ISSUER=https://id.example.com
OIDC_END_SESSION_ENDPOINT=true
OIDC_ISSUER_DISCOVER=true
```

### Group synchronization

BookStack can sync OIDC user groups with BookStack roles.
By default, BookStack matches OIDC groups (Pocket ID groups) with the display names of BookStack roles, ignoring case.

This feature requires the OIDC server to provide a claim in the ID token with an array of group names.

1. Set up new **Roles** (or rename existing ones) in BookStack, for example:
   - BookStack_Admin
   - BookStack_Editor
   - BookStack_Viewer
2. In Pocket ID, open **Administration → User Groups** and create matching groups with **Add Group** (**Friendly Name** and **Name**):
   - BookStack Admin (`bookstack_admin`)
   - BookStack Editor (`bookstack_editor`)
   - BookStack Viewer (`bookstack_viewer`)
3. Add the following lines to the `.env` file of your BookStack container and restart it:
   ```ini
   OIDC_USER_TO_GROUPS=true
   OIDC_GROUPS_CLAIM=groups
   OIDC_ADDITIONAL_SCOPES=groups
   OIDC_REMOVE_FROM_GROUPS=true
   ```
