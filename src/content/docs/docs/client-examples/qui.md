---
title: Qui
description: Sign in to the qui web interface with Pocket ID.
client:
  callbackUrls:
    - https://qui.example.com/api/auth/oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Qui

### Via the config file

:::note
Default `config.toml` locations:

- Linux/macOS: `~/.config/qui/config.toml`
- Windows: `%APPDATA%\qui\config.toml`

For more information, check the [qui Configuration Reference](https://getqui.com/docs/configuration/reference/)
:::

1. Fill in the required fields in the `config.toml` file:

```toml
# config.toml
oidcEnabled = true
oidcIssuer = "https://id.example.com"
oidcClientId = "client-id"
oidcClientSecret = "client-secret"
oidcRedirectUrl = "https://qui.example.com/api/auth/oidc/callback"
oidcDisableBuiltInLogin = true # Optional, hides the username/password form
```

2. Restart qui.
3. Click on OpenID Connect and you will be redirected to Pocket ID for authentication.

### Via environment variables

Environment variables can be used to override the values in the `config.toml` file.

1. Set the following environment variables:

| Variable                           | Value                                                   |
| ---------------------------------- | ------------------------------------------------------- |
| `QUI__OIDC_ENABLED`                | `true`                                                  |
| `QUI__OIDC_ISSUER`                 | `https://id.example.com`                                |
| `QUI__OIDC_CLIENT_ID`              | The **Client ID** from Pocket ID                        |
| `QUI__OIDC_CLIENT_SECRET`          | The **Client secret** from Pocket ID                    |
| `QUI__OIDC_REDIRECT_URL`           | `https://qui.example.com/api/auth/oidc/callback`        |
| `QUI__OIDC_DISABLE_BUILT_IN_LOGIN` | `true` Optional, hides the local username/password form |

2. Restart qui.
3. Click on OpenID Connect and you will be redirected to Pocket ID for authentication.

For more information, check the [qui OIDC Reference](https://getqui.com/docs/configuration/oidc/)


## Troubleshooting

- Check that Allowed Hosts is set correctly
