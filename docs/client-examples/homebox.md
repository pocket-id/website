---
title: HomeBox
description: Configure HomeBox inventory system with Pocket ID
---

Below URLs are used as placeholders for the HomeBox and Pocket ID instances. Replace them with the actual URLs.

- homebox.example.com (The url of your HomeBox instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

See the [HomeBox OIDC documentation](https://homebox.software/en/configure/oidc) for more configuration options.

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `HomeBox` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://homebox.example.com/api/v1/users/login/oidc/callback/`, or leave blank to autofill on first login.
4. Copy the `Client ID` and `Client Secret` for the next steps.

## HomeBox Setup

1. Add the below environment variables for HomeBox:

```yaml
- HBOX_OIDC_ENABLED=true
- HBOX_OIDC_ISSUER_URL=https://pocketid.example.com
- HBOX_OIDC_CLIENT_ID=<client id from pocket ID>
- HBOX_OIDC_CLIENT_SECRET=<client secret from pocket ID>
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
