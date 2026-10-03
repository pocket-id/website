---
title: ReadMeABook
description: Sign in to ReadMeABook with Pocket ID.
client:
  callbackUrls:
    - https://readmeabook.example.com/api/auth/oidc/callback
---

::create-client

## Configure ReadMeABook

Fill in the OIDC settings in ReadMeABook:

| Field         | Description                                | Example                                                    |
| ------------- | ------------------------------------------ | ---------------------------------------------------------- |
| Provider Name | Display name                               | `Pocket ID`                                                |
| Issuer URL    | The **OIDC Discovery URL** from Pocket ID  | `https://id.example.com/.well-known/openid-configuration`  |
| Client ID     | The **Client ID** from Pocket ID           | `<client-id>`                                              |
| Client Secret | The **Client secret** from Pocket ID       | `<client-secret>`                                          |
