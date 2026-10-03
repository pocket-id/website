---
title: Open WebUI
description: Sign in to Open WebUI with Pocket ID.
client:
  callbackUrls:
    - https://openwebui.example.com/oauth/oidc/callback
---

## Create groups in Pocket ID

_(Optional)_ This step is recommended if you want Open WebUI to manage roles and groups.

1. In Pocket ID, open **Administration → User Groups** and click **Add Group**.
2. Create a group for users and a group for admins, for example with the **Name** `users` and `admins`.

::create-client

## Configure Open WebUI

Add the following to your Docker `.env` file for Open WebUI:

```ini
ENABLE_OAUTH_SIGNUP=true
OAUTH_CLIENT_ID=<client-id>
OAUTH_CLIENT_SECRET=<client-secret>
OAUTH_PROVIDER_NAME=Pocket ID
OPENID_PROVIDER_URL=https://id.example.com/.well-known/openid-configuration
OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true

# For group management, you can use the following variables:
ENABLE_OAUTH_ROLE_MANAGEMENT=true
ENABLE_OAUTH_GROUP_MANAGEMENT=true
ENABLE_OAUTH_GROUP_CREATION=true
# Make sure these match the groups you created in Pocket ID
OAUTH_ALLOWED_ROLES=users,admins
OAUTH_ADMIN_ROLES=admins
OAUTH_ROLES_CLAIM=groups
OAUTH_SCOPES=openid email profile groups

# Optional but useful variables:

# So users are immediately added instead of being "pending"
DEFAULT_USER_ROLE=user
# Make Pocket ID the only auth method
# comment out if you need access via password
ENABLE_LOGIN_FORM=false
# Make Pocket ID the source of truth for the profile pictures
OAUTH_UPDATE_PICTURE_ON_LOGIN=true
```

We recommend keeping a separate admin account without OAuth in Open WebUI, so you don't get locked out while testing the integration.
See the [Open WebUI documentation](https://docs.openwebui.com/reference/env-configuration#oauth) for more information.
