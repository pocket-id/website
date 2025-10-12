---
title: Rallly
description: Configure Rallly scheduling with Pocket ID
---

Below URLs are used as placeholders for the rallly and Pocket ID instances. Replace them with the actual URLs.

- rallly.example.com (The url of your rallly instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `rallly` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://rallly.example.com/api/auth/callback/oidc`, or leave blank to autofill on first login.
4. Copy the `Client ID` and `Client Secret` for the next steps.

## rallly Docker Setup

If you follow the [rallly docker setup](https://support.rallly.co/self-hosting/installation/docker#setup-instructions), you are encouraged to create a `config.env` file in the root of your rallly project directory. This file will be used to set environment variables for the rallly web server container.

`config.env` file should look like this:

```env
other environment variables...

OIDC_DISCOVERY_URL=https://pocketid.example.com/.well-known/openid-configuration

OIDC_CLIENT_ID=your-client-id-here

OIDC_CLIENT_SECRET=your-client-secret-here

OIDC_ISSUER_URL=https://pocketid.example.com
```

Restart your docker containers and you should be able to login to rallly using Pocket ID.
