---
title: ezBookkeeping
description: Sign in to the ezBookkeeping finance app with Pocket ID.
client:
  callbackUrls:
    - https://ezbookkeeping.example.com/oauth2/callback
  values:
    - clientId
    - clientSecret
    - issuerUrl
---

## Requirements

- [ezBookkeeping](https://ezbookkeeping.mayswind.net/) `v1.2.0` or higher

::create-client

## Configure ezBookkeeping

If you configure ezBookkeeping with the configuration file, update it as shown in the example below:

```ini
[auth]
enable_oauth2_auth = true
oauth2_provider = oidc
oauth2_client_id = <client-id>
oauth2_client_secret = <client-secret>
oidc_provider_base_url = https://id.example.com
enable_oidc_display_name = true
oidc_custom_display_name = Pocket ID
```

If you configure ezBookkeeping with environment variables, set them as shown in the example below:

```ini
EBK_AUTH_ENABLE_OAUTH2_AUTH=true
EBK_AUTH_OAUTH2_PROVIDER=oidc
EBK_AUTH_OAUTH2_CLIENT_ID=<client-id>
EBK_AUTH_OAUTH2_CLIENT_SECRET=<client-secret>
EBK_AUTH_OIDC_PROVIDER_BASE_URL=https://id.example.com
EBK_AUTH_ENABLE_OIDC_DISPLAY_NAME=true
EBK_AUTH_OIDC_CUSTOM_DISPLAY_NAME=Pocket ID
```

Then restart ezBookkeeping.
The login page now shows a **Log in with Pocket ID** button.
