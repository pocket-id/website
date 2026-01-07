---
title: Common Issues
description: Solutions to frequently encountered problems
---

## Unable to Add a Passkey

Ensure that the `APP_URL` is set correctly to the public URL of the Pocket ID instance and is using HTTPS.

Example:

```ini
APP_URL=https://id.example.com
```

## Unable to Access the Admin UI After Setup

To set up the initial passkey for the admin user, navigate to:

```
https://id.example.com/setup
```

## Invalid Callback URL

One of the most common issues with OIDC clients is a misconfigured `Callback URL`.

If the `redirect_uri` URL parameter starts with `http` but `https` is expected, the client is the issue. If you can’t resolve the issue on the client side, you can add a secondary callback URL using both `http` and `https` versions.

## Content Security Policy (CSP) Issues

If you encounter CSP-related errors in the browser console when accessing Pocket ID, like

> Content-Security-Policy: The page's settings blocked an inline script (script-src-elem) from being executed because it violates the following directive: "script-src 'self' ...

a service in front of Pocket ID might inject a custom script or style. In Cloudflare, for example, this can happen when the "Rocket Loader" feature is enabled. To resolve this, disable the feature or any other that modifies the page content.
