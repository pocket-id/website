---
title: FileBrowser Quantum
description: Set up OIDC for FileBrowser Quantum
---

## Requirements

- [FileBrowser Quantum](https://github.com/gtsteffaniak/filebrowser/wiki/Configuration-And-Examples#openid-connect-configuration-oidc) with [SSO](https://github.com/gtsteffaniak/filebrowser/issues/816#issuecomment-2993195649)
- HTTPS connection to your Pocket ID server

## Pocket ID Setup

To setup Pocket ID:

- Create a new **OIDC Client**
- Copy the **Client ID** and **Client Secret** for section below

To limit access to specific group(s):

- Create a new **User Group** (`filebrowser`), link it to the OIDC client, and add users

To grant admin privileges based on group:

- Create a second **User Group** (`filebrowser_admin`), add users, and copy the group name for section below

## FileBrowser Quantum Setup

Add the following to your `config.yaml`, replacing values where applicable:

```yaml
auth:
methods:
  oidc:
  enabled: true
  clientId: << Client ID >>
  clientSecret: << Client Secret >>
  issuerUrl: https://id.example.com
  scopes: email openid profile groups
  userIdentifier: preferred_username
  disableVerifyTLS: false
  createUser: true
  # Below is optional. Also add 'groups' to 'scopes' if using this
  adminGroup: filebrowser_admin
```

If you want to disable local password authentication you can also add:

```yaml
auth:
  methods:
    password:
      enabled: false
```
