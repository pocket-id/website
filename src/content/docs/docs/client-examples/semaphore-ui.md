---
title: Semaphore UI
description: Sign in to Semaphore UI with Pocket ID.
client:
  callbackUrls:
    - https://semaphore.example.com/api/auth/oidc/pocketid/redirect/
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Semaphore UI

Add the following to your `config.json` file for Semaphore UI:

```json
"oidc_providers": {
    "pocketid": {
        "display_name": "Sign in with Pocket ID",
        "provider_url": "https://id.example.com",
        "client_id": "<client-id>",
        "client_secret": "<client-secret>",
        "redirect_url": "https://semaphore.example.com/api/auth/oidc/pocketid/redirect/",
        "scopes": [
            "openid",
            "profile",
            "email"
        ],
        "username_claim": "email",
        "name_claim": "given_name"
    }
}
```

Semaphore UI versions after 2.14 support a Docker environment variable for this.
A single environment variable, `SEMAPHORE_OIDC_PROVIDERS`, lets you configure providers using a JSON string matching the `oidc_providers` structure.

```yaml
SEMAPHORE_OIDC_PROVIDERS: >-
  {
    "pocketid": {
      "display_name":"Sign in with Pocket ID",
      "provider_url":"https://id.example.com",
      "client_id":"<client-id>",
      "client_secret":"<client-secret>",
      "redirect_url":"https://semaphore.example.com/api/auth/oidc/pocketid/redirect/",
      "scopes": [
        "openid",
        "profile",
        "email"
      ],
      "username_claim":"email",
      "name_claim":"given_name"
    }
  }
```
