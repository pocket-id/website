---
id: open-webui
---

# Open WebUI

1. In Pocket-ID, create a new OIDC Client, name it i.e. `Open WebUI`.
2. Set the callback URL to: `https://openwebui.domain/oauth/oidc/callback`
3. Optional but recommended - Create a group for users and a group for admins in Pocket-ID. eg: `users` and `admins`
4. Add the following to your docker `.env` file for Open WebUI:

```ini
ENABLE_OAUTH_SIGNUP=true
OAUTH_CLIENT_ID=<client id from pocket ID>
OAUTH_CLIENT_SECRET=<client secret from pocket ID>
OAUTH_PROVIDER_NAME="Pocket ID"
OPENID_PROVIDER_URL=https://<your pocket id url>/.well-known/openid-configuration
OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true

# For group management, you can use the following variables:
ENABLE_OAUTH_ROLE_MANAGEMENT=true
ENABLE_OAUTH_GROUP_MANAGEMENT=true
ENABLE_OAUTH_GROUP_CREATION=true
# Make sure those match the ones you set up before in Pocket-ID
OAUTH_ALLOWED_ROLES="users, admins"
OAUTH_ADMIN_ROLES=admins
OAUTH_ROLES_CLAIM=groups
OAUTH_SCOPES="openid email profile groups"

# Optional but useful variables:

# So users are immediately added instead of being "pending"
DEFAULT_USER_ROLE=user
# Make Pocket-ID the only auth method
# comment out if you need access via password
ENABLE_LOGIN_FORM=false
# Make Pocket-ID the source of truth for the profile pictures
OAUTH_UPDATE_PICTURE_ON_LOGIN=true
```

Its recommended you have a separate admin account in Open WebUI so you don't get locked out when testing the integration.
[Read more](https://docs.openwebui.com/getting-started/env-configuration#oauth)
