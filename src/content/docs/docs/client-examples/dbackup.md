---
title: DBackup
description: Sign in to the DBackup database backup tool with Pocket ID.
client:
  callbackUrls:
    - "https://dbackup.example.com/api/auth/sso/callback/<provider-id>"
  values:
    - clientId
    - clientSecret
---

::create-client

`<provider-id>` must be the **Provider ID** you get when you create the SSO/OIDC settings in DBackup.
DBackup proposes an ID such as `pocket-id-1234`.
In a local Docker installation of DBackup, the callback URL can also use the local IP address and port of DBackup, for example `https://192.168.x.xxx:3000/api/auth/sso/callback/pocket-id-123`.

## Configure DBackup

The SSO settings in DBackup are under **Users & Groups → SSO / OIDC**.

| Field         | Description                                          | Example                  |
| ------------- | ---------------------------------------------------- | ------------------------ |
| Name          | Display name                                         | `"Pocket ID"`            |
| Provider ID   | The ID used in the callback URL in Pocket ID         | `pocket-id-1234`         |
| Provider      | Pocket ID URL                                        | `https://id.example.com` |
| Client ID     | The **Client ID** from Pocket ID                     | `<client-id>`            |
| Client Secret | The **Client secret** from Pocket ID                 | `<client-secret>`        |
