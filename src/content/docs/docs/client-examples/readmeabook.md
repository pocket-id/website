---
title: ReadMeABook
description: Configure ReadMeABook with Pocket ID authentication
---

## Create in PocketID an OIDC Client for ReadMeABook

### Required Settings in PocketID to create the OIDC Client
- **Redirect URI:** `https://your.rmab.domain.com/api/auth/oidc/callback)`
- **Grant Type:** `Authorization Code`
- **Scopes:** `openid`, `profile`, `email`

### Obtain

- **Client ID**
- **Client Secret**

---

## Configuration of PocketID in RMAB

### Configuration

| Field | Description | Example |
|---|---|---|
| Provider Name | Display Name | `PocketID` |
| Issuer URL | PocketID instance URL | `https://pocketid.example.com/.well-known/openid-configuration` |
| Client ID | From PocketID | `client-id` |
| Client Secret | From PocketID | `secret` |
