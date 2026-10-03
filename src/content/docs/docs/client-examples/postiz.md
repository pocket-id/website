---
title: Postiz
description: Sign in to the Postiz social media scheduling tool with Pocket ID.
client:
  callbackUrls:
    - https://postiz.example.com/settings
  values:
    - clientId
    - clientSecret
---

Postiz is an open-source, self-hosted social media scheduling tool that supports platforms like X (formerly Twitter), Bluesky, Mastodon, Discord, and others.
This guide configures Postiz to use Pocket ID as an authentication provider.

::create-client

## Configure Postiz

Set up Postiz as described in the [official documentation](https://docs.postiz.com/installation/docker-compose).

Modify the following environment variables in the `docker-compose.yml` file:

```yaml
NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME: "Pocket ID"
NEXT_PUBLIC_POSTIZ_OAUTH_LOGO_URL: "https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/frontend/static/img/static-logo.svg"
POSTIZ_GENERIC_OAUTH: "true"
POSTIZ_OAUTH_URL: "https://id.example.com"
POSTIZ_OAUTH_AUTH_URL: "https://id.example.com/authorize"
POSTIZ_OAUTH_TOKEN_URL: "https://id.example.com/api/oidc/token"
POSTIZ_OAUTH_USERINFO_URL: "https://id.example.com/api/oidc/userinfo"
POSTIZ_OAUTH_CLIENT_ID: "<client-id>"
POSTIZ_OAUTH_CLIENT_SECRET: "<client-secret>"
```

## Further reading

- [Postiz Documentation for OIDC Configuration](https://docs.postiz.com/configuration/oauth)
