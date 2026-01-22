---
title: ezBookkeeping
description: Configure ezBookkeeping with Pocket ID
---

## Requirements

- [ezBookkeeping](https://ezbookkeeping.mayswind.net/) `v1.2.0` or higher

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `ezBookkeeping` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://<your-ezbookkeeping-host>/oauth2/callback`, or leave blank to autofill on first login.
4. Copy the `Client ID`, `Client secret` and `Issuer URL` for the next steps.

## ezBookkeeping Setup

If you configure ezBookkeeping via the configuration file, please update the configuration file as shown in the example below.

```ini
[auth]
enable_oauth2_auth = true
oauth2_provider = oidc
oauth2_client_id = <Client ID>
oauth2_client_secret = <Client secret>
oidc_provider_base_url = <Issuer URL>
enable_oidc_display_name = true
oidc_custom_display_name = Pocket ID
```

If you configure ezBookkeeping using environment variables, please set the environment variables as shown in the example below.

```
EBK_AUTH_ENABLE_OAUTH2_AUTH=true
EBK_AUTH_OAUTH2_PROVIDER=oidc
EBK_AUTH_OAUTH2_CLIENT_ID=<Client ID>
EBK_AUTH_OAUTH2_CLIENT_SECRET=<Client secret>
EBK_AUTH_OIDC_PROVIDER_BASE_URL=<Issuer URL>
EBK_AUTH_ENABLE_OIDC_DISPLAY_NAME=true
EBK_AUTH_OIDC_CUSTOM_DISPLAY_NAME=Pocket ID
```

Then restart ezBookkeeping, and you will see the "Log in with Pocket ID" button on the login page.
