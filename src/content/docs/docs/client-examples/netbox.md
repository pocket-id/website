---
title: NetBox
description: Sign in to the NetBox IPAM tool with Pocket ID.
client:
  callbackUrls:
    - https://netbox.example.com/oauth/complete/oidc/
  values:
    - clientId
    - clientSecret
---

**This guide doesn't currently show how to map groups in NetBox from OIDC claims.**

Replace `netbox.example.com` with the domain of your NetBox instance and `id.example.com` with the domain of your Pocket ID instance.

::create-client

## Configure NetBox

This guide assumes you use the Git-based installation of NetBox.

1. On your NetBox server, open `/opt/netbox/netbox/netbox`.
2. Add the following to your `configuration.py` file, with the **Client ID** and the **Client secret** from Pocket ID:

   ```python
   # Remote authentication support
   REMOTE_AUTH_ENABLED = True
   REMOTE_AUTH_BACKEND = 'social_core.backends.open_id_connect.OpenIdConnectAuth'
   REMOTE_AUTH_HEADER = 'HTTP_REMOTE_USER'
   REMOTE_AUTH_USER_FIRST_NAME = 'HTTP_REMOTE_USER_FIRST_NAME'
   REMOTE_AUTH_USER_LAST_NAME = 'HTTP_REMOTE_USER_LAST_NAME'
   REMOTE_AUTH_USER_EMAIL = 'HTTP_REMOTE_USER_EMAIL'
   REMOTE_AUTH_AUTO_CREATE_USER = True
   REMOTE_AUTH_DEFAULT_GROUPS = []
   REMOTE_AUTH_DEFAULT_PERMISSIONS = {}

   SOCIAL_AUTH_OIDC_ENDPOINT = 'https://id.example.com'
   SOCIAL_AUTH_OIDC_KEY = '<client-id>'
   SOCIAL_AUTH_OIDC_SECRET = '<client-secret>'
   LOGOUT_REDIRECT_URL = 'https://netbox.example.com'
   ```

3. Save the file and restart NetBox: `sudo systemctl restart netbox netbox-rq`.
