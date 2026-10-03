---
slug: docs/client-examples/oCIS
title: oCIS
description: Sign in to ownCloud Infinite Scale (oCIS) with Pocket ID.
---

[ownCloud Infinite Scale (oCIS)](https://owncloud.dev/ocis/) is the new file sync and share platform that will be the foundation of your data management platform.

Replace `ocis.example.com` with the domain of your oCIS server and `id.example.com` with the domain of your Pocket ID server.

:::note
This guide lists only the settings that you need to change from their default values.
Any changes other than those explicitly mentioned in this guide could cause issues accessing your application.
:::

## Create groups in Pocket ID

1. In Pocket ID, open **Administration → User Groups** and click **Add Group** for each of these four groups:
   - **Friendly Name** `ocis admin users group`, **Name** `ocisAdmin`
   - **Friendly Name** `ocis space admin user group`, **Name** `ocisSpaceAdmin`
   - **Friendly Name** `ocis user group`, **Name** `ocisUser`
   - **Friendly Name** `ocis guest group`, **Name** `ocisGuest`
2. On each group's page, add a claim under **Custom Claims** with the key `roles` and the group's name as the value, and save:
   - `ocisAdmin` group: `roles` = `ocisAdmin`
   - `ocisSpaceAdmin` group: `roles` = `ocisSpaceAdmin`
   - `ocisUser` group: `roles` = `ocisUser`
   - `ocisGuest` group: `roles` = `ocisGuest`
3. Add users to the groups: admin users to `ocisAdmin`, space admin users to `ocisSpaceAdmin`, standard users to `ocisUser` and guests to `ocisGuest`.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `oCIS`, choose **Public Client** as the client type and add the callback URLs:
   ```
   https://ocis.example.com/
   https://ocis.example.com/oidc-callback.html
   https://ocis.example.com/oidc-silent-redirect.html
   ```
3. Click **Create** and copy the **Client ID**.
4. On the client's **Access** tab, select `ocisAdmin`, `ocisSpaceAdmin`, `ocisUser` and `ocisGuest` under **Allowed User Groups**.

## Configure oCIS

### Environment variables

Set the following environment variables, with the **Client ID** from Pocket ID as `WEB_OIDC_CLIENT_ID`:

```ini
OCIS_URL=https://ocis.example.com
PROXY_AUTOPROVISION_ACCOUNTS=true
PROXY_ROLE_ASSIGNMENT_DRIVER=oidc
OCIS_OIDC_ISSUER=https://id.example.com
PROXY_OIDC_REWRITE_WELLKNOWN=true
WEB_OIDC_CLIENT_ID=<client-id>
PROXY_USER_OIDC_CLAIM=preferred_username
OCIS_EXCLUDE_RUN_SERVICES=idp
PROXY_CSP_CONFIG_FILE_LOCATION=/etc/ocis/csp.yaml
```

### Content Security Policy

For an example `csp.yaml`, see the [oCIS Keycloak example](https://github.com/owncloud/ocis/blob/master/deployments/examples/ocis_keycloak/config/ocis/csp.yaml).

Change the Pocket ID URL under `connect-src` (line 9 below) to your Pocket ID URL, and mount the file at `/etc/ocis/csp.yaml` in your Podman or Docker settings.

```yaml
directives:
  child-src:
    - '''self'''
  connect-src:
    - '''self'''
    - 'blob:'
    - 'https://raw.githubusercontent.com/owncloud/awesome-ocis/'
    # In contrary to bash and docker the default is given after the | character
    - 'https://id.example.com/'
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

## Create the desktop and mobile clients

The client IDs and secrets are hardcoded in the ownCloud desktop and mobile clients.
You can find these values in the [ownCloud documentation](https://doc.owncloud.com/server/10.15/admin_manual/configuration/user/oidc/oidc.html#client-ids-secrets-and-redirect-uris).

Pocket ID doesn't support hardcoded client secrets.
Because ownCloud implements the optional PKCE extension, you can create the desktop and mobile clients as public clients instead.

For each client below:

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter the name and the callback URL from the list, and choose **Public Client** as the client type.
3. Click **Set custom client ID** and enter the client ID from the list.
4. Click **Create**.
5. On the client's **Access** tab, select `ocisAdmin`, `ocisSpaceAdmin`, `ocisUser` and `ocisGuest` under **Allowed User Groups**.

The clients:

- **Desktop client**
  - Name: `ownCloud Desktop Client`
  - Callback URL: `http://127.0.0.1:*`
  - Client ID: `xdXOt13JKxym1B1QcEncf2XDkLAexMBFwiT9j6EfhhHFJhs2KM9jbjTmf8JBXE69`
- **iOS client**
  - Name: `ownCloud iOS Client`
  - Callback URL: `oc://ios.owncloud.com`
  - Client ID: `mxd5OQDk6es5LzOzRvidJNfXLUZS2oN3oUFeXPP8LpPrhx3UroJFduGEYIBOxkY1`
- **Android client**
  - Name: `ownCloud Android Client`
  - Callback URL: `oc://android.owncloud.com`
  - Client ID: `e4rAsNUSIUs0lF4nbv9FmCeUkTlV9GdgTLDH1b5uie7syb90SzEVrbN7HIpmWJeD`
