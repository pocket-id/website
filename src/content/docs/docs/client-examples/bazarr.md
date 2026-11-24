---
title: Bazarr
description: Sign in to the Bazarr subtitle manager with Pocket ID.
client:
  callbackUrls:
    - https://bazarr.example.com/auth/oidc/callback
  pkce: true
  values:
    - clientId
    - clientSecret
    - issuerUrl
---

:::note
Native OIDC authentication was introduced in Bazarr v1.6.3-beta.36. Earlier releases do not support OIDC.
:::

::create-client

## Configure Bazarr

:::note
Local password login is disabled while OIDC authentication is enabled. For more information on configuring Bazarr, see the [Bazarr OpenID Connect authentication docs](https://wiki.bazarr.media/Additional-Configuration/OpenID-Connect/)
:::

### Via the web interface

1. Log in to Bazarr
2. Go to **Settings → Application → General**.
3. Under **Security**, fill in the following fields:

| Field                         | Value                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Authentication                | `OpenID Connect (OIDC)`                                                                                     |
| Issuer URL                    | `https://id.example.com`                                                                                    |
| OIDC Client ID                | The **Client ID** from Pocket ID                                                                            |
| Redirect URI                  | `https://bazarr.example.com/auth/oidc/callback`                                                             |
| Allowed subjects              | The exact `sub` values of the accounts that may administer this instance. At least one subject is required. |
| Client secret file (optional) | Path to a file containing the **Client secret** from Pocket ID                                              |

4. Click on **Save** and restart Bazarr.
5. Click on **Sign in with OpenID Connect** and you will be redirected to Pocket ID for authentication.

### Via the config file

:::note
Default `config.yaml` locations:

- Linux/macOS: `/opt/bazarr/data/config/config.yaml`
- Windows: `%PROGRAMDATA%\Bazarr\config.yaml`
:::

1. Stop Bazarr.
2. Fill in the required fields in the `config.yaml` file:

```yaml
# config.yaml
auth:
  type: oidc
  oidc_issuer: https://id.example.com
  oidc_client_id: client-id
  oidc_redirect_uri: https://bazarr.example.com/auth/oidc/callback
  oidc_allowed_subjects:
    - sub-identifier
  oidc_client_secret_file: '/path/to/oidc_secret.env' # Optional
```

3. Restart Bazarr.
4. Click on **Sign in with OpenID Connect** and you will be redirected to Pocket ID for authentication.

A public client does not need a client secret. If you use a confidential client, provide its secret through a secret file or the `BAZARR_OIDC_CLIENT_SECRET` environment variable.

For more information, check the [Bazarr wiki](https://wiki.bazarr.media)

## Troubleshooting

- Check that the URLs use HTTPs. HTTP callbacks are not supported.
- Check that PKCE is enabled in the client configuration in case a client secret is not provided.
- Check that the client secret file is readable by Bazarr and contains the correct secret.

:::danger
If for some reason you can't log in, you'll need to modify the `config.yaml` file. Under `auth`, change the `type` back to `form` or `basic` to disable OIDC login.
:::

