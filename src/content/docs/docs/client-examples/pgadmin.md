---
title: pgAdmin
description: Sign in to the pgAdmin PostgreSQL management tool with Pocket ID.
client:
  callbackUrls:
    - https://pgadmin.example.com/oauth2/authorize
  values:
    - clientId
    - clientSecret
---

Replace `pgadmin.example.com` with the URL of your pgAdmin instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure pgAdmin

1. Add the following to the `config_local.py` file for pgAdmin:

   ```python
   AUTHENTICATION_SOURCES = ['oauth2', 'internal'] # This keeps internal authentication enabled as well as oauth2
   OAUTH2_AUTO_CREATE_USER = True
   OAUTH2_CONFIG = [{
           'OAUTH2_NAME' : 'pocketid',
           'OAUTH2_DISPLAY_NAME' : 'Pocket ID',
           'OAUTH2_CLIENT_ID' : '<client-id>',
           'OAUTH2_CLIENT_SECRET' : '<client-secret>',
           'OAUTH2_TOKEN_URL' : 'https://id.example.com/api/oidc/token',
           'OAUTH2_AUTHORIZATION_URL' : 'https://id.example.com/authorize',
           'OAUTH2_API_BASE_URL' : 'https://id.example.com',
           'OAUTH2_USERINFO_ENDPOINT' : 'https://id.example.com/api/oidc/userinfo',
           'OAUTH2_SERVER_METADATA_URL' : 'https://id.example.com/.well-known/openid-configuration',
           'OAUTH2_SCOPE' : 'openid email profile',
           'OAUTH2_ICON' : 'fa-openid',
           'OAUTH2_BUTTON_COLOR' : '#fd4b2d' # Can select any color you would like here.
   }]
   ```

   Make sure to replace `https://id.example.com` with your actual Pocket ID URL.
