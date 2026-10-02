---
title: DBackup
description: Configure DBackup with Pocket ID authentication
---

## Create the DBackup OIDC Client in PocketID

### Required Settings

- **Callback-URL:** `https://your-dbackup-url/api/auth/sso/callback/<provider-id>`
- **Grant Type:** `Authorization Code`
- **Scopes:** `openid`, `profile`, `email`

Attention: The `<provider-id>` must be the Provider ID you get when creating the SSO/OIDC settings in DBackup. DBackup will propose an ID, e.g. pocket-id-1234

The Callback-URL in a local docker installation of DBackup can also be the local IP address and the port of DBackup, for example `https://192.168.x.xxx:3000/api/auth/sso/callback/pocket-id-123`

### Copy the ID and Client Secret from PocketID

- **Client ID**
- **Client Secret**

---

## Configuration of PocketID in DBackup

The SSO settings in DBackup are in the menu of Users & Groups and then SSO / OIDC

### Configuration

| Field         | Description                                               | Example                        |
| ------------- | --------------------------------------------------------- | ------------------------------ |
| Name          | Display name                                              | `"PocketID"`                   |
| Provider ID   | The ID to be used in the client configuration in PocketID | `pocket-id-1234`               |
| Provider      | PocketID URL                                              | `https://pocketid.example.com` |
| Client ID     | From PocketID                                             | `client-id`                    |
| Client Secret | From PocketID                                             | `secret`                       |
