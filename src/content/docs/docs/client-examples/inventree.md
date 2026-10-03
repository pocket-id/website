---
title: InvenTree
description: Sign in to the InvenTree inventory management system with Pocket ID.
client:
  callbackUrls:
    - https://<inventree-domain.tld>/accounts/<provider-id>/login/callback/
  pkce: true
  launchUrl: https://<inventree-domain.tld>
  values:
    - clientId
    - clientSecret
---

## Requirements

- [InvenTree](https://github.com/inventree/InvenTree)
- Pocket ID on HTTPS, reachable at `https://<pocketid-domain.tld>`
- InvenTree server on HTTPS, reachable at `https://<inventree-domain.tld>`

::create-client

Choose a name for `<provider-id>` (e.g. `pocket-id`) and use the same value as `provider_id` in the configuration below.

## Configure InvenTree

The following is the minimal configuration needed to set up Pocket ID OIDC with InvenTree.

### Option A: Configuration file (recommended)

1. Add the following to your `config.yaml`, replacing values from Step 6:
```yaml
social_backends:
  - 'allauth.socialaccount.providers.openid_connect'

social_providers:
  openid_connect:
    APPS:
      - provider_id: pocket-id
        name: Pocket ID
        client_id: '<your_client_id_from_above>'
        secret: '<your_client_secret_from_above>'
        settings:
          server_url: 'https://<pocketid-domain.tld>'
          fetch_userinfo: true
          oauth_pkce_enabled: true
          token_auth_method: client_secret_post
```

### Option B: Environment variables

1. Add the following lines to your InvenTree `.env`, replacing the values from Step 7:
   ```bash
   INVENTREE_SOCIAL_BACKENDS=allauth.socialaccount.providers.openid_connect
   INVENTREE_SOCIAL_PROVIDERS={"openid_connect": {"SERVERS": [{"id": "pocket-id", "name": "Pocket ID", "server_url": "https://<pocketid-domain.tld>", "APP": {"client_id": "<your_client_id_from_above>", "secret": "<your_client_secret_from_above>"}}]}}
   ```
2. Save and restart the InvenTree docker-compose stack.

## Enable SSO in InvenTree

Once InvenTree is restarted, enable SSO via the admin UI:

1. Sign in as an admin.
2. Navigate to **System Settings → Authentication**.
3. Enable the following options:
   - **Enable SSO**
   - **Enable SSO registration**
   - **Auto-fill SSO users**

> **Note:** If **Email Required** is enabled but SMTP is not configured, SSO login may fail during user registration.
> Add the following to use the console email backend as a workaround:
> ```bash
> INVENTREE_EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
> INVENTREE_EMAIL_SENDER=inventree@inventree-tld.com
> ```
