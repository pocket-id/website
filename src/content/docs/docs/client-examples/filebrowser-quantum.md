---
title: FileBrowser Quantum
description: Sign in to the FileBrowser Quantum file manager with Pocket ID.
---

## Requirements

- [FileBrowser Quantum](https://github.com/gtsteffaniak/filebrowser/wiki/Configuration-And-Examples#openid-connect-configuration-oidc) with [SSO](https://github.com/gtsteffaniak/filebrowser/issues/816#issuecomment-2993195649)
- HTTPS connection to your Pocket ID server

## Create groups in Pocket ID

1. _(Optional)_ To limit access to specific users, open **Administration → User Groups** in Pocket ID, click **Add Group** and create a group with the **Name** `filebrowser`.
   Add the users who may sign in to it.
2. _(Optional)_ To grant admin privileges based on group, create a second group with the **Name** `filebrowser_admin` and add the admin users to it.
   Copy the group name for the FileBrowser Quantum configuration.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `FileBrowser Quantum`.
3. Click **Create** and copy the **Client ID** and the **Client secret**.
   The client secret is only shown once.
4. On the client's **Access** tab, select the `filebrowser` group under **Allowed User Groups**, or choose **All Users**.

## Configure FileBrowser Quantum

Add the following to your `config.yaml`, replacing values where applicable:

```yaml
auth:
methods:
  oidc:
  enabled: true
  clientId: <client-id>
  clientSecret: <client-secret>
  issuerUrl: https://id.example.com
  scopes: email openid profile groups
  userIdentifier: preferred_username
  disableVerifyTLS: false
  createUser: true
  # Below is optional. Also add 'groups' to 'scopes' if using this
  adminGroup: filebrowser_admin
```

To disable local password authentication, also add:

```yaml
auth:
  methods:
    password:
      enabled: false
```
