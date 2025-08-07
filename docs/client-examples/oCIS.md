# oCIS

## What is oCIS

ownCloud Infinite Scale (oCIS) is the new file sync & share platform that will be the foundation of your data management platform.

- https://owncloud.dev/ocis/

## Preparation

- `ocis.company.com` is the FQDN of the ocis server.
- `pocket-id.company.com` is the FQDN of the pocket-id server.

  > [!NOTE]
  > This documentation lists only the settings that you need to change from their default values. Be aware that any changes other than those explicitly mentioned in this guide could cause issues accessing your application.

  > [!NOTE]
  > Pocket ID sends the Access-Control-Allow-Origin "pocket-id.company.com" for pocket-id.company.com/.well-known/openid-configuration . See https://github.com/pocket-id/pocket-id/issues/329
  > If you use nginx instead of caddy (CADDY_DISABLED=true) add to the location part of your nginx configuration for Pocket ID

```
location /.well-known/ {
.
.
.

    proxy_hide_header Access-Control-Allow-headers;
    proxy_hide_header Access-Control-Allow-Origin;
    add_header Access-Control-Allow-Origin "$http_origin";
}
```

## Pocket ID configuration

To support the integration of oCIS with Pocket ID, you need to create a OIDC Client in Pocket ID.

### Create the groups used by oCIS in Pocket ID

1. Log in to Pocket ID as an admin
2. Navigate to **User Groups** and click **Add Group** (repeat for each group - 4 times)
   1. **Friendly Name:** `ocis admin users group` **Name:** `ocisAdmin`
   2. **Friendly Name:** `ocis space admin user group` **Name:** `ocisSpaceAdmin`
   3. **Friendly Name:** `ocis user group` **Name:** `ocisUser`
   4. **Friendly Name:** `ocis guest group` **Name:** `ocisGuest`

### Bind roles used by oCIS with Pocket ID groups

1. Log in to Pocket ID as an admin
2. Navigate to **User Groups**
3. click the 3 dots `...` on the side of ocisAdmin, ocisSpaceAdmin, ocisUser and ocisGuest and press edit (do per group)
   1. Add `roles` and `ocisAdmin` to **Custom Claims** and click `Save` in ocisAdmin group. Add admin users to this group under Users.
   2. Add `roles` and `ocisSpaceAdmin` to **Custom Claims** and click `Save` in ocisSpaceAdmin group. Add the space admin users to this group under Users.
   3. Add `roles` and `ocisUser` to **Custom Claims** and click `Save` in ocisUser group. Add standard users to this group under Users.
   4. Add `roles` and `ocisGuest` to **Custom Claims** and click `Save` in ocisGuest group. Add guests to this group under Users.

### Create an OIDC Client

1. Log in to Pocket ID as an admin
2. Navigate to **OIDC Clients** and click **Add OIDC Client**

- **Name:** ocis
- **Callback URLs:** https://ocis.company.com/oidc-callback.html
- **Public Client:** [x]

Click `Save`

### Add groups to Pocket ID

1. Log in to Pocket ID as an admin
2. Navigate to **OIDC Clients** and click edit **ocis**
   - [x] **ocisAdmin**
   - [x] **ocisSpaceAdmin**
   - [x] **ocisUser**
   - [x] **ocisGuest**

3. Copy the Client ID

Click `Save`

## oCIS configuration

### Environment Variables for oCIS and OIDC with Pocket ID

Add your client id from Pocket ID to WEB_OIDC_CLIENT_ID=

```
OCIS_URL=https://ocis.company.com
PROXY_AUTOPROVISION_ACCOUNTS=true
PROXY_ROLE_ASSIGNMENT_DRIVER=oidc
OCIS_OIDC_ISSUER=https://pocket-id.company.ch
PROXY_OIDC_REWRITE_WELLKNOWN=true
WEB_OIDC_CLIENT_ID=**<insert your client id from pocket id>**
PROXY_USER_OIDC_CLAIM=preferred_username
OCIS_EXCLUDE_RUN_SERVICES=idp
PROXY_CSP_CONFIG_FILE_LOCATION=/etc/ocis/csp.yaml
```

example of csp.yaml see https://github.com/owncloud/ocis/blob/master/deployments/examples/ocis_keycloak/config/ocis/csp.yaml

change line 9 (pocket-id.company.com) under connect-src to your Pocket ID URL and mount it to /etc/ocis/csp.yaml in your podman or docker settings.

```
directives:
  child-src:
    - '''self'''
  connect-src:
    - '''self'''
    - 'blob:'
    - 'https://raw.githubusercontent.com/owncloud/awesome-ocis/'
    # In contrary to bash and docker the default is given after the | character
    - 'https://pocket-id.company.com/'
  default-src:
    - '''none'''
  font-src:
    - '''self'''
  frame-ancestors:
    - '''none'''
  frame-src:
    - '''self'''
    - 'blob:'
    - 'https://embed.diagrams.net/'
  img-src:
    - '''self'''
    - 'data:'
    - 'blob:'
    - 'https://raw.githubusercontent.com/owncloud/awesome-ocis/'
  manifest-src:
    - '''self'''
  media-src:
    - '''self'''
  object-src:
    - '''self'''
    - 'blob:'
  script-src:
    - '''self'''
    - '''unsafe-inline'''
  style-src:
    - '''self'''
    - '''unsafe-inline'''
```

### Create additional OIDC clients for ownCloud desktop and mobile clients:

The Client IDs and secrets are hardcoded in the ownCloud desktop and mobile clients. You can find these values [here](https://doc.owncloud.com/server/10.15/admin_manual/configuration/user/oidc/oidc.html#client-ids-secrets-and-redirect-uris).

As a workaround, you need to create OIDC Client entries for each, and then manually specify the client ID and secrets that ownCloud expects them to be.

1. Install sqlite into the `pocket-id` container so you can modify the database entries:

   ```bash
   cd path-to-pocket-id-compose-file

   docker compose exec pocket-id apk add sqlite
   docker compose exec pocket-id sqlite3

   # EXAMPLE (see below for more details):
   # docker compose exec pocket-id sqlite3 /app/data/pocket-id.db "UPDATE oidc_clients SET id='owncloud-client-id', secret='owncloud-client-secret-bcrypt-hashed' WHERE id='current-client-id';"
   ```

   - Replace `owncloud-client-id` with the desired client ID.
   - Replace `owncloud-client-secret-bcrypt-hashed` with the bcrypt-hashed version of the client secret you want to use. To generate this hash, visit https://bcrypt-generator.com/, input your client secret, and use the resulting hash (replace the `$`'s with backslashes).
   - Replace `current-client-id` with the client ID of the existing client you want to update.

2. Obtain the client ID for each entry and run the following command to enable the client to authenticate. Replace `current-client-id` with the client ID of the existing client you want to update.
   - Desktop Client

     ```bash
     docker compose exec pocket-id sqlite3 /app/data/pocket-id.db "UPDATE oidc_clients SET id='xdXOt13JKxym1B1QcEncf2XDkLAexMBFwiT9j6EfhhHFJhs2KM9jbjTmf8JBXE69', secret='\$2a\$12\$HbbJMheIYyo8yfEuvm8Boe0baMZTIDXzchpVdLsfPqc3Eb.oULn5W' WHERE id='current-client-id';"
     ```

     > Callback URL: `http://127.0.0.1` and `http://localhost`

   - Android

     ```bash
     docker compose exec pocket-id sqlite3 /app/data/pocket-id.db "UPDATE oidc_clients SET id='e4rAsNUSIUs0lF4nbv9FmCeUkTlV9GdgTLDH1b5uie7syb90SzEVrbN7HIpmWJeD', secret='\$2a\$12\$sdQWjAxlQzRojU3bhvxp/e/5aY/tzskKqD76AQpiBJpj7USgWhZUO' WHERE id='current-client-id';"
     ```

     > Callback URL: `oc://android.owncloud.com`

   - iOS:

     ```bash
     docker compose exec pocket-id sqlite3 /app/data/pocket-id.db "UPDATE oidc_clients SET id='mxd5OQDk6es5LzOzRvidJNfXLUZS2oN3oUFeXPP8LpPrhx3UroJFduGEYIBOxkY1', secret='\$2a\$12\$3qHWSJRKBVoHVrn7kp4NFuEN4r.wmh9zB8oRjtYwHBUzwM818Hhje' WHERE id='current-client-id';"
     ```

     > Callback URL: `oc://ios.owncloud.com`

3. You can verify the changes with:

   ```bash
   docker compose exec pocket-id sqlite3 /app/data/pocket-id.db "SELECT * FROM oidc_clients;"
   ```
