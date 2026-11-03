---
title: Sonarr
description: Sign in to the Sonarr dashboard with Pocket ID.
client:
  callbackUrls:
    - https://sonarr.example.com/signin-oidc
  pkce: true
  values:
    - clientId
    - clientSecret
---

:::note
OIDC support was recently added to Sonarr v5, however it may have some issues as it is still in beta.
Check the announcement on the [Sonarr forums](https://forums.sonarr.tv/t/sonarr-v5-beta/41099) for more information.
:::

::create-client

## Configure Sonarr

:::note
OIDC authentication in Sonarr is limited to a **single user** and `OidcUserIdentifier` is required to allow that single user to authenticate with the matching email address or subject identifier.
For more information on configuring Sonarr, see the [Sonarr docs](https://wiki.servarr.com/sonarr/settings#host).
:::

### Via the web interface

1. Log in to Sonarr
2. Go to **Settings → General** and enable **Show Advanced**.
3. Under **Security**, fill in the following fields:

| Field                   | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| Authentication          | `OIDC`                                                                     |
| Authentication Required | `Enabled`                                                                  |
| OIDC Authority          | `https://id.example.com`                                                   |
| OIDC Client ID          | The **Client ID** from Pocket ID                                           |
| OIDC Client Secret      | The **Client secret** from Pocket ID                                       |
| OIDC User               | The user's **Verified email** from Pocket ID                               |
| OIDC Scopes             | `openid email profile`                                                     |
| Trusted Networks        | The IP address of your reverse proxy (e.g. Caddy, Nginx, Traefik, etc.)    |

4. Click on **Save Changes** and restart Sonarr.
5. Click on Login and you will be redirected to Pocket ID for authentication.

### Via the config file

1. Stop Sonarr.
2. Fill in the required fields in the `config.xml` file (the file location may vary depending on your setup. For more information, check the [Sonarr Appdata Directory](https://wiki.servarr.com/sonarr/appdata-directory)).

```xml
# config.xml
<AuthenticationMethod>Oidc</AuthenticationMethod>
<AuthenticationRequired>Enabled</AuthenticationRequired>
<OidcAuthority>https://id.example.com</OidcAuthority>
<OidcClientId>client-id</OidcClientId>
<OidcClientSecret>client-secret</OidcClientSecret>
<OidcUserIdentifier>verified-email@example.com</OidcUserIdentifier>
<TrustedNetworks>trusted-ip-address</TrustedNetworks>
```
3. Restart Sonarr.
4. Click on Login and you will be redirected to Pocket ID for authentication.

:::note
The User Identifier (`OidcUserIdentifier`) can be changed for the subject identifier (`sub`) of the user from Pocket ID.
:::

## Troubleshooting

- Check that the Trusted Networks is set correctly in Sonarr, otherwise the login will fail.
- Check that Allowed Hosts is set correctly in Sonarr
- Check that the email is verified in Pocket ID.

:::danger
If for some reason you can't log in, you'll need to manually modify the `config.xml` file, and change the `AuthenticationMethod` back to `Forms` to disable OIDC login.
:::

