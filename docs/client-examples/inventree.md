---
title: InvenTree
description: Configure Pocket ID with InvenTree
---

## Requirements

- [InvenTree](https://github.com/inventree/InvenTree).
- Pocket ID on https, reachable at `https://<pocketid-domain.tld>`
- InvenTree server on https, reachable at `https://<inventree-domain.tld>`

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `inventree`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
   ```
   https://<inventree-domain.tld>/accounts/<provider-id>/login/callback/
   ```
   _Choose a name for `<provider-id>` (e.g., `pocket-id`) — you will use this same value as `provider_id` in the configuration below._
3. _Optional:_ Download a PNG or SVG **logo** from [selfhst](https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/inventree.svg) and upload.
4. Client Launch URL:
   ```bash
   https://<inventree-domain.tld>
   ```
5. Enable **PKCE**.
6. Copy the **Client ID**, **Client Secret** for configuring with InvenTree.

## Configure InvenTree

The following is the minimal configuration needed to set up Pocket ID OIDC with InvenTree.

### Option A: Configuration File (Recommended)

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

### Option B: Environment Variables

1. Add the following lines to your InvenTree `.env`, replacing the values from Step 7:
   ```bash
   INVENTREE_SOCIAL_BACKENDS=allauth.socialaccount.providers.openid_connect
   INVENTREE_SOCIAL_PROVIDERS={"openid_connect": {"SERVERS": [{"id": "pocket-id", "name": "Pocket ID", "server_url": "https://<pocketid-domain.tld>", "APP": {"client_id": "<your_client_id_from_above>", "secret": "<your_client_secret_from_above>"}}]}}
   ```
2. Save and restart the InvenTree docker-compose stack.

## Enable SSO in InvenTree

Once InvenTree is restarted, enable SSO via the admin UI:

1. Login as admin
2. Navigate to **System Settings → Authentication**.
3. Enable the following options:
   - **Enable SSO** 
   - **Enable SSO registration** 
   - **Auto-fill SSO users** 

> **Note:** If **Email Required** is enabled but SMTP is not configured, SSO login may fail during user registration. Add the following to use the console email backend as a workaround:
> ```bash
> INVENTREE_EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
> INVENTREE_EMAIL_SENDER=inventree@inventree-tld.com
> ```
