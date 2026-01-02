---
title: Callback URL Wildcards
description: Using wildcards in OIDC client callback URLs
---

Both Callback URLs and Logout Callback URLs support wildcard patterns to allow flexibility in specifying acceptable redirect URIs.

> [!WARNING]
> If possible, prefer exact URLs instead of wildcards for better security.

## Wildcard Types

Two types of wildcards are supported: Single Wildcards (`*`) and Globstars (`**`).

### Single Wildcard (`*`)

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
