---
title: Postiz
description: Set up Postiz with Pocket ID authentication
---


Postiz is an open-source, self-hosted social media scheduling tool that supports platforms like X (formerly Twitter), Bluesky, Mastodon, Discord, and others. This guide details configuring Postiz to use Pocket ID as an authentication provider.

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Postiz`.
2. Set a logo for this OIDC Client if you would like too. (The svg file for the logo can be found [here](https://github.com/gitroomhq/postiz-app/blob/main/apps/frontend/public/postiz.svg))
3. Set the callback URL to: `https://postiz.example.com/settings`
4. Copy the `Client ID`, and the `Client Secret` for use in the next steps.

## Postiz Setup

Setup Postiz like it's described in the [official documentation](https://docs.postiz.com/installation/docker-compose).

Modify the following environment variables in the `docker-compose.yml` file:

```yaml
NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME: "Pocket-ID"
NEXT_PUBLIC_POSTIZ_OAUTH_LOGO_URL: "https://raw.githubusercontent.com/pocket-id/pocket-id/refs/heads/main/frontend/static/img/static-logo.svg"
POSTIZ_GENERIC_OAUTH: "true"
POSTIZ_OAUTH_URL: "https://id.example.com"
POSTIZ_OAUTH_AUTH_URL: "https://id.example.com/authorize"
POSTIZ_OAUTH_TOKEN_URL: "https://id.example.com/api/oidc/token"
POSTIZ_OAUTH_USERINFO_URL: "https://id.example.com/api/oidc/userinfo"
POSTIZ_OAUTH_CLIENT_ID: "OAUTH_CLIENT_ID"
POSTIZ_OAUTH_CLIENT_SECRET: "OAUTH_CLIENT_SECRET"
```

## Further Reading

- [Postiz Documentation for OIDC Configuration](https://docs.postiz.com/configuration/oauth)
