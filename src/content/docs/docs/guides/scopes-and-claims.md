---
title: Scopes and claims
seoTitle: Pocket ID scopes, claims and token lifetimes
description: The scopes Pocket ID supports, the claims each one adds to the ID token and userinfo, custom claims, and how long tokens last.
---

An app chooses what it learns about a user through the scopes it requests.
Pocket ID puts the matching claims into the ID token and returns the same claims from the userinfo endpoint.

## Scopes

| Scope | Claims |
| --- | --- |
| `openid` | `sub`, the user's ID, which never changes. Every sign-in needs this scope. |
| `profile` | `name`, `given_name`, `family_name`, `preferred_username`, `display_name`, `picture`, and the user's [custom claims](#custom-claims) |
| `email` | `email` and `email_verified`, when the user has an email address |
| `groups` | `groups`, the names of the user's groups as an array |
| `offline_access` | No claims, since Pocket ID issues refresh tokens without it |

`preferred_username` is the username, and `name` is the first and last name, or the display name or username when the user has no name set.
`picture` is a URL of the user's profile picture.
Pocket ID ignores scopes it doesn't know, except the permissions of [your APIs](/docs/guides/apis).

Groups appear by their **name**, such as `media`, not by the friendly name shown in the admin UI.
Apps that map groups to roles, such as Grafana or Jellyfin, need these names.

## Custom claims

Custom claims add your own values to the tokens, such as a role or a quota for one app.
Set them on a user or a group under **Administration → Users** or **User Groups**, on the **Custom Claims** tab.

- They're released with the `profile` scope, in the ID token and the userinfo response, but not in the access token.
- A value that is valid JSON, such as `["admin"]` or `42`, is added as JSON, and anything else as a string.
- A user's own claim wins over a group's claim with the same name.
  If several of the user's groups set the same claim, which one wins isn't defined, so give every group its own names.
- Standard claim names such as `email`, `groups`, `name` or `sub` are reserved and can't be used.

To check what an app will receive, open the client and click **OIDC Data Preview**, which shows the ID token, the access token and the userinfo response for any user.

## Tokens

| Token | Format | Lifetime |
| --- | --- | --- |
| ID token | Signed JWT | 1 hour |
| Access token | Signed JWT ([RFC 9068](https://www.rfc-editor.org/rfc/rfc9068)) | 60 minutes, configurable per client |
| Refresh token | Opaque | 30 days of inactivity, configurable per client |
| Authorization code | Opaque | 15 minutes |

Change a client's lifetimes under **Token lifetimes** on its **General** tab.
A refresh token's lifetime restarts whenever the app uses it, so an app that refreshes regularly stays signed in.

Pocket ID checks at every refresh that the user still exists, isn't disabled and is still in one of the client's allowed groups, so removing someone from a group ends their access at the app's next refresh.

The access token's audience (`aud`) is the client ID, or the API's resource when the app asked for one of [your APIs](/docs/guides/apis).
Tokens are signed with RS256 by default, and [Custom signing keys](/docs/advanced/custom-keys) switches to another algorithm.
