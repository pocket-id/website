---
title: Homarr
description: Enable OIDC login for Homarr dashboard
---

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client (example: `homarr`).
2. Set the Callback URL to `https://<homarr-url>/api/auth/callback/oidc`, or leave blank to autofill on first login.
3. Enable **PKCE** for improved security.
4. Copy the generated **Client ID** and **Client Secret** values for next steps.
5. Create a group in Pocket ID called `homarr_admin` (or your preferred admin group name).

## Homarr Docker Setup

Add the following variables to your Homarr container `.env` file and restart:

```
NEXTAUTH_SECRET=<generate-a-random-secret, f.e. using: openssl rand -base64 32 >
AUTH_PROVIDERS=oidc
AUTH_OIDC_CLIENT_ID=<Client ID from Pocket ID>
AUTH_OIDC_CLIENT_SECRET=<Client Secret from Pocket ID>
AUTH_OIDC_ISSUER=https://<pocket-id-domain>
AUTH_OIDC_CLIENT_NAME="Pocket ID"
AUTH_OIDC_SCOPE_OVERWRITE=openid email profile groups
AUTH_OIDC_GROUPS_ATTRIBUTE=groups
AUTH_LOGOUT_REDIRECT_URL=https://<pocket-id-domain>
AUTH_OIDC_AUTO_LOGIN=true
```

### Admin Group Configuration

During the initial setup of Homarr, you will be prompted to enter an admin group. Enter the group name that exists in Pocket ID and should receive admin rights (e.g., `homarr_admin`).

**Note:** You can optionally include `,credentials` in `AUTH_PROVIDERS` to keep local accounts as fallback:
```
AUTH_PROVIDERS=oidc,credentials
```

