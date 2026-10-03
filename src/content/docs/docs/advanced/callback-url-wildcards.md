---
title: Callback URLs
seoTitle: Callback URL wildcards for OIDC clients
description: How Pocket ID matches callback and logout URLs, and the wildcard patterns they support.
---

Pocket ID only redirects users to the **Callback URLs** of a client after sign-in, and to its **Logout Callback URLs** after sign-out.
Every client needs at least one callback URL, since Pocket ID doesn't save the first URL an app sends anymore.

- A URL has to match exactly, unless it contains a wildcard.
- An `http://` URL on `localhost` or a loopback address such as `127.0.0.1`, registered without a port, matches on any port, for desktop and command-line apps that pick a free one.
- `http://` URLs on other hosts work while `ALLOW_INSECURE_CALLBACK_URLS` is `true`, its default for now.
- If a client has exactly one callback URL, apps may leave out `redirect_uri`.

## Wildcards

Both kinds of URLs support wildcard patterns, for apps whose callback URL changes, such as preview deployments.

:::caution
If possible, prefer exact URLs instead of wildcards for better security.
:::

Two types of wildcards are supported: Single Wildcards (`*`) and Globstars (`**`).

### Single wildcard (`*`)

Matches **any characters inside a single segment**, such as:

- one hostname label
- the port value
- a single path segment
- a single query parameter value

It will not cross segment boundaries, so it won’t consume `/`, `:`, `@`, `.`, or `[]` when those characters separate URL components. For example, `*.example.com` can match `auth.example.com`, but it cannot match `auth.eu.example.com` because that would require crossing multiple dot-separated host labels.

Examples:

```
https://*.example.com/oauth/callback
https://app.example.com:*/oauth/callback
https://user:*@example.com/oauth/callback
https://example.com/oauth/*/callback
https://example.com/oauth/callback?env=prod*&code=*
```

### Globstars (`**`)

Matches across multiple path segments, including `/`. **Globstars are only supported in path segments.**

For example `https://example.com/**/callback` matches:

```
https://example.com/callback
https://example.com/oauth/callback
https://example.com/api/v1/oauth/callback
```
