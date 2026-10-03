---
title: Homarr
description: Sign in to the Homarr dashboard with Pocket ID.
client:
  callbackUrls:
    - https://homarr.example.com/api/auth/callback/oidc
  pkce: true
  values:
    - clientId
    - clientSecret
---

## Create a group in Pocket ID

1. In Pocket ID, open **Administration → User Groups** and click **Add Group**.
2. Create a group called `homarr_admin` (or your preferred admin group name).

::create-client

## Configure Homarr

Add the following variables to your Homarr container `.env` file and restart:

```ini
NEXTAUTH_SECRET=<generate-a-random-secret, f.e. using: openssl rand -base64 32 >
AUTH_PROVIDERS=oidc
AUTH_OIDC_CLIENT_ID=<client-id>
AUTH_OIDC_CLIENT_SECRET=<client-secret>
AUTH_OIDC_ISSUER=https://id.example.com
AUTH_OIDC_CLIENT_NAME="Pocket ID"
AUTH_OIDC_SCOPE_OVERWRITE=openid email profile groups
AUTH_OIDC_GROUPS_ATTRIBUTE=groups
AUTH_LOGOUT_REDIRECT_URL=https://id.example.com
AUTH_OIDC_AUTO_LOGIN=true
```

### Admin group

During the initial setup of Homarr, you will be prompted to enter an admin group.
Enter the name of the Pocket ID group that should receive admin rights (e.g., `homarr_admin`).

:::note
You can optionally include `,credentials` in `AUTH_PROVIDERS` to keep local accounts as a fallback:

```ini
AUTH_PROVIDERS=oidc,credentials
```
:::
