---
title: HomeBox
description: Sign in to the HomeBox inventory system with Pocket ID.
client:
  callbackUrls:
    - https://homebox.example.com/api/v1/users/login/oidc/callback/
  values:
    - clientId
    - clientSecret
---

See the [HomeBox OIDC documentation](https://homebox.software/en/configure/oidc) for more configuration options.

::create-client

## Configure HomeBox

1. Add the following environment variables to HomeBox:

   ```yaml
   - HBOX_OIDC_ENABLED=true
   - HBOX_OIDC_ISSUER_URL=https://id.example.com
   - HBOX_OIDC_CLIENT_ID=<client-id>
   - HBOX_OIDC_CLIENT_SECRET=<client-secret>
   # Required if behind a reverse proxy so HomeBox detects HTTPS correctly
   - HBOX_OPTIONS_TRUST_PROXY=true
   # Optional: require verified email from Pocket ID
   # - HBOX_OIDC_VERIFY_EMAIL=true
   # Optional: auto-redirect to OIDC login (bypass local login screen)
   # - HBOX_OIDC_AUTO_REDIRECT=true
   # Optional: disable username/password login completely
   # - HBOX_OPTIONS_ALLOW_LOCAL_LOGIN=false
   ```

2. Restart HomeBox.
3. You should now see a **Sign in with OIDC** button on the HomeBox login page.
