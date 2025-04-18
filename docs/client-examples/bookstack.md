---
id: bookstack
---

# Bookstack

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Bookstack`
2. Set the callback url to: `https://<your-bookstack-subdomain>.<your-domain>/oidc/callback`
3. Enable PKCE
4. Copy the `Client ID` and `Client Secret` for the next steps.
5. Create Group (Friendly Name: **BookstackAdmin** Name: **admin**)
6. Create Group (Friendly Name: **bookstackEditor** Name: **editor**)
7. Create Group (Friendly Name: **bookstackViewer** Name: **viewer**)
8. Add users to the groups.

## Bookstack Docker Setup

1. Add the environment variables for the bookstack web server container. See the [docs](https://www.bookstackapp.com/docs/admin/oidc-auth/) for more information.
```
AUTH_METHOD=oidc
AUTH_AUTO_INITIATE=true
OIDC_NAME="Login with Pocket ID"
OIDC_DISPLAY_NAME_CLAIMS=name
OIDC_CLIENT_ID=<CLIENT ID FROM Pocket ID Setup>
OIDC_CLIENT_SECRET=<CLIENT Secret FROM Pocket ID Setup>
OIDC_ISSUER=https://<pocketiddomain.example.com
OIDC_END_SESSION_ENDPOINT=true
OIDC_ISSUER_DISCOVER=true

Environment=OIDC_USER_TO_GROUPS=true
Environment=OIDC_REMOVE_FROM_GROUPS=true
Environment=OIDC_ADDITIONAL_SCOPES=groups

### debug OIDC
###Environment=OIDC_DUMP_USER_DETAILS=true
```
